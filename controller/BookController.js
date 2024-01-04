const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')

const dotenv = require('dotenv');
dotenv.config();

const books = (req, res) => {
    let {category_id} = req.query;
    if(category_id)
        booksByCategory(req, res);
    else
        allBooks(req, res);
}

const allBooks = (req, res) => {
   let sql = `SELECT * from books`;

   conn.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        return res.status(StatusCodes.OK).json(results);
   })
};

const booksByCategory = (req, res) => {
    let {category_id} = req.query;

    let sql = `SELECT * FROM books WHERE category_id = ?`;
   conn.query(sql, category_id, (err, results) => {
    if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST);
    }

    if(results.length)
        return res.status(StatusCodes.OK).json(results);
    else
        return res.status(StatusCodes.NOT_FOUND).end();

    })
};

const bookDetail = (req, res) => {
   let {id} = req.params;

   let sql = `SELECT * FROM books WHERE id = ?`;
   conn.query(sql, id, (err, results) => {
    if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST);
    }

    if(results[0])
        return res.status(StatusCodes.OK).json(results[0]);
    else
        return res.status(StatusCodes.NOT_FOUND).end();

})
};



const newBooks = (req, res) => {
   
};

module.exports = {
    books,
    bookDetail,
    newBooks
}