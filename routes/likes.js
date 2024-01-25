const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const {addLike, removeLike} = require('../controller/LikeController')

router.use(express.json());

const validate = (req, res, next) => {
    const err = validationResult(req)
    if(err.isEmpty()){
        return next(); // 다음 할 일 (미들웨어, 함수)
    } else {
        return res.status(400).json(err.array())
    }
}

router.post('/:liked_book_id', param('liked_book_id').notEmpty().withMessage('도서 id 필요'), validate, addLike)

router.delete('/:liked_book_id', param('liked_book_id').notEmpty().withMessage('도서 id 필요'), validate, removeLike)

module.exports = router;