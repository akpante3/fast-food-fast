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
 -git-pages: https://akpante3.github.io/fast-food-fast/
 -heroku: https://api-fast-food.herokuapp.com/api/v1/
 
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
- **[<code>GET</code>api/v1/menu]**
- **[<code>GET</code>api/v1/orders]**
- **[<code>GET</code> api/v1/orders/:id]**
- **[<code>POST</code>api/v1/orders]**
- **[<code>PUT</code>api/v1/orders/:id]**

## How to run on POSTMAN
- **[<code>GET</code>api/v1/menu]** to get the food menu(list of avaliable food)

- **[<code>POST</code>api/v1/orders]**<br />
     -required data:{ <br />
        foodId: 1, number *from the food menu, <code>GET</code>api/v1/menu to see food menu* <br />
        quantity: 6, number <br />
      };
  
 - **[<code>GET</code>api/v1/orders]** get the orders that have been made.
 
 - **[<code>PUT</code>api/v1/orders/:id]**  <br />
      required data: <br />
       - params.id should be the orders 'id' from the orders list, <code>GET</code>api/v1/orders to see list <br />
       - eg { <br />
        status:'completed' <br />
         };

- **[<code>GET</code> api/v1/orders/:id]** <br />
    required data: <br />
      - params.id should be the orders 'id' from the orders list, <code>GET</code>api/v1/orders to see list 

## Technologies and Frameworks
. HTML, 
. CSS, 
. NodeJs, 

## Author
 akpante3
<Your name here as a link to your git account>
