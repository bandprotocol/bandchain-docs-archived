<!--
order: 8
-->

# Cosmos IBC Integration

> NOTE: Work in progress

## Prerequisite Readings

- [Whitepaper / Protocol Messages](./protocol-messages.md) {prereq}

## IBC Overview

In addition to our own [lite client protocol](https://github.com/bandprotocol/bandchain/wiki/Lite-Client-Verification), we also allow interaction with our data oracle through Cosmos' [Inter-Blockchain-Communication](https://cosmos.network/ibc/), or IBC, protocol. This allows other IBC-compatible blockchains to request data from BandChain.

## BandChain-Specific IBC Data Packets

### OracleRequestPacketData

This is the data packet that the blockchain looking to send a request to BandChain's oracle must send.

| Parameter      | Type           | Description                                                                                                                                                |
| -------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ClientID       | string         | the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| OracleScriptID | int64          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| Sender         | sdk.AccAddress | The address of the message's sender.                                                                                                                       |
| Calldata       | string         | The data passed over to the oracle script for the script to use during its execution                                                                       |
| AskCount       | int64          | The number of validators that are requested to respond to this request                                                                                     |
| MinCount       | int64          | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |

### OracleResponsePacketData

Subsequently, this is the packet that will be relayed from BandChain back to the requester's chain. It contains information on the response parameters as well as the requested data itself.

| Parameter     | Type   | Description                                                                                                                                                                    |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ClientID      | string | The unique identifier of this oracle request, as specified by the client. This matches the ID stated in the corresponding OracleRequestPacketData                              |
| RequestID     | uint64 | The unique identifier number of the particular request                                                                                                                         |
| AnsCount      | uint64 | The number of validators that answers the request, retrieved the data, and submitted a report                                                                                  |
| RequestTime   | uint64 | The timestamp of when the request was made                                                                                                                                     |
| ResolveTime   | uint64 | The timestamp of when the last validator submitted the report and the request is resolved                                                                                      |
| ResolveStatus | uint8  | The resolve status of the request. See [here](https://github.com/bandprotocol/bandchain/blob/master/chain/x/oracle/types/types.pb.go#L37) for the full list of possible values |
| Result        | []byte | The aggregated value of the results returned by the validators                                                                                                                 |

## Requesting Data from BandChain Oracle using IBC

To make a request to BandChain's oracle using IBC, the module on another IBC-compatible blockchain looking to make the request must generate an [`OracleRequestPacketData`](#oraclerequestpacketdata) data packet to be relayed. Using their chain's IBC module, they must then relay the message through to BandChain's own IBC module, which will proceed to further send it to the chain's `oracle` module. Once the request packet is successfully received, the subsequent flow is the same as how BandChain handles a native [`MsgRequestData`](./protocol-messages.html#msgrequestdata) message type.

Those who are interested in the full oracle data request process should refer to the system overview [section]([./system-overview.html#oracle-data-request)). To summarize, however, the data request flow consists of the following steps:

- Once the transaction resulting from the request is confirmed, the chain’s validators proceed to fetch the requested oracle data from the data sources specified by the requested oracle script
- Each validator selected for the particular request will then proceeed to retrieve data from each of the data source
- If a validator's retrieval is successful, they will submit back a report to BandChain containing the result they received from each of the data source

If the number of validators that managed to successfully submit the report exceeds the `minCount` specified in the `OracleRequestPacketData`, the chain then computes an aggregate final value.

Unlike in the case of a non-IBC data request, this final result is not stored on BandChain, but is instead directly relayed back to the requesting chain and module in the form of a [`OracleResponsePacketData`](#oracleresponsepacketdata) data packet.

As a slight aside, a data request to BandChain generally takes about 20-30 seconds from submitting the initial request until the requester received back the requested result. This is because BandChain's blocktime is set at approximately 2 seconds, and a request and subsequent report message will each take up one block worth of time.

This section presented an overview of how IBC can be used to make an oracle data request on BandChain. For more information on IBC itself, its architecture, and other related topics, please see Cosmos' Interchain Standards [documentation](https://github.com/cosmos/ics).
