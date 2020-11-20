# Wallet Module

This module provides the functionality to control account.

## generate(path)

Generate new private key with random mnemonic phrase

#### Parameter

- path `str` HD Path (optional)

#### Return

- Tuple(phrase, privateKey) `[str, <PrivateKey>]`

#### Example

```python
from pyband.wallet import PrivateKey

mnemonic, priv = PrivateKey.generate()
print(mnemonic, priv)
```

#### Result

```
// TODO:
```

## from_mnemonic(word, path)

Create PrivateKey instance from mnemonic and path

#### Parameter

- word `str` mnemonic phrase
- path `str` HD Path (optional)

#### Return

- `<PrivateKey>`

#### Example

```python
from pyband.wallet import PrivateKey

priv = PrivateKey.from_mnemonic("asdjasd")
print(priv)
```

#### Result

```
// TODO:
```
