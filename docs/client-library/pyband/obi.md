# OBI Module

Oracle Binary Encoding (OBI) is the standard way to serialized and deserialize binary data in the BandChain ecosystem. This module provides the functionality to serialize data. [More details](/technical-specifications/obi.html)

## Constructor

- **schema** `<str>` The input and output schema.

### Example

```python
from pyband import Obi

obi = PyObi("{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string")
```

---

## encode_input(value)

Encode the input value by using input schema

### Parameter

- value `<Any>` The value to encode

### Return

- `<bytes>` - A encoded value

### Example

```python
from pyband import Obi

obi = Obi("{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string")
test_input = {"symbol": "BTC", "px": 9000, "in": {"a": 1, "b": 2}, "tb": False}

print(obi.encode_input(test_input))
```

### Result

```
000000034254430000000000002328010200
```

---

## encode_output(value)

Encode the output value by using output schema

### Parameter

- value `<Any>` The value to encode

### Return

- `<bytes>` - A encoded value

### Example

```python
from pyband import Obi

obi = Obi("{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string")
test_input = {"symbol": "BTC", "px": 9000, "in": {"a": 1, "b": 2}, "tb": False}

test_output = "test"
print(obi.encode_output(test_output))
```

### Result

```
0000000474657374
```

---

## decode_input(value)

Decode the input value by using input schema

### Parameter

- value `<bytes>` The value to decode

### Return

- `<Any>` - A decoded value

### Example

```python
from pyband import Obi

obi = Obi("{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string")
print(obi.decode_input(bytearray.fromhex("000000034254430000000000002328010200")))
```

### Result

```
{"symbol": "BTC", "px": 9000, "in": {"a": 1, "b": 2}, "tb": False}
```

---

## decode_output(value)

Decode the output value by using output schema

### Parameter

- value `<bytes>` The value to decode

### Return

- `<Any>` - A decoded value

### Example

```python
from pyband import Obi

obi = Obi("{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string")
print(obi.decode_output(bytearray.fromhex("0000000474657374")))
```

### Result

```
test
```

---
