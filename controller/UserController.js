const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
dotenv.config();

const join = (req, res) => {
    const {email, password} = req.body;

    //비밀번호 암호화
    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';
    let values = [email, hashedPassword, salt];

    conn.query(sql, values, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.BAD_REQUEST).end();
        }

        if(results.affectedRows)
            return res.status(StatusCodes.CREATED).json(results);
        else
            return res.status(StatusCodes.BAD_REQUEST).end();

    })
};

const login = (req, res) => {
    const {email, password} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;

    conn.query(sql , email,
      (err, results) => {
          if(err) {
              console.log(err)
              return res.status(StatusCodes.BAD_REQUEST).end()
          }

          const loginUser = results[0]
          const hashedPassword = crypto.pbkdf2Sync(password, loginUser.salt, 10000, 10, 'sha512').toString('base64');
  
          if(loginUser && loginUser.password == hashedPassword){
              //token 발급
              const token = jwt.sign({
                id: loginUser.id,
                email : loginUser.email
              }, process.env.PRIVATE_KEY, {
                  expiresIn : '30m',
                  issuer : "jh"
              });
  
              res.cookie("token", token,{
                  httpOnly: true
              });
              console.log(token);

              return res.status(StatusCodes.OK).json(results);
          }
          else{
              res.status(StatusCodes.UNAUTHORIZED).end();
          }
      }
  )
  };

const passwordResetRequest = (req, res) => {
    const {email} = req.body;

    let sql = `SELECT * FROM users WHERE email = ?`;

    conn.query(sql , email,
      (err, results) => {
          if(err) {
              console.log(err)
              return res.status(StatusCodes.BAD_REQUEST).end()
          }

          const user = results[0];

          if(user) {
            return res.status(StatusCodes.OK).json({
                email : user.email
            });
          } else {
            return res.status(StatusCodes.UNAUTHORIZED).end();
          }

        }
    )
};

const passwordReset = (req, res) => {
    const {email, password} = req.body;

    const salt = crypto.randomBytes(10).toString('base64');
    const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 10, 'sha512').toString('base64');

    let sql = `UPDATE users SET password = ?, salt = ? WHERE email = ?`;
    let values = [hashedPassword, salt, email];

    conn.query(sql, values,
    (err, results) => {
    if(err) {
        console.log(err)
        return res.status(StatusCodes.BAD_REQUEST).end();
    }

    if(results.affectedRows == 0){
        return res.status(StatusCodes.BAD_REQUEST).end();
    } else {
        return res.status(StatusCodes.OK).json(results);
    }

})
};

module.exports = {
    join,
    login,
    passwordResetRequest,
    passwordReset
}