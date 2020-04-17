"use strict";
const boom = require('boom');
const createUserSchema = require('../../data/users/validation')
const tokenUtil = require('../token');
const utils = require('../../data/utils');

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/users/{id}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' } 
            ],
            handler: async request => {
                try {
                    // TODO: Get the current authenticate user's ID
                    const userId = request.user.UserId;
                    // execute the query
                    const res = request.user;
                    if (!res) {
                        return (boom.notFound(`No record found for the id ${userId}`));
                    }
                    // return the recordset object
                    return res

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
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' } 
            ],
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
        method: "GET",
        path: "/api/reissueToken",
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
                     const user = request.user;
                     var token = tokenUtil.createToken(user);
                        return h.response({ token }).code(200);
                } catch (err) {
                    console.log(err);
                }

            }
        }
    });


    server.route({
        method: "POST",
        path: "/api/users",
        handler: async (request, h) => {
            try {
                const db = request.server.plugins.sql.client;
                const payload = request.payload;

                var hashedPassword = await utils.utilities.hashPassword(payload.Password)

                console.log(hashedPassword, 'llll');
                payload.Password = hashedPassword;

                const resul = await db.users.insertUser(payload);
                console.log(resul);
                if (res.rowsAffected[0] === 1)
                    return h.response({ payload }).code(201)

            } catch (err) {
                server.log(["error", "api", "events"], err);

                return boom.boomify(err);
            }
        },
        // Validate the payload against the Joi schema

    });
    //...........

    server.route({
        method: "POST",
        path: "/api/login",
        handler: async (request, h) => {
            try {
                const db = request.server.plugins.sql.client;
                const payload = request.payload;

                const resul = await db.users.getUserByUsername(payload.Username);
                console.log(resul);

                if (resul.recordset.length == 0) {
                    return (boom.unauthorized(`Invalid credentials`));
                }
                // return the recordset object
                var userExist = resul.recordset[0];

                if (userExist) {
                    var isMatched = await tokenUtil.comparePassword(payload.Password, userExist.Password)
                    if (isMatched) {
                        var token = tokenUtil.createToken(userExist);
                        return h.response({ token }).code(200);
                    }
                    console.log('ssssssssssssssssssssssssssss', isMatched);
                    return boom.badRequest('Login Failed', { errorMessage: 'Validation failed for username' })
                } else {

                    return boom.badRequest('Login Failed', { errorMessage: 'Validation failed for username' })
                }

            } catch (err) {
                server.log(["error", "api", "events"], err);
                console.log(err);
                return boom.boomify(err);
            }
        },
        // Validate the payload against the Joi schema


    });

    server.route({
        method: "PUT",
        path: "/api/users/{id}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' } 
            ],
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
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' } 
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const id = request.params.id;
                    const resp = await db.users.getUsers(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.users.deleteUser({ id });
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