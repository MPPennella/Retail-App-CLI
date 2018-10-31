require("dotenv").config()
let dbUser = process.env.MYSQL_DB_USERNAME
let dbPassword = process.env.MYSQL_DB_PASSWORD

const inquirer = require("inquirer")
const mysql = require("mysql")

// Database variables
const dbHost = "localhost"
const dbPort = 3306
const dbName = "bamazon"

// Start by showing a list of items
listItems();

// Function that lists all items for sale
function listItems() {
    // Establish database connection
    let connection = mysql.createConnection({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPassword,
        database: dbName
    })

    // Query database
    let query = "SELECT * FROM products"

    connection.query( query, (error, response) => {
        if (error) throw error;

        console.log(response)
        
        connection.end()
    })
    
    
}

// Prompt user to enter ID of item to buy

// Prompt user to enter quantity they wish to purchase

// Check for sufficient quantity to purchase

// If enough, update database with new stock level

// Show customer cost of purchase