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
            viewProducts()
            break;

            case "View Low Inventory":
            viewLowStock()
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

function viewProducts() {

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

function viewLowStock() {

    // Query database
    let query = "SELECT * FROM products WHERE stock_quantity<5"

    connection.query( query, (error, response) => {
        if (error) throw error;
        
        let products = response;

        if (products.length) {
            let prodTable = new Table({head: ["Product ID","Product Description","Department","Price","Qty Available"]})
            
            products.map( (product) =>{
                let id = product.item_id
                let pName = product.product_name
                let dept = product.department_name
                let quantity = product.stock_quantity

                prodTable.push([id,pName,dept,price,quantity])
            })

            console.log(prodTable.toString())
        } else {
            console.log("Currently no items with low stock.")
        }
        connection.end()
    })
}