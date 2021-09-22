<!--
order: 4
-->

# Band CLI & REST Endpoint

You can get the RPC and REST endpoints from [here](/technical-specifications/band-endpoints.html).

## Get Data Source by ID

**CLI**: `bandd query oracle data-source [id] --node ${RPC}`

**Path**: `/api/oracle/v1/{id}`
**Method**: `GET`

```bash
$ bandd query oracle data-source 1 --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/data_sources/1"
{
  "data_source": {
    "owner": "band1m5lq9u533qaya4q3nfyl6ulzqkpkhge9q8tpzs",
    "name": "d1",
    "description": "d1",
    "filename": "c56de9061a78ac96748c83e8a22330accf6ee8ebb499c8525613149a70ec49d0",
    "treasury": "band1m5lq9u533qaya4q3nfyl6ulzqkpkhge9q8tpzs",
    "fee": [
      {
        "denom": "uband",
        "amount": "1"
      }
    ]
  }
}
```

## Get Oracle Script by ID

**CLI**: `bandd query oracle-script [id] --node ${RPC}`

**Path**: `/api/oracle/v1/oracle_scripts/{id}`
**Method**: `GET`

```bash
$ bandd query oracle oracle-script 37 --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/oracle_scripts/37"
{
  "oracle_script": {
    "owner": "band1lv90l7xf3jyneh046clyfujz2se6xkqgcvzs3p",
    "name": "Band Standard Dataset (Crypto)",
    "description": "",
    "filename": "f0b7d894b25eca60e8519ca3d37b25ba1df2b01058ccf81ee825fa68293fcf16",
    "schema": "{symbols:[string],multiplier:u64}/{rates:[u64]}",
    "source_code_url": ""
  }
}
```

## Get Data Oracle Request by ID

**CLI**: `bandd query request [id] --node ${RPC}`

**Path**: `/api/oracle/v1/requests/{id}`
**Method**: `GET`

```bash
$ bandd query oracle request 238769 --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/requests/238769"
{
  "request": {
    "oracle_script_id": "37",
    "calldata": "AAAAAQAAAANCVEMAAAAAAA9CQA==",
    "requested_validators": [
      "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
      "bandvaloper1zrl8gmuj3vug7qy7yazzaenl25fvd3s3ussk40"
    ],
    "min_count": "2",
    "request_height": "358324",
    "request_time": "1632326855",
    "client_id": "from_scan",
    "raw_requests": [
      {
        "external_id": "6",
        "data_source_id": "61",
        "calldata": "QlRD"
      },
      {
        "external_id": "0",
        "data_source_id": "57",
        "calldata": "QlRD"
      },
      {
        "external_id": "3",
        "data_source_id": "62",
        "calldata": "QlRD"
      },
      {
        "external_id": "5",
        "data_source_id": "60",
        "calldata": "aHVvYmlwcm8gQlRD"
      },
      {
        "external_id": "2",
        "data_source_id": "59",
        "calldata": "QlRD"
      },
      {
        "external_id": "4",
        "data_source_id": "60",
        "calldata": "YmluYW5jZSBCVEM="
      },
      {
        "external_id": "9",
        "data_source_id": "60",
        "calldata": "Yml0dHJleCBCVEM="
      },
      {
        "external_id": "7",
        "data_source_id": "60",
        "calldata": "a3Jha2VuIEJUQw=="
      },
      {
        "external_id": "8",
        "data_source_id": "60",
        "calldata": "Yml0ZmluZXggQlRD"
      },
      {
        "external_id": "1",
        "data_source_id": "58",
        "calldata": "QlRD"
      }
    ],
    "ibc_channel": null,
    "execute_gas": "50000"
  },
  "reports": [
    {
      "validator": "bandvaloper1zrl8gmuj3vug7qy7yazzaenl25fvd3s3ussk40",
      "in_before_resolve": true,
      "raw_reports": [
        {
          "external_id": "0",
          "exit_code": 0,
          "data": "NDMyODEuMTQ0NQo="
        },
        {
          "external_id": "1",
          "exit_code": 0,
          "data": "NDMyMTIuMjEK"
        },
        {
          "external_id": "6",
          "exit_code": 0,
          "data": "NDMxOTEuOAo="
        },
        {
          "external_id": "3",
          "exit_code": 0,
          "data": "NDMyMDUuMjY0OQo="
        },
        {
          "external_id": "2",
          "exit_code": 0,
          "data": "NDM0MjgK"
        },
        {
          "external_id": "9",
          "exit_code": 0,
          "data": "NDMxNzUuMjA3Cg=="
        },
        {
          "external_id": "8",
          "exit_code": 0,
          "data": "NDMxMDYuMAo="
        },
        {
          "external_id": "7",
          "exit_code": 0,
          "data": "NDMxNzAuMgo="
        },
        {
          "external_id": "4",
          "exit_code": 0,
          "data": "NDMzOTMuNDQ3OAo="
        },
        {
          "external_id": "5",
          "exit_code": 0,
          "data": "NDM1OTUuMDk0Ngo="
        }
      ]
    },
    {
      "validator": "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
      "in_before_resolve": true,
      "raw_reports": [
        {
          "external_id": "2",
          "exit_code": 0,
          "data": "NDM0NDAK"
        },
        {
          "external_id": "3",
          "exit_code": 0,
          "data": "NDMyMDUuMjY0OQo="
        },
        {
          "external_id": "0",
          "exit_code": 0,
          "data": "NDMyODEuMTQ0NQo="
        },
        {
          "external_id": "1",
          "exit_code": 0,
          "data": "NDMyMTIuMjEK"
        },
        {
          "external_id": "7",
          "exit_code": 0,
          "data": "NDMxNzAuMgo="
        },
        {
          "external_id": "6",
          "exit_code": 0,
          "data": "NDMxOTEuOAo="
        },
        {
          "external_id": "8",
          "exit_code": 0,
          "data": "NDMxMDYuMAo="
        },
        {
          "external_id": "9",
          "exit_code": 0,
          "data": "NDMxNzUuMjA3Cg=="
        },
        {
          "external_id": "5",
          "exit_code": 0,
          "data": "NDMzNzkuMjk3NAo="
        },
        {
          "external_id": "4",
          "exit_code": 0,
          "data": "NDMzNjQuMzkzMgo="
        }
      ]
    }
  ],
  "result": {
    "client_id": "from_scan",
    "oracle_script_id": "37",
    "calldata": "AAAAAQAAAANCVEMAAAAAAA9CQA==",
    "ask_count": "2",
    "min_count": "2",
    "request_id": "249802",
    "ans_count": "2",
    "request_time": "1632326855",
    "resolve_time": "1632326863",
    "resolve_status": "RESOLVE_STATUS_SUCCESS",
    "result": "AAAAAQAAAAoPcQKq"
  }
}
```

