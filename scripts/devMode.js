#!/usr/bin/env node
'use strict';

const fs = require('fs-extra')
const os = require('os');

const PATH = `${os.homedir()}/.lotion/networks`;
if (fs.existsSync(PATH)) {
    fs.removeSync(PATH);
    console.log(`${PATH} deleted`);
} else {
  console.log(`${PATH} doesn't exist`);
}
