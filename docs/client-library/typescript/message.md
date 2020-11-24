# Message Module

Message to be included in [`<Transaction>`]

---

## MsgRequest()

#### Constructor

- **oracleScriptID** `<number>` Can't be less than 0.
- **calldata** `<Buffer>` Size is limited to 256.
- **minCount** `<number>` Minimum is 1.
- **askCount** `<number>` Can't be less than `min_count`.
- **clientID** `<string>` Length is limited to 128.
- **sender** [`<Address>`]

#### Exceptions

| Type  | Description                                                        |
| ----- | ------------------------------------------------------------------ |
| Error | oracleScriptID cannot less than zero                               |
| Error | oracleScriptID is not an integer                                   |
| Error | too large calldata                                                 |
| Error | askCount is not an integer                                         |
| Error | minCount is not an integer                                         |
| Error | invalid minCount, got: minCount: \${minCount}                      |
| Error | invalid askCount got: minCount: ${minCount}, askCount: ${askCount} |

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

## MsgSend()

#### Constructor

- **toAddress** [`<Address>`]
- **fromAddress** [`<Address>`]
- **amount** [`<[Coin]>`](/client-library/typescript/data.html)

#### Exceptions

| Type  | Description            |
| ----- | ---------------------- |
| Error | Expect at least 1 coin |

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

## MsgDelegate()

#### Constructor

- **delegatorAddress** [`<Address>`]
- **validatorAddress** [`<Address>`]
- **amount** [`<Coin>`]

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

[`<transaction>`]: /client-library/typescript/transaction.html "Transaction"
[`<client>`]: /client-library/typescript/client.html "Client"
[`<msg>`]: /client-library/typescript/message.html "Message"
[`<address>`]: /client-library/typescript/wallet.html "Address"
[`<publickey>`]: /client-library/typescript/wallet.html "PublicKey"
[`<coin>`]: /client-library/typescript/data.html "Coin"
