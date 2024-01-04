const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')

const dotenv = require('dotenv');
dotenv.config();

const allCategories =  (req, res) => {
    let sql = `SELECT * FROM categories`;
 
    conn.query(sql, (err, results) => {
         if(err) {
             console.log(err);
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         }
 
         return res.status(StatusCodes.OK).json(results);
    })
 };

 module.exports = {
    allCategories
 };