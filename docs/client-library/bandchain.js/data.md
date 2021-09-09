<!--
order: 2
-->

# Data Module

This module is to construct the data in term of dataclass to make sure that all the input and output are only in this data form.

## Account

| Attribute     | Type         | Description                                    |
| ------------- | ------------ | ---------------------------------------------- |
| address       | [Address]    | The address of the account                     |
| coins         | list([Coin]) | The amount of the account                      |
| publicKey?    | object       | Publickey of the account                       |
| accountNumber | number       | The account number of the account in state     |
| sequence      | number       | The number of transactions that have been sent |

## BlockHeaderInfo

| Attribute          | Type                   | Description                                                                                                                                                                                   |
| ------------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chainID            | string                 | ID of the blockchain                                                                                                                                                                          |
| height             | number                 | Height of the block in the chain                                                                                                                                                              |
| time               | Timestamp              | Time of the previous block. For most blocks it's the weighted median of the timestamps of the valid votes in the block.LastCommit, except for the initial height where it's the genesis time. |
| lastCommitHash     | HexBytes(Buffer alias) | Hash of the previous block's commit                                                                                                                                                           |
| dataHash           | HexBytes(Buffer alias) |                                                                                                                                                                                               |
| validatorsHash     | HexBytes(Buffer alias) | Hash of the validator set for this block                                                                                                                                                      |
| nextValidatorsHash | HexBytes(Buffer alias) | Hash of the validator set for the next block                                                                                                                                                  |
| consensusHash      | HexBytes(Buffer alias) | Hash of the consensus parameters for this block                                                                                                                                               |
| appHash            | HexBytes(Buffer alias) | Data returned by the last call to Commit - typically the Merkle root of the application state after executing the previous block's transactions                                               |
| lastResultsHash    | HexBytes(Buffer alias) | Root hash of all results from the txs from the previous block.                                                                                                                                |
| evidenceHash       | HexBytes(Buffer alias) | Hash of the evidence included in this block                                                                                                                                                   |
| proposerAddress    | HexBytes(Buffer alias) | Original proposer for the block                                                                                                                                                               |

## BlockHeader

| Attribute | Type              | Description             |
| --------- | ----------------- | ----------------------- |
| header    | [BlockHeaderInfo] | Block header infomation |

## BlockID

| Attribute | Type                   | Description                         |
| --------- | ---------------------- | ----------------------------------- |
| hash      | HexBytes(alias Buffer) | Hash of the previous (parent) block |

## Block

| Attribute | Type          |
| --------- | ------------- |
| block     | [BlockHeader] |
| blockID   | [BlockID]     |

## Coin

| Attribute | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| amount    | number | The amount of coin in the unit e.g. 1000000 |
| denom     | string | The price unit e.g. "uband"                 |

## DataSource

| Attribute   | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| owner       | [Address] | The owner of the data source   |
| name        | string    | The name of data source        |
| description | string    | The description of data source |
| filename    | string    | The data source file name      |

## OracleScript

| Attribute     | Type      | Description                                                                                           |
| ------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| owner         | [Address] | The owner of the oracle script                                                                        |
| name          | string    | The name of oracle script                                                                             |
| description   | string    | The description of oracle script                                                                      |
| filename      | string    | The oracle script file name                                                                           |
| schema        | string    | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| sourceCodeUrl | string    | The URL for the source code of this oracle script                                                     |

## RawRequest

| Attribute    | Type   | Description                                                                                        |
| ------------ | ------ | -------------------------------------------------------------------------------------------------- |
| dataSourceID | number | The unique identifier number assigned to the data source when it was first registered on Bandchain |
| externalID   | number | The type-safe unique identifier type for raw data requests.                                        |
| calldata     | Buffer | The input parameters associated with the request                                                   |

## Request

