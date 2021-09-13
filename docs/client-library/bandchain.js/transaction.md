<!--
order: 5
-->

# Transaction Module

This module provides functionalities to send transactions on BandChain which requires [`<Msg>`] to be included.

## Exceptions

| Type            | Description                          |
| --------------- | ------------------------------------ |
| ValueError      | Invalid value                        |
| NotIntegerError | The value is not an integer          |
| EmptyMsgError   | No messages given to the transaction |
| UndefinedError  | The value should not be undefined    |

## `withMessages(msgs)`

Add one or multiple messages as a list of Google Protobuf's [`Any`] to [`Transaction`]. There are predefined message classes that can be used to convert to `Any` instance using `toAny()` method, but for the other type of message can be converted to `Any` instance using `Any.pack()` as shown in the code below.

```js
import { MsgCreateDataSource } from "@bandprotocol/bandchain.js/proto/oracle/v1/tx_pb";
import { Any } from "google-protobuf/google/protobuf/any_pb";

const msg = new MsgCreateDataSource();
msg.setName("dsName");
msg.setDescription("dsDescription");
// msg.set...() for every fields

const anyMsg = new Any();
const typeUrl = "oracle.v1.MsgCreateDataSource";
anyMsg.pack(msg.serializeBinary(), typeUrl, "/");

const tx = new Transaction();
tx.withMessages(anyMsg);
```

### Parameter

- **\*msgs** [`Any`] Messages converted to `Any` to be included in the transaction

### Return

- [`Transaction`] - This transaction instance for function chaining

## `withAccountNum(accountNum)`

Set account number to [`Transaction`].

### Parameter

- **accountNum** `number` - An integer of account number, which can be gathered from querying the account via Client's [`getAccount`].

### Return

- [`Transaction`] - This transaction instance for function chaining

### Exceptions

| Type            | Description                  |
| --------------- | ---------------------------- |
| NotIntegerError | accountNum is not an integer |

## `withSequence(sequence)`

Set sequence number to [`Transaction`].

### Parameter

- **sequence** `Number` - An integer of account's sequence number, which can be gathered from querying the account via Client's [`getAccount`].

### Return

- [`Transaction`] - This transaction instance for function chaining

### Exceptions

| Type            | Description                |
| --------------- | -------------------------- |
| NotIntegerError | sequence is not an integer |

## `withChainId(chainId)`

Set chain id to [`Transaction`].

### Parameter

- **chainId** `string` - a string of chain ID, which can be gathered from Client's [`getChainId`].

### Return

- [`Transaction`] - This transaction instance for function chaining

## `withFee(fee)`

Set fee to [`Transaction`].

### Parameter

- **fee** [`Fee`] - Set fee limit spent for gas price of the transaction.

### Return

- [`Transaction`] - This transaction instance for function chaining

### Exceptions

| Type            | Description           |
| --------------- | --------------------- |
| NotIntegerError | fee is not an integer |

## `withGas(gas)`

Set gas limit to [`Transaction`].

### Parameter

- **gas** `number` -An integer of Gas limit.

### Return

- [`Transaction`] - This transaction instance for function chaining

### Exceptions

| Type            | Description           |
| --------------- | --------------------- |
| NotIntegerError | gas is not an integer |

## `withMemo(memo)`

Set memo to [`Transaction`].

### Parameter

- **memo** `string` - an arbitrary string to remember the transaction. Memo length is limited to 256.

### Exceptions

| Type               | Description        |
| ------------------ | ------------------ |
| ValueTooLargeError | memo is too large. |

### Return

- [`Transaction`] - This transaction instance for function chaining

## `getSignDoc()`

Get serialized data of transaction's content to be signed from [`Transaction`].

### Return

- `Uint8Array` - A byte array of serialized transaction content data, ready for signing.

### Exceptions

| Type           | Description                  |
| -------------- | ---------------------------- |
| EmptyMsgError  | message is empty             |
| UndefinedError | accountNum should be defined |
| UndefinedError | sequence should be defined   |
| UndefinedError | chainID should be defined    |

## `getTxData(signature, publicKey)`

Get transaction data from [`Transaction`].

### Parameter

- **signature** `Uint8Array` - signature for the transaction
- **pubkey** [`PublicKey`] - an instance of public key to be included in the transaction

### Return

- `Uint8Array` - Serialized data of signed transaction, ready to be broadcasted to BandChain.

### Exceptions

| Type           | Description                  |
| -------------- | ---------------------------- |
| UndefinedError | accountNum should be defined |
| UndefinedError | sequence should be defined   |

### Example

```js
import {
  Client,
  Wallet,
  Transaction,
  Message,
  Coin,
} from "@bandprotocol/bandchain.js";

const { PrivateKey } = Wallet;
const client = new Client("http://rpc-laozi-testnet2.bandchain.org:8080");

// Step 2.1 import private key based on given mnemonic string
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2 prepare public key and its address
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();

const sendCoin = async () => {
  // Step 3.1 constructs MsgSend message
  const { MsgSend } = Message;

  // Here we use different message type, which is MsgSend
  const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f";
  const sendAmount = new Coin();
  sendAmount.setDenom("uband");
  sendAmount.setAmount("10");
  const msg = new MsgSend(sender, receiver, [sendAmount]);
  // Step 3.2 constructs a transaction
  const account = await client.getAccount(sender);
  const chainId = "band-laozi-testnet2";
  const tx = new Transaction()
    .withMessages(msg.toAny())
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainId(chainId)
    .withGas(1500000);

  // Step 4 sign the transaction
  const txSignData = tx.getSignDoc(pubkey);
  const signature = privkey.sign(txSignData);
  const signedTx = tx.getTxData(signature, pubkey);

  // Step 5 send the transaction
  const response = await client.sendTxBlockMode(signedTx);
  console.log(JSON.stringify(response));
};

(async () => {
  await sendCoin();
})();
```

### Result

```json=
{
  "height": 493527,
  "txhash": "F76593C2165A42E39464FEAD998AE80970655D82B18085FD65917ACC0979279D",
  "codespace": "",
  "code": 0,
  "data": "0A060A0473656E64",
  "rawLog": "[{\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"send\"},{\"key\":\"sender\",\"value\":\"band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy\"},{\"key\":\"module\",\"value\":\"bank\"}]},{\"type\":\"transfer\",\"attributes\":[{\"key\":\"recipient\",\"value\":\"band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f\"},{\"key\":\"sender\",\"value\":\"band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy\"},{\"key\":\"amount\",\"value\":\"10uband\"}]}]}]",
  "logsList": [
    {
      "msgIndex": 0,
      "log": "",
      "eventsList": [
        {
          "type": "message",
          "attributesList": [
            { "key": "action", "value": "send" },
            {
              "key": "sender",
              "value": "band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy"
            },
            { "key": "module", "value": "bank" }
          ]
        },
        {
          "type": "transfer",
          "attributesList": [
            {
              "key": "recipient",
              "value": "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f"
            },
            {
              "key": "sender",
              "value": "band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy"
            },
            { "key": "amount", "value": "10uband" }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gasWanted": 1500000,
  "gasUsed": 49013,
  "timestamp": ""
}
```

[`any`]: TODO:-add-link
[`getaccount`]: TODO:-add-link
[`getchainid`]: TODO:-add-link
[`fee`]: TODO:-add-link
[`publickey`]: TODO:-add-link
