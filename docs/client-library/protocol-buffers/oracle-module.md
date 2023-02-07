<!--
order: 1
-->
# Oracle Module

<a name="top"></a>

## Table of Contents

- [Oracle Module](#oracle-module)
  - [Table of Contents](#table-of-contents)
  - [oracle/v1/oracle.proto](#oraclev1oracleproto)
    - [ActiveValidator](#activevalidator)
    - [DataSource](#datasource)
    - [IBCChannel](#ibcchannel)
    - [OracleRequestPacketAcknowledgement](#oraclerequestpacketacknowledgement)
    - [OracleRequestPacketData](#oraclerequestpacketdata)
    - [OracleResponsePacketData](#oracleresponsepacketdata)
    - [OracleScript](#oraclescript)
    - [Params](#params)
    - [PendingResolveList](#pendingresolvelist)
    - [PriceResult](#priceresult)
    - [RawReport](#rawreport)
    - [RawRequest](#rawrequest)
    - [Report](#report)
    - [ReportersPerValidator](#reporterspervalidator)
    - [Request](#request)
    - [RequestVerification](#requestverification)
    - [Result](#result)
    - [ValidatorStatus](#validatorstatus)
    - [ResolveStatus](#resolvestatus)
  - [oracle/v1/query.proto](#oraclev1queryproto)
    - [QueryActiveValidatorsRequest](#queryactivevalidatorsrequest)
    - [QueryActiveValidatorsResponse](#queryactivevalidatorsresponse)
    - [QueryCountsRequest](#querycountsrequest)
    - [QueryCountsResponse](#querycountsresponse)
    - [QueryDataRequest](#querydatarequest)
    - [QueryDataResponse](#querydataresponse)
    - [QueryDataSourceRequest](#querydatasourcerequest)
    - [QueryDataSourceResponse](#querydatasourceresponse)
    - [QueryOracleScriptRequest](#queryoraclescriptrequest)
    - [QueryOracleScriptResponse](#queryoraclescriptresponse)
    - [QueryParamsRequest](#queryparamsrequest)
    - [QueryParamsResponse](#queryparamsresponse)
    - [QueryPendingRequestsRequest](#querypendingrequestsrequest)
    - [QueryPendingRequestsResponse](#querypendingrequestsresponse)
    - [QueryReportersRequest](#queryreportersrequest)
    - [QueryReportersResponse](#queryreportersresponse)
    - [QueryRequestPoolRequest](#queryrequestpoolrequest)
    - [QueryRequestPoolResponse](#queryrequestpoolresponse)
    - [QueryRequestPriceRequest](#queryrequestpricerequest)
    - [QueryRequestPriceResponse](#queryrequestpriceresponse)
    - [QueryRequestRequest](#queryrequestrequest)
    - [QueryRequestResponse](#queryrequestresponse)
    - [QueryRequestSearchRequest](#queryrequestsearchrequest)
    - [QueryRequestSearchResponse](#queryrequestsearchresponse)
    - [QueryRequestVerificationRequest](#queryrequestverificationrequest)
    - [QueryRequestVerificationResponse](#queryrequestverificationresponse)
    - [QueryValidatorRequest](#queryvalidatorrequest)
    - [QueryValidatorResponse](#queryvalidatorresponse)
    - [Query](#query)
  - [oracle/v1/tx.proto](#oraclev1txproto)
    - [MsgActivate](#msgactivate)
    - [MsgActivateResponse](#msgactivateresponse)
    - [MsgAddReporter](#msgaddreporter)
    - [MsgAddReporterResponse](#msgaddreporterresponse)
    - [MsgCreateDataSource](#msgcreatedatasource)
    - [MsgCreateDataSourceResponse](#msgcreatedatasourceresponse)
    - [MsgCreateOracleScript](#msgcreateoraclescript)
    - [MsgCreateOracleScriptResponse](#msgcreateoraclescriptresponse)
    - [MsgEditDataSource](#msgeditdatasource)
    - [MsgEditDataSourceResponse](#msgeditdatasourceresponse)
    - [MsgEditOracleScript](#msgeditoraclescript)
    - [MsgEditOracleScriptResponse](#msgeditoraclescriptresponse)
    - [MsgRemoveReporter](#msgremovereporter)
    - [MsgRemoveReporterResponse](#msgremovereporterresponse)
    - [MsgReportData](#msgreportdata)
    - [MsgReportDataResponse](#msgreportdataresponse)
    - [MsgRequestData](#msgrequestdata)
    - [MsgRequestDataResponse](#msgrequestdataresponse)
    - [Msg](#msg)
  - [oracle/v1/genesis.proto](#oraclev1genesisproto)
    - [GenesisState](#genesisstate)
  - [Scalar Value Types](#scalar-value-types)

<a name="oracle/v1/oracle.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## oracle/v1/oracle.proto

<a name="oracle.v1.ActiveValidator"></a>

### ActiveValidator

ActiveValidator is information of currently active validator

| Field   | Type              | Label | Description                                               |
| ------- | ----------------- | ----- | --------------------------------------------------------- |
| address | [string](#string) |       | Address is a validator address                            |
| power   | [uint64](#uint64) |       | Power is an amount of token that the validator is holding |

<a name="oracle.v1.DataSource"></a>

### DataSource

DataSource is the data structure for storing data sources in the storage.

| Field       | Type                                                  | Label    | Description                                                                                               |
| ----------- | ----------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| owner       | [string](#string)                                     |          | Owner is an address of the account who own the data source                                                |
| name        | [string](#string)                                     |          | Name is data source name used for display                                                                 |
| description | [string](#string)                                     |          | Description is data source description used for display                                                   |
| filename    | [string](#string)                                     |          | Filename is string of file name used as reference for locating data source file stored in bandchain nodes |
| treasury    | [string](#string)                                     |          | Treasury is the account address who receive data source fee from requester.                               |
| fee         | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Fee is the data source fee per ask_count that data provider will receive from requester.                  |

<a name="oracle.v1.IBCChannel"></a>

### IBCChannel

IBCChannel is information of IBC protocol to allow communicating with other
chain

| Field      | Type              | Label | Description                                                                        |
| ---------- | ----------------- | ----- | ---------------------------------------------------------------------------------- |
| port_id    | [string](#string) |       | PortID is port ID used for sending response packet when request is resolved.       |
| channel_id | [string](#string) |       | ChannelID is channel ID used for sending response packet when request is resolved. |

<a name="oracle.v1.OracleRequestPacketAcknowledgement"></a>

### OracleRequestPacketAcknowledgement

OracleRequestPacketAcknowledgement encodes an oracle request acknowledgement
send back to requester chain.

| Field      | Type            | Label | Description                                                             |
| ---------- | --------------- | ----- | ----------------------------------------------------------------------- |
| request_id | [int64](#int64) |       | RequestID is BandChain&#39;s unique identifier for this oracle request. |

<a name="oracle.v1.OracleRequestPacketData"></a>

### OracleRequestPacketData

OracleRequestPacketData encodes an oracle request sent from other blockchains
to BandChain.

| Field            | Type                                                  | Label    | Description                                                                                                                                                            |
| ---------------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_id        | [string](#string)                                     |          | ClientID is the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| oracle_script_id | [int64](#int64)                                       |          | OracleScriptID is the unique identifier of the oracle script to be executed.                                                                                           |
| calldata         | [bytes](#bytes)                                       |          | Calldata is the OBI-encoded calldata bytes available for oracle executor to read.                                                                                      |
| ask_count        | [uint64](#uint64)                                     |          | AskCount is the number of validators that are requested to respond to this oracle request. Higher value means more security, at a higher gas cost.                     |
| min_count        | [uint64](#uint64)                                     |          | MinCount is the minimum number of validators necessary for the request to proceed to the execution phase. Higher value means more security, at the cost of liveness.   |
| fee_limit        | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | FeeLimit is the maximum tokens that will be paid to all data source providers.                                                                                         |
| request_key      | [string](#string)                                     |          | RequestKey is the key from request chain to match data source fee payer on Bandchain                                                                                   |
| prepare_gas      | [uint64](#uint64)                                     |          | PrepareGas is amount of gas to pay to prepare raw requests                                                                                                             |
| execute_gas      | [uint64](#uint64)                                     |          | ExecuteGas is amount of gas to reserve for executing                                                                                                                   |

<a name="oracle.v1.OracleResponsePacketData"></a>

### OracleResponsePacketData

OracleResponsePacketData encodes an oracle response from BandChain to the
requester.

| Field          | Type                                      | Label | Description                                                                                                                                                    |
| -------------- | ----------------------------------------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_id      | [string](#string)                         |       | ClientID is the unique identifier matched with that of the oracle request packet.                                                                              |
| request_id     | [int64](#int64)                           |       | RequestID is BandChain&#39;s unique identifier for this oracle request.                                                                                        |
| ans_count      | [uint64](#uint64)                         |       | AnsCount is the number of validators among to the asked validators that actually responded to this oracle request prior to this oracle request being resolved. |
| request_time   | [int64](#int64)                           |       | RequestTime is the UNIX epoch time at which the request was sent to BandChain.                                                                                 |
| resolve_time   | [int64](#int64)                           |       | ResolveTime is the UNIX epoch time at which the request was resolved to the final result.                                                                      |
| resolve_status | [ResolveStatus](#oracle.v1.ResolveStatus) |       | ResolveStatus is the status of this oracle request, which can be OK, FAILURE, or EXPIRED.                                                                      |
| result         | [bytes](#bytes)                           |       | Result is the final aggregated value encoded in OBI format. Only available if status if OK.                                                                    |

<a name="oracle.v1.OracleScript"></a>

### OracleScript

OracleScript is the data structure for storing oracle scripts in the storage.

| Field           | Type              | Label | Description                                                                                                                                                |
| --------------- | ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| owner           | [string](#string) |       | Owner is an address of the account who own the oracle script                                                                                               |
| name            | [string](#string) |       | Name is oracle script name used for display                                                                                                                |
| description     | [string](#string) |       | Description is oracle script description used for display                                                                                                  |
| filename        | [string](#string) |       | Filename is string of file name used as reference for locating compiled oracle script WASM file stored in bandchain nodes                                  |
| schema          | [string](#string) |       | Schema is the schema of the oracle script input/output which is formatted in OBI format e.g. &#34;{symbol:string,multiplier:u64}/{px:u64}&#34;             |
| source_code_url | [string](#string) |       | SourceCodeURL is the URL of oracle script&#39;s source code. It is recommendded to store source code on IPFS and get its URL to preserve decentralization. |

<a name="oracle.v1.Params"></a>

### Params

Params is the data structure that keeps the parameters of the oracle module.

| Field                     | Type              | Label | Description                                                                                                                              |
| ------------------------- | ----------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| max_raw_request_count     | [uint64](#uint64) |       | MaxRawRequestCount is the maximum number of data source raw requests a request can make.                                                 |
| max_ask_count             | [uint64](#uint64) |       | MaxAskCount is the maximum number of validators a request can target.                                                                    |
| expiration_block_count    | [uint64](#uint64) |       | ExpirationBlockCount is the number of blocks a request stays valid before it gets expired due to insufficient reports.                   |
| base_owasm_gas            | [uint64](#uint64) |       | BaseOwasmGas is the base amount of Cosmos-SDK gas charged for owasm execution.                                                           |
| per_validator_request_gas | [uint64](#uint64) |       | PerValidatorRequestGas is the amount of Cosmos-SDK gas charged per requested validator.                                                  |
| sampling_try_count        | [uint64](#uint64) |       | SamplingTryCount the number of validator sampling tries to pick the highest voting power subset of validators to perform an oracle task. |
| oracle_reward_percentage  | [uint64](#uint64) |       | OracleRewardPercentage is the percentage of block rewards allocated to active oracle validators.                                         |
| inactive_penalty_duration | [uint64](#uint64) |       | InactivePenaltyDuration is the duration period where a validator cannot activate back after missing an oracle report.                    |
| ibc_request_enabled       | [bool](#bool)     |       | IBCRequestEnabled is a flag indicating whether sending oracle request via IBC is allowed                                                 |

<a name="oracle.v1.PendingResolveList"></a>

### PendingResolveList

PendingResolveList is a list of requests that are waiting to be resolved

| Field       | Type            | Label    | Description                                                         |
| ----------- | --------------- | -------- | ------------------------------------------------------------------- |
| request_ids | [int64](#int64) | repeated | RequestIDs is a list of request IDs that are waiting to be resolved |

<a name="oracle.v1.PriceResult"></a>

### PriceResult

PriceResult is a result from standard price reference

| Field        | Type              | Label | Description                                                                               |
| ------------ | ----------------- | ----- | ----------------------------------------------------------------------------------------- |
| symbol       | [string](#string) |       | Symbol is unit of data indicating what the data is. It is price currencies for this case. |
| multiplier   | [uint64](#uint64) |       | Multiplier is a number used for left-shifting value to eliminate decimal digits           |
| px           | [uint64](#uint64) |       | Px is the actual data, which is rate number multiplied by the multiplier.                 |
| request_id   | [int64](#int64)   |       | RequestID is oracle request ID that contains this price                                   |
| resolve_time | [int64](#int64)   |       | ResolveTime is epoch timestamp indicating the time when the request had been resolved     |

<a name="oracle.v1.RawReport"></a>

### RawReport

RawRequest is the data structure for storing raw reporter in the storage.

| Field       | Type              | Label | Description                                                                                                                                                                                                         |
| ----------- | ----------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| external_id | [int64](#int64)   |       | ExternalID is an ID of the raw request                                                                                                                                                                              |
| exit_code   | [uint32](#uint32) |       | ExitCode is status code provided by validators to specify error, if any. Exit code is usually filled by the exit code returned from execution of specified data source script. With code 0 means there is no error. |
| data        | [bytes](#bytes)   |       | Data is raw result provided by validators. It is usually filled by the result from execution of specified data source script.                                                                                       |

<a name="oracle.v1.RawRequest"></a>

### RawRequest

RawRequest is the data structure for storing raw requests in the storage.

| Field          | Type            | Label | Description                                                                   |
| -------------- | --------------- | ----- | ----------------------------------------------------------------------------- |
| external_id    | [int64](#int64) |       | ExternalID is an ID of the raw request                                        |
| data_source_id | [int64](#int64) |       | DataSourceID is an ID of data source script that relates to the raw request   |
| calldata       | [bytes](#bytes) |       | Calldata is the data used as argument params for executing data source script |

<a name="oracle.v1.Report"></a>

### Report

Report is the data structure for storing reports in the storage.

| Field             | Type                              | Label    | Description                                                                                            |
| ----------------- | --------------------------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| validator         | [string](#string)                 |          | Validator is a validator address who submit the report                                                 |
| in_before_resolve | [bool](#bool)                     |          | InBeforeResolve indicates whether the report is submitted before the request resolved                  |
| raw_reports       | [RawReport](#oracle.v1.RawReport) | repeated | RawReports is list of raw reports provided by the validator. Each raw report has different external ID |

<a name="oracle.v1.ReportersPerValidator"></a>

### ReportersPerValidator

ReportersPerValidator is list of reporters that is associated with a
validator

| Field     | Type              | Label    | Description                                                                     |
| --------- | ----------------- | -------- | ------------------------------------------------------------------------------- |
| validator | [string](#string) |          | Validator a validator address                                                   |
| reporters | [string](#string) | repeated | Reporters is a list of reporter account addresses associated with the validator |

<a name="oracle.v1.Request"></a>

### Request

Request is the data structure for storing requests in the storage.

| Field                | Type                                | Label    | Description                                                                                                                                                                                                       |
| -------------------- | ----------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| oracle_script_id     | [int64](#int64)                     |          | OracleScriptID is ID of an oracle script                                                                                                                                                                          |
| calldata             | [bytes](#bytes)                     |          | Calldata is the data used as argument params for the oracle script                                                                                                                                                |
| requested_validators | [string](#string)                   | repeated | RequestedValidators is a list of validator addresses that are assigned for fulfilling the request                                                                                                                 |
| min_count            | [uint64](#uint64)                   |          | MinCount is minimum number of validators required for fulfilling the request                                                                                                                                      |
| request_height       | [int64](#int64)                     |          | RequestHeight is block height that the request has been created                                                                                                                                                   |
| request_time         | [uint64](#uint64)                   |          | RequestTime is timestamp of the chain&#39;s block which contains the request                                                                                                                                      |
| client_id            | [string](#string)                   |          | ClientID is arbitrary id provided by requester. It is used by client-side for referencing the request                                                                                                             |
| raw_requests         | [RawRequest](#oracle.v1.RawRequest) | repeated | RawRequests is a list of raw requests specified by execution of oracle script                                                                                                                                     |
| ibc_channel          | [IBCChannel](#oracle.v1.IBCChannel) |          | IBCChannel is an IBC channel info of the other chain, which contains a channel and a port to allow bandchain connect to that chain. This field allows other chain be able to request data from bandchain via IBC. |
| execute_gas          | [uint64](#uint64)                   |          | ExecuteGas is amount of gas to reserve for executing                                                                                                                                                              |

<a name="oracle.v1.RequestVerification"></a>

### RequestVerification

RequestVerification is a message that is constructed and signed by a reporter
to be used as a part of verification of oracle request.

| Field       | Type              | Label | Description                                               |
| ----------- | ----------------- | ----- | --------------------------------------------------------- |
| chain_id    | [string](#string) |       | ChainID is the ID of targeted chain                       |
| validator   | [string](#string) |       | Validator is an validator address                         |
| request_id  | [int64](#int64)   |       | RequestID is the targeted request ID                      |
| external_id | [int64](#int64)   |       | ExternalID is the oracle&#39;s external ID of data source |

<a name="oracle.v1.Result"></a>

### Result

Result encodes a result of request and store in chain

| Field            | Type                                      | Label | Description                                                                                                                                                            |
| ---------------- | ----------------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_id        | [string](#string)                         |       | ClientID is the unique identifier of this oracle request, as specified by the client. This same unique ID will be sent back to the requester with the oracle response. |
| oracle_script_id | [int64](#int64)                           |       | OracleScriptID is the unique identifier of the oracle script to be executed.                                                                                           |
| calldata         | [bytes](#bytes)                           |       | Calldata is the calldata bytes available for oracle executor to read.                                                                                                  |
| ask_count        | [uint64](#uint64)                         |       | AskCount is the number of validators that are requested to respond to this oracle request. Higher value means more security, at a higher gas cost.                     |
| min_count        | [uint64](#uint64)                         |       | MinCount is the minimum number of validators necessary for the request to proceed to the execution phase. Higher value means more security, at the cost of liveness.   |
| request_id       | [int64](#int64)                           |       | RequestID is BandChain&#39;s unique identifier for this oracle request.                                                                                                |
| ans_count        | [uint64](#uint64)                         |       | AnsCount is the number of validators among to the asked validators that actually responded to this oracle request prior to this oracle request being resolved.         |
| request_time     | [int64](#int64)                           |       | RequestTime is the UNIX epoch time at which the request was sent to BandChain.                                                                                         |
| resolve_time     | [int64](#int64)                           |       | ResolveTime is the UNIX epoch time at which the request was resolved to the final result.                                                                              |
| resolve_status   | [ResolveStatus](#oracle.v1.ResolveStatus) |       | ResolveStatus is the status of this oracle request, which can be OK, FAILURE, or EXPIRED.                                                                              |
| result           | [bytes](#bytes)                           |       | Result is the final aggregated value only available if status if OK.                                                                                                   |

<a name="oracle.v1.ValidatorStatus"></a>

### ValidatorStatus

ValidatorStatus maintains whether a validator is an active oracle provider.

| Field     | Type                                                    | Label | Description                                                                                                                                                                               |
| --------- | ------------------------------------------------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| is_active | [bool](#bool)                                           |       | IsActive is a boolean indicating active status of validator. The validator will be deactivated when they are unable to send reports to fulfill oracle request before the request expired. |
| since     | [google.protobuf.Timestamp](#google.protobuf.Timestamp) |       | Since is a block timestamp when validator has been activated/deactivated                                                                                                                  |

<a name="oracle.v1.ResolveStatus"></a>

### ResolveStatus

ResolveStatus encodes the status of an oracle request.

| Name                            | Number | Description                                                                            |
| ------------------------------- | ------ | -------------------------------------------------------------------------------------- |
| RESOLVE_STATUS_OPEN_UNSPECIFIED | 0      | Open - the request is not yet resolved.                                                |
| RESOLVE_STATUS_SUCCESS          | 1      | Success - the request has been resolved successfully with no errors.                   |
| RESOLVE_STATUS_FAILURE          | 2      | Failure - an error occured during the request&#39;s resolve call.                      |
| RESOLVE_STATUS_EXPIRED          | 3      | Expired - the request does not get enough reports from validator within the timeframe. |

<a name="oracle/v1/query.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## oracle/v1/query.proto

<a name="oracle.v1.QueryActiveValidatorsRequest"></a>

### QueryActiveValidatorsRequest

QueryActiveValidatorsRequest is request type for the Query/ActiveValidators
RPC method.

<a name="oracle.v1.QueryActiveValidatorsResponse"></a>

### QueryActiveValidatorsResponse

QueryActiveValidatorsResponse is response type for the Query/ActiveValidators
RPC method.

| Field      | Type                                          | Label    | Description                               |
| ---------- | --------------------------------------------- | -------- | ----------------------------------------- |
| validators | [ActiveValidator](#oracle.v1.ActiveValidator) | repeated | Validators is a list of active validators |

<a name="oracle.v1.QueryCountsRequest"></a>

### QueryCountsRequest

QueryCountsRequest is request type for the Query/Count RPC method.

<a name="oracle.v1.QueryCountsResponse"></a>

### QueryCountsResponse

QueryCountsResponse is response type for the Query/Count RPC method.

| Field               | Type            | Label | Description                                                                |
| ------------------- | --------------- | ----- | -------------------------------------------------------------------------- |
| data_source_count   | [int64](#int64) |       | DataSourceCount is total number of data sources available on the chain     |
| oracle_script_count | [int64](#int64) |       | OracleScriptCount is total number of oracle scripts available on the chain |
| request_count       | [int64](#int64) |       | RequestCount is total number of requests submitted to the chain            |

<a name="oracle.v1.QueryDataRequest"></a>

### QueryDataRequest

QueryDataRequest is request type for the Query/Data RPC method.

| Field     | Type              | Label | Description                                                                                  |
| --------- | ----------------- | ----- | -------------------------------------------------------------------------------------------- |
| data_hash | [string](#string) |       | DataHash is SHA256 hash of the file&#39;s content, which can be data source or oracle script |

<a name="oracle.v1.QueryDataResponse"></a>

### QueryDataResponse

QueryDataResponse is response type for the Query/Data RPC method.

| Field | Type            | Label | Description                                                           |
| ----- | --------------- | ----- | --------------------------------------------------------------------- |
| data  | [bytes](#bytes) |       | Data is file&#39;s content, which can be data source or oracle script |

<a name="oracle.v1.QueryDataSourceRequest"></a>

### QueryDataSourceRequest

QueryDataSourceRequest is request type for the Query/DataSource RPC method.

| Field          | Type            | Label | Description                                |
| -------------- | --------------- | ----- | ------------------------------------------ |
| data_source_id | [int64](#int64) |       | DataSourceID is ID of a data source script |

<a name="oracle.v1.QueryDataSourceResponse"></a>

### QueryDataSourceResponse

QueryDataSourceResponse is response type for the Query/DataSource RPC method.

| Field       | Type                                | Label | Description                                        |
| ----------- | ----------------------------------- | ----- | -------------------------------------------------- |
| data_source | [DataSource](#oracle.v1.DataSource) |       | DataSource is summary information of a data source |

<a name="oracle.v1.QueryOracleScriptRequest"></a>

### QueryOracleScriptRequest

QueryOracleScriptRequest is request type for the Query/OracleScript RPC
method.

| Field            | Type            | Label | Description                              |
| ---------------- | --------------- | ----- | ---------------------------------------- |
| oracle_script_id | [int64](#int64) |       | OracleScriptID is ID of an oracle script |

<a name="oracle.v1.QueryOracleScriptResponse"></a>

### QueryOracleScriptResponse

QueryOracleScriptResponse is response type for the Query/OracleScript RPC
method.

| Field         | Type                                    | Label | Description                                             |
| ------------- | --------------------------------------- | ----- | ------------------------------------------------------- |
| oracle_script | [OracleScript](#oracle.v1.OracleScript) |       | OracleScript is summary information of an oracle script |

<a name="oracle.v1.QueryParamsRequest"></a>

### QueryParamsRequest

QueryParamsRequest is request type for the Query/Params RPC method.

<a name="oracle.v1.QueryParamsResponse"></a>

### QueryParamsResponse

QueryParamsResponse is response type for the Query/Params RPC method.

| Field  | Type                        | Label | Description                                                |
| ------ | --------------------------- | ----- | ---------------------------------------------------------- |
| params | [Params](#oracle.v1.Params) |       | pagination defines an optional pagination for the request. |

<a name="oracle.v1.QueryPendingRequestsRequest"></a>

### QueryPendingRequestsRequest

QueryPendingRequestRequest is request type for the Query/PendingRequests RPC
method.

| Field             | Type              | Label | Description                                |
| ----------------- | ----------------- | ----- | ------------------------------------------ |
| validator_address | [string](#string) |       | ValidatorAddress is address of a validator |

<a name="oracle.v1.QueryPendingRequestsResponse"></a>

### QueryPendingRequestsResponse

QueryPendingRequestResponse is response type for the Query/PendingRequests
RPC method.

| Field       | Type            | Label    | Description                                                                 |
| ----------- | --------------- | -------- | --------------------------------------------------------------------------- |
| request_ids | [int64](#int64) | repeated | RequestIDs is a list of pending request IDs assigned to the given validator |

<a name="oracle.v1.QueryReportersRequest"></a>

### QueryReportersRequest

QueryReportersRequest is request type for the Query/Reporters RPC method.

| Field             | Type              | Label | Description                             |
| ----------------- | ----------------- | ----- | --------------------------------------- |
| validator_address | [string](#string) |       | ValidatorAddress is a validator address |

<a name="oracle.v1.QueryReportersResponse"></a>

### QueryReportersResponse

QueryReportersResponse is response type for the Query/Reporters RPC method.

| Field    | Type              | Label    | Description                                          |
| -------- | ----------------- | -------- | ---------------------------------------------------- |
| reporter | [string](#string) | repeated | Reporter is a list of account addresses of reporters |

<a name="oracle.v1.QueryRequestPoolRequest"></a>

### QueryRequestPoolRequest

QueryRequestPoolRequest is request type for the Query/RequestPool RPC method.

| Field       | Type              | Label | Description                                                |
| ----------- | ----------------- | ----- | ---------------------------------------------------------- |
| request_key | [string](#string) |       | RequestKey is a user-generated key for each request pool   |
| port_id     | [string](#string) |       | PortID is the corresponding port to the request pool       |
| channel_id  | [string](#string) |       | ChannelID is the corresponding channel to the request pool |

<a name="oracle.v1.QueryRequestPoolResponse"></a>

### QueryRequestPoolResponse

QueryRequestPoolResponse is response type for the Query/RequestPool RPC
method.

| Field                | Type                                                  | Label    | Description                                        |
| -------------------- | ----------------------------------------------------- | -------- | -------------------------------------------------- |
| request_pool_address | [string](#string)                                     |          | RequestPoolAddress is an address of a request pool |
| balance              | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated |                                                    |

<a name="oracle.v1.QueryRequestPriceRequest"></a>

### QueryRequestPriceRequest

QueryRequestPriceRequest is request type for the Query/RequestPrice RPC
method.

| Field     | Type              | Label    | Description                                                          |
| --------- | ----------------- | -------- | -------------------------------------------------------------------- |
| symbols   | [string](#string) | repeated | Symbol is unit of data indicating what the data is                   |
| ask_count | [int64](#int64)   |          | AskCount is number of validators allowed for fulfilling the request  |
| min_count | [int64](#int64)   |          | MinCount is number of validators required for fulfilling the request |

<a name="oracle.v1.QueryRequestPriceResponse"></a>

### QueryRequestPriceResponse

QueryRequestPriceResponse is response type for the Query/RequestPrice RPC
method.

| Field         | Type                                  | Label    | Description                                              |
| ------------- | ------------------------------------- | -------- | -------------------------------------------------------- |
| price_results | [PriceResult](#oracle.v1.PriceResult) | repeated | PriceResult is a list of price results for given symbols |

<a name="oracle.v1.QueryRequestRequest"></a>

### QueryRequestRequest

QueryRequestRequest is request type for the Query/Request RPC method.

| Field      | Type            | Label | Description                          |
| ---------- | --------------- | ----- | ------------------------------------ |
| request_id | [int64](#int64) |       | RequestID is ID of an oracle request |

<a name="oracle.v1.QueryRequestResponse"></a>

### QueryRequestResponse

QueryRequestResponse is response type for the Query/Request RPC method.

| Field   | Type                          | Label    | Description                                                                             |
| ------- | ----------------------------- | -------- | --------------------------------------------------------------------------------------- |
| request | [Request](#oracle.v1.Request) |          | Request is an oracle request                                                            |
| reports | [Report](#oracle.v1.Report)   | repeated | Reports is list of result data as raw reports that are fulfilled by assigned validators |
| result  | [Result](#oracle.v1.Result)   |          | Result is a final form of result data                                                   |

<a name="oracle.v1.QueryRequestSearchRequest"></a>

### QueryRequestSearchRequest

QueryRequestSearchRequest is request type for the Query/RequestSearch RPC
method.

| Field            | Type              | Label | Description                                                                         |
| ---------------- | ----------------- | ----- | ----------------------------------------------------------------------------------- |
| oracle_script_id | [int64](#int64)   |       | OracleScriptID is ID of an oracle script                                            |
| calldata         | [string](#string) |       | Calldata is OBI-encoded data in hex format as argument params for the oracle script |
| ask_count        | [uint64](#uint64) |       | AskCount is number of validators allowed for fulfilling the request                 |
| min_count        | [uint64](#uint64) |       | MinCount is number of validators required for fulfilling the request                |

<a name="oracle.v1.QueryRequestSearchResponse"></a>

### QueryRequestSearchResponse

QueryRequestSearchResponse is response type for the Query/RequestSearch RPC
method.

| Field   | Type                                                    | Label | Description                             |
| ------- | ------------------------------------------------------- | ----- | --------------------------------------- |
| request | [QueryRequestResponse](#oracle.v1.QueryRequestResponse) |       | Request is details of an oracle request |

<a name="oracle.v1.QueryRequestVerificationRequest"></a>

### QueryRequestVerificationRequest

QueryRequestVerificationRequest is request type for the
Query/RequestVerification RPC

| Field       | Type              | Label | Description                                                                          |
| ----------- | ----------------- | ----- | ------------------------------------------------------------------------------------ |
| chain_id    | [string](#string) |       | ChainID is the chain ID to identify which chain ID is used for the verification      |
| validator   | [string](#string) |       | Validator is a validator address                                                     |
| request_id  | [int64](#int64)   |       | RequestID is oracle request ID                                                       |
| external_id | [int64](#int64)   |       | ExternalID is an oracle&#39;s external ID                                            |
| reporter    | [string](#string) |       | Reporter is an bech32-encoded public key of the reporter authorized by the validator |
| signature   | [bytes](#bytes)   |       | Signature is a signature signed by the reporter using reporter&#39;s private key     |

<a name="oracle.v1.QueryRequestVerificationResponse"></a>

### QueryRequestVerificationResponse

QueryRequestVerificationResponse is response type for the
Query/RequestVerification RPC

| Field          | Type              | Label | Description                                                                      |
| -------------- | ----------------- | ----- | -------------------------------------------------------------------------------- |
| chain_id       | [string](#string) |       | ChainID is the targeted chain ID                                                 |
| validator      | [string](#string) |       | Validator is the targeted validator address                                      |
| request_id     | [int64](#int64)   |       | RequestID is the ID of targeted request                                          |
| external_id    | [int64](#int64)   |       | ExternalID is the ID of targeted oracle&#39;s external data source               |
| data_source_id | [int64](#int64)   |       | DataSourceID is the ID of a data source that relates to the targeted external ID |

<a name="oracle.v1.QueryValidatorRequest"></a>

### QueryValidatorRequest

QueryValidatorRequest is request type for the Query/Validator RPC method.

| Field             | Type              | Label | Description                                |
| ----------------- | ----------------- | ----- | ------------------------------------------ |
| validator_address | [string](#string) |       | ValidatorAddress is address of a validator |

<a name="oracle.v1.QueryValidatorResponse"></a>

### QueryValidatorResponse

QueryValidatorResponse is response type for the Query/Validator RPC method.

| Field  | Type                                          | Label | Description                                          |
| ------ | --------------------------------------------- | ----- | ---------------------------------------------------- |
| status | [ValidatorStatus](#oracle.v1.ValidatorStatus) |       | Status is status of a validator e.g. active/inactive |

<a name="oracle.v1.Query"></a>

### Query

Query defines the gRPC querier service.

| Method Name         | Request Type                                                                  | Response Type                                                                   | Description                                                                                                            |
| ------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Counts              | [QueryCountsRequest](#oracle.v1.QueryCountsRequest)                           | [QueryCountsResponse](#oracle.v1.QueryCountsResponse)                           | Counts queries the number of existing data sources, oracle scripts, and requests.                                      |
| Data                | [QueryDataRequest](#oracle.v1.QueryDataRequest)                               | [QueryDataResponse](#oracle.v1.QueryDataResponse)                               | Data queries content of the data source or oracle script for given SHA256 file hash.                                   |
| DataSource          | [QueryDataSourceRequest](#oracle.v1.QueryDataSourceRequest)                   | [QueryDataSourceResponse](#oracle.v1.QueryDataSourceResponse)                   | DataSource queries data source summary info for given data source id.                                                  |
| OracleScript        | [QueryOracleScriptRequest](#oracle.v1.QueryOracleScriptRequest)               | [QueryOracleScriptResponse](#oracle.v1.QueryOracleScriptResponse)               | OracleScript queries oracle script summary info for given oracle script id.                                            |
| Request             | [QueryRequestRequest](#oracle.v1.QueryRequestRequest)                         | [QueryRequestResponse](#oracle.v1.QueryRequestResponse)                         | Request queries request info for given request id.                                                                     |
| PendingRequests     | [QueryPendingRequestsRequest](#oracle.v1.QueryPendingRequestsRequest)         | [QueryPendingRequestsResponse](#oracle.v1.QueryPendingRequestsResponse)         | PendingRequests queries list of pending request IDs assigned to given validator.                                       |
| Validator           | [QueryValidatorRequest](#oracle.v1.QueryValidatorRequest)                     | [QueryValidatorResponse](#oracle.v1.QueryValidatorResponse)                     | Validator queries properties of given validator address.                                                               |
| Reporters           | [QueryReportersRequest](#oracle.v1.QueryReportersRequest)                     | [QueryReportersResponse](#oracle.v1.QueryReportersResponse)                     | Reporters queries all reporters associated with given validator address.                                               |
| ActiveValidators    | [QueryActiveValidatorsRequest](#oracle.v1.QueryActiveValidatorsRequest)       | [QueryActiveValidatorsResponse](#oracle.v1.QueryActiveValidatorsResponse)       | ActiveValidators queries all active oracle validators.                                                                 |
| Params              | [QueryParamsRequest](#oracle.v1.QueryParamsRequest)                           | [QueryParamsResponse](#oracle.v1.QueryParamsResponse)                           | Params queries parameters used for runnning bandchain network.                                                         |
| RequestSearch       | [QueryRequestSearchRequest](#oracle.v1.QueryRequestSearchRequest)             | [QueryRequestSearchResponse](#oracle.v1.QueryRequestSearchResponse)             | RequestSearch queries the latest request that match search criteria.                                                   |
| RequestPrice        | [QueryRequestPriceRequest](#oracle.v1.QueryRequestPriceRequest)               | [QueryRequestPriceResponse](#oracle.v1.QueryRequestPriceResponse)               | RequestPrice queries the latest price on standard price reference oracle script.                                       |
| RequestVerification | [QueryRequestVerificationRequest](#oracle.v1.QueryRequestVerificationRequest) | [QueryRequestVerificationResponse](#oracle.v1.QueryRequestVerificationResponse) | RequestVerification verifies a request to make sure that all information that will be used to report the data is valid |
| RequestPool         | [QueryRequestPoolRequest](#oracle.v1.QueryRequestPoolRequest)                 | [QueryRequestPoolResponse](#oracle.v1.QueryRequestPoolResponse)                 | RequestPool queries the request pool information corresponding to the given port, channel, and request key.            |

<a name="oracle/v1/tx.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## oracle/v1/tx.proto

<a name="oracle.v1.MsgActivate"></a>

### MsgActivate

MsgEditOracleScript is a message for activating a validator to become an
oracle provider. However, the activation can be revoked once the validator
is unable to provide data to fulfill requests

| Field     | Type              | Label | Description                                                                           |
| --------- | ----------------- | ----- | ------------------------------------------------------------------------------------- |
| validator | [string](#string) |       | Validator is the validator address who sign this message and request to be activated. |

<a name="oracle.v1.MsgActivateResponse"></a>

### MsgActivateResponse

MsgActivateResponse is response data for MsgActivate message

<a name="oracle.v1.MsgAddReporter"></a>

### MsgAddReporter

MsgAddReporter is a message for adding a new reporter for a validator.

| Field     | Type              | Label | Description                                                                                           |
| --------- | ----------------- | ----- | ----------------------------------------------------------------------------------------------------- |
| validator | [string](#string) |       | Validator is the validator address who requested to add a new reporter. Note that this is the signer. |
| reporter  | [string](#string) |       | Reporter is the account address to be added as a reporter to the validator.                           |

<a name="oracle.v1.MsgAddReporterResponse"></a>

### MsgAddReporterResponse

MsgAddReporterResponse is response data for MsgAddReporter message

<a name="oracle.v1.MsgCreateDataSource"></a>

### MsgCreateDataSource

MsgCreateDataSource is a message for creating a new data source.

| Field       | Type                                                  | Label    | Description                                                                                           |
| ----------- | ----------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- |
| name        | [string](#string)                                     |          | Name is the name of this data source used for display (optional).                                     |
| description | [string](#string)                                     |          | Description is the description of this data source used for display (optional).                       |
| executable  | [bytes](#bytes)                                       |          | Executable is the content of executable script or binary file to be run by validators upon execution. |
| fee         | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Fee is the data source fee per ask_count that data provider will receive from requester.              |
| treasury    | [string](#string)                                     |          | Treasury is the account address who receive data source fee from requester.                           |
| owner       | [string](#string)                                     |          | Owner is the account address who is allowed to make further changes to the data source.               |
| sender      | [string](#string)                                     |          | Sender is the signer of this message.                                                                 |

<a name="oracle.v1.MsgCreateDataSourceResponse"></a>

### MsgCreateDataSourceResponse

MsgCreateDataSourceResponse is response data for MsgCreateDataSource message

<a name="oracle.v1.MsgCreateOracleScript"></a>

### MsgCreateOracleScript

MsgCreateOracleScript is a message for creating an oracle script.

| Field           | Type              | Label | Description                                                                       |
| --------------- | ----------------- | ----- | --------------------------------------------------------------------------------- |
| name            | [string](#string) |       | Name is the name of this oracle script used for display (optional).               |
| description     | [string](#string) |       | Description is the description of this oracle script used for display (optional). |
| schema          | [string](#string) |       | Schema is the OBI schema of this oracle script (optional).                        |
| source_code_url | [string](#string) |       | SourceCodeURL is the absolute URI to the script&#39;s source code (optional).     |
| code            | [bytes](#bytes)   |       | Code is the oracle WebAssembly binary code. Can be raw of gzip compressed.        |
| owner           | [string](#string) |       | Owner is the address who is allowed to make further changes to the oracle script. |
| sender          | [string](#string) |       | Sender is the signer of this message.                                             |

<a name="oracle.v1.MsgCreateOracleScriptResponse"></a>

### MsgCreateOracleScriptResponse

MsgCreateOracleScriptResponse is response data for MsgCreateOracleScript
message

<a name="oracle.v1.MsgEditDataSource"></a>

### MsgEditDataSource

MsgEditDataSource is a message for editing an existing data source.

| Field          | Type                                                  | Label    | Description                                                                              |
| -------------- | ----------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------- |
| data_source_id | [int64](#int64)                                       |          | DataSourceID is the unique identifier of the data source to be edited.                   |
| name           | [string](#string)                                     |          | Name is the name of this data source used for display (optional).                        |
| description    | [string](#string)                                     |          | Description is the description of this data source used for display (optional).          |
| executable     | [bytes](#bytes)                                       |          | Executable is the executable script or binary to be run by validators upon execution.    |
| fee            | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | Fee is the data source fee per ask_count that data provider will receive from requester. |
| treasury       | [string](#string)                                     |          | Treasury is the address who receive data source fee from requester.                      |
| owner          | [string](#string)                                     |          | Owner is the address who is allowed to make further changes to the data source.          |
| sender         | [string](#string)                                     |          | Sender is the signer of this message. Must be the current data source&#39;s owner.       |

<a name="oracle.v1.MsgEditDataSourceResponse"></a>

### MsgEditDataSourceResponse

MsgEditDataSourceResponse is response data for MsgEditDataSource message

<a name="oracle.v1.MsgEditOracleScript"></a>

### MsgEditOracleScript

MsgEditOracleScript is a message for editing an existing oracle script.

| Field            | Type              | Label | Description                                                                                        |
| ---------------- | ----------------- | ----- | -------------------------------------------------------------------------------------------------- |
| oracle_script_id | [int64](#int64)   |       | OracleScriptID is the unique identifier of the oracle script to be edited.                         |
| name             | [string](#string) |       | Name is the name of this oracle script used for display (optional).                                |
| description      | [string](#string) |       | Description is the description of this oracle script used for display (optional).                  |
| schema           | [string](#string) |       | Schema is the OBI schema of this oracle script (optional).                                         |
| source_code_url  | [string](#string) |       | SourceCodeURL is the absolute URI to the script&#39;s source code (optional).                      |
| code             | [bytes](#bytes)   |       | Code is the oracle WebAssembly binary code. Can be raw of gzip compressed.                         |
| owner            | [string](#string) |       | Owner is an account address who is allowed to make further changes to the oracle script.           |
| sender           | [string](#string) |       | Sender is an account address who sign this message. Must be the current oracle script&#39;s owner. |

<a name="oracle.v1.MsgEditOracleScriptResponse"></a>

### MsgEditOracleScriptResponse

MsgEditOracleScriptResponse is response data for MsgEditOracleScript message

<a name="oracle.v1.MsgRemoveReporter"></a>

### MsgRemoveReporter

MsgAddReporter is a message for removing an existing reporter from a
validator.

| Field     | Type              | Label | Description                                                                                                    |
| --------- | ----------------- | ----- | -------------------------------------------------------------------------------------------------------------- |
| validator | [string](#string) |       | Validator is the validator address who requested to remove an existing reporter. Note that this is the signer. |
| reporter  | [string](#string) |       | Reporter is the account address to be removed from being the validator&#39;s reporter.                         |

<a name="oracle.v1.MsgRemoveReporterResponse"></a>

### MsgRemoveReporterResponse

MsgRemoveReporterResponse is response data for MsgRemoveReporter message

<a name="oracle.v1.MsgReportData"></a>

### MsgReportData

MsgReportData is a message for reporting to a data request by a validator.

| Field       | Type                              | Label    | Description                                                                                     |
| ----------- | --------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| request_id  | [int64](#int64)                   |          | RequestID is the identifier of the request to be reported to.                                   |
| raw_reports | [RawReport](#oracle.v1.RawReport) | repeated | RawReports is the list of report information provided by data sources identified by external ID |
| validator   | [string](#string)                 |          | Validator is the address of the validator that owns this report.                                |
| reporter    | [string](#string)                 |          | Reporter is the message signer who submits this report transaction for the validator.           |

<a name="oracle.v1.MsgReportDataResponse"></a>

### MsgReportDataResponse

MsgReportDataResponse is response data for MsgReportData message

<a name="oracle.v1.MsgRequestData"></a>

### MsgRequestData

MsgRequestData is a message for sending a data oracle request.

| Field            | Type                                                  | Label    | Description                                                                          |
| ---------------- | ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------------ |
| oracle_script_id | [int64](#int64)                                       |          | OracleScriptID is the identifier of the oracle script to be called.                  |
| calldata         | [bytes](#bytes)                                       |          | Calldata is the OBI-encoded call parameters for the oracle script.                   |
| ask_count        | [uint64](#uint64)                                     |          | AskCount is the number of validators to perform the oracle task.                     |
| min_count        | [uint64](#uint64)                                     |          | MinCount is the minimum number of validators sufficient to resolve the oracle tasks. |
| client_id        | [string](#string)                                     |          | ClientID is the client-provided unique identifier to track the request.              |
| fee_limit        | [cosmos.base.v1beta1.Coin](#cosmos.base.v1beta1.Coin) | repeated | FeeLimit is the maximum tokens that will be paid to all data source providers.       |
| prepare_gas      | [uint64](#uint64)                                     |          | PrepareGas is amount of gas to pay to prepare raw requests                           |
| execute_gas      | [uint64](#uint64)                                     |          | ExecuteGas is amount of gas to reserve for executing                                 |
| sender           | [string](#string)                                     |          | Sender is an account address of message sender.                                      |

<a name="oracle.v1.MsgRequestDataResponse"></a>

### MsgRequestDataResponse

MsgRequestDataResponse is response data for MsgRequestData message

<a name="oracle.v1.Msg"></a>

### Msg

Msg defines the oracle Msg service.

| Method Name        | Request Type                                              | Response Type                                                             | Description                                                               |
| ------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| RequestData        | [MsgRequestData](#oracle.v1.MsgRequestData)               | [MsgRequestDataResponse](#oracle.v1.MsgRequestDataResponse)               | RequestData defines a method for submitting a new request.                |
| ReportData         | [MsgReportData](#oracle.v1.MsgReportData)                 | [MsgReportDataResponse](#oracle.v1.MsgReportDataResponse)                 | ReportData defines a method for reporting a data to resolve the request.  |
| CreateDataSource   | [MsgCreateDataSource](#oracle.v1.MsgCreateDataSource)     | [MsgCreateDataSourceResponse](#oracle.v1.MsgCreateDataSourceResponse)     | CreateDataSource defines a method for creating a new data source.         |
| EditDataSource     | [MsgEditDataSource](#oracle.v1.MsgEditDataSource)         | [MsgEditDataSourceResponse](#oracle.v1.MsgEditDataSourceResponse)         | EditDataSource defines a method for editing an existing data source.      |
| CreateOracleScript | [MsgCreateOracleScript](#oracle.v1.MsgCreateOracleScript) | [MsgCreateOracleScriptResponse](#oracle.v1.MsgCreateOracleScriptResponse) | CreateOracleScript defines a method for creating a new oracle script.     |
| EditOracleScript   | [MsgEditOracleScript](#oracle.v1.MsgEditOracleScript)     | [MsgEditOracleScriptResponse](#oracle.v1.MsgEditOracleScriptResponse)     | EditOracleScript defines a method for editing an existing oracle script.  |
| Activate           | [MsgActivate](#oracle.v1.MsgActivate)                     | [MsgActivateResponse](#oracle.v1.MsgActivateResponse)                     | Activate defines a method for applying to be an oracle validator.         |
| AddReporter        | [MsgAddReporter](#oracle.v1.MsgAddReporter)               | [MsgAddReporterResponse](#oracle.v1.MsgAddReporterResponse)               | AddReporter defines a method for adding a new reporter for a validator.   |
| RemoveReporter     | [MsgRemoveReporter](#oracle.v1.MsgRemoveReporter)         | [MsgRemoveReporterResponse](#oracle.v1.MsgRemoveReporterResponse)         | RemoveReporter defines a method for removing an reporter from a validator |

<a name="oracle/v1/genesis.proto"></a>

<p align="right"><a href="#top">Top</a></p>

## oracle/v1/genesis.proto

<a name="oracle.v1.GenesisState"></a>

### GenesisState

GenesisState defines the oracle module&#39;s genesis state.

| Field          | Type                                                      | Label    | Description                                                                                                      |
| -------------- | --------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| params         | [Params](#oracle.v1.Params)                               |          | Params defines all the paramaters of the module.                                                                 |
| data_sources   | [DataSource](#oracle.v1.DataSource)                       | repeated | DataSources are data sources to be installed during genesis phase                                                |
| oracle_scripts | [OracleScript](#oracle.v1.OracleScript)                   | repeated | OracleScripts are list of oracle scripts to be installed during genesis phase                                    |
| reporters      | [ReportersPerValidator](#oracle.v1.ReportersPerValidator) | repeated | Reporters are mapping between reporter&#39;s account address (key) and validator&#39;s validator address (value) |

## Scalar Value Types

| .proto Type                    | Notes                                                                                                                                           | C++    | Java       | Python      | Go      | C#         | PHP            | Ruby                           |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ---------- | ----------- | ------- | ---------- | -------------- | ------------------------------ |
| <a name="double" /> double     |                                                                                                                                                 | double | double     | float       | float64 | double     | float          | Float                          |
| <a name="float" /> float       |                                                                                                                                                 | float  | float      | float       | float32 | float      | float          | Float                          |
| <a name="int32" /> int32       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint32 instead. | int32  | int        | int         | int32   | int        | integer        | Bignum or Fixnum (as required) |
| <a name="int64" /> int64       | Uses variable-length encoding. Inefficient for encoding negative numbers – if your field is likely to have negative values, use sint64 instead. | int64  | long       | int/long    | int64   | long       | integer/string | Bignum                         |
| <a name="uint32" /> uint32     | Uses variable-length encoding.                                                                                                                  | uint32 | int        | int/long    | uint32  | uint       | integer        | Bignum or Fixnum (as required) |
| <a name="uint64" /> uint64     | Uses variable-length encoding.                                                                                                                  | uint64 | long       | int/long    | uint64  | ulong      | integer/string | Bignum or Fixnum (as required) |
| <a name="sint32" /> sint32     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int32s.                            | int32  | int        | int         | int32   | int        | integer        | Bignum or Fixnum (as required) |
| <a name="sint64" /> sint64     | Uses variable-length encoding. Signed int value. These more efficiently encode negative numbers than regular int64s.                            | int64  | long       | int/long    | int64   | long       | integer/string | Bignum                         |
| <a name="fixed32" /> fixed32   | Always four bytes. More efficient than uint32 if values are often greater than 2^28.                                                            | uint32 | int        | int         | uint32  | uint       | integer        | Bignum or Fixnum (as required) |
| <a name="fixed64" /> fixed64   | Always eight bytes. More efficient than uint64 if values are often greater than 2^56.                                                           | uint64 | long       | int/long    | uint64  | ulong      | integer/string | Bignum                         |
| <a name="sfixed32" /> sfixed32 | Always four bytes.                                                                                                                              | int32  | int        | int         | int32   | int        | integer        | Bignum or Fixnum (as required) |
| <a name="sfixed64" /> sfixed64 | Always eight bytes.                                                                                                                             | int64  | long       | int/long    | int64   | long       | integer/string | Bignum                         |
| <a name="bool" /> bool         |                                                                                                                                                 | bool   | boolean    | boolean     | bool    | bool       | boolean        | TrueClass/FalseClass           |
| <a name="string" /> string     | A string must always contain UTF-8 encoded or 7-bit ASCII text.                                                                                 | string | String     | str/unicode | string  | string     | string         | String (UTF-8)                 |
| <a name="bytes" /> bytes       | May contain any arbitrary sequence of bytes.                                                                                                    | string | ByteString | str         | []byte  | ByteString | string         | String (ASCII-8BIT)            |
