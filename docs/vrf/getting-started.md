# Getting started with Band VRF

This guide serves as a quick reference on how to request random data from the Band VRF. For a detailed reference with examples, please refer to the [VRF Integration](/vrf/vrf-integration.html) section.

### Step 1: Prepare a VRF consumer contract

1. Create a VRF consumer contract that can call the `requestRandomData` function on the `VRFProvider` contract.
2. Implement a callback function on the VRF consumer contract, which allows the `VRFProvider` contract to call back and execute some logic against the returned result.

### Step 2: Choose a resolving method

There are currently 3 methods for relaying and resolving the VRF request:

- **Band's VRF worker solution** - We provide both standard and customized solutions for all clients. Please <a href="mailto:bd@bandprotolcol.com?subject=Request for Band's VRF worker solution"> Email Us </a> for more details.
- **Manually resolve on CosmoScan** - This is an ideal and low cost solution for one-off Band VRF requests. Please refer to this [guide](/vrf/vrf-integration.html#manually-request-and-resolve) for how to resolve manually.
- **Implement your own resolver bot** - Anyone can implement their own version of resolver bot. An open-source version of Band's VRF worker bot will be available soon.

### Step 3: Request a random value

You are now ready to request a random value from the Band VRF.

A summary of the Band VRF process is outlined below:

1. Simply call the request function on you VRF consumer contract that implements the `requestRandomData` function in Step 1, providing a `seed` and an optional `msg.value`.
2. Depending on the resolving method chosen in Step 2, the request is sent to the BandChain.
3. The VRF oracle script on the BandChain forwards the request to a randomly chosen data source, and then retrieves the returned result and the corresponding proof of authenticity.
4. Depending on the resolving method chosen in Step 2, the proof is relayed to the `Bridge` contract for verification on the client chain via the `VRFProvider` contract.
5. If the verification succeeds, the result (random value) is returned to the VRF consumer contract via the callback function mentioned in Step 1.
