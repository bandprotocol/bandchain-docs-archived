<!--
order: 1
-->

# Introduction

A data source is the most fundamental unit in BandChain's oracle system. At the simplest level, it is an executable
that describes the procedure to retrieve raw data points from a set of primary sources and the fee associated with one
data query.

The execution takes place off-chain in order to reduce on-chain workloads as some tasks cannot be performed
on the chain because they require heavy computation or may have network latency and those can decrease performance of
the chain.

These primary sources can either be a traditional API or any other source that returns the desired result.

![](https://i.imgur.com/IaMeqI7.png)

Since BandChain phase 2, we support both permissionless and private APIs, where we introduced an automated and
seamless fee collection service for data source providers to generate revenue.

Permissionless APIs are openly available to anyone who might want to audit the data source, any
subsequent oracle scripts that depend on it, or the actual application that requests the oracle script itself. This
openness helps build the trustworthiness of each of those components, which is ultimately what we are looking to do.

Band Protocol works closely with all data source owners, whether they are public, private, or under paywalls to ensure
high quality of data, 100% uptime, and unlimited access for anyone looking to integrate Band oracles.
