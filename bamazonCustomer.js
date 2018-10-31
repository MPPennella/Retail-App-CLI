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

        purchasePrompt()
    })
    
    
}

// Function that asks user what item they wish to purchase and in what quantity
function purchasePrompt() {
    inquirer.prompt([
        // Prompt user to enter ID of item to buy
        {
            message: "Enter Product ID of item to purchase:",
            name: "getItemID"
        },
        // Prompt user to enter quantity they wish to purchase
        {
            message: "Enter quantity to purchase:",
            name: "getQty"
        }
    ]).then( (response) => {
        let id = parseInt(response.getItemID)
        let qty = parseInt(response.getQty)

        if (id && qty && id>0 && qty>0) {
            console.log(`You wish to purchase ${qty} of product ${id}`)
        } else {
            console.log("Invalid input detected - please make sure to enter valid numbers for all entries (positive integers only)")
        }
    })

}

// Check for sufficient quantity to purchase

// If enough, update database with new stock level

// Show customer cost of purchase
