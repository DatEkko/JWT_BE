const express = require('express');
const { createUser, handleLogin, handleGetUser } = require('../controllers/userController');

const auth = require('../middleaware/auth');

const routerAPI = express.Router();
routerAPI.all("*", auth)

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/users", handleGetUser);

module.exports = routerAPI; 