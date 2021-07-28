const app = require('express')();

const server = require('http').createServer(app)

const cors = require("cors");
app.use(cors());

//socket stuff
require('./socket')(server)