const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.post('/', (req,res) => {

})

router.get('/', (req,res) => {

})

router.delete('/:id', (req,res) => {

})

router.get('/나중에', (req,res) => {

})

module.exports = router;