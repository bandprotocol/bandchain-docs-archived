<!--
order: 6
-->

# Wallet Module

This module provides the functionality to control the account.

## Private Key

Class for wrapping SigningKey using for signature creation and public key derivation.

### generate(path)

Generate new private key with random mnemonic phrase.

> If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.

#### Parameter

- path `<string>` The HD path that follows the BIP32 standard (optional)

#### Return

- `[string, <PrivateKey>]` - A tuple of mnemonic phrase and PrivateKey instance

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const [mnemonic, priv] = PrivateKey.generate("m/44'/494'/0'/0/3");
```

---

### fromMnemonic(word, path)

Create a PrivateKey instance from a given mnemonic phrase and a HD derivation path.

> If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.

#### Parameter

- words `<string>` The mnemonic phrase for recover private key
- path `<string>` The HD path that follows the BIP32 standard (optional)

#### Return

- `<PrivateKey>` Initialized PrivateKey object

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromMnemonic("test mnemonic");
```

---

### fromHex(priv)

Create a PrivateKey instance from a given a hex representation of signing key.

#### Parameter

- priv `<string>` A hex representation of signing key.

#### Return

- `<PrivateKey>` Initialized PrivateKey object

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromHex(
  "2442b724db7189468f16accc0fc505f0609817eb129e13702e696d8b84609ea9"
);
```

---

### toHex

Return a hex representation of signing key.

#### Return

- `<string>` A hex representation of signing key.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromMnemonic("test mnemonic");
console.log(priv.toHex());
```

#### Result

```
2cb2e2d3582cebf0664d9cda0b89c5d478ae12fac19a6f4ed9c10a7406a19615
```

---

### toPubkey

Return the PublicKey associated with this private key.

#### Return

- `<PublicKey>` A PublicKey that can be used to verify the signatures made with this PrivateKey.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromMnemonic("test mnemonic");
console.log(priv.toPubkey().toHex());
```

#### Result

```
02b2b0d35cb1c6d3923813c64e46a82d29e12d03288f438b9d3cf232d9a22bcb83
```

---

### sign(msg)

Sign and the given message.

#### Parameter

- msg `<Buffer>` The message that will be hashed and signed.

#### Return

- `<Buffer>` A signature of this private key over the given message

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromMnemonic("test mnemonic");
console.log(priv.sign(Buffer.from("test message")).toString("hex"));
```

#### Result

```
4bbc9a7ea54b47b11c67a4074e8d9bca068cb64c788f67342c4033b1b6f0553e1bc63cdf9bc2fb6e89c1e965c1e0f0712a51c250627282309cd2fccf1470f4f6
```

---

## Public Key

Class for wraping VerifyKey using for signature verification. Adding method to encode/decode to Bech32 format.

### fromAccBech32(bech)

Create a PublicKey instance from a bech32-encoded with account public key prefix.

#### Parameter

- bech `<string>` A bech32-encoded with account public key prefix.

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromAccBech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
```

---

### fromValBech32(bech)

Create a PublicKey instance from a bech32-encoded with validator public key prefix

#### Parameter

- bech `<string>` A bech32-encoded with validator public key prefix

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromValBech32(
  "bandvaloperpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q69gsm29"
);
```

---

### fromConsBech32(bech)

Create a PublicKey instance from a bech32-encoded with validator consensus public key prefix

#### Parameter

- bech `<string>` A bech32-encoded with validator consensus public key prefix

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromConsBech32(
  "bandvalconspub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6r8ytws"
);
```

---

### toHex

Return a hex representation of verifying key.

#### Return

- `<string>` A hex representation of verifying key.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromAccBech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
console.log(publickey.toHex());
```

#### Result

```
0351e98e1be097250f2ff4188c0aace0a716e69a992cd77f9dfe436b3e8b34280d
```

---

### toAccBech32

Return bech32-encoded with account public key prefix

#### Return

