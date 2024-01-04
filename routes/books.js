const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');

const jwt = require('jsonwebtoken');
const {
    books,
    bookDetail,
    newBooks
} = require('../controller/BookController');

router.use(express.json());


router.get('/', books)
router.get('/:id', bookDetail)


module.exports = router;