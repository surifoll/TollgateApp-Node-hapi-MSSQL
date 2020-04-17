"use strict";

const api = require("./controllers");

module.exports.register = async server => {
    // register api routes
    await api.register(server);
    server.route({
        method: "GET",
        path: "/",
        handler: async (request, h) => {
            return "My first hapi server!";
        }
    });
};