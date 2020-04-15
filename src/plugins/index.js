"use strict";
const sql = require("./sql");
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
module.exports.register = async server => {

    const swaggerOptions = {
        info: {
            title: 'Books API Documentation',
            version: '0.0.1',
        }
    };

    // register plugins
    await server.register(sql);
};