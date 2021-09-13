<!--
order: 4
-->

# Message Module

Messages specified by BandChain. All messages presented in this module are extended from Protobuf's messages, which are generated from these [proto files](https://github.com/bandprotocol/chain/tree/v2.0.3/proto/oracle/v1). For specification can be found [here](https://docs.cosmos.network/v0.44/core/proto-docs.html).

Here are methods that are extended from original protobuf classes.

---

## `toAny`

Returns an Google Protobuf's [`Any`] instance that are used to construct transactions.

### Return

- [`Any`] - a Google Protobuf's `Any` instance containing serialized messaged and type URL

### Example

```js
import { Message, Coin } from "@bandprotocol/bandchain.js";
const { MsgRequestData } = Message;

const sender = "band17n5rmujk78nkgss7tjecg4nfzn6geg4cvaqt5h";
const oracleScriptId = 37;
const calldata = Buffer.from(
  "0000000200000003425443000000034554480000000000000064",
  "hex"
);
const askCount = 4;
const minCount = 3;
const clientId = "from_bandchain.js";
const msg = new MsgRequestData(
  oracleScriptId,
  calldata,
  askCount,
  minCount,
  clientId,
  sender
);

const any = msg.toAny();
console.log(any.getTypeUrl());
console.log(any.getValue_asB64());
```

### Result

```
/oracle.v1.MsgRequestData
CCUSGgAAAAIAAAADQlRDAAAAA0VUSAAAAAAAAABkGAQgAyoRZnJvbV9iYW5kY2hhaW4uanM40IYDQOCnEkorYmFuZDE3bjVybXVqazc4bmtnc3M3dGplY2c0bmZ6bjZnZWc0Y3ZhcXQ1aA==

```

## `validate`

Validates the message in a basic manner to ensure that there are no invarient values stored in the message instance. If message's validation fails, it will throw the exception.

### Example

```js
import { Message, Coin } from "@bandprotocol/bandchain.js";
const { MsgSend } = Message;

const sender = "band17n5rmujk78nkgss7tjecg4nfzn6geg4cvaqt5h";
const receiver = "band1p46uhvdk8vr829v747v85hst3mur2dzlmlac7f";
const sendAmount = new Coin();
sendAmount.setDenom("uband");
sendAmount.setAmount("10");
const msg = new MsgSend(sender, receiver, [sendAmount]);

msg.validate();
```

[`any`]: /client-library/protocol-buffers/any.html
