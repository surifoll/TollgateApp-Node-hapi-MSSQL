// api/users/util/token.js

'use strict';

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
const boom = require('boom');
const secret = require('../config');;

function createToken(user) {
  let scopes;
  // Check if the user object passed in
  // has admin set to true, and if so, set
  // scopes to admin
  if (user.admin) {
    scopes = 'admin';
  }
  // Sign the JWT
  return jwt.sign({ id: user.UserId, username: user.Username, scope: scopes }, secret.secret, { algorithm: 'HS256', expiresIn: "1h" });
}

const comparePassword = async (password, hashedPassword) => {

  return bcryptjs.compare(password, hashedPassword);
}

const authorizer = async (request, h) => {

  const { authorization } = request.headers;
  var chek = request.url.href.indexOf('sign')
  if (chek > -1) {
    return req;
  }
  if (!authorization) {
    
    return boom.unauthorized('Unathorized request')
  }
  var token = authorization.replace('Bearer ', '');
  var id = 0;
  jwt.verify(token, secret.secret, (err, payload) => {
    console.log(err);
    
    if (err)
      return boom.unauthorized("Request is Unauthorized")
    id = payload.id;
  });
  const db = request.server.plugins.sql.client;
  const user = await db.users.getUsers(id)
  if (user.recordset.length == 0) {
    return boom.unauthorized('Unathorized request');
  }
  user.Password = undefined;
  request.user = user.recordset[0];
  request.auth.isAuthenticated = true;
  request.auth.isAuthorized = true;


  return request;

};
module.exports = {
  createToken,
  comparePassword,
  authorizer
};