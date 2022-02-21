<!--
order: 2
-->

# Data Module

This module is to construct the data in term of dataclass to make sure that all the input and output follow this data schema.

Although there are Protobuf classes, some types are not exists. Therefore, additional types of data will be declared here.

> Note that `base` and `quote` is the first and the second price symbols respectively e.g. BTC/USD price rate has a base of BTC and a quote of USD.

## ReferenceDataUpdated

| Attribute | Type    | Description          |
| --------- | ------- | -------------------- |
| base      | integer | Base's resolve time  |
| quote     | integer | Quote's resolve time |

## ReferenceDataRequestID

| Attribute | Type    | Description        |
| --------- | ------- | ------------------ |
| base      | integer | Base's request ID  |
| quote     | integer | Quote's request ID |

## ReferenceData

| Attribute | Type                     | Description                   |
| --------- | ------------------------ | ----------------------------- |
| pair      | string                   | The token pair e.g. "BTC/USD" |
| rate      | float                    | Price rate                    |
| updatedAt | [ReferenceDataUpdated]   | Price update time             |
| requestId | [ReferenceDataRequestID] | OracleRequest ID              |

### Syntax

```js
(method) Client.getReferenceData(pairs: string[], minCount: number, askCount: number): Promise<Data.ReferenceData[]>
```

### Example

```js
import { Client, Data } from "@bandprotocol/bandchain.js"

async function getReferenceData() {
  const grpcEndpoint = ${GRPC_ENDPOINT}
  const client = new Client(grpcEndpoint)
  const data = await client.getReferenceData(["BTC/USD", "ETH/BTC"], 3, 4)
  console.log(typeof data) // Promise<Data.ReferenceData[]>
}
```

[referencedataupdated]: #referencedataupdated "ReferenceDataUpdated"
[referencedatarequestid]: #referencedatarequestid "ReferenceDataRequestID"
