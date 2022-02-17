<!--
order: 1
-->

# Getting Started

## Overview

Bandchain.js is a library written in TypeScript used for interacting with BandChain. The library provides classes and methods for convenient to send transactions, query data, OBI encoding, and wallet management.

The library is implemented based on [gRPC-web protocol](https://grpc.io/blog/state-of-grpc-web/) which sends HTTP/1.5 or HTTP/2 requests to a gRPC proxy server, before serving them as HTTP/2 to gRPC server.

The library support both Node.js and browsers.

## System Requirements

- Node.js 12.22.0 or later

- MacOS, Windows (including WSL), and Linux are supported

## Browser Support

The default build targets browsers that support both [native ESM via script tags](https://caniuse.com/es6-module) and [native ESM dynamic import](https://caniuse.com/es6-module-dynamic-import).

## Installation

**NPM**

```bash
npm install --save @bandprotocol/bandchain.js
```

**Yarn**

```bash
yarn add @bandprotocol/bandchain.js
```

## Basic Usages

### Make an oracle request

This section describes methods to send a transaction of oracle request to BandChain

**Step 1:** Import `Client` from `@bandprotocol/bandchain.js` and creates a new instance of `grpcUrl` as a parameter and you can get `<GRPC_WEB>` endpoint from [here](/technical-specifications/band-endpoints.html). Then initialize the client instance. Every method in client module can now be used.

```js
import { Client } from "@bandprotocol/bandchain.js"

const grpcUrl = "<GRPC_WEB>" // ex.https://laozi-testnet4.bandchain.org/grpc-web
const client = new Client(grpcUrl)
```

**Step 2:** Specify an account wallet for sending the transaction. This can be done by import [`PrivateKey`] from `Wallet` module and input a 24-words mnemonic string as a seed. For this example, we will use following mnemonic for demonstration.

```!
subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid
```

Here is the example on how to get a private key as an account.

```js
import { Wallet } from "@bandprotocol/bandchain.js"
const { PrivateKey } = Wallet

// Step 2.1
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
)
```

Then, we will use the private key to generate public key and a BAND address, as shown below

```js
const pubkey = privkey.toPubkey()
const sender = pubkey.toAddress().toAccBech32()
```

**Step 3:** As we have both an Client instance and an account wallet, we can now construct a transaction by importing [`Transaction`] and [`MsgRequestData`].

As the transaction object requires following attributes,

- a list of messages
- account number
- sequence number
- chain ID
- fee

with following optional fields

- memo (default is empty string)

We will firstly construct a [`MsgRequestData`] to be included in a list of messages of the transaction. The message requires 9 fields as shown in the exmaple below.

Within [`MsgRequestData`]

```js
import { Obi, Message, Coin } from "@bandprotocol/bandchain.js"

const obi = new Obi("{symbols:[string],multiplier:u64}/{rates:[u64]}")
const calldata = obi.encodeInput({ symbols: ["ETH"], multiplier: 100 })

const oracleScriptId = 37
const askCount = 4
const minCount = 3
const clientId = "from_bandchain.js"

let feeLimit = new Coin()
feeLimit.setDenom("uband")
feeLimit.setAmount("100000")

const prepareGas = 100000
const executeGas = 200000

const requestMessage = new Message.MsgRequestData(
  oracleScriptId,
  calldata,
  askCount,
  minCount,
  clientId,
  sender,
  [feeLimit],
  prepareGas,
  executeGas
)
```

After constructed [`MsgRequestData`], we can get other required fields by following methods to constructs a transaction

- Account and Sequence number are automatically gathered from Transaction's [`withSender`] method.
- Chain ID can be gathered from Client's [`getChainId`] method.

```js
import { Coin, Fee, Transaction } from "@bandprotocol/bandchain.js"

let feeCoin = new Coin()
feeCoin.setDenom("uband")
feeCoin.setAmount("50000")

const fee = new Fee()
fee.setAmountList([feeCoin])
fee.setGasLimit(1000000)

const chainId = await client.getChainId()
const txn = new Transaction()
txn.withMessages(requestMessage)
await txn.withSender(client, sender)
txn.withChainId(chainId)
txn.withFee(fee)
txn.withMemo("")
```

**Step 4:** Sign and send the transaction

Now, we had an instance of constructed transaction. In order to sign the transaction, [`getSignDoc`] method in [`Transaction`] instance can be used to get serialzed data of the transaction to be used for signing. Then, use [`PrivateKey`]'s [`sign`] to sign transaction. Finally, use [`getTxData`] to include signature and public key to the transaction to get a complete signed transaction.

```js
const signDoc = txn.getSignDoc(pubkey)
const signature = privateKey.sign(signDoc)
```

**Step 5:** Send the signed transaction to Bandchain be using following method of choices

- [`sendTxBlockMode`] Send the transaction and wait until committed
- [`sendTxSyncMode`] Send the transaction and wait until `CheckTx` phase is done
- [`sendTxAsyncMode`] Send the transaction and immediately returned

For our example, we will use [`sendTxBlockMode`] to send the transaction.

The final code should now look like the code below.

```js
import { Client, Wallet, Obi, Message, Coin, Transaction, Fee } from "@bandprotocol/bandchain.js"

const grpcUrl = "<GRPC_WEB>" // ex.https://laozi-testnet4.bandchain.org/grpc-web
const client = new Client(grpcUrl)

async function makeRequest() {
  // Step 1: Import a private key for signing transaction
  const { PrivateKey } = Wallet
  const mnemonic = "test"
  const privateKey = PrivateKey.fromMnemonic(mnemonic)
  const pubkey = privateKey.toPubkey()
  const sender = pubkey.toAddress().toAccBech32()

  // Step 2.1: Prepare oracle request's properties
  const obi = new Obi("{symbols:[string],multiplier:u64}/{rates:[u64]}")
  const calldata = obi.encodeInput({ symbols: ["ETH"], multiplier: 100 })

  const oracleScriptId = 37
  const askCount = 4
  const minCount = 3
  const clientId = "from_bandchain.js"

  let feeLimit = new Coin()
  feeLimit.setDenom("uband")
  feeLimit.setAmount("100000")

  const prepareGas = 100000
  const executeGas = 200000

  // Step 2.2: Create an oracle request message
  const requestMessage = new Message.MsgRequestData(
    oracleScriptId,
    calldata,
    askCount,
    minCount,
    clientId,
    sender,
    [feeLimit],
    prepareGas,
    executeGas
  )

  let feeCoin = new Coin()
  feeCoin.setDenom("uband")
  feeCoin.setAmount("50000")

  // Step 3.1: Construct a transaction
  const fee = new Fee()
  fee.setAmountList([feeCoin])
  fee.setGasLimit(1000000)

  const chainId = await client.getChainId()
  const txn = new Transaction()
  txn.withMessages(requestMessage)
  await txn.withSender(client, sender)
  txn.withChainId(chainId)
  txn.withFee(fee)
  txn.withMemo("")

  // Step 3.2: Sign the transaction using the private key
  const signDoc = txn.getSignDoc(pubkey)
  const signature = privateKey.sign(signDoc)

  const txRawBytes = txn.getTxData(signature, pubkey)

  // Step 4: Broadcast the transaction
  const sendTx = await client.sendTxBlockMode(txRawBytes)
  console.log(sendTx)
}

;(async () => {
  await makeRequest()
})()
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
const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f"
const sendAmount = new Coin()
sendAmount.setDenom("uband")
sendAmount.setAmount("10")
const msg = new MsgSend(sender, receiver, [sendAmount])
```

Therefore, final result is as shown follow

```js
import { Client, Wallet, Transaction, Message, Coin, Fee } from "@bandprotocol/bandchain.js"

const { PrivateKey } = Wallet
const client = new Client("<GRPC_WEB>") // ex.https://laozi-testnet4.bandchain.org/grpc-web

// Step 2.1 import private key based on given mnemonic string
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
)
// Step 2.2 prepare public key and its address
const pubkey = privkey.toPubkey()
const sender = pubkey.toAddress().toAccBech32()

const sendCoin = async () => {
  // Step 3.1 constructs MsgSend message
  const { MsgSend } = Message

  // Here we use different message type, which is MsgSend
  const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f"
  const sendAmount = new Coin()
  sendAmount.setDenom("uband")
  sendAmount.setAmount("10")
  const msg = new MsgSend(sender, receiver, [sendAmount])
  // Step 3.2 constructs a transaction
  const account = await client.getAccount(sender)
  const chainId = "band-laozi-testnet4"

  let feeCoin = new Coin()
  feeCoin.setDenom("uband")
  feeCoin.setAmount("1000")

  const fee = new Fee()
  fee.setAmountList([feeCoin])
  fee.setGasLimit(1000000)
  const tx = new Transaction()
    .withMessages(msg)
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainId(chainId)
    .withFee(fee)

  // Step 4 sign the transaction
  const txSignData = tx.getSignDoc(pubkey)
  const signature = privkey.sign(txSignData)
  const signedTx = tx.getTxData(signature, pubkey)

  // Step 5 send the transaction
  const response = await client.sendTxBlockMode(signedTx)
  console.log(response)
}

;(async () => {
  await sendCoin()
})()
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

**Step 1:** Import `bandchain.js` and put `grpc_url_web` as a parameter and you can get `<GRPC_WEB>` endpoint from [here](/technical-specifications/band-endpoints.html). Then initialize the client instance. Every method in client module can now be used.

```js
import { Client } from "@bandprotocol/bandchain.js"
// Step 1
const grpcUrl = "<GRPC_WEB>" // ex.https://laozi-testnet4.bandchain.org/grpc-web
const client = new Client(grpcUrl)
```

**Step 2:** After we import the [`Client`] already, then we call the [`Client`]'s [`getReferenceData`] function to get the latest price

There are 3 parameters

- minCount: Integer of min count
- askCount: Integer of ask count
- pairs: The list of cryprocurrency pairs

The final code should look like the code below.

```js
import { Client } from "@bandprotocol/bandchain.js"
// Step 1
const grpcUrl = "<GRPC_WEB>" // ex.https://laozi-testnet4.bandchain.org/grpc-web
const client = new Client(grpcUrl)

// Step 2
const minCount = 3
const askCount = 4
const pairs = ["BTC/USD", "ETH/USD"(async () => {
  console.log(JSON.stringify(await client.getReferenceData(pairs, minCount, askCount)))
})()
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

### Send BAND token via IBC Transfer

With BandChain built based on the Cosmos-SDK, we also allow interaction with our data oracle through **Cosmos Inter-Blockchain-Communication protocol, [`IBC`]**, which connects other compatible blockchains to request data from BandChain.

To send BAND tokens through IBC Protocol, we will use [`MsgTransfer`] as a method to represents a message to send coins from one account to another between ICS20 enabled chains. See ICS spec [here](https://github.com/cosmos/ibc/tree/master/spec/app/ics-020-fungible-token-transfer).

**Step 1:** First, you need to create a `MsgTransfer` instance from the Message module. The following code shows you how to create the instance.​

```js
import { Message } from "@bandprotocol/bandchain.js"

const { MsgTransfer } = Message
```

**Step 2:** Now we can construct the `MsgTransfer` method, this method requires 5 fields to interact with:

| Field            | Type   | Description                                                                 |
| ---------------- | ------ | --------------------------------------------------------------------------- |
| sourcePort       | string | The port on which the packet will be sent                                   |
| sourceChannel    | string | The channel by which the packet will be sent                                |
| sender           | string | The sender address                                                          |
| receiver         | string | The recipient address on the destination chain                              |
| token            | Coin   | The tokens to be transferred                                                |
| timeoutTimestamp | number | Timeout timestamp (in nanoseconds) relative to the current block timestamp. |

Your code should look like this.

```js
const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f"
const sourcePort = "transfer"
const sourceChannel = "channel-25"
const sendAmount = new Coin()
sendAmount.setDenom("uband")
sendAmount.setAmount("10")
const timeoutTimestamp = moment().unix() + 600 * 1e9 // timeout in 10 mins

const msg = new MsgTransfer(
  sourcePort,
  sourceChannel,
  sendAmount,
  sender,
  receiver,
  timeout_timestamp
)
```

To find the right channel IDs for each chain to perform Interchain Transfers, go to the [BandChain's GraphQL Console](https://graphql-lt4.bandchain.org/console) with the following query.

```graphql
query MyQuery {
  connections(
    where: { channels: { port: { _eq: "transfer" } } }
    order_by: { counterparty_chain_id: asc }
  ) {
    channels(where: { port: { _eq: "transfer" } }) {
      channel
      port
    }
    counterparty_chain_id
  }
}
```

This query will list all the available IBC Relayers. like so:

```json
{
  "data": {
    "connections": [
      {
        "channels": [
          {
            "channel": "channel-91",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "anca-1"
      },
      {
        "channels": [
          {
            "channel": "channel-12",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "comdex-dev1"
      },
      {
        "channels": [
          {
            "channel": "channel-11",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "comdex-dev1"
      },
      {
        "channels": [
          {
            "channel": "channel-14",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "comdex-dev1"
      },
      {
        "channels": [
          {
            "channel": "channel-13",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "comdexdevnet-4"
      },
      {
        "channels": [
          {
            "channel": "channel-25",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "consumer"
      },
      {
        "channels": [
          {
            "channel": "channel-114",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "ibcoracle"
      },
      {
        "channels": [
          {
            "channel": "channel-116",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "ibcoracle"
      },
      {
        "channels": [
          {
            "channel": "channel-117",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "ibcoracle"
      },
      {
        "channels": [
          {
            "channel": "channel-90",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "injective-1"
      },
      {
        "channels": [
          {
            "channel": "channel-0",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "kichain-t-4"
      },
      {
        "channels": [
          {
            "channel": "channel-28",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "sifchain-testnet-1"
      },
      {
        "channels": [
          {
            "channel": "channel-252",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-256",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-257",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-30",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-38",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-46",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-69",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-93",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-96",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-139",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-162",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-164",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-169",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      },
      {
        "channels": [
          {
            "channel": "channel-208",
            "port": "transfer"
          }
        ],
        "counterparty_chain_id": "test-1"
      }
    ]
  }
}
```

Your final code should look something like this:

```js
import { Client, Wallet, Transaction, Message, Coin, Fee } from "@bandprotocol/bandchain.js"

const { PrivateKey } = Wallet
const client = new Client("<GRPC_WEB>") // ex.https://laozi-testnet4.bandchain.org/grpc-web
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
)
const pubkey = privkey.toPubkey()
const sender = pubkey.toAddress().toAccBech32()

const sendCoinIbc = async () => {
  // Step 1 constructs MsgTransfer message
  const { MsgTransfer } = Message

  const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f"
  const sourcePort = "transfer"
  const sourceChannel = "channel-25"
  const sendAmount = new Coin()
  sendAmount.setDenom("uband")
  sendAmount.setAmount("10")
  const timeoutTimestamp = moment().unix() + 600 * 1e9 // timeout in 10 mins

  const msg = new MsgTransfer(
    sourcePort,
    sourceChannel,
    sendAmount,
    sender,
    receiver,
    timeout_timestamp
  )

  // Step 2 constructs a transaction
  const account = await client.getAccount(sender)
  const chainId = "band-laozi-testnet4"

  let feeCoin = new Coin()
  feeCoin.setDenom("uband")
  feeCoin.setAmount("1000")

  const fee = new Fee()
  fee.setAmountList([feeCoin])
  fee.setGasLimit(1000000)
  const tx = new Transaction()
    .withMessages(msg)
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainId(chainId)
    .withFee(fee)

  // Step 3 sign the transaction
  const txSignData = tx.getSignDoc(pubkey)
  const signature = privkey.sign(txSignData)
  const signedTx = tx.getTxData(signature, pubkey)

  // Step 4 send the transaction
  const response = await client.sendTxBlockMode(signedTx)
  console.log(response)
}

;(async () => {
  await sendCoinIbc()
})()
```

And these are examples of Bandchain.js usages, for more information, feel free to dive into specifications in each module.

[`gettxdata`]: /client-library/bandchain.js/transaction.html#gettxdata-signature-publickey
[`getsigndoc`]: /client-library/bandchain.js/transaction.html#getsigndoc
[`getchainid`]: /client-library/bandchain.js/client.html#getchainid
[`getaccount`]: /client-library/bandchain.js/client.html#getaccount-address
[`withsender`]: /client-library/bandchain.js/transaction.html#withsender-client-sender
[`msgrequestdata`]: /client-library/protocol-buffers/oracle-module.html#msgrequestdata
[`msgsend`]: https://docs.cosmos.network/master/modules/bank/03_messages.html
[`transaction`]: /client-library/bandchain.js/transaction.html#transaction-module
[`account`]: https://docs.cosmos.network/v0.44/basics/accounts.html
[`sendtxblockmode`]: /client-library/bandchain.js/client.html#sendtxblockmode-txbytes
[`sendtxsyncmode`]: /client-library/bandchain.js/client.html#sendtxsyncmode-txbytes
[`sendtxasyncmode`]: /client-library/bandchain.js/client.html#sendtxasyncmode-data
[`privatekey`]: /client-library/bandchain.js/wallet.html#privatekey
[`client`]: /client-library/bandchain.js/client.html#client-module
[`coin`]: https://docs.cosmos.network/v0.44/core/proto-docs.html#coin
[`address`]: /client-library/bandchain.js/wallet.html#address
[`getreferencedata`]: /client-library/bandchain.js/client.html#getreferencedata-pairs-mincount-askcount
[`sign`]: /client-library/bandchain.js/wallet.html#sign-msg
[`ibc`]: /whitepaper/cosmos-ibc.html
[`msgtransfer`]: https://docs.cosmos.network/master/modules/bank/03_messages.html
