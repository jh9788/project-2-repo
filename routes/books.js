const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const {
    books,
    bookDetail,
    addBook
} = require('../controller/BookController');

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req)
    if(err.isEmpty()){
        return next(); // 다음 할 일 (미들웨어, 함수)
    } else {
        return res.status(400).json(err.array())
    }
}


router.get('/', books);
router.get('/:id', param('id').notEmpty().withMessage('도서 id 필요'), validate, bookDetail);
router.post('/', addBook);

module.exports = router;