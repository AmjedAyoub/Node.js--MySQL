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
                choices: ["View Products Sales by Department", "Create New Department", "Quit"]
            }
        ])
        .then(answers => {
            // Use user feedback for... whatever!!
            if (answers.main === "View Products Sales by Department") {
                viewProducts();
            }
            if (answers.main === "Create New Department") {
                createDept();
            }
            if (answers.main === "Quit") {
                connection.end();
            }
        });
    console.log("\n");
}

function viewProducts() {
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, sum(products.product_sales) as products_sales,sum(products.product_sales)-departments.over_head_costs as total_profit ";
    query += "FROM departments LEFT JOIN products ON (departments.department_name = products.department_name)  GROUP BY products.department_name";
    connection.query(query, function(err, res) {
        if (err) { throw err; }
        console.log("\n");
        console.table(res);
        console.log("\n");
        main_menu();
    });
}

function createDept() {
    inquirer.prompt([{
            name: "dept_name",
            type: "input",
            message: "Please enter the department name!"
        },
        {
            name: "over_head",
            type: "input",
            message: "Please enter the Over_head_costs!"
        }
    ]).then(answers => {
        connection.query("INSERT INTO departments SET ?", {
            department_name: answers.dept_name,
            over_head_costs: parseFloat(answers.over_head),
        }, function(err, res) {
            if (err) { throw err; }
            console.log("\nYour add was successfully made\n\n<==================================>\n");
            main_menu();
        })
    })
}