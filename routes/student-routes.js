const express = require('express');
const {AddStudent, RemoveStudent, UpdateStudent, GetStudent, GetStudents, GetStudentsByClass} = require('../controllers/student-controller')
const student = express.Router()
student.post("/addstudent", AddStudent)
student.post("/removestudent", RemoveStudent)
student.post("/updatestudent", UpdateStudent)
student.get("/getstudent", GetStudent)
student.get("/getstudents", GetStudents)
student.get("/getstudentbyclass", GetStudentsByClass)
module.exports = student;