<!--
order: 1
-->

# Get started

## Installation

The library is available on [PyPI](https://pypi.org/project/pyband/)

```bash
pip install pyband
```

## Example usage

### Make a request

We will show you how to make a request by following steps

**Step 1:** Import [`Client`] from pyband and put `RPC_URL` as parameter, and initial the client instance, now we can use every medthod on client module.

```python

from pyband import Client

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)

if __name__ == "__main__":
    main()

```

**Step 2:** The sender address is required for sending the transaction, so we have to initial the address first. So we have to import the [`PrivateKey`] from wallet, and get the privatekey, in this example we will get it from our test mnemonic `subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid`

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )

if __name__ == "__main__":
    main()

```

After that, we will transform the private key to the public key and then transform again to the address.

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

if __name__ == "__main__":
    main()

```

**Step 3:** It is time to construct the transaction with request messsage, so we have to import [`Transaction`] and [`MsgRequest`] and start to construct the tx.

As the transaction object requires these attributes

- message
- account number
- sequence
- chain id

and there are optional fields

- gas (default is 200000)
- free (default is 0)
- memo (default is empty string)

We will start with the message additional, so we can use [`with_messages`] function, then put the [`MsgRequest`] with params here

- oracle_script_id: the oracle script that we will request
- calldata: the calldata that needs to transform to bytes by using `bytes.fromhex` function
- ask_count: the integer of ask count
- min_count: the integer of min count
- client_id: the string of client id(it can be any text)
- sender: the address that we got from public key transformation

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgRequest(
                oracle_script_id=5,
                ## this hex refers to symbol: BTC and multipiler: 10
                calldata=bytes.fromhex("0000000342544300000003555344000000000000000a"),
                ask_count=16,
                min_count=16,
                client_id="from_pyband",
                sender=address,
            ),
        )
    )



if __name__ == "__main__":
    main()
```

About account number and sequence, we recommend to use [`Account`] from [`get_account`] function
The chain id will be gotten from [`get_chain_id`] function

All the rest is to optionally add [`with_gas`] to increse the gas limit, and [`with_memo`].

Now the transaction is ready to use as the code below.

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgRequest(
                oracle_script_id=5,
                ## this hex refers to symbol: BTC and multipiler: 10
                calldata=bytes.fromhex("0000000342544300000003555344000000000000000a"),
                ask_count=16,
                min_count=16,
                client_id="from_pyband",
                sender=address,
            ),
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("TEST")
    )



if __name__ == "__main__":
    main()

```

**Step 4:** Prepare the ready to send transaction

Call [`get_sign_data`] to get the transaction object which is ready to sign, then we will get the signature by signing the transaction.

After that, we will get the `raw transaction` by calling [`get_tx_data`], putting the signature and public key as parameters of this function.

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )

    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgRequest(
                oracle_script_id=5,
                ## this hex refers to symbol: BTC and multipiler: 10
                calldata=bytes.fromhex("0000000342544300000003555344000000000000000a"),
                ask_count=16,
                min_count=16,
                client_id="from_pyband",
                sender=address,
            ),
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("TEST")
    )
    # Step 4
    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)

if __name__ == "__main__":
    main()

```

**Step 5:** After we got `raw transaction` from the previous step, now we can send the transaction.

There are 3 modes for sending the transaction. We choose to use `block` mode in this example, we can call [`send_tx_block_mode`] with `raw transaction` as param.

The final code should now look like the code below.

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgRequest(
                oracle_script_id=5,
                ## this hex refers to symbol: BTC and multipiler: 10
                calldata=bytes.fromhex("0000000342544300000003555344000000000000000a"),
                ask_count=16,
                min_count=16,
                client_id="from_pyband",
                sender=address,
            ),
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("TEST")
    )
    # Step 4
    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)
    # Step 5
    print(client.send_tx_block_mode(raw_tx))


if __name__ == "__main__":
    main()

```

The result should look like this.

