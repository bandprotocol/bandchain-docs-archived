<!--
order: 5
-->

# Transaction Module

This module provides the functionality to send transaction on BandChain which requires [`<Msg>`] to be included.

## Exceptions

| Type       | Description   |
| ---------- | ------------- |
| ValueError | Invalid value |

## withMessages(msgs)

Add one or multiple [`<Msg>`] to [`<Transaction>`].

#### Parameter

- **\*msgs** [`<Msg>`] Messages to be included with transaction

#### Return

[`<Transaction>`]

## withAuto(client)

[`<Transaction>`] must have at least 1 message already before using `withAuto()`. This function set `accountNumber` and `sequence` from [`<Client>`] with address from sender in `self.msgs[0]`.

#### Parameter

- **client** [`<Client>`] A client to set `accountNumber` and `sequence`

#### Return

[`<Promise<Transaction>>`]

#### Exceptions

| Type          | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| EmptyMsgError | Message is empty, please use withMessages at least 1 message. |

## withAccountNum(accountNum)

Set account number to [`<Transaction>`].

#### Parameter

- **accountNum** `<number>` Must be an integer.

#### Return

[`<Transaction>`]

#### Exceptions

| Type            | Description                  |
| --------------- | ---------------------------- |
| NotIntegerError | accountNum is not an integer |

## with_sequence(sequence)

Set sequence number to [`<Transaction>`].

#### Parameter

- **sequence** `<Number>` Must be an integer.

#### Return

[`<Transaction>`]

#### Exceptions

| Type            | Description                |
| --------------- | -------------------------- |
| NotIntegerError | sequence is not an integer |

## withChainID(chainID)

Set chain id to [`<Transaction>`].

#### Parameter

- **chainID** `<string>`

#### Return

[`<Transaction>`]

## withFee(fee)

Set fee to [`<Transaction>`].

#### Parameter

- **fee** `<number>` Must be an integer.

#### Return

[`<Transaction>`]

#### Exceptions

| Type            | Description           |
| --------------- | --------------------- |
| NotIntegerError | fee is not an integer |

## withGas(gas)

Set gas to [`<Transaction>`].

#### Parameter

- **gas** `<number>` Must be an integer.

#### Return

[`<Transaction>`]

#### Exceptions

| Type            | Description           |
| --------------- | --------------------- |
| NotIntegerError | gas is not an integer |

## withMemo(memo)

Set memo to [`<Transaction>`].

#### Parameter

- **memo** `<str>` memo length is limited to 256.

#### Return

[`<Transaction>`]

## getSignData()

Get sign data from [`<Transaction>`].

#### Return

`<Buffer>`

#### Exceptions

| Type           | Description                  |
| -------------- | ---------------------------- |
| EmptyMsgError  | message is empty             |
| UndefinedError | accountNum should be defined |
| UndefinedError | sequence should be defined   |
| UndefinedError | chainID should be defined    |

## getTxData(signature, pubkey)

Get transaction data from [`<Transaction>`].

#### Parameter

- **signature** `<Buffer>`
- **pubkey** [`<PublicKey>`]

#### Return

`<object>`

#### Exceptions

| Type           | Description                  |
| -------------- | ---------------------------- |
| UndefinedError | accountNum should be defined |
| UndefinedError | sequence should be defined   |

#### Example

```javascript
import { Message, Data, Wallet, Transaction } from "bandchain2.js";

const { MsgSend } = Message;
const { Address } = Wallet;
const { Coin } = Data;

const to_adr = Address.fromAccBech32(
  "band1ksnd0f3xjclvg0d4z9w0v9ydyzhzfhuy47yx79"
);
const from_adr = Address.fromAccBech32(
  "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
);
const coin = Coin((amount = 100000), (denom = "uband"));
const msg = new MsgSend(to_adr, from_adr, [coin]);

tsc = Transaction()
  .with_messages(msg)
  .with_account_num(100)
  .with_sequence(30)
  .with_chain_id("bandchain")
  .with_gas(500000)
  .with_fee(10);

print(tsc.get_sign_data());
```

#### Result

```javascript
{
  account_number: "100",
  chain_id: "bandchain",
  fee: { amount: [{ amount: "10", denom: "uband" }], gas: "500000" },
  memo: "",
  msgs: [
    {
      type: "oracle/Request",
      value: {
        ask_count: "4",
        calldata: "AAAAA0JUQwAAAAAAAAAB",
        client_id: "from_pyband",
        min_count: "3",
        oracle_script_id: "1",
        sender: "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c",
      },
    },
  ],
  sequence: "30",
};
```

#### Example

```javascript
import { Message, Data, Wallet, Transaction, Client } from "bandchain2.js";

const { MsgRequest } = Message;
const { Address, PrivateKey } = Wallet;
const { Coin } = Data;

const privKey = PrivateKey.fromMnemonic("s");
const pubKey = privKey.toPubkey();
const fromAddr = pubKey.toAddress();
const toAddr = Address.fromAccBech32(
  "band1ksnd0f3xjclvg0d4z9w0v9ydyzhzfhuy47yx79"
);
const coin = new Coin(100000, "uband");
const msgSend = new MsgSend(from_addr, to_addr, [coin]);
const client = new Client("https://d3n.bandprotocol.com/rest");

const tscExample = async () => {
  const tscSend = await new Transaction()
    .withMessages(msgSend)
    .withChainID("bandchain")
    .withGas(500000)
    .withFee(10)
    .withMemo("bandchain.js example")
    .withAuto(client);
};
```

[`<transaction>`]: /client-library/bandchain.js/transaction.html "Transaction"
[`<promise<transaction>>`]: /client-library/bandchain.js/transaction.html "Transaction"
[`<client>`]: /client-library/bandchain.js/client.html "Client"
[`<msg>`]: /client-library/bandchain.js/message.html "Message"
[`<publickey>`]: /client-library/bandchain.js/wallet.html "PublicKey"
