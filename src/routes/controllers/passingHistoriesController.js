"use strict";
const boom = require('boom');

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/passingHistories/{id}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;

                    // TODO: Get the current authenticate passingHistory's ID
                    const passingHistoryId = request.params.id;

                    // execute the query
                    const res = await db.passingHistories.getPaymentHistory(passingHistoryId);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${passingHistoryId}`));
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
        path: "/api/passingHistories/user/{userId}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate passingHistory's ID
                    const passingHistoryId = request.params.userId;
                    // execute the query
                    const res = await db.passingHistories.getPaymentHistoryByUserId(passingHistoryId);
                    console.log(res);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${passingHistoryId}`));
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
        path: "/api/passingHistories",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async (request, h) => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate passingHistory's ID
                    console.log(db);

                    // execute the query
                    const res = await db.passingHistories.getAllPaymentHistories();
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
        path: "/api/passingHistories",
        config: {
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const user = await db.users.getUsers(payload.UserId);

                    if (user.recordset.length == 0) {
                        return (boom.notFound(`No record found for the user id ${payload.UserId}`));
                    }

                    payload.CreatedDate = new Date();
                    const res = await db.passingHistories.insertPaymentHistory(payload);
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
        path: "/api/passingHistories/{id}",
        config: {
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const id = request.params.id;
                    const resp = await db.passingHistories.getPaymentHistory(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    payload.Id = id;
                    const res = await db.passingHistories.updatePaymentHistory(payload);
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
        path: "/api/passingHistories/{id}",
        config: {
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const id = request.params.id;
                    const resp = await db.passingHistories.getPaymentHistory(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.passingHistories.deletePaymentHistory({ id });
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