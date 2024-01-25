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

const validate = (req, res, next) => {
    const err = validationResult(req)
    if(err.isEmpty()){
        return next(); // 다음 할 일 (미들웨어, 함수)
    } else {
        return res.status(400).json(err.array())
    }
}


router.post('/',
[body('book_id').notEmpty().isInt().withMessage('숫자 입력 필요'),
body('quantity').notEmpty().isInt().withMessage('숫자 입력 필요')], 
validate, addToCart)

router.get('/', getCartItems)

router.delete('/:id', param('id').notEmpty().withMessage('도서 id 필요'), validate, removeCartItem)


module.exports = router;