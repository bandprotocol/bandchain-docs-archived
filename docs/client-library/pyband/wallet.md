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

- path `<str>` The HD path that follows the BIP32 standard (optional)

#### Return

- `Tuple[str, <PrivateKey>]` - A tuple of mnemonic phrase and PrivateKey instance

#### Example

```python
from pyband.wallet import PrivateKey

mnemonic, priv = PrivateKey.generate(path="m/44'/494'/0'/0/3")
```

---

<!-- prettier-ignore-start -->
### from\_mnemonic(word, path)
<!-- prettier-ignore-end -->

Create a PrivateKey instance from a given mnemonic phrase and a HD derivation path.

> If path is not given, default to Band's HD prefix 494 and all other indexes being zeroes.

#### Parameter

- words `<str>` The mnemonic phrase for recover private key
- path `<str>` The HD path that follows the BIP32 standard (optional)

#### Return

- `<PrivateKey>` Initialized PrivateKey object

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("test mnemonic")
```

---

<!-- prettier-ignore-start -->
### from\_hex(priv)
<!-- prettier-ignore-end -->

Create a PrivateKey instance from a given a hex representation of signing key.

#### Parameter

- priv `<str>` A hex representation of signing key.

#### Return

- `<PrivateKey>` Initialized PrivateKey object

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_hex("2442b724db7189468f16accc0fc505f0609817eb129e13702e696d8b84609ea9")
```

---

<!-- prettier-ignore-start -->
### to\_hex
<!-- prettier-ignore-end -->

Return a hex representation of signing key.

#### Return

- `<str>` A hex representation of signing key.

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("test mnemonic")
print(priv.to_hex())
```

#### Result

```
2cb2e2d3582cebf0664d9cda0b89c5d478ae12fac19a6f4ed9c10a7406a19615
```

---

<!-- prettier-ignore-start -->
### to\_pubkey
<!-- prettier-ignore-end -->

Return the PublicKey associated with this private key.

#### Return

- `<PublicKey>` A PublicKey that can be used to verify the signatures made with this PrivateKey.

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("test mnemonic")
print(priv.to_pubkey().to_hex())
```

#### Result

```
02b2b0d35cb1c6d3923813c64e46a82d29e12d03288f438b9d3cf232d9a22bcb83
```

---

### sign(msg)

Sign and the given message using the edcsa sign_deterministic function.

#### Parameter

- msg `<bytes>` The message that will be hashed and signed.

#### Return

- `<bytes>` A signature of this private key over the given message

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("test mnemonic")
print(priv.sign(b"test message").hex())
```

#### Result

```
4bbc9a7ea54b47b11c67a4074e8d9bca068cb64c788f67342c4033b1b6f0553e1bc63cdf9bc2fb6e89c1e965c1e0f0712a51c250627282309cd2fccf1470f4f6
```

---

## Public Key

Class for wraping VerifyKey using for signature verification. Adding method to encode/decode to Bech32 format.

<!-- prettier-ignore-start -->
### from\_acc\_bech32(bech)
<!-- prettier-ignore-end -->

Create a PublicKey instance from a bech32-encoded with account public key prefix.

#### Parameter

- bech `<str>` A bech32-encoded with account public key prefix.

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
```

---

<!-- prettier-ignore-start -->
### from\_val\_bech32(bech)
<!-- prettier-ignore-end -->

Create a PublicKey instance from a bech32-encoded with validator public key prefix

#### Parameter

- bech `<str>` A bech32-encoded with validator public key prefix

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_val_bech32("bandvaloperpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q69gsm29")
```

---

<!-- prettier-ignore-start -->
### from\_cons\_bech32(bech)
<!-- prettier-ignore-end -->

Create a PublicKey instance from a bech32-encoded with validator consensus public key prefix

#### Parameter

- bech `<str>` A bech32-encoded with validator consensus public key prefix

#### Return

- `<PublicKey>` - A PublicKey instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_cons_bech32("bandvalconspub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6r8ytws")
```

---

<!-- prettier-ignore-start -->
### to\_hex
<!-- prettier-ignore-end -->

Return a hex representation of verifying key.

#### Return

- `<str>` A hex representation of verifying key.

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
print(publickey.to_hex())
```

#### Result

```
0351e98e1be097250f2ff4188c0aace0a716e69a992cd77f9dfe436b3e8b34280d
```

---

<!-- prettier-ignore-start -->
### to\_acc\_bech32
<!-- prettier-ignore-end -->

Return bech32-encoded with account public key prefix

#### Return

- `<str>` A bech32-encoded with account public key prefix.

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
print(publickey.to_acc_bech32())
```

#### Result

```
bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v
```

---

<!-- prettier-ignore-start -->
### to\_val\_bech32

<!-- prettier-ignore-end -->

Return bech32-encoded with validator public key prefix

#### Return

