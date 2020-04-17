"use strict";
const boom = require('boom');
const tokenUtil = require('../token')

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/wallets/{id}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate wallet's ID
                    const walletId = request.params.id;
                    // execute the query
                    const res = await db.wallets.getWallet(walletId);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${walletId}`));
                    }
                    // return the recordset object
                    return res.recordset[0];

                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/wallets/user",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate wallet's ID
                    const walletId = request.user.UserId;
                    // execute the query
                    const res = await db.wallets.getWalletByUserId(walletId);
                    console.log(res);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${walletId}`));
                    }
                    // return the recordset object
                    return res.recordset[0];

                } catch (err) {
                    console.log(err);
                }
            }
        }
    });
    server.route({
        method: "GET",
        path: "/api/wallets",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate wallet's ID

                    // execute the query
                    const res = await db.wallets.getAllWallets();
                    // return the recordset object
                    return res.recordset;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    });


    server.route({
        method: "POST",
        path: "/api/wallets",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;

                    const payload = request.payload;
                    payload.UserId = request.user.UserId;
                    const user = await db.users.getUsers(payload.UserId);

                    if (user.recordset.length == 0) {
                        return (boom.notFound(`No record found for the user id ${payload.UserId}`));
                    }
                    const res = await db.wallets.insertWallet(payload);
                    console.log(res);

                    if (res.rowsAffected[0] === 1)
                        return h.response(payload).code(201)

                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    console.log(err);
                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "PUT",
        path: "/api/wallets/{id}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;

                    const payload = request.payload;
                    const id = request.params.id;
                    const resp = await db.wallets.getWallet(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    payload.Id = id;
                    const res = await db.wallets.updateWallet(payload);
                    console.log(res);

                    if (res.rowsAffected[0] === 1)
                        return h.response(payload).code(200)
                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    console.log(err);

                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/api/wallets/{id}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;

                    const id = request.params.id;
                    const resp = await db.wallets.getWallet(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.wallets.deleteWallet({ id });
                    if (res.rowsAffected[0] === 1)
                        return h.response({ 'message': 'Deleted successfully' }).code(200)
                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    return boom.boomify(err);
                }
            }
        }
    });


};