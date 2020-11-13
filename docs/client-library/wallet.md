# Wallet Module

This module provides the functionality to control account.

## Generate new wallet

Generate new private key with random mnemonic phrase

```python
from pyband.wallet import PrivateKey

mnemonic, priv = PrivateKey.generate()
```
