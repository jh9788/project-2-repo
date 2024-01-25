const express = require('express');
const router = express.Router();
const {body, param, validationResult} = require('express-validator');
const {
    join,
    login, 
    passwordResetRequest, 
    passwordReset
} = require('../controller/UserController');

const validate = (req, res, next) => {
    const err = validationResult(req)
    if(err.isEmpty()){
        return next(); // 다음 할 일 (미들웨어, 함수)
    } else {
        return res.status(400).json(err.array())
    }
}


router.use(express.json());

router.post('/join', [body('email').notEmpty().isString().withMessage('문자 입력 필요'),
body('password').notEmpty().isString().withMessage('문자 입력 필요')
], validate, join);

router.post('/login', [body('email').notEmpty().isString().withMessage('문자 입력 필요'),
    body('password').notEmpty().isString().withMessage('문자 입력 필요')
],
validate, login);

router.post('/reset',body('email').notEmpty().isString().withMessage('문자 입력 필요'),
validate, passwordResetRequest);

router.put('/reset', [body('email').notEmpty().isString().withMessage('문자 입력 필요'),
body('password').notEmpty().isString().withMessage('문자 입력 필요')
], validate,passwordReset);


module.exports = router;