## Get Data Requests by Query Info

**CLI**: `bandd query oracle request-search [oracle-script-id] [calldata-hex] [ask-count] [min-count] --node ${RPC}`

**Path**: `/api/oracle/v1/request_search?oracle_script_id={oracleScriptID}&calldata={calldataHex}&min_count={minCount}&ask_count={askCount}`
**Method**: `GET`

```bash
$ bandd query oracle request-search 37 --node ${RPC} 000000010000000342544300000000000f4240 2 2
$ curl -X GET "${REST}/oracle/v1/request_search?oracle_script_id=37&calldata=000000010000000342544300000000000f4240&min_count=2&ask_count=2"
{
  "request": {
    "request": {
      "oracle_script_id": "37",
      "calldata": "AAAAAQAAAANCVEMAAAAAAA9CQA==",
      "requested_validators": [
        "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
        "bandvaloper1zrl8gmuj3vug7qy7yazzaenl25fvd3s3ussk40"
      ],
      "min_count": "2",
      "request_height": "358324",
      "request_time": "1632326855",
      "client_id": "from_scan",
      "raw_requests": [
        {
          "external_id": "6",
          "data_source_id": "61",
          "calldata": "QlRD"
        },
        {
          "external_id": "0",
          "data_source_id": "57",
          "calldata": "QlRD"
        },
        {
          "external_id": "3",
          "data_source_id": "62",
          "calldata": "QlRD"
        },
        {
          "external_id": "5",
          "data_source_id": "60",
          "calldata": "aHVvYmlwcm8gQlRD"
        },
        {
          "external_id": "2",
          "data_source_id": "59",
          "calldata": "QlRD"
        },
        {
          "external_id": "4",
          "data_source_id": "60",
          "calldata": "YmluYW5jZSBCVEM="
        },
        {
          "external_id": "9",
          "data_source_id": "60",
          "calldata": "Yml0dHJleCBCVEM="
        },
        {
          "external_id": "7",
          "data_source_id": "60",
          "calldata": "a3Jha2VuIEJUQw=="
        },
        {
          "external_id": "8",
          "data_source_id": "60",
          "calldata": "Yml0ZmluZXggQlRD"
        },
        {
          "external_id": "1",
          "data_source_id": "58",
          "calldata": "QlRD"
        }
      ],
      "ibc_channel": null,
      "execute_gas": "50000"
    },
    "reports": [
      {
        "validator": "bandvaloper1zrl8gmuj3vug7qy7yazzaenl25fvd3s3ussk40",
        "in_before_resolve": true,
        "raw_reports": [
          {
            "external_id": "0",
            "exit_code": 0,
            "data": "NDMyODEuMTQ0NQo="
          },
          {
            "external_id": "1",
            "exit_code": 0,
            "data": "NDMyMTIuMjEK"
          },
          {
            "external_id": "6",
            "exit_code": 0,
            "data": "NDMxOTEuOAo="
          },
          {
            "external_id": "3",
            "exit_code": 0,
            "data": "NDMyMDUuMjY0OQo="
          },
          {
            "external_id": "2",
            "exit_code": 0,
            "data": "NDM0MjgK"
          },
          {
            "external_id": "9",
            "exit_code": 0,
            "data": "NDMxNzUuMjA3Cg=="
          },
          {
            "external_id": "8",
            "exit_code": 0,
            "data": "NDMxMDYuMAo="
          },
          {
            "external_id": "7",
            "exit_code": 0,
            "data": "NDMxNzAuMgo="
          },
          {
            "external_id": "4",
            "exit_code": 0,
            "data": "NDMzOTMuNDQ3OAo="
          },
          {
            "external_id": "5",
            "exit_code": 0,
            "data": "NDM1OTUuMDk0Ngo="
          }
        ]
      },
      {
        "validator": "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
        "in_before_resolve": true,
        "raw_reports": [
          {
            "external_id": "2",
            "exit_code": 0,
            "data": "NDM0NDAK"
          },
          {
            "external_id": "3",
            "exit_code": 0,
            "data": "NDMyMDUuMjY0OQo="
          },
          {
            "external_id": "0",
            "exit_code": 0,
            "data": "NDMyODEuMTQ0NQo="
          },
          {
            "external_id": "1",
            "exit_code": 0,
            "data": "NDMyMTIuMjEK"
          },
          {
            "external_id": "7",
            "exit_code": 0,
            "data": "NDMxNzAuMgo="
          },
          {
            "external_id": "6",
            "exit_code": 0,
            "data": "NDMxOTEuOAo="
          },
          {
            "external_id": "8",
            "exit_code": 0,
            "data": "NDMxMDYuMAo="
          },
          {
            "external_id": "9",
            "exit_code": 0,
            "data": "NDMxNzUuMjA3Cg=="
          },
          {
            "external_id": "5",
            "exit_code": 0,
            "data": "NDMzNzkuMjk3NAo="
          },
          {
            "external_id": "4",
            "exit_code": 0,
            "data": "NDMzNjQuMzkzMgo="
          }
        ]
      }
    ],
    "result": {
      "client_id": "from_scan",
      "oracle_script_id": "37",
      "calldata": "AAAAAQAAAANCVEMAAAAAAA9CQA==",
      "ask_count": "2",
      "min_count": "2",
      "request_id": "249802",
      "ans_count": "2",
      "request_time": "1632326855",
      "resolve_time": "1632326863",
      "resolve_status": "RESOLVE_STATUS_SUCCESS",
      "result": "AAAAAQAAAAoPcQKq"
    }
  }
}
```

