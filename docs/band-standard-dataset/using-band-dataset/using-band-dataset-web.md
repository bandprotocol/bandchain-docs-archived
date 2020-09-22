<!--
order: 3
-->

# Using the Dataset in the Frontend

As of version `1.1.3`, our [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) NodeJS now exposes a new method, `getReferenceData`. This function takes one argument, a list of token pairs to query the result of. It then returns a list of corresponding rate values.

## Example Usage

Install `@bandprotocol/bandchain.js`:

```bash
npm install --save @bandprotocol/bandchain.js
```

The code below then shows an example usage of the function

```js
const BandChain = require("@bandprotocol/bandchain.js");

(async () => {
  // BandChain proof-of-authority Mainnet REST endpoint
  const endpoint = "https://poa-api.bandchain.org";

  const bandchain = new BandChain(endpoint);
  const rates = await bandchain.getReferenceData([
    "BTC/USD",
    "BTC/ETH",
    "EUR/USD",
    "EUR/BTC",
  ]);

  console.log(rates);
})();
```

The corresponding result will then be similar to

```bash
$ node index.js
[
  {
    pair: 'BTC/USD',
    rate: 10950.095,
    updated: { base: 1600438887, quote: 0 },
    rawRate: { value: 10950095000000n, decimals: 9 }
  },
  {
    pair: 'BTC/ETH',
    rate: 28.456587837837837,
    updated: { base: 1600438887, quote: 1600438887 },
    rawRate: { value: 28456587837n, decimals: 9 }
  },
  {
    pair: 'EUR/USD',
    rate: 1.184,
    updated: { base: 1600438732, quote: 0 },
    rawRate: { value: 1184000000n, decimals: 9 }
  },
  {
    pair: 'EUR/BTC',
    rate: 0.00010812691579388124,
    updated: { base: 1600438732, quote: 1600438887 },
    rawRate: { value: 108126n, decimals: 9 }
  }
]
```

For each pair, the following information will be returned:

- `pair`: The base/quote symbol pair string
- `rate`: The resulting rate of the given pair
- `updated`: When the base/quote symbol was last updated on BandChain
- `rawRate`: This object consists of two parts
  - `value` is the `BigInt` value of the actual rate, multiplied by `10^decimals`
  - `decimals` is then the exponent by which `rate` was multiplied by to get `rawRate`
