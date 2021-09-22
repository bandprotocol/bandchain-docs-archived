<!--
order: 4
-->

# BandChain CLI & REST Endpoint

## Get Data Source by ID

**CLI**: `bandd query oracle data-source [id]`

**Path**: `/api/oracle/v1/{id}`
**Method**: `GET`

```bash
$ bandd query oracle data-source 1
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/data_sources/1
{
  "data_source": {
    "owner": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
    "name": "DS1",
    "description": "TBD",
    "filename": "32ee6262d4a615f2c3ca0589c1c1af79212f24823453cb3f4cfff85b8d338045",
    "treasury": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
    "fee": [
    ]
  }
}
```

## Get Oracle Script by ID

**CLI**: `bandd query oracle-script [id]`

**Path**: `/api/oracle/v1/oracle_scripts/{id}`
**Method**: `GET`

```bash
$ bandd query oracle oracle-script 1
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/oracle_scripts/1
{
  "oracle_script": {
    "owner": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
    "name": "OS1",
    "description": "TBD",
    "filename": "f86b37dbe62c3b8c86ae28523bf09e9963a6b2951dd1a5be79f29f66d8236abf",
    "schema": "{gas_option:string}/{gweix10:u64}",
    "source_code_url": ""
  }
}   
```

## Get Data Oracle Request by ID

**CLI**: `bandd query request [id]`

**Path**: `/api/oracle/v1/requests/{id}`
**Method**: `GET`

```bash
$ bandd query oracle request 238769
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/requests/238769
{
  "request": null,
  "reports": [
  ],
  "result": {
    "client_id": "",
    "oracle_script_id": "45",
    "calldata": "AAAAADuaygA=",
    "ask_count": "1",
    "min_count": "1",
    "request_id": "238769",
    "ans_count": "1",
    "request_time": "1631875016",
    "resolve_time": "1631875025",
    "resolve_status": "RESOLVE_STATUS_SUCCESS",
    "result": "AAAABgAAJTQklj0tAAAlLqof6HgAACUxZ1sS0gAAJTQWj++HAAAlLwVI4S0AACUxjexoWgAAJoa0wLAAAAAmb2xJyAAAACZ7EIU8AAAAJmPIDlQAAAAmWCPS4AAAACZd9fCaAAAAJqdNZygAAAAmQy9n3AAAACZ1PmeCAAAAJmYcGjgAAAAmOd84TAAAACZP/alCAA=="
  }
}
```

## Get Data Requests by Query Info

**CLI**: `bandd query oracle request-search [oracle-script-id] [calldata-hex] [ask-count] [min-count]`

**Path**: `/api/oracle/v1/request_search?oracle_script_id={oracleScriptID}&calldata={calldataHex}&min_count={minCount}&ask_count={askCount}`
**Method**: `GET`

