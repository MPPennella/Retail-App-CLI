DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
    item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,4),
    stock_quantity INTEGER,

    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("55\" 4k Resolution OLED TV", "Electronics", 1200.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Star Wars: A New Hope Remastered Blu-Ray", "DVD/Video", 29.99, 87);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Game of Thrones Season 1 Blu-Ray Set", "DVD/Video", 49.99, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("PS4 Pro", "Electronics", 399.99, 39);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Oxford Unabridged English Dictionary", "Books", 100.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Harry Potter and the Sorceror's Stone", "Books", 29.99, 88);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Dark Side of the Moon Remastered CD", "Music", 14.99, 246);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Sun Tzu's Art of War", "Books", 19.99, 83);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("The Odyssey - Homer", "Books", 24.99, 22);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("The Divine Comedy by Dante Alighieri Box Set", "Books", 40.00, 13);