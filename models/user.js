const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Account already exists"],
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, "Please enter your email"],
    minLength: [8, "Your password must be at least 6 characters long"],
    select: true, //dont send back password after request
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: [
        'user',
        'admin'
      ],
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  verifyToken: {
    type: String
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
