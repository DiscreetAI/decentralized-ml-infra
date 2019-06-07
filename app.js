#!/usr/bin/env node
'use strict';

const chalk = require('chalk');
const program = require('commander');

const CONFIG = require('./config');
program
  .version(CONFIG.version, '-v, --version')
  .option('-peer, --peer [peer]', 'Specify peer IP address')
  .parse(process.argv);
const opts = program.host ? Object.assign(CONFIG.opts, { peers: [ `${program.host}:${CONFIG.p2pPort}` ] }) : CONFIG.opts
const lotionServer = require('./src/lotion-server')(opts);
const txServer = require('./src/tx-server')(CONFIG.opts.rpcPort);

console.log(chalk.blue(`
                       ,ggg,                                                
         8I           dP""8I                                                
         8I          dP   88                                                
         8I         dP    88                                                
         8I        ,8'    88                                                
   ,gggg,8I        d88888888     ,gggg,gg    ,ggggg,   ,gggggg,    ,gggg,gg 
  dP"  "Y8I  __   ,8"     88    dP"  "Y8I   dP"  "Y8gggdP""""8I   dP"  "Y8I 
 i8'    ,8I dP"  ,8P      Y8   i8'    ,8I  i8'    ,8I ,8'    8I  i8'    ,8I 
,d8,   ,d8b,Yb,_,dP       \`8b,,d8,   ,d8I ,d8,   ,d8',dP     Y8,,d8,   ,d8b,
P"Y8888P"\`Y8 "Y8P"         \`Y8P"Y8888P"888P"Y8888P"  8P      \`Y8P"Y8888P"\`Y8
                                     ,d8I'                                  
                                   ,dP'8I                                   
                                  ,8"  8I                                   
                                  I8   8I                                   
                                  \`8, ,8I                                   
                                   \`Y8P"                                    `));

lotionServer.start().then(genesis => {
  console.log(genesis);
});

txServer.listen(CONFIG.httpPort, CONFIG.httpHost, () => {
  console.log('HTTP server listening...');
});
