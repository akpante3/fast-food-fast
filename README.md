
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
- **[<code>POST</code>api/v1/auth/login]**
- **[<code>POST</code>api/v1/auth/signup]**
- **[<code>GET</code>api/v1/orders/auth/orders/:id/orders]**
- **[<code>POST</code>api/v1/menu]**
- **[<code>GET</code>api/v1/menu]**


## How to use API on POSTMAN

<table>

<tr><th>HTTP VERB</th><th>API ENDPOINT</th><th>FUNCTION</th><th>INPUT</th><th>OUTPUT</th></tr>

<tr>
<td>POST</td> <td>api/v1/auth/signup</td>  <td>Signup user</td>
<td>
{<br> name: "string",<br>email: "string",<br>phone: "string",<br> address: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/auth/login</td>  <td>Login user</td>
<td>
{<br> email: "string",<br>password: "string"<br>}
</td>
<td>
{<br> message: "string",<br>token: "string"<br>}
</td>
</tr>

<tr>
<td>POST</td> <td>api/v1/menu</td>  <td>Create new menu</td>
<td>
{<br> menu: "string",<br>description: "string",<br>category: "string",<br>quantity: "string",<br>price: "string"<br>}<br>"Authorization": "token"
</td>
<td>{<br>message: "string"<br>menu: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/menu</td>  <td>Get All Available Menu</td>
<td>"Authorization": "token" or undefined</td>
<td>{<br>message: "string"<br>allMenu: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/menu/:menuId</td>  <td>Get A Specific Menu</td>
<td>menuId: "Number"<br>"Authorization": "token"</td>
<td>{<br>message: "string"<br>foundMenu: {object}<br>}</td>
</tr>

<tr>
<td>PUT</td> <td>api/v1/menu/:menuId</td>  <td>Update menu</td>
<td>
{<br> menu: "string",<br>description: "string",<br>category: "string",<br>quantity: "string",<br>price: "string"<br>}
<br>menuId: "Number"
<br>"Authorization": "token"
</td>
<td>{<br>message: "string"<br>menu: {object}<br>}</td>
</tr>

<tr><td>POST</td> <td>api/v1/orders</td>  <td>Place order</td>
<td>{<br>orderItems: [<br>{<br>menuId: "Number",<br>quantity: "Number"<br>}<br>],<br>location: "string" or undefined,<br>}<br>"Authorization": "token"</td>
<td>{<br>message: "string",<br>newOrder: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/orders/:userId/orders</td>  <td>Get user order history</td>
<td>userId: "Number"<br>"Authorization": "token"</td>
<td>{<br>message: "string"<br>orderHistory: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/orders</td>  <td>Get all orders</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>allOrders: {object}<br>}</td>
</tr>

<tr>
<td>GET</td> <td>api/v1/orders/:orderId</td>  <td>Get specific order</td>
<td>"Authorization": "token"</td>
<td>{<br>message: "string"<br>foundOrder: {object}<br>}</td>
</tr>





</table>

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
