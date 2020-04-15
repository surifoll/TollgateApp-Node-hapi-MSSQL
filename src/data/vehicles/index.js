"use strict";
const utils = require("../utils");
const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("vehicles");

    const getVehicle = async id => {
        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), id);
        // return the executed query
        return request.query(sqlQueries.getVehicle);
    };
    const getVehicleByUserId = async userId => {
        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);
        // return the executed query
        return request.query(sqlQueries.getVehicleByUserId);
    };
    const getAllVehicles = async () => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters


        // return the executed query
        return request.query(sqlQueries.getAllVehicles);
    };

    const insertVehicle = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("Name", sql.NVarChar(1000), dataModel.Name);
        request.input("PlateNo", sql.NVarChar(1000), dataModel.PlateNo);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("LastLoginDate", sql.DateTime, new Date(dataModel.LastLoginDate));


        // return the executed query
        return request.query(sqlQueries.insertVehicle);

    };

    const updateVehicle = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("UserId", sql.NVarChar(200), dataModel.UserId);
        request.input("Id", sql.NVarChar(200), dataModel.Id);
        request.input("Name", sql.NVarChar(1000), dataModel.Name);
        request.input("PlateNo", sql.NVarChar(1000), dataModel.PlateNo);
        request.input("CreatedDate", sql.DateTime, new Date(dataModel.CreatedDate));
        request.input("LastLoginDate", sql.DateTime, new Date(dataModel.LastLoginDate));

        // return the executed query
        return request.query(sqlQueries.updateVehicle);

    };

    const deleteVehicle = async dataModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("id", sql.VarChar(50), dataModel.id);

        // return the executed query
        return request.query(sqlQueries.deleteVehicle);

    };
    return {
        getVehicle,
        getVehicleByUserId,
        insertVehicle,
        updateVehicle,
        deleteVehicle,
        getAllVehicles
    };
};
module.exports = { register };