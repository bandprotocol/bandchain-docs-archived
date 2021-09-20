<!--
order: 4
-->

# BandChain CLI & REST Endpoint

## Get Data Source by ID

**CLI**: `bandd query oracle data-source [id]`

**Path**: `/oracle/data_sources/{id}`
**Method**: `GET`

```bash
$ bandd query oracle data-source 1
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/data_sources/1
{
  "height":"298102",
  "result":{
    "status": 200,
    "result": {
      "owner": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
      "name": "DS1",
      "description": "TBD",
      "filename": "32ee6262d4a615f2c3ca0589c1c1af79212f24823453cb3f4cfff85b8d338045",
      "treasury": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
      "fee": []
    }
  }
}
```

## Get Oracle Script by ID

**CLI**: `bandd query oracle-script [id]`

**Path**: `/oracle/oracle_scripts/{id}`
**Method**: `GET`

```bash
$ bandd query oracle oracle-script 1
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/oracle_scripts/1
{
  "height":"298134",
  "result":{
    "status": 200,
    "result": {
      "owner": "band1jfdmjkxs3hvddsf4ef2wmsmte3s5llqhxqgcfe",
      "name": "OS1",
      "description": "TBD",
      "filename": "f86b37dbe62c3b8c86ae28523bf09e9963a6b2951dd1a5be79f29f66d8236abf",
      "schema": "{gas_option:string}/{gweix10:u64}"
    }
  }
}     
```

## Get Data Oracle Request by ID

**CLI**: `bandd query request [id]`

**Path**: `/oracle/requests/{id}`
**Method**: `GET`

```bash
$ bandd query oracle request 238769
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/requests/238769
{
  "height":"298219",
  "result":{
    "status": 200,
    "result": {
      "request": {
        "raw_requests": null
      },
      "reports": null,
      "result": {
        "oracle_script_id": "45",
        "calldata": "AAAAADuaygA=",
        "ask_count": "1",
        "min_count": "1",
        "request_id": "238769",
        "ans_count": "1",
        "request_time": "1631875016",
        "resolve_time": "1631875025",
        "resolve_status": 1,
        "result": "AAAABgAAJTQklj0tAAAlLqof6HgAACUxZ1sS0gAAJTQWj++HAAAlLwVI4S0AACUxjexoWgAAJoa0wLAAAAAmb2xJyAAAACZ7EIU8AAAAJmPIDlQAAAAmWCPS4AAAACZd9fCaAAAAJqdNZygAAAAmQy9n3AAAACZ1PmeCAAAAJmYcGjgAAAAmOd84TAAAACZP/alCAA=="
      }
    }
  }
}
```

## Search Data Requests by Query Info

**CLI**: `bandd query oracle request-search [oracle-script-id] [calldata-hex] [ask-count] [min-count]`

**Path**: `/oracle/requests?oid={oracle-script-id}&calldata={calldata}&min-count={min-count}&limit={limit}&page={page}` ???
**Method**: `GET`