```python
TransactionBlockMode(height=2473122, tx_hash=b"\xe2\x04\x1c\xd7k\xcdA\x0c\xc5E\xccT\xc6\xadY\xed4\x10p\x1e\xc8o\xa2\x8b#\xc5'\x0e\xf6k\xc4\xad", gas_wanted=1000000, gas_used=1000000, code=0, log=[{'msg_index': 0, 'log': '', 'events': [{'type': 'message', 'attributes': [{'key': 'action', 'value': 'request'}]}, {'type': 'raw_request', 'attributes': [{'key': 'data_source_id', 'value': '4'}, {'key': 'data_source_hash', 'value': '93734983de34865551a03bd5b27c650f6f9496c8eeb25f3b1445ff89d32dbc7b'}, {'key': 'external_id', 'value': '11'}, {'key': 'calldata', 'value': 'BTC'}, {'key': 'data_source_id', 'value': '5'}, {'key': 'data_source_hash', 'value': '980a7da17f800b5006775a4e907bad29b52b9d9f1370bc7e8c10449dc95f020f'}, {'key': 'external_id', 'value': '12'}, {'key': 'calldata', 'value': 'BTC'}]}, {'type': 'request', 'attributes': [{'key': 'id', 'value': '493049'}, {'key': 'client_id', 'value': 'from_pyband'}, {'key': 'oracle_script_id', 'value': '5'}, {'key': 'calldata', 'value': '0000000342544300000003555344000000000000000a'}, {'key': 'ask_count', 'value': '16'}, {'key': 'min_count', 'value': '16'}, {'key': 'gas_used', 'value': '3130'}, {'key': 'validator', 'value': 'bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av'}, {'key': 'validator', 'value': 'bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn'}, {'key': 'validator', 'value': 'bandvaloper1s9s0knlc8mk62addjk98qcpqlcgvdfewt4muet'}, {'key': 'validator', 'value': 'bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc'}, {'key': 'validator', 'value': 'bandvaloper19gh30we6ypgec5plmnxd7smlqp66hel4lx573n'}, {'key': 'validator', 'value': 'bandvaloper1egcncstqyhm7njd5mva03lkrdtemmzehda940c'}, {'key': 'validator', 'value': 'bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm'}, {'key': 'validator', 'value': 'bandvaloper1r9eslzfdj976hap6z06wlq7nwnn0w6x0y40zn3'}, {'key': 'validator', 'value': 'bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs'}, {'key': 'validator', 'value': 'bandvaloper133jj708vr92rfd6fvnzyc6snylflzafu5k9ege'}, {'key': 'validator', 'value': 'bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn'}, {'key': 'validator', 'value': 'bandvaloper12wwz25zztfjpqx3fsq8rd4c48ew3vnywyplln8'}, {'key': 'validator', 'value': 'bandvaloper14mfaa40ude49q9pdklxxk7hfzyqf55ecdza9dz'}, {'key': 'validator', 'value': 'bandvaloper158q56s6zgnk4zf3sz6cz4jmpmxpanhxsfdra05'}, {'key': 'validator', 'value': 'bandvaloper1l6syuchpqj0jku2cswmxd5m8rdlzydcpug29cv'}, {'key': 'validator', 'value': 'bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa'}]}]}], error_log=None)
```

### Send BAND token

We will show you how to send BAND by following steps

**Step 1:** Import [`Client`] from pyband and put `RPC_URL` as parameter, and initial the client instance, now we can use every medthod on client module.

```python

from pyband import Client

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)

if __name__ == "__main__":
    main()

```

**Step 2:** The sender address is required for sending the transaction, so we have to initial the address first. So we have to import the [`PrivateKey`] from wallet, and get the privatekey, in this example we will get it from our test mnemonic `subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid`

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )

if __name__ == "__main__":
    main()

```

After that, we will transform the private key to the public key and then transform again to the address.

```python

from pyband import Client
from pyband.wallet import PrivateKey

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

if __name__ == "__main__":
    main()

```

**Step 3:** It is time to construct the transaction with request messsage, so we have to import [`Transaction`] and [`MsgSend`] and start to construct the tx.

As the transaction object requires these attributes

- message
- account number
- sequence
- chain id

and there are optional fields

- gas (default is 200000)
- free (default is 0)
- memo (default is empty string)

We will start with the message additional, so we can use [`with_messages`] function, then put the [`MsgSend`] with params here

- from_address: the sender address which is in [`Address`]
- to_address: the receiver address which is in [`Address`] , we can transform from string of address to [`Address`] by calling [`from_acc_bech32`] function.
- amount: the amount of BAND in [`Coin`] that you want to send. In this case, we want to send 1 BAND or 1000000 UBAND

```python
from pyband import Client
from pyband.data import Coin
from pyband.wallet import PrivateKey, Address
from pyband.transaction import Transaction
from pyband.message import MsgSend


def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgSend(
                from_address=address,
                to_address=Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"),
                amount=[Coin(amount=1000000, denom="uband")],
            )
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("send BAND by pyband")
    )

if __name__ == "__main__":
    main()
```

**Step 4:** Prepare the ready to send transaction

Call [`get_sign_data`] to get the transaction object which is ready to sign, then we will get the signature by signing the transaction.

After that, we will get the `raw transaction` by calling [`get_tx_data`], putting the signature and public key as parameters of this function.

```python
from pyband import Client
from pyband.data import Coin
from pyband.wallet import PrivateKey, Address
from pyband.transaction import Transaction
from pyband.message import MsgSend


