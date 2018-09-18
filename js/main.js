const choose = Array.from(document.querySelectorAll('.choose'));
// const addCart = Array.from(document.querySelectorAll('.add-cart'));
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
    if (nextElem.style.display === 'block'){
         nextElem.style.display = 'none';
        } else {
         nextElem.style.display='block';
         nextElem.innerHTML=`                    
         <h3>Number of Orders:</h3>
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
const deleteCart = (elem) => {
    elem.parentElement.style.display='none';
}
let num = 0;
choose.forEach((elem) => {
    elem.addEventListener('click', () => {
        toShoppingCart(elem);
    });
    
});

const addCart = (elem) => {
    elem.parentElement.innerHTML=`
    <p>Added to cart</p><br><button class="restore" onclick="toShoppingCart(this)"> update </button>
    `;
    num += 1
    shoppingCart.innerHTML =` ${num}`;
} 

