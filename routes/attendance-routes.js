const express = require('express');
const {MarkUserAttendance, SaveAttendance, FetchAttendance} = require('../controllers/attendance-controller')
const attendance = express.Router()
attendance.post("/markattendance", MarkUserAttendance)
attendance.post("/save", SaveAttendance);
attendance.get("/fetch", FetchAttendance);
module.exports = attendance;