const TeacherAttendance = require('../models/TeacherAttendance')
const StudentAttendance = require('../models/StudentAttendance')
const Teacher = require('../models/Teacher')
const Student = require('../models/Student')

const MarkUserAttendance = async (req, res) => {
    try {
        const teacher = await Teacher.findOne({cnic:req.body.userId});
        if(teacher){
             const response = await TeacherAttendance.create({
                DnT : req.body.attTime,
                cnic : req.body.userId,
             })
             res.status(200).json({message:"Teacher Attendance Marked!"})
             console.log("Teacher Attendance Marked!")
        }
        else{
            const student = await Student.findOne({roll_num:req.body.userId})
            if(student)
            {
                const response = await StudentAttendance.create({
                    DnT : req.body.attTime,
                    roll_number : req.body.userId,
                 })
                 res.status(200).json({message:"Student Attendance Marked!"})
                 console.log("Student Attendance Marked!")
            }else{
                console.log("User not found!")
            }
        }
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};


module.exports = {MarkUserAttendance}