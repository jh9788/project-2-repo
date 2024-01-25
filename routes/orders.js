const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const  {order, getOrders, getOrderDetail }= require('../controller/OrderController');

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

router.post('/',[body('delivery').notEmpty().withMessage('입력 필요'),
body('first_book_title').notEmpty().isString().withMessage('문자 입력 필요'),
body('total_quantity').notEmpty().isInt().withMessage('숫자 입력 필요'),
body('total_price').notEmpty().isInt().withMessage('숫자 입력 필요'),
body('user_id').notEmpty().isInt().withMessage('숫자 입력 필요')], validate, order)

router.get('/', getOrders)

router.get('/:id', getOrderDetail)


module.exports = router;