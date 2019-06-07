// #!/usr/bin/env node
'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const connect = require('lotion-connect');

module.exports = async (peerOpts) => {
  const HOST = peerOpts.host;
  const PORT = peerOpts.port;

  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ type: '*/*' }));

  console.log(`Connecting to ${HOST}:${PORT}...`);
  let { state, send } = await connect(null, { 
    genesis: require('./genesis.json'),
    nodes: [ `ws://${HOST}:${PORT}` ]
  });
  console.log('Connected!', await state)

  app.get('/state', async (req, res) => {
    console.log('Getting state...')
    let { state } = await connect(null, { 
      genesis: require('./genesis.json'),
      nodes: [ `ws://${HOST}:${PORT}` ]
    });
    const response = await state;
    console.log(response);
    res.json(response);
  });

  app.post('/txs', async (req, res) => {
    const payload = req.body;
    console.log('Sending payload:', payload);
    const response = await send(payload);
    res.json(response);
  });

  return app;
}
