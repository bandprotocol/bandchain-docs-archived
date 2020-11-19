# Client Module

For getting the request information on BandChain, ...

## Exceptions

<aside class="notice">
<a href="https://requests.readthedocs.io/en/master/_modules/requests/exceptions/" target="_blank" >Request Exceptions</a>
</aside>

| Type            | Description                          |
| --------------- | ------------------------------------ |
| BadRequest      | Invalid parameter (400)              |
| NotFound        | Entity not found (404)               |
| InternalError   | Something went wrong on server (5xx) |
| ConnectionError | DNS failure, refused connection      |
| Timeout         | Request timeout                      |

## get chain id

The function helps you to get the chain id

**Result type**

string

> Example

:::: tabs
::: tab Python

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

c = Client(RPC_URL)
print(c.get_chain_id())

# "band-guanyu-poa"
```

:::

::: tab JS

```js
// JS
```

:::

::::

## get latest block

The function helps you to get the latest block

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

c = Client(RPC_URL)
print(c.get_latest_block())
```

**Result**

```json
{
  "block_id": {
    "hash": "E4A1F978F3F06B4D4C7E0271A929608C2B949CCD48C1D91E20F451E81C50C769",
    "parts": {
      "total": "1",
      "hash": "16F87F1B122DE084E614612DC9C9BE0A98A942E23EA8EC6B079CEF24E475A114"
    }
  },
  "block": {
    "header": {
      "version": {
        "block": "10",
        "app": "0"
      },
      "chain_id": "band-guanyu-poa",
      "height": "2218279",
      "time": "2020-10-21T10:45:28.17483119Z",
      "last_block_id": {
        "hash": "454F876B859853D9050A9DBD2BC7CF6818C5BC401EA47E0CAD972F0242B75EDC",
        "parts": {
          "total": "1",
          "hash": "7478C179D6D06F04F74AF02EF2ACFD33584EA5A04E183147F380BA3629BCCBB3"
        }
      },
      "last_commit_hash": "17B8F466B076758E796D5F5E86BEC5FF2C71A9871119DE4FD420FDF147090799",
      "data_hash": "F417771DF3228D1F65B1DB33EADE6018416FE7A9CA87983F4A4F296EED24A22B",
      "validators_hash": "4A3CF0246E707DA164809AADCEBCC49B6F238E98FFC7C829004FCADD48B8A63E",
      "next_validators_hash": "4A3CF0246E707DA164809AADCEBCC49B6F238E98FFC7C829004FCADD48B8A63E",
      "consensus_hash": "0EAA6F4F4B8BD1CC222D93BBD391D07F074DE6BE5A52C6964875BB355B7D0B45",
      "app_hash": "79C3621A605E8D5699E9A7B33475DBDEA1A72B4D4ECE5F26CD450A5B2DA434F4",
      "last_results_hash": "",
      "evidence_hash": "",
      "proposer_address": "A9967F4A8450FEC68437F04B83FE4097BA85F1E8"
    },
    "data": {
      "txs": [
        "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"
      ]
    },
    "evidence": {
      "evidence": "None"
    },
    "last_commit": {
      "height": "2218278",
      "round": "0",
      "block_id": {
        "hash": "454F876B859853D9050A9DBD2BC7CF6818C5BC401EA47E0CAD972F0242B75EDC",
        "parts": {
          "total": "1",
          "hash": "7478C179D6D06F04F74AF02EF2ACFD33584EA5A04E183147F380BA3629BCCBB3"
        }
      },
      "signatures": [
        {
          "block_id_flag": 2,
          "validator_address": "3F40FBFB610AB6AB95F718609801759D4842ACE1",
          "timestamp": "2020-10-21T10:45:28.10106102Z",
          "signature": "iFaoH9nD5J7mkEaLQfPwc1Ati1ShNI8hXcefB8xI1yE8wbm5eoThcHHWduBpD7StGwSnd0UI/Ly2kJRfbYw/UQ=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "57F884A0615A6797EBE3012660328603D3AEC43E",
          "timestamp": "2020-10-21T10:45:28.25298815Z",
          "signature": "9yhu7dhrqzVs5LmTrEL8pW3bAcYR1frA65YGJqQvgP9FdxqFTCQu+45EJclrsl0m8e9gXQa0PctLcOPN34TFsw=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "A5388FC9C354B02852EE77A87BA0B63155F807EC",
          "timestamp": "2020-10-21T10:45:28.175269011Z",
          "signature": "9JSQkyBL0ykEA/eaBB3tCyYN5P5nKGcBG6xHpS5tm3hiSdhJkLMr4bzL3xhJQixKG312+EJW2e+BPO4sPaYxZg=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "A9967F4A8450FEC68437F04B83FE4097BA85F1E8",
          "timestamp": "2020-10-21T10:45:28.174942084Z",
          "signature": "2JO+qfwQMJtkHCB5o+AUYBRwF4wMoYPImNZweq/h9nNQgYxb+kZzZYyoUqmR6GpWdI/gQ85ntokkntHbogfx6g=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "C96AE655326C9B77AB59F61BD0876DF20BFC0CE9",
          "timestamp": "2020-10-21T10:45:28.17483119Z",
          "signature": "o61JkMg1egQpQ4TWxCsYmg761oP7tqO/Xgo/kudC6VkywHkmBbi4WIkcuvkfp/SoSAJqsX5ETHK60Iawplsifg=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "F420E989F161A5E6EF54D6413DB7E32D0DB0848B",
          "timestamp": "2020-10-21T10:45:28.099162816Z",
          "signature": "jsmN1D7Fodu+foQ/KS12w5ge4QwKaxQ/ytk964A22PxJOp5dAIwKZVLYAAxOiVCMyi3jYTgkOifbw9LGg0WM6w=="
        },
        {
          "block_id_flag": 2,
          "validator_address": "F8FB432981EAD678CD546BB6BC171E9DBC8C2A33",
          "timestamp": "2020-10-21T10:45:28.097428789Z",
          "signature": "NObCZ/LI/klECTgP+42QmuqQgg+f4q5W/cY5bjYtN84deeZefyeFdiw2aDxjVgkf1WZlatCIMxcfB98jJ4tTmQ=="
        }
      ]
    }
  }
}
```

