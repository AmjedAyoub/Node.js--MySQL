var mysql = require("mysql");
var inquirer = require("inquirer");

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
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
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
        });
    console.log("\n");
}

function viewProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (let i = 0; i < res.length; i++) {
        console.table(res);
        console.log("\n");
        // console.log(res)
        // }
        // connection.end();
    });
    main_menu();
}

function viewLowProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (let i = 0; i < res.length; i++) {
        console.table(res);
        // console.log(res)
        // }
        // connection.end();
    });
    main_menu();
}

function addToInventory() {
    console.log("hi");

    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                name: "id",
                type: "input",
                message: "Please enter the ID of the product you would like to add!",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the product you would like to add?",
            }

        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            connection.query("SELECT * FROM products WHERE item_id =" + answers.id, function(err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                // console.log(res);
                if (res[0].stock_quantity >= answers.quantity) {
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: parseFloat(res[0].stock_quantity) - parseFloat(answers.quantity)
                            },
                            {
                                item_id: parseInt(answers.id)
                            }
                        ],
                        function(err, res1) {
                            if (err) throw err;
                            // console.log(res1.affectedRows + " products upd5ated!\n");
                            // Call deleteProduct AFTER the UPDATE completes
                        }
                    );
                    console.log("Your purchase was successfully made \n Your total is " + parseFloat(res[0].price) * parseFloat(answers.quantity) + "\n\n<==================================>");
                    connection.end();
                    // askUser();
                } else {
                    console.log("Insufficient quantity!\nPlease try again later\n\n<==================================>");
                    // askUser();
                }
            });

        });
    main_menu();
}

function AddNewProduct() {
    main_menu();
}