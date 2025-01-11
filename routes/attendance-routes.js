const express = require('express');
const {MarkUserAttendance} = require('../controllers/attendance-controller')
const attendance = express.Router()
attendance.post("/markattendance", MarkUserAttendance)

module.exports = attendance;