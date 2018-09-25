
[![Coverage Status](https://coveralls.io/repos/github/akpante3/fast-food-fast/badge.svg?branch=ch-test-endpoints-%23160431153)](https://coveralls.io/github/akpante3/fast-food-fast?branch=ch-test-endpoints-%23160431153)
[![Build Status](https://travis-ci.org/akpante3/fast-food-fast.svg?branch=ch-test-endpoints-%23160431153)](https://travis-ci.org/akpante3/fast-food-fast)


# fast-food-fast
its an APP used for ordering fast food and with an admin control.

## Table of Contents
* [Tasks](#tasks)
* [Features](#features)
* [Installation and Setup](#installation-and-setup)
* [Tests](#tests)
* [Style](#style)
* [Endpoints](#endpoints)
* [Technologies and Frameworks](#technologies-and-frameworks)
* [Author](#author)

## Tasks
 https://akpante3.github.io/fast-food-fast/
 https://api-fast-food.herokuapp.com/api/v1/
 
## Features
.API endpoints for food orders
.UI template

## Installation and Setup
on[console]
.cd server 
.nmp install
.nmp start

## Tests
npm test

## Style
* Eslint
* Airbnb

## Endpoints
- **[<code>GET</code>api/v1/orders]**
- **[<code>GET</code> api/v1/orders/:id]**
- **[<code>POST</code>api/v1/orders]**
- **[<code>PUT</code>api/v1/orders/:id]**

## How to use API on POSTMAN

|HTTP verbs | Route Endpoints| Function | Request Payload|
| :---         |     :---:      |          ---: |          ---: |
| GET  | /api/v1/menu     |get food menu</br>*foodId to post an order*    | None   |
| GET  | /api/v1/orders     |Gets all orders    | None   |
| POST    | 	/api/v1/orders       | Posts a new order    |"orders": [    {"foodId": <number>, "quantity": <number>},<br>{"foodId": <number>, "quantity": <number>}]|                                    
| GET    | /api/v1/orders/:ordersId       | Gets an order      | None |  
| PUT    | /api/v1/orders/:ordersId      | Updates an order status     |<CODE>status : 'completed','decline','accept'</CODE><br>---*type: sting*|
 

## Technologies and Frameworks
- HTML, 
- CSS, 
- NodeJs, 
- express
- ESlint
- Mocha
- Babel

### How do I connect to the this API?


### What return formats do you support?
fast-food-fast currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
N/A

### Is there a request rate limit?
N/A
