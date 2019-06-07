'use strict';

const assert = require('assert');
const axios = require("axios");

const TEST_CONFIG = require('./config');

const exampleTx = TEST_CONFIG.exampleTx, exampleBadTx = TEST_CONFIG.exampleBadTx, exampleBadVal = TEST_CONFIG.exampleBadVal;
const httpHost = TEST_CONFIG.httpHost, httpPort = TEST_CONFIG.httpPort;

// TODO: probably best to group GET/POST methods
describe('Pushing txs directly to app via HTTP', function () {
  let initialState;

  before('Reset test state before each test', function () {
    initialState = JSON.parse(JSON.stringify(TEST_CONFIG.initialState));
  });

  it('Sanity check for non-validator client', async function () {
    const response = await axios.get(`http://${httpHost}:${httpPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, initialState);
  });

  it('Send a well-formed tx', async function () {
    await axios.post(`http://${httpHost}:${httpPort}/txs`, exampleTx);
    let testState = initialState;
    testState.HASHES.push(exampleTx.KEY);
    testState.MESSAGES.push(exampleTx);
    testState.NONCE++;
    const response = await axios.get(`http://${httpHost}:${httpPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, testState);
  });
});

describe('Pushing txs directly to app via HTTP (dependent on previous tests)', function () {
  let pushedState;

  before('Reset test state before each test', function () {
    pushedState = JSON.parse(JSON.stringify(TEST_CONFIG.initialState));
    pushedState.HASHES.push(exampleTx.KEY);
    pushedState.MESSAGES.push(exampleTx);
    pushedState.NONCE++;
  });

  it('Send a malformed tx', async function () {
    await axios.post(`http://${httpHost}:${httpPort}/txs`, exampleBadTx);
    const response = await axios.get(`http://${httpHost}:${httpPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, pushedState);
  });

  it('Send a tx of the wrong type', async function () {
    await axios.post(`http://${httpHost}:${httpPort}/txs`, exampleBadVal);
    const response = await axios.get(`http://${httpHost}:${httpPort}/state`);
    const queriedState = response.data;
    assert.deepStrictEqual(queriedState, pushedState);
  });
});
