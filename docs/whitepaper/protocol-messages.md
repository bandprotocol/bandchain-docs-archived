<!--
order: 5
-->
# Protocol Messages

## Native Cosmos SDK Messages

Stemming from its Cosmos SDK foundation, BandChain supports all types of messages that are native to the SDK.

## BandChain Specific Messages

Apart from the messages that stems from the Cosmos SDK, BandChain also supports a number of messages native to its data oracle system. These messages' specification is presented below.

### MsgCreateDataSource

Deploys and registers a new data source to BandChain. Once registered, the data source is assigned a unique `int64` identifier which can be used to refer to it forever.

#### Parameters

| Parameter   | Type             | Description                                                                                                                                                                                       |
|-------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Sender      | sdk.AccAddress | The address of the message's sender. Note that the sender does not need to be the same as the owner                                                                                                  |
| Owner       | sdk.AccAddress | The address of the entity who will be responsible for maintaining the data source                                                                                                                 |
| Name        | string         | The human-readable string name for this data source                                                                                                                                               |
| Description | string         | The description of this data source                                                                                                                                                               |
| Executable  | []byte         | The content of executable to be run by block upon receiving a data request for this data source. The executable can be in any format, as long as it is accepted by the general public. |

### MsgEditDataSource

Edits an existing data source given the unique `int64` identifier (i.e. `dataSourceID`). The sender must be the owner of the data source for the transaction to succeed.

#### Parameters

| Parameter    | Type           | Description                                                                                                                                                                                       |
|--------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DataSourceID | int64          | The unique identifier number assigned to the data source when it was first registered                                                                                                             |
| Sender       | sdk.AccAddress | The address of the message's sender. Note that the sender does not need to be the same as the owner                                                                                                  |
| Owner        | sdk.AccAddress | The address of the entity who will be responsible for maintaining the data source                                                                                                                 |
| Name         | string         | The human-readable string name for this data source                                                                                                                                               |
| Description  | string         | The description of this data source                                                                                                                                                               |
| Executable   | []byte         | The content of executable to be run by block validators upon receiving a data request for this data source. The executable can be in any format, as long as it is accepted by the general public. |

### MsgCreateOracleScript

Deploys a new oracle script to BandChain's network. Once registered, the script is assigned a unique `int64` identifier which can be used to refer to it forever.

#### Parameters

| Parameter       | Type             | Description                                                                                           |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------|
| Sender          | sdk.AccAddress | The address of the message's sender. Note that the sender does not need to be the same as the owner   |
| Owner           | sdk.AccAddress | The address of the entity who will be responsible for maintaining the data source                     |
| Name            | string         | The human-readable string name for this data source                                                   |
| Description     | string         | The description of this data source                                                                   |
| Code            | []byte         | The Owasm-compiled binary attached to this oracle script                                              |
| Schema          | string         | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| Source Code URL | string         | The URL for the source code of this oracle script                                                     |

### MsgEditOracleScript

Edits an existing oracle script given the unique `int64` identifier (i.e. `oracleScriptID`). The sender must be the owner of the oracle script for the transaction to succeed.

#### Parameters

| Parameter       | Type             | Description                                                                                           |
|-----------------|------------------|-------------------------------------------------------------------------------------------------------|
| OracleScriptID  | int64          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain  |
| Sender          | sdk.AccAddress | The address of the message's sender. Note that the sender does not need to be the same as the owner   |
| Owner           | sdk.AccAddress | The address of the entity who will be responsible for maintaining the data source                     |
| Name            | string         | The human-readable string name for this data source                                                   |
| Description     | string         | The description of this data source                                                                   |
| Code            | []byte         | The Owasm-compiled binary attached to this oracle script                                              |
| Schema          | string         | The schema detailing the inputs and outputs of this oracle script, as well as the corresponding types |
| Source Code URL | string         | The URL for the source code of this oracle script                                                     |

### MsgRequestData

Requests a new data based on an existing oracle script. A data request will be assigned a unique identifier once the transaction is confirmed. After sufficient validators report the raw data points. The results of the data requests will be written and stored permanently on BandChain for future uses.

#### Parameters

| Parameter      | Type             | Description                                                                                                                                                |
|----------------|------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|
| OracleScriptID | int64          | The unique identifier number assigned to the oracle script when it was first registered on Bandchain                                                       |
| Sender         | sdk.AccAddress | The address of the message's sender.                                                                                                                       |
| Calldata       | string         | The data passed over to the oracle script for the script to use during its execution                                                                       |
| AskCount       | int64          | The number of validators that are requested to respond to this request                                                                                     |
| MinCount       | int64          | The minimum number of validators necessary for the request to proceed to the execution phase                                                               |
| ClientID       | string         | the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |

### MsgReportData

Reports raw data points for the given data request. Each data point corresponds to a data source query issued during the data request script's execution of `prepare` function.

#### Parameters

| Parameter | Type                                                    | Description                                                                 |
|-----------|---------------------------------------------------------|-----------------------------------------------------------------------------|
| RequestID | int64                                                 | The unique identifier number of the particular request                      |
| Validator | sdk.ValAddress                                        | The reporting validator's actual validator address                          |
| Reporter | sdk.AccAddress                                        | The address the reporting validator uses to sign when submitting the report |
| Data      | []struct'{ externalDataId: int64, data: []byte }' | The array of raw data points. Each item corresponds to a data source query.  |

### MsgAddReporter

Registers an address to the list of addresses available to a validator when signing and submitting a report.

#### Parameters

| Parameter        | Type             | Description                                                                    |
|------------------|------------------|--------------------------------------------------------------------------------|
| ValidatorAddress | sdk.ValAddress | The address of the validator wishing to add the reporter address to their list |
| ReporterAddress  | sdk.AccAddress | The address to add to the validator's available addresses                      |

### MsgRemoveReporter

Remove a previously registered address from the list of addresses available to a validator when signing and submitting a report.

#### Parameters

| Parameter        | Type             | Description                                                                    |
|------------------|------------------|--------------------------------------------------------------------------------|
| ValidatorAddress | sdk.ValAddress | The address of the validator wishing to add the reporter address to their list |
| ReporterAddress  | sdk.AccAddress | The address to remove from the validator's available addresses                      |
