
const express = require('express');
const {AddTeacher, RemoveTeacher, UpdateTeacher, GetTeacher, GetTeachers} = require('../controllers/teacher-controller')
const teacher = express.Router()
teacher.post("/addteacher", AddTeacher)
teacher.post("/removeteacher", RemoveTeacher)
teacher.post("/updateteacher", UpdateTeacher)
teacher.get("/getteacher", GetTeacher)
teacher.get("/getteachers", GetTeachers)
module.exports = teacher;