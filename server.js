'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Get app version from package.json
var pjson = require('./package.json');

// Get Commit SHA
var revision = require('child_process')
  .execSync('git rev-parse HEAD')
  .toString().trim();

app.get('/', (req, res) => {
  res.send('Hello world\n');
});

app.get("/status", (req, res, next) => {
    res.json({
              version: pjson.version,
              lastcommitsha: revision,
              description: 'pre-interview technical test'
    });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);