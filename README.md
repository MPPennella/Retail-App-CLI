# Retail-App-CLI
A CLI-based app that simulates an online retail environment

## Customer View

The Customer view allows a customer to place orders for any of the items offered for sale.

Upon starting the application, the customer will be shown a table listing all available products, and including description, department, price, and availability info for each product, as well as a unique ID to identify the product.

Customers are then prompted to enter the ID corresponding to the item that they wish to purchase. Once an ID has been entered, they will then enter the quantity that they wish to purchase. IDs will be checked to make sure they are valid and quantites must be 1 or greater.

Once the application determines a valid order has been placed, the order request is sent to the database. The available quantity is checked to make sure there are enough of the selected item to fulfill the order. If there is sufficient quantity, the order is placed and that many units are deducted from the stock in the database. The customer is informed of their order, including the total cost for the quantity they ordered.

The customer is then asked if they would like to make another purchase. If they would like to do so, the application starts over at the list of items for purchase and continues from there. If the customer opts not to place another order, the application terminates.