```bash
$ bandd query oracle request-search 57 00000040633137353434383063646638313161653935363861636437313437643933393533323063373065376230383466303436376432613032643536336663653637340000000061440b80 4 3
request:
  reports:
  - in_before_resolve: true
    raw_reports:
    - data: NDBjYWZlMTVjYTM1NDU2NzE2Mzg1ZGE2ZTFiNTBkOWJmZjAxOWI1ODAyNjY3YjdjNDA4OGYxOGY2YjU5NzNkYmI5NjI2MWQxODQ1ZWYzNDdhN2E2N2RmMjRkOWFlYmViOTVmMTA5OGVmZWFhODdiMjI2ZGQwZDA0NTNlZTRkMTFmMjVkY2Q1NGE5OGIyZmJmMzZjNmQ3M2Q3YTZkNGUwZDM2YWE2Y2VjYjhjYzZkODM1MDNhYjEyYTU5MTQ3ZTRlYTczMWE3NmRkNjc3MDdlNTJjMDc3N2UzOTVlN2Q5NjNlMWE3M2VlMTcyOGE5MjIzOTYzMGI1ZjMxNTljZTViODNlYmM0OTg5M2NmYWZlMTg3MTk2ZDA1NGE1MTY5YWQwCg==
      exit_code: 0
      external_id: "1"
    validator: bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl
  - in_before_resolve: true
    raw_reports:
    - data: VHJhY2ViYWNrIChtb3N0IHJlY2VudCBjYWxsIGxhc3QpOgogIEZpbGUgIi90bXAvZXhlY3V0ZS5zaCIsIGxpbmUgMjE4LCBpbiA8bW9kdWxlPgogICAgVFdPX0lOViA9IF9pbnZlcnNlKDIpCiAgRmlsZSAiL3RtcC9leGVjdXRlLnNoIiwgbGluZSAyMTAsIGluIF9pbnZlcnNlCiAgICByZXR1cm4gcG93KHgsIC0xLCBQUklNRSkKVmFsdWVFcnJvcjogcG93KCkgMm5kIGFyZ3VtZW50IGNhbm5vdCBiZSBuZWdhdGl2ZSB3aGVuIDNyZCBhcmd1bWVudCBzcA==
      exit_code: 1
      external_id: "1"
    validator: bandvaloper1jengg99ssg9xq9dycemt782syyr4wwdn4d68s7
  - in_before_resolve: true
    raw_reports:
    - data: NDBjYWZlMTVjYTM1NDU2NzE2Mzg1ZGE2ZTFiNTBkOWJmZjAxOWI1ODAyNjY3YjdjNDA4OGYxOGY2YjU5NzNkYmI5NjI2MWQxODQ1ZWYzNDdhN2E2N2RmMjRkOWFlYmViOTVmMTA5OGVmZWFhODdiMjI2ZGQwZDA0NTNlZTRkMTFmMjVkY2Q1NGE5OGIyZmJmMzZjNmQ3M2Q3YTZkNGUwZDM2YWE2Y2VjYjhjYzZkODM1MDNhYjEyYTU5MTQ3ZTRlYTczMWE3NmRkNjc3MDdlNTJjMDc3N2UzOTVlN2Q5NjNlMWE3M2VlMTcyOGE5MjIzOTYzMGI1ZjMxNTljZTViODNlYmM0OTg5M2NmYWZlMTg3MTk2ZDA1NGE1MTY5YWQwCg==
      exit_code: 0
      external_id: "1"
    validator: bandvaloper1692fc7nawrrqfzxhlhd2yw875ksyutuj79fzfm
  - in_before_resolve: true
    raw_reports:
    - data: NDBjYWZlMTVjYTM1NDU2NzE2Mzg1ZGE2ZTFiNTBkOWJmZjAxOWI1ODAyNjY3YjdjNDA4OGYxOGY2YjU5NzNkYmI5NjI2MWQxODQ1ZWYzNDdhN2E2N2RmMjRkOWFlYmViOTVmMTA5OGVmZWFhODdiMjI2ZGQwZDA0NTNlZTRkMTFmMjVkY2Q1NGE5OGIyZmJmMzZjNmQ3M2Q3YTZkNGUwZDM2YWE2Y2VjYjhjYzZkODM1MDNhYjEyYTU5MTQ3ZTRlYTczMWE3NmRkNjc3MDdlNTJjMDc3N2UzOTVlN2Q5NjNlMWE3M2VlMTcyOGE5MjIzOTYzMGI1ZjMxNTljZTViODNlYmM0OTg5M2NmYWZlMTg3MTk2ZDA1NGE1MTY5YWQwCg==
      exit_code: 0
      external_id: "1"
    validator: bandvaloper1ajna89zrh4u2kuvc6qqyak7fn9dqphlhuvg0jk
  request:
    calldata: AAAAQGMxNzU0NDgwY2RmODExYWU5NTY4YWNkNzE0N2Q5Mzk1MzIwYzcwZTdiMDg0ZjA0NjdkMmEwMmQ1NjNmY2U2NzQAAAAAYUQLgA==
    client_id: eth_vrf:0x333b7adb3d56af9558fbfec3946c87c02f73fb23
    execute_gas: "1000000"
    ibc_channel: null
    min_count: "3"
    oracle_script_id: "57"
    raw_requests:
    - calldata: YzE3NTQ0ODBjZGY4MTFhZTk1NjhhY2Q3MTQ3ZDkzOTUzMjBjNzBlN2IwODRmMDQ2N2QyYTAyZDU2M2ZjZTY3NCAxNjMxODQ5MzQ0
      data_source_id: "82"
      external_id: "1"
    request_height: "226430"
    request_time: "1631849372"
    requested_validators:
    - bandvaloper1jengg99ssg9xq9dycemt782syyr4wwdn4d68s7
    - bandvaloper1692fc7nawrrqfzxhlhd2yw875ksyutuj79fzfm
    - bandvaloper1ajna89zrh4u2kuvc6qqyak7fn9dqphlhuvg0jk
    - bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl
  result:
    ans_count: "4"
    ask_count: "4"
    calldata: AAAAQGMxNzU0NDgwY2RmODExYWU5NTY4YWNkNzE0N2Q5Mzk1MzIwYzcwZTdiMDg0ZjA0NjdkMmEwMmQ1NjNmY2U2NzQAAAAAYUQLgA==
    client_id: eth_vrf:0x333b7adb3d56af9558fbfec3946c87c02f73fb23
    min_count: "3"
    oracle_script_id: "57"
    request_id: "238078"
    request_time: "1631849372"
    resolve_status: RESOLVE_STATUS_SUCCESS
    resolve_time: "1631849376"
    result: AAAAQDaqbOy4zG2DUDqxKlkUfk6nMadt1ncH5SwHd+OV59lj4ac+4XKKkiOWMLXzFZzluD68SYk8+v4YcZbQVKUWmtA=
```

