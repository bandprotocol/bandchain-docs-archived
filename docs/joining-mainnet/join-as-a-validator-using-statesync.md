<!--
order: 6
-->

# How to Join as a Validator using State Sync

In this section, we'll explain the requirements and basics for running your own BandChain validator node using [State Sync](https://blog.cosmos.network/cosmos-sdk-state-sync-guide-99e4cf43be2f).

## Warning

You have to have at least 32 GB of RAM to using State Sync

## Step 1: Set Up Validator Node

This step provides procedures to install BandChain's executable and sync blocks with other peers.

Assuming to run on Ubuntu 22.04 LTS allowing connection on port `26656` for P2P connection.

Before beginning instructions, following variables should be set to be used in further instructions. **Please make sure that these variables are set every time when using the new shell session.**

```bash
# Chain ID of Laozi Mainnet
export CHAIN_ID=laozi-mainnet
# Wallet name to be used as validator's account, please change this into your name (no whitespace).
export WALLET_NAME=<YOUR_WALLET_NAME>
# Name of your validator node, please change this into your name.
export MONIKER=<YOUR_MONIKER>
# URL of genesis file for Laozi Mainnet
export GENESIS_FILE_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/laozi-mainnet/genesis.json
# Data sources/oracle scripts files
export BIN_FILES_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/laozi-mainnet/files.tar.gz
```

### Step 1.1: Installation

The following applications are required to build and run the BandChain node.

- make, gcc, g++ (can be obtained from `build-essential` package on linux)
- wget, curl for downloading files

```bash
# install required tools
sudo apt-get update && \
sudo apt-get upgrade -y && \
sudo apt-get install -y build-essential curl wget
```

- Go 1.19.1

```bash
# Install Go 1.19.1
wget https://go.dev/dl/go1.19.1.linux-amd64.tar.gz
tar xf go1.19.1.linux-amd64.tar.gz
sudo mv go /usr/local/go
# Set Go path to $PATH variable
echo "export PATH=\$PATH:/usr/local/go/bin:~/go/bin" >> $HOME/.profile
source ~/.profile
```

Go binary should be at `/usr/local/go/bin` and any executable compiled by `go install` command should be at `~/go/bin`

### Step 1.2: Clone & Install Bandchain Laozi

```bash
cd ~
# Clone Bandchain Laozi version v2.4.1
git clone https://github.com/bandprotocol/chain
cd chain
git checkout v2.4.1
# Install binaries to $GOPATH/bin
make install
```

### Step 1.3: Initialize the BandChain and download genesis file

```bash
cd $HOME

# Initialize configuration and genesis state
bandd init --chain-id $CHAIN_ID "$MONIKER"

# Replace genesis file with our genesis file
wget $GENESIS_FILE_URL -O $HOME/.band/config/genesis.json

# Download data sources / oracle scripts files, and store in $HOME/.band/files
wget -qO- $BIN_FILES_URL | tar xvz -C $HOME/.band/

# Create new account
bandd keys add $WALLET_NAME
```

### Step 1.4: Setup seeds or persistence peers of your node to the network.

