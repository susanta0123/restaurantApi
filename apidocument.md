## Page 1
List of city (GET) http://localhost:5002/locations

List of restaurants (GET) http://localhost:5002/restaurant

List of QuickSearch (GET) http://localhost:5002/quickSearch

restaurants wrt city (GET) http://localhost:5002/restaurant?stateId=1

## Page 2
List of restaurant wrt Meal http://localhost:5002/restaurant?mealId=1

Restaurants wrt cuisine & Meal http://localhost:5002/filter/1?cuisineId=2

Restaurants wrt cost & Meal http://localhost:5002/filter/1?&lcost=800&hcost=1000

Sort on basis of cost http://localhost:5002/filter/1?&lcost=600&hcost=1000&sort=1

## Page 3
Details of a restauranthttp://localhost:5002/details/645d9341989288df9151c644

http://localhost:5002/details/1

Menu of a restaurant http://localhost:5002/menu/6

## Page 4
Menu Details (POST) http://localhost:5002/menuItem

PlaceOrder (POST) http://localhost:5002/placeorder

## Page 5
List of orders http://localhost:5002/orders

List of orders wrt to emailhttp://localhost:5002/orders?email=susanta735@gmail.com

update payment details (PUT) http://localhost:5002/updateOrder/2

{ "status":"Pending", "bank_name":"SBI" , "date": "19/03/2023" }

delete orders (DELETE) http://localhost:5002/deleteOrder/64611ef15644ec60a4f01ebc

CRUD C - Create - POST R - Read - GET U - Update - PUT D - Delete - DELETE