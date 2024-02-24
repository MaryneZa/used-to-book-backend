const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose')

require('dotenv').config()

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

try {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to database successfully");
    }).catch((error) => {
        console.error('Could not connect to database:', error);
    });
} catch (error) {
    console.error('Error connecting to database:', error);
}




const usersRouter = require('./routes/user');
const booksRouter = require('./routes/book')
const authRouter = require('./routes/auth')


app.use('/api/users', usersRouter);
app.use('/api/books', booksRouter);
app.use('/api/auth', authRouter);





// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} naja`);
});



