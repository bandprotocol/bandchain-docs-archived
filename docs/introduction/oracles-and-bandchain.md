# The BandChain Oracle

Oracle solutions such as Band’s **act as the middle layer**, operating between the smart contracts or decentralized applications and the various data sources. Their task is then to handle data requests coming from the dApps, query the data from the corresponding data sources, and report the results back to the application.

![Oracle as the Middle Layer](https://i.imgur.com/p79FDS6.png)

Band’s oracle then differentiate itself from other oracle solutions in four main ways.

## Decentralization

First is decentralization. Our oracle infrastructure is **built for maximum redundancy on two separate layers**. One, our blockchain, BandChain, is operated by a globally distributed pool of validators, whose performance and actions can be easily monitored and verified by anyone.

![Decentralization](https://i.imgur.com/hb4rKU1.png)

When a data request is made, it is these validators that will be responsible for fetching the results. These results reported by the validators are also taken from multiple sources, which acts as our second layer of redundancy. On this point, BandChain’s delegated proof of stake design further help ensure that these validators have monetary incentives to properly and correctly report the data, or risk losing the capital they’ve staked as well as their reputation

Finally, **the entire data request flow and validator performance are publically available to be viewed**, verified, and audited by anyone.

## Flexibility

Next is flexibility. Band’s oracle is built to allow **maximum freedom in terms of the data that can be requested**, as well as the computations and mutations that can be done on that data. This is made possible through our data sources and oracle scripts.

![Flexibility](https://i.imgur.com/HATQRq7.png)

Data sources are the most fundamental unit in BandChain's oracle system. It specifies the primary source from which BandChain’s validators will retrieve data.

An Oracle script is then the pieces of code that defines the logic of the data request. In particular, the script specifies two things:

- the set of data sources that the validators will query data from
- the method in which to aggregate the result from those data sources into the final result

These oracle scripts themselves can be programmed in multiple programming languages, and act very much similar to smart contracts.

## Scalability

Then there’s the benefit of BandChain’s scalability. Unlike general-purpose blockchains, **BandChain is specifically designed for oracle data request and computation**. This is clearly reflected in the the benefits it provides. For one, an average block time of only 3 seconds, compared to Ethereum’s 10-15 and Bitcoin’s 10 minutes means that data request transactions are both received and resolved very quickly.

![Scalability](https://i.imgur.com/Ck58iXa.png)

Not only that, we are also able to **offload all the heavy oracle computations from the requester’s chain and onto BandChain**, which have been specifically optimized for these sorts of computations.

All this boils down to the fact that an average data request to BandChain’s oracle can be expected to resolve in less than 6 seconds.

## Cost

Finally, there’s the issue of cost. Band’s oracle allows anyone looking to request data to do so only when they need to, and pay the associated fees on a per-request basis. This is significantly more economical than having to say, update the price of an entire set of assets when in fact you might currently only need the latest price of one.

![Cost](https://i.imgur.com/S0ZK9JM.png)
