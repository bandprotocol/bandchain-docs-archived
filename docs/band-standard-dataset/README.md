<!--
order: 1
-->

# Introduction

This section introduces our Band Standard Dataset, how we believe it will help developers, and the components behind it. {synopsis}

The Band Standard Dataset introduces a standard for anyone looking to integrate price data from Band's oracle into their applications. The standard itself consists of two components: a new price dataset and our new `StdReference` interface.

The dataset supports a growing set of cryptocurrency tokens, local currency rates, and commodity  prices. The prices are aggregated from reputable crypto price aggregators, crypto exchanges, and premium APIs for foreign exchange rates.

Our new interface then provides developers with a simple and cost-effective method to integrate price data from Band's oracle into their applications.

Smart contracts, backend services, and frontend applications can all effortlessly access exchange rates between any supported symbols, making oracle data more accessible than ever for both traditional and decentralized applications.

## Why Use Band Standard Dataset

### Transparency

For the cryptocurrency data, the price data is calculated by aggregating the result from a number of the mostreputable price aggregators, including

- [CoinGecko](https://coingecko.com)
- [CryptoCompare](https://cryptocompare.com)
- [CoinMarketCap](https://coinmarketcap.com)

Along with that, we also pull the price data directly from major exchanges such as 

- [Binance](https://binance.com)
- [Huobi Pro](https://huobi.com)
- [Coinbase Pro](https://pro.coinbase.com)
- [Kraken](https://kraken.com)
- [Bitfinex](https://bitfinex.com)
- [Bittrex](https://bittrex.com)
- [Bitstamp](https://bitstamp.net)
- [OKEX](https://okex.com)

For the FX and commodity prices, we also aggregate data from premium sources

- [Fixer](https://fixer.io)
- [Open Exchange Rates](https://openexchangerates.org/)
- [XE](https://xe.com)
- [AlphaVantage](https://www.alphavantage.co).

As with all of Band's other offering, the entire data query request associated with the price data is public. This means that information such as where and how the data have been aggregated, how it is relayed into other blockchains, and how they are used are all publicly viewable, auditable, and verifiable by anyone. Anyone looking to do so can view the calculation code or the data request transactions using our [CosmoScan block explorer](https://cosmoscan.io/oracle-script/3)

### Scalability

The dataset will initially consist of the prices of 125 cryptocurrency tokens, as well as various fiat exchange rates and commodities. Going forward, we will continually be adding support for new tokens and data types based on the community's feedback.

For the most recent updated list of supported token, please refer to the [next section](./supported-data.md)

We have also significantly improved the efficiency of relaying data from BandChain into other blockchains. Now, price data in any EVM-compatible chains can be updated to reflect the latest data on BandChain in only one transaction. At the moment, this update is triggered every hour, as we believe this is a reasonable interval for many use cases. However, we will be closely monitoring the demands and feedback from the community and will adjust or increase the update interval as necessary.

### Flexibility

Our new standard allows users to query for the price of multiple token pairs in one transaction. This should help to significantly alleviate the issue of cost if a protocol is looking to expand their token support or to simply utilize prices from more pairs.

And, as will be expanding more below, the standard allows users query any combinations of prices, instead of the traditional `CRYPTO/FIAT` pairing. In the non-`CRYPTO/FIAT` cases , our standard will both help reduce the number of calls required to achieve the desired result while also reducing the complexity of the code brought about by the previously necessary post-query computation.
