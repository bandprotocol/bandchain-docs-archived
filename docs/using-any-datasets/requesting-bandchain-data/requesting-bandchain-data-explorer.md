<!--
order: 2
-->

# Requesting Data via Devnet Explorer

One way that you can request data from BandChain is using our provided [Cosmoscan Devnet Explorer](https://guanyu-devnet.bandchain.org). In this section we will show an example of using the explorer to make a simple request for the current price of a stock.

## Visit the Explorer

![Devnet Cosmoscan Explorer Homepage](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OTHap8MRsEGUAK6VG%2Fimage.png?alt=media&token=10fd8cd5-283b-41e1-a6a8-a813b2ff1956)

First, navigate to our devnet explorer at [https://guanyu-devnet.cosmoscan.io/](https://guanyu-devnet.cosmoscan.io/). There, you will find various information about BandChain. We will however be mainly focusing on the **Oracle Scripts** tabs on the top left corner.

## Select an Oracle Scipt

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OThF9cZW9uwijBKwe%2Fimage.png?alt=media&token=59311a4c-3d67-40ea-863c-92baf0688542)

On the Oracle Script page, you will see a list of all the oracle scripts currently available on BandChain. BandChain's devnet comes with many oracle scripts, some of which are listed on in this guide. In this example, we'll be using the [Yahoo stock price oracle script](https://guanyu-devnet.cosmoscan.io/oracle-script/12).

## Execute the Oracle Script

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OV2UwY4uqxPXpJDFI%2Fimage.png?alt=media&token=2a4b1d64-3f11-4d87-91eb-a9e7430900c6)

On the oracle script's page, you will see various tabs containing information related to the  script, including:

- its execution parameters
- its [Owasm](./../technical-specifications/owasm.md) code
- its Bridge code to encode and decode the script's input and output structs
- a history of all the requests that was made to this script

We will proceed with execute tab to create our first data request to BandChain.

## Specifying the Request Parameters

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OVHi9JumgeTWLaS4r%2Fimage.png?alt=media&token=ee014aed-4477-426e-9b3d-2d07f5629c70)

Under Execute tab, we can specify the execution parameters for our request. In this case, we will specify `GOOGL` (Google stock ticker) as the symbol and `1` as the multiplier.

## Sending the Request

![](https://gblobscdn.gitbook.com/assets%2F-LygSKDB1DKREreTLDro%2F-M8OHcqtuP2n5hY_boPH%2F-M8OVZzqBd7UV4NXZOVQ%2Fimage.png?alt=media&token=2e33ab2b-11e5-49cc-afb8-9c7a5ed38756)

Once we have input the parameters, we then hit the Request button. The explorer will take care of sending the message to BandChain.

Once the validators have retrieved the information and the final result is stored on BandChain, the explorer will show the transaction hash of the request, the final result (1420), as well as the proof of validity.

The proof of validity is what we will need  in order to use this result in the smart contract. To copy it, simply press the **Copy as bytes** button at the bottom of the page.
