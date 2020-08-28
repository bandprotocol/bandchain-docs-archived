<!--
order: 7
-->

# Lite Client Protocol

## Prerequisite Readings

- [Whitepaper / System Overview](./system-overview.md) {prereq}
- [Whitepaper / Protocol Messages](./protocol-messages.md) { prereq}

In addition to the native IBC connections, we also provide a lite client for anyone who requested data from our oracle to verify the validity of the result they received. An instance of this client exists on each of the blockchains to which Band has previously integrated.

When someone submits a verification request to our lite client, they must also send in the encoded result they got from our oracle. That result is not just the data they requested, but also contains information on the request itself as well as the associated response. The lite client’s aim is then to use that information to show that the data the user requested exists on BandChain, thus verifying the oracle result’s validity.

The lite client's verification process consists of 3 steps:

1. that the proof received in the request can be used to construct a valid block header
2. that using the constructed block header, it can recover a valid set of validator addresses who signed on the block
3. that those validators have sufficient total voting power relative to the system total

The diagram below illustrates the above steps.

![Lite Client Request Flow](https://miro.medium.com/max/2000/1*ub87xk-eZKIMFPeraEO6ZQ.png)

## Constructing the Block Header from the Oracle Data Proof

The proof that BandChain's oracle returns consists of two main packets of  data: `requestPacket` and `responsePacket`. `requestPacket` encodes the information on the request that was made ,as well as the corresponding parameters.

The `requestPacket` encodes the oracle request sent from other blockchains to BandChain. It contains information such as the identifier of the oracle script requested and the number of validators that are requested to respond to this request, among others. On the other hand, `responsePacket` is the encoded oracle response from BandChain to the requester. This response includes the number of validators that actually responded to the request, the timestamp of when the request was sent and when it was resolved to a final result, along with the actual final result itself if the request was successful. A full and more detailed breakdown of the packets' contents, please see our [GitHub repository](https://github.com/bandprotocol/bandchain/blob/0a99c53aea9da2c1cd9887e07c5c6e6f82fee077/chain/x/oracle/types/types.proto#L188).

The task of the lite client is then to use these two packets to eventually arrive at the block header. The steps that makes up this process are as follows:

- Use the proof sent it to construct the oracle store’s root hash
- Combine the oracle store hash with the hashes of the other stores in our application to compute the appHash
- Finally, use the appHash, in combination with other block information hashes, to compute the blockHash

### Constructing the Oracle Store's Root Hash

#### Oracle Store Tree Contents

BandChain's oracle system resides in an `oracle` [Cosmos module](https://github.com/cosmos/cosmos-sdk/tree/master/x), also the `oracle` store. Each of of these stores can then be represented as an [iAVL tree](https://github.com/tendermint/iavl), where the bottom of these store trees contains the byte representation of the data in that module. In our case of the `oracle` store root, two data pieces that we will be looking at are the `requestPacket` and `responsePacket`.

The `requestPacket` contains information related to the request that the user made to our oracle. Likewise, `responsePacket` stores the information associated with the result, such as the actual number of validators that responded to the request, as well as the actual result value itself.

These two packets are what the lite client returns to the requester upon successful validation. By also returning contextual information on the request and response, in addition to the actual result itself, we aim to give as much information as possible for the user to use in their application or for any further validation they might want to perform.

#### Constructing the oracle store leaf node

Using  `requestPacket` and `responsePacket`, we can combine their hashes to get an intermediary hash value, which we called the `dataHash`. If we then encode and hash this appended by other information such as the version (i.e., the latest block height that the data node was updated), and the request ID of the request, we arrive at the leaf node of the oracle store tree, also known as the `resultHash`

After we have the leaf node, we then need to use that node to gradually climb up the tree to reach the store's root node. To help us do so, we use an additional piece of information in the proof; the `merklePaths`.

#### Computing the oracle store root hash

The `merklePaths` we mentioned is a Merkle proof that shows how the `dataHash` leaf node we just computed is part of the larger oracle tree. The proof's content is the list of "Merkle paths" from the leaf to the root of the tree. We can the use these Merkle paths to compute the parent hash of our `dataHash`. If we then repeat this process, we can gradually climb up the store tree, finally getting the oracle store root hash we want.

### Computing the appHash and the blockHash

After we have the oracle store root hash, we can begin to iteratively combine it with the hashes of the other stores in our application to compute the `appHash`. We can then use that `appHash` to finally compute the `blockHash` using the same method as above.

## Recovering Signer Addresses

After we have constructed a `blockHash`, we can move on to prove its validity by attempting to use it to recover the addresses of the validators who signed on this block using Ethereum’s ecrecover opcode. To ensure that the addresses we extracted are valid, we check to make sure that each address we extract is unique.

As we recover each signer, we also add each extracted validator’s voting power to a counting tally, which we will use later.

## Checking Total Voting Power

Once we have extracted all of the validators and ensure that the extracted order is correct, we proceed to check if the tallied voting power is sufficient; specifically, that the tallied value is at least two-thirds of the system’s total voting power. This threshold check is to ensure that we reach consensus.

If the tallied voting power exceeds the two-third threshold, we have successfully proven that the proof is valid. Our lite client can then decode the result and return it to the requester to either use or further validate themselves.
