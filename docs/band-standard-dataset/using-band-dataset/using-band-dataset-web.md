<!--
order: 3
-->

# Using the Dataset in the Frontend

As of version `1.2.0`, our [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) NodeJS now exposes a new method, `getReferenceData`. This function takes one argument, a list of token pairs to query the result of. It then returns a list of corresponding rate values.

## Example Usage

Install `@bandprotocol/bandchain.js`:

NPM

```bash
npm install --save @bandprotocol/bandchain.js
```

Yarn

```bash
yarn add @bandprotocol/bandchain.js
```

The code below then shows an example usage of the function

```js
const { Client } = require('@bandprotocol/bandchain.js');

// BandChain REST Endpoint
const endpoint = 'https://api-gm-lb.bandchain.org';
const client = new Client(endpoint);

async function exampleGetReferenceData() {
  const rate = await client.getReferenceData(['BTC/USD', 'BTC/ETH', 'EUR/USD', 'EUR/ETH']);
  return rate;
}

(async () => {
  console.log(await exampleGetReferenceData());
})();
```

The corresponding result will then be similar to

```json
[ 
  { pair: 'BTC/USD',
    rate: 19085.940000000002,
    updatedAt: { base: 1607925656, quote: 1607925768 },
    requestID: { base: 262419, quote: 0 } 
  },
  { pair: 'BTC/ETH',
    rate: 32.615658983296,
    updatedAt: { base: 1607925656, quote: 1607925656 },
    requestID: { base: 262419, quote: 262419 } 
  },
  { pair: 'EUR/USD',
    rate: 1.213305,
    updatedAt: { base: 1607925232, quote: 1607925768 },
    requestID: { base: 262332, quote: 0 } 
  },
  { pair: 'EUR/ETH',
    rate: 0.0020733975964887215,
    updatedAt: { base: 1607925232, quote: 1607925656 },
    requestID: { base: 262332, quote: 262419 } 
  } 
]
```

For each pair, the following information will be returned:

- `pair`: The base/quote symbol pair string
- `rate`: The resulting rate of the given pair
- `updatedAt`: When the base/quote symbol was last updated on BandChain
- `requestID`: The ID of the data request on BandChain where the base/quote token price was updated