## Get Data Content by Hash

**Path**: `/oracle/v1/data/{data_hash}`
**Method**: `GET`

```bash
$ curl -X GET "${REST}/oracle/v1/data/32ee6262d4a615f2c3ca0589c1c1af79212f24823453cb3f4cfff85b8d338045"
{
  "data": "IyEvdXNyL2Jpbi9lbnYgcHl0aG9uMwoKaW1wb3J0IGpzb24KaW1wb3J0IHVybGxpYi5yZXF1ZXN0CmltcG9ydCBzeXMKCkVUSF9HQVNfU1RBVElPTl9VUkwgPSAiaHR0cHM6Ly9ldGhnYXNzdGF0aW9uLmluZm8vanNvbi9ldGhnYXNBUEkuanNvbiIKCgpkZWYgbWFrZV9qc29uX3JlcXVlc3QodXJsKToKICAgIHJlcSA9IHVybGxpYi5yZXF1ZXN0LlJlcXVlc3QodXJsKQogICAgcmVxLmFkZF9oZWFkZXIoCiAgICAgICAgIlVzZXItQWdlbnQiLAogICAgICAgICJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xMV81KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjYxLjEwMiBTYWZhcmkvNTM3LjM2IiwKICAgICkKICAgIHJldHVybiBqc29uLmxvYWRzKHVybGxpYi5yZXF1ZXN0LnVybG9wZW4ocmVxKS5yZWFkKCkpCgoKZGVmIG1haW4odHlwZSk6CiAgICBwcmljZSA9IG1ha2VfanNvbl9yZXF1ZXN0KEVUSF9HQVNfU1RBVElPTl9VUkwpCiAgICByZXR1cm4gcHJpY2VbdHlwZV0KCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgdHJ5OgogICAgICAgIHByaW50KG1haW4oKnN5cy5hcmd2WzE6XSkpCiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6CiAgICAgICAgcHJpbnQoc3RyKGUpLCBmaWxlPXN5cy5zdGRlcnIpCiAgICAgICAgc3lzLmV4aXQoMSkK"
}
```

