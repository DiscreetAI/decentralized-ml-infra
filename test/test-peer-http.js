'use strict';

const assert = require('assert');
const axios = require("axios");

const TEST_CONFIG = require('./config');

const exampleTx = TEST_CONFIG.exampleTx, exampleBadTx = TEST_CONFIG.exampleBadTx, exampleBadVal = TEST_CONFIG.exampleBadVal;
const httpHost = TEST_CONFIG.httpHost, peerPort = TEST_CONFIG.peerPort;

// TODO: probably best to group GET/POST methods
describe('Pushing txs through peer via HTTP', function () {
  let initialState;

  before('Reset test state before each test', function () {
    initialState = JSON.parse(JSON.stringify(TEST_CONFIG.initialState));
  });

  // it('Sanity check for non-validator client', async function () {
  //   const response = await axios.get(`http://${httpHost}:${peerPort}/state`);
  //   const queriedState = response.data;
  //   assert.deepStrictEqual(queriedState, initialState);
  // });

  // TODO: these tests are dependent on `test-app-http` running first
  // it('Send a well-formed tx (hash already on-chain)', async function () {
  //   await axios.post(`http://${httpHost}:${peerPort}/txs`, exampleTx);
  //   let testState = initialState;
  //   testState.HASHES.push(exampleTx.KEY);
  //   testState.MESSAGES.push(exampleTx);
  //   testState.NONCE++;
  //   const response = await axios.get(`http://${httpHost}:${peerPort}/state`);
  //   const queriedState = response.data;
  //   assert.deepStrictEqual(queriedState, testState);
  // });
});

describe('Pushing txs through peer via HTTP (dependent on previous tests)', function () {
  let pushedState;

  before('Reset test state before each test', function () {
    pushedState = JSON.parse(JSON.stringify(TEST_CONFIG.initialState));
    pushedState.HASHES.push(exampleTx.KEY);
    pushedState.MESSAGES.push(exampleTx);
    pushedState.NONCE++;
  });

  it('Send a malformed tx', async function () {
    await axios.post(`http://${httpHost}:${peerPort}/txs`, exampleBadTx);
    const response = await axios.get(`http://${httpHost}:${peerPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, pushedState);
  });

  it('Send a tx of the wrong type', async function () {
    await axios.post(`http://${httpHost}:${peerPort}/txs`, exampleBadVal);
    const response = await axios.get(`http://${httpHost}:${peerPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, pushedState);
  });
});
