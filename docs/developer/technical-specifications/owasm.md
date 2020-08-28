<!--
order: 2
-->

# Oracle WebAssembly (Owasm)

Oracle WebAssembly, or Owasm for short, is Band Protocol's  Domain Specific Language (DSL) for writing oracle scripts [oracle scripts](./Terminology#oracle-scripts) to be used in the BandChain ecosystem.

## Owasm Library Structure

The Owasm library consists of two primary modules: `owasm/oei` and `owasm/ext`.

### `Owasm/OEI`

The OEI modules defines a set of functions that are part of the Owasm Oracle Environment Interface. These functions are then accessible to an oracle script during its execution.

#### OEI Module Functions

##### `getAskCount() -> i64`

GetAskCount returns the number of validators asked to work for this oracle query.

Returns:

- `askCount: i64` - The requested validator count.

##### `getMinCount() -> i64`

GetMinCount returns the minimum number of validators to move to aggregation phase.

Returns:

- `minCount: i64` - The sufficient validator count.

##### `getAnsCount() -> i64`

GetAnsCount returns the number of validators that submit answers. Zero during preparation.

Returns:

- `ansCount: i64` - The received validator count.

##### `getPrepareBlockTime() -> i64`

GetPrepareBlockTime returns the time of *preparation* phase was run.

Returns:

- `timestamp: i64` - The block timestamp during the preparation phase.

##### `getAggregateBlockTime() -> i64`

GetAggregateBlockTime returns the time of *aggregation* phase. Zero during preparation.

Returns:

- `timestamp: i64` - The block timestamp during the aggregation phase.

##### `pub fn readValidatorAddress(validatorIndex: i64, resultOffset: *mut u8) -> i64`

ReadValidatorAddress returns the 20-byte validator address at the specified index and offset

Parameters:

- `validatorIndex: i64` - The validator index. Must be nonnegative and not greater than the number of requested validators.
- `resultOffset: i32ptr` - The memory offset to save the validator's address

##### `getCallDataSize() -> i32`

GetCallDataSize returns the size of calldata set by the current function's caller in bytes. For the outermost function call, the data is always the data request's encoded parameters.

Returns:

- `dataSize: i32`: - The size of the calldata in bytes.

##### `readCallData(i32ptr, i32, i32) -> ()`

readCallData returns the specific part of calldata into the runtime memory. The function will fail if `seekOffset + resultSize > getCallDataSize()`.

Parameters:

- `resultOffset: i32ptr` - The starting memory offset to copy calldata into.
- `seekOffset: i32` - The starting offset of calldata to start copying.
- `resultSize: i32` - The number of bytes to copy.

##### `saveReturnData(i32ptr, i32, i32) -> ()`

saveReturnData saves the specific part of memory as the return data of the current Owasm execution.

Parameters:

- `dateOffset: i32ptr` - The starting memory offset to copy return data into.
- `dataSize: i32` - The number of bytes to copy.

##### `requestExternalData(i64, i64, i32ptr, i32)`

RequestExternalData issues a raw data request for a specific data source to block validators. The function can only be called during the preparation phase of an oracle script.

Parameters:

- `dataSourceId: i64` - The unique identifier of the data source to request data.
- `externalDataId: i64` - The unique identifer for this raw data request.
- `dataOffset: i32ptr` - The starting memory offset of the parameter to data source.
- `dataLength: i32` - The size of the parameter in bytes.

##### `getExternalDataSize(i64, i32) -> i32`

GetExternalDataSize returns the size of raw data report for a specific raw data request from a specific block validator. Return `-1` if the validator did not report data.

Parameters:

- `externalDataId: i64` - The unique identifier of the raw data request.
- `validatorIndex: i32` - The index of block validators. 0 for the first, 1 for the second validator, and so on. Must be less than the number of requested validators.

##### `readExternalData(i64, i32, i32ptr, i32, i32) -> ()`

ReadExternalData reads the specific part of raw data reports into the runtime memory. The function will fail if `seekOffset + resultSize > getExternalDataSize()`.

Parameters:

- `externalDataId: i64` - The unique identifier of the raw data request.
- `validatorIndex: i32` - The index of block validators. 0 for the first, 1 for the second validator, and so on. Must be less than the number of requested validators.
- `resultOffset: i32ptr` - The starting memory offset to copy raw report data into.
- `seekOffset: i32` - The starting offset of raw report data to start copying.
- `resultSize: i32` - The

