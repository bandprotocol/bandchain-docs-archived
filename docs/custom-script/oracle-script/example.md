<!--
order: 2
-->

# Example

To better explain the structure and implementation of a oracle script, let’s look at the example below.

### Query for token total supply

As mentioned above, the oracle script can take any number of arguments. The example below, also written in
Python, gives an example of such a script that requires two arguments.

This oracle script queries the given network's RPC endpoint for the total supply of a given token address.

Let's start by creating a Rust directory structure like this example below.

```shell
.
├── Token_total_supply
    ├── Cargo.toml
    └── src
        └── lib.rs
```

#### Rust Installation

There are many ways to install Rust on your system. For the moment the official way to install Rust is using [Rustup](https://rustup.rs/).

Rustup installs `rustc`, `cargo`, `rustup` and other standard tools to Cargo's bin directory. On Unix it is located at `$HOME/.cargo/bin` and on Windows at `%USERPROFILE%\.cargo\bin`. This is the same directory that cargo install will install Rust programs and Cargo plugins.

After installing Rust you can check the current version by typing `rustc --version` or `rustc -V` on your terminal to verify the success of the installation.

#### Adding Dependencies

`Cargo.toml` is the manifest file for Rust's package manager, cargo. This file contains metadata such as name, version, and dependencies for packages.

By default, Cargo checks dependencies on [crates.io](https://crates.io/) . So we have to add only the crate name and a version string to `Cargo.toml` like so:

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

<br/>

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

#### Manually add WebAssembly Support wasm32-unknown-unknown

If wasm32-unknown-unknown hasn't been added as a target, add it using the command below before attempting to compile.

```
rustup target add wasm32-unknown-unknown
```

#### Build using RUSTFLAGS

```shell
RUSTFLAGS='-C link-arg=-s' cargo build --release --target wasm32-unknown-unknown
```

After the building is complete, you will find that the `token_total_supply.wasm` is in this sub-directory 👉 `./target/wasm32-unknown-unknown/release/token_total_supply.wasm`.

So the next step is to deploy our token_total_supply.wasm to the BandChain.
