const ZKLib = require('zkteco-js');
const Teacher = require('../models/Teacher.js');

const AddTeacher = async(req, res) => {
    try {
        const teacherExists = await Teacher.findOne({ roll_num: req.body.cnic });
        if (teacherExists) {
            res.status(404).json({ error: "Teacher already exists (duplicate cnic)" });
        } else {
            const response = await Teacher.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                birth_date: req.body.birthdate,
                city: req.body.city,
                address: req.body.address,
                cnic : req.body.cnic,
                phone_no : req.body.phone_no,
                salary : req.body.status,
            });

            const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);

            const connectZKInstance = async () => {
                try {
                    await zkInstance.createSocket();
                    console.log("Connected to the ZK instance successfully");
                    const obj = await zkInstance.getInfo();
                    await zkInstance.setUser(obj.userCounts + 1, req.body.cnic, req.body.first_name + ' ' + req.body.last_name, '', 1);
                    console.log("User Registered on Device");
                } catch (e) {
                    console.log(e);
                    if (e.code === 'EADDRINUSE') {
                        console.log("Address in use");
                    }
                }
            };

            connectZKInstance();
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const RemoveTeacher =  async(req, res) => {
    try {
        const teacher = await Teacher.findOne({ cnic: req.body.cnic });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }
        const uid = teacher.uid;
        await Teacher.deleteOne({ cnic: req.body.cnic });
        
        const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
        await zkInstance.createSocket();
        await zkInstance.deleteUser(uid);
        console.log("User removed from Device");

        res.status(200).json({ message: "Student removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const UpdateTeacher = async(req, res) => {
    try {
        const teacher = await Teacher.findOne({ cnic: req.body.cnic });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        const updatedTeacher = await Teacher.updateOne({ cnic: req.body.cnic }, {
            first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                birth_date: req.body.birthdate,
                city: req.body.city,
                address: req.body.address,
                cnic : req.body.cnic,
                phone_no : req.body.phone_no,
                salary : req.body.status,
        });

        const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
        await zkInstance.createSocket();
        await zkInstance.setUser(teacher.uid, req.body.cnic, req.body.first_name + ' ' + req.body.last_name, '', 1);
        console.log("User updated on Device");

        res.status(200).json(updatedTeacher);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const GetTeacher = async(req, res) => {
    try {
        const teacher = await Teacher.findOne({ cnic: req.params.cnic });
        if (!teacher) {
            return res.status(404).json({ error: "Teacher not found" });
        }

        res.status(200).json(teacher);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}
const GetTeachers = async(req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.status(200).json(teachers);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}
module.exports = {AddTeacher, RemoveTeacher, UpdateTeacher, GetTeacher, GetTeachers}