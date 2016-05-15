#!/usr/bin/env node

const program = require('commander');
const express = require('express');
const app = express();

program
  .version(require('./package.json').version)
  .usage('<dir> [options]')
  .option('-i, --index [indexfile]', 'Specify the index file')
  .option('-p, --port [port]', 'Specify the port number')
  .parse(process.argv);

const options = {
  index: program.index || 'index.html',
  port: program.port || '3000',
  dir: program.args[0] || './'
};

app.use(express.static(options.dir));
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    return res.sendFile(options.index, {root: options.dir}, next);
  } else {
    return next();
  }
});

app.listen(options.port, () => {
  console.log('Serving ' + options.index + ' on port ' + options.port);
});