### `Owasm/Ext`

The Owasm extension module provides a convenient way to write oracle scripts that connect to various public APIs. Examples of these are functions to calculate the mean, median, and majority values from the validator's reported results, which can be used during the aggregation phase of an oracle script. The full list of functions and its implementation can be found [here](https://github.com/bandprotocol/bandchain/blob/master/owasm/src/ext/mod.rs).

## Usage

To illustrate an example usage of the Owasm library, we will be using the  example below. The code is based off an oracle script that retrieves the price of a stock.

```rust
use obi::{OBIDeserialize, OBISchema, OBISerialize};
use owasm::{execute_entry_point, ext, oei, prepare_entry_point};

#[derive(OBIDeserialize, OBISchema)]
struct Input {
    symbol: String,
    multiplier: u64,
}

#[derive(OBISerialize, OBISchema)]
struct Output {
    px: u64,
}

#[no_mangle]
fn prepare_impl(input: Input) {
    // Yahoo price data source
    oei::request_external_data(14, 1, &input.symbol.as_bytes());
}

#[no_mangle]
fn execute_impl(input: Input) -> Output {
    let avg: f64 = ext::load_average(1);
    Output { px: (avg * input.multiplier as f64) as u64 }
}

prepare_entry_point!(prepare_impl);
execute_entry_point!(execute_impl);
```

The script starts off by defining the input and output structs. In this case, the input comprises of the stock ticker (`string`) and the multiplier we want to multiply the stock's price by (`u64`). On the other hand, the output is simply the price of the stock multiplied by the multiplier, returned as a `u64` value.

Once the input and output structs and types have been defined, we move on to defining the preparation and execution phases the oracle script, defined by `prepare_impl` and `execute_impl`, respectively.

The `prepare_impl` function takes the previously-defined input struct as an argument. The function itself then only peforms one task; calling the [`request_external_data`](https://github.com/bandprotocol/bandchain/blob/master/owasm/src/oei/mod.rs#L48) function in the `oei` module.  However, if you look at the implementation, shown below, `request_external_data` itself makes a subsequent call to `requestExternalData` in [`raw.rs`](https://github.com/bandprotocol/bandchain/blob/master/owasm/src/oei/raw.rs).

The reason for the pass-off is to simplify the script-writing experience. Instead of having to pass in the data offset pointer and data length themselves, the developer simply passes in the reference to the calldata and `request_external_data` handles the necessary steps themselves. This call to `requestExternalData` is then caught and ultimately resolved by BandChain through [`resolver.go`](https://github.com/bandprotocol/bandchain/blob/master/chain/pkg/owasm/resolver.go#L38).

```rust
pub fn request_external_data(data_source_id: i64, external_id: i64, calldata: &[u8]) {
    unsafe {
        assert_eq!(
            0,
            raw::requestExternalData(
                data_source_id,
                external_id,
                calldata.as_ptr(),
                calldata.len() as i64
            )
        )
    }
}
```

The `execute_impl` function takes in the input type as an argument as well, but also returns the output struct type, as one might expect. It then starts by computing the final value of the request through calling [`load_average`](https://github.com/bandprotocol/bandchain/blob/master/owasm/src/ext/mod.rs#L21) function from the `ext` module. It then proceeds to use the computed average to construct and return the appropriate output struct.

Once we have defined the functions for both stages of the oracle script's execution, we need to pass in the appriopriate input values and actually make the function calls. To do so, oracle script writer can use our macros defined in [`macros.rs`](https://github.com/bandprotocol/bandchain/blob/master/owasm/src/macros.rs), also shown below. The aim of these macros is to reduce the load of the script writer by handling the work of retrieving the calldata, deserializing it, and using it to construct the appropriate input struct for them.

```rust
#[macro_export]
macro_rules! prepare_entry_point {
    ($name:ident) => {
        #[no_mangle]
        pub fn prepare() {
            $name(OBIDeserialize::try_from_slice(&oei::get_calldata()).unwrap());
        }
    };
}

#[macro_export]
macro_rules! execute_entry_point {
    ($name:ident) => {
        #[no_mangle]
        pub fn execute() {
            oei::save_return_data(
                &$name(OBIDeserialize::try_from_slice(&oei::get_calldata()).unwrap())
                    .try_to_vec()
                    .unwrap(),
            );
        }
    };
}
```

The last two lines of the oracle script above shows the macros in action.
