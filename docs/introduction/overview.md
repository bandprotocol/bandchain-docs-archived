<!--
order: 1
-->

# High-Level Overview

[Band Protocol](https://bandprotocol.com) is a cross-chain data oracle that aggregates and connects real-world data and APIs to smart contracts.

The protocol is built on top of [BandChain](https://cosmoscan.io), a Cosmos-SDK based blockchain designed to be compatible with most smart contract and blockchain development frameworks.

The network is designed to modularize and offload the heavy and resource-intensive tasks (i.e. fetching data from external sources aggregating them) from the smart contract platforms onto itself. This not only prevent such tasks from congesting or causing high transaction fees on the destination network, but the same data points can be packaged, used, and verified efficiently across multiple blockchains.

Its flexible design allows developers to query any range of data types including both on-chain data (token balances, transaction data, etc.), real-world events (sport scores, flight status, weather, etc.), and any data that is available through the web or any other mediums (stocks/token prices, random numbers, etc.)

Since the [launch of our GuanYu mainnet](https://medium.com/bandprotocol/bandchain-phase-1-successful-mainnet-upgrade-and-guanyu-launch-ac2d0334da77) back in October 2020, we have seen exponential increase in adoption in diverse array of use cases. From applications in lending, money markets, gambling, asset and tokenization, to both on-chain and real-world insurance.

With the **Phase 2 (Laozi) upgrade**, we aim to further expand the scope of what is possible with our oracle through multiple ways. Two in particular includes the option for data providers to receive payment directly on-chain from developers using their services on BandChain, and allowing for cross-chain oracle request through the [Inter-Blockchain Communication (IBC)](https://docs.cosmos.network/master/ibc/overview.html) standard.

The new feature also enables a new cohort of products and services that Band oracle can provide to developers. Some examples of these are a more decentralized price oracle, verifiable randomness, and facilitating cross-chain communication.
