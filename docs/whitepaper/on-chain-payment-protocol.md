<!-- order: 10 -->

# On-chain Payment Protocol

In case some oracle scripts make inquiries from premium data sources, parties who make requests to such oracle scripts need to pay additional fees proportional to the fees specifed in those premium data sources. These data sources collect the fee every time a validator comes to ask for oracle data. Hence, final amount of fees a single oracle request needs is the sum of all data source fees corresponding to the requested oracle script multiplied by the number of requested validators.

Since each datasource sets their own fees which can vary, users need to specify a `feeLimit` of each request to prevent any unexpectedly high fee cost when requesting oracle data, together with oracle requests. Fee limit defines the amount of token allowed to be paid for total data source fees corresponding to this request. If the fee limit is less than the total fees, then the request becomes invalid making its transaction fail eventually.

The person paying the fees depends on the origin of the request whether the request is a direct on-chain request or is an IBC request from a counterparty chain. The fee then directly goes to treasury accounts owned by each data source.

## Direct Request

### Direct Request Payment Flow

![onchain-direct](https://i.imgur.com/i0LVLMG.png)

Above is an example of the on-chain payment flow when requesting an oracle data directly on BandChain. A user starts by making an oracle request with a certain oracle script ID and a desired fee limit. Once BandChain receives the request, it fetches the oracle script and calls the preparation step of the oracle script.

After the preparation step is complete, BandChain will obtain all the data sources required for this oracle script. The provided fee limit is used to make sure that the total fee does not exceed the expected price. If the fee limit is not enough, the transaction is reverted. Otherwise, the balance of the user account is deducted by the total fee, and the treasury accounts of the data sources receive funds according to their specified fee timed the number of requested validators.

## IBC request

To make an oracle request via IBC, a communication channel needs to be created between a counterparty chain and BandChain, as stated in [IBC](./cosmos-ibc). The main obstacle when requesting from another chain is that the requester is an address on the other chain which cannot pay the data source fees on BandChain. Therefore, the fees is instead paid by the account of a relayer that the counterparty chain used to send packets.

The relayer account is an address account owned by an entity from another chain since the chain has to be the one managing the relayer. Note that the method by which the users fund the relayer account will totally depend on the protocol of counterparty chains.

### IBC Request Payment Flow

![onchain-ibc](https://i.imgur.com/GJMo8Df.jpg)

Once the relayer account is funded, the payment flow for IBC requests is very similar to that of the direct request. The additional layer is that the flow starts from a user on the counterparty chain. The request is then relayed from the counterparty chain to BandChain via a relayer through a specific port and channel.

After BandChain receives the request via a relayer, the payment flow is almost identical to the payment flow of direct request, except the account used for paying all the fees now is the relayer account.
