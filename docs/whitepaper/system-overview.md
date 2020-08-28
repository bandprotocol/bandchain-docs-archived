<!--
order: 3
-->

# System Overview

## Prerequisite Readings

- [Whitepaper / Terminology](./terminology.md) {prereq}

BandChain is a high-performance public blockchain that allows anyone to make a request for APIs and services available on the traditional web. It is built on top of the [Cosmos SDK](http://cosmos.network/), and utilizes [Tendermint](https://tendermint.com/)'s [Byzantine Fault Tolerance](https://en.wikipedia.org/wiki/Byzantine_fault) consensus algorithm to reach immediate finality. This finality is specifically reached upon getting confirmations from a sufficient number of block validators.

## Network Participants

BandChain's network consists of a number of network participants, each owning BAND tokens. These participants can be broken down into two groups; validators and delegators. We will be focusing on validators in this section.

### Validators

Validators are responsible for performing two main functions on the network. First, they are responsible for proposing and committing new blocks in the blockchain. They participate in the block consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key. This is similar to most other Cosmos-based delegated proof-of-stake blockchains.

Each validator will have a certain amount of BAND tokens bonded to them. The source of these tokens can either be their own holdings, or the tokens delegated to them by other token owners. In most cases, there will be a large number of parties with tokens staked to them. In that case, the top 100 validator candidates with the most token staked to them will become BandChain’s validators.

The role the validators described above is similar to those of validators on many other Cosmos-based blockchains. In addition, most transactions supported by BandChain (asset transfer, staking, slashing, etc.) are also derived from Cosmos-SDK. What makes BandChain unique, and the origin of the validators' second duty, is the chain's capability to natively support external data query. 

## Oracle Data Request

Blockchain networks are historically deterministic by nature. This means that the current state of a blockchain is entirely and strictly determined by previous transactions and events that occurred on the chain. This limits the possible use cases of decentralized applications built on those networks. BandChain aims to fix this limitation. With our data oracle, anyone can make a request for APIs and services available on the traditional web, all while not having to rely on a centralized party. This allows dApps to leverage existing data on the internet without compromising on security.

### Publishing Data Sources and Oracle Scripts

Before any data requests can be made, two conditions must be met:

1. The oracle script that describes the data request must also have been published
2. The data sources related to the aforementioned oracle script must be published to BandChain

### Data Sources

Data sources are the most fundamental unit of the oracle system. It describes the procedure to retrieve raw data points from a primary source and the fee associated with a query made to that source. 

On BandChain, anyone can submit and register a data source into the system. To publish a data source, one must send a `MsgCreateDataSource` message to the chain. Once deployed, a data source can be referenced by a unique `int64` identifier assigned to it. If the data source owner wants to edit the source's details once it has been published, they can use that unique identifier as a reference key.

### Oracle Scripts

An oracle script is an executable program that encodes **(1)** the set of raw data requests to the sources it needs and **(2)** the way to aggregate raw data reports into the final result. These sources can be the data sources published on the network, as well as other oracle scripts. This composability makes oracle scripts very similar to [smart contracts](https://en.wikipedia.org/wiki/Smart_contract). See the [terminology section](./terminology) for more information on oracle scripts, including its features and limitations.

### Oracle Data Request Initialization

A data request to Band's oracle begins when an external party requests data from the oracle by broadcasting [`MsgRequestData`](./protocol-messages.html#msgrequestdata). The contents of the message includes the oracle script the requester wants to invoke and other query and security parameters.

Once the data transaction is confirmed on BandChain, the requested oracle script will begin its execution. The script's execution process can be split into two phases.

### Fetching Data from Specified Data Sources

First, the oracle script's preparation function will emit the set of raw data requests necessary to continue the script's execution. The chain's validators, who are [chosen at random](./decentralized-validator-sampling) for security reasons, will then inspect the raw data requests and execute the associated data sources' procedures as instructed by the request. Specifically, each of the chosen validator will attempt to retrieve information from all of the data sources specified in the oracle executed oracle script. The validators that successfully retrieved data from all the sources will then submit a raw data report to BandChain, containing the results they got from each of the data sources, by broadcasting [`MsgReportData`](./protocol-messages.html#msgreportdata). Once a sufficient number of validators, specified in the data request’s security parameters, have reported the their results, BandChain will begin executing the oracle script’s second phase.

*(Phase 2+)* Note that for data from permissioned sources (e.g. under paywall), the data sources are expected to verify that payment has occurred on BandChain and supply data to requested validators accordingly. That way, BandChain allows API providers to monetize data with BandChain's on-chain payment settlement without needing to trust a middleman party.

### Saving the request result onto BandChain

This second phase begins by aggregating all of the validators' reports, containing the data each received from the data sources, into a final singular result. This final result is then permanently stored in BandChain's application state. Once stored, the result becomes available on the chain's state tree and can be sent to other blockchain.

![Oracle Data Request Flow](https://i.imgur.com/9i7FrYt.png)

When the final result is successfully stored, an oracle data proof is also produced. This proof is a Merkle proof that shows the existence of the final result of the data request as well as other related information (oracle script hash, the parameters, the time of execution, etc) on BandChain. This proof can then be used by smart contracts on other blockchain to verify the existence of the data as well as to decode and retrieve the result stored. Both of these can be done by interacting with our [lite client](./lite-client-protocol).
