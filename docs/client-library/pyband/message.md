# Message Module

Message to be included in [`<Transaction>`]

---

## MsgRequest()

Requests a new data based on an existing oracle script. A data request will be assigned a unique identifier once the transaction is confirmed. After sufficient validators report the raw data points. The results of the data requests will be written and stored permanently on BandChain for future uses.

#### Constructor

- **oracle_script_id** `<int>` The unique identifier number assigned to the oracle script when it was first registered on Bandchain. Can't be less than 0.
- **calldata** `<bytes>` The data passed over to the oracle script for the script to use during its execution. Size is limited to 256.
- **min_count** `<int>` The minimum number of validators necessary for the request to proceed to the execution phase. Minimum is 1.
- **ask_count** `<int>` The number of validators that are requested to respond to this request. Can't be less than `min_count`.
- **client_id** `<str>` The unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response.. Length is limited to 128.
- **sender** [`<Address>`] The address of the message's sender.

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

## MsgSend()

Send \$BAND to desired address.

#### Constructor

- **to_address** [`<Address>`] The address of the receiver.
- **from_address** [`<Address>`] The address of the sender.
- **amount** [`<[Coin]>`](/client-library/python/data.html) The amount of \$BAND to be sent.

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

## MsgDelegate()

Delegate \$BAND to the validator to help secure the network and get rewards.

#### Constructor

- **delegator_address** [`<Address>`] The address of the delegator.
- **validator_address** [`<Address>`] The address of the validator to delegate \$BAND.
- **amount** [`<Coin>`] The amount of \$BAND to be delegated.

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

[`<transaction>`]: /client-library/pyband/transaction.html "Transaction"
[`<client>`]: /client-library/pyband/client.html "Client"
[`<msg>`]: /client-library/pyband/message.html "Message"
[`<address>`]: /client-library/pyband/wallet.html "Address"
[`<publickey>`]: /client-library/pyband/wallet.html "PublicKey"
[`<coin>`]: /client-library/pyband/data.html "Coin"
