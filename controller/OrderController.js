const conn = require('../mariadb');
const {StatusCodes} = require('http-status-codes')
const jwt = require('jsonwebtoken');

const order = async (req, res) => {
    const {items, delivery, total_quantity, total_price, user_id, first_book_title} = req.body;

    let delivery_id;
    let order_id;

    let sql = `INSERT INTO deliveries (address, receiver, contact) 
    VALUES (?, ?, ?)`;

    let values = [delivery.address, delivery.receiver, delivery.contact]
 
    let [results] = await conn.query(sql, values, (err, results) => {
         if(err) {
             console.log(err);
             return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
         }
 
         delivery_id = results.insertId;
         console.log("results.insertId", results.insertId);
         console.log("conn.query - delivery_id", delivery_id);
    })

    console.log(results);

    sql = `INSERT INTO orders (book_title, total_quantity, total_price, user_id, delivery_id)
    VALUES (?, ?, ?, ?, ?);`
    values = [first_book_title, total_quantity, total_price, user_id, delivery_id]

    conn.query(sql, values, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
        }
 
        order_id = results.insertId;
    })

    sql = `INSERT INTO orderedBooks (order_id, book_id, quantity) VALUES ?;`;
    values = [];
    items.forEach((item) => {
        values.push([order_id, item.book_id, item.quantity])
    })
    
    console.log(values);

    conn.query(sql, [values], (err, results) => {
            if(err) {
                console.log(err);
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
            }
            return res.status(StatusCodes.OK).json(results);
        })
};

const getOrders = (req, res) => {
    res.json('주문 목록 조회');

};

const getOrderDetail = (req, res) => {
    res.json('주문 상세 상품 조회');
}

module.exports = {
    order,
    getOrders,
    getOrderDetail
}