This can be done by editing `seeds` or `persistent_peers` property in `$HOME/.band/config/config.toml`.
Please see [here](https://github.com/bandprotocol/launch/tree/master/laozi-mainnet) for the list of seeds and peers.

```bash
# List of seeds and persistent peers you want to add
export SEEDS="<SEED>,<SEED>,..."
# e.g. SEEDS="8d42bdcb6cced03e0b67fa3957e4e9c8fd89015a@34.87.86.195:26656,543e0cab9c3016a0e99775443a17bcf163038912@34.150.156.78:26656"

export PERSISTENT_PEERS="<PERSISTENT_PEER>,<PERSISTENT_PEER>,..."

# Add seeds and persistent peers to config.toml
sed -E -i \
  "s/seeds = \".*\"/seeds = \"${SEEDS}\"/" \
  $HOME/.band/config/config.toml

sed -E -i \
  "s/persistent_peers = \".*\"/persistent_peers = \"${PERSISTENT_PEERS}\"/" \
  $HOME/.band/config/config.toml
```

### Step 1.5: Setup State Sync config

```bash
# Get trust height and trust hash

LATEST_HEIGHT=$(curl -s http://rpc.laozi1.bandchain.org/block | jq -r .result.block.header.height);
TRUST_HEIGHT=$(($LATEST_HEIGHT-45000))
TRUST_HASH=$(curl -s "http://rpc.laozi1.bandchain.org/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)

# show trust height and trust hash
echo "TRUST HEIGHT: $TRUST_HEIGHT"
echo "TRUST HASH: $TRUST_HASH"
```

```bash
# Enable State Sync
sed -i \
    '/\[statesync\]/,+34 s/enable = false/enable = true/' \
    $HOME/.band/config/config.toml

# Set RPC Endpoint for State Sync
sed -E -i \
    "/\[statesync\]/,+34 s/rpc_servers = \".*\"/rpc_servers = \"http\:\/\/rpc.laozi1.bandchain.org\:80,http\:\/\/rpc.laozi2.bandchain.org\:80,https\:\/\/rpc.laozi3.bandchain.org\:80,https\:\/\/rpc.laozi4.bandchain.org\:80\"/" \
    $HOME/.band/config/config.toml

# Set Trust Height for State Sync
sed -i \
    "/\[statesync\]/,+34 s/trust_height = .*/trust_height = ${TRUST_HEIGHT}/" \
    $HOME/.band/config/config.toml

# Set Trust Hash for State Sync
sed -i \
    "/\[statesync\]/,+34 s/trust_hash = \".*\"/trust_hash = \"${TRUST_HASH}\"/" \
    $HOME/.band/config/config.toml
```

## Step 2: Setup Cosmovisor

This step provides procedures to setup Cosmovisor. Cosmovisor is a small process manager for Cosmos SDK application binaries that monitors the governance module via stdout for incoming chain upgrade proposals

### Step 2.1: Setup environment variables

Add required environment variables for Cosmovisor into your profile

```bash
cd ~
echo "export DAEMON_NAME=bandd" >> ~/.profile
echo "export DAEMON_HOME=$HOME/.band" >> ~/.profile
source ~/.profile
```

### Step 2.2: Setup Cosmovisor

Install Cosmovisor and provide bandd binary to Cosmovisor

```bash
# Install Cosmovisor
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@v1.0.0

# Setup folder and provide bandd binary for Cosmovisor
mkdir -p $HOME/.band/cosmovisor/genesis/bin
mkdir -p $HOME/.band/cosmovisor/upgrades
cp $HOME/go/bin/bandd $HOME/.band/cosmovisor/genesis/bin
```

### Step 2.3: Create BandChain service

We do recommend to run bandchain node as a daemon, which can be setup using `systemctl`. Run the following command to create a new daemon for `cosmovisor` that runs `bandd` (This script work on non-root user).

```bash
# Write bandd service file to /etc/systemd/system/bandd.service
export USERNAME=$(whoami)
sudo -E bash -c 'cat << EOF > /etc/systemd/system/bandd.service
[Unit]
Description=BandChain Node Daemon
After=network-online.target
[Service]
Environment="DAEMON_NAME=bandd"
Environment="DAEMON_HOME=${HOME}/.band"
Environment="DAEMON_RESTART_AFTER_UPGRADE=true"
Environment="DAEMON_ALLOW_DOWNLOAD_BINARIES=false"
Environment="UNSAFE_SKIP_BACKUP=true"
User=$USERNAME
ExecStart=${HOME}/go/bin/cosmovisor start
Restart=always
RestartSec=3
LimitNOFILE=4096
[Install]
WantedBy=multi-user.target
EOF'
```

## Step 3: Setup Yoda

Since a subset of validators who are selected for a data request must send the data they received as a transaction of [MsgReportData](../whitepaper/protocol-messages.md#msgreportdatas) to BandChain.

Yoda is a program used by BandChain's validator nodes to help automatically query data from data providers by executing data source script, then submitting the result to fulfill the request. [Read more on the Yoda section.](./yoda.md)

### Step 3.1: Installation

Before setting up Yoda, Lambda function executor need to be setup to execute data sources. If this step has not been done yet, please follow the instructions on following pages (select either one of these methods):

- [AWS Lambda Function](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-AWS-Lambda)
- [Google Cloud Function](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-Google-Cloud-Function)

To check Yoda version, use the following command.

```bash
yoda version
# v2.4.1
```

### Step 3.2: Set the Yoda configurations

Use the command below to config your Yoda, replacing `$VARIABLES` with their actual values.

```bash
rm -rf ~/.yoda # clear old config if exist
yoda config chain-id $CHAIN_ID
yoda config node http://localhost:26657
yoda config broadcast-timeout "5m"
yoda config rpc-poll-interval "1s"
yoda config max-try 5
yoda config validator $(bandd keys show $WALLET_NAME -a --bech val)
```

Then, add multiple reporter accounts to allow Yoda to submit transactions concurrently.

```bash
yoda keys add REPORTER_1
yoda keys add REPORTER_2
yoda keys add REPORTER_3
yoda keys add REPORTER_4
yoda keys add REPORTER_5
```

Lastly, configure the Lambda Executor endpoint to helps running data source scripts and return results to Yoda. More details about the executor can be found in this [section](remote-data-source-executor.md).

```bash
export EXECUTOR_URL=<YOUR_EXECUTOR_URL>
yoda config executor "rest:${EXECUTOR_URL}?timeout=10s"
```

### Step 3.3: Start Yoda

To start Yoda, it's also recommend to use `systemctl`.

```bash
# Write yoda service to /etc/systemd/system/yoda.service
export USERNAME=$(whoami)
sudo -E bash -c 'cat << EOF > /etc/systemd/system/yoda.service
[Unit]
Description=Yoda Daemon
After=network-online.target

[Service]
User=$USERNAME
ExecStart=/home/$USERNAME/go/bin/yoda run
Restart=always
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF'
```

The first time running the Yoda, you will need to register both `bandd` and `yoda` services by running the following commands.

```bash
# Register bandd daemon to systemctl
sudo systemctl enable bandd
# Register yoda to systemctl
sudo systemctl enable yoda
```

Then start `bandd` and `yoda` services

```bash
# Start bandd daemon
sudo systemctl start bandd
# Start yoda daemon
sudo systemctl start yoda
```

Once `bandd` service has been started, logs can be queried by running `journalctl -u bandd.service -f` command. You will see your node beginning to sync.

After `yoda` service has been started, logs can be queried by running `journalctl -u yoda.service -f` command. Log should be similar to the following log example below. Once verified, you can stop tailing the log by typing `Control-C`.

```bash
... systemd[...]: Started Yoda Daemon.
... yoda[...]: I[...] ⭐  Creating HTTP client with node URI: tcp://localhost:26657
... yoda[...]: I[...] 🚀  Starting WebSocket subscriber
... yoda[...]: I[...] 👂  Subscribing to events with query: tm.event = 'Tx'...
```

### Step 3.4: Wait for the latest blocks to be synced

**This is an important step.** We should wait for newly started BandChain node to sync their blocks until the latest block is reached. The latest block can be checked on [CosmoScan](https://cosmoscan.io/blocks).

## Step 4: Become a Validator

This guide will show you how to register the running node as a validator. So that the program can fulfill the data on BandChain.

### Step 4.1: Fund the Validator Account

```bash
bandd keys show $WALLET_NAME
```

Then fund tokens into this account ready for staking.

### Step 4.2: Stake Tokens with the Validator Account

```bash
bandd tx staking create-validator \
    --amount 3000000uband \
    --commission-max-change-rate 0.01 \
    --commission-max-rate 0.2 \
    --commission-rate 0.1 \
    --from $WALLET_NAME \
    --min-self-delegation 1 \
    --moniker "$MONIKER" \
    --pubkey $(bandd tendermint show-validator) \
    --chain-id $CHAIN_ID
```

Registered validators can be found on [CosmoScan](https://cosmoscan.io/validators).

### Step 4.3: Register Reporters and Become Oracle Provider

Yoda contains multiple reporters. You will need to register the reporters in order to help the validator submit transactions of reporting data.

Firstly, reporter accounts must be create on BandChain by supplying some small amount of BAND tokens.

```bash
# Send 1uband from a wallet to each reporter.
bandd tx multi-send 1uband $(yoda keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

Secondly, register reporters to the validator, so that oracle requests for validator can be assigned to the reporters.

```bash
bandd tx oracle add-reporters $(yoda keys list -a) \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

Finally, activate the validator to become an oracle provider

```bash
bandd tx oracle activate \
  --from $WALLET_NAME \
  --chain-id $CHAIN_ID
```

If all procedures are successful, then oracle provider status for the validator should be `active`.

```bash
bandd query oracle validator $(bandd keys show -a $WALLET_NAME --bech val)

# {
#   "is_active": true,
#   "since": ...
# }
```

And now you have become a validator on BandChain Laozi mainnet.

Happy staking :chart_with_upwards_trend:, and may the **HODL** be with you.
