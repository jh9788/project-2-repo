const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.get('/', (req,res) => {

})

router.get('/:id', (req,res) => {
    
})

router.get('/', (req,res) => {
    req.query;
})


module.exports = router;