```bash
$ bandd query oracle request-search 57 00000040633137353434383063646638313161653935363861636437313437643933393533323063373065376230383466303436376432613032643536336663653637340000000061440b80 4 3
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/request_search?oracle_script_id=44&calldata=00000015000000044141504c00000005474f4f474c0000000454534c41000000044e464c5800000003515151000000045457545200000004424142410000000349415500000003534c560000000355534f000000045649585900000004414d5a4e000000044d5346540000000246420000000247530000000441424e4200000003474d4500000003414d430000000353505900000004434f494e00000004474c5859000000003b9aca00&min_count=10&ask_count=16
{
  "request": {
    "request": {
      "oracle_script_id": "44",
      "calldata": "AAAAFQAAAARBQVBMAAAABUdPT0dMAAAABFRTTEEAAAAETkZMWAAAAANRUVEAAAAEVFdUUgAAAARCQUJBAAAAA0lBVQAAAANTTFYAAAADVVNPAAAABFZJWFkAAAAEQU1aTgAAAARNU0ZUAAAAAkZCAAAAAkdTAAAABEFCTkIAAAADR01FAAAAA0FNQwAAAANTUFkAAAAEQ09JTgAAAARHTFhZAAAAADuaygA=",
      "requested_validators": [
        "bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl",
        "bandvaloper1zkf9qzs7ayf3uqksxqwve8q693dsdhxk800wvw",
        "bandvaloper1274qgg28xkz6f3upx05ftr9zepgmtfgts392dy",
        "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
        "bandvaloper1sx86alzudpeyht0tedqselka30x595xtku0p69",
        "bandvaloper1nk6arnyj43gcayu55trz30dhnnj2k5rdtwae4y",
        "bandvaloper1wtjhrn76r8mez53lg2xw8qkyrrqaa36wl0d0sj",
        "bandvaloper1zrl8gmuj3vug7qy7yazzaenl25fvd3s3ussk40",
        "bandvaloper1qff7h0frvsh09zp6cyesvecac37388ydksshu0",
        "bandvaloper1d099cr275lnsq9fqref9hfp4ec24rm7x7m44k7",
        "bandvaloper1gnsmm9jrdd3ma0dj9srfhd5k7u6r0cc5mxlj5s",
        "bandvaloper1p46f6t280aygwktq5vqksr6ecr4fgccntk909m",
        "bandvaloper1xv3dmy7rc4lkvtwe4ka4u9d4qlgsx5vhprs95n",
        "bandvaloper1ajna89zrh4u2kuvc6qqyak7fn9dqphlhuvg0jk",
        "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
        "bandvaloper13u5m7jtrvppnrh7xmdp486qek9qcnjzs6zrkp7"
      ],
      "min_count": "10",
      "request_height": "349436",
      "request_time": "1632294658",
      "client_id": "mirror-protocol",
      "raw_requests": [
        {
          "external_id": "0",
          "data_source_id": "75",
          "calldata": "QUFQTCBHT09HTCBUU0xBIE5GTFggUVFRIFRXVFIgQkFCQSBJQVUgU0xWIFVTTyBWSVhZIEFNWk4gTVNGVCBGQiBHUyBBQk5CIEdNRSBBTUMgU1BZIENPSU4="
        },
        {
          "external_id": "2",
          "data_source_id": "77",
          "calldata": "R0xYWQ=="
        },
        {
          "external_id": "1",
          "data_source_id": "76",
          "calldata": "QUFQTCBHT09HTCBUU0xBIE5GTFggUVFRIFRXVFIgQkFCQSBJQVUgU0xWIFVTTyBWSVhZIEFNWk4gTVNGVCBGQiBHUyBBQk5CIEdNRSBBTUMgU1BZIENPSU4="
        }
      ],
      "ibc_channel": null,
      "execute_gas": "750000"
    },
    "reports": [
      {
        "validator": "bandvaloper1qff7h0frvsh09zp6cyesvecac37388ydksshu0",
        "in_before_resolve": true,
        "raw_reports": [
          {
            "external_id": "1",
            "exit_code": 0,
            "data": "MTQzLjA4LDI3NzAuMCw3MzcuMDEsNTcxLjAsMzY0Ljk0LDYyLjU2LDE0OS43NCwzMy43OSwyMC44NCw0OS41OCwyMy40MiwzMzM1LjAsMjk0LjA3LDM1Ni41LDM3NC44MSwxNjguNjIsMTg4LjgsMzguMTIsNDMzLjYzLDIzNC44OAo="
          },
          {
            "external_id": "0",
            "exit_code": 0,
            "data": "MTQzLjQzLDI3ODAuNjYsNzM5LjM4LDU3My4xNCwzNjYuMTUsNjIuNzgsMTUwLjE4LDMzLjc5LDIwLjg0LDQ5LjU4LDIzLjQyLDMzNDMuNjMsMjk0LjgsMzU3LjQ4LDM3NS44NCwxNjkuMjksMTg5Ljk1LDM4LjgyLDQzMy42MywyMzguNDYK"
          },
          {
            "external_id": "2",
            "exit_code": 0,
            "data": "MTcuMjcwOAo="
          }
        ]
      },
      {
        "validator": "bandvaloper1p46f6t280aygwktq5vqksr6ecr4fgccntk909m",
        "in_before_resolve": true,
        "raw_reports": [
          {
            "external_id": "2",
            "exit_code": 0,
            "data": "MTcuMjcwOAo="
          },
          {
            "external_id": "1",
            "exit_code": 0,
            "data": "MTQzLjA4LDI3NzAuMCw3MzcuMDEsNTcxLjAsMzY0Ljk0LDYyLjU2LDE0OS43NCwzMy43OSwyMC44NCw0OS41OCwyMy40MiwzMzM1LjAsMjk0LjA3LDM1Ni41LDM3NC44MSwxNjguNjIsMTg4LjgsMzguMTIsNDMzLjYzLDIzNC44OAo="
          },
          {
            "external_id": "0",
            "exit_code": 0,
            "data": "MTQzLjQzLDI3ODAuNjYsNzM5LjM4LDU3My4xNCwzNjYuMTUsNjIuNzgsMTUwLjE4LDMzLjc5LDIwLjg0LDQ5LjU4LDIzLjQyLDMzNDMuNjMsMjk0LjgsMzU3LjQ4LDM3NS44NCwxNjkuMjksMTg5Ljk1LDM4LjgyLDQzMy42MywyMzguNDYK"
          }
        ]
      },
      ...
  }
```

