# Client Module

For getting the request information on BandChain, ...

## Exceptions

[Request Exceptions](https://requests.readthedocs.io/en/master/_modules/requests/exceptions/)

| Type            | Description                          |
| --------------- | ------------------------------------ |
| BadRequest      | Invalid parameter (400)              |
| NotFound        | Entity not found (404)               |
| InternalError   | Something went wrong on server (5xx) |
| ConnectionError | DNS failure, refused connection      |
| Timeout         | Request timeout                      |

## getChainID

The function helps you to get the chain id

#### Return

string

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

(async () => {
  console.log(await client.getChainID());
})();
```

#### Result

```python
band-guanyu-testnet3
```

---

## getLatestBlock

The function helps you to get the latest block

#### Return

[`<Block>`]

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

(async () => {
  console.log(await client.getLatestBlock());
})();
```

#### Result

```javascript
Block(block=BlockHeader(header=BlockHeaderInfo(chain_id='band-guanyu-poa', height=3046843, time=1605798447, last_commit_hash=b'\x86\xe1\x97\xd1E\x9aB8Y\xb1U\x12V\x84\x13\x8fDBYmP\x15\x83\xe1\xd9\x85$\xb6\xccP\x7f8', data_hash=b'\x87t\x1d<N\xf2Rx9G\x11h\x17\x1e?#<\xadu\x9f\xf4 \x10V\xec\xb0\\\x92\xcf\x18\xefX', validators_hash=b'J<\xf0$np}\xa1d\x80\x9a\xad\xce\xbc\xc4\x9bo#\x8e\x98\xff\xc7\xc8)\x00O\xca\xddH\xb8\xa6>', next_validators_hash=b'J<\xf0$np}\xa1d\x80\x9a\xad\xce\xbc\xc4\x9bo#\x8e\x98\xff\xc7\xc8)\x00O\xca\xddH\xb8\xa6>', consensus_hash=b'\x0e\xaaoOK\x8b\xd1\xcc"-\x93\xbb\xd3\x91\xd0\x7f\x07M\xe6\xbeZR\xc6\x96Hu\xbb5[}\x0bE', app_hash=b'\xed^#\\\x93C\xf0\xdb\xfa\x7f\x1b\xb5\xb4y\x0f^\xa3\xf0U\x1cQ+\xfe\x95\x82\x95oW\x00\xdb\x9ea', last_results_hash=b'n4\x0b\x9c\xff\xb3z\x98\x9c\xa5D\xe6\xbbx\n,x\x90\x1d?\xb378v\x85\x11\xa3\x06\x17\xaf\xa0\x1d', evidence_hash=b'', proposer_address=b'\xc9j\xe6U2l\x9bw\xabY\xf6\x1b\xd0\x87m\xf2\x0b\xfc\x0c\xe9')), block_id=BlockID(hash=b'\x99\xf1\xd1\xdb\x9e\x8d\xa4<M\xa6$N\xc1\x9f$5\x1c\xc2\x1dH\x99{4\x93"\x0e\x0f\x15K`b\x11'))
```

---

## getAccount(address)

The function helps you to get the account details

#### Parameter

- address [`<Address>`]

#### Return

[`<Account>`]

#### Example

```javascript
import { Client, Wallet } from "bandchain.js";

const { Address } = Wallet;

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const address = Address.fromAccBech32(
  "band1jrhuqrymzt4mnvgw8cvy3s9zhx3jj0dq30qpte"
);

(async () => {
  console.log(JSON.stringify(await client.getAccount(address)));
})();
```

#### Result

```json
{
  "address": {
    "addr": {
      "type": "Buffer",
      "data": [
        144,
        239,
        192,
        12,
        155,
        18,
        235,
        185,
        177,
        14,
        62,
        24,
        72,
        192,
        162,
        185,
        163,
        41,
        61,
        160
      ]
    }
  },
  "coins": [{ "amount": "15132382", "denom": "uband" }],
  "publicKey": {
    "type": "tendermint/PubKeySecp256k1",
    "value": "A/5wi9pmUk/SxrzpBoLjhVWoUeA9Ku5PYpsF3pD1Htm8"
  },
  "accountNumber": 19,
  "sequence": 26
}
```

---

## getDataSource(id)

The function helps you to get the data source details by id

#### Parameter

- id `<number>` Data source ID

#### Return

[`<DataSource>`]

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const id = 1;

(async () => {
  console.log(JSON.stringify(await client.getDataSource(id)));
})();
```

#### Result

```json
{
  "owner": {
    "addr": {
      "type": "Buffer",
      "data": [
        146,
        91,
        185,
        88,
        208,
        141,
        216,
        214,
        193,
        53,
        202,
        84,
        237,
        195,
        107,
        204,
        97,
        79,
        252,
        23
      ]
    }
  },
  "name": "DS1",
  "description": "TBD",
  "fileName": "32ee6262d4a615f2c3ca0589c1c1af79212f24823453cb3f4cfff85b8d338045"
}
```

---

## getOracleScript(id)

The function helps you to get the oracle script details by id

#### Parameter

- id `<number>` Oracle Script ID

#### Return

[`<OracleScript>`]

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const id = 1;

(async () => {
  console.log(JSON.stringify(await client.getOracleScript(id)));
})();
```

#### Result

```json
{
  "owner": {
    "addr": {
      "type": "Buffer",
      "data": [
        146,
        91,
        185,
        88,
        208,
        141,
        216,
        214,
        193,
        53,
        202,
        84,
        237,
        195,
        107,
        204,
        97,
        79,
        252,
        23
      ]
    }
  },
  "name": "OS1",
  "description": "TBD",
  "fileName": "f86b37dbe62c3b8c86ae28523bf09e9963a6b2951dd1a5be79f29f66d8236abf",
  "schema": "{gas_option:string}/{gweix10:u64}"
}
```

---

## getRequestByID(id)

The function helps you to get the request details by id

#### Parameter

- id `<int>` Request ID

#### Return

[`<RequestInfo>`]

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const id = 1;

(async () => {
  console.log(JSON.stringify(await client.getRequestByID(id)));
})();
```

#### Result

```json
{
  "request": {
    "oracleScriptID": 1,
    "requestedValidators": [
      "bandvaloper10cmqs8esjefupq2tgajnxtwayc8lsjhqmmsc0m",
      "bandvaloper133jj708vr92rfd6fvnzyc6snylflzafu5k9ege",
      "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
      "bandvaloper1fy0nke9vnvtdp6jccn0l3rxw7c5yaekm7xu7z8"
    ],
    "minCount": 3,
    "requestHeight": 623,
    "clientID": "test",
    "calldata": { "type": "Buffer", "data": [0, 0, 0, 4, 102, 97, 115, 116] },
    "rawRequests": [
      {
        "externalID": 1,
        "dataSourceID": 1,
        "calldata": { "type": "Buffer", "data": [102, 97, 115, 116] }
      }
    ]
  },
  "reports": [
    {
      "validator": "bandvaloper1fy0nke9vnvtdp6jccn0l3rxw7c5yaekm7xu7z8",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": { "type": "Buffer", "data": [52, 57, 49, 48, 46, 48, 10] }
        }
      ]
    },
    {
      "validator": "bandvaloper10cmqs8esjefupq2tgajnxtwayc8lsjhqmmsc0m",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": { "type": "Buffer", "data": [52, 48, 53, 48, 46, 48, 10] }
        }
      ]
    },
    {
      "validator": "bandvaloper133jj708vr92rfd6fvnzyc6snylflzafu5k9ege",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": { "type": "Buffer", "data": [52, 48, 53, 48, 46, 48, 10] }
        }
      ]
    },
    {
      "validator": "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": { "type": "Buffer", "data": [52, 57, 49, 48, 46, 48, 10] }
        }
      ]
    }
  ],
  "result": {
    "requestPacketData": {
      "clientID": "test",
      "askCount": 4,
      "minCount": 3,
      "oracleScriptID": 1,
      "calldata": { "type": "Buffer", "data": [0, 0, 0, 4, 102, 97, 115, 116] }
    },
    "responsePacketData": {
      "requestID": 1,
      "requestTime": 1600357375,
      "resolveTime": 1600357377,
      "resolveStatus": 1,
      "ansCount": 4,
      "clientID": "test",
      "result": { "type": "Buffer", "data": [0, 0, 0, 0, 0, 0, 17, 128] }
    }
  }
}
```

---

## getReporters(validator)

The function helps you to get the reporters of validator

#### Parameter

- validator [`<Address>`]

#### Return

`List<Address>`

#### Example

```javascript
import { Client, Wallet } from "bandchain.js";

const { Address } = Wallet;

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const validator = Address.fromValBech32(
  "bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs"
);

(async () => {
  console.log(JSON.stringify(await client.getReporters(validator)));
})();
```

#### Result

```json
[
  {
    "addr": {
      "type": "Buffer",
      "data": [
        141,
        46,
        39,
        225,
        141,
        101,
        24,
        223,
        103,
        78,
        255,
        129,
        36,
        37,
        145,
        145,
        94,
        219,
        168,
        117
      ]
    }
  },
  {
    "addr": {
      "type": "Buffer",
      "data": [
        71,
        70,
        155,
        61,
        80,
        189,
        150,
        90,
        96,
        154,
        74,
        55,
        56,
        0,
        240,
        16,
        211,
        130,
        235,
        250
      ]
    }
  },
  {
    "addr": {
      "type": "Buffer",
      "data": [
        152,
        233,
        53,
        84,
        254,
        254,
        135,
        155,
        46,
        197,
        40,
        171,
        130,
        229,
        77,
        120,
        46,
        222,
        94,
        31
      ]
    }
  },
  {
    "addr": {
      "type": "Buffer",
      "data": [
        193,
        241,
        146,
        180,
        196,
        54,
        9,
        233,
        57,
        198,
        83,
        30,
        227,
        210,
        157,
        220,
        177,
        221,
        208,
        4
      ]
    }
  },
  {
    "addr": {
      "type": "Buffer",
      "data": [
        195,
        180,
        202,
        3,
        210,
        55,
        132,
        157,
        38,
        63,
        59,
        206,
        239,
        106,
        12,
        230,
        25,
        57,
        193,
        106
      ]
    }
  },
  {
    "addr": {
      "type": "Buffer",
      "data": [
        230,
        42,
        136,
        24,
        64,
        248,
        147,
        113,
        9,
        151,
        22,
        227,
        183,
        159,
        202,
        218,
        143,
        156,
        206,
        212
      ]
    }
  }
]
```

---

## getLatestRequest(oid, calldata, minCount, askCount)

The function helps you to get the latest request

#### Parameter

- oid `<number>` oracle script ID
- calldata `<Buffer>` The input parameters associated with the request
- minCount `<number>` The minimum number of validators necessary for the request to proceed to the execution phase
- askCount `<number>` The number of validators that are requested to respond to this request

#### Return

[`<RequestInfo>`]

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const oid = 4;
const calldata = Buffer.from(
  "0000000300000003425443000000034554480000000442414e44000000003b9aca00",
  "base64"
);
const minCount = 10;
const askCount = 16;

(async () => {
  console.log(
    JSON.stringify(
      await client.getRequestByID(oid, calldata, minCount, askCount)
    )
  );
})();
```

#### Result

```json
{
  "request": {
    "oracleScriptID": 4,
    "requestedValidators": [
      "bandvaloper1n50c9uhawz6s0u5wqfa57qvy2x6kyg933vgkuw",
      "bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs",
      "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
      "bandvaloper12wwz25zztfjpqx3fsq8rd4c48ew3vnywyplln8",
      "bandvaloper1muydxugudsd64w4ng3vylm4gct5qvakjnfgm7x",
      "bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn",
      "bandvaloper1czhg8j6ne4hpfjtdzhtqy8kss9673zacqcjlkn",
      "bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm",
      "bandvaloper1egcncstqyhm7njd5mva03lkrdtemmzehda940c",
      "bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc",
      "bandvaloper1u3c40nglllu4upuddlz6l59afq7uuz7lq6z977",
      "bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av",
      "bandvaloper19sd4dgvyujc5mhkz8ypg058cx6klxx9pae92ew",
      "bandvaloper133jj708vr92rfd6fvnzyc6snylflzafu5k9ege",
      "bandvaloper1edkewac2dg6u7fdxjceeyyndnhudrxsvx6k75m",
      "bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn"
    ],
    "minCount": 10,
    "requestHeight": 1978310,
    "clientID": "from_pyband",
    "calldata": {
      "type": "Buffer",
      "data": [
        0,
        0,
        0,
        3,
        0,
        0,
        0,
        3,
        66,
        84,
        67,
        0,
        0,
        0,
        3,
        69,
        84,
        72,
        0,
        0,
        0,
        4,
        66,
        65,
        78,
        68,
        0,
        0,
        0,
        0,
        59,
        154,
        202,
        0
      ]
    },
    "rawRequests": [
      {
        "externalID": 6,
        "dataSourceID": 6,
        "calldata": {
          "type": "Buffer",
          "data": [107, 114, 97, 107, 101, 110, 32, 66, 84, 67, 32, 69, 84, 72]
        }
      },
      {
        "externalID": 0,
        "dataSourceID": 4,
        "calldata": {
          "type": "Buffer",
          "data": [66, 84, 67, 32, 69, 84, 72, 32, 66, 65, 78, 68]
        }
      },
      {
        "externalID": 3,
        "dataSourceID": 6,
        "calldata": {
          "type": "Buffer",
          "data": [
            98,
            105,
            110,
            97,
            110,
            99,
            101,
            32,
            66,
            84,
            67,
            32,
            69,
            84,
            72,
            32,
            66,
            65,
            78,
            68
          ]
        }
      },
      {
        "externalID": 5,
        "dataSourceID": 7,
        "calldata": { "type": "Buffer", "data": [66, 84, 67, 32, 69, 84, 72] }
      },
      {
        "externalID": 2,
        "dataSourceID": 8,
        "calldata": {
          "type": "Buffer",
          "data": [66, 84, 67, 32, 69, 84, 72, 32, 66, 65, 78, 68]
        }
      },
      {
        "externalID": 4,
        "dataSourceID": 6,
        "calldata": {
          "type": "Buffer",
          "data": [
            104,
            117,
            111,
            98,
            105,
            112,
            114,
            111,
            32,
            66,
            84,
            67,
            32,
            69,
            84,
            72,
            32,
            66,
            65,
            78,
            68
          ]
        }
      },
      {
        "externalID": 7,
        "dataSourceID": 6,
        "calldata": {
          "type": "Buffer",
          "data": [
            98,
            105,
            116,
            102,
            105,
            110,
            101,
            120,
            32,
            66,
            84,
            67,
            32,
            69,
            84,
            72
          ]
        }
      },
      {
        "externalID": 8,
        "dataSourceID": 6,
        "calldata": {
          "type": "Buffer",
          "data": [
            98,
            105,
            116,
            116,
            114,
            101,
            120,
            32,
            66,
            84,
            67,
            32,
            69,
            84,
            72
          ]
        }
      },
      {
        "externalID": 1,
        "dataSourceID": 5,
        "calldata": {
          "type": "Buffer",
          "data": [66, 84, 67, 32, 69, 84, 72, 32, 66, 65, 78, 68]
        }
      }
    ]
  },
  "reports": [
    {
      "validator": "bandvaloper19sd4dgvyujc5mhkz8ypg058cx6klxx9pae92ew",
      "inBeforeResolve": false,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              55,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              52,
              52,
              10
            ]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              53,
              49,
              49,
              50,
              44,
              52,
              57,
              49,
              46,
              49,
              52,
              51,
              54,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              55,
              53,
              44,
              52,
              57,
              49,
              46,
              52,
              48,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper12wwz25zztfjpqx3fsq8rd4c48ew3vnywyplln8",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              51,
              55,
              44,
              52,
              57,
              49,
              46,
              50,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              48,
              46,
              49,
              56,
              44,
              52,
              57,
              49,
              46,
              49,
              56,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              53,
              46,
              53,
              48,
              49,
              57,
              44,
              52,
              57,
              49,
              46,
              52,
              48,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              49,
              53,
              49,
              53,
              44,
              52,
              57,
              48,
              46,
              54,
              57,
              54,
              50,
              44,
              54,
              46,
              48,
              50,
              53,
              57,
              48,
              57,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              52,
              53,
              44,
              52,
              57,
              49,
              46,
              50,
              55,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              48,
              50,
              55,
              44,
              52,
              57,
              49,
              46,
              49,
              48,
              51,
              53,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              55,
              54,
              44,
              52,
              57,
              49,
              46,
              52,
              49,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              55,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 49, 46, 48, 44, 52, 57, 49, 46, 48, 10]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              48,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              51,
              48,
              49,
              49,
              44,
              52,
              57,
              49,
              46,
              52,
              49,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper133jj708vr92rfd6fvnzyc6snylflzafu5k9ege",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              48,
              46,
              49,
              56,
              44,
              52,
              57,
              49,
              46,
              49,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              48,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              48,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              55,
              54,
              44,
              52,
              57,
              49,
              46,
              52,
              49,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              51,
              55,
              44,
              52,
              57,
              49,
              46,
              50,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              52,
              53,
              44,
              52,
              57,
              49,
              46,
              50,
              55,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              52,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              57,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              48,
              46,
              49,
              56,
              44,
              52,
              57,
              49,
              46,
              49,
              50,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              55,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              48,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              52,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1n50c9uhawz6s0u5wqfa57qvy2x6kyg933vgkuw",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              55,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              51,
              55,
              44,
              52,
              57,
              49,
              46,
              50,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 56, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              53,
              49,
              49,
              50,
              44,
              52,
              57,
              49,
              46,
              49,
              52,
              51,
              54,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              57,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa",
      "inBeforeResolve": false,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              55,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 56, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              49,
              46,
              49,
              52,
              55,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              57,
              54,
              48,
              50,
              44,
              52,
              57,
              49,
              46,
              52,
              50,
              51,
              56,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              53,
              49,
              49,
              50,
              44,
              52,
              57,
              49,
              46,
              49,
              52,
              51,
              54,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1czhg8j6ne4hpfjtdzhtqy8kss9673zacqcjlkn",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              48,
              46,
              49,
              56,
              44,
              52,
              57,
              49,
              46,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              55,
              55,
              50,
              56,
              44,
              52,
              57,
              49,
              46,
              51,
              57,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              52,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1egcncstqyhm7njd5mva03lkrdtemmzehda940c",
      "inBeforeResolve": false,
      "rawReports": [
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              53,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 56, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              55,
              54,
              44,
              52,
              57,
              49,
              46,
              52,
              50,
              51,
              56,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              53,
              49,
              49,
              50,
              44,
              52,
              57,
              49,
              46,
              49,
              52,
              51,
              54,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1edkewac2dg6u7fdxjceeyyndnhudrxsvx6k75m",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 48, 46, 49, 56, 44, 52, 57, 49, 10]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              52,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              57,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1muydxugudsd64w4ng3vylm4gct5qvakjnfgm7x",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              53,
              49,
              10
            ]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              55,
              53,
              44,
              52,
              57,
              49,
              46,
              52,
              49,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              52,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1u3c40nglllu4upuddlz6l59afq7uuz7lq6z977",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              48,
              46,
              49,
              56,
              44,
              52,
              57,
              49,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              53,
              44,
              52,
              57,
              49,
              46,
              50,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              54,
              49,
              50,
              55,
              44,
              52,
              57,
              48,
              46,
              56,
              52,
              51,
              51,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              52,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av",
      "inBeforeResolve": true,
      "rawReports": [
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              52,
              53,
              44,
              52,
              57,
              49,
              46,
              51,
              51,
              10
            ]
          }
        },
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 6,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 50, 53, 46, 50, 44, 52, 57, 49, 46, 50, 49, 10]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              50,
              46,
              56,
              53,
              44,
              52,
              57,
              49,
              46,
              48,
              54,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              50,
              51,
              46,
              48,
              44,
              52,
              57,
              49,
              46,
              50,
              54,
              51,
              56,
              10
            ]
          }
        },
        {
          "externalID": 8,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              49,
              46,
              48,
              52,
              51,
              44,
              52,
              57,
              48,
              46,
              57,
              54,
              49,
              10
            ]
          }
        },
        {
          "externalID": 4,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              52,
              46,
              53,
              53,
              49,
              51,
              44,
              52,
              57,
              48,
              46,
              56,
              53,
              51,
              52,
              44,
              54,
              46,
              48,
              50,
              55,
              55,
              49,
              54,
              10
            ]
          }
        },
        {
          "externalID": 3,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              54,
              46,
              56,
              56,
              50,
              57,
              44,
              52,
              57,
              49,
              46,
              51,
              54,
              51,
              55,
              44,
              54,
              46,
              48,
              51,
              54,
              56,
              50,
              51,
              10
            ]
          }
        }
      ]
    },
    {
      "validator": "bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn",
      "inBeforeResolve": false,
      "rawReports": [
        {
          "externalID": 2,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              49,
              53,
              46,
              54,
              56,
              53,
              57,
              44,
              52,
              56,
              55,
              46,
              49,
              56,
              50,
              55,
              44,
              53,
              46,
              57,
              56,
              53,
              49,
              50,
              56,
              10
            ]
          }
        },
        {
          "externalID": 1,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              49,
              51,
              48,
              46,
              49,
              44,
              52,
              56,
              55,
              46,
              57,
              50,
              44,
              54,
              46,
              48,
              49,
              10
            ]
          }
        },
        {
          "externalID": 0,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              51,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              50,
              44,
              54,
              46,
              48,
              50,
              57,
              10
            ]
          }
        },
        {
          "externalID": 5,
          "data": {
            "type": "Buffer",
            "data": [
              49,
              56,
              50,
              49,
              57,
              46,
              48,
              52,
              44,
              52,
              57,
              49,
              46,
              53,
              49,
              10
            ]
          }
        },
        {
          "externalID": 7,
          "data": {
            "type": "Buffer",
            "data": [49, 56, 50, 49, 54, 46, 48, 44, 52, 57, 49, 46, 50, 54, 10]
          }
        },
        { "externalID": 6, "data": { "type": "Buffer", "data": [] } },
        { "externalID": 4, "data": { "type": "Buffer", "data": [] } },
        { "externalID": 3, "data": { "type": "Buffer", "data": [] } },
        { "externalID": 8, "data": { "type": "Buffer", "data": [] } }
      ]
    }
  ],
  "result": {
    "requestPacketData": {
      "clientID": "from_pyband",
      "askCount": 16,
      "minCount": 10,
      "oracleScriptID": 4,
      "calldata": {
        "type": "Buffer",
        "data": [
          0,
          0,
          0,
          3,
          0,
          0,
          0,
          3,
          66,
          84,
          67,
          0,
          0,
          0,
          3,
          69,
          84,
          72,
          0,
          0,
          0,
          4,
          66,
          65,
          78,
          68,
          0,
          0,
          0,
          0,
          59,
          154,
          202,
          0
        ]
      }
    },
    "responsePacketData": {
      "requestID": 374466,
      "requestTime": 1605857590,
      "resolveTime": 1605857596,
      "resolveStatus": 1,
      "ansCount": 12,
      "clientID": "from_pyband",
      "result": {
        "type": "Buffer",
        "data": [
          0,
          0,
          0,
          3,
          0,
          0,
          16,
          144,
          248,
          65,
          21,
          176,
          0,
          0,
          0,
          114,
          93,
          205,
          48,
          0,
          0,
          0,
          0,
          1,
          103,
          71,
          165,
          160
        ]
      }
    }
  }
}
```

---

## sendTxBlockMode(data)

The function helps you to send transaction block mode.

#### Parameter

- data `<object>` The signed transaction

#### Return

[`<TransactionBlockMode>`]

#### Example

```javascript
import { Client, Wallet, Transaction, Message } from "bandchain.js";

