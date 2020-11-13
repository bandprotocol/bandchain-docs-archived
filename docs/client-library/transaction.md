# Transaction Module

For sent the transaction on BandChain, ...

## Exceptions

| Type        | Description     |
| ----------- | --------------- |
| ValueError  | Invalid value   |

## with messages
* **\*msgs** [`<Msg>`] Messages to be included with transaction
* Returns: [`<Transaction>`]

Add [`<Transaction>`] with one or multiple [`<Msg>`].

## with auto
* **client** [`<Client>`] A client to set `accountNumber` and `sequence`
* Returns: [`<Transaction>`]

[`<Transaction>`] must have at least 1 message already before using `withAuto()`. This function set `accountNumber` and `sequence` from [`<Client>`] with address from sender in `self.msgs[0]`.

## with account num
* **account_num** `<Int>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## with sequence
* **sequence** `<Int>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## with chain id
* **chain_id** `<Str>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## with fee
* **fee** `<Int>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## with gas
* **gas** `<Int>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## with memo
* **memo** `<Str>` 
* Returns: [`<Transaction>`]

[`<Transaction>`] 

## get sign data
* Returns: `<bytes>`

[`<Transaction>`] 

## get tx data
* **signature** `<bytes>` 
* **pubkey** `<PublicKey>` 
* Returns: `<bytes>`

[`<Transaction>`] 

> Example

:::: tabs
::: tab Python
```python
from pyband import Transaction
from pyband.message import MsgSend
from pyband.wallet import Address
from pyband.data import Coin

def main():
  to_adr = Address.from_acc_bech32("band1ksnd0f3xjclvg0d4z9w0v9ydyzhzfhuy47yx79")
  from_adr = Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte")
  coin = Coin(amount=100000, denom="uband")
  msg = MsgSend(to_address=to_adr, from_address=from_adr, amount=[coin])

  tsc = Transaction().with_messages(msg)

  print(tsc.msgs[0].as_json())
  # {'type': 'cosmos-sdk/MsgSend', 'value': {'to_address': 'band1ksnd0f3xjclvg0d4z9w0v9ydyzhzfhuy47yx79', 'from_address': 'band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte', 'amount': [{'amount': '100000', 'denom': 'uband'}]}}
```

:::

::: tab JS

```js
// JS
```

:::

::::

[`<Transaction>`]: </client-library/transaction.html> "Transaction"
[`<Client>`]: </client-library/client.html> "Client"
[`<Msg>`]: </client-library/message.html> "Message"