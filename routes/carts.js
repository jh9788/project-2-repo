const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const {
    addToCart,
    getCartItems,
    removeCartItem
} = require('../controller/CartController')

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
router.use(express.json());

router.post('/', addToCart)

router.get('/', getCartItems)

router.delete('/:id', removeCartItem)


module.exports = router;