- `<str>` A bech32-encoded with validator public key prefix.

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
print(publickey.to_val_bech32())
```

#### Result

```
bandvaloperpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q69gsm29
```

---

<!-- prettier-ignore-start -->
### to\_cons\_bech32

<!-- prettier-ignore-end -->

Return bech32-encoded with validator consensus public key prefix

#### Return

- `<str>` A bech32-encoded with validator consensus public key prefix.

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
print(publickey.to_cons_bech32())
```

#### Result

```
bandvalconspub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6r8ytws
```

---

<!-- prettier-ignore-start -->
### to\_address

<!-- prettier-ignore-end -->

Return address instance from this public key

#### Return

- `<Address>` A Address instance.

#### Example

```python
from pyband.wallet import PublicKey

publickey = PublicKey.from_acc_bech32("bandpub1addwnpepqdg7nrsmuztj2re07svgcz4vuzn3de56nykdwlualepkk05txs5q6mw8s9v")
print(publickey.to_address().to_hex())
```

#### Result

```
8bb66ae5bb7e5ce1035557cf1c77430b987683d2
```

---

### verify(msg, sig)

Verify a signature made over provided data.

#### Parameter

- msg `<bytes>` A data signed by the `signature`, will be hashed using sha256 function
- sig `<bytes>` A encoding of the signature

#### Return

- `<bool>` True if the verification was successful

#### Exception

| Type              | Description                              |
| ----------------- | ---------------------------------------- |
| BadSignatureError | if the signature is invalid or malformed |

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("test mnemonic")
pubkey = priv.to_pubkey()
msg = b"test message"
sig = priv.sign(msg)
print(pubkey.verify(msg, sig))
```

#### Result

```
True
```

---

## Address

Class for wraping Address. Adding method to encode/decode to Bech32 format.

<!-- prettier-ignore-start -->
### from\_acc\_bech32(bech)

<!-- prettier-ignore-end -->

Create a Address instance from a bech32-encoded with account prefix.

#### Parameter

- bech `<str>` A bech32-encoded with account prefix.

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import Address

address = Address.from_acc_bech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c")
```

---

<!-- prettier-ignore-start -->
### from\_val\_bech32(bech)

<!-- prettier-ignore-end -->

Create a Address instance from a bech32-encoded with validator prefix

#### Parameter

- bech `<str>` A bech32-encoded with validator prefix

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import Address

address = Address.from_val_bech32("bandvaloper13eznuehmqzd3r84fkxu8wklxl22r2qfm8f05zn")
```

---

<!-- prettier-ignore-start -->
### from\_cons\_bech32(bech)

<!-- prettier-ignore-end -->

Create a Address instance from a bech32-encoded with validator consensus prefix

#### Parameter

- bech `<str>` A bech32-encoded with validator consensus prefix

#### Return

- `<Address>` - A Address instance

#### Exception

| Type       | Description           |
| ---------- | --------------------- |
| ValueError | Invalid bech32 prefix |

#### Example

```python
from pyband.wallet import Address

address = Address.from_cons_bech32("bandvalcons13eznuehmqzd3r84fkxu8wklxl22r2qfmn6ugwj")
```

---

<!-- prettier-ignore-start -->
### to\_hex
<!-- prettier-ignore-end -->

Return a hex representation of Address.

#### Return

- `<str>` A hex representation of Address.

#### Example

```python
from pyband.wallet import Address

address = Address.from_acc_bech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c")
print(address.to_hex())
```

#### Result

```
8e453e66fb009b119ea9b1b8775be6fa9435013b
```

---

<!-- prettier-ignore-start -->
### to\_acc\_bech32
<!-- prettier-ignore-end -->

Return bech32-encoded with account prefix

#### Return

- `<str>` A bech32-encoded with account prefix.

#### Example

```python
from pyband.wallet import Address

address = Address.from_acc_bech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c")
print(Address.to_acc_bech32())
```

#### Result

```
band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c
```

---

<!-- prettier-ignore-start -->
### to\_val\_bech32
<!-- prettier-ignore-end -->

Return bech32-encoded with validator prefix

#### Return

- `<str>` A bech32-encoded with validator prefix.

#### Example

```python
from pyband.wallet import Address

address = Address.from_acc_bech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c")
print(address.to_val_bech32())
```

#### Result

```
bandvaloper13eznuehmqzd3r84fkxu8wklxl22r2qfm8f05zn
```

---

<!-- prettier-ignore-start -->
### to\_cons\_bech32
<!-- prettier-ignore-end -->

Return bech32-encoded with validator consensus prefix

#### Return

- `<str>` A bech32-encoded with validator consensus prefix.

#### Example

```python
from pyband.wallet import Address

address = Address.from_acc_bech32("band13eznuehmqzd3r84fkxu8wklxl22r2qfmtlth8c")
print(address.to_cons_bech32())
```

#### Result

```
bandvalcons13eznuehmqzd3r84fkxu8wklxl22r2qfmn6ugwj
```
