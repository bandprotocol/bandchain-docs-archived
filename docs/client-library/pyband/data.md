# Data Module

This module is to construct the data in term of dataclass to make sure that all the input and output are only in this data form.

## Account

| Attribute      | Type           | Description                                    |
| -------------- | -------------- | ---------------------------------------------- |
| address        | [Address]      | The address of the account                     |
| coins          | list([Coin])   | The amount of the account                      |
| public_key     | optional(dict) | Publickey of the account                       |
| account_number | integer        | The account number of the account in state     |
| sequence       | integer        | The number of transactions that have been sent |

## BlockHeaderInfo

| Attribute            | Type                  | Description                                                                                                                                                                                   |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| chain_id             | string                | ID of the blockchain                                                                                                                                                                          |
| height               | integer               | Height of the block in the chain                                                                                                                                                              |
| time                 | Timestamp             | Time of the previous block. For most blocks it's the weighted median of the timestamps of the valid votes in the block.LastCommit, except for the initial height where it's the genesis time. |
| last_commit_hash     | HexBytes(bytes alias) | Hash of the previous block's commit                                                                                                                                                           |
| data_hash            | HexBytes(bytes alias) |                                                                                                                                                                                               |
| validators_hash      | HexBytes(bytes alias) | Hash of the validator set for this block                                                                                                                                                      |
| next_validators_hash | HexBytes(bytes alias) | Hash of the validator set for the next block                                                                                                                                                  |
| consensus_hash       | HexBytes(bytes alias) | Hash of the consensus parameters for this block                                                                                                                                               |
| app_hash             | HexBytes(bytes alias) | Data returned by the last call to Commit - typically the Merkle root of the application state after executing the previous block's transactions                                               |
| last_results_hash    | HexBytes(bytes alias) | Root hash of all results from the txs from the previous block.                                                                                                                                |
| evidence_hash        | HexBytes(bytes alias) | Hash of the evidence included in this block                                                                                                                                                   |
| proposer_address     | HexBytes(bytes alias) | Original proposer for the block                                                                                                                                                               |

## BlockHeader

