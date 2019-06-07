// #!/usr/bin/env node
'use strict';

const connect = require('lotion-connect');
const flags = require('node-flags');

const HOST = flags.get('host') || '127.0.0.1';
const PORT = flags.get('port') || 46657;
const payload = flags.get('data') || { foo: 'bar' };

async function main() {
  console.log(`Connecting to ${HOST}:${PORT}...`);
  let { state, send } = await connect(null, { 
    genesis: require('../src/genesis.json'),
    nodes: [ `ws://${HOST}:${PORT}` ]
  });
  console.log("Connected!")
  console.log('Current state: ', await state);
  console.log('Sending payload:', payload);
  await send(payload);
  process.exit(0);
}

main();
