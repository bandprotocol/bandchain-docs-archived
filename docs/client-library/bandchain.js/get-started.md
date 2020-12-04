<!--
order: 1
-->

# Get started

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

### Make a request

We will show you how to make a request by following steps

**Step 1:** Import [`Client`] from pyband and put `rpcURL` as parameter, and initial the client instance, now we can use every medthod on client module.

```js
import { Client } from "bandchain.js";

// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
```

**Step 2:** The sender address is required for sending the transaction, so we have to initial the address first. So we have to import the [`PrivateKey`] from wallet, and get the privatekey, in this example we will get it from our test mnemonic `subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid`

```js
import { Client, Wallet } from "bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
```

After that, we will transform the private key to the public key and then transform again to the address.

```js
import { Client, Wallet } from "bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
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

We will start with the message additional, so we can use [`withMessages`] function, then put the [`MsgRequest`] with params here

- oracleScriptID: the oracle script that we will request
- calldata: the calldata that needs to transform to bytes by using `Buffer.from('...','hex')` function
- askCount: the integer of ask count
- minCount: the integer of min count
- clientID: the string of client id(it can be any text)
- sender: the address that we got from public key transformation

```js
import { Client, Wallet, Transaction, Message } from "bandchain.js";
const { PrivateKey } = Wallet;
const { MsgRequest } = Message;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// Step 3
const makeRequest = async () => {
  const oracleScriptID = 5;
  const calldata = Buffer.from(
    "0000000342544300000003555344000000000000000a",
    "hex"
  );
  const askCount = 16;
  const minCount = 16;
  const clientID = "from_bandchainjs";

  const t = new Transaction().withMessages(
    new MsgRequest(oracleScriptID, calldata, askCount, minCount, clientID, addr)
  );
};
```

About account number and sequence, we recommend to use [`Account`] from [`getAccount`] function
The chain id will be gotten from [`getChainID`] function

All the rest is to optionally add [`withGas`] to increse the gas limit, and [`withMemo`].

Now the transaction is ready to use as the code below.

```js
import { Client, Wallet, Transaction, Message } from "bandchain.js";
const { PrivateKey } = Wallet;
const { MsgRequest } = Message;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// Step 3
const makeRequest = async () => {
  const account = await client.getAccount(addr);
  const chainID = await client.getChainID();
  const oracleScriptID = 5;
  const calldata = Buffer.from(
    "0000000342544300000003555344000000000000000a",
    "hex"
  );
  const askCount = 16;
  const minCount = 16;
  const clientID = "from_bandchainjs";

  const t = new Transaction()
    .withMessages(
      new MsgRequest(
        oracleScriptID,
        calldata,
        askCount,
        minCount,
        clientID,
        addr
      )
    )
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID(chainID)
    .withGas(5000000)
    .withMemo("bandchain.js example");
};
```

**Step 4:** Prepare the ready to send transaction

Call [`getSignData`] to get the transaction object which is ready to sign, then we will get the signature by signing the transaction.

After that, we will get the `raw transaction` by calling [`getTxData`], putting the signature and public key as parameters of this function.

```js
import { Client, Wallet, Transaction, Message } from "bandchain.js";
const { PrivateKey } = Wallet;
const { MsgRequest } = Message;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// Step 3
const makeRequest = async () => {
  const account = await client.getAccount(addr);
  const chainID = await client.getChainID();
  const oracleScriptID = 5;
  const calldata = Buffer.from(
    "0000000342544300000003555344000000000000000a",
    "hex"
  );
  const askCount = 16;
  const minCount = 16;
  const clientID = "from_bandchainjs";

  const t = new Transaction()
    .withMessages(
      new MsgRequest(
        oracleScriptID,
        calldata,
        askCount,
        minCount,
        clientID,
        addr
      )
    )
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID(chainID)
    .withGas(5000000)
    .withMemo("bandchain.js example");
  // Step 4
  const rawData = t.getSignData();
  const signature = privKey.sign(rawData);
  const rawTx = t.getTxData(signature, pubKey);
};
```

**Step 5:** After we got `raw transaction` from the previous step, now we can send the transaction.

There are 3 modes for sending the transaction. We choose to use `block` mode in this example, we can call [`sendTxBlockMode`] with `raw transaction` as param.

The final code should now look like the code below.

```js
import { Client, Wallet, Transaction, Message } from "bandchain.js";
const { PrivateKey } = Wallet;
const { MsgRequest } = Message;
// step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// step 3
const makeRequest = async () => {
  const account = await client.getAccount(addr);
  const chainID = await client.getChainID();
  const oracleScriptID = 5;
  const calldata = Buffer.from(
    "0000000342544300000003555344000000000000000a",
    "hex"
  );
  const askCount = 16;
  const minCount = 16;
  const clientID = "from_bandchainjs";

  const t = new Transaction()
    .withMessages(
      new MsgRequest(
        oracleScriptID,
        calldata,
        askCount,
        minCount,
        clientID,
        addr
      )
    )
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID(chainID)
    .withGas(5000000)
    .withMemo("bandchain.js example");
  // Step 4
  const rawData = t.getSignData();
  const signature = privKey.sign(rawData);
  const rawTx = t.getTxData(signature, pubKey);
  // Step 5
  client.sendTxBlockMode(rawTx).then((e) => console.log(JSON.stringify(e)));
};

