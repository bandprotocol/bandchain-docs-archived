<!--
order: 2
-->

# Using the Dataset in Smart Contracts

## Prerequisite Readings

- [Supported Blockchains](../supported-blockchain.md) {prereq}

For EVM-compatible chains, we've deployed a new `StdReference` contract. This contract exposes two functions: `getReferenceData` and `getRefenceDataBulk`.

## Functions

### getReferenceData

`getReferenceData` takes two strings as inputs; the base and quote symbol of the pair you want to query. It then retrieves the latest updated price of those two tokens, and returns the result as a `ReferenceData` struct, shown below.

```js
struct ReferenceData {
    uint256 rate; // base/quote exchange rate, multiplied by 1e18.
    uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
    uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
}
```

### getReferenceDataBulk

`getReferenceDataBulk` instead takes two lists, one of the `base` tokens, and one of the `quotes`. It then proceeds to similarly queries the price for each base/quote pair at each index, and returns an array of `ReferenceData` structs.

For example, if we call `getReferenceDataBulk` with `['BTC','BTC','ETH']` and `['USD','ETH','BAND']`, the returned `ReferenceData` array will contain information regarding the pairs:

- `BTC/USD`
- `BTC/ETH`
- `ETH/BAND`

## Example Usage

The contract code below demonstrates a simple usage of the new `StdReference` contract and the `getReferenceData` / `getReferenceDataBulk` functions.

```js
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

interface IStdReference {
    /// A structure returned whenever someone requests for standard reference data.
    struct ReferenceData {
        uint256 rate; // base/quote exchange rate, multiplied by 1e18.
        uint256 lastUpdatedBase; // UNIX epoch of the last time when base price gets updated.
        uint256 lastUpdatedQuote; // UNIX epoch of the last time when quote price gets updated.
    }

    /// Returns the price data for the given base/quote pair. Revert if not available.
    function getReferenceData(string memory _base, string memory _quote)
        external
        view
        returns (ReferenceData memory);

    /// Similar to getReferenceData, but with multiple base/quote pairs at once.
    function getRefenceDataBulk(string[] memory _bases, string[] memory _quotes)
        external
        view
        returns (ReferenceData[] memory);
}

contract DemoOracle {
    IStdReference ref;

    uint256 public price;

    constructor(IStdReference _ref) public {
        ref = _ref;
    }

    function getPrice(string memory base, string memory quote) external view returns (uint256){
        IStdReference.ReferenceData memory data = ref.getReferenceData(base,quote);
        return data.rate;
    }

    function getMultiPrices() external view returns (uint256[3] memory){
        string[] memory baseSymbols = new string[](3);
        baseSymbols[0] = "BTC";
        baseSymbols[1] = "BTC";
        baseSymbols[2] = "ETH";

        string[] memory quoteSymbols = new string[](3);
        quoteSymbols[0] = "USD";
        quoteSymbols[1] = "ETH";
        quoteSymbols[2] = "BAND;

        IStdReference.ReferenceData[] memory data = ref.getRefenceDataBulk(baseSymbols,quoteSymbols);

        uint256[] memory prices = new uint256[](3);
        prices[0] = data[0].rate;
        prices[1] = data[1].rate;
        prices[2] = data[2].rate;

        return prices;
    }

    function savePrice(string memory base, string memory quote) external {
        IStdReference.ReferenceData memory data = ref.getReferenceData(base,quote);
        price = data.rate;
    }
}
```

This contract has 3 main functions to show the different general ways that the `StdReference` contract might be used.

### getPrice

### getMultiPrice

### savePrice