## Get Active Status of a Validator

**CLI**: `bandd query oracle validator [validator-address] --node ${RPC}`

**Path**: `/api/oracle/v1/validators/{validator-address}`
**Method**: `GET`

```bash
$ bandd query oracle validator bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/validators/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec"
{
  "status": {
    "is_active": false,
    "since": "0001-01-01T00:00:00Z"
  }
}
```

## Check Grant of Account on This Validator

**Path**: `/api/oracle/v1/reporter/{validator_address}/{reporter_address}`
**Method**: `GET`

```bash
$ curl -X GET "${REST}/oracle/v1/reporter/bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus/band1rgcrk9qttfjc5zfnmu63wj8503gc5r3wlagdrm"
{
  "is_reporter": true
}
```

## Get Active Validators

**CLI**: `bandd query oracle active-validators --node ${RPC}`

**Path**: `/api/oracle/v1/active_validators`
**Method**: `GET`

```bash
$ bandd query oracle active-validators --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/active_validators"
{
  "validators": [
    {
      "address": "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
      "power": "10132920646"
    },
    {
      "address": "bandvaloper1ajna89zrh4u2kuvc6qqyak7fn9dqphlhuvg0jk",
      "power": "10111034000"
    },
    {
      "address": "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
      "power": "10110700071"
    },
    {
      "address": "bandvaloper1274qgg28xkz6f3upx05ftr9zepgmtfgts392dy",
      "power": "10109100000"
    },
    {
      "address": "bandvaloper1jengg99ssg9xq9dycemt782syyr4wwdn4d68s7",
      "power": "10103500000"
    },
    {
      "address": "bandvaloper1zkf9qzs7ayf3uqksxqwve8q693dsdhxk800wvw",
      "power": "10101000000"
    },
    ...
  }
}
```

## Get Pending Requests

**bandd**: `bandd query oracle pending-requests [validator-address]`

**Path**: `/api/oracle/v1/pending_requests`
**Method**: `GET`

```bash
$ bandd query oracle pending-requests bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/pending_requests/bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus"
{
  "request_ids": [
    "249764"
  ]
}
```

## Get Latest Price on Standard Price Reference Database

**bandd**: `bandd query oracle request-price [symbols-comma-separated] [ask-count] [min-count]`

**Path**: `/oracle/v1/request_prices?ask_count={askCount}&min_count={minCount}&symbols={symbol-1}&symbols={symbol-2}&...&symbols={symbols-n}`
**Method**: `GET`

```bash
$ bandd query oracle request-price BTC,ETH 4 3 --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/request_prices?symbols=BTC&symbols=ETH&ask_count=4&min_count=3"
{
  "price_results": [
    {
      "symbol": "BTC",
      "multiplier": "100",
      "px": "4822795",
      "request_id": "235866",
      "resolve_time": "1631766659"
    },
    {
      "symbol": "ETH",
      "multiplier": "100",
      "px": "303321",
      "request_id": "245820",
      "resolve_time": "1632163802"
    }
  ]
}
```

## Get BandChain Oracle Governance Parameters

**CLI**: `bandd query oracle params --node ${RPC}`

**Path**: `/oracle/v1/params`
**Method**: `GET`

```bash
$ bandd query oracle params --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/params"
{
  "params": {
    "max_raw_request_count": "12",
    "max_ask_count": "16",
    "max_calldata_size": "256",
    "max_report_data_size": "512",
    "expiration_block_count": "100",
    "base_owasm_gas": "20000",
    "per_validator_request_gas": "30000",
    "sampling_try_count": "3",
    "oracle_reward_percentage": "70",
    "inactive_penalty_duration": "600000000000",
    "ibc_request_enabled": true
  }
}
```

## Get BandChain Oracle Counts

**CLI**: `bandd query oracle counts --node ${RPC}`

**Path**: `/oracle/v1/counts`
**Method**: `GET`

```bash
$ bandd query oracle counts --node ${RPC}
$ curl -X GET "${REST}/oracle/v1/counts"
{
  "data_source_count": "98",
  "oracle_script_count": "61",
  "request_count": "249073"
}
```