## get account

The function helps you to get the account details

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| address   | string | the account address |

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

address = 'band1xxj9mfe2ga45vtye8wss6jp4fsezyysqe3fstu' ## Test Address

c = Client(RPC_URL)
print(c.get_account(address))
```

**Result**

```python
Account(
  address = "band1xxj9mfe2ga45vtye8wss6jp4fsezyysqe3fstu",
  coins = [{ "denom": "uband", "amount": "1" }],
  public_key = {
    "type": "tendermint/PubKeySecp256k1",
    "value": "Aw+h+/9kI+xHKrC1HQ3CDYlIiNfDoojTOXJU4QhwxSuR"
  },
  account_number = 42,
  sequence = 85054
)
```

## get data source

The function helps you to get the data source details by id

| Parameter | Type   | Description    |
| --------- | ------ | -------------- |
| ID        | string | data source id |

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

ID = 1

c = Client(RPC_URL)
print(c.get_data_source(ID))
```

**Result**

```python
DataSource(
  owner = "band17f6n25na5kume99j4qdfzlf7jnpu9u2neqqvt8",
  name = "CryptoCompare",
  description = "TBD",
  filename = "ea0b34b2476e9ee5ce8c54e32fd5813987e964e85f06d5558d862d9845212be4"
)
```

## get oracle script

The function helps you to get the oracle script details by id

| Parameter | Type   | Description      |
| --------- | ------ | ---------------- |
| ID        | string | oracle script id |

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

ID = 1

