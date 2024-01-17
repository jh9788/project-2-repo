// const conn = require('../mariadb');
const mariadb = require('mysql2/promise');
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const order = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dateStrings : true
    })

    const {items, delivery, total_quantity, total_price, user_id, first_book_title} = req.body;

    let sql = `INSERT INTO deliveries (address, receiver, contact) 
    VALUES (?, ?, ?)`;

    let values = [delivery.address, delivery.receiver, delivery.contact]
     //deliveries 테이블 삽입
    let [results] = await conn.execute(sql, values);
    let delivery_id = results.insertId;

    //orders 테이블 삽입
    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id) 
    VALUES (?, ?, ?, ?, ?);`
    values = [];
    values = [first_book_title, total_quantity, total_price, user_id, delivery_id];
    [results] = await conn.execute(sql, values);
    let order_id = results.insertId;

    // items를 가지고, 장바구니에서 book_id, quantity 조회
    sql = 'SELECT book_id, quantity FROM cartItems WHERE id IN (?)';
    let [orderItems, fields] = await conn.query(sql, [items]);

    //orderedBooks 테이블 삽입
    sql = `INSERT INTO orderedBooks (order_id, book_id, quantity) VALUES ?;`;
    values = [];
    orderItems.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    })

    results = await conn.query(sql, [values]); 

    let result = await deleteCartItems(conn, items);

    return res.status(StatusCodes.OK).json(results[0]);
};

const deleteCartItems = async (conn, items) => {
    let sql = `DELETE FROM cartItems WHERE id IN (?);`;

    let results = await conn.query(sql, [items]);
    return results;
}

const getOrders = async (req, res) => {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dateStrings : true
    })

    let sql = `SELECT orders.id, created_at, address, receiver, contact, book_title,
    total_quantity, total_price
    FROM orders LEFT JOIN deliveries
    ON orders.delivery_id = deliveries.id;`

    let [rows, fields] = await conn.query(sql);
    return res.status(StatusCodes.OK).json(rows);
};

const getOrderDetail = async (req, res) => {
    const {id} = req.params;

    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dateStrings : true
    })

    let sql = `SELECT book_id, title, author, price, quantity
    FROM orderedBooks LEFT JOIN books
    ON orderedBooks.book_id = books.id
    WHERE order_id = ?`

    let [rows, fields] = await conn.query(sql, [id]);
    return res.status(StatusCodes.OK).json(rows);

}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}