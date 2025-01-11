const express = require('express');
const app = express();
const mongoose = require('mongoose');
const student = require('./routes/student-routes');
const teacher = require('./routes/teacher-routes');
const user = require('./routes/user-routes');
const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use("/api/student", student);
app.use("/api/teacher", teacher);
app.use("/api/user", user);

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

const connectZKInstance = async () => {
    try {
        await zkInstance.createSocket();
        console.log("Connected to the ZK instance successfully");
        await zkInstance.enableDevice();
        await zkInstance.getRealTimeLogs((realTimeLog) => {
            console.log(realTimeLog);
        });
    } catch (e) {
        console.log(e);
        if (e.code === 'EADDRINUSE') {
            console.log("Address in use");
        }
    }
};

connectZKInstance();


