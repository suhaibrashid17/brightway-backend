const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const student = require('./routes/student-routes');
const teacher = require('./routes/teacher-routes');
const user = require('./routes/user-routes');
const attendance = require('./routes/attendance-routes')
const cors=require('cors');
const axios = require('axios')
app.use(cors());
app.use(express.json());
app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/user", user);
app.use("/api/attendance", attendance);

const PORT_NUM = 8080 || process.env.PORT_NUM;
mongoose.connect('mongodb://localhost:27017/Brightway')
    .then(() => 
        app.listen(PORT_NUM, () => {
            console.log('App Running on port ' + PORT_NUM + ' and connected to db');
        })
    )
    .catch((error) => {
        console.log(error);
    });

const ZKLib = require('zkteco-js');
const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
const client = new Client({
    authStrategy: new LocalAuth()
});


client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
const markAttendance = async(AttDetails)=>{
    const response = await axios.post("http://localhost:8080/api/attendance/markattendance",AttDetails);
}
const getNumber = async(roll_num)=>{
    const params = {roll_num:roll_num}
    console.log(params)
    const response = await axios.get("http://localhost:8080/api/student//getfatherphonebyid",{params});
    console.log(response.data)
    
    const text = "Attendance Marked "+roll_num;
    const chatId = response.data.substring(1) + "@c.us";
    client.sendMessage(chatId, text);
    
    return response.data
}

const connectZKInstance = async () => {
    try {
        await zkInstance.createSocket();
        console.log("Connected to the ZK instance successfully");
        await zkInstance.enableDevice();
        await zkInstance.getRealTimeLogs((realTimeLog) => {
            console.log(realTimeLog);
            markAttendance(realTimeLog);
            console.log(realTimeLog.userId)
            const number = getNumber(realTimeLog.userId)
            
            
        });
    } catch (e) {
        console.log(e);
        if (e.code === 'EADDRINUSE') {
            console.log("Address in use");
        }
    }
};

connectZKInstance();


