<!--
order: 3
-->

# Supported Price Data

Anyone interested in requesting price data from the Standard Dataset can query the list of symbols supported by the Standard in two main ways:

- through the Standard Dataset Explorer at [data.bandprotocol.com](https://data.bandprotocol.com)
- through our REST endpoint

## Standard Dataset Explorer

For the most up to date list of symbols that we support, please see [data.bandprotocol.com](https://data.bandprotocol.com)

![data.bandprotocol.com homepage](https://i.imgur.com/xjKNh20.png)

The index page shows a list of all of the symbols we currently support, currently divided into three main categories:

- Foreign Exchange Rates
- Commodities
- Cryptocurrencies

![data.bandprotocol.com symbol page top part](https://i.imgur.com/itfr62b.png)

For each token, we also show the latest price retrieved as part of a data request on BandChain. In addition to the final price, the aggregated price for each of the data sources we pulled from are also visible. Finally, you can also view the individual data response returned by each validator selected for the data request by hovering your mouse over the **16 Validators** link.

![data.bandprotocol.com symbol page middle part](https://i.imgur.com/wZOw9qi.png)

The page also shows information regarding the chains on which the specific symbol is available, along with a link to a guide on how to integrate the price into your smart contract and front-end applications.

![data.bandprotocol.com symbol page bottom part](https://i.imgur.com/YmCLHf4.png)

The status for the price feed (the update interval, deviation update threshold, 24hr average deviation, and average update interval) is shown at the bottom of the page. Finally, the 24-hour on-chain historical price data for the token, as well as the deviation history is also available to view as a plot.

## REST API Endpoint

Alternatively, the list of supported tokens can also be retrieved using our API endpoint

| Network |                                   API Endpoint                                   |
| ------- | :------------------------------------------------------------------------------: |
| Mainnet | `https://api-gm-lb.bandchain.org/oracle/price_symbols?ask_count=16&min_count=10` |


This should give you a result similar to:

```json
{"height":"1130356","result":[
    "2KEY",
    "ABYSS",
    "ADA",
    "AKRO",
    "ALGO",
    "AMPL",
    "ANT",
    "AST",
    "ATOM",
    "AUD",
    "BAL",
    "BAND",
    ...
}
```

where `height` is the BandChain block height at which the list is queried, and `result` the list of tokens currently supported.
