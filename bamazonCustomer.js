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
        
        let products = response;

        let prodTable = new Table({head: ["Product ID","Product Description","Department","Price","Qty Available"]})
        
        products.map( (product) =>{
            let id = product.item_id
            let pName = product.product_name
            let dept = product.department_name
            let price = "$"+product.price.toFixed(2)
            let quantity = product.stock_quantity

            prodTable.push([id,pName,dept,price,quantity])
        })

        console.log(prodTable.toString())
        
        connection.end()
    })
    
    
}

// Prompt user to enter ID of item to buy

// Prompt user to enter quantity they wish to purchase

// Check for sufficient quantity to purchase

// If enough, update database with new stock level

// Show customer cost of purchase