DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100),
  price DECIMAL(65,8) NOT NULL,
  stock_quantity DECIMAL(65,8),
  product_sales DECIMAL(65,8) DEFAULT 0,
  PRIMARY KEY (item_id)
);

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs DECIMAL(65,8) NOT NULL,
  PRIMARY KEY (department_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Light", "Electronics", 10, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeans", "Clothing", 15, 60);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dryer", "Electronics", 50, 20);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T-Shirt", "Clothing", 10, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("HDMI Cable", "Electronics", 5, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Skirt", "Clothing", 20, 40);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Furniture", 80, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed", "Furniture", 200, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pin", "Office", 2, 200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pincel", "Office", 1.5, 500);



INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", 50);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", 60);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Furniture", 40);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Office", 40);