<!--
order: 2
-->

# Getting started

This guide serves as a brief guide on how to utilize the pricefeed module in your cosmos-sdk app.

## Prerequisites
Be sure you have met the prerequisites before you following this guide.

### Operating systems
- Ubuntu 22.04

### Go (for ignite and consumer chain)
- 1.19.5 or higher

### Ignite CLI
- 0.26.1 or higher

### Rust (for Hermes Relayer)
- 1.65.0 or higher

### Installation

### Installing build-essential package in Ubuntu 

```
sudo apt update && sudo apt install build-essential
```

## Creating a new blockchain

To create a new blockchain project with Ignite, you will need to run the following command:

```
ignite scaffold chain example
```
The ignite scaffold chain command will create a new blockchain in a new directory example.



## Step 1: Replace the genesis state

### Config proposal voting period by Ignite

To expedite the testing of the pricefeed module, modify the default voting period to 40 seconds using Ignite feature to replace the genesis state by incorporating this code in `config.yml`.

```yml
...
genesis:
  app_state:
    gov:
      voting_params:
        voting_period: "40s"
```

### Initiate source channel and symbol requests by Ignite

To utilize the Ignite feature to replace the genesis state without open `update-symbol-requests` proposal, insert the code shown below into the `config.yml` file.

```yml
...
genesis:
  app_state:
    ...
    pricefeed:
        params:
            source_channel: "channel-0"
        symbol_requests: [{"symbol": "BAND", "oracle_script_id": 396, "block_interval":  40}]
```

## Step 3: Import pricefeed module to your cosmos app

### Edit cosmos-sdk and ibc-go version

To ensure compatibility with the pricefeed module, kindly update the cosmos-sdk version to `v0.46.12`.

```go
require (
    ...
    github.com/cosmos/cosmos-sdk v0.46.12
)
```

Additionally, modify the ibc-go dependency in both the go.mod and app.go files, replacing the version `v6.1.0` from the repository github.com/cosmos/ibc-go/v6 with version `v5.2.0` from the repository github.com/cosmos/ibc-go/v5.

```go
require (
    ...
    github.com/cosmos/ibc-go/v5 v5.2.0
)
```

### Replace to use tendermint that develop by informalsystems 

As tendermint is no longer being developed, the pricefeed module now uses the version implemented by cometbft. Therefore, to replace the tendermint version, kindly add this line in `go.mod`.

```
replace (
    ...
    github.com/tendermint/tendermint => github.com/cometbft/cometbft v0.34.27
)
```

Then run `go mod tidy` to update all module packages.


<!-- ### Install pricefeed package

```
go install github.com/bandprotocol/oracle-consumer
``` -->

### Add pricefeed keeper in `app/app.go`
#### Add pricefeed proposal

```go
import (
    ...
    pricefeedclient "github.com/bandprotocol/oracle-consumer/x/pricefeed/client"
)

func getGovProposalHandlers() []govclient.ProposalHandler {
    var govProposalHandlers []govclient.ProposalHandler
    
    govProposalHandlers = append(
        ...
        pricefeedclient.ProposalHandler,
    )

    return govProposalHandlers
}
```

#### Add pricefeed module basic

```go
import (
    ...
    pricefeed "github.com/bandprotocol/oracle-consumer/x/pricefeed"
)

ModuleBasics = module.NewBasicManager(
    ...
    pricefeed.AppModuleBasic{},
)
```

#### Add pricefeed keeper type in `BandApp`

```go
import (
    ...
    pricefeedkeeper "github.com/bandprotocol/oracle-consumer/x/pricefeed/keeper"
)

type BandApp struct {
    ...
    PricefeedKeeper       pricefeedkeeper.Keeper

    ...
    ScopedPricefeedKeeper capabilitykeeper.ScopedKeeper
}
```

#### Add pricefeed store key

```go
import (
    ...
    pricefeedtypes "github.com/bandprotocol/oracle-consumer/x/pricefeed/types"
)

keys := sdk.NewKVStoreKeys(
    ...
    pricefeedtypes.StoreKey,
)
```

#### Create new pricefeed keeper

```go
scopedPricefeedKeeper := app.CapabilityKeeper.ScopeToModule(pricefeedtypes.ModuleName)
app.ScopedPricefeedKeeper = scopedPricefeedKeeper
app.PricefeedKeeper = pricefeedkeeper.NewKeeper(
	appCodec,
	keys[pricefeedtypes.StoreKey],
	app.GetSubspace(pricefeedtypes.ModuleName),
	app.IBCKeeper.ChannelKeeper,
	app.IBCKeeper.ChannelKeeper,
	&app.IBCKeeper.PortKeeper,
	scopedPricefeedKeeper,
)
```

#### Create pricefeed module

