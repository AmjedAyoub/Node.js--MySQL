DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price INTEGER(10) NOT NULL,
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item1", "dep1", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item2", "dep2", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item3", "dep3", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item4", "dep4", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item5", "dep5", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item6", "dep6", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item7", "dep7", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item8", "dep8", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item9", "dep9", 10, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("item10", "dep10", 10, 10);