## Get Data Content by Hash

**Path**: `/oracle/data/{hash}`
**Method**: `GET`

```bash
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/data/9DA49162844AE007FDE036FB13174D971839074AD00B53F2265A4B1E8517CF33
{"error":"rpc error: code = Unknown desc = internal"}
```

## Get Active Status of a Validator

**CLI**: `bandd query oracle validator [validator-address]`

**Path**: `/oracle/validators/{validator-address}`
**Method**: `GET`

```bash
$ bandd query oracle validator bandvaloper10ym9z7ujycr8e9veuccvy0q9qaxpfq47tnterl
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/validators/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
{
  "height":"298298",
  "result":{
    "status": 200,
    "result": {
      "since": "0001-01-01T00:00:00Z"
    }
  }
}
```

## Get Reporters by Validator Address

**CLI**: `bandd query oracle reporters [validator-address]` ??? can't query reporters

**Path**: `/oracle/reporters/{validator-address}`
**Method**: `GET`

```bash
$ bandd query oracle reporters bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/reporters/bandvaloper1p40yh3zkmhcv0ecqp3mcazy83sa57rgjde6wec
{
  "height":"298314",
  "result":{
    "status": "400",
    "result": {}
  }
}
```

## Get Active Validators

**CLI**: `bandd query oracle active-validators`

**Path**: `/oracle/active_validators`
**Method**: `GET`

```bash
$ bandd query oracle active-validators
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/active_validators
{
  "height":"298332",
  "result":{
    "status": 200,
    "result": [
      {
        "address": "bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus",
        "power": "10114454548"
      },
      {
        "address": "bandvaloper1ajna89zrh4u2kuvc6qqyak7fn9dqphlhuvg0jk",
        "power": "10111000000"
      },
      {
        "address": "bandvaloper1274qgg28xkz6f3upx05ftr9zepgmtfgts392dy",
        "power": "10109100000"
      }
    ]
  }
}
```

## Get Pending Requests

**bandd**: `bandd query oracle pending-requests [validator-address]`

```bash
$ bandd query oracle pending-requests bandvaloper1kfj48adjsnrgu83lau6wc646q2uf65rf84tzus
request_ids: []
```

## Get Verify Requests

**bandd**: `bandd query oracle verify-request [chain-id] [validator-addr] [request-id] [data-source-external-id] [reporter-pubkey] [reporter-signature-hex]` ???

```bash
$ bandd query oracle verify-request [chain-id] [validator-addr] [request-id] [data-source-external-id] [reporter-pubkey] [reporter-signature-hex]
{
  TODO: add response data
}
```

## Get Latest Price on Standard Price Reference Database
TODO: code chain example is wrong
**bandd**: `bandd query oracle request-price [symbols-comma-separated] [ask-count] [min-count]` 

