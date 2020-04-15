"use strict";
const utils = require("../utils");
const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("wallets");

    const getWallet = async id => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input("id", sql.VarChar(50), id);

        // return the executed query
        return request.query(sqlQueries.getWallet);
    };
    const getWalletByUserId = async userId => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);
        // return the executed query
        return request.query(sqlQueries.getWalletByUserId);
    };
    const getAllWallets = async () => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        // return the executed query
        return request.query(sqlQueries.getAllWallets);
    };

    const insertWallet = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("AvailableBalance", sql.NVarChar(1000), dataModel.AvailableBalance);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("LastUpdatedDate", sql.DateTime, new Date(dataModel.LastUpdatedDate));

        // return the executed query
        return request.query(sqlQueries.insertWallet);

    };

    const updateWallet = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();

        // configure sql query parameters
        request.input("Id", sql.NVarChar(200), dataModel.Id);
        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("AvailableBalance", sql.NVarChar(1000), dataModel.AvailableBalance);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("LastUpdatedDate", sql.DateTime, new Date(dataModel.LastUpdatedDate));

        // return the executed query
        return request.query(sqlQueries.updateWallet);

    };

    const deleteWallet = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), dataModel.id);

        // return the executed query
        return request.query(sqlQueries.deleteWallet);

    };
    const createOrTopUp = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        var res = await getWalletByUserId(dataModel.UserId);
        if (res.rowsAffected[0] === 1) {
            var withCalByIdAsync = res.recordset[0]
            withCalByIdAsync.AvailableBalance += dataModel.AvailableBalance;

            request.input("id", sql.NVarChar(200), withCalByIdAsync.WalletId);
            request.input("UserId", sql.NVarChar(200), withCalByIdAsync.UserId);
            request.input("AvailableBalance", sql.NVarChar(1000), withCalByIdAsync.AvailableBalance);
            request.input("LastUpdatedDate", sql.DateTime, new Date());
            // return the executed query
            return request.query(sqlQueries.updateWallet);
        }
        else {
            request.input("UserId", sql.NVarChar(200), dataModel.UserId);
            request.input("AvailableBalance", sql.NVarChar(1000), dataModel.AvailableBalance);
            request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
            
            // return the executed query
            return request.query(sqlQueries.insertWallet);
        }
        // return the executed query

    };


    return {
        getWallet,
        getWalletByUserId,
        insertWallet,
        updateWallet,
        deleteWallet,
        getAllWallets,
        createOrTopUp
    };
};
module.exports = { register };