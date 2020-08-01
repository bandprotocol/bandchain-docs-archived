---
sidebar: auto
sidebarDepth: 0
---

# BandChain Whitepaper

This whitepaper outlines implementation plans and research directions for [Band Protocol](https://bandprotocol.com)'s decentralized crosschain data-oracle network. The implementations of the core protocol and its supporting tools are available for public inspection on [GitHub](https://github.com/bandprotocol/bandchain).

## Introduction

The majority of existing smart contract platforms, while supporting trustless executions of arbitrary programs, lack access to real-world data. This limitation hinders the maximum potential of such contracts. BandChain was created to solve this issue by connecting public blockchains with these real-world, off-chain information. The project was created with the following design goals:

1. **Speed and Scalability:** The system must be able to serve a large quantity of data requests to multiple public blockchains with minimal latency and while maintaining a high throughput. The expected response time must be in the order of seconds.

2. **Cross-Chain Compatibility:** The system must be blockchain-agnostic and able to serve data to most publicly available blockchains. Verification of data authenticity on the target blockchains must be efficient and trustless by nature.

3. **Data Flexibility:** The system must be generic and able to support different methods of retrieiving and aggregating data, including both permissionless, publicly available data as well as information guarded by centralized parties.

BandChain achieves the aforementioned goals with a blockchain specifically built for off-chain data curation. The blockchain supports generic data requests and on-chain aggregations with WebAssembly-powered oracle scripts. Oracle results on BandChain blockchain can be sent across to other blockchains via the [Inter-Blockchain Communication protocol (IBC)](https://cosmos.network/ibc/) or through customized one-way bridges with minimal latency.

Table of Contents:

[[toc]]

## Terminology

### Data Sources

A data source is the most fundamental unit in BandChain's oracle system. It describes the procedure to retrieve a raw data point from a primary source and the fee associated with one data query. On BandChain, a data source can be registered into the system by anyone. This is done through the registrant sending a `MsgCreateDataSource` message to the chain. In this message, they specify various parameters the data source they wish to register, including

- the sender who wish to create the data source
- the owner of the data source, if specified
- the name of the data source
- (Phase 2+) the per-query fee that someone looking to use that data source needs to pay
- the content of the executable to be run by block validators upon receiving a data request for this data source

When registering the data source, the message sender can choose whether to specify an owner of the source. If an owner is specified, only the owner can make any changes to the data source once it is registered. They will also be the only party able to collect the accumulated request fees. On the other hand, if an owner is omitted, the data source can no longer be edited after it is registered. Note that the sender who creates the data source and the owner of the data source does not need to be the same.

In the case of unowned data sources, it is the data source's configuration on BandChain that cannot be changed. If the procedures associated with that source depends on centralized sources. the actual source of the data can still be controlled by centralized parties.

#### Examples

The following two examples illustrate what a data source executable might look like. Both examples are written in [Bash](https://en.wikipedia.org/wiki/Bash_(Unix_shell)).

##### Retrieve Cryptocurrency Price from CoinGecko

The data source requires that [cURL](https://en.wikipedia.org/wiki/CURL) and [jq](https://github.com/stedolan/jq) are installed on the executable runner's machine and expects one argument; the currency ticker symbol.

```bash
#!/bin/sh

# Cryptocurrency price endpoint: https://www.coingecko.com/api/documentations/v3
URL="https://api.coingecko.com/api/v3/simple/price?ids=$1&vs_currencies=usd"
KEY=".$1.usd"

# Performs data fetching and parses the result
curl -s -X GET $URL -H "accept: application/json" | jq -r ".[\"$1\"].usd"
```

##### Resolve Hostname to IP Addresses

Again, this script assumes that [getent](https://en.wikipedia.org/wiki/Getent) and [awk](https://en.wikipedia.org/wiki/AWK) are available on the host and the host is connected to the DNS network.

```bash
#!/bin/sh

getent hosts $1 | awk '{ print $1 }'
```

### Oracle Scripts

When someone wants to request data from BandChain's oracle, they must do so by calling one of the available oracle scripts. An oracle script is an executable program that encodes (1) the set of raw data requests to the sources it needs and (2) the way to aggregate raw data reports into the final result. These sources can be the data sources published on the network, as well as other oracle scripts. Oracle scripts are also Turing-complete and can be programmed in multiple languages. This composability and Turing-completeness makes oracle scripts very similar to [smart contracts](https://en.wikipedia.org/wiki/Smart_contract). 

To create an oracle script, the creator must broadcast a [`MsgCreateOracleScript`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgcreateoraclescript) to BandChain. The contents of the message includes:

- the sender who wishes to create the oracle script
- the owner of the oracle script, if specified
- the name of the oracle script
- the [OWasm](./Oracle-WebAssembly-(OWasm)) compiled binary attached to this oracle script
- the schema detailing the inputs and outputs of this oracle script, as well as the corresponding types
- the URL for the source code of this oracle script

Similar to data sources, the sender who wishes to create the oracle script does not have to be the same as the owner of the oracle script specified in the message.

The execution flow of an oracle script can be broken down into two phases. In the first phase, the script outlines the data sources that are required for its execution. It then sends out a request to the chain's validators to retrieve the result from the required data sources. The contents of this consists of the data sources' execution steps and the associated parameters.

The second phase then aggregates all of the [data reports](#raw-data-reports) returned by the validators, with each report containing the values the validator received from the required data sources. The script then proceeds to combine those values into a single final result. 

Note that the specifics of the aggregation process is entirely up to the design of the oracle script. BandChain does not enforce any regulations when it comes to the aggregation method used, and entirely leaves that design decision to the creator of the script or any subsequent editors.

#### Example

The pseudocode below shows an example of an oracle script that returns the current price of a cryptocurrency. The script begins by emitting requests to validators to query the price from three data sources (i.e. the `request`  function calls to CoinGecko, CryptoCompare, CoinMarketCap inside `prepare`). Once a sufficient number of validators have reported the prices, the script then aggregates and averages out the reported values results into a single final result (the `aggregate` function). 

In this particular oracle script, the aggregation process starts by summing all of the price values returned by the validators across all data sources, as well as the total number of reports returned. It then simply divides the summed price value with the number of data reports returned to arrive at the final average value.

```python
# 1st Phase. Emits raw data requests that the oracle script needs.
def prepare(symbol):
    request(get_px_from_coin_gecko, symbol)
    request(get_px_from_crypto_compare, symbol)
    request(get_px_from_coin_market_cap, symbol)

# 2nd Phase. Aggregates raw data reports into the final result.
def aggregate(symbol, number_of_reporters):
    data_report_count = 0
    price_sum = 0.0
    for reporter_index in range(number_of_reporters):
        for data_source in (
            get_px_from_coin_gecko,
            get_px_from_crypto_compare,
            get_px_from_coin_market_cap,
        ):
            price_sum = receive(reporter_index, data_source, symbol)
            data_report_count += 1
    return price_sum / data_report_count
```

### Raw Data Reports

Raw data reports are the results that BandChain's validators return when they have successfully responded to a data request and subsequently retrieved results from the required data sources. In these reports, the validators list out the result they got from each data source, using the data source's external ID as the reference key. The external ID is the identifier used to reference a data source within an oracle script, and each data source's external ID is unique within the context of that script.

### Oracle Data Proof

When the final data request result is successfully stored onto BandChain, an oracle data proof is produced. This proof is a Merkle proof that shows the existence of the final result of the data request on BandChain. In addition to the actual result value of the request, the proof contains information on the request parameters (oracle script hash, the parameters, the time of execution, etc) as well as as well as those of the associated response (e.g. number of validators that responded to the request). This proof can then be used by smart contracts on other blockchain to verify the existence of the data as well as to decode and retrieve the result stored. Both of these can be done by interacting with our [lite client](https://github.com/bandprotocol/bandchain/wiki/Lite-Client-Protocol).

---

## System Overview

BandChain is a high-performance public blockchain that allows anyone to make a request for APIs and services available on the traditional web. It is built on top of the [Cosmos SDK](http://cosmos.network/), and utilizes [Tendermint](https://tendermint.com/)'s [Byzantine Fault Tolerance](https://en.wikipedia.org/wiki/Byzantine_fault) consensus algorithm to reach immediate finality. This finality is specifically reached upon getting confirmations from a sufficient number of block validators.

### Network Participants

BandChain's network consists of a number of network participants, each owning BAND tokens. These participants can be broken down into two groups; validators and delegators. We will be focusing on validators in this section.

#### Validators

Validators are responsible for performing two main functions on the network. First, they are responsible for proposing and committing new blocks in the blockchain. They participate in the block consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key. This is similar to most other Cosmos-based delegated proof-of-stake blockchains.

Each validator will have a certain amount of BAND tokens bonded to them. The source of these tokens can either be their own holdings, or the tokens delegated to them by other token owners. In most cases, there will be a large number of parties with tokens staked to them. In that case, the top 100 validator candidates with the most token staked to them will become BandChain’s validators.

The role the validators described above is similar to those of validators on many other Cosmos-based blockchains. In addition, most transactions supported by BandChain (asset transfer, staking, slashing, etc.) are also derived from Cosmos-SDK. What makes BandChain unique, and the origin of the validators' second duty, is the chain's capability to natively support external data query. 

### Oracle Data Request

Blockchain networks are historically deterministic by nature. This means that the current state of a blockchain is entirely and strictly determined by previous transactions and events that occurred on the chain. This limits the possible use cases of decentralized applications built on those networks. BandChain aims to fix this limitation. With our data oracle, anyone can make a request for APIs and services available on the traditional web, all while not having to rely on a centralized party. This allows dApps to leverage existing data on the internet without compromising on security.

#### Publishing Data Sources and Oracle Scripts

Before any data requests can be made, two conditions must be met:

1. The oracle script that describes the data request must also have been published
2. The data sources related to the aforementioned oracle script must be published to BandChain

#### Data Sources

Data sources are the most fundamental unit of the oracle system. It describes the procedure to retrieve raw data points from a primary source and the fee associated with a query made to that source. 

On BandChain, anyone can submit and register a data source into the system. To publish a data source, one must send a `MsgCreateDataSource` message to the chain. Once deployed, a data source can be referenced by a unique `int64` identifier assigned to it. If the data source owner wants to edit the source's details once it has been published, they can use that unique identifier as a reference key.

#### Oracle Scripts

An oracle script is an executable program that encodes (1) the set of raw data requests to the sources it needs and (2) the way to aggregate raw data reports into the final result. These sources can be the data sources published on the network, as well as other oracle scripts. This composability makes oracle scripts very similar to [smart contracts](https://en.wikipedia.org/wiki/Smart_contract). See the [terminology section](https://github.com/bandprotocol/bandchain/wiki/Terminology#oracle-scripts) for more information on oracle scripts, including its features and limitations.

#### Oracle Data Request Initialization

A data request to Band's oracle begins when an external party requests data from the oracle by broadcasting [`MsgRequestData`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgrequestdata). The contents of the message includes the oracle script the requester wants to invoke and other query and security parameters.

Once the data transaction is confirmed on BandChain, the requested oracle script will begin its execution. The script's execution process can be split into two phases.

#### Fetching Data from Specified Data Sources

First, the oracle script's preparation function will emit the set of raw data requests necessary to continue the script's execution. The chain's validators, who are [chosen at random](https://github.com/bandprotocol/bandchain/wiki/decentralized-validator-sampling) for security reasons, will then inspect the raw data requests and execute the associated data sources' procedures as instructed by the request. Specifically, each of the chosen validator will attempt to retrieve information from all of the data sources specified in the oracle executed oracle script. The validators that successfully retrieved data from all the sources will then submit a raw data report to BandChain, containing the results they got from each of the data sources, by broadcasting [`MsgReportData`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgreportdata). Once a sufficient number of validators, specified in the data request’s security parameters, have reported the their results, BandChain will begin executing the oracle script’s second phase.

*(Phase 2+)* Note that for data from permissioned sources (e.g. under paywall), the data sources are expected to verify that payment has occurred on BandChain and supply data to requested validators accordingly. That way, BandChain allows API providers to monetize data with BandChain's on-chain payment settlement without needing to trust a middleman party.

#### Saving the request result onto BandChain

This second phase begins by aggregating all of the validators' reports, containing the data each received from the data sources, into a final singular result. This final result is then permanently stored in BandChain's application state. Once stored, the result becomes available on the chain's state tree and can be sent to other blockchain.

![Oracle Data Request Flow](https://i.imgur.com/9i7FrYt.png)

When the final result is successfully stored, an oracle data proof is also produced. This proof is a Merkle proof that shows the existence of the final result of the data request as well as other related information (oracle script hash, the parameters, the time of execution, etc) on BandChain. This proof can then be used by smart contracts on other blockchain to verify the existence of the data as well as to decode and retrieve the result stored. Both of these can be done by interacting with our [lite client](https://github.com/bandprotocol/bandchain/wiki/Lite-Client-Protocol).

## Token Economics

### Band Token and Use Cases

BandChain currently utilizes its native BAND token as the sole token on its network. The chain then uses the promise of receiving reward tokens as an incentive for validators to produce new blocks and submit responses to data requests. Additionally, any network participants can use the tokens in 3 ways:

1. Token holders can use the tokens they own to become validators
2. They can instead delegate their holdings to another validator to earn a portion of the collected fees and inflationary rewards
3. They can also use their tokens to participate in the chain’s governance
4. Finally, validators are allowed to set a fee for processing transactions, which act as their reward for performing their duty

### Inflation

BandChain applies an inflationary model on the BAND token system to incentivize network participation by the token holders. The desired outcome of this model is that token holders will opt to stake their coins on the network, rather than solely focusing on trading, or doing nothing with it at all. The specific inflation parameters are taken from Cosmos network; namely, the annual inflation rate ranges from 7% to 20%, and is adjusted to target to have 66% of the total supply of BAND token staked.

To illustrate how inflation incentivizes staking, imagine we have a network participant with a certain amount of holding. With inflation, if they choose to not use their coins to participate in the network’s activities, they will find that the percentage of their holding with respect to the total supply decreases over time. However, if they decide to stake their coins, they will be given a share of coins proportional to the inflation, meaning their total token holding ratio will now remain relatively unchanged.

### Validators and Stakers

As in other Cosmos-based blockhain, the one of the roles of Bandchain's validators is to provision new blocks and process transactions. By performing those tasks, they earn BAND tokens as a reward. In the case of block provisioning, the reward comes from the tokens newly minted on that block. Conversely, the reward for processing transactions comes from the [fee](#gas-and-network-fee) that each validator chooses to set. Note that a percentage of the total block reward is diverted to the [community fund pool](#community-spending-pool).

Those who do not wish to become validators themselves can still earn a portion of the validator rewards by becoming delegators. This is done through staking their holding on the network’s validators. By doing so, they will share the revenue earned by those validators.

The amount of reward each validator receives is based on the total amount of tokens staked to them. Before this revenue is distributed to their delegators, a validator can apply a commission. In other words, delegators pay a commission to their validators on the revenue they earn.

However, while delegators share the revenue of their validators, they also share the [risks](#slashing). Thus it is imperative for potential delegators to understand those risks, and that being a delegator is not a passive task. Some actions that a delegator should perform are:

- **Perform due diligence on the validators you wish to stake on before committing**: If a validator you staked on misbehaves, a portion of the validator's staking, including those of their delegators, are [slashed](#slashing). Therefore, it is advisable for delegators to carefully consider their staking choices.

- **Actively monitor the validators you've committed to**: Delegators should ensure that the validators they delegate to behave correctly, meaning that they have good uptime, do not double sign or get compromised, and participate in governance.

- **Participate in network governance**: Delegators are expected to participate in network governance activities. A delegator’s voting power is proportional to the size of their bonded stake. If a delegator does not cast their vote, they will inherit the vote of the validators they staked on. If they do vote, they instead override the vote of those validators. Delegators therefore act as an important counterbalance to their validators.

### Community Spending Pool

Two percent of the total block rewards are diverted to the community fund pool. The funds are intended to promote long-term sustainability of the ecosystem. These funds can be distributed in accordance with the decisions made by the governance system.

### Slashing

If a validator misbehaves, their delegated stake will be partially slashed. There are three reasons why a validator may get slashed; excessive downtime, double signing, and unresponsiveness. The first two are derived from the Cosmos SDK, while the third is specific to BandChain.

#### Excessive Downtime

One of the validators' main functions is to propose and subsequently commit new blocks onto the chain. Thus, if a validator has not participated in more than `[MIN_SIGNED_PER_WINDOW]` of the last `[SIGNED_BLOCK_WINDOW]` block proposals and commits, we will consider that they are not properly performing their function. As a consequence, we will slash the total value staked to them by `[SLASH_FRACTION_DOWNTIME]`.

#### Double Signing

During a double signing, the block proposer in the consensus round attempts to create two conflicting blocks and broadcast them to the network. If there are any other validators who stand to profit from this double block-proposal, they will vote then for both blocks.

If the votes passed, nodes on the network would see 2 different blocks at the same height, each with different contents and hashes. From this point on, we say that the network has “forked”. The consequence of this is there will now be two versions of the “truth”.

To prevent such attempts at double signing, Cosmos, and by extension BandChain, is implemented so that any validators that double-sign are slashed, with the slashed amount being `[SLASH_FRACTION_DOUBlESIGNING]` of all tokens bonded to them.

#### Unresponsiveness (Phase 1+)

Finally, we also slash validators if they consistently fail to respond to data requests. If a validator failed to respond to `[CONSECUTIVE_UNRESPONSIVE_REQUESTS]` consecutive requests, they will be slashed an amount equal to `[SLASH_FRACTION_UNRESPONSIVENESS]`

### Gas and Network Fee

In the Cosmos SDK, gas is a unit that is used to track the consumption of resources during process execution. It is typically consumed during read/write operations, or whenever a computationally expensive operation is performed. The purpose of gas is twofold:

1. To prevent blocks from consuming excessive resources, and to ensure that the block will be finalized
2. To prevent abuse from the end user

Extending from the second point, gas consumed during the execution of a message is priced. This results in a fee, the value of which is equal to the gas value multiplied by the price. Each block validator can subjectively set the minimum gas fee that must be reached for them to process the transaction, and choose whatever transactions it wants to include in the block it is proposing, as long as the total gas limit is not exceeded.

During periods when there is a high amount of transactions that is waiting to be processed, a bidding-like scenario will occur where senders try to get their transaction included in the upcoming block. They do this by trying to have a higher proposed fee than other senders. Note that all pending transactions will eventually be sent, regardless of the fee amount proposed by the sender. The amount of gas the sender is proposing to pay only determines the likelihood that their transaction will be sent first.

### Gas Calculation Schedule

To be written:

- For storage-related operations, use similar model with Cosmos-SDK (fixed cost per seek, write/byte, read/byte)
- For Owasm execution, there's a gas cost table for each opcode, similar to EVM/Ewasm. See [here](https://github.com/bandprotocol/bandchain/blob/master/chain/pkg/owasm/gas_policy.go)

## Decentralized Validator Sampling

### Motivation

When selecting the algorithm to use in selecting validators to respond to oracle data request, there are two mains characteristics that we would like to incorporate.

1. A validator with a higher voting power should have a higher chance of being chosen than one with a lower voting power
2. Every validator should still have a chance to be selected

<!---
## Selection Algorithm

### Selection Space Constraint

Suppose we have ![n](https://latex.codecogs.com/svg.latex?n) validators on BandChain, and an incoming [oracle data request](https://github.com/bandprotocol/bandchain/wiki/System-Overview#oracle-data-request) that specifies a [`minCount`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgrequestdata) of ![k](https://latex.codecogs.com/svg.latex?k) validators.

To begin selecting the validators that will respond to the request, we first list out the validators in descending order based on their voting power. *Then*, when selecting the ![r](https://latex.codecogs.com/svg.latex?r)th validator, we constrain the selection space to the first ![y](https://latex.codecogs.com/svg.latex?y) validators out of the ![n](https://latex.codecogs.com/svg.latex?n) total, where ![y](https://latex.codecogs.com/svg.latex?y) for round ![r](https://latex.codecogs.com/svg.latex?r) is defined as

![Equation](https://latex.codecogs.com/svg.latex?y_r=(n-C+1)^{\frac{k-r-1}{k-1}}+C-1)

The result of ![y](https://latex.codecogs.com/svg.latex?y) is then floored is necessary.

A validator's voting power can be seen as a proxy of their quality and trustworthiness as perceived by BandChain's network participants. In this case, since our validators are sorted in descending order based on voting power, the worst possible pick for any round ![r](https://latex.codecogs.com/svg.latex?r) is the ![yr](https://latex.codecogs.com/svg.latex?y_r)th validator in the remaining selection list.

Thus, in order to quickly constrain the selection space to the relatively more trusted set of validators, we use the above exponential-decay equation. The result of this is twofold:

- The more trusted the validator, the longer they will remain in the selection space, and the more likely they are to be chosen.
- Since since the initial reduction in size of the selection space is very significant, the absolute worst-case possible validator pick (e.g. the validator with the lowest voting power out of all ![n](https://latex.codecogs.com/svg.latex?n)) choices is quickly removed from the selection space.

Also, in selecting the first validator, the selection space is the entire list of validators in itself. Thus, every validator has a chance of being picked at some point, and this method of selection satisfies both characteristics we desired.

#### Example

Imagine BandChain's validators consist of 10 nodes. If an oracle data request is submitted with `minCount` (![k](https://latex.codecogs.com/svg.latex?k)) is set at 4. Also, let's assume that ![C](https://latex.codecogs.com/svg.latex?C) is set at 2.

After sorting the validators by voting power, the setup will look as follows:

![Validators](https://i.ibb.co/VpW7Cc7/Untitled.png)

The selection space reduction for each selection round is shown below.

##### Round 1

![Formula Round One](https://latex.codecogs.com/svg.latex?r=0,y_0=(10-2+1)^{\frac{4-0-1}{4-1}}+2-1=10)

![Selection Space Round One](https://i.ibb.co/W0f8TGd/Untitled.png)

##### Round 2

![Formula Round Two](https://latex.codecogs.com/svg.latex?r=1,y_1=(10-2+1)^{\frac{4-1-1}{4-1}}+2-1=5.327)

![Selection Space Round Two](https://i.ibb.co/P6BB4yN/Untitled.png)

##### Round 3

![Formula Round Three](https://latex.codecogs.com/svg.latex?r=2,y_2=(10-2+1)^{\frac{4-2-1}{4-1}}+2-1=3.08)

![Selection Space Round Three](https://i.ibb.co/NVQnCsh/Untitled.png)

##### Round 4

![Formula Round Four](https://latex.codecogs.com/svg.latex?r=3,y_3=(10-2+1)^{\frac{4-3-1}{4-1}}+2-1=2)

![Selection Space Round Four](https://i.ibb.co/wSDqTfs/Untitled.png)
-->
### Validator Selection

Once we have a selection space, we have to select a specific validator from that list. To do this, we make use of a random number generator.

#### Random Number and Seed Generation

As with most random number generator, our number generation proces require the use of a [seed](https://en.wikipedia.org/wiki/Random_seed). In this specific case, our seed comprise of two components:

- A list of `blockHashes`
- The requestID of the request the validators are being chosen for

In the case of the list of `blockHashes`, we will use the `blockHashes` of the previous ![n](https://latex.codecogs.com/svg.latex?n) blocks. We then take ![32/n](https://latex.codecogs.com/svg.latex?\frac{32}{n}) bytes from each of the hashes and concatenate them. The purpose of this is so that any potentially malicious validators looking to influence the seed, and in turn the validator selected, through intentionally constructing certain `blockHashes` on the blocks they proposed can only control ![n/32](https://latex.codecogs.com/svg.latex?\frac{n}{32+8}) of the seed. The 8 in the denominator comes from the fact that, once we have the combined `blockHash` portion of the seed, we further concatenate that with the requestID of the current request, which is an 8-byte integer.

#### Randomly Selecting a Validator

After we have used our concatenated seed to generate a random number, we then use that value to select the validator for that round.

To do so, we again assume that the validators in the selection space is sorted in descending order. Then, we imagine that we have a cumulative scale running across that list, with the values bei the validator's voting power. With that, the specific range in which our random number falls in along that cumulative scale determine which validator is ultimately chosen for that round. An example of a selection is shown below.

##### Setup

![Random Number Selection](https://i.ibb.co/KwmBGwg/Untitled.png)

##### Selection using a Random Number

![Validator Selection](https://i.ibb.co/wzw7dsB/Selection.png)

### Simulation Statistics

TBD

## Protocol Messages

### Native Cosmos SDK Messages

Stemming from its Cosmos SDK foundation, BandChain supports all types of messages that are native to the SDK.

### BandChain Specific Messages

Apart from the messages that stems from the Cosmos SDK, BandChain also supports a number of messages native to its data oracle system. These messages' specification is presented below.

#### MsgCreateDataSource

Deploys and registers a new data source to BandChain. Once registered, the data source is assigned a unique `int64` identifier which can be used to refer to it forever.

##### Parameters

| Parameter   | Type             | Description                                                                                                                                                                                       |
|-------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sender      | `sdk.AccAddress` | The address of the message's sender. Note that the sender does not need to be the same as the owner                                                                                                  |
| Owner       | `sdk.AccAddress` | The address of the entity who will be responsible for maintaining the data source                                                                                                                 |
| Name        | `string`         | The human-readable string name for this data source                                                                                                                                               |
| Description | `string`         | The description of this data source                                                                                                                                                               |
| Executable  | `[]byte`         | The content of executable to be run by block upon receiving a data request for this data source. The executable can be in any format, as long as it is accepted by the general public. |

#### MsgEditDataSource

Edits an existing data source given the unique `int64` identifier (i.e. `dataSourceID`). The sender must be the owner of the data source for the transaction to succeed.

##### Parameters

| Parameter    | Type             | Description                                                                                                                                                                                       |
|--------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataSourceID | `int64`          | The unique identifier number assigned to the data source when it was first registered                                                                                                             |
| Sender       | `sdk.AccAddress` | The address of the message's sender. Note that the sender does not need to be the same as the owner                                                                                                  |
| Owner        | `sdk.AccAddress` | The address of the entity who will be responsible for maintaining the data source                                                                                                                 |
| Name         | `string`         | The human-readable string name for this data source                                                                                                                                               |
| Description  | `string`         | The description of this data source                                                                                                                                                               |
| Executable   | `[]byte`         | The content of executable to be run by block validators upon receiving a data request for this data source. The executable can be in any format, as long as it is accepted by the general public. |

#### MsgCreateOracleScript

Deploys a new oracle script to BandChain's network. Once registered, the script is assigned a unique `int64` identifier which can be used to refer to it forever.

##### Parameters

| Parameter       | Type             | Description                                                                                           |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------|
| Sender          | `sdk.AccAddress` | The address of the message's sender. Note that the sender does not need to be the same as the owner   |
| Owner           | `sdk.AccAddress` | The address of the entity who will be responsible for maintaining the data source                     |
| Name            | `string`         | The human-readable string name for this data source                                                   |
| Description     | `string`         | The description of this data source                                                                   |
| Code            | `[]byte`         | The Owasm-compiled binary attached to this oracle script                                              |
| Schema          | `string`         | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| Source Code URL | `string`         | The URL for the source code of this oracle script                                                     |

#### MsgEditOracleScript

Edits an existing oracle script given the unique `int64` identifier (i.e. `oracleScriptID`). The sender must be the owner of the oracle script for the transaction to succeed.

##### Parameters

| Parameter       | Type             | Description                                                                                           |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------|
| OracleScriptID  | `int64`          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain  |
| Sender          | `sdk.AccAddress` | The address of the message's sender. Note that the sender does not need to be the same as the owner   |
| Owner           | `sdk.AccAddress` | The address of the entity who will be responsible for maintaining the data source                     |
| Name            | `string`         | The human-readable string name for this data source                                                   |
| Description     | `string`         | The description of this data source                                                                   |
| Code            | `[]byte`         | The Owasm-compiled binary attached to this oracle script                                              |
| Schema          | `string`         | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| Source Code URL | `string`         | The URL for the source code of this oracle script                                                     |

#### MsgRequestData

Requests a new data based on an existing oracle script. A data request will be assigned a unique identifier once the transaction is confirmed. After sufficient validators report the raw data points. The results of the data requests will be written and stored permanently on BandChain for future uses.

##### Parameters

| Parameter      | Type             | Description                                                                                                                                                |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OracleScriptID | `int64`          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| Sender         | `sdk.AccAddress` | The address of the message's sender.                                                                                                                       |
| Calldata       | `string`         | The data passed over to the oracle script for the script to use during its execution                                                                       |
| AskCount       | `int64`          | The number of validators that are requested to respond to this request                                                                                     |
| MinCount       | `int64`          | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |
| ClientID       | `string`         | the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |

#### MsgReportData

Reports raw data points for the given data request. Each data point corresponds to a data source query issued during the data request script's execution of `prepare` function.

##### Parameters

| Parameter | Type                                                    | Description                                                                 |
|-----------|---------------------------------------------------------|-----------------------------------------------------------------------------|
| RequestID | `int64`                                                 | The unique identifier number of the particular request                      |
| Validator | `sdk.ValAddress`                                        | The reporting validator's actual validator address                          |
| Reporter | `sdk.AccAddress`                                        | The address the reporting validator uses to sign when submitting the report |
| Data      | `Data: []struct{ externalDataId: int64, data: []byte }` | he array of raw data points. Each item corresponds to a data source query.  |

#### MsgAddReporter

Registers an address to the list of addresses available to a validator when signing and submitting a report.

##### Parameters

| Parameter        | Type             | Description                                                                    |
|------------------|------------------|--------------------------------------------------------------------------------|
| ValidatorAddress | `sdk.ValAddress` | The address of the validator wishing to add the reporter address to their list |
| ReporterAddress  | `sdk.AccAddress` | The address to add to the validator's available addresses                      |

#### MsgRemoveReporter

Remove a previously registered address from the list of addresses available to a validator when signing and submitting a report.

##### Parameters

| Parameter        | Type             | Description                                                                    |
|------------------|------------------|--------------------------------------------------------------------------------|
| ValidatorAddress | `sdk.ValAddress` | The address of the validator wishing to add the reporter address to their list |
| ReporterAddress  | `sdk.AccAddress` | The address to remove from the validator's available addresses                      |

## Lite Client Protocol

In addition to the native IBC connections, we also provide a lite client for anyone who requested data from our oracle to verify the validity of the result they received. An instance of this client exists on each of the blockchains to which Band has previously integrated.

When someone submits a verification request to our lite client, they must also send in the encoded result they got from our oracle. That result is not just the data they requested, but also contains information on the request itself as well as the associated response. The lite client’s aim is then to use that information to show that the data the user requested exists on BandChain, thus verifying the oracle result’s validity.

The lite client's verification process consists of 3 steps:

1. that the proof received in the request can be used to construct a valid block header
2. that using the constructed block header, it can recover a valid set of validator addresses who signed on the block
3. that those validators have sufficient total voting power relative to the system total

The diagram below illustrates the above steps.

![Lite Client Request Flow](https://miro.medium.com/max/2000/1*ub87xk-eZKIMFPeraEO6ZQ.png)

### Constructing the Block Header from the Oracle Data Proof

The proof that BandChain's oracle returns consists of two main packets of  data: `requestPacket` and `responsePacket`. `requestPacket` encodes the information on the request that was made ,as well as the corresponding parameters.

The `requestPacket` encodes the oracle request sent from other blockchains to BandChain. It contains information such as the identifier of the oracle script requested and the number of validators that are requested to respond to this request, among others. On the other hand, `responsePacket` is the encoded oracle response from BandChain to the requester. This response includes the number of validators that actually responded to the request, the timestamp of when the request was sent and when it was resolved to a final result, along with the actual final result itself if the request was successful. A full and more detailed breakdown of the packets' contents, please see our [GitHub repository](https://github.com/bandprotocol/bandchain/blob/0a99c53aea9da2c1cd9887e07c5c6e6f82fee077/chain/x/oracle/types/types.proto#L188).

The task of the lite client is then to use these two packets to eventually arrive at the block header. The steps that makes up this process are as follows:

- Use the proof sent it to construct the oracle store’s root hash
- Combine the oracle store hash with the hashes of the other stores in our application to compute the appHash
- Finally, use the appHash, in combination with other block information hashes, to compute the blockHash

#### Constructing the Oracle Store's Root Hash

##### Oracle Store Tree Contents

BandChain's oracle system resides in an `oracle` [Cosmos module](https://github.com/cosmos/cosmos-sdk/tree/master/x), also the `oracle` store. Each of of these stores can then be represented as an [iAVL tree](https://github.com/tendermint/iavl), where the bottom of these store trees contains the byte representation of the data in that module. In our case of the `oracle` store root, two data pieces that we will be looking at are the `requestPacket` and `responsePacket`.

The `requestPacket` contains information related to the request that the user made to our oracle. Likewise, `responsePacket` stores the information associated with the result, such as the actual number of validators that responded to the request, as well as the actual result value itself.

These two packets are what the lite client returns to the requester upon successful validation. By also returning contextual information on the request and response, in addition to the actual result itself, we aim to give as much information as possible for the user to use in their application or for any further validation they might want to perform.

##### Constructing the oracle store leaf node

Using  `requestPacket` and `responsePacket`, we can combine their hashes to get an intermediary hash value, which we called the `dataHash`. If we then encode and hash this appended by other information such as the version (i.e., the latest block height that the data node was updated), and the request ID of the request, we arrive at the leaf node of the oracle store tree, also known as the `resultHash`

After we have the leaf node, we then need to use that node to gradually climb up the tree to reach the store's root node. To help us do so, we use an additional piece of information in the proof; the `merklePaths`.

##### Computing the oracle store root hash

The `merklePaths` we mentioned is a Merkle proof that shows how the `dataHash` leaf node we just computed is part of the larger oracle tree. The proof's content is the list of "Merkle paths" from the leaf to the root of the tree. We can the use these Merkle paths to compute the parent hash of our `dataHash`. If we then repeat this process, we can gradually climb up the store tree, finally getting the oracle store root hash we want.

#### Computing the appHash and the blockHash

After we have the oracle store root hash, we can begin to iteratively combine it with the hashes of the other stores in our application to compute the `appHash`. We can then use that `appHash` to finally compute the `blockHash` using the same method as above.

### Recovering Signer Addresses

After we have constructed a `blockHash`, we can move on to prove its validity by attempting to use it to recover the addresses of the validators who signed on this block using Ethereum’s ecrecover opcode. To ensure that the addresses we extracted are valid, we check to make sure that each address we extract is unique.

As we recover each signer, we also add each extracted validator’s voting power to a counting tally, which we will use later.

### Checking Total Voting Power

Once we have extracted all of the validators and ensure that the extracted order is correct, we proceed to check if the tallied voting power is sufficient; specifically, that the tallied value is at least two-thirds of the system’s total voting power. This threshold check is to ensure that we reach consensus.

If the tallied voting power exceeds the two-third threshold, we have successfully proven that the proof is valid. Our lite client can then decode the result and return it to the requester to either use or further validate themselves.

## Cosmos IBC

### IBC Overview

In addition to our own [lite client protocol](https://github.com/bandprotocol/bandchain/wiki/Lite-Client-Verification), we also allow interaction with our data oracle through Cosmos' [Inter-Blockchain-Communication](https://cosmos.network/ibc/), or IBC, protocol. This allows other IBC-compatible blockchains to request data from BandChain.

### BandChain-Specific IBC Data Packets

#### OracleRequestPacketData

This is the data packet that the blockchain looking to send a request to BandChain's oracle must send.

| Parameter      | Type             | Description                                                                                                                                                |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ClientID       | `string`          | the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| OracleScriptID | `int64`          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| Sender         | `sdk.AccAddress` | The address of the message's sender.                                                                                                                       |
| Calldata       | `string`         | The data passed over to the oracle script for the script to use during its execution                                                                       |
| AskCount       | `int64`          | The number of validators that are requested to respond to this request                                                                                     |
| MinCount       | `int64`          | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |

#### OracleResponsePacketData

Subsequently, this is the packet that will be relayed from BandChain back to the requester's chain. It contains information on the response parameters as well as the requested data itself.

| Parameter     | Type     | Description                                                                                                                                                                    |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ClientID      | `string` | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData                              |
| RequestID     | `uint64` | The unique identifier number of the particular request                                                                                                                         |
| AnsCount      | `uint64` | The number of validators that answers the request, retrieved the data, and submitted a report                                                                                  |
| RequestTime   | `uint64` | The timestamp of when the request was made                                                                                                                                     |
| ResolveTime   | `uint64` | The timestamp of when the last validator submitted the report and the request is resolved                                                                                      |
| ResolveStatus | `uint8`  | The resolve status of the request. See [here](https://github.com/bandprotocol/bandchain/blob/master/chain/x/oracle/types/types.pb.go#L37) for the full list of possible values |
| Result        | `[]byte` | The aggregated value of the results returned by the validators                                                                                                                 |

### Requesting Data from BandChain Oracle using IBC

To make a request to BandChain's oracle using IBC, the module on another IBC-compatible blockchain looking to make the request must generate an [`OracleRequestPacketData`](#oraclerequestpacketdata) data packet to be relayed. Using their chain's IBC module, they must then relay the message through to BandChain's own IBC module, which will proceed to further send it to the chain's `oracle` module. Once the request packet is successfully received, the subsequent flow is the same as how BandChain handles a native [`MsgRequestData`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgrequestdata) message type.

Those who are interested in the full oracle data request process should refer to the system overview [section](https://github.com/bandprotocol/bandchain/wiki/System-Overview#oracle-data-request). To summarize, however, the data request flow consists of the following steps:

- Once the transaction resulting from the request is confirmed, the chain’s validators proceed to fetch the requested oracle data from the data sources specified by the requested oracle script
- Each validator selected for the particular request will then proceeed to retrieve data from each of the data source
- If a validator's retrieval is successful, they will submit back a report to BandChain containing the result they received from each of the data source

If the number of validators that managed to successfully submit the report exceeds the `minCount` specified in the `OracleRequestPacketData`, the chain then computes an aggregate final value.

Unlike in the case of a non-IBC data request, this final result is not stored on BandChain, but is instead directly relayed back to the requesting chain and module in the form of a [`OracleResponsePacketData`](#oracleresponsepacketdata) data packet.

As a slight aside, a data request to BandChain generally takes about 20-30 seconds from submitting the initial request until the requester received back the requested result. This is because BandChain's blocktime is set at approximately 2 seconds, and a request and subsequent report message will each take up one block worth of time.

This section presented an overview of how IBC can be used to make an oracle data request on BandChain. For more information on IBC itself, its architecture, and other related topics, please see Cosmos' Interchain Standards [documentation](https://github.com/cosmos/ics).
