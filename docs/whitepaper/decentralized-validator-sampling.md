<!--
order: 6
-->

# Decentralized Validator Sampling

## Prerequisite Readings

- [Whitepaper / Terminology](./terminology.md) {prereq}
- [Whitepaper / System Overview](./system-overview.md) {prereq}

## Motivation

When selecting the algorithm to use in selecting validators to respond to oracle data request, there are two mains characteristics that we would like to incorporate.

1. A validator with a higher voting power should have a higher chance of being chosen than one with a lower voting power
2. Every validator should still have a chance to be selected

<!---
## Selection Algorithm

### Selection Space Constraint

Suppose we have ![n](https://latex.codecogs.com/svg.latex?n) validators on BandChain, and an incoming [oracle data request](https://github.com/bandprotocol/bandchain/wiki/System-Overview#oracle-data-request) that specifies a [`minCount`](https://github.com/bandprotocol/bandchain/wiki/Protocol-Messages#msgrequestdata) of ![k](https://latex.codecogs.com/svg.latex?k) validators.

To begin selecting the validators that will respond to the request, we first list out the validators in descending order based on their voting power. *Then*, when selecting the ![r](https://latex.codecogs.com/svg.latex?r)th validator, we constrain the selection space to the first ![y](https://latex.codecogs.com/svg.latex?y) validators out of the ![n](https://latex.codecogs.com/svg.latex?n) total, where ![y](https://latex.codecogs.com/svg.latex?y) for round ![r](https://latex.codecogs.com/svg.latex?r) is defined as

![Equation](https://latex.codecogs.com/svg.latex?y_r=(n-C+1)^{\frac{k-r-1}{k-1}}+C-1)

The result of ![y](https://latex.codecogs.com/svg.latex?y) is then floored is necessary.

A validator's voting power can be seen as a proxy of their quality and trustworthiness as perceived by BandChain's network participants. In this case, since our validators are sorted in descending order based on voting power, the worst possible pick for any round ![r](https://latex.codecogs.com/svg.latex?r) is the ![yr](https://latex.codecogs.com/svg.latex?y_r)th validator in the remaining selection list.

Thus, in order to quickly constrain the selection space to the relatively more trusted set of validators, we use the above exponential-decay equation. The result of this is twofold:

- The more trusted the validator, the longer they will remain in the selection space, and the more likely they are to be chosen.
- Since since the initial reduction in size of the selection space is very significant, the absolute worst-case possible validator pick (e.g. the validator with the lowest voting power out of all ![n](https://latex.codecogs.com/svg.latex?n)) choices is quickly removed from the selection space.

Also, in selecting the first validator, the selection space is the entire list of validators in itself. Thus, every validator has a chance of being picked at some point, and this method of selection satisfies both characteristics we desired.

#### Example

Imagine BandChain's validators consist of 10 nodes. If an oracle data request is submitted with `minCount` (![k](https://latex.codecogs.com/svg.latex?k)) is set at 4. Also, let's assume that ![C](https://latex.codecogs.com/svg.latex?C) is set at 2.

After sorting the validators by voting power, the setup will look as follows:

![Validators](https://i.ibb.co/VpW7Cc7/Untitled.png)

The selection space reduction for each selection round is shown below.

##### Round 1

![Formula Round One](https://latex.codecogs.com/svg.latex?r=0,y_0=(10-2+1)^{\frac{4-0-1}{4-1}}+2-1=10)

![Selection Space Round One](https://i.ibb.co/W0f8TGd/Untitled.png)

##### Round 2

![Formula Round Two](https://latex.codecogs.com/svg.latex?r=1,y_1=(10-2+1)^{\frac{4-1-1}{4-1}}+2-1=5.327)

![Selection Space Round Two](https://i.ibb.co/P6BB4yN/Untitled.png)

##### Round 3

![Formula Round Three](https://latex.codecogs.com/svg.latex?r=2,y_2=(10-2+1)^{\frac{4-2-1}{4-1}}+2-1=3.08)

![Selection Space Round Three](https://i.ibb.co/NVQnCsh/Untitled.png)

##### Round 4

![Formula Round Four](https://latex.codecogs.com/svg.latex?r=3,y_3=(10-2+1)^{\frac{4-3-1}{4-1}}+2-1=2)

![Selection Space Round Four](https://i.ibb.co/wSDqTfs/Untitled.png)
-->

## Validator Selection

Once we have a selection space, we have to select a specific validator from that list. To do this, we make use of a random number generator.

### Random Number and Seed Generation

As with most random number generator, our number generation proces require the use of a [seed](https://en.wikipedia.org/wiki/Random_seed). In this specific case, our seed comprise of two components:

- A list of `blockHashes`
- The requestID of the request the validators are being chosen for

In the case of the list of `blockHashes`, we will use the `blockHashes` of the previous $n$ blocks. We then take $\frac{32}{n}$ bytes from each of the hashes and concatenate them. The purpose of this is so that any potentially malicious validators looking to influence the seed, and in turn the validator selected, through intentionally constructing certain `blockHashes` on the blocks they proposed can only control $\frac{n}{32}$ of the seed. The 8 in the denominator comes from the fact that, once we have the combined `blockHash` portion of the seed, we further concatenate that with the requestID of the current request, which is an 8-byte integer.

### Randomly Selecting a Validator

After we have used our concatenated seed to generate a random number, we then use that value to select the validator for that round.

To do so, we again assume that the validators in the selection space is sorted in descending order. Then, we imagine that we have a cumulative scale running across that list, with the values bei the validator's voting power. With that, the specific range in which our random number falls in along that cumulative scale determine which validator is ultimately chosen for that round. An example of a selection is shown below.

#### Setup

![Random Number Selection](https://i.ibb.co/KwmBGwg/Untitled.png)

#### Selection using a Random Number

![Validator Selection](https://i.ibb.co/wzw7dsB/Selection.png)

## Simulation Statistics

TBA
