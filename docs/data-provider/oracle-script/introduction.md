# Introduction

When someone wants to request data from BandChain’s oracle, they do not interact or call the data sources directly. Instead, they call the corresponding oracle script, which then proceeds to execute the necessary data sources. The reason for this decoupling of data source and oracle script is threefold. Moreover, the oracle script behaves like a smart contract on platforms such as Ethereum, Near, Solana, etc, meaning that the oracle scripts will only be executed on-chain. Therefore, the oracle script has a different role to the data source, where the data source operates off-chain to reduce chain's workload while the oracle script is responsible for compiling results from data sources to enable on-chain security.

![img](https://miro.medium.com/max/1400/1*UJSjoqOm60FBgin4JcXClw.png)

#### Oracle Script Specification

The oracle script itself is an executable program that encodes two pieces of data:

- the set of raw data requests to the sources it needs
- the way to aggregate raw data reports into the final result

The sources mentioned above can be any data sources published on the network. Oracle scripts themselves are Turing complete and can be written in any programming language that supports compilation into WebAssembly code. This composability and Turing-completeness make oracle scripts very similar to smart contracts.

#### Oracle Script Execution Flow

![img](https://miro.medium.com/max/4800/1*GR7a6v9mXyDp_on4LFSdNg.png)

1. **Preparation Phase**
   In the preparation phase, the script outlines the data sources that are required for its execution. It then sends out a request to BandChain’s validators to retrieve the result from those data sources. The contents of this request consist of the data sources’ execution steps and the parameters required by said data sources.
2. **Aggregation Phase**
   In the second phase, the oracle script then aggregates all of the data reports returned by the validators. Each report contains the values the validator received from the said data sources. The script then proceeds to combine those values into a single final result.
   Note that the specifics of the aggregation process is entirely up to the design of the oracle script. BandChain does not enforce any regulations regarding the aggregation method used and entirely leaves that design decision to the creator of the script. Instead of a typical plain medianizer, dApps can specifically encode conditions such as data deviation rule to ensure all data points return stay within certain percentage deviation from each other, otherwise reverts transaction.

   👉 For more information on oracle scripts and its execution, please refer to the corresponding page on our [**wiki**](https://github.com/bandprotocol/bandchain/wiki/System-Overview#oracle-data-request).
