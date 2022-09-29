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
