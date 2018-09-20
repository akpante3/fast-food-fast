
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
- **[<code>GET</code>api/v1/menu]**
- **[<code>GET</code>api/v1/orders]**
- **[<code>GET</code> api/v1/orders/:id]**
- **[<code>POST</code>api/v1/orders]**
- **[<code>PUT</code>api/v1/orders/:id]**

## how to run on POSTMAN
- **[<code>GET</code>api/v1/menu]** get all the avaliab5le food on6 the app<br/>

- **[<code>POST</code>api/v1/orders]**<br/>
    required data:{<br/>
      foodId:1, number *id from the food menu*<br/>
      quantity:12, number<br/>
     }<br/>
     
- **[<code>GET</code>api/v1/orders]** get all orders that have been posted on the app<br/>

- **[<code>GET</code> api/v1/orders/:id]**get a particular order<br/>
    required data:<br/>
      -id.params is the order id,<code>GET</code>api/v1/orders to see all orders and ids
      
- **[<code>PUT</code>api/v1/orders/:id]**<br/>
     required data:<br/>
        -id.params is the order id,<code>GET</code>api/v1/orders to see all orders and ids<br/>
        -{ status : 'completed'}

 

## Technologies and Frameworks
. HTML, 
. CSS, 
. NodeJs, 

## Author
 akpante3
<Your name here as a link to your git account>
