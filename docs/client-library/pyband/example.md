# Example

## Make a request from oracle script ID 1

```python
from pyband import Client
from pyband.wallet import PrivateKey
from pyband.transaction import Transaction
from pyband.message import MsgRequest


def main():

    RPC_URL = "https://d3n.bandprotocol.com/rest"

    client = Client(RPC_URL)

    priv = PrivateKey.from_mnemonic("s")
    pubkey = priv.to_pubkey()
    address = pubkey.to_address()
    account = client.get_account(address.to_acc_bech32())

    t = (
        Transaction()
        .with_messages(
            MsgRequest(
                oracle_script_id=1,
                ## this hex refers to symbol: BTC and multipiler: 1
                calldata=bytes.fromhex("000000034254430000000000000001"),
                ask_count=2,
                min_count=2,
                client_id="from_pyband",
                sender=address,
            ),
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id("bandchain")
        .with_gas(1000000)
        .with_memo("TEST")
    )

    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)

    print(client.send_tx_block_mode(raw_tx))


if __name__ == "__main__":
    main()

```

## Send BAND token

```python
from pyband import Client
from pyband.data import Coin
from pyband.wallet import PrivateKey, Address
from pyband.transaction import Transaction
from pyband.message import MsgSend


def main():

    RPC_URL = "https://d3n.bandprotocol.com/rest"
    ACCOUNT = "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"

    client = Client(RPC_URL)
    account = client.get_account(ACCOUNT)

    priv = PrivateKey.from_mnemonic("s")
    pubkey = priv.to_pubkey()

    t = (
        Transaction()
        .with_messages(
            MsgSend(
                to_address=Address.from_acc_bech32("band178yydxyzplrh5v0jegvtrahymqragf6spy8kdd"),
                from_address=Address.from_acc_bech32("band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"),
                amount=[Coin(amount=1000000, denom="uband")],
            )
        )
        .with_account_num(account.account_number)
        .with_sequence(account.sequence)
        .with_chain_id("bandchain")
        .with_gas(1000000)
        .with_memo("TEST")
    )

    raw_data = t.get_sign_data()
    signature = priv.sign(raw_data)
    raw_tx = t.get_tx_data(signature, pubkey)

    print(client.send_tx_block_mode(raw_tx))


if __name__ == "__main__":
    main()

```

## Get the latest block infomation

```python
from pyband import Client

def main():

    RPC_URL = "https://d3n.bandprotocol.com/rest"

    client = Client(RPC_URL)
    block_info = client.get_latest_block()

    print(block_info.block.header.height)
    # 1090707

    print(block_info.block_id.hash.hex())
    # 51f019c972ff97ba037bee1f800b17d60d6227e01e517dbfd016836943462a2f


if __name__ == "__main__":
    main()

```