const { PrivateKey } = Wallet;
const { MsgRequest } = Message;

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const calldata = Buffer.from(
  "0000000400000007636f696e6f6e650000000762697468756d620000000868756f626970726f0000000762696e616e6365000000044c554e41000000034b525700000000000f4240",
  "hex"
);
const clientID = "from bandchain.js";

const privkey = PrivateKey.fromMnemonic("s");
const pubkey = privkey.toPubkey();
const addr = pubkey.toAddress();
const msgRequest = new MsgRequest(15, calldata, 16, 10, clientID, addr);

const tscBlockExample = async () => {
  const account = await client.getAccount(addr);
  const tsc = new Transaction()
    .withMessages(msgRequest)
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID("band-guanyu-testnet3")
    .withGas(5000000)
    .withMemo("bandchain2.js example");

  const signatureTx = privkey.sign(tsc.getSignData());
  const rawTx = tsc.getTxData(signatureTx, pubkey);
  client.sendTxBlockMode(rawTx).then((e) => console.log(JSON.stringify(e)));
};

(async () => {
  await tscBlockExample();
})();
```

#### Result

```json
{
  "height": 2132522,
  "txHash": {
    "type": "Buffer",
    "data": [
      229,
      34,
      42,
      254,
      245,
      25,
      7,
      16,
      25,
      37,
      60,
      41,
      181,
      66,
      151,
      178,
      102,
      60,
      95,
      154,
      173,
      216,
      75,
      121,
      211,
      227,
      223,
      247,
      38,
      80,
      213,
      109
    ]
  },
  "gasWanted": 5000000,
  "gasUsed": 5000000,
  "code": 0,
  "log": [
    {
      "msg_index": 0,
      "log": "",
      "events": [
        {
          "type": "message",
          "attributes": [{ "key": "action", "value": "request" }]
        },
        {
          "type": "raw_request",
          "attributes": [
            { "key": "data_source_id", "value": "17" },
            {
              "key": "data_source_hash",
              "value": "0a9f048384cb2be0060c2258446339fde13cb97fc69f5c5ebe14dcf3c939a923"
            },
            { "key": "external_id", "value": "0" },
            { "key": "calldata", "value": "coinone LUNA KRW" },
            { "key": "data_source_id", "value": "17" },
            {
              "key": "data_source_hash",
              "value": "0a9f048384cb2be0060c2258446339fde13cb97fc69f5c5ebe14dcf3c939a923"
            },
            { "key": "external_id", "value": "1" },
            { "key": "calldata", "value": "bithumb LUNA KRW" },
            { "key": "data_source_id", "value": "17" },
            {
              "key": "data_source_hash",
              "value": "0a9f048384cb2be0060c2258446339fde13cb97fc69f5c5ebe14dcf3c939a923"
            },
            { "key": "external_id", "value": "2" },
            { "key": "calldata", "value": "huobipro LUNA USDT" },
            { "key": "data_source_id", "value": "17" },
            {
              "key": "data_source_hash",
              "value": "0a9f048384cb2be0060c2258446339fde13cb97fc69f5c5ebe14dcf3c939a923"
            },
            { "key": "external_id", "value": "3" },
            { "key": "calldata", "value": "binance LUNA USDT" },
            { "key": "data_source_id", "value": "9" },
            {
              "key": "data_source_hash",
              "value": "433c2baf18dfeadbb5f243555b9bb01ce58c39389259b206ec2fbe5bd6713aa7"
            },
            { "key": "external_id", "value": "1000000008" },
            { "key": "calldata", "value": "KRW" },
            { "key": "data_source_id", "value": "10" },
            {
              "key": "data_source_hash",
              "value": "eb49b048019b4cffd6e0b2357e5b9755af355909347126a049e40e0fd041d3ec"
            },
            { "key": "external_id", "value": "1000000009" },
            { "key": "calldata", "value": "KRW" },
            { "key": "data_source_id", "value": "12" },
            {
              "key": "data_source_hash",
              "value": "e1913f3fca59e359f14cae3d23d8bc29e758ac0741bdb0cf5a4c8bb30be07e7d"
            },
            { "key": "external_id", "value": "1000000011" },
            { "key": "calldata", "value": "KRW" }
          ]
        },
        {
          "type": "request",
          "attributes": [
            { "key": "id", "value": "413111" },
            { "key": "client_id", "value": "from bandchain.js" },
            { "key": "oracle_script_id", "value": "15" },
            {
              "key": "calldata",
              "value": "0000000400000007636f696e6f6e650000000762697468756d620000000868756f626970726f0000000762696e616e6365000000044c554e41000000034b525700000000000f4240"
            },
            { "key": "ask_count", "value": "16" },
            { "key": "min_count", "value": "10" },
            { "key": "gas_used", "value": "21368" },
            {
              "key": "validator",
              "value": "bandvaloper1a05af3g6s0qltqdam569m43630zzhpnh99d4jn"
            },
            {
              "key": "validator",
              "value": "bandvaloper19gh30we6ypgec5plmnxd7smlqp66hel4lx573n"
            },
            {
              "key": "validator",
              "value": "bandvaloper1nykclk39ge2zyk7h3uyzkfncyxstnp4qkwtgvm"
            },
            {
              "key": "validator",
              "value": "bandvaloper135hz0cvdv5vd7e6wl7qjgfv3j90dh2r4vry2cs"
            },
            {
              "key": "validator",
              "value": "bandvaloper1r9eslzfdj976hap6z06wlq7nwnn0w6x0y40zn3"
            },
            {
              "key": "validator",
              "value": "bandvaloper1edkewac2dg6u7fdxjceeyyndnhudrxsvx6k75m"
            },
            {
              "key": "validator",
              "value": "bandvaloper12w7p4e3suvjpg84mqdh5k5n9h6x7zsc3e8jtwn"
            },
            {
              "key": "validator",
              "value": "bandvaloper158q56s6zgnk4zf3sz6cz4jmpmxpanhxsfdra05"
            },
            {
              "key": "validator",
              "value": "bandvaloper1h54f3tpfrl2gszkpqxmqaurkfkffd2qdrxw8hl"
            },
            {
              "key": "validator",
              "value": "bandvaloper12wwz25zztfjpqx3fsq8rd4c48ew3vnywyplln8"
            },
            {
              "key": "validator",
              "value": "bandvaloper1unfg2zhnssl07tql8d85zc6rx7zsfs5qh206av"
            },
            {
              "key": "validator",
              "value": "bandvaloper1u3c40nglllu4upuddlz6l59afq7uuz7lq6z977"
            },
            {
              "key": "validator",
              "value": "bandvaloper1nlepx7xg53fsy6vslrss6adtmtl8a33kusv7fa"
            },
            {
              "key": "validator",
              "value": "bandvaloper19sd4dgvyujc5mhkz8ypg058cx6klxx9pae92ew"
            },
            {
              "key": "validator",
              "value": "bandvaloper1sy7ctj5qjgre7s9mgf7u8m5exdrfpcsxyqrxnc"
            },
            {
              "key": "validator",
              "value": "bandvaloper1s5rfuyu9a28dc8zjrz05tc4vzw4au4t6m2wmsm"
            }
          ]
        }
      ]
    }
  ]
}
```

---

## sendTxSyncMode(data)

The function helps you to send transaction sync mode.

#### Parameter

- data `<object>` The signed transaction

#### Return

[`<TransactionSyncMode>`]

#### Example

```javascript
import { Client, Wallet, Transaction, Message } from "bandchain.js";

