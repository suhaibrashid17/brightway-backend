const mongoose = require("mongoose");
const User = require('./User');
const TeacherSchema = new mongoose.Schema({
    cnic : {
        type:String,
        required:true,
        unique : true
    },
    phone_num: {
        type:String,
        required:true,
    },
    salary : {
        type:Number,
        required:true,
    }, 
    status : {
        type:String,
        required:true,
        enum : [
            "active", "inactive"
        ]
    } 

})

const Teacher = User.discriminator('teacher', TeacherSchema);
module.exports = Teacher;