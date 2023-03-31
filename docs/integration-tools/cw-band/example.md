<!--
order: 3
-->

# Example Use Cases

As you can request any oracle script in BandChain from your CosmWasm contract. it opens the opportunity for getting any data from the real world such as crypto prices, stock prices, and weather data. Please see the examples of CosmWasm contracts that requests data from BandChain below.

---

### Pricefeed

This price feed contract is an example of getting crypto prices from BandChain using the push model to allow other contracts can read the latest prices and execute actions in one transaction.

**Requirements:**

- Can trigger function to request new crypto prices from BandChain. (Execute `Request`)
- Able to query the price of a symbol in the USD unit. (Query `GetRate`)
- Able to query the price of a symbol in any unit. (Query `GetReferenceData`)
- Able to bulk query the price of symbols in any unit. (Query `GetReferenceDataBulk`)

You can see the full implementation of the contract [here](https://github.com/bandprotocol/cw-band/tree/main/contracts/price-feed)

### Lottery

Lottery dApp is one of the use cases that can do with CW-Band using the pull model to get the winning number when it reaches the end of the period to find the winner.
