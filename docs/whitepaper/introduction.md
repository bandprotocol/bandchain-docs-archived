<!--
order: 1
-->
# Introduction

The majority of existing smart contract platforms, while supporting trustless executions of arbitrary programs, lack access to real-world data. This limitation hinders the maximum potential of such contracts. BandChain was created to solve this issue by connecting public blockchains with these real-world, off-chain information. The project was created with the following design goals:

1. **Speed and Scalability:** The system must be able to serve a large quantity of data requests to multiple public blockchains with minimal latency and while maintaining a high throughput. The expected response time must be in the order of seconds.

2. **Cross-Chain Compatibility:** The system must be blockchain-agnostic and able to serve data to most publicly available blockchains. Verification of data authenticity on the target blockchains must be efficient and trustless by nature.

3. **Data Flexibility:** The system must be generic and able to support different methods of retrieiving and aggregating data, including both permissionless, publicly available data as well as information guarded by centralized parties.

BandChain achieves the aforementioned goals with a blockchain specifically built for off-chain data curation. The blockchain supports generic data requests and on-chain aggregations with WebAssembly-powered oracle scripts. Oracle results on BandChain blockchain can be sent across to other blockchains via the [Inter-Blockchain Communication protocol (IBC)](https://cosmos.network/ibc/) or through customized one-way bridges with minimal latency.
