var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "Localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Amjad.password",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    main_menu();
});

function main_menu() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                name: "main",
                type: "list",
                message: "What would you like to do?",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit"]
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            if (answers.main === "View Products for Sale") {
                viewProducts();
            }
            if (answers.main === "View Low Inventory") {
                viewLowProducts();
            }
            if (answers.main === "Add to Inventory") {
                addToInventory();
            }
            if (answers.main === "Add New Product") {
                AddNewProduct();
            }
            if (answers.main === "Quit") {
                connection.end();
            }
        });
    console.log("\n");
}

function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (let i = 0; i < res.length; i++) {
        console.log("\n");
        console.table(res);
        console.log("\n");
        // console.log(res)
        // }
        // connection.end();
        main_menu();
    });
}

function viewLowProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (let i = 0; i < res.length; i++) {
        console.log("\n");
        console.table(res);
        console.log("\n");
        // console.log(res)
        // }
        // connection.end();
        main_menu();
    });
}

function addToInventory() {
    inquirer.prompt([{
            name: "id",
            type: "input",
            message: "Please enter the item-id of the product you would like to add!"
        },
        {
            name: "quan",
            type: "input",
            message: "How many units of the product you would like to add?"
        }
    ]).then(answers => {
        connection.query("SELECT * FROM products WHERE item_id =" + answers.id, function(err, res) {
            if (err) {
                throw err;
            }
            var quantity = res[0].stock_quantity;
            connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: quantity + parseFloat(answers.quan)
                },
                {
                    item_id: parseInt(answers.id)
                }
            ], function(err2, res2) {
                if (err2) {
                    throw err;
                }
                console.log("\nYour add was successfully made\n\n<==================================>\n");
                main_menu();
            })
        })
    })

}

function AddNewProduct() {
    inquirer.prompt([{
            name: "item_name",
            type: "input",
            message: "Please enter the item name!"
        },
        {
            name: "dept_name",
            type: "input",
            message: "Please enter the department name!"
        },
        {
            name: "price",
            type: "input",
            message: "Please enter the item price!"
        },
        {
            name: "stock",
            type: "input",
            message: "Please enter the item quantity!"
        }
    ]).then(answers => {
        connection.query("INSERT INTO products SET ?", {
            product_name: answers.item_name,
            department_name: answers.dept_name,
            price: parseFloat(answers.price),
            stock_quantity: parseFloat(answers.stock)
        }, function(err, res) {
            if (err) { throw err; }
            console.log("\nYour add was successfully made\n\n<==================================>\n");
            main_menu();
        })
    })
}