const mongoose = require("mongoose");
const User = require('./User');
const StudentSchema = new mongoose.Schema({
    roll_num : {
        type:String,
        unique:true,
    },
    father_name : {
        type:String,
    },
    father_cnic: {
        type:String,
    },
    father_phone : {
        type:String,
    },
    mother_phone : {
        type:String,
    },
    class : {
        type:String,
    },
    field : {
        type:String,
    },
    section : {
        type:String,
    },
    monthly_fee : {
        type:Number,
    },
    device_uid: {
        type:String
    },
    
    status : {
        type:String,
        enum : [
            "active", "inactive"
        ]
    }


})

const Student = User.discriminator('student', StudentSchema);
module.exports = Student;