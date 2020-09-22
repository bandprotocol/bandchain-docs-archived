# Using BandChain Data in EVM Smart Contract

## Example Contract

Now that we know how to make a request to BandChain and retireve the corresponding proof, we will now examine how we can use that proof in our smart contract.

The code below demonstrates an example contract that retrieves the latest price of Bitcoin from Band's bridge contract and saves it onto the contract's state.

```sol
pragma solidity 0.6.11;
pragma experimental ABIEncoderV2;

import {Obi} from "./libraries/Obi.sol";
import {IBridge} from "./interfaces/IBridge.sol";
import {IBridgeCache} from "./interfaces/IBridgeCache.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract SimplePriceDB {
    using SafeMath for uint256;
    using ResultDecoder for bytes;
    using ParamsDecoder for bytes;

    IBridge bridge;
    IBridge.RequestPacket req;

    uint256 public price;

    constructor(IBridge bridge_) public {
         bridge = bridge_;

        req.clientId = "from_scan";
        req.oracleScriptId = 76;
        // {symbol:"BTC"}
        req.params = hex"00000003425443";
        req.askCount = 4;
        req.minCount = 4;
    }


    // getPrice fetches the latest BTC/USD price value from the bridge contract and saves it to state.
    function getPrice() public {
       (IBridge.ResponsePacket memory res,) = bridge.getLatestResponse(req);
        ResultDecoder.Result memory result = res.result.decodeResult();
        price = result.px;
    }
}
```

Let’s break down the code into sections.

### Imports

```sol
import {Obi} from "./libraries/Obi.sol";
import {IBridge} from "./interfaces/IBridge.sol";
import {IBridgeCache} from "./interfaces/IBridgeCache.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
```

Aside from OpenZeppelin's [`SafeMath.sol`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/math/SafeMath.sol), the contract we will be writing requires three helper files specific to Band’s oracle and bridge architecture: `Obi.sol`, `Decoders.sol`, and `IBridgeWithCache.sol`.

#### Obi.sol

This contains a set of function to help serialized and deserialize binary data when interacting with the BandChain ecosystem. The full standard specificationcan be found on their wiki and the code on the [BandChain repository](https://github.com/bandprotocol/bandchain/blob/master/bridges/evm/contracts/obi/Obi.sol).

#### Decoders.sol

This is what we will use to work with data related to requests made on BandChain. This will help us in extracting the various information, such as the price value, we may need from the request response from Band’s oracle. The file is available from an oracle script’s bridge code tab on the devnet explorer. For this particular example, the code is available [here](https://guanyu-devnet.cosmoscan.io/oracle-script/76#bridge).

#### IBridgeCache.sol

The interface file for Band’s bridge contract. The code for this can also be found on the BandChain [repository](https://github.com/bandprotocol/bandchain/blob/master/bridges/evm/contracts/IBridgeCache.sol).

### Contract

```sol
contract SimplePriceDB {
    using SafeMath for uint256;
    using ResultDecoder for bytes;
    using ParamsDecoder for bytes;

    IBridge bridge;
    IBridge.RequestPacket req;

    uint256 public price;

    constructor(IBridge bridge_) public {
         bridge = bridge_;

        req.clientId = "from_scan";
        req.oracleScriptId = 76;
        // {symbol:"BTC"}
        req.params = hex"00000003425443";
        req.askCount = 4;
        req.minCount = 4;
    }


    // getPrice fetches the latest BTC/USD price value from the bridge contract and saves it to state.
    function getPrice() public {
       (IBridge.ResponsePacket memory res,) = bridge.getLatestResponse(req);
        ResultDecoder.Result memory result = res.result.decodeResult();
        price = result.px;
    }
}
```

The contract itself can then be futher broken down into two parts: the constructor and the main `getPrice` function.

#### Contract Constructor

```sol
constructor(IBridge bridge_) public {
     bridge = bridge_;

    req.clientId = "from_scan";
    req.oracleScriptId = 76;
    // {symbol:"BTC"}
    req.params = hex"00000003425443";
    req.askCount = 4;
    req.minCount = 4;
}
```

The contract’s constructor takes one argument, the address of the bridge contract. It then sets the various fields of the req RequestPacket variable. This req variable will be what we will use as the key to match and retrieve the price from the bridge contract. Specifically, in this case, we set req to have the following parameters.

- `bridge`: the address of Band's bridge contract on the blockchain this example contract is deployed to. See this [list](./supported-blockchains.md) for the chains that Band currently supports and corresponding contract addresses.
- `clientId` (`"from_scan"`): the unique identifier of this oracle request, as specified by the client
- `oracleScriptId` (`76`): The unique identifier number assigned to the oracle script when it was first registered on Bandchain.
- `params` (`hex"00000003425443"`): The data passed over to the oracle script for the script to use during its execution. In this case, it is hex representation of the OBI-encoded request struct{"symbol":"BTC"}
- `minCount` (`4`): The minimum number of validators necessary for the request to proceed to the execution phase
- `askCount` (`4`): The number of validators that are requested to respond to this request

#### getPrice Function

```sol
// getPrice fetches the latest BTC/USD price value from the bridge contract and saves it to state.
function getPrice() public {
   (IBridge.ResponsePacket memory res,) = bridge.getLatestResponse(req);
    ResultDecoder.Result memory result = res.result.decodeResult();
    price = result.px;
}
```

This is then the main function that we will use to fetch the price from Band’s bridge contract and save it into our price database contract’s state. It calls the bridge contract’s getLatestResponse to retrieve the latest request response associated with a BTC/USD price request. It then uses Decoders.sol's decodeResult method to parse that response into a struct. Finally, we save the price value from that response into the contract’s price variable.
