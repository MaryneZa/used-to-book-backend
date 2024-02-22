const Book = require('../models/book');
const User = require('../models/user');



const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find(); // Retrieve all users
        res.json(books); // Send the users as a JSON response
    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Error fetching books");
    }
}

const createBook = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    req.body.password = hashedPassword;
    const payload = req.body;
    const user = new User(payload);
    await user.save();
    console.log("New user is coming !");
    res.send("New user is coming !");
}

module.exports = {
    getAllBooks,
    createBook
};