<!--
order: 3
-->

# Requesting Data from BandChain

There are two main ways to request data from BandChain. First, requests can be made manually through interacting with our explorer. Alternatively, you can also use our provided developer SDK to request data programmatically.

## Requesting Data via Devnet Explorer

One way that you can request data from BandChain is using our provided [Cosmoscan Devnet Explorer](https://guanyu-devnet.bandchain.org). In this section we will show an example of using the explorer to make a simple request for the current price of a stock.

### Visit the Explorer

![Devnet Cosmoscan Explorer Homepage](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OTHap8MRsEGUAK6VG%2Fimage.png?alt=media&token=10fd8cd5-283b-41e1-a6a8-a813b2ff1956)

First, navigate to our devnet explorer at [https://guanyu-devnet.cosmoscan.io/](https://guanyu-devnet.cosmoscan.io/). There, you will find various information about BandChain. We will however be mainly focusing on the **Oracle Scripts** tabs on the top left corner.

### Select an Oracle Scipt

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OThF9cZW9uwijBKwe%2Fimage.png?alt=media&token=59311a4c-3d67-40ea-863c-92baf0688542)

On the Oracle Script page, you will see a list of all the oracle scripts currently available on BandChain. BandChain's devnet comes with many oracle scripts, some of which are listed on in this guide. In this example, we'll be using the [Yahoo stock price oracle script](https://guanyu-devnet.cosmoscan.io/oracle-script/12).

### Execute the Oracle Script

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OV2UwY4uqxPXpJDFI%2Fimage.png?alt=media&token=2a4b1d64-3f11-4d87-91eb-a9e7430900c6)

On the oracle script's page, you will see various tabs containing information related to the  script, including:

- its execution parameters
- its [Owasm](./../technical-specifications/owasm.md) code
- its Bridge code to encode and decode the script's input and output structs
- a history of all the requests that was made to this script

We will proceed with execute tab to create our first data request to BandChain.

### Specifying the Request Parameters

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OVHi9JumgeTWLaS4r%2Fimage.png?alt=media&token=ee014aed-4477-426e-9b3d-2d07f5629c70)

Under Execute tab, we can specify the execution parameters for our request. In this case, we will specify `GOOGL` (Google stock ticker) as the symbol and `1` as the multiplier.

### Sending the Request

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OVZzqBd7UV4NXZOVQ%2Fimage.png?alt=media&token=2e33ab2b-11e5-49cc-afb8-9c7a5ed38756)

Once we have input the parameters, we then hit the Request button. The explorer will take care of sending the message to BandChain.

Once the validators have retrieved the information and the final result is stored on BandChain, the explorer will show the transaction hash of the request, the final result (1420), as well as the proof of validity.

The proof of validity is what we will need  in order to use this result in the smart contract. To copy it, simply press the **Copy as bytes** button at the bottom of the page.

## Requesting Data Using the BandChain.JS Library

In your dApp, you wouldn't want the user to request data from the explorer. To assist with that, BandChain also provide the [`bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js) JavaScript library so developers can submit data requests right from their dApp client.

Once BandChain has successfully executed the requested oracle script, it will return the data and proof payload back to the client to then be passed to your smart contracts.

### Example Script

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

### Import the Library and Declare the Necessary Variables

```js
const { Obi } = require('@bandprotocol/obi.js');
const BandChain = require('@bandprotocol/bandchain.js');
```

The code requires two libraries

- [`@bandprotocol/obi.js`](https://www.npmjs.com/package/@bandprotocol/obi.js): a helper library to assist us when encoding/decoding data to/from Band Protocol’s OBI standard
- [`@bandprotocol/bandchain.js`](https://www.npmjs.com/package/@bandprotocol/bandchain.js): the library that we’ll be using to make the queries to BandChain

### Setting the Request Parameters

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

### Making the Oracle Request and Getting the Results

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
