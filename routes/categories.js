const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const {
    allCategories
} = require('../controller/CategoryController');

router.use(express.json());


router.get('/', allCategories);


module.exports = router;