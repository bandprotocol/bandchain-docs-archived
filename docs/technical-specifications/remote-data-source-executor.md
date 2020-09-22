<!--
order: 3
-->

# Remote Data Source Executor

The remote data source executor executes the various [data sources](../whitepaper/terminology.md#data-sources) stored on BandChain in order to retrieve data from the data providers. The executor itself is a [`function-as-a-Service`](https://en.wikipedia.org/wiki/function_as_a_service) hosted on a cloud service provider.

The goal of this design is to separate data source execution processes from processes related to the validator node itself. This separation of execution will be beneficial in cases where the data sources are not working correctly ( infinite loop, bad code execution, for example). In those cases, such separation can prevent validator nodes from overloading or crashing due to the error.

Also, from a validator's perspective, all they have to do to execute a data source is to send an executable file content in JSON format (the data source script), along with the relevant calldata, to an endpoint, thus minimizing the work they have to do themselves.

## Resource

  Endpoint | HTTP Request Method  |  Description |
|---|---|---|
| `/execute` | `POST` | Executes the data source |

## Request

### Request Headers

```json
{
  "content-type": "application/json"
}
```

### Request Body

|  Field | Type  |  Description |
|---|---|---|
| executable | string` | Base64-encoded data source that the executor will execute  |
| calldata | string | Bash-encoded input parameters of data source |
| timeout | number | Execution time limit (in milliseconds) |

#### Example

```json
{
  "executable": "IyEvYmluL3NoXG5cbnN5bWJvbD0kMVxuXG4jIENyeXB0b2N1cnJlbmN5IHByaWNlIGVuZHBvaW50OiBodHRwczovL3d3dy5jb2luZ2Vja28uY29tL2FwaS9kb2N1bWVudGF0aW9ucy92M1xudXJsPVwiaHR0cHM6Ly9hcGkuY29pbmdlY2tvLmNvbS9hcGkvdjMvc2ltcGxlL3ByaWNlP2lkcz0kc3ltYm9sJnZzX2N1cnJlbmNpZXM9dXNkXCJcblxuIyBQZXJmb3JtcyBkYXRhIGZldGNoaW5nIGFuZCBwYXJzZXMgdGhlIHJlc3VsdFxuY3VybCAtcyAtWCBHRVQgJHVybCAtSCBcImFjY2VwdDogYXBwbGljYXRpb24vanNvblwiIHwganEgLWVyIFwiLltcXFwiJHN5bWJvbFxcXCJdLnVzZFwiXG4=",
  "calldata": "bitcoin",
  "timeout": 1000
}
```

## Response

### Response Headers

```json
{
  "content-type":  "application/json",
  "access-control-allow-methods":  "OPTIONS, POST",
}
```

### Response Body

|  Field | Type  |  Description |
|---|---|---|
| returncode | number | Exit code (0-255)  |
| stdout | string | Data source output |
| stderr | string | Data source error output |
| error | string | `""` or error message from executor |

#### Response Codes

##### 200 OK

| Exit code | Description | Error Message |
|---|---|---|
| 0 - 255 | Executable errors from data source run successfully | N/A
| 111 | Execution timeout | Execution time limit exceeded |
| 112 | Stdout exceed | Stdout exceeded max size
| 113 | Stderr exceed | Stderr exceeded max size
| 126 | Execution fail | Execution fail |

##### 400 Bad Request

| Error | Error message |
| --- | --- |
| Missing executable value | `executable` field is missing from JSON request
| Executable value exceed | `executable` value exceed max size
| Missing calldata value | `calldata` field is missing from JSON request
| Calldata value exceed | `calldata` exceeded max size
| Missing timeout value | `timeout` field is missing from JSON request
| Invalid timeout format | `timeout` type is invalid
| Runtime value exceed | Runtime exceeded max size
