'use strict';

const axios = require('axios');
const bodyParser = require('body-parser');
const { stringify } = require('deterministic-json');
const express = require('express');
const vstruct = require('varstruct');

module.exports = (rpcPort) => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ type: '*/*' }));

  /*
   * Example of a target GET request:
   * $ curl "http://localhost:46657/abci_query"
   * {
   *   "jsonrpc": "2.0",
   *   "id": "",
   *   "result": {
   *     "response": {
   *       "value": "eyJNRVNTQUdFUyI6W3siaGVsbG8iOiJieWUifSx7ImhlbGxvIjoiYnllIn0seyJoZWxsbyI6ImJ5ZSJ9XX0=",
   *       "height": "6226"
   *     }
   *   }
   * }
   * `result.value` translates to:
   * {"MESSAGES":[{"hello":"bye"},{"hello":"bye"},{"hello":"bye"}]}
   */
  app.get('/state', async (req, res) => {
    let result = await axios.get(`http://localhost:${rpcPort}/abci_query`);
    result = Buffer.from(result.data.result.response.value, 'base64').toString('utf8');
    const response = JSON.parse(result);
    res.json(response);
  });

  /*
   * Example of a target POST request:
   * $ curl "http://localhost:46657/broadcast_tx_commit?tx=0x0000000f7b2268656c6c6f223a22627965227d00001313"
   * {
   *   "jsonrpc": "2.0",
   *   "id": "",
   *   "result": {
   *     "check_tx": {},
   *     "deliver_tx": {},
   *     "hash": "58340289A47F05C4CB0A95B196550FF2475290C8",
   *     "height": "3427"
   *   }
   * }
   */
  app.post('/txs', async (req, res) => {
    const nonce = Math.floor(Math.random() * (2 << 12));
    const txBytes = '0x' + encodeTx(req.body, nonce).toString('hex');
    let result = await axios.get(`http://localhost:${rpcPort}/broadcast_tx_commit`, {
      params: {
        tx: txBytes
      }
    });
    let response = {
      result: result.data.result
    };
    res.json(response);
  //   const postParams = {
  //     params: { tx: Buffer.from(txBytes, 'hex').toString('base64') }
  //   };
  //   const result = await axios.post(`http://localhost:${rpcPort}/broadcast_tx_commit`,
  //     postParams);
  //   const response = { result: result.data.result };
  //   res.json(response);
  });

  return app;
};

/* TX structure needed for ABCI-specific encoding */
const TxStruct = vstruct([
  { name: 'data', type: vstruct.VarString(vstruct.UInt32BE) },
  { name: 'nonce', type: vstruct.UInt32BE }
]);

/* Tendermint's ABCI RPC encoding process, may be Lotionjs-specific
 * See the following URLs:
 * https://github.com/ethereum/wiki/wiki/JSON-RPC#hex-value-encoding
 * https://github.com/tendermint/tendermint/issues/536
 */
function encodeTx (txData, nonce) {
  const data = stringify(txData);
  const bytes = TxStruct.encode({ nonce, data });
  return bytes;
}
