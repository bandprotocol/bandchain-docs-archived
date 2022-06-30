<!--
order: 1
-->

# Introduction

A data source is the most fundamental unit in BandChain's oracle system. At the simplest level, it is an executable
that describes the procedure to retrieve some type of data.

A data source is executed off-chain in order to reduce on-chain workloads as some tasks cannot be 
performed on the chain due to the heavy computation require and/or the network latency associated with running the data 
source which can decrease performance of the chain.

The sources a data source can use can either be a traditional API or any other method that returns the desired result.

![](https://i.imgur.com/IaMeqI7.png)

Permissionless APIs are openly available to anyone who might want to audit the data source, any
subsequent oracle scripts that depend on it, or the actual application that requests the oracle script itself. This
openness helps build the trustworthiness of each of those components, which is ultimately what we are looking to do.
