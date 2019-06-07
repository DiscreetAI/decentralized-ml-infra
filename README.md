# dAgora Chain
[![Build Status](https://travis-ci.com/nzoghb/dagora-chain.svg?token=DoNjTKgrJ46KVM4vzxdc&branch=master)](https://travis-ci.com/nzoghb/dagora-chain)
To spin up a validator node (using `lotion`) run:

```shell
node app.js
```

For a multiple remote nodes, run a validator and note its public IP address. Then run a peer client on a different node:

```shell
node app.js --host <HOST>
```
```shell
node app-peer.js --host <HOST>
```

(`HOST` defaults to localhost if not specified)

## Scripts

To use a fresh chain, run `npm run devMode` beforehand.

The following command launches a lightweight client, sending a single value.

```shell
node scripts/cli-peer.js --host=<HOST> --port=<PORT> --data={ key: 'value', ... }
```

## API Information

Access endpoints through HTTP. These are the HTTP endpoints (when the `tx-server` is running):

```
GET: http://localhost:<PORT>/state
POST: http://localhost:<PORT>/txs
```

Can be reached via Python's `requests` HTTP library:

```Python
>>> import json
>>> import requests

# GET Example
>>> r = requests.get("http://localhost:3000/state")
>>> json.loads(r.text)
{'MESSAGES': []}

# POST Example
>>> r = requests.post("http://127.0.0.1:3000/txs", json={'hello':'bye'})
>>> json.loads(r.text)
{'result': {'check_tx': {}, 'deliver_tx': {}, 'hash': '8FDBE289D77F3D918D7B49ED5315BA70F9FD6C95', 'height': '4556'}}
```

Be sure to follw the correct data format when posting. Data (transaction) format:

```
{
  KEY: ... ,
  CONTENT: ...
}
```

The relevant ABCI RPC endpoints are, though you shouldn't have to use them:

```
GET: http://<HOST>:<PORT>/abci_query
POST: http://<HOST>:<PORT>/broadcast_tx_commit?tx=<RAW_TX_HEX>
```

## TODO

* Update to latest Lotionjs version
* Use `commander` with `cli-peer.js`
* Allow for multiple peers to be specified for `app.js`
* Validator autogen, selection, autoadd to `genesis.json`
* ✅ Additional tests for HTTP server
* ✅ Travis CI
* Autogen peer discovery
* Better structure for multi-node testing
* Use proper `axios` HTTP POST encoding in `tx-server.js`
