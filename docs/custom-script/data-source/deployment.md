<!--
order: 3
-->

# Deployment

On BandChain, a data source can be registered into the system by anyone. This is done through the registrant sending
a [`MsgCreateDataSource`](/whitepaper/protocol-messages.html#msgcreatedatasource) message to the chain.

Let's take a look at the `MsgCreateDataSource` message when sending via `bandd`.

```shell
bandd tx oracle create-data-source
    --name "New Data Source Tutorial" # name of the created data source
    --fee 250000uband # fee charged when using this data source
    --description "CoinGecko with symbols mapping" # description of the data source
    --script tutorial_data_source.py # path to the data source script
    --from account01 # sender account
    --owner band1v44t7mrda70yyv0sxl7kpnmtmh07wn9x87rft3 # data source owner address
    --treasury band1v44t7mrda70yyv0sxl7kpnmtmh07wn9x87rft3 # address to collect the fee
    --node http://rpc-laozi-testnet4.bandchain.org:26657 # rpc node
    --chain-id band-laozi-testnet4 # chain id
    --gas auto # transaction gas
```

In this message, they specify various parameters of the data source they wish to register, including

- Per-query fee that someone looking to use that data source needs to pay
- Name of the data source
- Content of the executable to be run by block validators upon receiving a data request for this data source
- Sender who wishes to create the data source
- Owner of the data source, if specified

When registering the data source, the message sender can choose whether to specify an owner of the source.
If an owner is specified, only the owner can make any changes to the data source once it is registered.
They will also be the only party able to collect the accumulated request fees. On the other hand, if an owner is
omitted, the data source can no longer be edited after it is registered.

If the procedures associated with that source depend on centralized sources, the actual source of the data can still be
controlled by centralized parties.

After the transaction is successfully broadcasted. The newly created data source ID can be found in the response json.
The registrant can also view the created data source details on [CosmoScan](https://cosmoscan.io/data-sources/).

```json
{
  "height": "232461",
  "txhash": "90363A90ACF20CB538F29BD14419594701CE3DC68D313C1C7D0B6E0B5B16DAA7",
  "codespace": "",
  "code": 0,
  "data": "0A200A1E2F6F7261636C652E76312E4D736743726561746544617461536F75726365",
  "raw_log": "[{\"events\":[{\"type\":\"create_data_source\",\"attributes\":[{\"key\":\"id\",\"value\":\"97\"}]},{\"type\":\"message\",\"attributes\":[{\"key\":\"action\",\"value\":\"/oracle.v1.MsgCreateDataSource\"}]}]}]",
  "logs": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "create_data_source",
          "attributes": [
            {
              "key": "id",
              "value": "97" // data source id
            }
          ]
        },
        {
          "type": "message",
          "attributes": [
            {
              "key": "action",
              "value": "/oracle.v1.MsgCreateDataSource"
            }
          ]
        }
      ]
    }
  ],
  "info": "",
  "gas_wanted": "86742",
  "gas_used": "85243",
  "tx": null,
  "timestamp": ""
}
```
