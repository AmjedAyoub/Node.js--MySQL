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
    askUser();
});

function showProducts() {
    console.log("Selecting all products...\n");
    connection.query("SELECT item_id,product_name,department_name,price FROM products", function(err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        // for (let i = 0; i < res.length; i++) {
        console.log("\n");
        console.table(res);
        console.log("\n===============================================================\n");
        // console.log(res)
        // }
        buy();
    });
}

function askUser() {
    inquirer.prompt([{
        name: "whattodo",
        type: "list",
        message: "What you want to do?",
        choices: ["Buy  Products", "Quit"]
    }]).then(answer => {
        if (answer.whattodo === "Buy  Products") {
            showProducts();
            console.log("\n");
        }
        if (answer.whattodo === "Quit") {
            connection.end();
        }
    })

}

function buy() {
    inquirer
        .prompt([
            /* Pass your questions in here */
            {
                name: "id",
                type: "input",
                message: "Please enter the ID of the product you would like to buy!",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many units of the product you would like to buy?",
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
                                stock_quantity: parseFloat(res[0].stock_quantity) - parseFloat(answers.quantity),
                                product_sales: res[0].product_sales + parseFloat(res[0].price) * parseFloat(answers.quantity)
                            },
                            {
                                item_id: parseInt(answers.id)
                            }
                        ],
                        function(err1, res1) {
                            if (err1) throw err1;
                            // console.log(res1.affectedRows + " products upd5ated!\n");
                            // Call deleteProduct AFTER the UPDATE completes
                        }
                    );
                    console.log("\nYour purchase was successfully made \n Your total is " + parseFloat(res[0].price) * parseFloat(answers.quantity) + "\n\n<==================================>\n");
                    console.log("\n");
                    askUser();
                } else {
                    console.log("\nInsufficient quantity!\nPlease try again later\n\n<==================================>\n");
                    console.log("\n");
                    askUser();
                }
            });

        });
}