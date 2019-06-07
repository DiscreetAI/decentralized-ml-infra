'use strict';

const lotion = require('lotion');
const sjcl = require('sjcl');
const vstruct = require('varstruct');

module.exports = (opts) => {
  const app = lotion(opts);

  const TxStruct = vstruct([
    { name: 'KEY', type: vstruct.Buffer(32) },
    { name: 'CONTENT', type: vstruct.Byte },
    { name: 'ROUND', type: vstruct.UInt32BE }
  ]);

  app.use((state, tx, chainInfo) => {
    if (typeof tx === 'object' && tx.hasOwnProperty('CONTENT') && typeof tx.CONTENT === 'string' && tx.hasOwnProperty('ROUND') && typeof tx.ROUND === 'number') {
      let newTx;
      if (tx.hasOwnProperty('PREV_TX') && !tx.hasOwnProperty('KEY')) {
        // TODO: necessary?
        // newTx = TxStruct.encode({
        //   KEY: sjcl.hash(state.NONCE + tx.PREV_TX),
        //   CONTENT: tx.CONTENT,
        //   ROUND: tx.ROUND
        // });
        state.MESSAGES.push(tx);
        state.NONCE++;
        console.log(`Transaction committed: ${JSON.stringify(tx)}`);
      } else if (tx.hasOwnProperty('KEY') && !tx.hasOwnProperty('PREV_TX')) {
        // if (!state.HASHES.includes(tx.KEY)) {
          // TODO: necessary?
          // newTx = TxStruct.encode({
          //   KEY: tx.KEY,
          //   CONTENT: tx.CONTENT,
          //   ROUND: tx.ROUND
          // })
        state.MESSAGES.push(tx);
        state.HASHES.push(tx.KEY);
        state.NONCE++;
        console.log(`Transaction committed: ${JSON.stringify(tx)}`);
        // } else {
        //   console.log('Hash already on-chain');
        // }
      } else {
        console.log('Commit Failed');
      }
      // TODO: does this do anything?
      // if (newTx !== null) {
      //   return JSON.stringify(newTx);
      // }
    } else {
      console.log('Commit Failed');
    }
  });

  return app;
};
