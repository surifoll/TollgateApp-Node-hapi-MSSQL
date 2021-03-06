"use strict";
const boom = require('boom');
const utils = require('../../data/utils');
const tokenUtil = require('../token');

module.exports.register = async server => {
    server.route({
        method: "GET",
        path: "/api/paymentHistories/{id}",
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

                    // TODO: Get the current authenticate paymentHistory's ID
                    const paymentHistoryId = request.params.id;

                    // execute the query
                    const res = await db.paymentHistories.getPaymentHistory(paymentHistoryId);
                    if (res.recordset.length == 0) {
                        return (boom.notFound(`No record found for the id ${paymentHistoryId}`));
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
        path: "/api/paymentHistories/user",
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
                    // TODO: Get the current authenticate paymentHistory's ID
                    const userId = request.user.UserId;
                    // execute the query
                    const res = await db.paymentHistories.getPaymentHistoryByUserId(userId);
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
        path: "/api/paymentHistories",
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
                    // TODO: Get the current authenticate paymentHistory's ID
                    console.log(db);

                    // execute the query
                    const res = await db.paymentHistories.getAllPaymentHistories();
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
        path: "/api/paymentHistories",
        config: {
            // auth: {
            //     strategy: "session",
            //     mode: "required"
            // },
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    var transactionReference = utils.utilities.uuid();
                    payload.CreatedDate = new Date();
                    const user = request.user;

                    if (!user) {
                        return (boom.notFound(`No record found for the user id ${user.UserId}`));
                    }

                    // Initialize paystack payment
                    var response = await utils.utilities.initializePayment({ email: user.Email, amount: 5000000, ref: transactionReference, firstName: 'suraj', lastName: 'fehintola' });

                    var resp = response.body;

                    if (resp.status) {
                        return h.response({ data: resp.data }).code(200)
                    }
                    else {
                        return boom.badRequest(resp.error);
                    }


                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    console.log(err);
                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "POST",
        path: "/api/paymentHistories/verify/{ref}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'authMethod' }
            ],
             handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const payload = request.payload;
                    var transactionReference = request.params.ref;
                    payload.Ref = transactionReference;
                    payload.CreatedDate = new Date();

                    const paymentExists = await db.paymentHistories.getPaymentHistoryByRef(transactionReference);
                    if (paymentExists.rowsAffected[0] === 1) {
                        return (boom.badRequest(`Verification failed for ref ${transactionReference}`));
                    }
                    
                    const user = request.user
                    payload.UserId = user.UserId;
                    if (!user) {
                        return (boom.notFound(`No record found for the user id ${user.UserId}`));
                    }

                    // Verifying a transaction
                    var verifyResponse = await utils.utilities.verifyPayment({ ref: transactionReference }); // verify the payment with ref
                    var resp = verifyResponse.body;

                    if (resp.status) {
                        var createOrTopUp = await db.wallets.createOrTopUp(
                            {
                                AvailableBalance: payload.Amount,
                                Amount: payload.Amount,
                                UserId: user.UserId,
                                LastUpdatedDate: null,
                                CreatedDate: new Date()
                            });

                        if (createOrTopUp.rowsAffected[0] === 1)
                            payload.Status = "Success";
                        else
                            payload.Status = "Unsuccessful";
                    } else {
                        throw boom.badRequest("payment verification failed");
                    }

                    if (payload.Status != "Success") {
                        throw boom.badRequest("payment unsuccessful");
                    }
                    const res = await db.paymentHistories.insertPaymentHistory(payload);

                    if (res.rowsAffected[0] === 1)
                        return h.response(payload, { Status: "Success" }).code(201)

                } catch (err) {
                    server.log(["error", "api", "events"], err);
                    console.log(err, 'error');
                    return boom.boomify(err);
                }
            }
        }
    });

    server.route({
        method: "DELETE",
        path: "/api/paymentHistories/{id}",
        config: {
            pre: [
                { method: tokenUtil.authorizer, assign: 'm1' }
            ],
            handler: async (request, h) => {
                try {
                    const db = request.server.plugins.sql.client;
                    const id = request.params.id;
                    const resp = await db.paymentHistories.getPaymentHistory(id);
                    if (resp.recordset.length == 0)
                        return (boom.notFound(`No record found for the id ${id}`));

                    const res = await db.paymentHistories.deletePaymentHistory({ id });
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