<!--
order: 2
-->

# Getting started

This guide serves as a brief guide on how to utilize the pricefeed module in your cosmos-sdk app. For demonstrations on how to use the prices obtained from this module, kindly refer to the [Example Use Cases](https://) section.

### Prerequisites
Be sure you have met the prerequisites before you following this guide.

#### Operating systems
- Ubuntu 22.04

#### Go (for ignite and consumer chain)
- 1.19.5 or higher

#### Ignite CLI
- 0.26.1 or higher

#### Rust (for Hermes Relayer)
- 1.65.0 or higher

#### Installation

##### Installing build-essential package in Ubuntu 

```
sudo apt update && sudo apt install build-essential
```

### Creating a new blockchain

To create a new blockchain project with Ignite, you will need to run the following command:

```
ignite scaffold chain example
```
The ignite scaffold chain command will create a new blockchain in a new directory example.



### Config proposal voting period

To expedite the testing of the pricefeed module, modify the default voting period to 40 seconds by incorporating this code in `example/config.yml`.

```
...
genesis:
  app_state:
    gov:
      voting_params:
        voting_period: "40s"
```


### Step 1: Import pricefeed moudle to your cosmos app

##### Replace to use tendermint that develop by informalsystems 

As tendermint is no longer being developed, the pricefeed module now uses the version implemented by informalsystems. Therefore, to replace the tendermint version, kindly add this line in `example/go.mod`.

```
replace (
    ...
    github.com/tendermint/tendermint => github.com/informalsystems/tendermint v0.34.26
)
```

##### Replace to use ibc-go v5

To ensure compatibility with the pricefeed module, kindly update the ibc-go version to v5 by replacing

```go
require (
    ...
    github.com/cosmos/ibc-go/v6 v6.1.0
)
```

To

```go
require (
    ...
    github.com/cosmos/ibc-go/v5 v5.1.0
)
```

##### Install pricefeed package

```
go install github.com/bandprotocol/oracle-consumer
```

##### Add pricefeed in proposal handler

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

##### Add pricefeed module basic

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

##### Add pricefeed keeper

```go
import (
    ...
    pricefeedkeeper "github.com/bandprotocol/oracle-consumer/x/pricefeed/keeper"
)

type BandApp struct {
    ...
    scopedpricefeedKeeper capabilitykeeper.ScopedKeeper
    pricefeedKeeper pricefeedkeeper.Keeper
}
```

##### Add pricefeed store key

```go
keys := sdk.NewKVStoreKeys(
    ...
    pricefeedtypes.StoreKey,
)
```

##### Add pricefeed keeper in app

```go
scopedpricefeedKeeper := app.CapabilityKeeper.ScopeToModule(pricefeedtypes.ModuleName)
app.scopedpricefeedKeeper = scopedpricefeedKeeper
app.pricefeedKeeper = *pricefeedkeeper.NewKeeper(
    appCodec,
    keys[pricefeedtypes.StoreKey],
    keys[pricefeedtypes.MemStoreKey],
    app.GetSubspace(pricefeedtypes.ModuleName),
    app.IBCKeeper.ChannelKeeper,
    &app.IBCKeeper.PortKeeper,
    scopedpricefeedKeeper,
)
```

##### Create pricefeed module 

```go
pricefeedModule := pricefeedmodule.NewAppModule(appCodec, app.pricefeedKeeper)
pricefeedIBCModule := pricefeedmodule.NewIBCModule(app.pricefeedKeeper)
```

##### Add pricefeed in governance Handler router

```go
govRouter.
    AddRoute(...).
    AddRoute(pricefeedtypes.RouterKey, pricefeedmodule.NewUpdateSymbolRequestProposalHandler(app.pricefeedKeeper))
```

##### Add pricefeed in module manager

```go
app.mm = module.NewManager(
	...,
	pricefeedModule,
)
```

##### Set pricefeed order in begin block, end block and init genesis

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

##### Define the order of the pricefeed for deterministic simulations

```go
app.sm = module.NewSimulationManager(
    ...
    pricefeedModule,
)
```

##### Add pricefeed subspace in params Keeper

```go
func initParamsKeeper(appCodec codec.BinaryCodec, legacyAmino *codec.LegacyAmino, key, tkey storetypes.StoreKey) paramskeeper.Keeper {
	paramsKeeper := paramskeeper.NewKeeper(appCodec, legacyAmino, key, tkey)

	paramsKeeper.Subspace(...)
	paramsKeeper.Subspace(pricefeedmoduletypes.ModuleName)
	// this line is used by starport scaffolding # stargate/app/paramSubspace

	return paramsKeeper
}
```

You have completed importing the pricefeed module and can now execute the chain by running this command :tada:
```
ignite chain serve -v
```

### Step 2: Setup a relayer
The second step is to set up a relayer to listen and relay IBC packets between a your chain and BandChain.

Here are the simple guides for setting up a relayer.

- [Hermes relayer](https://github.com/bandprotocol/cw-band/blob/main/docs/setup_relayer_hermes.md)
- [Go relayer](https://github.com/bandprotocol/cw-band/blob/main/docs/setup_relayer_go-relayer.md)


### Step 3: Open update symbol request proposal and vote

The purpose of this proposal is to request price data from BandChain at `block_interval` specified in the proposal. If the proposal is approved, the pricefeed module will retrieve the data and store the response on the consumer chain.

#### create proposal.json

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
exampled tx gov submit-legacy-proposal update-symbol-request proposal.json --from alice
```

#### Vote the proposal

```
exampled tx gov vote 1 yes --from alice
```

```
exampled tx gov vote 1 yes --from bob
```

#### Check proposal status

```
exampled query gov proposals
```

### Query latest price that got from BandChain

Once the proposal has been approved, the pricefeed module will query BTC and ETH from BandChain every 40 blocks on your chain, and you can view the latest price by executing this command.

```
exampled query pricefeed price BTC
```
