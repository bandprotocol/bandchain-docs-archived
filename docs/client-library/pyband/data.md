# Data Module

## Account

| Attribute      | Type           |
| -------------- | -------------- |
| address        | [`Address`]    |
| coins          | list(dict)     |
| public_key     | optional(dict) |
| account_number | integer        |
| sequence       | integer        |

## BlockHeaderInfo

| Attribute            | Type                  |
| -------------------- | --------------------- |
| chain_id             | string                |
| height               | integer               |
| time                 | Timestamp             |
| last_commit_hash     | HexBytes(bytes alias) |
| data_hash            | HexBytes(bytes alias) |
| validators_hash      | HexBytes(bytes alias) |
| next_validators_hash | HexBytes(bytes alias) |
| consensus_hash       | HexBytes(bytes alias) |
| app_hash             | HexBytes(bytes alias) |
| last_results_hash    | HexBytes(bytes alias) |
| evidence_hash        | HexBytes(bytes alias) |
| proposer_address     | HexBytes(bytes alias) |

## BlockHeader

| Attribute | Type                                  |
| --------- | ------------------------------------- |
| header    | [`BlockHeaderInfo`](#blockheaderinfo) |

## BlockID

| Attribute | Type                  |
| --------- | --------------------- |
| hash      | HexBytes(bytes alias) |

## Block

| Attribute | Type            |
| --------- | --------------- |
| block     | [`BlockHeader`] |
| block_id  | [`BlockID`]     |

## DataSource

| Attribute   | Type        |
| ----------- | ----------- |
| owner       | [`Address`] |
| name        | string      |
| description | string      |
| filename    | string      |

## OracleScript

| Attribute       | Type        |
| --------------- | ----------- |
| owner           | [`Address`] |
| name            | string      |
| description     | string      |
| filename        | string      |
| schema          | string      |
| source_code_url | string      |

## RawRequest

| Attribute      | Type    |
| -------------- | ------- |
| data_source_id | integer |
| external_id    | integer |
| calldata       | bytes   |

## Request

| Attribute            | Type                 |
| -------------------- | -------------------- |
| oracle_script_id     | integer              |
| requested_validators | list(string)         |
| min_count            | integer              |
| request_height       | integer              |
| raw_requests         | list([`RawRequest`]) |
| client_id            | string               |
| calldata             | bytes                |

## RawReport

| Attribute   | Type    |
| ----------- | ------- |
| external_id | integer |
| data        | bytes   |

## Report

| Attribute         | Type                |
| ----------------- | ------------------- |
| validator         | string              |
| raw_reports       | list([`RawReport`]) |
| in_before_resolve | bool                |

## RequestPacketData

| Attribute        | Type    |
| ---------------- | ------- |
| oracle_script_id | integer |
| ask_count        | integer |
| min_count        | integer |
| client_id        | string  |
| calldata         | bytes   |

## ResponsePacketData

| Attribute      | Type    |
| -------------- | ------- |
| request_id     | integer |
| request_time   | integer |
| resolve_time   | integer |
| resolve_status | string  |
| ans_count      | integer |
| client_id      | string  |
| result         | bytes   |

## Result

| Attribute            | Type                   |
| -------------------- | ---------------------- |
| request_packet_data  | [`RequestPacketData`]  |
| response_packet_data | [`ResponsePacketData`] |

## RequestInfo

| Attribute | Type                      |
| --------- | ------------------------- |
| request   | [`Request`]               |
| reports   | optional(list([`Report`]) |
| result    | optional([`Result`])      |

## TransactionSyncMode

| Attribute | Type                  |
| --------- | --------------------- |
| tx_hash   | HexBytes(bytes alias) |
| code      | integer               |
| error_log | optional(string)      |

## TransactionAsyncMode

| Attribute | Type                  |
| --------- | --------------------- |
| tx_hash   | HexBytes(bytes alias) |

## TransactionBlockMode

| Attribute  | Type                  |
| ---------- | --------------------- |
| height     | int                   |
| tx_hash    | HexBytes(bytes alias) |
| gas_wanted | integer               |
| gas_used   | integer               |
| code       | integer               |
| log        | list(dict)            |
| error_log  | optional(string)      |

[`address`]: /client-library/pyband/wallet.html "Address"
[`request`]: #request "Request"
[`report`]: #report "Report"
[`result`]: #result "Result"
[`requestpacketdata`]: #requestpacketdata "RequestPacketData"
[`responsepacketdata`]: #responsepacketdata "ResponsePacketData"
[`blockheader`]: #blockheader "BlockHeader"
[`blockid`]: #blockid "BlockID"
[`blockheaderinfo`]: #blockheaderinfo "BlockHeaderInfo"
[`coin`]: #coin "Coin"
