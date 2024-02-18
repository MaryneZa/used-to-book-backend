const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user'); // Import user model

const bookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
  },
  category: String,
  price: Number,
  tags: [String]
});

const BookModel = mongoose.model('Book', bookSchema);

module.exports = BookModel;
