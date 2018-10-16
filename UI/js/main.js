const choose = Array.from(document.querySelectorAll('.choose'));
const shoppingCart = document.querySelector('.shopping-cart-button');

const toShoppingCart = (elem) => {
    elem.parentElement.innerHTML=`<p>Quantity:</p>
    <select class="select">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
  </select>
  <br>
  <button class="add-cart" onclick="addCart(this)"><i class="fas fa-shopping-cart fa-1x"></i>  add to cart</button>
  `
}
const toggle_next= (elem) =>  {
    do{
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem
}

const toggle_info = (elem) => {
    const nextElem = toggle_next(elem);
    const foodid = elem.getAttribute("data-foodid");
    const email = elem.getAttribute("data-email");
    const time = elem.getAttribute("data-time");
    const quantity = elem.getAttribute("data-quantity");
    const orderid = elem.getAttribute("data-orderid");
    const items = localStorage.getItem("orders");

    if (nextElem.style.display === 'block'){
         nextElem.style.display = 'none';
        } else {
         nextElem.style.display='block';
         nextElem.innerHTML=`                    
         <h3>Quantity of Order: ${ quantity}</h3>
         <br>
         <h3>food ID: ${ foodid}</h3>
         <br>
         <h3>Email: ${ email}</h3>
         <br>
         <h3>Date: ${ time}</h3>
         <br>
         <h3>order ID: ${ orderid}</h3>
         <br>
         <div>
             <button class="decline" onclick="decline(this)" >Deline</button> <button class="accept" onclick="accept_btn(this); return false">Accept</button>
             <div></div>
         </div>`
        } 
}


const accept_btn = (elem) =>{
    console.log(elem.parentElement)
    elem.parentElement.innerHTML =`<button class="deliver" onclick="deliver(this)">deliver</button>`;
}
const decline = (elem) => {
    elem.parentElement.innerHTML = `<h4>order was declined</h4><button class='restore' onclick='restore(this)'>restore</button>`;
}
const restore = (elem) => {
    elem.parentElement.innerHTML = '<button class="decline" onclick="decline(this)" >Deline</button> <button id="accept" onclick="accept_btn(this); return false">Accept</button>';
}
const deliver = (elem) => {
    elem.parentElement.innerHTML ='<h4>order has been delivered</h4>';
}

let num = 0;

const addCart = (elem) => {
    let order = [];
    const foodid = elem.getAttribute("data-foodid");
    const food = elem.getAttribute("data-food");
    const price = elem.getAttribute("data-price");
    const items = localStorage.getItem("orders");
    const storage = JSON.parse(localStorage.getItem("orders"));
   
    if(items != null) {
        order = JSON.parse(items);
    }

    const item = {
        foodid,
        food,
        price
    }

    order.push(item);
    localStorage.setItem("orders", JSON.stringify(order));

    elem.parentElement.innerHTML= `<button class="add-cart"><i class="fas fa-shopping-cart fa-1x"></i>  added to cart</button> `;
    num = storage.length + 1;
    shoppingCart.innerHTML =` ${num}`;
} 

