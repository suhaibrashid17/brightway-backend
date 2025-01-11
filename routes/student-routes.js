const express = require('express');
const {AddStudent, RemoveStudent, UpdateStudent, GetStudent, GetStudents} = require('../controllers/student-controller')
const student = express.Router()
student.post("/addstudent", AddStudent)
student.post("/removestudent", RemoveStudent)
student.post("/updatestudent", UpdateStudent)
student.get("/getstudent", GetStudent)
student.get("/getstudents", GetStudents)
module.exports = student;