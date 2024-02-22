const  express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

router.get('/users',authController.requireJWTAuth, usersController.getAllUsers);
router.post('/user', usersController.createUser);


module.exports = router;