- `<string>` A bech32-encoded with account public key prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromAccBech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
console.log(publickey.toAccBech32());
```

#### Result

```
bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v
```

---

### toValBech32

Return bech32-encoded with validator public key prefix

#### Return

- `<string>` A bech32-encoded with validator public key prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromAccBech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
console.log(publickey.toValBech32());
```

#### Result

```
bandvaloperpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q69gsm29
```

---

### toConsBech32

Return bech32-encoded with validator consensus public key prefix

#### Return

- `<string>` A bech32-encoded with validator consensus public key prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.from_acc_bech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
console.log(publickey.toConsBech32());
```

#### Result

```
bandvalconspub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6r8ytws
```

---

### toAddress

Return address instance from this public key

#### Return

- `<Address>` A Address instance.

#### Example

```js
import { Wallet } from "bandchain.js";

const { PublicKey } = Wallet;
const publickey = PublicKey.fromAccBech32(
  "bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v"
);
console.log(publickey.toAddress().toHex());
```

#### Result

```
8bb66ae5bb7e5ce1035557cf1c77430b987683d2
```

---

### verify(msg, sig)

Verify a signature made over provided data.

#### Parameter

- msg `<Buffer>` A data signed by the `signature`, will be hashed using sha256 function
- sig `<Buffer>` A encoding of the signature

#### Return

- `<boolean>` True if the verification was successful

#### Exception

| Type              | Description                              |
| ----------------- | ---------------------------------------- |
| BadSignatureError | if the signature is invalid or malformed |

#### Example

```js
import { Wallet } from "bandchain.js";

const { PrivateKey } = Wallet;
const priv = PrivateKey.fromMnemonic("test mnemonic");
const pubkey = priv.toPubkey();
const msg = Buffer.from("test message");
const sig = priv.sign(msg);
console.log(pubkey.verify(msg, sig));
```

#### Result

```
true
```

---

## Address

Class for wraping Address. Adding method to encode/decode to Bech32 format.

### fromAccBech32(bech)

Create a Address instance from a bech32-encoded with account prefix.

#### Parameter

- bech `<string>` A bech32-encoded with account prefix.

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
address = Address.fromAccBech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c");
```

---

### fromValBech32(bech)

Create a Address instance from a bech32-encoded with validator prefix

#### Parameter

- bech `<string>` A bech32-encoded with validator prefix

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
address = Address.fromValBech32(
  "bandvaloper13eznuehmqzd3r84fkxu8wklxl22r2qfm8f05zn"
);
```

---

### fromConsBech32(bech)

Create a Address instance from a bech32-encoded with validator consensus prefix

#### Parameter

- bech `<string>` A bech32-encoded with validator consensus prefix

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
const address = Address.fromConsBech32(
  "bandvalcons13eznuehmqzd3r84fkxu8wklxl22r2qfmn6ugwj"
);
```

---

### toHex

Return a hex representation of Address.

#### Return

- `<string>` A hex representation of Address.

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
const address = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
console.log(address.toHex());
```

#### Result

```
8e453e66fb009b119ea9b1b8775be6fa9435013b
```

---

### toAccBech32

Return bech32-encoded with account prefix

#### Return

- `<string>` A bech32-encoded with account prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
const address = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
console.log(Address.toAccBech32());
```

#### Result

```
band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c
```

---

### toValBech32

Return bech32-encoded with validator prefix

#### Return

- `<string>` A bech32-encoded with validator prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
const address = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
console.log(address.toValBech32());
```

#### Result

```
bandvaloper13eznuehmqzd3r84fkxu8wklxl22r2qfm8f05zn
```

---

### toConsBech32

Return bech32-encoded with validator consensus prefix

#### Return

- `<string>` A bech32-encoded with validator consensus prefix.

#### Example

```js
import { Wallet } from "bandchain.js";

const { Address } = Wallet;
const address = Address.fromAccBech32(
  "band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c"
);
console.log(address.toConsBech32());
```

#### Result

```
bandvalcons13eznuehmqzd3r84fkxu8wklxl22r2qfmn6ugwj
```
