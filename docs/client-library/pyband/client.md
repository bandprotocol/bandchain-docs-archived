# Client Module

For getting the request information on BandChain, ...

## Exceptions

[Request Exceptions](https://requests.readthedocs.io/en/master/_modules/requests/exceptions/)

| Type            | Description                          |
| --------------- | ------------------------------------ |
| BadRequest      | Invalid parameter (400)              |
| NotFound        | Entity not found (404)               |
| InternalError   | Something went wrong on server (5xx) |
| ConnectionError | DNS failure, refused connection      |
| Timeout         | Request timeout                      |

<!-- prettier-ignore-start -->
## get\_chain\_id
<!-- prettier-ignore-end -->

The function helps you to get the chain id

#### Return

string

#### Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

c = Client(RPC_URL)
print(c.get_chain_id())
```

#### Result

```python
band-guanyu-poa
```

---

<!-- prettier-ignore-start -->
## get\_latest\_block
<!-- prettier-ignore-end -->

The function helps you to get the latest block

#### Return

[`<Block>`]

#### Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

c = Client(RPC_URL)
print(c.get_latest_block())
```

#### Result

```python
Block(block=BlockHeader(header=BlockHeaderInfo(chain_id='band-guanyu-poa', height=3046843, time=1605798447, last_commit_hash=b'\x86\xe1\x97\xd1E\x9aB8Y\xb1U\x12V\x84\x13\x8fDBYmP\x15\x83\xe1\xd9\x85$\xb6\xccP\x7f8', data_hash=b'\x87t\x1d<N\xf2Rx9G\x11h\x17\x1e?#<\xadu\x9f\xf4 \x10V\xec\xb0\\\x92\xcf\x18\xefX', validators_hash=b'J<\xf0$np}\xa1d\x80\x9a\xad\xce\xbc\xc4\x9bo#\x8e\x98\xff\xc7\xc8)\x00O\xca\xddH\xb8\xa6>', next_validators_hash=b'J<\xf0$np}\xa1d\x80\x9a\xad\xce\xbc\xc4\x9bo#\x8e\x98\xff\xc7\xc8)\x00O\xca\xddH\xb8\xa6>', consensus_hash=b'\x0e\xaaoOK\x8b\xd1\xcc"-\x93\xbb\xd3\x91\xd0\x7f\x07M\xe6\xbeZR\xc6\x96Hu\xbb5[}\x0bE', app_hash=b'\xed^#\\\x93C\xf0\xdb\xfa\x7f\x1b\xb5\xb4y\x0f^\xa3\xf0U\x1cQ+\xfe\x95\x82\x95oW\x00\xdb\x9ea', last_results_hash=b'n4\x0b\x9c\xff\xb3z\x98\x9c\xa5D\xe6\xbbx\n,x\x90\x1d?\xb378v\x85\x11\xa3\x06\x17\xaf\xa0\x1d', evidence_hash=b'', proposer_address=b'\xc9j\xe6U2l\x9bw\xabY\xf6\x1b\xd0\x87m\xf2\x0b\xfc\x0c\xe9')), block_id=BlockID(hash=b'\x99\xf1\xd1\xdb\x9e\x8d\xa4<M\xa6$N\xc1\x9f$5\x1c\xc2\x1dH\x99{4\x93"\x0e\x0f\x15K`b\x11'))
```

---

<!-- prettier-ignore-start -->
## get\_account(address)
<!-- prettier-ignore-end -->

The function helps you to get the account details

#### Parameter

- address [`<Address>`]

#### Return

[`<Account>`]

#### Example

```python
from pyband import Client
from pyband.wallet import Address

RPC_URL = "http://poa-api.bandchain.org"

address = Address.from_acc_bech32('band1xxj9mfe2ga45vtye8wss6jp4fsezyysqe3fstu')

c = Client(RPC_URL)
print(c.get_account(address))
```

#### Result

```python
Account(address=<pyband.wallet.Address object at 0x10a162a60>, coins=[{'denom': 'uband', 'amount': '1'}], public_key={'type': 'tendermint/PubKeySecp256k1', 'value': 'Aw+h+/9kI+xHKrC1HQ3CDYlIiNfDoojTOXJU4QhwxSuR'}, account_number=42, sequence=144449)
```

---

<!-- prettier-ignore-start -->
## get\_data\_source(id)
<!-- prettier-ignore-end -->

The function helps you to get the data source details by id

#### Parameter

- id `<int>` Data source ID

#### Return

[`<DataSource>`]

> Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

id = 1

c = Client(RPC_URL)
print(c.get_data_source(id))
```

**Result**

```python
DataSource(owner=<pyband.wallet.Address object at 0x10730c940>, name='CryptoCompare', description='TBD', filename='ea0b34b2476e9ee5ce8c54e32fd5813987e964e85f06d5558d862d9845212be4')
```

---

<!-- prettier-ignore-start -->
## get\_oracle\_script(id)
<!-- prettier-ignore-end -->

The function helps you to get the oracle script details by id

#### Parameter

- id `<int>` Oracle Script ID

#### Return

[`<OracleScript>`]

#### Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

id = 1

c = Client(RPC_URL)
print(c.get_oracle_script(id))
```

#### Result

```python
OracleScript(owner=<pyband.wallet.Address object at 0x10cdf6940>, name='DEX_01', description='TBD', filename='b89d83796a6472a25a6d0ac344f36511eab259671561bdbe4324996b87de35da', schema='{base_symbol:string,quote_symbol:string,multiplier:u64}/{px:u64}', source_code_url='https://ipfs.io/ipfs/QmQwGmgL3iqzekZRJrk2wWVDUvBqtVopr7PTqEFnoxspfS')
```

---

<!-- prettier-ignore-start -->
## get\_request\_by\_id(id)
<!-- prettier-ignore-end -->

The function helps you to get the request details by id

#### Parameter

- id `<int>` Request ID

#### Return

[`<RequestInfo>`]

#### Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

id = 1

c = Client(RPC_URL)
print(c.get_request_by_id(id))
```

#### Result

```python
RequestInfo(request=Request(oracle_script_id=1, requested_validators=['bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', 'bandvaloper1ywd2m858gu4eya3nzx6f9vme3sn82dr4thjnme', 'bandvaloper1yplk6n4wmeaarxp966gukpxupg3jqfcqkh32mw', 'bandvaloper1xnryftxluq49fk52c5j5zrxcc5rzye96s70msl', 'bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', 'bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', 'bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre'], min_count=7, request_height=32644, raw_requests=[RawRequest(data_source_id=1, external_id=1, calldata=b'LRC USD'), RawRequest(data_source_id=2, external_id=2, calldata=b'LRC USD')], client_id='', calldata=b'\x00\x00\x00\x03LRC\x00\x00\x00\x03USD\x00\x00\x00\x00\x00\x0fB@'), reports=[Report(validator='bandvaloper1yplk6n4wmeaarxp966gukpxupg3jqfcqkh32mw', raw_reports=[RawReport(external_id=1, data=b'0.1283\n'), RawReport(external_id=2, data=b'0.128376\n')], in_before_resolve=True), Report(validator='bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', raw_reports=[RawReport(external_id=2, data=b''), RawReport(external_id=1, data=b'')], in_before_resolve=True), Report(validator='bandvaloper1ywd2m858gu4eya3nzx6f9vme3sn82dr4thjnme', raw_reports=[RawReport(external_id=1, data=b'0.1283\n'), RawReport(external_id=2, data=b'0.128376\n')], in_before_resolve=True), Report(validator='bandvaloper1xnryftxluq49fk52c5j5zrxcc5rzye96s70msl', raw_reports=[RawReport(external_id=2, data=b''), RawReport(external_id=1, data=b'')], in_before_resolve=True), Report(validator='bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre', raw_reports=[RawReport(external_id=1, data=b''), RawReport(external_id=2, data=b'')], in_before_resolve=True), Report(validator='bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', raw_reports=[RawReport(external_id=1, data=b'0.1283\n'), RawReport(external_id=2, data=b'0.128376\n')], in_before_resolve=True), Report(validator='bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', raw_reports=[RawReport(external_id=2, data=b''), RawReport(external_id=1, data=b'')], in_before_resolve=True)], result=Result(request_packet_data=RequestPacketData(oracle_script_id=1, ask_count=7, min_count=7, client_id='', calldata=b'\x00\x00\x00\x03LRC\x00\x00\x00\x03USD\x00\x00\x00\x00\x00\x0fB@'), response_packet_data=ResponsePacketData(request_id=1, request_time=1596632713, resolve_time=1596632719, resolve_status=1, ans_count=7, client_id='', result=b'\x00\x00\x00\x00\x00\x01\xf5R')))
```

---

<!-- prettier-ignore-start -->
## get\_reporters
<!-- prettier-ignore-end -->

The function helps you to get the reporters of validator

#### Parameter

- validator [`<Address>`]

#### Return

`List<string>`

#### Example

```python
from pyband import Client
from pyband.wallet import Address

RPC_URL = "http://poa-api.bandchain.org"

validator = Address.from_val_bech32("bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre")

c = Client(RPC_URL)
print(c.get_reporters(validator))
```

#### Result

```python
[<pyband.wallet.Address object at 0x1056c0a00>, <pyband.wallet.Address object at 0x1056c0c10>, <pyband.wallet.Address object at 0x1045c8040>, <pyband.wallet.Address object at 0x1045a6cd0>, <pyband.wallet.Address object at 0x1045a6b20>, <pyband.wallet.Address object at 0x1045a6f40>]
```

---

<!-- prettier-ignore-start -->
## get\_latest\_request(oid, calldata, min\_count, ask\_count)
<!-- prettier-ignore-end -->

The function helps you to get the latest request

#### Parameter

- oid `<int>` oracle script ID
- calldata `<bytes>` The input parameters associated with the request
- min_count `<int>` The minimum number of validators necessary for the request to proceed to the execution phase
- ask_count `<int>` The number of validators that are requested to respond to this request

#### Return

[`<RequestInfo>`]

#### Example

```python

from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

c = Client(RPC_URL)

oid = 20
calldata = bytes.fromhex(
    "0000000b000000044141504c00000005474f4f474c0000000454534c41000000044e464c5800000003515151000000045457545200000004424142410000000349415500000003534c560000000355534f0000000456495859000000003b9aca00"
)
min_count = 3
ask_count = 4

print(c.get_latest_request(oid, calldata, min_count, ask_count))
```

#### Result

```python
RequestInfo(request=Request(oracle_script_id=20, requested_validators=['bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', 'bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', 'bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', 'bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre'], min_count=3, request_height=2223193, raw_requests=[RawRequest(data_source_id=30, external_id=0, calldata=b'AAPL GOOGL TSLA NFLX QQQ TWTR BABA IAU SLV USO VIXY')], client_id='bandteam', calldata=b'\x00\x00\x00\x0b\x00\x00\x00\x04AAPL\x00\x00\x00\x05GOOGL\x00\x00\x00\x04TSLA\x00\x00\x00\x04NFLX\x00\x00\x00\x03QQQ\x00\x00\x00\x04TWTR\x00\x00\x00\x04BABA\x00\x00\x00\x03IAU\x00\x00\x00\x03SLV\x00\x00\x00\x03USO\x00\x00\x00\x04VIXY\x00\x00\x00\x00;\x9a\xca\x00'), reports=[Report(validator='bandvaloper1yyv5jkqaukq0ajqn7vhkyhpff7h6e99j3gv0tr', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1trx2cm6vm9v63grg9uhmk7sy233zve4q25rgre', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1v38hewjc0865dm4t89v5efh9rmum5rmrm7evg4', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True), Report(validator='bandvaloper1alzj765pzuhtjkmslme4fdpeakc0036xnyjltn', raw_reports=[RawReport(external_id=0, data=b'118.27,1596.71,427.78,491.93,285.695,49.315,310.77,18.4,23.415,28.33,18.86\n')], in_before_resolve=True)], result=Result(request_packet_data=RequestPacketData(oracle_script_id=20, ask_count=4, min_count=3, client_id='bandteam', calldata=b'\x00\x00\x00\x0b\x00\x00\x00\x04AAPL\x00\x00\x00\x05GOOGL\x00\x00\x00\x04TSLA\x00\x00\x00\x04NFLX\x00\x00\x00\x03QQQ\x00\x00\x00\x04TWTR\x00\x00\x00\x04BABA\x00\x00\x00\x03IAU\x00\x00\x00\x03SLV\x00\x00\x00\x03USO\x00\x00\x00\x04VIXY\x00\x00\x00\x00;\x9a\xca\x00'), response_packet_data=ResponsePacketData(request_id=735162, request_time=1603292111, resolve_time=1603292114, resolve_status=1, ans_count=4, client_id='bandteam', result=b'\x00\x00\x00\x0b\x00\x00\x00\x1b\x89p\xfb\x80\x00\x00\x01s\xc3U\x15\x80\x00\x00\x00c\x99\xac\xc9\x00\x00\x00\x00r\x89P\x1a\x80\x00\x00\x00B\x84\xbf\xbd\xc0\x00\x00\x00\x0b{g.\xc0\x00\x00\x00H[U\xe0\x80\x00\x00\x00\x04H\xb9\xb8\x00\x00\x00\x00\x05s\xa4\x8b\xc0\x00\x00\x00\x06\x98\x99~\x80\x00\x00\x00\x04d$\xc3\x00')))
```

---

<!-- prettier-ignore-start -->
## send\_tx\_block\_mode(data)
<!-- prettier-ignore-end -->

The function helps you to send transaction block mode.

#### Parameter

- data `<dict>` The signed transaction

#### Return

[`<TransactionBlockMode>`]

#### Example

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


RPC_URL = "https://guanyu-testnet3-query.bandchain.org"

client = Client(RPC_URL)

priv = PrivateKey.from_mnemonic("s")
pubkey = priv.to_pubkey()
address = pubkey.to_address()
account = client.get_account(address)

t = (
    Transaction()
    .with_messages(
        MsgRequest(
            oracle_script_id=4,
            calldata=bytes.fromhex("0000000300000003425443000000034554480000000442414e44000000003b9aca00"),
            ask_count=16,
            min_count=10,
            client_id="from_pyband",
            sender=address,
        ),
    )
    .with_account_num(account.account_number)
    .with_sequence(account.sequence)
    .with_chain_id("band-guanyu-testnet3")
    .with_gas(1000000)
    .with_memo("TEST")
)

raw_data = t.get_sign_data()
signature = priv.sign(raw_data)
raw_tx = t.get_tx_data(signature, pubkey)

print(client.send_tx_block_mode(raw_tx))
```

#### Result

```python
TransactionBlockMode(height=1978239, tx_hash=b'v\xff{0\x89\x9c\x86\xf3\xb5&\xca\x8a\xf5.R[,\xdc\x13#O\xc0P&qYeo\x1cE@-', gas_wanted=1000000, gas_used=1000000, code=0, log=[{'msg_index': 0, 'log': '', 'events': [{'type': 'message', 'attributes': [{'key': 'action', 'value': 'request'}]}, {'type': 'raw_request', 'attributes': [{'key': 'data_source_id', 'value': '6'}, {'key': 'data_source_hash', 'value': '4292e26d7c98c76b08c3c87d2d18f135f2cbb0c2e4081cab52a7ebeb0740a705'}, {'key': 'external_id', 'value': '6'}, {'key': 'calldata', 'value': 'kraken BTC ETH'}, {'key': 'data_source_id', 'value': '4'}, {'key': 'data_source_hash', 'value': '93734983de34865551a03bd5b27c650f6f9496c8eeb25f3b1445ff89d32dbc7b'}, {'key': 'external_id', 'value': '0'}, {'key': 'calldata', 'value': 'BTC ETH BAND'}, {'key': 'data_source_id', 'value': '6'}, {'key': 'data_source_hash', 'value': '4292e26d7c98c76b08c3c87d2d18f135f2cbb0c2e4081cab52a7ebeb0740a705'}, {'key': 'external_id', 'value': '3'}, {'key': 'calldata', 'value': 'binance BTC ETH BAND'}, {'key': 'data_source_id', 'value': '7'}, {'key': 'data_source_hash', 'value': '07be7bd61667327aae10b7a13a542c7dfba31b8f4c52b0b60bf9c7b11b1a72ef'}, {'key': 'external_id', 'value': '5'}, {'key': 'calldata', 'value': 'BTC ETH'}, {'key': 'data_source_id', 'value': '8'}, {'key': 'data_source_hash', 'value': '4cc47bdc3fc1aa515025d41ddc04c5f5b41227f6d5ebe49746ffae6eedf9f69f'}, {'key': 'external_id', 'value': '2'}, {'key': 'calldata', 'value': 'BTC ETH BAND'}, {'key': 'data_source_id', 'value': '6'}, {'key': 'data_source_hash', 'value': '4292e26d7c98c76b08c3c87d2d18f135f2cbb0c2e4081cab52a7ebeb0740a705'}, {'key': 'external_id', 'value': '4'}, {'key': 'calldata', 'value': 'huobipro BTC ETH BAND'}, {'key': 'data_source_id', 'value': '6'}, {'key': 'data_source_hash', 'value': '4292e26d7c98c76b08c3c87d2d18f135f2cbb0c2e4081cab52a7ebeb0740a705'}, {'key': 'external_id', 'value': '7'}, {'key': 'calldata', 'value': 'bitfinex BTC ETH'}, {'key': 'data_source_id', 'value': '6'}, {'key': 'data_source_hash', 'value': '4292e26d7c98c76b08c3c87d2d18f135f2cbb0c2e4081cab52a7ebeb0740a705'}, {'key': 'external_id', 'value': '8'}, {'key': 'calldata', 'value': 'bittrex BTC ETH'}, {'key': 'data_source_id', 'value': '5'}, {'key': 'data_source_hash', 'value': '980a7da17f800b5006775a4e907bad29b52b9d9f1370bc7e8c10449dc95f020f'}, {'key': 'external_id', 'value': '1'}, {'key': 'calldata', 'value': 'BTC ETH BAND'}]}, {'type': 'request', 'attributes': [{'key': 'id', 'value': '374446'}, {'key': 'client_id', 'value': 'from_pyband'}, {'key': 'oracle_script_id', 'value': '4'}, {'key': 'calldata', 'value': '0000000300000003425443000000034554480000000442414e44000000003b9aca00'}, {'key': 'ask_count', 'value': '16'}, {'key': 'min_count', 'value': '10'}, {'key': 'gas_used', 'value': '124011'}, {'key': 'validator', 'value': 'bandvaloper1r9eslzfdj976hap6z06wlq7nwnn0w6x0y40zn3'}, {'key': 'validator', 'value': 'bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs'}, {'key': 'validator', 'value': 'bandvaloper1edkewac2dg6u7fdxjceeyyndnhudrxsvx6k75m'}, {'key': 'validator', 'value': 'bandvaloper1egcncstqyhm7njd5mva03lkrdtemmzehda940c'}, {'key': 'validator', 'value': 'bandvaloper1u3c40nglllu4upuddlz6l59afq7uuz7lq6z977'}, {'key': 'validator', 'value': 'bandvaloper19sd4dgvyujc5mhkz8ypg058cx6klxx9pae92ew'}, {'key': 'validator', 'value': 'bandvaloper1n50c9uhawz6s0u5wqfa57qvy2x6kyg933vgkuw'}, {'key': 'validator', 'value': 'bandvaloper1vqvrrcwqudqqzurxqscdwg8qclad6m959l7mxj'}, {'key': 'validator', 'value': 'bandvaloper1h54f3tpfrl2gszkpqxmqaurkfkffd2qdrxw8hl'}, {'key': 'validator', 'value': 'bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av'}, {'key': 'validator', 'value': 'bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc'}, {'key': 'validator', 'value': 'bandvaloper1muydxugudsd64w4ng3vylm4gct5qvakjnfgm7x'}, {'key': 'validator', 'value': 'bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn'}, {'key': 'validator', 'value': 'bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm'}, {'key': 'validator', 'value': 'bandvaloper1s9s0knlc8mk62addjk98qcpqlcgvdfewt4muet'}, {'key': 'validator', 'value': 'bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn'}]}]}], error_log=None)
```

---

<!-- prettier-ignore-start -->
## send\_tx\_sync\_mode(data)
<!-- prettier-ignore-end -->

The function helps you to send transaction sync mode.

#### Parameter

- data `<dict>` The signed transaction

#### Return

[`<TransactionSyncMode>`]

#### Example

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


RPC_URL = "https://guanyu-testnet3-query.bandchain.org"

client = Client(RPC_URL)

priv = PrivateKey.from_mnemonic("s")
pubkey = priv.to_pubkey()
address = pubkey.to_address()
account = client.get_account(address)

t = (
    Transaction()
    .with_messages(
        MsgRequest(
            oracle_script_id=4,
            calldata=bytes.fromhex("0000000300000003425443000000034554480000000442414e44000000003b9aca00"),
            ask_count=16,
            min_count=10,
            client_id="from_pyband",
            sender=address,
        ),
    )
    .with_account_num(account.account_number)
    .with_sequence(account.sequence)
    .with_chain_id("band-guanyu-testnet3")
    .with_gas(1000000)
    .with_memo("TEST")
)

raw_data = t.get_sign_data()
signature = priv.sign(raw_data)
raw_tx = t.get_tx_data(signature, pubkey)

print(client.send_tx_sync_mode(raw_tx))
```

#### Result

```python
TransactionSyncMode(tx_hash=b'\xd6\xe7G\xb9,\x0cy4\xa9\xd7 \xf9G:F\xfb \x98\xf9@C/\xc3f\xe2+\x18\x92\xcb\xf0\xdf\xe5', code=0, error_log=None)
```

---

<!-- prettier-ignore-start -->
## send\_tx\_async\_mode(data)
<!-- prettier-ignore-end -->

The function helps you to send transaction async mode.

#### Parameter

- data `<dict>` The signed transaction

#### Return

[`<TransactionAsyncMode>`]

#### Example

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


RPC_URL = "https://guanyu-testnet3-query.bandchain.org"

client = Client(RPC_URL)

priv = PrivateKey.from_mnemonic("s")
pubkey = priv.to_pubkey()
address = pubkey.to_address()
account = client.get_account(address)

t = (
    Transaction()
    .with_messages(
        MsgRequest(
            oracle_script_id=4,
            calldata=bytes.fromhex("0000000300000003425443000000034554480000000442414e44000000003b9aca00"),
            ask_count=16,
            min_count=10,
            client_id="from_pyband",
            sender=address,
        ),
    )
    .with_account_num(account.account_number)
    .with_sequence(account.sequence)
    .with_chain_id("band-guanyu-testnet3")
    .with_gas(1000000)
    .with_memo("TEST")
)

raw_data = t.get_sign_data()
signature = priv.sign(raw_data)
raw_tx = t.get_tx_data(signature, pubkey)

print(client.send_tx_async_mode(raw_tx))
```

#### Result

```python
TransactionAsyncMode(tx_hash=b'S\x12+U\xe2@\xa1\x13{-c)\xdf\nV\x8a\xb5lN\x19\xc2h7\x9b)\xc5`\x0cE\xf6\xc0\xaf')
```

---

<!-- prettier-ignore-start -->
## get\_price\_symbols(min\_count, ask\_count)
<!-- prettier-ignore-end -->

The function helps you to get price symbols based on min count and ask count

#### Parameter

- min_count `<int>` The minimum number of validators necessary for the request to proceed to the execution phase
- ask_count `<int>` The number of validators that are requested to respond to this request

#### Return

`List<string>`

#### Example

```python
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

min_count = 3
ask_count = 4

c = Client(RPC_URL)
print(c.get_price_symbols(min_count, ask_count))
```

#### Result

```python
['2KEY', 'ABYSS', 'ADA', 'AKRO', 'ALGO', 'AMPL', 'ANT', 'AST', 'ATOM', 'AUD', 'BAL', 'BAND', 'BAT', 'BCH', 'BLZ', 'BNB', 'BNT', 'BRL', 'BSV', 'BTC', 'BTG', 'BTM', 'BTS', 'BTT', 'BTU', 'BUSD', 'BZRX', 'CAD', 'CHF', 'CKB', 'CND', 'CNY', 'COMP', 'CREAM', 'CRO', 'CRV', 'CVC', 'DAI', 'DASH', 'DCR', 'DGB', 'DGX', 'DIA', 'DOGE', 'DOT', 'EGLD', 'ELF', 'ENJ', 'EOS', 'EQUAD', 'ETC', 'ETH', 'EUR', 'EURS', 'EWT', 'FET', 'FNX', 'FOR', 'FTM', 'FTT', 'FXC', 'GBP', 'GDC', 'GEN', 'GHT', 'GNO', 'GVT', 'HBAR', 'HKD', 'HNT', 'HOT', 'HT', 'ICX', 'INR', 'IOST', 'IOTX', 'JPY', 'JST', 'KAI', 'KAVA', 'KDA', 'KEY', 'KMD', 'KNC', 'KRW', 'KSM', 'LEND', 'LEO', 'LINA', 'LINK', 'LOOM', 'LRC', 'LSK', 'LTC', 'LUNA', 'MANA', 'MATIC', 'MCO', 'MET', 'MFG', 'MIOTA', 'MKR', 'MLN', 'MNT', 'MTL', 'MYB', 'NEO', 'NEXXO', 'NMR', 'NOK', 'NPXS', 'NXM', 'NZD', 'OCEAN', 'OGN', 'OKB', 'OMG', 'ONE', 'ONT', 'ORN', 'OST', 'OXT', 'PAX', 'PAXG', 'PAY', 'PBTC', 'PLR', 'PLTC', 'PNK', 'PNT', 'POLY', 'POWR', 'QKC', 'QNT', 'RAE', 'REN', 'RENBTC', 'REP', 'REQ', 'RLC', 'RMB', 'RSR', 'RSV', 'RUB', 'RUNE', 'RVN', 'SAN', 'SC', 'SGD', 'SNT', 'SNX', 'SOL', 'SPIKE', 'SPN', 'SRM', 'STMX', 'STORJ', 'STX', 'SUSD', 'SUSHI', 'SXP', 'THETA', 'TKN', 'TKX', 'TOMO', 'TRB', 'TRX', 'TRYB', 'TUSD', 'UBT', 'UNI', 'UOS', 'UPP', 'USDC', 'USDS', 'USDT', 'VET', 'VIDT', 'WAN', 'WAVES', 'WBTC', 'WNXM', 'WRX', 'XAG', 'XAU', 'XDR', 'XEM', 'XHV', 'XLM', 'XMR', 'XRP', 'XTZ', 'XZC', 'YAMV2', 'YFI', 'YFII', 'YFV', 'ZEC', 'ZRX']
```

---

<!-- prettier-ignore-start -->
## get_request\_id\_by\_tx\_hash(tx\_hash)
<!-- prettier-ignore-end -->

The function helps you to get price symbols based on min count and ask count

#### Parameter

- tx_hash `<HexBytes>(bytes type alias)` Transaction hash

#### Return

`List<int>`

#### Exception

| Type       | Description                            |
| ---------- | -------------------------------------- |
| ValueError | There is no request message in this tx |

#### Example

```python
from pyband import Client
from pyband.data import HexBytes

RPC_URL = " https://guanyu-testnet3-query.bandchain.org"

tx_hash = HexBytes(bytes.fromhex("EDF36AE723F4A1B4FDB745C5E2DFB9F07D88C053F1A7984D037B2D62217A35AD"))

c = Client(RPC_URL)
print(c.get_request_id_by_tx_hash(tx_hash))
```

#### Result

```python
[374762]
```

[`<address>`]: /client-library/pyband/wallet.html "Address"
[`<transactionasyncmode>`]: /client-library/pyband/data.html#transactionasyncmode "TransactionAsyncMode"
[`<transactionsyncmode>`]: /client-library/pyband/data.html#transactionsyncmode "TransactionSyncMode"
[`<transactionblockmode>`]: /client-library/pyband/data.html#transactionblockmode "TransactionBlockMode"
[`<block>`]: /client-library/pyband/data.html#block "Block"
[`<datasource>`]: /client-library/pyband/data.html#datasource "DataSource"
[`<oraclescript>`]: /client-library/pyband/data.html#oraclescript "OracleScript"
[`<requestinfo>`]: /client-library/pyband/data.html#requestinfo "RequestInfo"
[`<account>`]: /client-library/pyband/data.html#account "Account"
