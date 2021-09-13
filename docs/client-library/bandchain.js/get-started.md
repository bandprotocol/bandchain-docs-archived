<!--
order: 1
-->

# Get started

Bandchain.js is a library written in TypeScript used for interacting with BandChain. The library provides classes and methods for convenient to send transactions, query data, OBI encoding, and wallet management.

The library is implemented based on [gRPC-web protocol](https://grpc.io/blog/state-of-grpc-web/) which sends HTTP/1.5 or HTTP/2 requests to a gRPC proxy server, before serving them as HTTP/2 to gRPC server.

The library support both Node.js and browsers.

## Installation

**NPM**

```bash
npm install --save @bandprotocol/bandchain.js
```

**Yarn**

```bash
yarn add @bandprotocol/bandchain.js
```

## Example usage

### Make an oracle request

This section describes methods to send a transaction of oracle request to BandChain

**Step 1:** Import [`Client`] from `@bandprotocol/bandchain.js` and create an instance with gRPC URL endpoint as an argument. The instance contains all methods to interact with BandChain.

```js
import { Client } from "@bandprotocol/bandchain.js";

// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
```

**Step 2:** Specify an account wallet for sending the transaction. This can be done by import [`PrivateKey`] from `Wallet` module and input a 24-words mnemonic string as a seed. For this example, we will use following mnemonic for demonstration.

```!
subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid
```

Here is the example on how to get a private key as an account.

```js
import { Client, Wallet } from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
```

Then, we will use the private key to generate public key and a BAND address, as shown below

```js
import { Client, Wallet } from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();
```

**Step 3:** As we have both an Client instance and an account wallet, we can now construct a transaction by importing [`Transaction`] and [`MsgRequestData`].

As the transaction object requires following attributes,

- a list of messages
- account number
- sequence number
- chain ID

with following optional fields

- gas limit (default is 200000)
- fee limit (default is 0)
- memo (default is empty string)

We will firstly construct a [`MsgRequestData`] to be included in a list of messages of the transaction. The message requires 6 fields as shown in the exmaple below.

```js
import { Client, Wallet, Message } from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();

const makeRequest = async () => {
  // Step 3.1
  const { MsgRequestData } = Message;
  const oracleScriptId = 37;
  // calldata is { symbols: ['BTC', 'ETH'], multiplier: 100 }
  const calldata = Buffer.from(
    "0000000200000003425443000000034554480000000000000064",
    "hex"
  );
  const askCount = 4;
  const minCount = 3;
  const clientId = "from_bandchain.js";
  // fee, prepareGas, and executeGas can also be manually set in constructor's arguments
  const msg = new MsgRequestData(
    oracleScriptId,
    calldata,
    askCount,
    minCount,
    clientId,
    sender
  );
};
```

After constructed [`MsgRequestData`], we can get other required fields by following methods to constructs a transaction

- Account number can be gathered from Client's [`getAccount`] method, under `accountNumber` field.
- Sequence number can be gathered from Client's [`getAccount`] method, under `sequence` field.
- Chain ID can be gathered from Client's [`getChainId`] method.

```js
import {
  Client,
  Wallet,
  Message,
  Transaction,
} from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();

const makeRequest = async () => {
  // Step 3.1 constructs MsgRequestData message
  const { MsgRequestData } = Message;
  const oracleScriptId = 37;
  // calldata is { symbols: ['BTC', 'ETH'], multiplier: 100 }
  const calldata = Buffer.from(
    "0000000200000003425443000000034554480000000000000064",
    "hex"
  );
  const askCount = 4;
  const minCount = 3;
  const clientId = "from_bandchain.js";
  // fee, prepareGas, and executeGas can also be manually set in constructor's arguments
  const msg = new MsgRequestData(
    oracleScriptId,
    calldata,
    askCount,
    minCount,
    clientId,
    sender
  );
  // Step 3.2 constructs a transaction
  const account = await client.getAccount(sender);
  const chainId = "band-laozi-testnet2";
  const tx = new Transaction()
    .withMessages(msg.toAny())
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainId(chainId)
    .withGas(1500000);
};
```

**Step 4:** Sign and send the transaction

Now, we had an instance of constructed transaction. In order to sign the transaction, [`getSignDoc`] method in `Transaction` instance can be used to get serialzed data of the transaction to be used for signing. Then, use `PrivateKey`'s [`sign`] to sign transaction. Finally, use [`getTxData`] to include signature and public key to the transaction to get a complete signed transaction.

```js
import {
  Client,
  Wallet,
  Message,
  Transaction,
} from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();

const makeRequest = async () => {
  // Step 3.1 constructs MsgRequestData message
  const { MsgRequestData } = Message;
  const oracleScriptId = 37;
  // calldata is { symbols: ['BTC', 'ETH'], multiplier: 100 }
  const calldata = Buffer.from(
    "0000000200000003425443000000034554480000000000000064",
    "hex"
  );
  const askCount = 4;
  const minCount = 3;
  const clientId = "from_bandchain.js";
  // fee, prepareGas, and executeGas can also be manually set in constructor's arguments
  const msg = new MsgRequestData(
    oracleScriptId,
    calldata,
    askCount,
    minCount,
    clientId,
    sender
  );
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
};
```

**Step 5:** Send the signed transaction to Bandchain be using following method of choices

- [`sendTxBlockMode`] Send the transaction and wait until committed
- [`sendTxSyncMode`] Send the transaction and wait until `CheckTx` phase is done
- [`sendTxAsyncMode`] Send the transaction and immediately returned

For our example, we will use `sendTxBlockMode` to send the transaction.

The final code should now look like the code below.

```js
import {
  Client,
  Wallet,
  Message,
  Transaction,
} from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
const pubkey = privkey.toPubkey();
const sender = pubkey.toAddress().toAccBech32();

const makeRequest = async () => {
  // Step 3.1 constructs MsgRequestData message
  const { MsgRequestData } = Message;
  const oracleScriptId = 37;
  // calldata is { symbols: ['BTC', 'ETH'], multiplier: 100 }
  const calldata = Buffer.from(
    "0000000200000003425443000000034554480000000000000064",
    "hex"
  );
  const askCount = 4;
  const minCount = 3;
  const clientId = "from_bandchain.js";
  // fee, prepareGas, and executeGas can also be manually set in constructor's arguments
  const msg = new MsgRequestData(
    oracleScriptId,
    calldata,
    askCount,
    minCount,
    clientId,
    sender
  );
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
  console.log(response);
};

(async () => {
  await makeRequest();
})();
```

After, we run the script above, the result should look like this. The following log contains logs, which have events related to sent request.

```json
{
  "height":438884,
  "txhash":"313DBAD237E3E672B432D7F9A422EF953EA42E1029F3562C9EE2AEFB70E7D5A3",
  "codespace":"",
  "code":0,
  "data":"0A090A0772657175657374",
  "rawLog":"[{\"events\":[{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"request\"}]},{\"type\":\"raw_request\",\"attributes\":[{\"key\":\"data_source_id\",\"value\":\"61\"},{\"key\":\"data_source_hash\",\"value\":\"07be7bd61667327aae10b7a13...",
  "logsList":[{
    "msgIndex":0,
    "log":"",
    "eventsList": [
      {"type":"message","attributesList":[{"key":"action","value":"request"}]},
      {"type":"raw_request","attributesList":[{"key":"data_source_id","value":"61"},
      {"key":"data_source_hash","value":"07be7bd61667327aae10b7a13a542c7dfba31b8f4c52b0b60bf9c7b11b1a72ef"},
      {"key":"external_id","value":"6"},
      {"key":"calldata","value":"BTC ETH"},
      {"key":"fee","value":""},
      {"key":"data_source_id","value":"57"},
      {"key":"data_source_hash","value":"61b369daa5c0918020a52165f6c7662d5b9c1eee915025cb3d2b9947a26e48c7"},
      {"key":"external_id","value":"0"},
      {"key":"calldata","value":"BTC ETH"},
      {"key":"fee","value":""},
      {"key":"data_source_id","value":"62"},
      {"key":"data_source_hash","value":"107048da9dbf7960c79fb20e0585e080bb9be07d42a1ce09c5479bbada8d0289"},
      {"key":"external_id","value":"3"},
      {"key":"calldata","value":"BTC ETH"},
      {"key":"fee","value":""},
      {"key":"data_source_id","value":"60"},
      ...,
      {"key":"calldata","value":"BTC ETH"},
      {"key":"fee","value":""}]},
      {"type":"request","attributesList":[{"key":"id","value":"74473"},
      {"key":"client_id","value":"from_bandchain.js"},
      {"key":"oracle_script_id","value":"37"},
      {"key":"calldata","value":"0000000200000003425443000000034554480000000000000064"},
      {"key":"ask_count","value":"4"},
      {"key":"min_count","value":"3"},
      {"key":"gas_used","value":"111048"},
      {"key":"total_fees","value":""},
      {"key":"validator","value":"bandvaloper1p46uhvdk8vr829v747v85hst3mur2dzlhfemmz"},
      {"key":"validator","value":"bandvaloper1v0u0tsptnkcdrju4qlj0hswqhnqcn47d20prfy"},
      {"key":"validator","value":"bandvaloper17n5rmujk78nkgss7tjecg4nfzn6geg4cqtyg3u"},
      {"key":"validator","value":"bandvaloper19eu9g3gka6rxlevkjlvjq7s6c498tejnwxjwxx"}
    ]}]}],
  "info":"",
  "gasWanted":1500000,
  "gasUsed":660549,
  "timestamp":""
}
```

### Send BAND token

Sending BAND token has code pattern similar to the previous section, except that different type of message is used.

The message used for this section is [`MsgSend`] which can be used as shown below

```js
const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f";
const sendAmount = new Coin();
sendAmount.setDenom("uband");
sendAmount.setAmount("10");
const msg = new MsgSend(sender, receiver, [sendAmount]);
```

Therefore, final result is as shown follow

```js
import {
  Client,
  Wallet,
  Message,
  Transaction,
  Coin,
} from "@bandprotocol/bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const grpcUrl = "https://laozi-testnet4.bandchain.org/grpc-web";
const client = new Client(grpcUrl);
// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
// Step 2.2
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
  console.log(response);
};

(async () => {
  await sendCoin();
})();
```

The response should be similar to as shown below

```json
{
  "height": 443301,
  "txhash": "026760F78665C03DD4A8786304E01848A4747F0B62F7DB4B31F93C792B2D3D52",
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

### Get reference data

This section shows an example on how to query data from BandChain. This example query standard price references based on given symbol pairs, min count, and ask count.

**Step 1:** Import [`Client`] from `@bandprotocol/bandchain.js` and put string of gRPC URL endpoint as a parameter, then initialize the client instance as shown below.

```js
import { Client } from "@bandprotocol/bandchain.js";
// Step 1
const grpcUrl = "http://localhost:8080";
const client = new Client(grpcUrl);
```

**Step 2:** After we import the [`Client`] already, then we call the `Client`'s [`getReferenceData`] function to get the latest price

There are 3 parameters

- minCount: Integer of min count
- askCount: Integer of ask count
- pairs: The list of cryprocurrency pairs

The final code should look like the code below.

```js
import { Client } from "@bandprotocol/bandchain.js";
// Step 1
const grpcUrl = "http://localhost:8080";
const client = new Client(grpcUrl);

// Step 2
const minCount = 3;
const askCount = 6;
const pairs = ["BTC/USD", "ETH/USD"];

(async () => {
  console.log(
    JSON.stringify(await client.getReferenceData(pairs, minCount, askCount))
  );
})();
```

And the result should look like this.

```json
[
  {
    "pair": "BTC/USD",
    "rate": 34078.0954,
    "updatedAt": {
      "base": 1625579610,
      "quote": 1625579627
    },
    "requestId": {
      "base": 79538,
      "quote": 0
    }
  },
  {
    "pair": "ETH/BTC",
    "rate": 0.06759872648278929,
    "updatedAt": {
      "base": 1625579610,
      "quote": 1625579610
    },
    "requestId": {
      "base": 79538,
      "quote": 79538
    }
  }
]
```

And these are examples of bandchain.js usages, for more information, feel free to dive into specifications in each module.

[`gettxdata`]: TODO-add-links
[`getsigndoc`]: TODO-add-links
[`getchainid`]: TODO-add-links
[`getaccount`]: TODO-add-links
[`msgrequestdata`]: TODO-add-links
[`msgsend`]: TODO-add-links
[`transaction`]: TODO-add-links
[`account`]: TODO-add-links
[`sendtxblockmode`]: TODO-add-links
[`sendtxsyncmode`]: TODO-add-links
[`sendtxasyncmode`]: TODO-add-links
[`privatekey`]: TODO-add-links
[`client`]: TODO-add-links
[`coin`]: TODO-add-links
[`address`]: TODO-add-links
[`getreferencedata`]: TODO-add-links
