const ensureAuthorization = require('../auth');
const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const addLike = (req, res) => {
    const {liked_book_id} = req.params;
   
    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }

    let sql = `INSERT INTO likes (user_id, liked_book_id)
    VALUES (?, ?)`;

    let values = [authorization.id, liked_book_id]
 
    conn.query(sql, values, (err, results) => {
         if(err) {
             console.log(err);
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         }
 
         return res.status(StatusCodes.OK).json(results);
    })
};



const removeLike = (req, res) => {
    const {liked_book_id} = req.params;

    let authorization = ensureAuthorization(req, res);

    if(authorization instanceof jwt.TokenExpiredError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            "message" : "로그인 세션이 만료되었습니다. 다시 로그인 하세요."
        });
    } else if (authorization instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            "message" : "잘못된 토큰입니다."
        });
    }

    let sql = `DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?`;

    let values = [authorization.id, liked_book_id]
 
    conn.query(sql, values, (err, results) => {
         if(err) {
             console.log(err);
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         }
 
         return res.status(StatusCodes.OK).json(results);
    })
};


module.exports = {
    addLike,
    removeLike
}