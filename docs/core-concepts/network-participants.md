## Network Participants

BandChain's network consists of a number of network participants, each owning BAND tokens. In the Laozi mainnet, these participants can be broken down into three main groups; validators, delegators, and data providers.

### Validators

Validators are responsible for performing two main functions on the network.
First, they are responsible for proposing and committing new blocks to the blockchain. They participate in the block consensus protocol by broadcasting votes which contain cryptographic signatures signed by each validator's private key. This is similar to most other Cosmos-based delegated proof-of-stake blockchains.

Each validator will have a certain amount of BAND tokens bonded to them. The source of these tokens can either be their own holdings, or the tokens delegated to them by other token owners. In most cases, there will be a large number of parties with tokens staked to them. In that case, the top 100 validator candidates with the most token staked to them will become BandChain’s validators.

The role the validators described above is similar to those of validators on many other Cosmos-based blockchains. In addition, most transactions supported by BandChain (asset transfer, staking, slashing, etc.) are also derived from Cosmos-SDK.

What makes BandChain unique, and the origin of the validators' second duty, is the chain's capability to natively support external data query. This role will be further explore in the Oracle Data Request Flow section.

### Delegators

The second main group of participants are then the individual BAND token holders. On BandChain, BAND holders do not stake their tokens directly, but delegate holdings to a validator. This allows token holders who don't want to set up a validator node to participate in staking rewards.

### Data Providers

Finally, the Laozi upgrade introduces a new third kind of participant in the BandChain network: data providers.

With the introduction of on-chain payments, API or data providers can now monetize their data and services directly on BandChain. This new flexibility benefits the network in multiple ways.

Data providers now have a new medium to collect revenue from. As the fees are collected per-query, the revenue that they stand to collect will scale alongside the adoption and usage of BandChain and our oracle as a whole.

The option for data providers to monetize their services directly on-chain will also bring official support for premium and paid data sources onto BandChain. This will allow any developer building on BandChain to access a much wider array of providers and data types they can choose from, enabling BandChain oracle infrastructure to power a much wider range of applications and services.
