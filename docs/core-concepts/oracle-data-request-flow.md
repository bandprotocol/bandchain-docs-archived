# Oracle Data Request Flow

The flow of requesting data from BandChain can be broken down into four main steps:

1. Publishing the necessary data sources and oracle scripts to the network
2. Sending the oracle data request transaction
3. Fetching the necessary data
4. Aggregating and storing the request result onto BandChain

## 1. Publishing Data Sources and Oracle Scripts

Before any data requests can be made, two conditions must be met:

1. The oracle script that describes the data request must also have been published to Bandchain via `MsgCreateOracleScript`
2. The data sources related to the aforementioned oracle script must be published to BandChain via `MsgCreateDataSource`

## 2. Oracle Data Request Initialization

Once the required data sources and oracle scripts are published, the user can initiate data request to Band's oracle by broadcasting `MsgRequestData`. The contents of the message includes the ID of the oracle script that the requester wants to invoke and other query and security parameters.

Once the data transaction is confirmed on BandChain, the requested oracle script will begin its execution. The script's execution process can be split into two phases.

## 3. Fetching the Data

First, the oracle script's preparation function will emit the set of raw data requests necessary to continue the script's execution. The chain's validators, who are chosen at random for security reasons, will then inspect the raw data requests and execute the associated data sources' procedures as instructed by the request. Specifically, each of the chosen validator will attempt to retrieve information from all of the data sources specified in the executed oracle script.

The validators that successfully retrieved data from all the sources will then submit a raw data report to BandChain, containing the results they got from each of the data sources, by broadcasting `MsgReportData`. Once a sufficient number of validators, specified in the data request’s security parameters, have reported the their results, BandChain will begin executing the oracle script’s second part of aggregating request result.

Note that for data from permissioned sources (e.g. under paywall), the data sources are expected to verify that payment has occurred on BandChain and supply data to requested validators accordingly. That way, BandChain allows API providers to monetize data with BandChain's on-chain payment settlement without needing to trust a middleman party.

## 4. Aggregating and Request Result Storage

This phase begins by aggregating all of the validators' reports (which contains the data each received from the data sources) into a final single result. This final result is then permanently stored in BandChain's application state. Once stored, the result becomes available on the chain's state tree and can be sent to other blockchain.

![Oracle Data Request Flow](https://i.imgur.com/9i7FrYt.png)

When the final result is successfully stored, an oracle data proof is also produced. This proof is a Merkle proof that shows the existence of the final result of the data request as well as other related information (oracle script hash, the parameters, the time of execution, etc) on BandChain. This proof can then be used by smart contracts on other blockchain to verify the existence of the data as well as to decode and retrieve the result stored. Both of these can be done by interacting with our lite client.
