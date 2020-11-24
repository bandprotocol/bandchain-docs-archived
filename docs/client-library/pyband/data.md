# Data Module

## Account

| Attribute      | Type           |
| -------------- | -------------- |
| address        | Address        |
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

| Attribute | Type                          |
| --------- | ----------------------------- |
| block     | [`BlockHeader`](#blockheader) |
| block_id  | [`BlockID`](#blockid)         |

## DataSource

| Attribute   | Type    |
| ----------- | ------- |
| owner       | Address |
| name        | string  |
| description | string  |
| filename    | string  |

## OracleScript

| Attribute       | Type    |
| --------------- | ------- |
| owner           | Address |
| name            | string  |
| description     | string  |
| filename        | string  |
| schema          | string  |
| source_code_url | string  |

## RawRequest

| Attribute      | Type    |
| -------------- | ------- |
| data_source_id | integer |
| external_id    | integer |
| calldata       | bytes   |

## Request

| Attribute            | Type                              |
| -------------------- | --------------------------------- |
| oracle_script_id     | integer                           |
| requested_validators | list(string)                      |
| min_count            | integer                           |
| request_height       | integer                           |
| raw_requests         | list([`RawRequest`](#rawrequest)) |
| client_id            | string                            |
| calldata             | bytes                             |

## RawReport

| Attribute   | Type    |
| ----------- | ------- |
| external_id | integer |
| data        | bytes   |

## Report

| Attribute         | Type                            |
| ----------------- | ------------------------------- |
| validator         | string                          |
| raw_reports       | list([`RawReport`](#rawreport)) |
| in_before_resolve | bool                            |

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

| Attribute            | Type                                        |
| -------------------- | ------------------------------------------- |
| request_packet_data  | [`RequestPacketData`](#requestpacketdata)   |
| response_packet_data | [`ResponsePacketData`](#responsepacketdata) |

## RequestInfo

| Attribute | Type                                |
| --------- | ----------------------------------- |
| request   | [`Request`](#request)               |
| reports   | optional(list([`Report`](#report))) |
| result    | optional([`Result`](#result))       |

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