(async () => {
  await makeRequest();
})();
```

After, we run `makeRequest` function, the result should look like this.

```json
{
  "height": 2480949,
  "txHash": {
    "type": "Buffer",
    "data": [
      200,
      118,
      1,
      56,
      125,
      233,
      113,
      20,
      15,
      200,
      63,
      241,
      205,
      73,
      250,
      107,
      67,
      73,
      159,
      92,
      203,
      142,
      10,
      66,
      20,
      23,
      49,
      150,
      99,
      131,
      15,
      185
    ]
  },
  "gasWanted": 5000000,
  "gasUsed": 5000000,
  "code": 0,
  "log": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [{ "key": "action", "value": "request" }]
        },
        {
          "type": "raw_request",
          "attributes": [
            { "key": "data_source_id", "value": "4" },
            {
              "key": "data_source_hash",
              "value": "93734983de34865551a03bd5b27c650f6f9496c8eeb25f3b1445ff89d32dbc7b"
            },
            { "key": "external_id", "value": "11" },
            { "key": "calldata", "value": "BTC" },
            { "key": "data_source_id", "value": "5" },
            {
              "key": "data_source_hash",
              "value": "980a7da17f800b5006775a4e907bad29b52b9d9f1370bc7e8c10449dc95f020f"
            },
            { "key": "external_id", "value": "12" },
            { "key": "calldata", "value": "BTC" }
          ]
        },
        {
          "type": "request",
          "attributes": [
            { "key": "id", "value": "494500" },
            { "key": "client_id", "value": "from_bandchainjs" },
            { "key": "oracle_script_id", "value": "5" },
            {
              "key": "calldata",
              "value": "0000000342544300000003555344000000000000000a"
            },
            { "key": "ask_count", "value": "16" },
            { "key": "min_count", "value": "16" },
            { "key": "gas_used", "value": "3130" },
            {
              "key": "validator",
              "value": "bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs"
            },
            {
              "key": "validator",
              "value": "bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm"
            },
            {
              "key": "validator",
              "value": "bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av"
            },
            {
              "key": "validator",
              "value": "bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc"
            },
            {
              "key": "validator",
              "value": "bandvaloper1h54f3tpfrl2gszkpqxmqaurkfkffd2qdrxw8hl"
            },
            {
              "key": "validator",
              "value": "bandvaloper1l6syuchpqj0jku2cswmxd5m8rdlzydcpug29cv"
            },
            {
              "key": "validator",
              "value": "bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn"
            },
            {
              "key": "validator",
              "value": "bandvaloper1egcncstqyhm7njd5mva03lkrdtemmzehda940c"
            },
            {
              "key": "validator",
              "value": "bandvaloper1vqvrrcwqudqqzurxqscdwg8qclad6m959l7mxj"
            },
            {
              "key": "validator",
              "value": "bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn"
            },
            {
              "key": "validator",
              "value": "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa"
            },
            {
              "key": "validator",
              "value": "bandvaloper1u3c40nglllu4upuddlz6l59afq7uuz7lq6z977"
            },
            {
              "key": "validator",
              "value": "bandvaloper1muydxugudsd64w4ng3vylm4gct5qvakjnfgm7x"
            },
            {
              "key": "validator",
              "value": "bandvaloper1n50c9uhawz6s0u5wqfa57qvy2x6kyg933vgkuw"
            },
            {
              "key": "validator",
              "value": "bandvaloper158q56s6zgnk4zf3sz6cz4jmpmxpanhxsfdra05"
            },
            {
              "key": "validator",
              "value": "bandvaloper19gh30we6ypgec5plmnxd7smlqp66hel4lx573n"
            }
          ]
        }
      ]
    }
  ]
}
```

### Send BAND token

We will show you how to send BAND by following steps

**Step 1:** Import [`Client`] from pyband and put `rpcURL` as parameter, and initial the client instance, now we can use every medthod on client module.

```js
import { Client } from "bandchain.js";

// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
```

**Step 2:** The sender address is required for sending the transaction, so we have to initial the address first. So we have to import the [`PrivateKey`] from wallet, and get the privatekey, in this example we will get it from our test mnemonic `subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid`

```js
import { Client, Wallet } from "bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privkey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
```

After that, we will transform the private key to the public key and then transform again to the address.

```js
import { Client, Wallet } from "bandchain.js";
const { PrivateKey } = Wallet;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
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

We will start with the message additional, so we can use [`with_messages`] function, then put the [`MsgSend`] with params here

- fromAddress: the sender address which is in [`Address`]
- toAddress: the receiver address which is in [`Address`] , we can transform from string of address to [`Address`] by calling [`fromAccBech32`] function.
- amount: the amount of BAND in [`Coin`] that you want to send. In this case, we want to send 1 BAND or 1000000 UBAND

```js
import { Client, Wallet, Transaction, Message, Data } from "bandchain.js";
const { PrivateKey, Address } = Wallet;
const { MsgSend } = Message;
const { Coin } = Data;

// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// Step 3
const sendToken = async () => {
  const fromAddress = addr;
  const toAddress = Address.fromAccBech32(
    "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
  );
  const amount = [new Coin(1000000, "uband")];

  const t = new Transaction().withMessages(
    new MsgSend(fromAddress, toAddress, amount)
  );
};
```

**Step 4:** Prepare the ready to send transaction

Call [`getSignData`] to get the transaction object which is ready to sign, then we will get the signature by signing the transaction.

After that, we will get the `raw transaction` by calling [`getTxData`], putting the signature and public key as parameters of this function.

```js
import { Client, Wallet, Transaction, Message, Data } from "bandchain.js";
const { PrivateKey, Address } = Wallet;
const { MsgSend } = Message;
const { Coin } = Data;
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// Step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// Step 3
const sendToken = async () => {
  const account = await client.getAccount(addr);
  const chainID = await client.getChainID();
  const fromAddress = addr;
  const toAddress = Address.fromAccBech32(
    "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
  );
  const amount = [new Coin(1000000, "uband")];

  const t = new Transaction()
    .withMessages(new MsgSend(fromAddress, toAddress, amount))
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID(chainID)
    .withGas(5000000)
    .withMemo("bandchain.js example");
  // Step 4
  const rawData = t.getSignData();
  const signature = privKey.sign(rawData);
  const rawTx = t.getTxData(signature, pubKey);
};
```

**Step 5:** After we got `raw transaction` from the previous step, now we can send the transaction.

There are 3 modes for sending the transaction. We choose to use `block` mode in this example, we can call [`sendTxBlockMode`] with `raw transaction` as param.

The final code should now look like the code below.

```js
import { Client, Wallet, Transaction, Message } from "bandchain.js";
const { PrivateKey, Address } = Wallet;
const { MsgSend } = Message;
const { Coin } = Data;
// step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
// step 2
const privKey = PrivateKey.fromMnemonic(
  "subject economy equal whisper turn boil guard giraffe stick retreat wealth card only buddy joy leave genuine resemble submit ghost top polar adjust avoid"
);
const pubKey = privKey.toPubkey();
const addr = pubKey.toAddress();
// step 3
const sendToken = async () => {
  const account = await client.getAccount(addr);
  const chainID = await client.getChainID();
  const fromAddress = addr;
  const toAddress = Address.fromAccBech32(
    "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
  );
  const amount = [new Coin(1000000, "uband")];

  const t = new Transaction()
    .withMessages(new MsgSend(fromAddress, toAddress, amount))
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID(chainID)
    .withGas(5000000)
    .withMemo("bandchain.js example");
  // Step 4
  const rawData = t.getSignData();
  const signature = privKey.sign(rawData);
  const rawTx = t.getTxData(signature, pubKey);
  // Step 5
  client.sendTxBlockMode(rawTx).then((e) => console.log(JSON.stringify(e)));
};

(async () => {
  await sendToken();
})();
```

