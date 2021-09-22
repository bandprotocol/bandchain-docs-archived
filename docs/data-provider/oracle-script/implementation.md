<!--
order: 2
-->

# Implementation

To better explain the structure and implementation of a oracle script, let’s look at the example below.

### Query for token total supply

As mentioned above, the oracle script can take any number of arguments. The example below, also written in
Python, gives an example of such a script that requires two arguments.

This oracle script queries the given network's RPC endpoint for the total supply of a given token address.

Let's start by creating a rust directory structure like this example below.

##### Directory structure

```shell
.
├── Token_total_supply
    ├── Cargo.toml
    └── src
        └── lib.rs
```

##### Cargo.toml

```Cargo.toml
[package]
name = "token-total-supply"

version = "0.1.0"
authors = ["Band Protocol <dev@bandprotocol.com>"]
edition = "2018"

[lib]
crate-type = ["cdylib"]

[dependencies]
owasm-kit = { version = "0.1.13" }
obi = { version = "0.0.2" }
```

##### lib.rs

```rust
use obi::{OBIDecode, OBIEncode, OBISchema};
use owasm_kit::{execute_entry_point, ext, oei, prepare_entry_point};

#[derive(OBIDecode, OBISchema)]
struct Input {
    rpc: String,
    to: String,
}

#[derive(OBIEncode, OBISchema)]
struct Output {
    total_supply: String,
}

const DATA_SOURCE_ID: i64 = 98;
const EXTERNAL_ID: i64 = 0;

#[no_mangle]
fn prepare_impl(input: Input) {
    oei::ask_external_data(
        DATA_SOURCE_ID,
        EXTERNAL_ID,
        format!("{} {}", input.rpc, input.to).as_bytes(),
    );
}

#[no_mangle]
fn execute_impl(_input: Input) -> Output {
    Output {
        total_supply: ext::load_majority::<String>(EXTERNAL_ID).unwrap(),
    }
}

prepare_entry_point!(prepare_impl);
execute_entry_point!(execute_impl);
```

After we've filled the contents of `lib.rs` and `Cargo.toml`, let's compile the wasm program.

##### Build .wasm

```shell
RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown
```

After the building is complete, you will find that the `token_total_supply.wasm` is in this sub-directory 👉 `./target/wasm32-unknown-unknown/release/token_total_supply.wasm`.

So the next step is to deploy our token_total_supply.wasm to the BandChain.
