# Data Module

## Account

| Attribute     | Type           |
| ------------- | -------------- |
| address       | [`Address`]    |
| coins         | list([`Coin`]) |
| publicKey?    | object         |
| accountNumber | number         |
| sequence      | number         |

## BlockHeaderInfo

| Attribute          | Type                   |
| ------------------ | ---------------------- |
| chainID            | string                 |
| height             | number                 |
| time               | Timestamp              |
| lastCommitHash     | HexBytes(Buffer alias) |
| dataHash           | HexBytes(Buffer alias) |
| validatorsHash     | HexBytes(Buffer alias) |
| nextValidatorsHash | HexBytes(Buffer alias) |
| consensusHash      | HexBytes(Buffer alias) |
| appHash            | HexBytes(Buffer alias) |
| lastResultsHash    | HexBytes(Buffer alias) |
| evidenceHash       | HexBytes(Buffer alias) |
| proposerAddress    | HexBytes(Buffer alias) |

## BlockHeader

| Attribute | Type                |
| --------- | ------------------- |
| header    | [`BlockHeaderInfo`] |

## BlockID

| Attribute | Type                   |
| --------- | ---------------------- |
| hash      | HexBytes(alias Buffer) |

## Block

| Attribute | Type            |
| --------- | --------------- |
| block     | [`BlockHeader`] |
| blockID   | [`BlockID`]     |

## Coin

| Attribute | Type   |
| --------- | ------ |
| amount    | number |
| denom     | string |

## DataSource

| Attribute   | Type    |
| ----------- | ------- |
| owner       | Address |
| name        | string  |
| description | string  |
| filename    | string  |

## OracleScript

| Attribute     | Type    |
| ------------- | ------- |
| owner         | Address |
| name          | string  |
| description   | string  |
| filename      | string  |
| schema        | string  |
| sourceCodeUrl | string  |

## RawRequest

| Attribute    | Type   |
| ------------ | ------ |
| dataSourceID | number |
| externalID   | number |
| calldata     | Buffer |

## Request

| Attribute           | Type                          |
| ------------------- | ----------------------------- |
| oracleScriptID      | number                        |
| requestedValiDators | list(string)                  |
| minCount            | number                        |
| requestHeight       | number                        |
| rawRequests         | [`RawRequest`](#rawrequest)[] |
| clientID            | str                           |
| calldata            | bytes                         |

## RawReport

| Attribute  | Type   |
| ---------- | ------ |
| externalID | number |
| data       | bytes  |

## Report

| Attribute       | Type                        |
| --------------- | --------------------------- |
| valiDator       | string                      |
| rawReports      | [`RawReport`](#rawreport)[] |
| inBeforeResolve | bool                        |

## RequestPacketData

| Attribute      | Type   |
| -------------- | ------ |
| oracleScriptID | number |
| askCount       | number |
| minCount       | number |
| clientID       | string |
| calldata       | bytes  |

## ResponsePacketData

| Attribute     | Type   |
| ------------- | ------ |
| requestID     | number |
| requestTime   | number |
| resolveTime   | number |
| resolveStatus | string |
| ansCount      | bytes  |
| clientID      | string |
| result        | bytes  |

## Result

| Attribute          | Type                   |
| ------------------ | ---------------------- |
| requestPacketData  | [`RequestPacketData`]  |
| responsePacketData | [`ResponsePacketData`] |

## RequestInfo

| Attribute | Type         |
| --------- | ------------ |
| request   | [`Request`]  |
| reports   | [`Report`][] |
| result?   | [`Result`]   |

## TransactionSyncMode

| Attribute | Type                   |
| --------- | ---------------------- |
| txHash    | HexBytes(Buffer alias) |
| code      | number                 |
| errorLog? | string                 |

## TransactionAsyncMode

| Attribute | Type                   |
| --------- | ---------------------- |
| txHash    | HexBytes(Buffer alias) |

## TransactionBlockMode

| Attribute | Type                   |
| --------- | ---------------------- |
| height    | number                 |
| txHash    | HexBytes(Buffer alias) |
| gasWanted | number                 |
| gasUsed   | number                 |
| code      | number                 |
| log       | object[]               |
| errorLog? | string                 |

[`address`]: /client-library/bandchain.js/wallet.html "Address"
[`request`]: #request "Request"
[`report`]: #report "Report"
[`result`]: #result "Result"
[`requestpacketdata`]: #requestpacketdata "RequestPacketData"
[`responsepacketdata`]: #responsepacketdata "ResponsePacketData"
[`blockheader`]: #blockheader "BlockHeader"
[`blockid`]: #blockid "BlockID"
[`blockheaderinfo`]: #blockheaderinfo "BlockHeaderInfo"
[`coin`]: #coin "Coin"