The result should look like this.

```json
{
  "height": 2483183,
  "txHash": {
    "type": "Buffer",
    "data": [
      125,
      173,
      55,
      105,
      25,
      0,
      184,
      69,
      184,
      204,
      152,
      191,
      159,
      164,
      41,
      234,
      21,
      144,
      173,
      10,
      132,
      107,
      195,
      105,
      113,
      84,
      205,
      204,
      180,
      131,
      44,
      0
    ]
  },
  "gasWanted": 5000000,
  "gasUsed": 5000000,
  "code": 0,
  "log": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [
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
          "attributes": [
            {
              "key": "recipient",
              "value": "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
            },
            {
              "key": "sender",
              "value": "band168ukdplr7nrljaleef8ehpyvfhe4n78hz0shsy"
            },
            { "key": "amount", "value": "1000000uband" }
          ]
        }
      ]
    }
  ]
}
```

### Get reference data

We will show you how to get the reference data

**Step 1:** Import [`Client`] from pyband and put `RPC_URL` as parameter, and initial the client instance, now we can use every medthod on client module.

```js
import { Client } from "bandchain.js";
// Step 1
const rpcURL = "https://guanyu-testnet3-query.bandchain.org";
const client = new Client(rpcURL);
```

**Step 2:** After we import the [`Client`] already, then we call the [`getReferenceData`] function to get the latest price

There are 3 parameters

- minCount: Integer of min count
- askCount: Integer of ask count
- pairs: The list of cryprocurrency pairs

The final code should look like the code below.

```js
import { Client } from "bandchain.js";
// Step 1
const client = new Client("https://guanyu-testnet3-query.bandchain.org");
// Step 2
const minCount = 10;
const askCount = 16;

const pairs = ["BTC/USDT", "ETH/USDT"];

(async () => {
  console.log(
    JSON.stringify(await client.getReferenceData(pairs, minCount, askCount))
  );
})();
```

The result should look like this.

```python
[
  {
    "pair": "BTC/USDT",
    "rate": 19311.553805658896,
    "updatedAt": { "base": 1607067650, "quote": 1607067650 }
  },
  {
    "pair": "ETH/USDT",
    "rate": 606.4386050528308,
    "updatedAt": { "base": 1607067650, "quote": 1607067650 }
  }
]
```

[`gettxdata`]: /client-library/bandchain.js/transaction.html#get-tx-data-signature-pubkey
[`getsigndata`]: /client-library/bandchain.js/transaction.html#getsigndata
[`getchainid`]: /client-library/bandchain.js/client.html#getchainid
[`getaccount`]: /client-library/bandchain.js/client.html#getaccount-address
[`withgas`]: /client-library/bandchain.js/transaction.html#withgas-gas
[`withmemo`]: /client-library/bandchain.js/transaction.html#withmemo-memo
[`withmessages`]: /client-library/bandchain.js/transaction.html#withmessages-msgs
[`msgrequest`]: /client-library/bandchain.js/message.html#msgrequest
[`msgsend`]: /client-library/bandchain.js/message.html#msgsend
[`transaction`]: /client-library/bandchain.js/transaction.html
[`account`]: /client-library/bandchain.js/data.html#account
[`sendtxblockmode`]: /client-library/bandchain.js/client.html#send-tx-block-mode-data
[`privatekey`]: /client-library/bandchain.js/wallet.html#privatekey
[`client`]: /client-library/bandchain.js/client.html
[`coin`]: /client-library/bandchain.js/data.html#coin
[`address`]: /client-library/bandchain.js/wallet.html#address
[`fromaccbech32`]: /client-library/bandchain.js/wallet.html#from-acc-bech32-bech-2
[`getreferencedata`]: /client-library/bandchain.js/client.html#getreferencedata-pairs-mincount-askcount
