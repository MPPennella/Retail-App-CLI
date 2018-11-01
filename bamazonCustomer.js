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

// Start by showing a list of items
listItems();

// Function that lists all items for sale
function listItems() {

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

        // Check that id and qty were valid numbers and are greater than zero
        if (id && qty && id>0 && qty>0) {
            // Confirm order details
            console.log(`You wish to purchase ${qty} of product ${id}`)
            inquirer.prompt({
                type: "confirm",
                message: "Is this correct?",
                name: "confirm"
            }).then( (response) => {
                if (response.confirm) {
                    // Proceed to purchase if confirmed
                    purchaseProduct(id, qty)
                } else {
                    console.log("Purchase cancelled")

                    // Offer to place another order
                    orderAgainPrompt()
                }
            })
        } else {
            console.log("ERROR: Invalid input detected - please make sure to enter valid numbers for all entries (positive integers only)")
            connection.end()
        }
    })

}

function purchaseProduct(id, qty) {
    
    // Pull database again to make sure latest stock levels are reflected
    let stockQuery = "SELECT product_name, stock_quantity, price FROM products WHERE item_id=?"
    connection.query( stockQuery, [id], (error, response) => {
        if (error) throw error;

        if (response.length){
            let item = response[0]
            let avail = item.stock_quantity
            let price = item.price

            // Check for sufficient quantity to purchase
            if (qty<=avail) {
                // Query database to subtract quantity from stock
                let updateQuery = "UPDATE products SET stock_quantity=? WHERE item_id=?"
                connection.query(updateQuery,[avail-qty, id], (error, response) => {
                    if (error) throw error;

                    // Show customer purchase details
                    console.log("Purchase successful!")
                    console.log()
                    console.log("Your order:")
                    let orderTable = new Table({head: ["Product","Qty","Total"]})
                    orderTable.push( [item.product_name, qty, "$"+(price*qty).toFixed(2)] )
                    console.log(orderTable.toString())
                    
                    // Offer to place another order
                    orderAgainPrompt()
                })
            } else {
                // Insufficient quantity
                console.log("ERROR: Insufficient quantity available to purchase")
                connection.end()
            }
            
        } else {
            // No responses means ID was not found
            console.log(`ERROR: Product with ID ${id} not found`)
            connection.end()
        }

    })

    
}

// Function that prompts the user if they want to order again
function orderAgainPrompt() {
    console.log()
    inquirer.prompt({
        type: "confirm",
        message: "Would you like to place another order?",
        name: "confirm"
    }).then( (response) => {
        if (response.confirm) {
            listItems()
        } else {
            console.log("Thank you for shopping with us!")
            connection.end()
        }
    })
}
