# VRF integration

In this section, we will discuss how to integrate your smart contracts with the Band VRF. This section is separated into two sub-sections: **Requesting** and **Resolving**.

Typically, when building on-chain applications that rely on an unpredictable outcome, such as lottery apps or games, the system requires a reliable source of randomness, and that is when the Band VRF comes into play.

---

### Requesting

![img](https://user-images.githubusercontent.com/12705423/192215486-fcf23603-19df-4c04-ab2f-2fa56fc05c53.jpg)

As shown in the VRF workflow, a request and callback model is used to obtain new random data. Two transactions are required in order to complete the process. The first transaction is the transaction that contains a consumer’s request for random data, and the second transaction is the transaction that resolves the request.

Let us assume that you are building an on-chain application that uses the Band VRF as the reliable source of randomness. Your contract(s) must reference the VRF Provider contract in order to request random data.

First, you need an interface for the `VRFProvider` contract.

```solidity
interface IVRFProvider {
    /// @dev The function for consumers who want random data.
    /// Consumers can simply make requests to get random data back later.
    /// @param seed Any string that used to initialize the randomizer.
    function requestRandomData(string calldata seed) external payable;
}
```

Then, the consumer only needs to call `requestRandomData` with a string parameter called `seed`.

**For security reasons, the seed is a generated string on the consumer side.  
Each consumer can use each seed only once because the VRFProvider contract implements a mapping to track used seeds for each consumer address.**

```solidity
// Mapping that enforces the client to provide a unique seed for each request
mapping(address => mapping(string => bool)) public hasClientSeed;
```

For example, let us assume that there are two consumer contracts: *Contract A* and *Contract B*. *Contract A* requests the `VRFProvider` contract with the seed `AAA`, and *Contract B* requests the `VRFProvider` contract with the seed `BBB`. After both requests have been successfully made, *Contract A* can no longer use `AAA` as the seed again. Similarly, *Contract B* can no longer use `BBB` as the seed again. However, *Contract A* can still use `BBB` as the seed, and *Contract B* can still use `AAA` as the seed.

After including the `IVRFProvider`, the consumer can now make a request-call to the VRFProvider contract, as shown in the example implementation below.

```solidity
contract MockVRFConsumer {
    IVRFProvider public provider;

    constructor(IVRFProvider _provider) {
        provider = _provider;
    }

    function requestRandomDataFromProvider(string calldata seed) external payable {
        provider.requestRandomData{value: msg.value}(seed);
    }
}
```

When calling `requestRandomData(seed)`, the consumer can specify `msg.value` to incentivize others to resolve the random data request. However, the consumer can choose not to provide any incentive and resolve the request themselves.

Apart from implementing the request function to the `VRFProvider` contract, the consumer is required to implement a callback function for the `VRFProvider` contract to call back and do something with the random result.

The example below is an implementation that shows how to implement the callback function `consume`.

```solidity
contract MockVRFConsumer {
    IVRFProvider public provider;
    string public latestSeed;
    uint64 public latestTime;
    bytes32 public latestResult;

    constructor(IVRFProvider _provider) {
        provider = _provider;
    }

    function requestRandomDataFromProvider(string calldata seed) external payable {
        provider.requestRandomData{value: msg.value}(seed);
    }

    function consume(string calldata seed, uint64 time, bytes32 result) external override {
        require(msg.sender == address(provider), "Caller is not the provider");

        latestSeed = seed;
        latestTime = time;
        latestResult = result;
    }
}
```

As shown above, the `consume` function implements a logic that verifies whether the caller is the VRFProvider contract or not. This is to ensure that no one can call this function except the VRFProvider contract. With regards to the remaining logic in the example, the callback function only saves the callback data from the VRFProvider contract to its state.

See the deployed contracts [here](/vrf/supported-blockchain)

### Resolving

Anyone can resolve any unresolved requests in the `VRFProvider` contract by tracking the mapping called `tasks` in the `VRFProvider` contract.

The code below is a simplified version of the `VRFProvider` contract that shows what `tasks` looks like.

```solidity
contract VRFProvider {

    struct Task {
        bool isResolved;
        uint64 time;
        address caller;
        uint256 taskFee;
        bytes32 seed;
        string clientSeed;
        bytes proof;
        bytes result;
    }

    uint64 public taskNonce;

    // Mapping from nonce => task
    mapping(uint64 => Task) public tasks;

}
```

When the resolver (this can be a self-implemented worker bot or a bounty hunter) finds an unresolved request, the resolver can resolve it by making a request transaction on the BandChain for the VRF randomness. After the random result is finalized on the BandChain, the resolver can retrieve the proof of inclusion of the result, and then relay the proof via a `relayProof` function on the `VRFProvider` contract. The resolver also needs to specify the nonce of the task that it wants to resolve.

#### Manually request and resolve

This section will demonstrate how to request random data from the VRF provider and then resolve the request manually using [Goerli](https://goerli.etherscan.io/) and [Laozi-Testnet5](https://laozi-testnet5.cosmoscan.io/) UI.

Firstly, go to the [VRF provider contract on Goerli](https://goerli.etherscan.io/address/0xF1F3554b6f46D8f172c89836FBeD1ea8551eabad#readContract) to view some of its configuration.

![img2](https://user-images.githubusercontent.com/12705423/193009074-542be3ea-8b6f-4f12-b96f-1b153afdd2a8.png)

The image above shows three parameters for requesting data on Bandchain: `askCount`, `minCount`, and `oracleScriptID`.

Let's move to the `Write Contract` tab to begin requesting data on the Ethereum side.

<iframe style="width: 100%"  height="400" src="https://www.youtube.com/embed/3ki0LhArdoI" title="Making a request on client chain" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The video above shows that anyone can request Band VRF randomness by calling `requestRandomData` on the VRF provider contract. After the calling is successful, the VRF provider will log some parameters that will be used to make a request on the Bandchain side.

_See the request transaction [here](https://goerli.etherscan.io/tx/0x640425325d7fa5f7b56a9d966f75863a40e8a1139ddf5a77b55a66dd8d03ba46#eventlog)_

![img_task_1](https://user-images.githubusercontent.com/12705423/193093565-bc89e14b-b357-4dda-88f8-788b56c5eff0.png)

The image above shows the current stage of the task/request that we just **created**.

The next step is making a request on Bandchain using those parameters from the previous steps.

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/oxbLmLv_fgQ" title="Use the parameters from the log of the VRF provider to make a request on Bandchain" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In this case, we will go to [oracleScriptID 152 or O152](https://laozi-testnet5.cosmoscan.io/oracle-script/152#execute) and then fill in the `seed`, `time`, `workerAddress`, `minCount`, and `askCount`, as shown in the video above.

_The worker address can be any EOA address that the resolver will use for relaying to resolve the request on the Ethereum side._

The next step is to copy the Merkle proof and then switch back to the Ethereum side to relay the proof on the VRF provider contract.

<iframe style="width: 100%" height="400" src="https://www.youtube.com/embed/uFDPKyerWLY" title="Take the Merkle proof from Band and relay it on the Ethereum side to resolve the request" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

_See the relay transaction [here](https://goerli.etherscan.io/tx/0x5e7d85d4d2cd41b71f3ea35fff2a17dba8d19c085678d6f8dd7e22ca664da9b8#eventlog)_

![img_task_2](https://user-images.githubusercontent.com/12705423/193094318-67cee15a-220d-4122-b7bb-79f64158a0c9.png)

The image above shows the current stage of the task/request that we just **resolved**.
