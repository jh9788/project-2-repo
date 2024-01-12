const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const {addLike, removeLike} = require('../controller/LikeController')

router.use(express.json());

router.post('/:liked_book_id', addLike)

router.delete('/:liked_book_id', removeLike)

module.exports = router;