const { PrivateKey } = Wallet;
const { MsgRequest } = Message;

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const calldata = Buffer.from(
  "0000000400000007636f696e6f6e650000000762697468756d620000000868756f626970726f0000000762696e616e6365000000044c554e41000000034b525700000000000f4240",
  "hex"
);
const clientID = "from bandchain.js";

const privkey = PrivateKey.fromMnemonic("s");
const pubkey = privkey.toPubkey();
const addr = pubkey.toAddress();
const msgRequest = new MsgRequest(15, calldata, 16, 10, clientID, addr);

const tscSyncExample = async () => {
  const account = await client.getAccount(addr);
  const tsc = new Transaction()
    .withMessages(msgRequest)
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID("band-guanyu-testnet3")
    .withGas(5000000)
    .withMemo("bandchain2.js example");

  const signatureTx = privkey.sign(tsc.getSignData());
  const rawTx = tsc.getTxData(signatureTx, pubkey);
  client.sendTxSyncMode(rawTx).then((e) => console.log(JSON.stringify(e)));
};

(async () => {
  await tscSyncExample();
})();
```

#### Result

```json
{
  "txHash": {
    "type": "Buffer",
    "data": [
      185,
      41,
      187,
      201,
      133,
      33,
      132,
      222,
      107,
      11,
      17,
      167,
      90,
      53,
      114,
      25,
      62,
      176,
      163,
      55,
      226,
      42,
      99,
      3,
      131,
      207,
      252,
      97,
      253,
      197,
      11,
      199
    ]
  },
  "code": 0
}
```

---

## sendTxAsyncMode(data)

The function helps you to send transaction async mode.

#### Parameter

- data `<object>` The signed transaction

#### Return

[`<TransactionAsyncMode>`]

#### Example

```javascript
import { Client, Wallet, Transaction, Message } from "bandchain.js";

