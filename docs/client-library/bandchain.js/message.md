<!--
order: 4
-->

# Message Module

Message to be included in [`<Transaction>`]

---

## MsgRequest

Requests a new data based on an existing oracle script. A data request will be assigned a unique identifier once the transaction is confirmed. After sufficient validators report the raw data points. The results of the data requests will be written and stored permanently on BandChain for future uses.

#### Constructor

- **oracleScriptID** `<number>` The unique identifier number assigned to the oracle script when it was first registered on Bandchain. Can't be less than 0.
- **calldata** `<Buffer>` The data passed over to the oracle script for the script to use during its execution. Size is limited to 256.
- **minCount** `<number>` The minimum number of validators necessary for the request to proceed to the execution phase. Minimum is 1.
- **askCount** `<number>` The number of validators that are requested to respond to this request. Can't be less than `min_count`.
- **clientID** `<string>` The unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response.. Length is limited to 128.
- **sender** [`<Address>`] The address of the message's sender.

#### Exceptions

| Type                 | Description                                                  |
| -------------------- | ------------------------------------------------------------ |
| NegativeIntegerError | oracleScriptID cannot less than zero                         |
| NotIntegerError      | oracleScriptID is not an integer                             |
| ValueTooLargeError   | too large calldata                                           |
| NotIntegerError      | askCount is not an integer                                   |
| NotIntegerError      | minCount is not an integer                                   |
| ValueError           | invalid minCount, got: minCount: minCount                    |
| ValueError           | invalid askCount got: minCount: minCount, askCount: askCount |

#### Example

```javascript
import { Message, Data, Wallet } from "bandchain2.js";

const { MsgRequest } = Message;
const { Address } = Wallet;
const { Coin } = Data;

const senderAddr = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
const calldata = Buffer.from("000000034254430000000000000001", "hex");
const memo = "from bandchain.js";

const msgRequest = new MsgRequest(1, calldata, 2, 2, memo, senderAddr);
```

---

## MsgSend

Send \$BAND to desired address.

#### Constructor

- **toAddress** [`<Address>`] The address of the receiver.
- **fromAddress** [`<Address>`] The address of the sender.
- **amount** [`<[Coin]>`](/client-library/bandchain.js/data.html) The amount of \$BAND to be sent.

#### Exceptions

| Type                  | Description            |
| --------------------- | ---------------------- |
| InsufficientCoinError | Expect at least 1 coin |

#### Example

```javascript
import { Message, Data, Wallet } from "bandchain2.js";

const { MsgSend } = Message;
const { Address } = Wallet;
const { Coin } = Data;

const fromAddr = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
const toAddr = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
const coin = new Coin(100000, "uband");

const msgSend = new MsgSend(fromAddr, toAddr, [coin]);
```

---

## MsgDelegate

Delegate \$BAND to the validator to help secure the network and get rewards.

#### Constructor

- **delegatorAddress** [`<Address>`] The address of the delegator.
- **validatorAddress** [`<Address>`] The address of the validator to delegate \$BAND.
- **amount** [`<Coin>`] The amount of \$BAND to be delegated.

#### Example

```javascript
import { Message, Data, Wallet } from "bandchain2.js";

const { MsgDelegate } = Message;
const { Address } = Wallet;
const { Coin } = Data;

const delAddr = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
const valAddr = Address.fromValBech32(
  "bandvaloper1j9vk75jjty02elhwqqjehaspfslaem8pr20qst"
);
const coin = new Coin(100000, "uband");

const msgDelegate = new MsgDelegate(delAddr, valAddr, coin);
```

[`<transaction>`]: /client-library/bandchain.js/transaction.html "Transaction"
[`<client>`]: /client-library/bandchain.js/client.html "Client"
[`<msg>`]: /client-library/bandchain.js/message.html "Message"
[`<address>`]: /client-library/bandchain.js/wallet.html "Address"
[`<publickey>`]: /client-library/bandchain.js/wallet.html "PublicKey"
[`<coin>`]: /client-library/bandchain.js/data.html "Coin"