c = Client(RPC_URL)
print(c.get_oracle_script(ID))
```

**Result**

```python
OracleScript(
  owner = "band17f6n25na5kume99j4qdfzlf7jnpu9u2neqqvt8",
  name = "DEX_01",
  description = "TBD",
  filename = "b89d83796a6472a25a6d0ac344f36511eab259671561bdbe4324996b87de35da",
  schema = "{base_symbol:string,quote_symbol:string,multiplier:u64}/{px:u64}",
  source_code_url = "https://ipfs.io/ipfs/QmQwGmgL3iqzekZRJrk2wWVDUvBqtVopr7PTqEFnoxspfS"
)
```

## get request by id

The function helps you to get the request details by id

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| ID        | string | request id  |

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

ID = 1

c = Client(RPC_URL)
print(c.get_request_by_id(ID))
```

**Result**

```python
RequestInfo(request = Request(oracle_script_id = 1, requested_validators = ['bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', 'bandvaloper1ywd2m858gu4eya3nzx6f9vme3sn82dr4thjnme', 'bandvaloper1yplk6n4wmeaarxp966gukpxupg3jqfcqkh32mw', 'bandvaloper1xnryftxluq49fk52c5j5zrxcc5rzye96s70msl', 'bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', 'bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', 'bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre'], min_count = 7, request_height = 32644, raw_requests = [RawRequest(data_source_id = 1, external_id = 1, calldata = b 'LRC USD'), RawRequest(data_source_id = 2, external_id = 2, calldata = b 'LRC USD')], client_id = '', calldata = b '\x00\x00\x00\x03LRC\x00\x00\x00\x03USD\x00\x00\x00\x00\x00\x0fB@'), reports = [Report(validator = 'bandvaloper1yplk6n4wmeaarxp966gukpxupg3jqfcqkh32mw', raw_reports = [RawReport(external_id = 1, data = b '0.1283\n'), RawReport(external_id = 2, data = b '0.128376\n')], in_before_resolve = True), Report(validator = 'bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', raw_reports = [RawReport(external_id = 2, data = b ''), RawReport(external_id = 1, data = b '')], in_before_resolve = True), Report(validator = 'bandvaloper1ywd2m858gu4eya3nzx6f9vme3sn82dr4thjnme', raw_reports = [RawReport(external_id = 1, data = b '0.1283\n'), RawReport(external_id = 2, data = b '0.128376\n')], in_before_resolve = True), Report(validator = 'bandvaloper1xnryftxluq49fk52c5j5zrxcc5rzye96s70msl', raw_reports = [RawReport(external_id = 2, data = b ''), RawReport(external_id = 1, data = b '')], in_before_resolve = True), Report(validator = 'bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre', raw_reports = [RawReport(external_id = 1, data = b ''), RawReport(external_id = 2, data = b '')], in_before_resolve = True), Report(validator = 'bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', raw_reports = [RawReport(external_id = 1, data = b '0.1283\n'), RawReport(external_id = 2, data = b '0.128376\n')], in_before_resolve = True), Report(validator = 'bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', raw_reports = [RawReport(external_id = 2, data = b ''), RawReport(external_id = 1, data = b '')], in_before_resolve = True)], result = Result(request_packet_data = RequestPacketData(oracle_script_id = 1, ask_count = 7, min_count = 7, client_id = '', calldata = b '\x00\x00\x00\x03LRC\x00\x00\x00\x03USD\x00\x00\x00\x00\x00\x0fB@'), response_packet_data = ResponsePacketData(request_id = 1, request_time = 1596632713, resolve_time = 1596632719, resolve_status = 1, ans_count = 7, client_id = '', result = b '\x00\x00\x00\x00\x00\x01\xf5R')))
```

## get reporters

The function helps you to get the reporters of validator

| Parameter         | Type   | Description       |
| ----------------- | ------ | ----------------- |
| validator_address | string | validator address |

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

validator_address = "bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre"

