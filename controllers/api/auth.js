const express = require('express');
const authController = require('../auth');

const router = express.Router();


router.post('/signup/', authController.register);


module.exports = router;