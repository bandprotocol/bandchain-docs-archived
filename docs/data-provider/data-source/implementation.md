<!--
order: 2
-->

# Implementation
To better explain the structure and implementation of a data source, let’s look at two possible examples.

### Getting Gold Price Data
First, let’s look at a data source that queries [GoldPrice.org](https://goldprice.org) for the current price of gold. 
The script itself is written in Python. Although this data source does not expect any arguments, it can have any number
of arguments as needed.

```python
#!/usr/bin/env python3

import requests
import sys

URL = "https://data-asg.goldprice.org/dbXRates/USD"
HEADERS = {'User-Agent': 'curl/7.64.1'}

def main():
    try:
        pxs = requests.get(URL, headers=HEADERS).json()
        return pxs['items'][0]['xauPrice']
    except Exception as e:
        print(e)

if __name__ == "__main__":
    try:
        print('{0:.2f}'.format(main()))
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
```

### Query for token total supply
However, as mentioned above, the data source can take any number of arguments. The example below, also written in 
Python, gives an example of such a script that requires two arguments.

This data source queries the given network rpc endpoint for the total supply of a given token address.

```python
#!/usr/bin/env python3

import requests
import sys

def main(rpc, to):
    headers = {
        "Content-Type": "application/json",
    }
    data = (
        """{ "jsonrpc": "2.0", "method": "eth_call", "params": [ { "to": "%s", "data": "0x18160ddd" }, "latest" ], "id": 1 }"""
        % (to)
    )
    response = requests.post(
        rpc,
        headers=headers,
        data=data,
    )
    return int(response.json()["result"], 16)


if __name__ == "__main__":
    try:
        print(main(sys.argv[1], sys.argv[2]))
    except Exception as e:
        print(str(e), file=sys.stderr)
        sys.exit(1)
```

### More examples
For more data source examples, please refer to the ones available on our [Mainnet](https://cosmoscan.io/data-sources) 
to get an idea of the type of data source we are working with our partners. Some of these includes:
- [Crypto prices from CoinGecko](https://cosmoscan.io/data-source/2#code)
- [Latest stock price from Finage](https://cosmoscan.io/data-source/25#code)
- [Forex & Commodities price from Alpha Vantage](https://cosmoscan.io/data-source/9#code)
