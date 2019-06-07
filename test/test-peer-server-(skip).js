'use strict';

const assert = require('assert');
const connect = require('lotion-connect');
const request = require('request');

const TEST_CONFIG = require('./config');
// const lotionServer = require('../src/lotion-server')(TEST_CONFIG.opts);
// const peerServer = require('../src/peer-server')(TEST_CONFIG.peerOpts);
// const txServer = require('../src/tx-server')(TEST_CONFIG.opts.rpcPort);

const genesisConf = TEST_CONFIG.genesis;
const nodesConf = TEST_CONFIG.nodes;
const exampleTx = TEST_CONFIG.exampleTx;

describe.skip('Connect to Lotion app via peer (server)', function () {
  const initialState = TEST_CONFIG.initialState;
  const constStrMessages = 'MESSAGES';
  let serverInstance, state, send;
  let testState, queriedState;

  // before('Set up a validator node and a peer', async function () {
  //   const server = await peerServer;
  //   serverInstance = await server.listen(TEST_CONFIG.httpPort + 1, TEST_CONFIG.httpHost, () => {
  //     console.log('HTTP server listening...');
  //   });
  // });

  // beforeEach('Reset test state before each test', function () {
  //   testState = initialState;
  // });

  // it('Sanity check for non-validator client', async function () {
  //   queriedState = await request.get(`http://localhost:3001/state`, function (error, response, body) {
  //     console.log('error:', error); // Print the error if one occurred
  //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log('body:', body); // Print the HTML for the Google homepage.
    // });
    // assert.deepStrictEqual(queriedState, testState);
  // });

  // it('Send a well-formed tx', async function () {
  //   await send(exampleTx);
  //   testState.MESSAGES.push(exampleTx);
  //   queriedState = await state;
  //   assert.deepStrictEqual(queriedState, testState);
  // });

  // it('Send a malformed tx', async function () {
  //   await send(exampleBadTx);
  //   queriedState = await state;
  //   assert.ok(!queriedState[constStrMessages]);
  // });

  // it('Send a tx of the wrong type', async function () {
  //   await send(exampleBadVal);
  //   queriedState = await state;
  //   assert.ok(!queriedState[constStrMessages]);
  // });

  // after('close all open connections', function() {
  //   serverInstance.close();
  // })
});
