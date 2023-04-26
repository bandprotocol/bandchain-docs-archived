<!--
order: 1
-->

# Introduction

As the blockchain industry continues to evolve, the importance of interoperability and connectivity between different blockchain networks has become increasingly clear. While Cosmos is the prominent player in this space, it's important to recognize the value that other chains can bring to the table.

The Falcon program is designed to enable secure and efficient cross-chain communication between different blockchain networks. It achieves this by requesting data from BandChain, and then sending the data along with the proof to the other chain.

By using Falcon, any smart contract developers can easily integrate data from BandChain into their applications and services, enabling a more seamless and interconnected blockchain ecosystem. This can unlock new use cases and applications, and provide users with access to a wider range of data from BandChain.

### Workflow

The Falcon program consists of three key components, trigger, band, and relayer that work together to enable secure cross-chain communication. The first component is the Trigger, which can be set to initiate the 'band' requester at specified intervals or under specified conditions. The Band Requester component queries data from BandChain and its proof. Finally, The Relayer component then securely relays the data to other chains, such as EVM chains. Together, these components provide a comprehensive and secure solution for cross-chain communication and data exchange.

![Falcon_Infographic_Chapter1](https://user-images.githubusercontent.com/54426055/234471438-47b3de9f-4660-4c34-80ae-2d075c92d547.png)

At a high level, the workflow will be as follows. Firstly, when reached the specified condition such as time interval, Trigger will trigger Falcon to request data from BandChain. Then, BandChain will run the Oracle script specified in the request which will get data from the Data sources and return data result along with its proof to Falcon.

After Falcon recieved the result and proof, it will send the data and proof to all other chains' contract that are specified in the Falcon program.

At this point, the smart contract in other chains can verify the proof using the bridge contract provided in that chain. If the proof is correct, the smart contract can trust and use the data.

### Bridge contract

Conceptually, you can think of the Bridge contract as a generic logic that helps verify the availability of any data stored on the BandChain. In order to verify the data's availability, the Bridge contract contains a set of validators of the BandChain, which is used for signature verification when any external actors relay a BandChain's block. After the block relaying is successful (accumulated power of more than 2/3), the rest is the verification of the actual data (leaf) against the root hash. Finally, the result/leaf is extracted and returned to the caller if the data is successfully verified.

#### State

```
    // The encoded chain's ID of Band.
    // This value is only set at the deployment time
    bytes public encodedChainID;



    //============================== Set by the owner ==============================

    struct ValidatorWithPower {
        address addr;
        uint256 power;
    }

    // Mapping from an address to its voting power.
    EnumerableMap.AddressToUintMap private validatorPowers;

    // The total voting power of active validators currently on duty.
    uint256 public totalValidatorPower;

    //============================== Set by the owner ==============================




    //==============================      Public      ==============================

    struct BlockDetail {
        bytes32 oracleState;
        uint64 timeSecond;
        uint32 timeNanoSecondFraction; // between 0 to 10^9
    }

    // Mapping from block height to the struct that contains block time and hash of "oracle" iAVL Merkle tree.
    mapping(uint256 => BlockDetail) public blockDetails;

    //==============================      Public      ==============================
```

#### Functions

The key function of the Bridge contract is relayAndVerify.

The relayAndVerify function is a public function for anyone who wants to relay request data from the BandChain into the Bridge contract. As a result, the relayed and verified data can be used safely by those who wish to consume data from Band oracle.
