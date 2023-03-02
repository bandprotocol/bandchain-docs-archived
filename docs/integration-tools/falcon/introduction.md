<!--
order: 1
-->

# Introduction

As the blockchain industry continues to evolve, the importance of interoperability and connectivity between different blockchain networks has become increasingly clear. While Cosmos and BandChain are two prominent players in this space, it's important to recognize the value that other chains can bring to the table.

The Falcon program is designed to enable secure and efficient cross-chain communication between different blockchain networks. It achieves this by requesting data from BandChain, and then sending the data along with the proof to the other chain.

By using Falcon, any smart contract developers can easily integrate data from BandChain into their applications and services, enabling a more seamless and interconnected blockchain ecosystem. This can unlock new use cases and applications, and provide users with access to a wider range of data from BandChain.

### Workflow

The Falcon program consists of three key components, trigger, band, and relayer that work together to enable secure cross-chain communication. The first component is the Trigger, which can be set to initiate the 'band' requester at specified intervals or under specified conditions. The Band Requester component queries data from BandChain and its proof. Finally, The Relayer component then securely relays the data to other chains, such as EVM chains. Together, these components provide a comprehensive and secure solution for cross-chain communication and data exchange.

![falcon-bz drawio](https://user-images.githubusercontent.com/54426055/222410609-1e11f43f-8301-4866-94d8-4dbc46b7d024.png)

At a high level, the workflow will be as follows.
