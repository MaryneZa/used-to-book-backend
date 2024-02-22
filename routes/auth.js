const  express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/login', usersController.userLogin)

module.exports = router;

