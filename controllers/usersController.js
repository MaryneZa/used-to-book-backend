const User = require('../models/user');
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.json(users); // Send the users as a JSON response
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Error fetching users");
    }
}

const findUser = async (req, res) => {

}

const addUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    const payload = req.body;
    const user = new User(payload);
    await user.save();
    console.log("New user is coming !");
    res.send("New user is coming !");
}

module.exports = {
    getAllUsers,
    addUser
};