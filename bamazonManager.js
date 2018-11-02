require("dotenv").config()
let dbUser = process.env.MYSQL_DB_USERNAME
let dbPassword = process.env.MYSQL_DB_PASSWORD

const inquirer = require("inquirer")
const Table = require("cli-table")
const mysql = require("mysql")

// Database variables
const dbHost = "localhost"
const dbPort = 3306
const dbName = "bamazon"

// Establish database connection
let connection = mysql.createConnection({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: dbName
})

// Start with prompt for different modes
selectMode()

function selectMode() {
    inquirer.prompt({
        type: "list",
        message: "Select mode:",
        choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product","Exit"],
        name: "mode"
    }).then( (response) => {
        switch (response.mode) {
            case "View Products for Sale":
            break;

            case "View Low Inventory":
            break;

            case "Add to Inventory":
            break;

            case "Add New Product":
            break;

            case "Exit":
            connection.end()
            break;
        }
    })
}