<!--
order: 2
-->

# Data Module

This module is used to construct the data in term of dataclass that is not generated from the protobuf files. It is used to ensure that all the inputs and outputs are in the correct format.

## ReferencePriceUpdated

| Attribute |  Type   |    Description     |
| :-------: | :-----: | :----------------: |
|   base    | integer | Base resolve time  |
|   quote   | integer | Quote resolve time |

## ReferencePrice

| Attribute  |         Type          |          Description           |
| :--------: | :-------------------: | :----------------------------: |
|    pair    |        string         | The token pair e.g. "BTC/USDT" |
|    rate    |         float         |           Price rate           |
| updated_at | ReferencePriceUpdated |       Price updated time       |
