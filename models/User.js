const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
   
   first_name : {
    type:String,
   },
   last_name : {
    type:String,
   }, 
   gender : {
    type:String,
   },
   birth_date : {
    type:Date,
   },
   city : {
    type:String,
   },
   address : {
    type:String,
   },
   uid : {
    type: String,
},
   role: { type: String, required: true, enum: ['student', 'teacher'] }
}
, { discriminatorKey: 'role' }
)
const User = mongoose.model ('User', UserSchema);
module.exports = User;