const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')

const dotenv = require('dotenv');
dotenv.config();

// (카테고리 별, 신간 여부) 전체 도서 목록 조회
const books = (req, res) => {
    let {category_id, new_book, list_num, page} = req.query;

    let offset = list_num * (page-1);
    list_num = parseInt(list_num);
    let sql = `SELECT *, (SELECT count(*) FROM likes WHERE liked_book_id = books.id ) AS likes FROM books`;
    let values = [];

    if(category_id && new_book){
        sql += ` WHERE category_id = ?`;
        sql += ` AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
        values.push(category_id);
    }
    else if(category_id){
        sql += ` WHERE category_id =?`
        values.push(category_id);
    } 
    else if(new_book) {
        sql += ` WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()`
    }

    sql += "  LIMIT ? OFFSET ?";
    values.push(list_num, offset);

    conn.query(sql, values, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        }

        if(results.length)
        return res.status(StatusCodes.OK).json(results);
    else
        return res.status(StatusCodes.NOT_FOUND).end();

    
   })
       
/*
    if(category_id)
        booksByCategory(req, res);
    else
        allBooks(req, res);
    */
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
    let {category_id, new_book} = req.query;

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
    let {user_id} = req.body;
   let book_id = req.params.id;

   let sql = `SELECT books.id, title, img, category_id, form isbn, summary, detail, author, pages, contents,
   pub_date, category_name, 
(SELECT count(*) FROM likes WHERE liked_book_id = books.id) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id = ? AND liked_book_id = ? ))AS liked
FROM books, categories 
WHERE books.category_id = categories.id AND books.id = ?;`;

    let values = [user_id, book_id, book_id]
   conn.query(sql, values, (err, results) => {
    if(err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST);
    }

    console.log(results)
    if(results[0])
        return res.status(StatusCodes.OK).json(results[0]);
    else
        return res.status(StatusCodes.NOT_FOUND).end();

})
};



const addBooks = (req, res) => {
    
    const {title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date} = req.body;

    let sql = `INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    let values = [title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date];
 
    conn.query(sql, values, (err, results) => {
         if(err) {
             console.log(err);
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         }
 
         return res.status(StatusCodes.OK).json(results);
    })
};

module.exports = {
    books,
    bookDetail,
    newBooks
}