## Get Data Content by Hash

**Path**: `/oracle/v1/data/{data_hash}`
**Method**: `GET`

```bash
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/data/32ee6262d4a615f2c3ca0589c1c1af79212f24823453cb3f4cfff85b8d338045
{
  "data": "IyEvdXNyL2Jpbi9lbnYgcHl0aG9uMwoKaW1wb3J0IGpzb24KaW1wb3J0IHVybGxpYi5yZXF1ZXN0CmltcG9ydCBzeXMKCkVUSF9HQVNfU1RBVElPTl9VUkwgPSAiaHR0cHM6Ly9ldGhnYXNzdGF0aW9uLmluZm8vanNvbi9ldGhnYXNBUEkuanNvbiIKCgpkZWYgbWFrZV9qc29uX3JlcXVlc3QodXJsKToKICAgIHJlcSA9IHVybGxpYi5yZXF1ZXN0LlJlcXVlc3QodXJsKQogICAgcmVxLmFkZF9oZWFkZXIoCiAgICAgICAgIlVzZXItQWdlbnQiLAogICAgICAgICJNb3ppbGxhLzUuMCAoTWFjaW50b3NoOyBJbnRlbCBNYWMgT1MgWCAxMF8xMV81KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvNTAuMC4yNjYxLjEwMiBTYWZhcmkvNTM3LjM2IiwKICAgICkKICAgIHJldHVybiBqc29uLmxvYWRzKHVybGxpYi5yZXF1ZXN0LnVybG9wZW4ocmVxKS5yZWFkKCkpCgoKZGVmIG1haW4odHlwZSk6CiAgICBwcmljZSA9IG1ha2VfanNvbl9yZXF1ZXN0KEVUSF9HQVNfU1RBVElPTl9VUkwpCiAgICByZXR1cm4gcHJpY2VbdHlwZV0KCgppZiBfX25hbWVfXyA9PSAiX19tYWluX18iOgogICAgdHJ5OgogICAgICAgIHByaW50KG1haW4oKnN5cy5hcmd2WzE6XSkpCiAgICBleGNlcHQgRXhjZXB0aW9uIGFzIGU6CiAgICAgICAgcHJpbnQoc3RyKGUpLCBmaWxlPXN5cy5zdGRlcnIpCiAgICAgICAgc3lzLmV4aXQoMSkK"
}
```

## Get Active Status of a Validator

**CLI**: `bandd query oracle validator [validator-address]`

**Path**: `/api/oracle/v1/validators/{validator-address}`
**Method**: `GET`

```bash
$ bandd query oracle validator bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/validators/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
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
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/reporter/bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus/band1rgcrk9qttfjc5zfnmu63wj8503gc5r3wlagdrm
{
  "is_reporter": true
}
```


## Get Active Validators

**CLI**: `bandd query oracle active-validators`

**Path**: `/api/oracle/v1/active_validators`
**Method**: `GET`

```bash
$ bandd query oracle active-validators
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/active_validators
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
$ bandd query oracle pending-requests bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/pending_requests/bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus
{
  "request_ids": [
  ]
}
```

## Get Latest Price on Standard Price Reference Database
**bandd**: `bandd query oracle request-price [symbols-comma-separated] [ask-count] [min-count]` 

**Path**: `/oracle/v1/request_prices?ask_count={askCount}&min_count={minCount}&symbols={symbol-1}&symbols={symbol-2}&...&symbols={symbols-n}`
**Method**: `GET`

```bash
$ bandd query oracle request-price BTC,ETH 4 3
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/request_prices?symbols=BTC&symbols=ETH&ask_count=4&min_count=3
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

**CLI**: `bandd query oracle params`

**Path**: `/oracle/v1/params`
**Method**: `GET`

```bash
$ bandd query oracle params
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/params
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

**CLI**: `bandd query oracle counts`

**Path**: `/oracle/v1/counts`
**Method**: `GET`

```bash
$ bandd query oracle counts
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/v1/counts
{
  "data_source_count": "98",
  "oracle_script_count": "61",
  "request_count": "249073"
}
```
