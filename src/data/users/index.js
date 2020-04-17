"use strict";
const utils = require("../utils");
const register = async ({ sql, getConnection }) => {
    // read in all the .sql files for this folder
    const sqlQueries = await utils.loadSqlQueries("users");
    const getUsers = async userId => {
        // get a connection to SQL Server
        const cnx = await getConnection();

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userId);
        // return the executed query
        return request.query(sqlQueries.getUsers);
    };
    const getUserByUsername = async username => {
        // get a connection to SQL Server
        const cnx = await getConnection();
        // console.log(cnx);

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("Username", sql.VarChar(50), username);
        // return the executed query
        return request.query(sqlQueries.getUserByUsername);
    };
    const getAllUsers = async () => {
        // get a connection to SQL Server
        const cnx = await getConnection();
        // console.log(cnx);

        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        // return the executed query
        return request.query(sqlQueries.getAllUsers);
    };

    const insertUser = async userModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters

        request.input("Username", sql.NVarChar(200), userModel.Username);
        request.input("Password", sql.NVarChar(1000), userModel.Password);
        request.input("ConfirmPassword", sql.NVarChar(1000), userModel.ConfirmPassword);
        request.input("Email", sql.NVarChar(1000), userModel.Email);
        request.input("CreatedDate", sql.DateTime, new Date(userModel.CreatedDate));
        request.input("LastLoginDate", sql.DateTime, new Date(userModel.LastLoginDate));

        // return the executed query
        return request.query(sqlQueries.insertUser);

    };

    const updateUser = async userModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userModel.UserId);
        request.input("Username", sql.NVarChar(200), userModel.Username);
        request.input("Password", sql.NVarChar(1000), userModel.Password);
        request.input("ConfirmPassword", sql.NVarChar(1000), userModel.ConfirmPassword);
        request.input("Email", sql.NVarChar(1000), userModel.Email);
        request.input("CreatedDate", sql.DateTime, new Date(userModel.CreatedDate));
        request.input("LastLoginDate", sql.DateTime, new Date(userModel.LastLoginDate));

        // return the executed query
        return request.query(sqlQueries.updateUser);

    };

    const deleteUser = async userModel => {

        // get a connection to SQL Server
        const cnx = await getConnection();
        // create a new request
        const request = await cnx.request();
        // configure sql query parameters
        request.input("userId", sql.VarChar(50), userModel.id);

        // return the executed query
        return request.query(sqlQueries.deleteUser);

    };
    return {
        getUsers,
        insertUser,
        updateUser,
        deleteUser,
        getAllUsers,
        getUserByUsername
    };
};
module.exports = { register };