| Attribute           | Type                        | Description                                                                                                                                       |
| ------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracleScriptID      | integer                     | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                              |
| requestedValiDators | string[]                    | The validators that have been assigned to report data.                                                                                            |
| minCount            | number                      | The minimum number of validators necessary for the request to proceed to the execution phase                                                      |
| requestHeight       | number                      | The block height that has this request                                                                                                            |
| rawRequests         | [RawRequest](#rawrequest)[] | List of raw request                                                                                                                               |
| clientID            | string                      | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData |
| calldata            | Buffer                      | The data passed over to the oracle script for the script to use during its execution                                                              |

## RawReport

| Attribute  | Type   | Description                                                 |
| ---------- | ------ | ----------------------------------------------------------- |
| externalID | number | The type-safe unique identifier type for raw data requests. |
| data       | Buffer | A data source query                                         |

## Report

| Attribute       | Type                      | Description                                                |
| --------------- | ------------------------- | ---------------------------------------------------------- |
| validator       | string                    | The address of validator                                   |
| rawReports      | [RawReport](#rawreport)[] | List of validator's report                                 |
| inBeforeResolve | bool                      | The request status of validator before the request resolve |

## RequestPacketData

| Attribute      | Type   | Description                                                                                                                                                |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracleScriptID | number | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| askCount       | number | The number of validators that are requested to respond to this request                                                                                     |
| minCount       | number | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |
| clientID       | string | The unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| calldata       | Buffer | The data passed over to the oracle script for the script to use during its execution                                                                       |

## ResponsePacketData

| Attribute     | Type   | Description                                                                                                                                       |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| requestID     | number | The unique identifier number of the particular request                                                                                            |
| requestTime   | number | The timestamp of when the request was made                                                                                                        |
| resolveTime   | number | The timestamp of when the last validator submitted the report and the request is resolved                                                         |
| resolveStatus | string | The resolve status of the request. See here for the full list of possible values                                                                  |
| ansCount      | number | The number of validators that answers the request, retrieved the data, and submitted a report                                                     |
| clientID      | string | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData |
| result        | Buffer | The aggregated value of the results returned by the validators                                                                                    |

## Result

| Attribute          | Type                 | Description                                                                                                                                                                    |
| ------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| requestPacketData  | [RequestPacketData]  | This is the data packet that the blockchain looking to send a request to BandChain's oracle must send.                                                                         |
| responsePacketData | [ResponsePacketData] | This is the packet that will be relayed from BandChain back to the requester's chain. It contains information on the response parameters as well as the requested data itself. |

## RequestInfo

| Attribute | Type       | Description                     |
| --------- | ---------- | ------------------------------- |
| request   | [Request]  | The request info                |
| reports   | [Report][] | The list of report              |
| result?   | [Result]   | The final result of the request |

## TransactionSyncMode

| Attribute | Type                   | Description      |
| --------- | ---------------------- | ---------------- |
| txHash    | HexBytes(Buffer alias) | Transaction hash |
| code      | number                 | Response code    |
| errorLog? | string                 | The error log    |

## TransactionAsyncMode

| Attribute | Type                   | Description      |
| --------- | ---------------------- | ---------------- |
| txHash    | HexBytes(Buffer alias) | Transaction hash |

## TransactionBlockMode

| Attribute | Type                   | Description                              |
| --------- | ---------------------- | ---------------------------------------- |
| height    | number                 | Height of the block just executed.       |
| txHash    | HexBytes(Buffer alias) | Transaction hash                         |
| gasWanted | number                 | Amount of gas requested for transaction. |
| gasUsed   | number                 | Amount of gas consumed by transaction.   |
| code      | number                 | Response code                            |
| log       | object[]               | The output of the application's logger   |
| errorLog? | string                 | The error log                            |

## ReferencePriceUpdated

| Attribute | Type    | Description        |
| --------- | ------- | ------------------ |
| base      | integer | Base resolve time  |
| quote     | integer | Quote resolve time |

## ReferencePrice

| Attribute | Type                    | Description                    |
| --------- | ----------------------- | ------------------------------ |
| pair      | string                  | The token pair e.g. "BTC/USDT" |
| rate      | float                   | Price rate                     |
| updatedAt | [ReferencePriceUpdated] | Price update time              |

[address]: /client-library/bandchain.js/wallet.html "Address"
[request]: #request "Request"
[report]: #report "Report"
[result]: #result "Result"
[requestpacketdata]: #requestpacketdata "RequestPacketData"
[responsepacketdata]: #responsepacketdata "ResponsePacketData"
[blockheader]: #blockheader "BlockHeader"
[blockid]: #blockid "BlockID"
[blockheaderinfo]: #blockheaderinfo "BlockHeaderInfo"
[coin]: #coin "Coin"
[referencepriceupdated]: #referencepriceupdated "ReferencePriceUpdated"
