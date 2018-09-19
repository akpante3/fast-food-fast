
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

- **[<code>GET</code>api/v1/menu]**<br/> 
    -get all the avaliable food on the app<br/>

- **[<code>POST</code>api/v1/orders]**<br/>
    -post an order on the app<br/>
    -required data:   {<br/>
         foodId:---*type: number,input foodId of food you want to order,go to* **<code>GET</code>api/v1/menu** *to get foodId of food*<br/>
         quantity:---*type: number*<br/>
      }<br/>
     
- **[<code>GET</code>api/v1/orders]** <br/>
    -get all orders that have been posted on the app<br/>

- **[<code>GET</code> api/v1/orders/:id]**<br/>
    -get a particular order<br/>
    -params.id is the order id, **<code>GET</code>api/v1/orders** to see all orders and id
      
- **[<code>PUT</code>api/v1/orders/:id]**<br/>
         -id.params is the order id,**<code>GET</code>api/v1/orders** to see all orders and id<br/> 
         -required data:   { 
         <br/>
                status : 'completed','decline'---*type: sting* <br/>
           }<br/>

 

## Technologies and Frameworks
. HTML, 
. CSS, 
. NodeJs, 

### How do I connect to the this API?


### What return formats do you support?
fast-food-fast currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
N/A

### Is there a request rate limit?
N/A
