<!--
order: 4
-->

# BandChain CLI & REST Endpoint

## Get Data Source by ID

**Path**: `/oracle/data_sources/{id}`
**Method**: `GET`

```bash
$ bandcli query oracle data-source 1
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/data_sources/1
{
  "height": "10000",
  "result": {
    "description": "FOOBAR",
    "filename": "c56de9061a78ac96748c83e8a22330accf6ee8ebb499c8525613149a70ec49d0",
    "name": "FOOBAR",
    "owner": "band1m5lq9u533qaya4q3nfyl6ulzqkpkhge9q8tpzs"
  }
}
```

## Get Oracle Script by ID

**Path**: `/oracle/oracle_scripts/{id}`
**Method**: `GET`

```bash
$ bandcli query oracle oracle-script 1
$ curl -X GET http://gyms1.bandchain.org:26657//oracle/oracle_scripts/1
{
  "height": "10000",
  "result": {
    "description": "FOOBAR",
    "filename": "7d91afbf23e2121a1f371bf37e382cce0f4b9b4239fa3882581f4dc8f2c993ce",
    "name": "FOOBAR",
    "owner": "band1m5lq9u533qaya4q3nfyl6ulzqkpkhge9q8tpzs",
    "schema": "OBI_SCHEMA",
    "source_code_url": "URL"
  }
}
```

## Get Data Oracle Request by ID

**Path**: `/oracle/requests/{id}`
**Method**: `GET`

```bash
$ bandcli query oracle request 1
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/requests/1
{
  "request": {
    "oracle_script_id": "1",
    "calldata": "...",
    "requested_validators": [
      "...",
      "..."
    ],
    "min_count": "1",
    "request_height": "10000",
    "request_time": "1600000000",
    "raw_request_ids": [
      "...",
      "...",
    ]
  },
  "reports": [
    {
      "validator": "...",
      "raw_reports": [
        {
          "external_id": "...",
          "data": "..."
        },
        {
          "external_id": "...",
          "data": "..."
        }
      ]
    }
  ]
}
```

## Search Data Requests by Query Info

**Path**: `/oracle/requests?oid={oracle-script-id}&calldata={calldata}&min-count={min-count}&limit={limit}&page={page}`
**Method**: `GET`

```bash
$ bandcli query oracle requests --oid 1 --calldata AAAA --min-count 5 --limit 10 --page 2
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/requests?oid=1&calldata=AAAA&min-count=5&limit=10&page=2
{
  "result": [{
      "request": {...},
      "reports": {...}
  }, {
      "request": {...},
      "reports": {...}
  }]
}
```

## Get Data Content by Hash

**Path**: `/oracle/data/{hash}`
**Method**: `GET`

```bash
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/data/c56de9061a78ac96748c83e8a22330accf6ee8ebb499c8525613149a70ec49d0
#!/usr/bin/env python3

import json
import urllib.request
...
```

## Get Reporters by Validator Address

**Path**: `/oracle/reporters/{validator-address}`
**Method**: `GET`

```bash
$ bandcli query oracle reporters bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/reporters/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
{
  "height": "27",
  "result": [
    "band1p40yh3zkmhcv0ecqp3mcazy83sa57rgjp07dun",
    "band1m5lq9u533qaya4q3nfyl6ulzqkpkhge9q8tpzs"
  ]
}
```

## Get Report Info by Validator Address

**Path**: `/oracle/report_info/{validator-address}`
**Method**: `GET`

```bash
$ bandcli query oracle report_info bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/report_info/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
{
  "height": "1083",
  "result": {
    "consecutive_missed": "1",
    "validator": "bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec"
  }
}
```

## Get BandChain Oracle Governance Parameters

**Path**: `/oracle/params`
**Method**: `GET`

```bash
$ bandcli query oracle params
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/params
{
  "height": "10000",
  "result": {
    "base_request_gas": "150000",
    "expiration_block_count": "20",
    "max_ask_count": "16",
    "max_consecutive_misses": "10",
    "max_raw_request_count": "16",
    "per_validator_request_gas": "30000"
  }
}
```

## Get BandChain Oracle Counts

**Path**: `/oracle/counts`
**Method**: `GET`

```bash
$ bandcli query oracle counts
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/counts
{
  "height": "3462",
  "result": {
    "data_source_count": "14",
    "oracle_script_count": "13",
    "request_count": "3"
  }
}
```