c = Client(RPC_URL)
print(c.get_reporters(validator_address))
```

**Result**

```json
[
  "band1trx2cm6vm9v63grg9uhmk7sy233zve4qxz8txj",
  "band1fcdpfuyusr37r7gthjrmk5amnqlfmzygmzdpwj",
  "band1fl4t2g3vvrcyuezzj70e9cxymw5vvdd28ly3wm",
  "band1t2tcc53d769y06p4nju09dm4uudqg8fdhgqaum",
  "band1vvn86g3zs4ffmdf3jdp5k87577mkly4yk24p0s",
  "band1c8sgs7j5rmjjtnv284senhcw9d0g7m5qxlf9js"
]
```

## get latest request

The function helps you to get the latest request

### Parameter

| Parameter        | Type  | Description                                                                                  |
| ---------------- | ----- | -------------------------------------------------------------------------------------------- |
| oracle_script_id | int   | id of oracle script                                                                          |
| calldata         | bytes | The input parameters associated with the request                                             |
| min_count        | int   | The minimum number of validators necessary for the request to proceed to the execution phase |
| ask_count        | int   | The number of validators that are requested to respond to this request                       |

> Example

```python

from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

oracle_script_id = 20
calldata = bytes.fromhex(
    "0000000b000000044141504c00000005474f4f474c0000000454534c41000000044e464c5800000003515151000000045457545200000004424142410000000349415500000003534c560000000355534f0000000456495859000000003b9aca00")
min_count = 3
ask_count = 4

print(c.get_latest_request(
    oracle_script_id, calldata, min_count, ask_count
))
```

**Result**

```python
RequestInfo(request=Request(oracle_script_id=20, requested_validators=['bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', 'bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', 'bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', 'bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre'], min_count=3, request_height=2223193, raw_requests=[RawRequest(data_source_id=30, external_id=0, calldata=b'AAPL GOOGL TSLA NFLX QQQ TWTR BABA IAU SLV USO VIXY')], client_id='bandteam', calldata=b'\x00\x00\x00\x0b\x00\x00\x00\x04AAPL\x00\x00\x00\x05GOOGL\x00\x00\x00\x04TSLA\x00\x00\x00\x04NFLX\x00\x00\x00\x03QQQ\x00\x00\x00\x04TWTR\x00\x00\x00\x04BABA\x00\x00\x00\x03IAU\x00\x00\x00\x03SLV\x00\x00\x00\x03USO\x00\x00\x00\x04VIXY\x00\x00\x00\x00;\x9a\xca\x00'), reports=[Report(validator='bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True)], result=Result(request_packet_data=RequestPacketData(oracle_script_id=20, ask_count=4, min_count=3, client_id='bandteam', calldata=b'\x00\x00\x00\x0b\x00\x00\x00\x04AAPL\x00\x00\x00\x05GOOGL\x00\x00\x00\x04TSLA\x00\x00\x00\x04NFLX\x00\x00\x00\x03QQQ\x00\x00\x00\x04TWTR\x00\x00\x00\x04BABA\x00\x00\x00\x03IAU\x00\x00\x00\x03SLV\x00\x00\x00\x03USO\x00\x00\x00\x04VIXY\x00\x00\x00\x00;\x9a\xca\x00'), response_packet_data=ResponsePacketData(request_id=735162, request_time=1603292111, resolve_time=1603292114, resolve_status=1, ans_count=4, client_id='bandteam', result=b'\x00\x00\x00\x0b\x00\x00\x00\x1b\x89p\xfb\x80\x00\x00\x01s\xc3U\x15\x80\x00\x00\x00c\x99\xac\xc9\x00\x00\x00\x00r\x89P\x1a\x80\x00\x00\x00B\x84\xbf\xbd\xc0\x00\x00\x00\x0b{g.\xc0\x00\x00\x00H[U\xe0\x80\x00\x00\x00\x04H\xb9\xb8\x00\x00\x00\x00\x05s\xa4\x8b\xc0\x00\x00\x00\x06\x98\x99~\x80\x00\x00\x00\x04d$\xc3\x00')))
```
