---
order: 2
title: Joining Mainnet
---

# Join the BandChain Mainnet

<!-- Introduction TBD -->

**This guide includes full instructions for joining the mainnet either as an archive/full node or a pruned node.**

### Overview

<!-- DON'T FORGET TO KEEP INDEX UP TO DATE -->

- [Getting Started](#getting-started)
- [Hardware Requirements](#hardware)
- [Setup Node Configuration](#setup-node-configuration)
- [Sync Options](#sync-options)
  - [Blocksync](#blocksync)
  - [State Sync](#state-sync)
  - [Quicksync](#quicksync)
- [Cosmovisor](#cosmovisor)
- [Setup Yoda](#setup-yoda)
- [Become a Validator](#become-validator)

## Getting Started

Make sure the following prerequisites are completed:

- Choose the proper hardware/server configuration. See the [hardware guide](#hardware).
- Follow the [configuration guide](#General-Configuration) to intialize and prepare the node to sync with the network.

## Hardware

TBD

## Setup Node Configuration

TBD

## Sync Options

There are three main ways to sync a node on the BandChain; Blocksync, State Sync, and Quicksync.

<!-- #sync options -->

::::::: tabs :options="{ useUrlFragment: false }"

:::::: tab Blocksync

### Blocksync

Blocksync is faster than traditional consensus and syncs the chain from genesis by downloading blocks and verifying against the merkle tree of validators. For more information see [Tendermint's Fastsync Docs](https://docs.tendermint.com/v0.34/tendermint-core/fast-sync.html)

When syncing via Blocksync, node operators will either need to manually upgrade the chain or set up [Cosmovisor](#Cosmovisor) to upgrade automatically.

For more information on performing the manual upgrades, see [Releases & Upgrades](#Releases-amp=-Upgrades).

It is possible to sync from previous versions of the Cosmos Hub. See the matrix below for the correct `bandd` version.

| Block              | Bandd Version |
| ------------------ | ------------- |
| Genesis - 11525000 | `v2.4.1`      |
| 11525000 - now     | `v2.3.6`      |

##### Getting Started

Start Bandd to begin syncing with the `skip-invariants` flag. For more information on this see [Verify Mainnet](#Verify-Mainnet).

```bash
bandd start --x-crisis-skip-assert-invariants

```

The node will begin rebuilding state until it hits the first upgrade height at block `11525000`. If Cosmovisor is set up then there's nothing else to do besides wait, otherwise the node operator will need to perform the manual upgrade twice.
::::::

:::::: tab "State Sync"

### State Sync

State Sync is an efficient and fast way to bootstrap a new node, and it works by replaying larger chunks of application state directly rather than replaying individual blocks or consensus rounds. For more information, see [Tendermint's State Sync docs](https://github.com/tendermint/tendermint/blob/v0.34.x/spec/p2p/messages/state-sync.md).

To enable state sync, visit an explorer to get a recent block height and corresponding hash. A node operator can choose any height/hash in the current bonding period, but as the recommended snapshot period is `1000` blocks, it is advised to choose something close to `current height - 1000`.

With the block height and hash selected, update the configuration in `~/.band/config/config.toml` to set `enable = true`, and populate the `trust_height` and `trust_hash`. Node operators can configure the rpc servers to a preferred provider, but there must be at least two entries. It is important that these are two rpc servers the node operator trusts to verify component parts of the chain state. While not recommended, uniqueness is not currently enforced, so it is possible to duplicate the same server in the list and still sync successfully.

> **Note**: In the future, the RPC server requirement will be deprecated as state sync is [moved to the p2p layer in Tendermint 0.38](https://github.com/tendermint/tendermint/issues/6491).

```
#######################################################
###         State Sync Configuration Options        ###
#######################################################
[statesync]
# State sync rapidly bootstraps a new node by discovering, fetching, and restoring a state machine
# snapshot from peers instead of fetching and replaying historical blocks. Requires some peers in
# the network to take and serve state machine snapshots. State sync is not attempted if the node
# has any local state (LastBlockHeight > 0). The node will have a truncated block history,
# starting from the height of the snapshot.
enable = true

# RPC servers (comma-separated) for light client verification of the synced state machine and
# retrieval of state data for node bootstrapping. Also needs a trusted height and corresponding
# header hash obtained from a trusted source, and a period during which validators can be trusted.
#
# For Cosmos SDK-based chains, trust_period should usually be about 2/3 of the unbonding time (~2
# weeks) during which they can be financially punished (slashed) for misbehavior.
rpc_servers = "https://cosmos-rpc.polkachu.com:443,https://rpc-cosmoshub-ia.cosmosia.notional.ventures:443,https://rpc.cosmos.network:443"
trust_height = 8959784
trust_hash = "3D8F12EA302AEDA66E80939F7FC785206692F8B6EE6F727F1655F1AFB6A873A5"
trust_period = "168h0m0s"
```

Start Bandd to begin state sync. It may take take some time for the node to acquire a snapshot, but the command and output should look similar to the following:

```bash
$ bandd start --x-crisis-skip-assert-invariants

...

> INF Discovered new snapshot format=1 hash="0x000..." height=8967000 module=statesync

...

> INF Fetching snapshot chunk chunk=4 format=1 height=8967000 module=statesync total=45
> INF Applied snapshot chunk to ABCI app chunk=0 format=1 height=8967000 module=statesync total=45
```

Once state sync successfully completes, the node will begin to process blocks normally. If state sync fails and the node operator encounters the following error: `State sync failed err="state sync aborted"`, either try restarting `bandd` or running `bandd unsafe-reset-all` (make sure to backup any configuration and history before doing this).
::::::

:::::: tab Quicksync

### Quicksync

Quicksync.io offers several daily snapshots of the Cosmos Hub with varying levels of pruning (`archive` 1.4TB, `default` 540GB, and `pruned` 265GB). For downloads and installation instructions, visit the [Cosmos Quicksync guide](https://quicksync.io/networks/cosmos.html).
::::::

:::::::

<!-- #end -->

## Cosmovisor

TBD

## Setup Yoda

Since a subset of validators who are selected for a data request must send the data they received as a transaction of [MsgReportData](../whitepaper/protocol-messages.md#msgreportdatas) to BandChain.

Yoda is a program used by BandChain's validator nodes to help automatically query data from data providers by executing data source script, then submitting the result to fulfill the request. [Read more on the Yoda section.](./yoda.md)

### Step 1: Installation

Before setting up Yoda, Lambda function executor need to be setup to execute data sources. If this step has not been done yet, please follow the instructions on following pages (select either one of these methods):

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

Lastly, configure the Lambda Executor endpoint to helps running data source scripts and return results to Yoda. More details about the executor can be found in this [section](remote-data-source-executor.md).

```bash
export EXECUTOR_URL=<YOUR_EXECUTOR_URL>
yoda config executor "rest:${EXECUTOR_URL}?timeout=10s"
```

### Step 3: Start Yoda

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

### Step 4: Wait for the latest blocks to be synced

**This is an important step.** We should wait for newly started BandChain node to sync their blocks until the latest block is reached. The latest block can be checked on [CosmoScan](https://cosmoscan.io/blocks).

## Become a Validator

This guide will show you how to register the running node as a validator. So that the program can fulfill the data on BandChain.

### Step 1: Fund the Validator Account

```bash
bandd keys show $WALLET_NAME
```

Then fund tokens into this account ready for staking.

### Step 2: Stake Tokens with the Validator Account

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

### Step 3: Register Reporters and Become Oracle Provider

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