const { PrivateKey } = Wallet;
const { MsgRequest } = Message;

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

const calldata = Buffer.from(
  "0000000400000007636f696e6f6e650000000762697468756d620000000868756f626970726f0000000762696e616e6365000000044c554e41000000034b525700000000000f4240",
  "hex"
);
const clientID = "from bandchain.js";

const privkey = PrivateKey.fromMnemonic("s");
const pubkey = privkey.toPubkey();
const addr = pubkey.toAddress();
const msgRequest = new MsgRequest(15, calldata, 16, 10, clientID, addr);

const tscAsyncExample = async () => {
  const account = await client.getAccount(addr);
  const tsc = new Transaction()
    .withMessages(msgRequest)
    .withAccountNum(account.accountNumber)
    .withSequence(account.sequence)
    .withChainID("band-guanyu-testnet3")
    .withGas(5000000)
    .withMemo("bandchain2.js example");

  const signatureTx = privkey.sign(tsc.getSignData());
  const rawTx = tsc.getTxData(signatureTx, pubkey);
  client.sendTxAsyncMode(rawTx).then((e) => console.log(JSON.stringify(e)));
};

(async () => {
  await tscAsyncExample();
})();
```

#### Result

```json
{
  "txHash": {
    "type": "Buffer",
    "data": [
      136,
      75,
      84,
      26,
      113,
      85,
      165,
      252,
      241,
      192,
      49,
      228,
      17,
      72,
      42,
      110,
      234,
      110,
      206,
      97,
      76,
      34,
      67,
      211,
      210,
      255,
      60,
      42,
      173,
      185,
      116,
      40
    ]
  }
}
```

---

## getPriceSymbols(minCount, askCount)

The function helps you to get price symbols based on min count and ask count

#### Parameter

- minCount `<int>` The minimum number of validators necessary for the request to proceed to the execution phase
- askCount `<int>` The number of validators that are requested to respond to this request

#### Return

`List<string>`

#### Example

```javascript
from pyband import Client

