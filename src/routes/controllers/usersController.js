"use strict";
const boom = require('boom');

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/users/{id}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate user's ID
                    const userId = request.params.id;
                    // execute the query
                    const res = await db.users.getUsers(userId);
                    console.log(res);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${userId}`));
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
        path: "/api/users",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async (request, h) => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate user's ID

                    // execute the query
                    const res = await db.users.getAllUsers();
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
        path: "/api/users",
        config: {
           
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const res = await db.users.insertUser(payload);
                    console.log(res);

                    if (res.rowsAffected[0] === 1)
                        return h.response(payload).code(201)

                } catch (err) {
                    server.log(["error", "api", "events"], err);

                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "PUT",
        path: "/api/users/{id}",
        config: {
           
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const id = request.params.id;
                    const resp = await db.users.getUsers(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    payload.UserId = id;
                    const res = await db.users.updateUser(payload);
                    console.log(res);

                    if (res.rowsAffected[0] === 1)
                        return h.response(payload).code(200)
                } catch (err) {
                    server.log(["error", "api", "events"], err);

                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/api/users/{id}",
        config: {

            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const id = request.params.id;
                    const resp = await db.users.getUsers(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.users.deleteUser({ id });
                    if (res.rowsAffected[0] === 1)
                        return h.response({'message': 'Deleted successfully'}).code(200)
                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    return boom.boomify(err);
                }
            }
        }
    });


};