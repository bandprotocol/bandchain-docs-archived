<!--
order: 7
-->

# OBI Module

Oracle Binary Encoding (OBI) is the standard way to serialized and deserialize binary data in the BandChain ecosystem. This module provides the functionality to serialize data. [More details](/technical-specifications/obi.html)

## Constructor

- **schema** `<str>` The input and output schema.

### Example

```js
import { Obi } from "bandchain.js";

const obi = new Obi(
  "{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string"
);
```

---

## encodeInput(value)

Encode the input value by using input schema

### Parameter

- value `<any>` The value to encode

### Return

- `<Buffer>` - A encoded value

### Example

```js
import { Obi } from "bandchain.js";

const obi = new Obi(
  "{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string"
);
const testInput = { symbol: "BTC", px: 9000, in: { a: 1, b: 2 }, tb: false };
console.log(obi.encodeInput(testInput));
```

### Result

```
000000034254430000000000002328010200
```

---

## encodeOutput(value)

Encode the output value by using output schema

### Parameter

- value `<any>` The value to encode

### Return

- `<Buffer>` - A encoded value

### Example

```js
import { Obi } from "bandchain.js";

const obi = new Obi(
  "{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string"
);
const testOutput = "test";
console.log(obi.encodeOutput(testOutput));
```

### Result

```
0000000474657374
```

---

## decodeInput(value)

Decode the input value by using input schema

### Parameter

- value `<Buffer>` The value to decode

### Return

- `<any>` - A decoded value

### Example

```js
import { Obi } from "bandchain.js";

const obi = new Obi(
  "{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string"
);
console.log(
  obi.decodeInput(Buffer.from("000000034254430000000000002328010200", "hex"))
);
```

### Result

```
{"symbol": "BTC", "px": 9000, "in": {"a": 1, "b": 2}, "tb": False}
```

---

## decodeOutput(value)

Decode the output value by using output schema

### Parameter

- value `<Buffer>` The value to decode

### Return

- `<any>` - A decoded value

### Example

```js
import { Obi } from "bandchain.js";

const obi = new Obi(
  "{symbol: string,px: u64,in: {a: u8,b: u8}, tb:bool} / string"
);
console.log(obi.decode_output(Buffer.from("0000000474657374", "hex")));
```

### Result

```
test
```

---
