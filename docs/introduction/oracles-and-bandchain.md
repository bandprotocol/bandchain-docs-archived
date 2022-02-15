<!--
order: 3
-->

# The BandChain Oracle

BandChain Oracle solution acts as a **middle layer** operating between the smart contracts platforms or decentralized applications and the various data providers. The oracles' task is to 1) handle data requests coming from the dApps, 2) query the data from the corresponding providers, and 3) report the results back to the application.

![Oracle as the Middle Layer](https://i.imgur.com/p79FDS6.png)

Bandchain Oracle differentiates itself from other oracle solutions in four main ways:

1. Decentralization
2. Flexibility
3. Scalability
4. Cost

## Decentralization

Bandchain Oracle is decentralized through the introduction of maximum redundancy **on two separate layers** in the infrastructure design: BandChain validators (consensus level) and data source level.

![Decentralization](https://i.imgur.com/hb4rKU1.png)

First, BandChain is operated by a globally distributed pool of validators, whose performance and actions can be easily monitored and verified by anyone.

When a data request is made, it is these validators that will be responsible for fetching the results.

The results reported by the validators are also taken from multiple data sources, which acts as our second layer of redundancy. Further, BandChain's delegated proof of stake design additionally helps ensure that these validators have monetary incentives to properly and correctly report the data or risk losing the capital they've staked as well as their reputation.

Finally, **the entire data request flow itself are also publically available to be viewed**, verified, and audited by anyone.

## Flexibility

Our data source scripts and oracle scripts allow **maximum customization and flexibility** for the user to query and compute their desired data feed.

![Flexibility](https://i.imgur.com/HATQRq7.png)

Data sources are the most fundamental unit in BandChain's oracle system. It specifies the primary source from which BandChain's validators will retrieve data. Here users can freely select where the data sources come from.

An Oracle script is then the piece of code that defines the logic of the data request. In particular, the script specifies two things:

- the set of data sources that the validators will query data from
- the method in which to aggregate the result from those data sources into the final result

These oracle scripts can be programmed in multiple programming languages and act very similar to smart contracts.

## Scalability

Unlike general-purpose blockchains, **BandChain is designed explicitly for oracle data request and computation**. This is reflected in the benefits it provides.

For one, an average block time of only 3 seconds, compared to Ethereum's 10-15 and Bitcoin's 10 minutes, means that data request transactions are both received and resolved very quickly.

![Scalability](https://i.imgur.com/Ck58iXa.png)

Not only that, but we are also able to **offload all the heavy oracle computations from the requester's chain and onto BandChain**, which have been specifically optimized for these sorts of computations.

All this boils down to the fact that an average data request to BandChain's oracle can be expected to resolve in less than 6 seconds.

This allows BandChain Oracle to continuously upgrade throughput capacity with the same base-level infrastructure.

Having our own chain also means that the oracle core logic and operations do not need to be duplicated onto a new chain or App for each integration, making integration with DApps scalable and streamlined.

## Cost

Finally, there's the issue of cost. Band's oracle allows anyone looking to request data to do so only when they need to and pay the associated fees on a per-request basis. This is significantly more economical than having to, say, update the price of an entire set of assets when in fact, you might currently only need the latest price of one.

![Cost](https://i.imgur.com/S0ZK9JM.png)
