"use strict";
const users = require("./usersController");
const vehicles = require("./vehiclesController");
const paymentHistories = require("./paymentHistoriesController");
const passingHistories = require("./passingHistoriesController");
const wallets = require("./walletsController");

module.exports.register = async server => {
    
    await vehicles.register(server);
    await paymentHistories.register(server);
    await users.register(server);
    await passingHistories.register(server);
    await wallets.register(server);
};