```go
import (
    ...
    pricefeedmodule "github.com/bandprotocol/oracle-consumer/x/pricefeed"
)

pricefeedModule := pricefeedmodule.NewAppModule(appCodec, app.PricefeedKeeper)
pricefeedIBCModule := pricefeedmodule.NewIBCModule(app.PricefeedKeeper)
```

#### Add pricefeed module in IBC router
```go
ibcRouter.
	AddRoute(...).
	AddRoute(pricefeedtypes.ModuleName, pricefeedIBCModule)
```

#### Add pricefeed in governance Handler router

```go
govRouter.
    AddRoute(...).
    AddRoute(pricefeedtypes.RouterKey, pricefeedmodule.NewUpdateSymbolRequestProposalHandler(app.PricefeedKeeper))
```

#### Add pricefeed in module manager

```go
app.mm = module.NewManager(
	...,
	pricefeedModule,
)
```

#### Set pricefeed order in begin block, end block and init genesis

```go
app.mm.SetOrderBeginBlockers(
    ...,
    pricefeedtypes.ModuleName,
)

app.mm.SetOrderEndBlockers(
    ...,
    pricefeedtypes.ModuleName,
)

app.mm.SetOrderInitGenesis(
    pricefeedtypes.ModuleName,
)
```

#### Set pricefeed order for deterministic simulations

```go
app.sm = module.NewSimulationManager(
    ...
    pricefeedModule,
)
```

#### Add pricefeed subspace in params Keeper

```go
func initParamsKeeper(...) paramskeeper.Keeper {
	paramsKeeper.Subspace(...)
	paramsKeeper.Subspace(pricefeedmoduletypes.ModuleName)
}
```

Once you have completed the addition of the pricefeed module in the app.go file, execute the command `go mod tidy` to import and update the necessary modules.

Now have completed importing the pricefeed module and can now execute the chain by running this command :tada:
```
ignite chain serve -v
```

## Step 4: Setup a relayer
The second step is to set up a relayer to listen and relay IBC packets between a your chain and BandChain.

Here are the simple guides for setting up a relayer.

- [Hermes relayer](https://github.com/bandprotocol/cw-band/blob/main/docs/setup_relayer_hermes.md)
- [Go relayer](https://github.com/bandprotocol/cw-band/blob/main/docs/setup_relayer_go-relayer.md)

## Step 5 (optional): Open proposal for change params and update symbol requests

Since you have already configured the symbol requests and source-channel in the `config.yml` file during the [step 2](#step-2-initiate-source-channel-and-symbol-requests-by-ignite) , you may skip this particular step.

### Step 5.1 Open source channel param change proposal and vote

The current default value for the source channel is `[not_set]`. If you wish to obtain BandChain data through IBC, you will need to open the proposal to change the source channel param to your own source channel. An example of how to open parameter change proposal is provided below.

#### create param-change-proposal.json

```json
{
  "title": "Param change for SourceChannel",
  "description": "Proposal for change SourceChannel param in pricefeed module",
  "changes": [
    {
      "subspace": "pricefeed",
      "key": "SourceChannel",
      "value": "channel-0"
    }
  ],
  "deposit": "10000000stake"
}
```

#### Submit proposal

```
exampled tx gov submit-legacy-proposal param-change param-change-proposal.json --from alice
```

#### Vote the proposal

```
exampled tx gov vote 1 yes --from alice
```

```
exampled tx gov vote 1 yes --from bob
```


### Step 5.2: Open update symbol request proposal and vote

The purpose of this proposal is to request price data from BandChain at `block_interval` specified in the proposal. If the proposal is approved, the pricefeed module will retrieve the data and store the response on the consumer chain.

#### create update-symbol-requests-proposal.json

> Note: You can delete symbol request by set `"block_interval": "0"` on this proposal.

```json
{
    "title": "Update Symbol requests",
    "description": "Update symbol that request price from BandChain",
    "symbol_requests": [
        {
            "symbol": "BTC",
            "oracle_script_id": "396",
            "block_interval": "40"
        },
        {
            "symbol": "ETH",
            "oracle_script_id": "396",
            "block_interval": "40"
        }
    ],
    "deposit": "10000000stake"
}
```

#### Submit proposal

```
exampled tx gov submit-legacy-proposal update-symbol-request update-symbol-requests-proposal.json --from alice
```

#### Vote the proposal

```
exampled tx gov vote 2 yes --from alice
```

```
exampled tx gov vote 2 yes --from bob
```

#### Check proposal status

```
exampled query gov proposals
```

### Query latest price that got from BandChain

Once the proposal has been approved, the pricefeed module will query BTC and ETH from BandChain every 40 blocks on your chain, and you can view the latest price by executing this command.

```
exampled query pricefeed price [symbol]
```
