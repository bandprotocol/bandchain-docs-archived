<!--
order: 2
-->

# The Need for Oracles

Smart contracts are undoubtedly great at immutable storage and verifiable transactions. However, their use cases have previously been quite restricted.The main reason for this is that **most blockchains are not aware of anything going on in the real world**, nor can they access any data not native to the chain itself.

![Smart Contracts](https://i.imgur.com/eHE62rd.png)

This includes any data available on the traditional web, as well as those accessible through APIs. When you start to consider just how much of the tools we use today depends on those data, the problem becomes quite apparent. And while there have been a multitude of efforts to solve this issue, most if not all have come to meet at least one of three main limitations.

![Smart Contract Limitations](https://i.imgur.com/bwc5A2p.png)

First, they are typically **centralized by design**. This not only goes against the ideology of decentralization and trustlessness, but also represents a severe potential security flaw. Relying on a central authority to report data means that you are exposing yourself to the possibility of data manipulation or outages, both of which can have catastrophic implications on any services that depends on it, not to mention on the end users themselves.

Secondly, many of them are **constrained by network congestion**. This is mostly the result of the solution being on the same blockchain as the application itself. Thus if the blockchain’s network were to become full with pending transactions, the data request transaction themselves will also be delayed.

Finally, they are **expensive**. This comes from both the cost to research, develop, and deploy the solution, as well as the various costs associated with operating and maintaining it in the long run.

With all of these limitations, this is where data oracles come in.
