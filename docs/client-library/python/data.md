# Data Classes

## account

| Attribute      | Type           |
| -------------- | -------------- |
| address        | string         |
| coins          | list(dict)     |
| public_key     | optional(dict) |
| account_number | integer        |
| sequence       | integer        |

## data source

| Attribute   | Type   |
| ----------- | ------ |
| owner       | string |
| name        | string |
| description | string |
| filename    | string |

## oracle script

| Attribute       | Type   |
| --------------- | ------ |
| owner           | string |
| name            | string |
| description     | string |
| filename        | string |
| schema          | string |
| source_code_url | string |

## raw request

| Attribute      | Type    |
| -------------- | ------- |
| data_source_id | integer |
| external_id    | integer |
| calldata       | bytes   |

## request

| Attribute            | Type                             |
| -------------------- | -------------------------------- |
| oracle_script_id     | integer                          |
| requested_validators | list(string)                     |
| min_count            | integer                          |
| request_height       | integer                          |
| raw_requests         | list([RawRequest](#raw-request)) |
| client_id            | str                              |
| calldata             | bytes                            |

## raw report

| Attribute   | Type    |
| ----------- | ------- |
| external_id | integer |
| data        | bytes   |

## report

| Attribute         | Type                           |
| ----------------- | ------------------------------ |
| validator         | string                         |
| raw_reports       | list([RawReport](#raw-report)) |
| in_before_resolve | bool                           |

## request packet data

| Attribute        | Type    |
| ---------------- | ------- |
| oracle_script_id | integer |
| ask_count        | integer |
| min_count        | integer |
| client_id        | string  |
| calldata         | bytes   |

## response packet data

| Attribute      | Type    |
| -------------- | ------- |
| request_id     | integer |
| request_time   | integer |
| resolve_time   | integer |
| resolve_status | string  |
| ans_count      | bytes   |
| client_id      | string  |
| result         | bytes   |

## result

| Attribute            | Type                                        |
| -------------------- | ------------------------------------------- |
| request_packet_data  | [RequestPacketData](#request-packet-data)   |
| response_packet_data | [ResponsePacketData](#response-packet-data) |

## request info

| Attribute | Type                              |
| --------- | --------------------------------- |
| request   | [Request](#request)               |
| reports   | optional(list([Report](#report))) |
| result    | optional([Result](#result))       |

## oracle data proof

| Attribute            | Type                                        |
| -------------------- | ------------------------------------------- |
| request_packet_data  | [RequestPacketData](#request-packet-data)   |
| response_packet_data | [ResponsePacketData](#response-packet-data) |
| version              | string                                      |
| merkle_paths         | array(string)                               |

## block relay proof

| Attribute                 | Type          |
| ------------------------- | ------------- |
| multi_store_proof         | object        |
| block_header_merkle_parts | object        |
| signatures                | array(string) |

## json proof

| Attribute         | Type                                  |
| ----------------- | ------------------------------------- |
| block_height      | string                                |
| oracle_data_proof | [OracleDataProof](#oracle-data-proof) |
| block_relay_proof | ...                                   |

## evm proof

| Attribute       | Type                     |
| --------------- | ------------------------ |
| json_proof      | [JsonProof](#json-proof) |
| evm_proof_bytes | bytes                    |