```bash
$ bandd query oracle request-price ETH,BAND,BTC 16 10
- multiplier: "1000000000"
  px: "3362314050000"
  request_id: "243318"
  resolve_time: "1632061400"
  symbol: ETH
- multiplier: "1000000000"
  px: "9198000000"
  request_id: "243335"
  resolve_time: "1632062226"
  symbol: BAND
- multiplier: "1000000000"
  px: "47530132400000"
  request_id: "243318"
  resolve_time: "1632061400"
  symbol: BTC
```

? not found on band chain
<!--
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
``` -->

## Get Single of BandChain Transaction Proof and EVM Proof

**Path**: `/oracle/proof/{request-id}`
**Method**: `GET`

```bash
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/proof/1 
{
  "height":"0",
  "result": {
    "proof": {
      "block_height":"298372",
      "oracle_data_proof": {
        "result":{ 
          "oracle_script_id":"37",
          "calldata":"AAAABQAAAANNSVIAAAADQU5DAAAABERPR0UAAAAETFVOQQAAAANCTkIAAAAAO5rKAA==",
          "ask_count":"16",
          "min_count":"16",
          "request_id":"1",
          "request_time":"1631030041",
          "resolve_time":"1631030454",
          "resolve_status":3
        },
      "version":"6333",
      ...
}
```

## Get Multiple BandChain Proofs and EVM Proofs

**Path**: `/oracle/multi_proof?id={request-id}&id={request-id}&...`
**Method**: `GET`

```bash
$ curl -X GET {url}/oracle/multi_proof?id=1&id=2
{
  TODO: add response data
}
```

## Get Requests Count Proof

**Path**: `/oracle/requests_count_proof`
**Method**: `GET`

```bash
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/requests_count_proof
{
  "height":"0",
  "result": {
    "proof": {
      "block_height":"298617",
      "count_proof": {
        "count":"244515",
        "version":"298610",
        "merkle_paths":[
          {"is_data_on_right":true,"subtree_height":1,"subtree_size":"2","subtree_version":"298616","sibling_hash":"DAAFD53285A9371610446924CADAA6B0A95C0A2090EFB3324321D22A5D06BF68"},{"is_data_on_right":true,"subtree_height":2,"subtree_size":"4","subtree_version":"298616","sibling_hash":"5250558858B4742FF9047699785A7A4C611B933E0F0A03620B019F4A53D78CC8"},{"is_data_on_right":false,"subtree_height":4,"subtree_size":"9","subtree_version":"298616","sibling_hash":"871A2510FFCF1AA9BF53CB03EC8261C92C7AAB765A444DE436AC661E2167E637"},{"is_data_on_right":false,"subtree_height":5,"subtree_size":"23","subtree_version":"298616","sibling_hash":"3BA599ADCAAF240FC3E6AB4BD54827E1032E2E6D79EE4FCE4B6234A7BBC7A1CB"},{"is_data_on_right":false,"subtree_height":6,"subtree_size":"33","subtree_version":"298616","sibling_hash":"AED301EFD19F83564795F01565B88B18CB716CB42A80216439809261D85F48A9"},{"is_data_on_right":false,"subtree_height":7,"subtree_size":"81","subtree_version":"298616","sibling_hash":"E40FF843B41E6D84D446CE8AE43394F5AC8154A3B1A48D71928307D910BE5343"},
  ...
```

## Get BandChain Oracle Governance Parameters

**CLI**: `bandd query oracle params`

**Path**: `/oracle/params`
**Method**: `GET`

```bash
$ bandd query oracle params
$ curl -X GET https://laozi-testnet4.bandchain.org/api/oracle/params
{
  "height":"298668",
  "result": {
    "status": 200,
    "result": {
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
}
```

## Get BandChain Oracle Counts

**CLI**: `bandd query oracle counts`

**Path**: `/oracle/counts`
**Method**: `GET`

```bash
$ bandd query oracle counts
$ curl -X GET https://api-gm-lb.bandchain.org/oracle/counts
{
  "height":"298689",
  "result":{
    "data_source_count": "98",
    "oracle_script_count": "61",
    "request_count": "244530"
  }
}
```
