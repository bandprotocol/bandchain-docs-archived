<!--
order: 3
-->

# Default Oracle Scripts

## Cryptocurrency Price in USD

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/1)

Retrieves the current price of a cryptocurrency from [CoinGecko](https://coingecko.com), [CryptoCompare](https://cryptocompare.com), and [Binance](https://binance.com), then returns the average value.

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| symbol | string | The cryptocurrency symbol such as BAND, BTC, ETH, etc.|
| multiplier | uint64 | The value to multiply the cryptocurrency price by |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
px | uint64 | The requested crypto price multiplied by the multiplier.

## Gold Price in ATOMs

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/2)

Retrieves the current gold price from [FreeForexAPI](https://www.freeforexapi.com/) and returns the value based in ATOMs. The current ATOM price is queried through [Binance](https://binance.com).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| multiplier | uint64 | The value to multiply the cryptocurrency price by |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
px | uint64 | The current gold price price multiplied by the multiplier |


## Alpha Vantage Stock Price

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/3)

Retrieves the current price of a stock from [Alpha Vantage](https://www.alphavantage.co/).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| symbol | string | The cryptocurrency symbol such as BAND, BTC, ETH, etc.|
| api_key | string | Your Alphavantage API key. Can be obtained for free from their [support page](https://www.alphavantage.co/support/#api-key) |
| multiplier | uint64 | The value to multiply the stock price by |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
px | uint64 | The current gold price price multiplied by the multiplier |


## Latest Bitcoin Block Count

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/4)

Retrieves the latest Bitcoin block height from [Blockchain.info](https://blockchain.info).

**Request Parameters**

None.

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
block_count | uint64 | The latest Bitcoin block height |

## Bitcoin Block Hash

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/5)

This oracle script retrieves the Bitcoin block hash at a given block height.

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
block_height | uint64 | The block height at which to query the block hash |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
block_hash | string | The Bitcoin block hash at the requested block height |

## Ethereum Gas Price

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/8)

Retrieves the current Ethereum gas price from [ETH Gas Station](https://ethgasstation.info).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
gas_option | string | One of `fastest`, `fast`, `average`, `safeLow` |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
gas_price_in_gwei | uint64 | Current Ethereum gas price in Gwei multiplied by 100 |
| timestamp | uint64 | The current Unix timestamp (in seconds) |

## Flight Verification

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/9)

Queries and verifies the arrival/departure of a specific aircraft at a specific airport in a specific period of time from [OpenSky Network](https://opensky-network.org/).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| icao24 | string | [ICAO 24-bit hex identifier](https://www.faa.gov/licenses_certificates/aircraft_certification/aircraft_registry/releasable_aircraft_download/) for the aircraft |
| flight_option | string | One of `ARRIVAL`, `DEPARTURE` |
| airport | string | [ICAO identifier](https://www.world-airport-codes.com/alphabetical/airport-code/a.html?page=1) for the airport |
| should_happen_before | uint64 | Unix timestamp in seconds |
| should_happen_after | uint64 | Unix timestamp in seconds |


**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
has_flight_found | bool | `True` if a flight matches the query. `False` if a flight does match the query |

## Open Weather Map

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/10)

Retrieves information about weather from [Open Weather Map](https://api.openweathermap.org/).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| city | string | City name by [ISO 3166 country code](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) |
| key | string | One of `clouds`, `cod`, `coord`, `dt`, `id`, `main`, `rain`, `sys`, `timezone`, `visibility`, `weather`, `wind` |
| sub_key | string | **coord**: lon, lat **main**: temp, feels_like, temp_min, temp_max, pressure, humidity, **wind**: speed,  deg, **rain**: 1h, **clouds**: all, **sys**: type, id, sunrise, sunset |

**Result Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| weather_value | uint64 | Raw value from the api times 100 |
| timestamp | uint64 | Current Unix timestamp in seconds |

## Quantum Random Number Generator

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/11)

Retrieves a random number from [Australia's National University Quantum Random Number](https://qrng.anu.edu.au/).

**Request Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| size | uint64 | size the desired output randomness |

**Result Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| random_bytes | bytes | Output randomness |

## Yahoo Stock Price

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/12)

Retrieves the current price of a stock from [Yahoo Finance](https://finance.yahoo.com/).

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| symbol | string | The stock symbol to query the price of|
| multiplier | uint64 | The value to multiply the stock price by |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| px | uint64 | The requested stock price multiplied by the multiplier |

## HTTP Status Code

[**Explorer**](https://guanyu-devnet.cosmoscan.io/oracle-script/46)

Queries the current HTTP status of the given URL.

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| url | string | The URL to query the HTTP status of |

**Response Parameters**

| Parameter        | Type  | Description |
| ------------- |:-------------:| :-------------:|
| status | string | The HTTP status code/error of the specified url |
