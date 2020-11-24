# Message Module

Message to be included in [`<Transaction>`]

---

## MsgRequest()

#### Constructor

- **oracle_script_id** `<int>` Can't be less than 0.
- **calldata** `<bytes>` Size is limited to 256.
- **min_count** `<int>` Minimum is 1.
- **ask_count** `<int>` Can't be less than `min_count`.
- **client_id** `<str>` Length is limited to 128.
- **sender** [`<Address>`]

#### Exceptions

| Type       | Description                                                        |
| ---------- | ------------------------------------------------------------------ |
| ValueError | oracleScriptID cannot less than zero                               |
| ValueError | too large calldata                                                 |
| ValueError | invalid minCount, got: minCount: \${minCount}                      |
| ValueError | invalid askCount got: minCount: ${minCount}, askCount: ${askCount} |

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
```

---

## MsgSend()

#### Constructor

- **to_address** [`<Address>`]
- **from_address** [`<Address>`]
- **amount** [`<[Coin]>`](/client-library/python/data.html)

#### Exceptions

| Type       | Description            |
| ---------- | ---------------------- |
| ValueError | Expect at least 1 coin |

#### Example

```python
from pyband.data import Coin
from pyband.message import MsgSend
from pyband.wallet import Address

def main():
  to_addr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  from_addr = Address.from_acc_bech32("band1acavyhqpxmz6jt390xze705620q23e4tx4r5he")
  coin = Coin(amount=1000000, denom="uband")

  msg_send = MsgSend(
              to_address=to_addr,
              from_address=from_addr,
              amount=[coin]
            )
```

---

## MsgDelegate()

#### Constructor

- **delegator_address** [`<Address>`]
- **validator_address** [`<Address>`]
- **amount** [`<Coin>`]

#### Example

```python
from pyband.data import Coin
from pyband.message import MsgDelegate
from pyband.wallet import Address

def main():
  delegator_addr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  validator_addr = Address.from_val_bech32("bandvaloper1j9vk75jjty02elhwqqjehaspfslaem8pr20qst")
  coin = Coin(amount=1000000, denom="uband")

  msg_delegate = MsgDelegate(
                  delegator_address=delegator_addr,
                  validator_address=validator_addr,
                  amount=coin
                )
```

[`<transaction>`]: /client-library/python/transaction.html "Transaction"
[`<client>`]: /client-library/python/client.html "Client"
[`<msg>`]: /client-library/python/message.html "Message"
[`<address>`]: /client-library/python/wallet.html "Address"
[`<publickey>`]: /client-library/python/wallet.html "PublicKey"
[`<coin>`]: /client-library/python/data.html "Coin"