RPC_URL = "http://poa-api.bandchain.org"

min_count = 3
ask_count = 4

c = Client(RPC_URL)
print(c.get_price_symbols(min_count, ask_count))
```

#### Result

```javascript
[
  "2KEY",
  "ABYSS",
  "ADA",
  "AKRO",
  "ALGO",
  "AMPL",
  "ANT",
  "AST",
  "ATOM",
  "AUD",
  "BAL",
  "BAND",
  "BAT",
  "BCH",
  "BLZ",
  "BNB",
  "BNT",
  "BRL",
  "BSV",
  "BTC",
  "BTG",
  "BTM",
  "BTS",
  "BTT",
  "BTU",
  "BUSD",
  "BZRX",
  "CAD",
  "CHF",
  "CKB",
  "CND",
  "CNY",
  "COMP",
  "CREAM",
  "CRO",
  "CRV",
  "CVC",
  "DAI",
  "DASH",
  "DCR",
  "DGB",
  "DGX",
  "DIA",
  "DOGE",
  "DOT",
  "EGLD",
  "ELF",
  "ENJ",
  "EOS",
  "EQUAD",
  "ETC",
  "ETH",
  "EUR",
  "EURS",
  "EWT",
  "FET",
  "FNX",
  "FOR",
  "FTM",
  "FTT",
  "FXC",
  "GBP",
  "GDC",
  "GEN",
  "GHT",
  "GNO",
  "GVT",
  "HBAR",
  "HKD",
  "HNT",
  "HOT",
  "HT",
  "ICX",
  "INR",
  "IOST",
  "IOTX",
  "JPY",
  "JST",
  "KAI",
  "KAVA",
  "KDA",
  "KEY",
  "KMD",
  "KNC",
  "KRW",
  "KSM",
  "LEND",
  "LEO",
  "LINA",
  "LINK",
  "LOOM",
  "LRC",
  "LSK",
  "LTC",
  "LUNA",
  "MANA",
  "MATIC",
  "MCO",
  "MET",
  "MFG",
  "MIOTA",
  "MKR",
  "MLN",
  "MNT",
  "MTL",
  "MYB",
  "NEO",
  "NEXXO",
  "NMR",
  "NOK",
  "NPXS",
  "NXM",
  "NZD",
  "OCEAN",
  "OGN",
  "OKB",
  "OMG",
  "ONE",
  "ONT",
  "ORN",
  "OST",
  "OXT",
  "PAX",
  "PAXG",
  "PAY",
  "PBTC",
  "PLR",
  "PLTC",
  "PNK",
  "PNT",
  "POLY",
  "POWR",
  "QKC",
  "QNT",
  "RAE",
  "REN",
  "RENBTC",
  "REP",
  "REQ",
  "RLC",
  "RMB",
  "RSR",
  "RSV",
  "RUB",
  "RUNE",
  "RVN",
  "SAN",
  "SC",
  "SGD",
  "SNT",
  "SNX",
  "SOL",
  "SPIKE",
  "SPN",
  "SRM",
  "STMX",
  "STORJ",
  "STX",
  "SUSD",
  "SUSHI",
  "SXP",
  "THETA",
  "TKN",
  "TKX",
  "TOMO",
  "TRB",
  "TRX",
  "TRYB",
  "TUSD",
  "UBT",
  "UNI",
  "UOS",
  "UPP",
  "USDC",
  "USDS",
  "USDT",
  "VET",
  "VIDT",
  "WAN",
  "WAVES",
  "WBTC",
  "WNXM",
  "WRX",
  "XAG",
  "XAU",
  "XDR",
  "XEM",
  "XHV",
  "XLM",
  "XMR",
  "XRP",
  "XTZ",
  "XZC",
  "YAMV2",
  "YFI",
  "YFII",
  "YFV",
  "ZEC",
  "ZRX",
];
```

---

## getRequestIDByTxHash(txHash)

The function helps you to get price symbols based on min count and ask count

#### Parameter

- txHash `Buffer` Transaction hash

#### Return

`List<number>`

#### Exception

| Type  | Description                            |
| ----- | -------------------------------------- |
| Error | There is no request message in this tx |

#### Example

```javascript
import { Client } from "bandchain.js";

