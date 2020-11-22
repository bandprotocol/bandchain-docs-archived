# Message Module

Message to be included in [`<Transaction>`]

## Msg

## as_json()

#### Return

`<dict>`

## get_sender()

Return sender's address.

#### Return

[`<Address>`]

## validate()

Validate data in Message.

#### Return

`<bool>`

## MsgRequest(Msg)

#### Constructor

- **oracle_script_id** `<int>` Can't be less than 0.
- **calldata** `<bytes>` Size is limited to 256.
- **min_count** `<int>` Minimum is 1.
- **ask_count** `<int>` Can't be less than `min_count`.
- **client_id** `<str>` Length is limited to 128.
- **sender** [`<Address>`]

#### Example

```python
from pyband.message import MsgRequest
from pyband.wallet import Address

def main():
  addr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  msg_request = MsgRequest(
                  oracle_script_id=1,
                  calldata=bytes.fromhex("000000034254430000000000000001"),
                  ask_count=4,
                  min_count=3,
                  client_id="from_pyband",
                  sender=addr
                )
  print(msg_request.as_json())
```

#### Result

```json
{
  "type": "oracle/Request",
  "value": {
    "oracle_script_id": "1",
    "calldata": "AAAAA0JUQwAAAAAAAAAB",
    "ask_count": "4",
    "min_count": "3",
    "client_id": "from_pyband",
    "sender": "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
}
```

## MsgSend(Msg)

#### Constructor

- **to_address** [`<Address>`]
- **from_address** [`<Address>`]
- **amount** [`<[Coin]>`](/client-library/python/data.html)

#### Example

```python
from pyband.data import Coin
from pyband.message import MsgSend
from pyband.wallet import Address

def main():
  to_addr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  from_addr = Address.from_acc_bech32("band1acavyhqpxmz6jt390xze705620q23e4tx4r5he")
  msg_send = MsgSend(
    to_address=to_addr,
    from_address=from_addr,
    amount=[Coin(amount=1000000, denom="uband")]
  )

  print(msg_send.as_json())
```

#### Result

```json
{
  "type": "cosmos-sdk/MsgSend",
  "value": {
    "to_address": "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte",
    "from_address": "band1acavyhqpxmz6jt390xze705620q23e4tx4r5he",
    "amount": [{ "amount": "1000000", "denom": "uband" }]
  }
}
```

## MsgDelegate(Msg)

#### Constructor

- **delegator_address** [`<Address>`]
- **validator_address** [`<Address>`]
- **amount** [`<Coin>`]

```python
from pyband.data import Coin
from pyband.message import MsgDelegate
from pyband.wallet import Address

def main():
  delegator_addr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  validator_addr = Address.from_val_bech32("bandvaloper1j9vk75jjty02elhwqqjehaspfslaem8pr20qst")
  msg_delegate = MsgDelegate(
    delegator_address=delegator_addr,
    validator_address=validator_addr,
    amount=Coin(amount=1000000, denom="uband")
  )

  print(msg_delegate.as_json())
```

#### Result

```json
{
  "type": "cosmos-sdk/MsgDelegate",
  "value": {
    "delegator_address": "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte",
    "validator_address": "bandvaloper1j9vk75jjty02elhwqqjehaspfslaem8pr20qst",
    "amount": { "amount": "1000000", "denom": "uband" }
  }
}
```

[`<transaction>`]: /client-library/python/transaction.html "Transaction"
[`<client>`]: /client-library/python/client.html "Client"
[`<msg>`]: /client-library/python/message.html "Message"
[`<address>`]: /client-library/python/wallet.html "Address"
[`<publickey>`]: /client-library/python/wallet.html "PublicKey"
[`<coin>`]: /client-library/python/data.html "Coin"
