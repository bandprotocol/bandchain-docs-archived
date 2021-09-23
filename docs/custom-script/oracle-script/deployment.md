<!--
order: 3
-->

# Deployment

On BandChain, a oracle script can be registered into the system by anyone. This is done through the registrant sending
a [`MsgCreateOracleScript`](/whitepaper/protocol-messages.html#msgcreateoraclescript) message to the chain.

Let's take a look at the `MsgCreateOracleScript` message when sending via `bandd`.

```shell
bandd tx oracle create-oracle-script
    --schema "{rpc:string,to:string}/{total_supply:string}" # schema of the input/output
    --name "Token Total Supply" # name of the created oracle script
    --description "This oracle script queries the given network RPC endpoint for the total supply of a given token address." # description of the oracle script
    --script "./target/wasm32-unknown-unknown/release/token_total_supply.wasm" # path to the oracle script script
    --from my_account # sender account
    --owner band1v44t7mrda70yyv0sxl7kpnmtmh07wn9x87rft3 # oracle script owner address
    --node http://rpc-laozi-testnet4.bandchain.org:26657 # rpc node
    --chain-id band-laozi-testnet4 # chain id
    --gas auto # transaction gas
    --keyring-backend test # specify keyring (test,os,...)
```

This message specifies various parameters of the oracle script that will be registered including

- Schema of the oracle script
- Name of the oracle script
- Description of the oracle script
- .wasm file
- Sender who wishes to create the oracle script
- Owner of the oracle script, if specified

When registering the oracle script, the message sender can choose whether to specify an owner of the oracle script.
If an owner is specified, only the owner can make any changes to the oracle script once it is registered.
On the other hand, if the owner is
omitted, the oracle script can no longer be edited after it is registered.

If the procedures associated with that source depend on centralized sources, the actual source of the data can still be
controlled by centralized parties.

After the transaction is successfully broadcasted. The newly created oracle script ID can be found in the response json.
The registrant can also view the created oracle script details on [CosmoScan](https://cosmoscan.io/oracle-scripts/).

```json
{
  "height": "255092",
  "txhash": "B240F13FC67E77A7439CE7889251B6BCEBAFC7FB04E2BA35CAA21F4D7EE79C41",
  "codespace": "",
  "code": 0,
  "data": "0A220A202F6F7261636C652E76312E4D73674372656174654F7261636C65536372697074",
  "raw_log": "[{\"events\":[{\"type\":\"create_oracle_script\",\"attributes\":[{\"key\":\"id\",\"value\":\"61\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/oracle.v1.MsgCreateOracleScript\"}]}]}]",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "create_oracle_script",
          "attributes": [
            {
              "key": "id",
              "value": "61"
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "/oracle.v1.MsgCreateOracleScript"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gas_wanted": "5000000",
  "gas_used": "273518",
  "tx": null,
  "timestamp": ""
}
```