def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgSend(
                from_address=address,
                to_address=Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"),
                amount=[Coin(amount=1000000, denom="uband")],
            )
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("send BAND by pyband")
    )
    # Step 4
    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)


if __name__ == "__main__":
    main()
```

**Step 5:** After we got `raw transaction` from the previous step, now we can send the transaction.

There are 3 modes for sending the transaction. We choose to use `block` mode in this example, we can call [`send_tx_block_mode`] with `raw transaction` as param.

The final code should now look like the code below.

```python
from pyband import Client
from pyband.data import Coin
from pyband.wallet import PrivateKey, Address
from pyband.transaction import Transaction
from pyband.message import MsgSend


def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    priv = PrivateKey.from_mnemonic(
        "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
    )
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()

    account = client.get_account(address)

    chain_id = client.get_chain_id()
    # Step 3
    t = (
        Transaction()
        .with_messages(
            MsgSend(
                from_address=address,
                to_address=Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"),
                amount=[Coin(amount=1000000, denom="uband")],
            )
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id(chain_id)
        .with_gas(1000000)
        .with_memo("send BAND by pyband")
    )
    # Step 4
    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)
    # Step 5
    print(client.send_tx_block_mode(raw_tx))


if __name__ == "__main__":
    main()
```

The result should look like this.

```python
TransactionBlockMode(height=2473054, tx_hash=b'\xeb\xa8\x0ez"g^O]--\xaa)\x86[\x96m\xb0\x93^\x1e\xe3\xc1!\xb1\xe7\x7f\xd6\xbc\xe9\xce\xac', gas_wanted=1000000, gas_used=1000000, code=0, log=[{'msg_index': 0, 'log': '', 'events': [{'type': 'message', 'attributes': [{'key': 'action', 'value': 'send'}, {'key': 'sender', 'value': 'band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy'}, {'key': 'module', 'value': 'bank'}]}, {'type': 'transfer', 'attributes': [{'key': 'recipient', 'value': 'band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte'}, {'key': 'sender', 'value': 'band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy'}, {'key': 'amount', 'value': '1000000uband'}]}]}], error_log=None)
```

### Get reference data

We will show you how to get the reference data

**Step 1:** Import [`Client`] from pyband and put `RPC_URL` as parameter, and initial the client instance, now we can use every medthod on client module.

```python

from pyband import Client

def main():
    # Step 1
    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)

if __name__ == "__main__":
    main()

```

**Step 2:** After we import the [`Client`] already, then we call the [`get_reference_data`] function to get the latest price

There are 3 parameters

- min_count: Integer of min count
- ask_count: Integer of ask count
- pairs: The list of cryprocurrency pairs

The final code should look like the code below.

```python
from pyband import Client

def main():

    RPC_URL = " https://guanyu-testnet3-query.bandchain.org"
    client = Client(RPC_URL)
    # Step 2
    min_count = 10
    ask_count = 16

    pairs = ["BTC/USDT", "ETH/USDT"]

    print(client.get_reference_data(pairs, min_count, ask_count))

if __name__ == "__main__":
    main()

```

The result should look like this.

```python
[ReferencePrice(pair='BTC/USDT', rate=19244.632819484967, updated_at=ReferencePriceUpdated(base=1607053828, quote=1607053828)), ReferencePrice(pair='ETH/USDT', rate=605.512705379927, updated_at=ReferencePriceUpdated(base=1607053828, quote=1607053828))]
```

[`get_tx_data`]: /client-library/pyband/transaction.html#get-tx-data-signature-pubkey
[`get_sign_data`]: /client-library/pyband/transaction.html#get-sign-data
[`get_chain_id`]: /client-library/pyband/client.html#get-chain-id
[`get_account`]: /client-library/pyband/client.html#get-account-address
[`with_gas`]: /client-library/pyband/transaction.html#with-gas-gas
[`with_memo`]: /client-library/pyband/transaction.html#with-memo-memo
[`with_messages`]: /client-library/pyband/transaction.html#with-messages-msgs
[`msgrequest`]: /client-library/pyband/message.html#msgrequest
[`msgsend`]: /client-library/pyband/message.html#msgsend
[`transaction`]: /client-library/pyband/transaction.html
[`account`]: /client-library/pyband/data.html#account
[`send_tx_block_mode`]: /client-library/pyband/client.html#send-tx-block-mode-data
[`privatekey`]: /client-library/pyband/wallet.html#private-key
[`client`]: /client-library/pyband/client.html
[`coin`]: /client-library/pyband/data.html#coin
[`address`]: /client-library/pyband/wallet.html#address
[`from_acc_bech32`]: /client-library/pyband/wallet.html#from-acc-bech32-bech-2
[`get_reference_data`]: /client-library/pyband/client.html#get-reference-data-pairs-min-count-ask-count
