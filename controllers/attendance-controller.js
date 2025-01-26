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
const SaveAttendance = async (req, res) => {
    try {
      const attendanceData = req.body;
      const savedAttendance = await StudentAttendance.insertMany(attendanceData);
      res.status(200).json(savedAttendance);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  const FetchAttendance = async (req, res) => {
    const { class: studentsClass, month, year } = req.query;
    try {
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0);
      const attendanceData = await StudentAttendance.find({
        DnT: { $gte: startDate, $lte: endDate },
      });
      res.status(200).json(attendanceData);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

module.exports = {MarkUserAttendance, SaveAttendance, FetchAttendance}