| Attribute | Type                                | Description             |
| --------- | ----------------------------------- | ----------------------- |
| header    | [BlockHeaderInfo](#blockheaderinfo) | Block header infomation |

## BlockID

| Attribute | Type                  | Description                         |
| --------- | --------------------- | ----------------------------------- |
| hash      | HexBytes(bytes alias) | Hash of the previous (parent) block |

## Block

| Attribute | Type          |
| --------- | ------------- |
| block     | [BlockHeader] |
| block_id  | [BlockID]     |

## DataSource

| Attribute   | Type      | Description                    |
| ----------- | --------- | ------------------------------ |
| owner       | [Address] | The owner of the data source   |
| name        | string    | The name of data source        |
| description | string    | The description of data source |
| filename    | string    | The data source file name      |

## OracleScript

| Attribute       | Type      | Description                                                                                           |
| --------------- | --------- | ----------------------------------------------------------------------------------------------------- |
| owner           | [Address] | The owner of the oracle script                                                                        |
| name            | string    | The name of oracle script                                                                             |
| description     | string    | The description of oracle script                                                                      |
| filename        | string    | The oracle script file name                                                                           |
| schema          | string    | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| source_code_url | string    | The URL for the source code of this oracle script                                                     |

## RawRequest

| Attribute      | Type    | Description                                                                                        |
| -------------- | ------- | -------------------------------------------------------------------------------------------------- |
| data_source_id | integer | The unique identifier number assigned to the data source when it was first registered on Bandchain |
| external_id    | integer | The type-safe unique identifier type for raw data requests.                                        |
| calldata       | bytes   | The input parameters associated with the request                                                   |

## Request

| Attribute            | Type               | Description                                                                                                                                       |
| -------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracle_script_id     | integer            | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                              |
| requested_validators | list(string)       | The validators that have been assigned to report data.                                                                                            |
| min_count            | integer            | The minimum number of validators necessary for the request to proceed to the execution phase                                                      |
| request_height       | integer            | The block height that has this request                                                                                                            |
| raw_requests         | list([RawRequest]) | List of raw request                                                                                                                               |
| client_id            | string             | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData |
| calldata             | bytes              | The data passed over to the oracle script for the script to use during its execution                                                              |

## RawReport

| Attribute   | Type    | Description                                                 |
| ----------- | ------- | ----------------------------------------------------------- |
| external_id | integer | The type-safe unique identifier type for raw data requests. |
| data        | bytes   | A data source query                                         |

## Report

| Attribute         | Type              | Description                                                |
| ----------------- | ----------------- | ---------------------------------------------------------- |
| validator         | string            | The address of validator                                   |
| raw_reports       | list([RawReport]) | List of validator's report                                 |
| in_before_resolve | bool              | The request status of validator before the request resolve |

## RequestPacketData

| Attribute        | Type    | Description                                                                                                                                                |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracle_script_id | integer | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| ask_count        | integer | The number of validators that are requested to respond to this request                                                                                     |
| min_count        | integer | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |
| client_id        | string  | The unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| calldata         | bytes   | The data passed over to the oracle script for the script to use during its execution                                                                       |

## ResponsePacketData

| Attribute      | Type    | Description                                                                                                                                       |
| -------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| request_id     | integer | The unique identifier number of the particular request                                                                                            |
| request_time   | integer | The timestamp of when the request was made                                                                                                        |
| resolve_time   | integer | The timestamp of when the last validator submitted the report and the request is resolved                                                         |
| resolve_status | string  | The resolve status of the request. See here for the full list of possible values                                                                  |
| ans_count      | integer | The number of validators that answers the request, retrieved the data, and submitted a report                                                     |
| client_id      | string  | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData |
| result         | bytes   | The aggregated value of the results returned by the validators                                                                                    |

## Result

| Attribute            | Type                 | Description                                                                                                                                                                    |
| -------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| request_packet_data  | [RequestPacketData]  | This is the data packet that the blockchain looking to send a request to BandChain's oracle must send.                                                                         |
| response_packet_data | [ResponsePacketData] | This is the packet that will be relayed from BandChain back to the requester's chain. It contains information on the response parameters as well as the requested data itself. |

## RequestInfo

| Attribute | Type                    | Description                     |
| --------- | ----------------------- | ------------------------------- |
| request   | [Request]               | The request info                |
| reports   | optional(list([Report]) | The list of report              |
| result    | optional([Result])      | The final result of the request |

## TransactionSyncMode

| Attribute | Type                  | Description      |
| --------- | --------------------- | ---------------- |
| tx_hash   | HexBytes(bytes alias) | Transaction hash |
| code      | integer               | Response code    |
| error_log | optional(string)      | The error log    |

## TransactionAsyncMode

| Attribute | Type                  | Description      |
| --------- | --------------------- | ---------------- |
| tx_hash   | HexBytes(bytes alias) | Transaction hash |

## TransactionBlockMode

| Attribute  | Type                  | Description                              |
| ---------- | --------------------- | ---------------------------------------- |
| height     | int                   | Height of the block just executed.       |
| tx_hash    | HexBytes(bytes alias) | Transaction hash                         |
| gas_wanted | integer               | Amount of gas requested for transaction. |
| gas_used   | integer               | Amount of gas consumed by transaction.   |
| code       | integer               | Response code                            |
| log        | list(dict)            | The output of the application's logger   |
| error_log  | optional(string)      | The error log                            |

## Coin

| Attribute | Type    | Description                                 |
| --------- | ------- | ------------------------------------------- |
| amount    | integer | The amount of coin in the unit e.g. 1000000 |
| denom     | string  | The price unit e.g. "uband"                 |

## ReferencePriceUpdated

| Attribute | Type    | Description        |
| --------- | ------- | ------------------ |
| base      | integer | Base resolve time  |
| quote     | integer | Quote resolve time |

## ReferencePrice

| Attribute  | Type                    | Description                    |
| ---------- | ----------------------- | ------------------------------ |
| pair       | string                  | The token pair e.g. "BTC/USDT" |
| rate       | float                   | Price rate                     |
| updated_at | [ReferencePriceUpdated] | Price update time              |

[address]: /client-library/pyband/wallet.html#address "Address"
[request]: #request "Request"
[report]: #report "Report"
[rawrequest]: #rawrequest "RawRequest"
[rawreport]: #rawreport "RawReport"
[result]: #result "Result"
[requestpacketdata]: #requestpacketdata "RequestPacketData"
[responsepacketdata]: #responsepacketdata "ResponsePacketData"
[blockheader]: #blockheader "BlockHeader"
[blockid]: #blockid "BlockID"
[blockheaderinfo]: #blockheaderinfo "BlockHeaderInfo"
[coin]: #coin "Coin"
[referencepriceupdated]: #referencepriceupdated "ReferencePriceUpdated"
