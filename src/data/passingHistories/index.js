"use strict";
const utils = require("../utils");
const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("passingHistories");

    const getPassingHistory = async id => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), id);
        // return the executed query
        return request.query(sqlQueries.getPassingHistory);
    };
    const getPassingHistoryByUserId = async userId => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);
        // return the executed query
        return request.query(sqlQueries.getPassingHistoryByUserId);
    };
    const getAllPassingHistories = async () => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        //console.log(JSON.stringify(sqlQueries));

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters


        // return the executed query
        return request.query(sqlQueries.getAllPassingHistories);
    };

    const insertPassingHistory = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("Amount", sql.NVarChar(1000), dataModel.Name);
        request.input("AvailableBalance", sql.NVarChar(1000), dataModel.AvailableBalance);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("Status", sql.NVarChar(1000), new Date(dataModel.Status));


        // return the executed query
        return request.query(sqlQueries.insertPassingHistory);

    };

    const updatePassingHistory = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        request.input("Id", sql.NVarChar(200), dataModel.Id);
        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("Amount", sql.NVarChar(1000), dataModel.Name);
        request.input("AvailableBalance", sql.NVarChar(1000), dataModel.AvailableBalance);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("Status", sql.NVarChar(1000), new Date(dataModel.Status));


        // return the executed query
        return request.query(sqlQueries.updatePassingHistory);

    };

    const deletePassingHistory = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), dataModel.id);

        // return the executed query
        return request.query(sqlQueries.deletePassingHistory);

    };
    return {
        getPassingHistory,
        getPassingHistoryByUserId,
        insertPassingHistory,
        updatePassingHistory,
        deletePassingHistory,
        getAllPassingHistories
    };
};
module.exports = { register };