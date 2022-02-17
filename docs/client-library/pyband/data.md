<!--
order: 2
-->

# Data Module

This module is used to construct the data in term of dataclass to make sure that all the inputs and outputs follow this data schema.

Although there are Protobuf classes, some types do not exists. Therefore, additional types of data will be declared here.

> Note that `base` and `quote` is the first and the second price symbols respectively e.g. BTC/USD price rate has a base of BTC and a quote of USD.

The dataclasses declaration are as follows:

```python
from dataclasses import dataclass


@dataclass
class ReferencePriceUpdated(object):
    base: int
    quote: int


@dataclass
class ReferencePrice(object):
    pair: str
    rate: float
    updated_at: ReferencePriceUpdated

```

## ReferencePriceUpdated

| Attribute | Type    | Description        |
| --------- | ------- | ------------------ |
| base      | integer | Base resolve time  |
| quote     | integer | Quote resolve time |

## ReferencePrice

| Attribute  | Type                  | Description                    |
| ---------- | --------------------- | ------------------------------ |
| pair       | string                | The token pair e.g. "BTC/USDT" |
| rate       | float                 | Price rate                     |
| updated_at | ReferencePriceUpdated | Price updated time             |
