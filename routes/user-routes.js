const express = require('express');
const {GetUsers} = require('../controllers/user-controller')
const user = express.Router()

user.get("/getusers", GetUsers)
module.exports = user;