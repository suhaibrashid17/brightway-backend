const User = require('../models/User')

const GetUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
};

module.exports = {GetUsers}