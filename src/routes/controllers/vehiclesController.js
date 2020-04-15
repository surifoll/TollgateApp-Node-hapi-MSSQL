"use strict";
const boom = require('boom');

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/vehicles/{id}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate vehicle's ID
                    const vehicleId = request.params.id;
                      // execute the query
                    const res = await db.vehicles.getVehicle(vehicleId);
                     if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${vehicleId}`));
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
        path: "/api/vehicles/user/{userId}",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async request => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate vehicle's ID
                    const vehicleId = request.params.userId;
                    // execute the query
                    const res = await db.vehicles.getVehicleByUserId(vehicleId);
                    console.log(res);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${vehicleId}`));
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
        path: "/api/vehicles",
        config: {
            description: 'Get books list',
            notes: 'Returns an array of books',
            tags: ['api'],
            handler: async (request, h) => {
                try {
                    // get the sql client registered as a plugin
                    const db = request.server.plugins.sql.client;
                    // TODO: Get the current authenticate vehicle's ID
                    console.log(db);

                    // execute the query
                    const res = await db.vehicles.getAllVehicles();
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
        path: "/api/vehicles",
        config: {
          handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const user = await db.users.getUsers(payload.UserId);
                     
                    if (user.recordset.length == 0) {
                        return (boom.notFound(`No record found for the user id ${payload.UserId}`));
                    }
                    const res = await db.vehicles.insertVehicle(payload);
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
        path: "/api/vehicles/{id}",
        config: {
           
            handler: async (request,h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    const id = request.params.id;
                    const resp = await db.vehicles.getVehicle(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    payload.Id = id;
                    const res = await db.vehicles.updateVehicle(payload);
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
        path: "/api/vehicles/{id}",
        config: {

           
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                   
                    const id = request.params.id;
                    const resp = await db.vehicles.getVehicle(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.vehicles.deleteVehicle({ id });
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