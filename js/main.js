const addCart = Array.from(document.querySelectorAll('.add-cart'));
const shoppingCart = document.querySelector('.shopping-cart-button');

const toggle_prev = (elem) => {
    do{
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem   
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
        } 
}
const accept_btn = (elem) =>{
    const nextBtn = toggle_next(elem);
    const prevBtn = toggle_prev(elem);
    prevBtn.style.display = 'none';
    elem.style.display = 'none';
    nextBtn.style.display = 'block';
}
const decline = (elem) => {
    const prevdiv = toggle_prev(elem);
    const nextBtn = toggle_next(elem);
    prevdiv.innerHTML = `<h4>order was Declined</h4> <button id='restore'>Restore</button>`
    nextBtn.style.display = 'none';
    elem.style.display = 'none';
}

const deliver = (elem) => {
    const nextBtn = toggle_next(elem);
    nextBtn.innerHTML = `<h4>Order has been delivered</h4>`
    elem.style.display = 'none';
}
let num = 0;
addCart.forEach((elem) => {
    elem.addEventListener('click', () => {
      num += 1
      shoppingCart.innerHTML =` ${num}`;
    });
    
});
