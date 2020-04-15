"use strict";
const utils = require("../utils");
const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("paymentHistories");

    const getPaymentHistory = async id => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), id);
        // return the executed query
        return request.query(sqlQueries.getPaymentHistory);
    };
    const getPaymentHistoryByUserId = async userId => {


        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);
        // return the executed query
        return request.query(sqlQueries.getPaymentHistoryByUserId);
    };
    const getPaymentHistoryByRef = async ref => {


        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("ref", sql.VarChar(50), ref);
        // return the executed query
        return request.query(sqlQueries.getPaymentHistoryByRef);
    };
    const getAllPaymentHistories = async () => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters


        // return the executed query
        return request.query(sqlQueries.getAllPaymentHistories);
    };

    const insertPaymentHistory = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("Amount", sql.NVarChar(1000), dataModel.Amount);
        request.input("AvailableBalance", sql.NVarChar(1000), dataModel.Amount);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("Status", sql.NVarChar(1000), dataModel.Status);
        request.input("Ref", sql.NVarChar(1000), dataModel.Ref);


        // return the executed query
        return request.query(sqlQueries.insertPaymentHistory);

    };

    const updatePaymentHistory = async dataModel => {



    };

    const deletePaymentHistory = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), dataModel.id);

        // return the executed query
        return request.query(sqlQueries.deletePaymentHistory);

    };
    return {
        getPaymentHistory,
        getPaymentHistoryByUserId,
        insertPaymentHistory,
        updatePaymentHistory,
        deletePaymentHistory,
        getAllPaymentHistories,
        getPaymentHistoryByRef
    };
};
module.exports = { register };