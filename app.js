const app = require('express')();

const server = require('http').createServer(app)

//socket stuff
require('./socket')(server)

