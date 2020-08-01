# Introduction

This document serves as a starting point for developing dApps using Band Protocol data oracle.

⭐️ Want to contribute? Check out our [Github](https://github.com/bandprotocol/bandchain)

💬 Have questions? Talk to us on [Discord](https://100x.band/discord)

🍿 Keep in touch by following us on [Twitter](https://twitter.com/bandprotocol)

## About Band Protocol

[Band Protocol](https://bandprotocol.com) strives to become the go-to decentralized oracle for dApps across multiple blockchain networks by ensuring maximum security, speed, all while maintaining a low cost.

To be secure and useful, it is imperative that smart contracts have access to reliable real-world data. For example, all prominent decentralized finance projects rely on a price oracle to function and receive precise time-sensitive data. Betting dApps determine payouts based on a verifiable random number or real-world event from an oracle. To ensure complete decentralization, there must be a secure bridge between trustworthy off-chain data and dApps.

Although there have been multiple attempts to solve this problem, most projects suffers one of the following pitfalls:

- they are insufficiently decentralized by design
- they are difficult for developers to integrate with
- they lack economic incentive for data providers to sustainably feed high-quality information.

Band Protocol provides a cheaper, faster, and easier-to-integrate decentralized oracle that solves all the problems above.

## Band Protocol v2

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8hO7AADGNuNO2KtFeT%2F-M8hPRIU5yz__G-UTboZ%2FDesktop%20-%2017.png?alt=media&token=e834dcf3-e029-4526-8740-9660eb6da11c)

The initial version of Band Protocol has been released on Ethereum blockchain in September 2019, starting with price feed for decentralized financial applications. While the launch was a great success, the oracle solution we provided were limited to Ethereum ecosystem only. We quickly learned from user feedbacks on the protocol design and quickly iterate toward the next version, which has since become Band Protocol v2.

The majority of existing smart contract platforms, while support trustless executation of arbitrary programs, lack access to real-world data. This renders smart contracts not as useful.

Band Protocol v2 is an ongoing development aiming to provide oracle infrastructure to support multiple blockchain and broaden the use cases of smart contract as a whole. It connects public blockchains with off-chain information, with the following design goals.

- **Speed and Scalability**: The system must be able to serve a large quantity of data requests to multiple public blockchains with minimal latency.
- **Cross-Chain Compatibility**: The system must be blockchain-agnostic platform and can can serve data to all available public blockchains.
- **Data Flexibility**: The system must be generic and able to support different ways to fetch and aggregate data

Throughout this document, you will find information on the current iteration of Band Protocol. Some specific areas are under active research and expected to be changed. We will keep you updated on the major design change on our [official blog posts](https://medium.com/bandprotocol).
