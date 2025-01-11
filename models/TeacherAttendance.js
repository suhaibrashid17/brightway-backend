const mongoose = require("mongoose");
const TeacherAttendanceSchema = new mongoose.Schema({
    cnic : {
        type:String,
        required:true,
    },
    DnT : {
        type: Date,
        required: true,
    }
    
})

const TeacherAttendance = mongoose.model('teacherAttendance', TeacherAttendanceSchema);
module.exports = TeacherAttendance;