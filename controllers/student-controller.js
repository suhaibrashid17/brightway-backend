const ZKLib = require('zkteco-js');
const Student = require('../models/Student.js');

const AddStudent = async(req, res) => {
    try {
        const studentExists = await Student.findOne({ roll_num: req.body.roll_num });
        if (studentExists) {
            res.status(400).json({ error: "A Student with this roll number already exists" });
        } else {
            
            const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
            
            const connectZKInstance = async () => {
                try {
                    await zkInstance.createSocket();
                    console.log("Connected to the ZK instance successfully");
                    const obj = await zkInstance.getInfo();
                    let uid = String(obj.userCounts + 1);
                    await zkInstance.setUser(obj.userCounts + 1,uid , req.body.first_name + ' ' + req.body.last_name, '', 0);
                    console.log("User Registered on Device");
                    
                    return uid;

                } catch (e) {
                    console.log(e);
                    if (e.code === 'EADDRINUSE') {
                        console.log("Address in use");
                    }
                }
            };
        
            let uid = await connectZKInstance();
            const response = await Student.create({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                gender: req.body.gender,
                birth_date: req.body.birthdate,
                city: req.body.city,
                address: req.body.address,
                roll_num: req.body.roll_num,
                father_name: req.body.father_name,
                father_cnic: req.body.father_cnic,
                father_phone: req.body.father_phone,
                mother_phone: req.body.mother_phone,
                class: req.body.class,
                field: req.body.field,
                section: req.body.section,
                monthly_fee: req.body.monthly_fee,
                status: req.body.status,
                device_uid: uid,
            });
            
            res.status(200).json(response);
        }
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};

const RemoveStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ roll_num: req.body.roll_num });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        const uid = student.uid;
        await Student.deleteOne({ roll_num: req.body.roll_num });
        
        const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
        await zkInstance.createSocket();
        await zkInstance.deleteUser(uid);
        console.log("User removed from Device");

        res.status(200).json({ message: "Student removed successfully" });
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};

const UpdateStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ roll_num: req.body.roll_num });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const updatedStudent = await Student.updateOne({ roll_num: req.body.roll_num }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            birth_date: req.body.birthdate,
            city: req.body.city,
            address: req.body.address,
            father_name: req.body.father_name,
            father_cnic: req.body.father_cnic,
            father_phone: req.body.father_phone,
            mother_phone: req.body.mother_phone,
            monthly_fee: req.body.monthly_fee,
            field: req.body.field,
            status: req.body.status,
        });

        const zkInstance = new ZKLib('192.168.10.201', 4370, 5200, 5000);
        await zkInstance.createSocket();
        await zkInstance.setUser(student.uid, req.body.roll_num, req.body.first_name + ' ' + req.body.last_name, '', 0);
        console.log("User updated on Device");

        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};

const GetStudent = async (req, res) => {
    try {
        const student = await Student.findOne({ roll_num: req.params.roll_num });
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};

const GetStudents = async (req, res) => {
    try {
        const students = await Student.find({});
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};
const GetStudentsByClass = async(req, res)=>{
    const { class: students_class } = req.query; 
    console.log("inside controller");
    console.log(`Class received: ${students_class}`);
    try {
        const students = await Student.find({ class: students_class });
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}

const GetFatherPhoneById = async(req, res)=>{
    const { roll_num: roll_num } = req.query; 
    console.log("inside controller");
    console.log(`Roll Number received: ${roll_num}`);
    try {
        const students = await Student.findOne({ roll_num: roll_num });
        console.log(students)
        res.status(200).json(students.father_phone);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}

module.exports = { AddStudent, RemoveStudent, UpdateStudent, GetStudent, GetStudents, GetStudentsByClass, GetFatherPhoneById };
