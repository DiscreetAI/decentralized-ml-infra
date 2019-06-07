'use strict';

const assert = require('assert');
const connect = require('lotion-connect');

const TEST_CONFIG = require('./config');
// const lotionServer = require('../src/lotion-server')(TEST_CONFIG.opts);
// const txServer = require('../src/tx-server')();

const genesisConf = TEST_CONFIG.genesis;
const nodesConf = TEST_CONFIG.nodes;
const exampleTx = TEST_CONFIG.exampleTx, exampleBadTx = TEST_CONFIG.exampleBadTx, exampleBadVal = TEST_CONFIG.exampleBadVal;

// before('Set up a validator node', async function () {
//   await lotionServer.start();
// });

// TODO: fix timeout issues with beforeEach(...)
describe.skip('Connect to Lotion app and push txs', function () {
  // const initialState = TEST_CONFIG.initialState;
  // const constStrMessages = 'MESSAGES';
  // let state, send;
  // let testState, queriedState;

  // before('Set up a non-validator node', async function () {
  //   ({ state, send } = await connect(null, {
  //     genesis: genesisConf,
  //     nodes: nodesConf
  //   }));
  // });

  // beforeEach('Reset test state before each test', function () {
  //   testState = initialState;
  // });

  // it('Sanity check for non-validator client', async function () {
  //   queriedState = await state;
  //   assert.deepStrictEqual(queriedState, initialState);
  // })

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
});
