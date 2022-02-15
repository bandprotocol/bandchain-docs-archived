<!--
order: 5
-->

# Transaction Module

This module provides a preparation component that is required for sending a transaction.

## with_message(msgs)

This function add one or multiple messages to `<Transaction>`

The message can be in any message listed [Oracle Module](/client-library/protocol-buffers/oracle-module.html#oracle-v1-tx-proto) or [Cosmos Based Messages](https://docs.cosmos.network/v0.44/core/proto-docs.html). Please note that our message should be imported from the generated [protobuf files](https://github.com/bandprotocol/chain/tree/v2.0.3/proto/oracle/v1).

**Parameter**

- **msgs** `<google-protobuf.message.Message>`: Messages to be included into the transaction.

**Return**

- `<Transaction>`

---

## with_sender(client, sender)

This function set `account_num` and `sequence` from `<Client>` with the address from `sender`. `<Transaction>` must have at least 1 message added before calling `with_sender()`

**Parameter**

- **client** `<Client>`: Client used to set `account_num` and `sequence` by calling `get_address()`.
- **sender** `<str>`: Address of the sender.

**Return**

- `<Transaction>`

**Exception**

| Type          | Description                                                    |
| ------------- | -------------------------------------------------------------- |
| EmptyMsgError | Messsage is empty, please use with_messages at least 1 message |
| NotFoundError | Account doesn't exist                                          |

---

## with_account_num(account_num)

This function set the account number in `<Transaction>`.

**Parameter**

- **account_num** `<int>`

**Return**

- `<Transaction>`

---

## with_sequence(sequence)

This function set the sequence number in `<Transaction>`.

**Parameter**

- **sequence** `<int>`

**Return**

- `<Transaction>`

---

## with_chain_id(chain_id)

This function set the chain ID in `<Transaction>`.

**Parameter**

- **chain_id** `<str>`

**Return**

- `<Transaction>`

---

## with_fee(fee)

This function set the fee by using the given fee and gas limit `<Transaction>`.

**Parameter**

- **fee** `<List[Coin]>`

**Return**

- `<Transaction>`

---

## with_gas(gas)

This function set the gas limit in `<Transaction>`.

**Parameter**

- **gas** `<int>`

**Return**

- `<Transaction>`

---

## with_memo(memo)

This function set the memo in `<Transaction>`.

**Parameter**

- **memo** `<str>`: Maximum length of memo is 256.

**Return**

- `<Transaction>`

**Exception**

| Type               | Description       |
| ------------------ | ----------------- |
| ValueTooLargeError | Memo is too large |

---

## get_sign_doc(public_key)

This function returns a sign data from `<Transaction>`.

**Parameter**

- **public_key** `<PublicKey>`, default = None: Public key.

**Return**

- `<cosmos_tx_type.SignDoc>`

**Exception**

| Type           | Description                   |
| -------------- | ----------------------------- |
| EmptyMsgError  | message is empty              |
| UndefinedError | account_num should be defined |
| UndefinedError | sequence should be defined    |
| UndefinedError | chain_id should be defined    |

---

## get_tx_data(signature, public_key)

This function returns a transaction that need to be sent.

**Parameter**

- **signature** `<bytes>`: Signature from sign from get_sign_doc
- **public_key** `<PublicKey`, default = None: Public key

**Return**

- `<bytes>`

### Usecase Example

**Note:** Get the `<GRPC>` [here](/technical-specifications/band-endpoints.html)

```python
import os

from pyband.client import Client
from pyband.transaction import Transaction
from pyband.wallet import PrivateKey

from pyband.proto.cosmos.base.v1beta1.coin_pb2 import Coin
from pyband.proto.oracle.v1.tx_pb2 import MsgRequestData

grpc_url = "<GRPC>"
c = Client(grpc_url)

MNEMONIC = os.getenv("MNEMONIC")
private_key = PrivateKey.from_mnemonic(MNEMONIC)
public_key = private_key.to_public_key()
sender_addr = public_key.to_address()
sender = sender_addr.to_acc_bech32()

request_msg = MsgRequestData(
    oracle_script_id=37,
    calldata=bytes.fromhex("0000000200000003425443000000034554480000000000000064"),
    ask_count=4,
    min_count=3,
    client_id="BandProtocol",
    fee_limit=[Coin(amount="100", denom="uband")],
    prepare_gas=50000,
    execute_gas=200000,
    sender=sender,
)

account = c.get_account(sender)
account_num = account.account_number
sequence = account.sequence

fee = [Coin(amount="0", denom="uband")]
chain_id = c.get_chain_id()

txn = (
    Transaction()
    .with_messages(request_msg)
    .with_sequence(sequence)
    .with_account_num(account_num)
    .with_chain_id(chain_id)
    .with_gas(2000000)
    .with_fee(fee)
    .with_memo("")
)

sign_doc = txn.get_sign_doc(public_key)
signature = private_key.sign(sign_doc.SerializeToString())
tx_raw_bytes = txn.get_tx_data(signature, public_key)

print(tx_raw_bytes.hex())
```

### Result

```
0a93010a90010a192f6f7261636c652e76312e4d7367526571756573744461746112730825121a0000000200000003425443000000034554480000000000000064180420032a0c42616e6450726f746f636f6c320c0a057562616e64120331303038d0860340c09a0c4a2b62616e643138703237796c3936326c38323833637437737272356c3367377964617a6a303764717277706812640a500a460a1f2f636f736d6f732e63727970746f2e736563703235366b312e5075624b657912230a2102fc535feadd4a048479a49255b620d54871970676d5a4ec5de214c80d387410f612040a020801181812100a0a0a057562616e641201301080897a1a407de416066bedfa16c518563dbc71184aebb24968232901c2b06f0714850f5557188750839331923bf0568069f5770b020bc83dc710480ca3726fc0dd3d3427c4
```
