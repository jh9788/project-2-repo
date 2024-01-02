const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.post('/join', (req, res) => {
    res.json({
        message: "회원가입"
    })
});

router.post('/login');

router.post('/reset');

router.put('/reset');


module.exports = router;