const GENESIS_PATH = './src/genesis.json';
// const GENESIS_PATH = './src/genesis_multinode.json';
const INITIAL_STATE = {
  HASHES: [],
  MESSAGES: [],
  NONCE: 0
};
const KEY_PATH = './src/validators';
const LOG_TM = false;
// const LOG_TM_PEER = false;
const LOCALHOST = '127.0.0.1';
// const HOST = '13.57.248.15';
// const HTTPHOST = '127.0.0.1';
const HTTPPORT = 3000;
const P2P_PORT = 46658;
const RPC_PORT = 46657;

module.exports = {
  version: '0.1.0',
  /* REUIRED FOR APP */
  httpHost: LOCALHOST,
  httpPort: HTTPPORT,
  p2pPort: P2P_PORT,
  opts: {
    // initial blockchain state
    initialState: INITIAL_STATE,
    // path to keys.json, generates own keys if not specified
    keyPath: `${KEY_PATH}/priv_validator_0.json`,
    // path to genesis.json, generates new one if not specified
    genesisPath: GENESIS_PATH,
    // array of '<host>:<p2pport>' of initial tendermint nodes to connect to, does automatic peer discovery if not specified
    peers: [],
    // if true, shows all output from the underlying tendermint process
    logTendermint: LOG_TM,
    // port to use for tendermint peer connections
    p2pPort: P2P_PORT,
    // port to use for tendermint rpc
    rpcPort: RPC_PORT
  },
  /* REUIRED FOR APP-PEER */
  peerOpts: {
    host: LOCALHOST,
    port: RPC_PORT
  }
  // optsPeer: {
  //   initialState: INITIAL_STATE,
  //   keyPath: `${KEY_PATH}/priv_validator_1.json`,
  //   genesisPath: GENESIS_PATH,
  //   peers: [`${HOST}:${P2P_PORT}`],
  //   logTendermint: LOG_TM_PEER,
  //   p2pPort: P2P_PORT_PEER,
  //   rpcPort: RPC_PORT_PEER
  // }
};
