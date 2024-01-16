const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const  {order, getOrders, getOrderDetail }= require('../controller/OrderController');

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.post('/', order)

router.get('/', getOrders)

router.get('/:id', getOrderDetail)


module.exports = router;