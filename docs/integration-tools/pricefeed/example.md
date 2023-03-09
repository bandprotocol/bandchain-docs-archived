<!--
order: 3
-->

# Example Use Cases

By utilizing pricefeed module in your cosmos-sdk application, you have the ability to request price data from BandChain via IBC. This creates a chance to obtain a variety of real-world data, including cryptocurrency and stock prices. Please take a look at the following example of an oracle-consumer chain that requests data from BandChain for use in their module.


---

### oracle-consumer

The oracle-consumer is an application of the Cosmos SDK that demonstrates the use of the [pricefeed-module](https://github.com/bandprotocol/oracle-consumer/tree/main/docs/x/pricefeed.md) implemented by BandProtocol. This module allows other Cosmos SDK applications to easily obtain data from BandChain through IBC.

**Requirements:**
oracle-consumer is built on the Cosmos SDK using the following modules:
- `x/consumer`: Consume data from pricefeed module.
- `x/pricefeed`: Logic of requesting data from BandChain.

You can see the full implementation of the oracle-consumer chain [here](https://github.com/bandprotocol/oracle-consumer)
