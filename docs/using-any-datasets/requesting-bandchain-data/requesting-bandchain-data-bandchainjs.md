<!--
order: 3
-->

# Requesting Data Using the BandChain.JS Library

In your dApp, you wouldn't want the user to request data from the explorer. To assist with that, BandChain also provide the [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) JavaScript library so developers can submit data requests right from their dApp client.

Once BandChain has successfully executed the requested oracle script, it will return the data and proof payload back to the client to then be passed to your smart contracts.

## Example Script

To show an example requesting data using the library, we will write a simple Node file that queries the current Bitcoin price (`BTC`) from BandChain. The full code is shown below.

```javascript
const BandChain = require('@bandprotocol/bandchain.js');
const { Obi } = require('@bandprotocol/obi.js');

const endpoint = 'http://guanyu-devnet.bandchain.org/rest';

const getBTCPrice = async () => {
  // Instantiating BandChain with REST endpoint
  const bandchain = new BandChain(endpoint);

  // Create an instance of OracleScript with the script ID
  const oracleScript = await bandchain.getOracleScript(76);

  // Create a new request, which will block until the tx is confirmed
  try {
    const minCount = 3;
    const askCount = 4;
    const mnemonic =
      'panther winner rain empower olympic attract find satoshi meadow panda job ten urge warfare piece walnut help jump usage vicious neither shallow mule laundry';
    const requestId = await bandchain.submitRequestTx(
      oracleScript,
      {
        symbol: 'BTC',
      },
      { minCount, askCount },
      mnemonic
    );

    // Get final result (blocking until the reports & aggregations are finished)
    const finalResult = await bandchain.getRequestResult(requestId);
    let result = new Obi(oracleScript.schema).decodeOutput(
      Buffer.from(finalResult.response_packet_data.result, 'base64')
    );
    console.log('RequestID: ' + requestId);
    console.log(result);
  } catch {
    console.error('Data request failed');
  }
};

getBTCPrice();
```

Going through each section of the code:

## Import the Library and Declare the Necessary Variables

```js
const { Obi } = require('@bandprotocol/obi.js');
const BandChain = require('@bandprotocol/bandchain.js');
```

The code requires two libraries

- [`@bandprotocol/obi.js`](https://www.npmjs.com/package/@bandprotocol/obi.js): a helper library to assist us when encoding/decoding data to/from Band Protocol’s OBI standard
- [`@bandprotocol/bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js): the library that we’ll be using to make the queries to BandChain

## Setting the Request Parameters

```js
// BandChain devnet endpoint URL
const endpoint = 'http://guanyu-devnet.bandchain.org/rest';
// Mnemonic of the account to make the query from.
const mnemonic =
  'panther winner rain empower olympic attract find satoshi meadow panda job ten urge warfare piece walnut help jump usage vicious neither shallow mule laundry';

// Request parameters
const bandchain = new BandChain(endpoint);
const oracleScript = await bandchain.getOracleScript(76);
const minCount = 3;
const askCount = 4;
```

Here we set the values that we will be using to make the request

- `endpoint`: the endpoint we will make the query to
- `mnemonic`: the mnemonic we will use to make the query. The associated account must have a balance to make a request
- `bandchain`: contains the necessary functions we’ll need to make the request
- `oracleScript`: object containing details of the oracle script we will be querying
- `minCount`: the minimum number of BandChain’s validators that responds for us to consider the request successful
- `askCount`: the maximum number of validators that we want to respond to the request

## Making the Oracle Request and Getting the Results

```js
const requestId = await bandchain.submitRequestTx(
  oracleScript,
  {
    symbol: 'BTC',
  },
  { minCount, askCount },
  mnemonic
);

// Get final result (blocking until the reports & aggregations are finished)
const finalResult = await bandchain.getRequestResult(requestId);
let result = new Obi(oracleScript.schema).decodeOutput(
  Buffer.from(finalResult.response_packet_data.result, 'base64')
);
console.log('RequestID: ' + requestId);
console.log(result);
```

Finally, we execute the `submitRequestTx` member function of the previously declare `bandchain` object to make the oracle data request.

We can then do one of two things with regards to this request:

- Call `getRequestResult`, as we did here, to get the actual result of the request
- Call `getRequestProof` to get the proof bytes associated with the request

Both of these functions take in one argument, the requestID of the request you want to retrieve the result/proof from.

If the query is successful, the code should print a value similar to: `{ price: 11406282500000n }`, which is the retrieved price of Bitcoin multiplied by 1 billion.
