const CONFIG = require('../config.js');

const LOCALHOST = '127.0.0.1';

module.exports = {
  opts: CONFIG.opts,
  genesis: '../src/genesis.json',
  nodes: [`ws://${LOCALHOST}:${CONFIG.opts.rpcPort}`],
  peerOpts: {
    host: LOCALHOST,
    port: CONFIG.opts.rpcPort
  },
  httpHost: CONFIG.httpHost,
  httpPort: CONFIG.httpPort,
  peerPort: CONFIG.httpPort + 1,
  exampleTx: {
    KEY: '04AA5D2533987C34839E8DBC8D8FCAC86F0137E31C1C6EA4349ADE4FCAF87ED8',
    CONTENT: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t',
    ROUND: 0
  },
  exampleBadTx: {
    NOT_KEY: '04AA5D2533987C34839E8DBC8D8FCAC86F0137E31C1C6EA4349ADE4FCAF87ED8',
    NOT_CONTENT: 'QmWWQSuPMS6aXCbZKpEjPHPUZN2NjB3YrhJTHsV4X3vb2t'
  },
  exampleBadVal: 0,
  initialState: CONFIG.opts.initialState,
};
