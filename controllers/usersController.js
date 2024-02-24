const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
require('dotenv').config()

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {

        // Validate user credentials (check email/password against database)
        const user = await User.findOne({ email: email });
        console.log("here Loginnn");
        if (!user) {
            throw new Error('Invalid email or password');
        }
        console.log(user);
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            throw new Error('Invalid email or password');
        }

        const payloadData = {
            email: user.email,
            username: user.username
        }

        const headerData = {
            alg: 'HS256', // Algorithm used for hashing (e.g., HMAC SHA-256)
            typ: 'JWT'    // Token type
        };

        // User authenticated, generate JWT
        const token = jwt.encode(payloadData, process.env.JWT_SECRET,
            'HS256'
        );

        console.log("Login successfully !");
        // Set the token as an HTTP-only cookie
        res.cookie('token', token, { httpOnly: true });

        // Send JSON response to the client
        res.json({
            message: "Login Successful",
            success: true,
            token: token // Optionally include the token in the response body
        });

    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}

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

const createUser = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        req.body.password = hashedPassword;
        const payload = req.body;
        const user = new User(payload);
        await user.save();
        console.log("New user is coming !");
        res.send("New user is coming !");
    } catch (error) {
        console.error("Error create user:", error);
        res.status(500).send("Error create user");
    }
}

module.exports = {
    getAllUsers,
    createUser,
    userLogin
};