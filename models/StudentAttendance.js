const mongoose = require("mongoose");
const StudentAttendanceSchema = new mongoose.Schema({
    roll_number : {
        type:String,
        required:true,
    },
    DnT : {
        type: Date,
        required: true,
    }
    
})

const StudentAttendance = mongoose.model('studentAttendance', StudentAttendanceSchema);
module.exports = StudentAttendance;