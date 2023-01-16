<!--
order: 2
-->

# Joining Testnet

<!-- Introduction TBD -->

**This guide includes full instructions for joining the testnet either as an archive/full node or a pruned node.**

## Overview

- [Hardware Requirements](#hardware)
- [Setup Node](#setup-node-configuration)
- [Setup Cosmovisor](#setup-cosmovisor)
- [Sync Options](#sync-options)
  - [Block Sync](#block-sync)
  - [State Sync](#state-sync)
- [Setup daemon service](#setup-daemon-service)
- [Setup Yoda](#setup-yoda)
- [Become a Validator](#become-validator)

## Hardware

You have to have at least 16 GB of RAM and 4 CPU Cores to run a node in BandChain Laozi testnet.

**Note:** Storage size for validators will depend on the level of pruning.

## Setup Node Configuration

This step provides procedures to install BandChain's executable and sync blocks with other peers.

Assuming to run on Ubuntu 22.04 LTS allowing connection on port 26656 for P2P connection.

Before beginning instructions, the following variables should be set to be used in further instructions. **Please make sure that these variables are set every time when using the new shell session.**

```bash
# Chain ID of testnet
export CHAIN_ID="band-laozi-testnet6"
# Wallet name to be used as validator's account, please change this into your name (no whitespace).
export WALLET_NAME=<YOUR_WALLET_NAME>
# Name of your validator node, please change this into your name.
export MONIKER=<YOUR_MONIKER>
# Seed and persistent peers for P2P communication
export SEEDS="da61931cbbbb2b62dbe7c470d049126cf365d257@35.213.165.61:26656,fffd730672f04d5dc065fa9afce2eb1d6bc4d150@35.212.60.28:26656"
# URL of genesis file for Laozi testnet
export GENESIS_FILE_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/band-laozi-testnet6/genesis.json
# Data sources/oracle scripts files
export BIN_FILES_URL=https://raw.githubusercontent.com/bandprotocol/launch/master/band-laozi-testnet6/files.tar.gz
# Faucet endpoint
export FAUCET_URL=https://laozi-testnet6.bandchain.org/faucet
```

### Step 1: Installation
The following applications are required to build and run the BandChain node.

- make, gcc, g++ (can be obtained from the build-essential package on linux)
- wget, curl for downloading files

```bash
# install required tools
sudo apt-get update && \
sudo apt-get upgrade -y && \
sudo apt-get install -y build-essential curl wget
```

- Install Go 1.19.1
```bash
# Install Go 1.19.1
wget https://go.dev/dl/go1.19.1.linux-amd64.tar.gz
tar xf go1.19.1.linux-amd64.tar.gz
sudo mv go /usr/local/go

# Set Go path to $PATH variable
echo "export PATH=$PATH:/usr/local/go/bin:~/go/bin" >> $HOME/.profile
source ~/.profile
```

Go binary should be at /usr/local/go/bin and any executable compiled by go install command should be at ~/go/bin

### Step 2: Clone & Install BandChain Laozi
```bash
cd ~
# Clone BandChain Laozi version v2.4.1
git clone https://github.com/bandprotocol/chain
cd chain
git fetch && git checkout v2.4.1

# Install binaries to $GOPATH/bin
make install
```

### Step 3: Initialize the BandChain and download the genesis file
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

### Step 4: Setup seeds and minimum gas price

```bash
# Add seeds to config.toml
sed -E -i \
  "s/seeds = \".*\"/seeds = \"${SEEDS}\"/" \
  $HOME/.band/config/config.toml

# Add minimum gas price
sed -E -i \
  "s/^minimum-gas-prices *=.*/minimum-gas-prices = \"0.0025uband\"/" \
  $HOME/.band/config/app.toml
```

## Setup Cosmovisor

Cosmovisor is a small process manager for Cosmos SDK application binaries that monitors the governance module via stdout for incoming chain upgrade proposals

### Step 1: Setup environment variables
Add required environment variables for Cosmovisor into your profile

```bash
cd ~
echo "export DAEMON_NAME=bandd" >> ~/.profile
echo "export DAEMON_HOME=$HOME/.band" >> ~/.profile
source ~/.profile
```

### Step 2: Install and provide binaries
Install Cosmovisor and provide bandd binary to Cosmovisor

```bash
# Install Cosmovisor
go install github.com/cosmos/cosmos-sdk/cosmovisor/cmd/cosmovisor@v1.0.0

# Setup folder and provide bandd binary for Cosmovisor Genesis
mkdir -p $HOME/.band/cosmovisor/genesis/bin
mkdir -p $HOME/.band/cosmovisor/upgrades
cp $HOME/go/bin/bandd $HOME/.band/cosmovisor/genesis/bin

# Setup folder and provide bandd binary for Cosmovisor Upgrades
mkdir -p $HOME/.band/cosmovisor/upgrades/v2_4/bin
cp $HOME/go/bin/bandd $DAEMON_HOME/cosmovisor/upgrades/v2_4/bin
```

## Sync Options

There are two main ways to sync a node on the BandChain; Blocksync and State Sync. However, we recommend using State Sync as it's faster.

<!-- #sync options -->

::::::: tabs :options="{ useUrlFragment: false }"

:::::: tab "Block Sync"

### Block Sync

Blocksync is faster than traditional consensus and syncs the chain from genesis by downloading blocks and verifying against the Merkle tree of validators. For more information see [Tendermint's Fastsync Docs](https://docs.tendermint.com/v0.34/tendermint-core/fast-sync.html)

When syncing via Blocksync, node operators will need to provide the binary of each upgrade version for Cosmovisor to switch when it reaches the upgrade heights.

You can see the detail of genesis and each upgrade in the table below.

| Upgrade name  | Upgrade Height | Upgrade detail | Go version | Bandd version | Binary path                            |
| -----------   | -------------- | -------------- | ---------- | ------------- | -------------------------------------- |
| `genesis`     | `0`            | -              | `1.16.7`   | `v2.3.6`      | `~/.band/cosmovisor/genesis/bin`       |
| `v2_4`        | `427000`       | [link](https://medium.com/bandprotocol/bandchain-v2-4-upgrade-70dbb896618c) | `1.19.1`   | `v2.4.1`      | `~/.band/cosmovisor/upgrades/v2_4/bin` |

Before doing the next step, you have to build and provide each correct bandd binary version to Cosmovisor in the binary path so that Cosmovisor can automatically switch it correctly.

::::::

:::::: tab "State Sync"

### State Sync

State Sync is an efficient and fast way to bootstrap a new node, and it works by replaying larger chunks of application state directly rather than replaying individual blocks or consensus rounds. For more information, see [Tendermint's State Sync docs](https://github.com/tendermint/tendermint/blob/v0.34.x/spec/p2p/messages/state-sync.md).

#### Setup variables

```bash
# Get trust height and trust hash

LATEST_HEIGHT=$(curl -s https://rpc.laozi-testnet6.bandchain.org/block | jq -r .result.block.header.height);
TRUST_HEIGHT=$(($LATEST_HEIGHT-45000))
TRUST_HASH=$(curl -s "https://rpc.laozi-testnet6.bandchain.org/block?height=$TRUST_HEIGHT" | jq -r .result.block_id.hash)

# show trust height and trust hash
echo "TRUST HEIGHT: $TRUST_HEIGHT"
echo "TRUST HASH: $TRUST_HASH"
```

#### Setup State Sync config

```bash
# Enable State Sync
sed -i \
    '/\[statesync\]/,+34 s/enable = false/enable = true/' \
    $HOME/.band/config/config.toml

# Set RPC Endpoint for State Sync
sed -E -i \
    "/\[statesync\]/,+34 s/rpc_servers = \".*\"/rpc_servers = \"https\:\/\/rpc.laozi-testnet6.bandchain.org\:443,https\:\/\/rpc.laozi-testnet6.bandchain.org\:443\"/" \
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

::::::

:::::::

## Setup daemon service

We do recommend running the Bandchain node as a daemon, which can be set up using `systemctl`. 

### Step 1: Create BandChain service
Run the following command to create a new daemon for `cosmovisor` that runs bandd (This script work on non-root user).

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

### Step 2: Register and start bandd service
In this step, we will register and start bandd service

```bash
# Register bandd to systemctl
sudo systemctl enable bandd
# Start bandd daemon
sudo systemctl start bandd
```

Once `bandd` service has been started, logs can be queried by running `journalctl -u bandd.service -f` command. You will see your node beginning to sync.


## Setup Yoda

Since a subset of validators who are selected for a data request must send the data they received as a transaction of [MsgReportData](../whitepaper/protocol-messages.md#msgreportdatas) to BandChain.

Yoda is a program used by BandChain's validator nodes to help automatically query data from data providers by executing data source script, then submitting the result to fulfill the request. [Read more on the Yoda section.](../technical-specifications/yoda.md)

### Step 1: Installation

Before setting up Yoda, the Lambda function executor need to be set up to execute data sources. If this step has not been done yet, please follow the instructions on the following pages (select either one of these methods):

- [AWS Lambda Function](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-AWS-Lambda)
- [Google Cloud Function](https://github.com/bandprotocol/data-source-runtime/wiki/Setup-Yoda-Executor-Using-Google-Cloud-Function)

To check Yoda version, use the following command.

```bash
yoda version
# v2.4.1
```

### Step 2: Set the Yoda configurations

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

Lastly, configure the Lambda Executor endpoint to helps running data source scripts and return results to Yoda. More details about the executor can be found in this [section](../technical-specifications/remote-data-source-executor.md).

```bash
export EXECUTOR_URL=<YOUR_EXECUTOR_URL>
yoda config executor "rest:${EXECUTOR_URL}?timeout=10s"
```

### Step 3: Start Yoda

To start Yoda, it's also recommended to use `systemctl`.

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

The first time running Yoda, you will need to register and start `yoda` services by running the following commands.

```bash
# Register yoda to systemctl
sudo systemctl enable yoda
# Start yoda daemon
sudo systemctl start yoda
```

After `yoda` service has been started, logs can be queried by running `journalctl -u yoda.service -f` command. The log should be similar to the following log example below. Once verified, you can stop tailing the log by typing `Control-C`.

```bash
... systemd[...]: Started Yoda Daemon.
... yoda[...]: I[...] ⭐  Creating HTTP client with node URI: tcp://localhost:26657
... yoda[...]: I[...] 🚀  Starting WebSocket subscriber
... yoda[...]: I[...] 👂  Subscribing to events with query: tm.event = 'Tx'...
```

### Step 4: Wait for the latest blocks to be synced

**This is an important step.** We should wait for the newly started Bandchain node to sync its blocks until the latest block is reached. The latest block can be checked on [CosmoScan](https://laozi-testnet6.cosmoscan.io/).

## Become a Validator

This step provides procedures to register the node as a validator.

### Step 1: Create a new Account to be Used as Validator

```bash
# Request new coins from faucet
curl --location --request POST "${FAUCET_URL}" \
--header 'Content-Type: application/json' \
--data-raw "{
 \"address\": \"$(bandd keys show $WALLET_NAME -a)\"
}"
```

### Step 2: Stake Tokens with the Validator Account

```bash
bandd tx staking create-validator \
    --amount 1000000uband \
    --commission-max-change-rate 0.01 \
    --commission-max-rate 0.2 \
    --commission-rate 0.1 \
    --from $WALLET_NAME \
    --gas-prices 0.0025uband \
    --min-self-delegation 1 \
    --moniker "$MONIKER" \
    --pubkey $(bandd tendermint show-validator) \
    --chain-id $CHAIN_ID
```

After becoming a validator, the validator node will be shown on Block Explorer [here](https://laozi-testnet6.cosmoscan.io/validators).

### Step 3: Register Reporters and Become Oracle Provider

Now, Yoda has multiple reporters. To grant the reporters be able to report data for the validator, the following commands should be run.

Firstly, reporter accounts must be created on Bandchain by supplying some small amount of BAND tokens.

```bash
# Send 1uband from a wallet to each reporter.
bandd tx multi-send 1uband $(yoda keys list -a) \
  --from $WALLET_NAME \
  --gas-prices 0.0025uband \
  --chain-id $CHAIN_ID
```

Secondly, grant all reporters for the validator, so that oracle requests for validator can be sent by the reporters.

```bash
bandd tx oracle add-reporters $(yoda keys list -a) \
  --from $WALLET_NAME \
  --gas-prices 0.0025uband \
  --chain-id $CHAIN_ID
```

Finally, activate the validator to become an oracle provider

```bash
bandd tx oracle activate \
  --from $WALLET_NAME \
  --gas-prices 0.0025uband \
  --chain-id $CHAIN_ID
```

If all procedures are successful, then the oracle provider status for the validator should be `active`.

```bash
bandd query oracle validator $(bandd keys show -a $WALLET_NAME --bech val)

# {
#   "is_active": true,
#   "since": ...
# }
```

And now you have become a validator on Bandchain Laozi testnet.
