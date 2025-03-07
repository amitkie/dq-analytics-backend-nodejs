const express = require('express');
const router = express.Router();
const serverController = require('../controllers/serverController');

router.post('/register', serverController.createUser);

module.exports = router;