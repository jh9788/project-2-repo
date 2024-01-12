INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("어린왕자들", "종이책", 0, "어리다...", "많이 어리다...", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두...", "투명한 유리구두...", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("백설공주들", "종이책", 2, "사과...", "빨간사과...", "김백설", 100, "목차입니다.", 20000, "2020-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비...", "까만 제비...", "김흥부", 100, "목차입니다.", 20000, "2024-01-01");


SELECT * FROM Bookshop.books LEFT
JOIN categories ON books.category_id = categories.id;

SELECT * FROM Bookshop.books LEFT
JOIN categories ON books.category_id = categories.id
WHERE books.id =1 ;

SELECT books.id, title, img, category_id, form isbn, summary, detail, author, pages, contents,
pub_date, category_name FROM Bookshop.books, Bookshop.categories
WHERE books.category_id = categories.id AND books.id = 1;


INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "콩쥐 팥쥐", 4, 0, "ebook", 4, "콩팥", "콩심은데 콩나고", "김콩팥", 100, "목차~", 20000, "2023-12-07");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "용궁에 간 토끼", 5, 1, "종이책", 5, "깡충..", "용왕님 하이..", "김토끼", 100, "목차~", 20000, "2023-10-01");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "해님 달님", 15, 2, "ebook", 6, "동앗줄..", "썩은 동앗줄..", "김해님", 100, "목차~", 20000, "2023-07-16");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "장화홍련전", 80, 0, "ebook", 7, "장화..", "장화랑 홍련..", "김홍련", 100, "목차~", 20000, "2023-03-01");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "견우와 직녀", 8, 1, "ebook", 8, "오작교..", "칠월칠석..", "김견우", 100, "목차~", 20000, "2023-02-01");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "효녀 심청", 12, 0, "종이책", 9, "심청이..", "공양미 삼백석..", "김심청", 100, "목차~", 20000, "2023-01-15");
INSERT INTO books (title, img, category_id, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ( "혹부리 영감", 22 , 2, "ebook", 10, "혹부리..", "혹 두개 되버림..", "김영감", 100, "목차~", 20000, "2023-06-05");


- 좋아요

INSERT INTO likes (user_id, liked_book_id)
VALUES (1, 1);
INSERT INTO likes (user_id, liked_book_id)
VALUES (1, 1);
INSERT INTO likes (user_id, liked_book_id)
VALUES (1, 2);
INSERT INTO likes (user_id, liked_book_id)
VALUES (1, 3);
INSERT INTO likes (user_id, liked_book_id)
VALUES (3, 1);
INSERT INTO likes (user_id, liked_book_id)
VALUES (4, 4);
INSERT INTO likes (user_id, liked_book_id)
VALUES (2, 1);
INSERT INTO likes (user_id, liked_book_id)
VALUES (2, 2);
INSERT INTO likes (user_id, liked_book_id)
VALUES (2, 3);
INSERT INTO likes (user_id, liked_book_id)
VALUES (2, 5);

DELETE FROM likes WHERE user_id = 1 AND liked_book_id = 1;

SELECT count(*) FROM likes WHERE liked_book_id = 1;