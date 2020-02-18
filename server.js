const express = require('express');

const accountsrouter = require("./Routers/accountsrouter");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountsrouter)

module.exports = server;