<!--
order: 1
-->

# Introduction

When someone wants to request data from BandChain’s oracle, they do not interact or call the data sources directly. 
Instead, they call an oracle script, which then proceeds to execute the necessary data sources.

An oracle script's job, unlike a data source, is to be responsible for compiling the results from various data sources
to enable on-chain security. As such, an oracle script, similarly to a smart contract on other platforms such as 
Ethereum, Near and Solana, is executed on-chain rather than off-chain.

![img](https://miro.medium.com/max/1400/1*UJSjoqOm60FBgin4JcXClw.png)

### Oracle Script Specification

At a basic level, an oracle script itself is just an executable program that encodes two pieces of data:

- A set of raw data requests to the data sources it requires
- A method of aggregating those the raw data reports from the requests sent into a final result

Oracle scripts themselves are Turing-complete and can be written in any programming language that supports compilation 
into WebAssembly code. This composability and Turing-completeness make oracle scripts very similar to smart contracts.

### Oracle Script Execution Flow

![img](https://miro.medium.com/max/4800/1*GR7a6v9mXyDp_on4LFSdNg.png)

1. **Preparation Phase**
During the preparation phase, the oracle script outlines the data sources that are required for its execution. It then 
sends out a request to BandChain’s validators to retrieve the result from the required data sources. The content of this 
request consists of the data sources’ execution steps and the parameters required by said data sources.
2. **Aggregation Phase**
During the aggregation phase, the oracle script aggregates all the data reports returned by the validators. Each 
report contains the values which the validator received from said data sources. The script then proceeds to combine 
those values into a single final result. Note that the specifics of the aggregation process is entirely up to the design 
of the oracle script. BandChain does not enforce any regulations regarding the aggregation method used and entirely 
leaves that design decision to the creator of the script. Instead of a typical plain medianizer, the oracle script can 
encode custom conditions such as a data deviation rule to ensure that all data points returned will stay within certain
percentage deviation from each other and to revert the transaction if otherwise.

👉 For more information on oracle scripts and its execution, please refer to the corresponding page on our [**wiki**](https://github.com/bandprotocol/bandchain/wiki/System-Overview#oracle-data-request).