const client = new Client("https://guanyu-testnet3-query.bandchain.org");

(async () => {
  console.log(
    JSON.stringify(
      await client.getRequestIDByTxHash(
        Buffer.from(
          "C3E101062433491462E1A25BFF22006A937DE80F13287A313FA4485450038CD2",
          "hex"
        )
      )
    )
  );
})();
```

#### Result

```json
[403200]
```

[`<address>`]: /client-library/bandchain.js/wallet.html "Address"
[`<transactionasyncmode>`]: /client-library/bandchain.js/data.html#transactionasyncmode "TransactionAsyncMode"
[`<transactionsyncmode>`]: /client-library/bandchain.js/data.html#transactionsyncmode "TransactionSyncMode"
[`<transactionblockmode>`]: /client-library/bandchain.js/data.html#transactionblockmode "TransactionBlockMode"
[`<block>`]: /client-library/bandchain.js/data.html#block "Block"
[`<datasource>`]: /client-library/bandchain.js/data.html#datasource "DataSource"
[`<oraclescript>`]: /client-library/bandchain.js/data.html#oraclescript "OracleScript"
[`<requestinfo>`]: /client-library/bandchain.js/data.html#requestinfo "RequestInfo"
[`<account>`]: /client-library/bandchain.js/data.html#account "Account"
