$('document').ready(() =>  {
    const items = localStorage.getItem("orders");
    const storage = JSON.parse(localStorage.getItem("orders"));
    const total = document.querySelector('.total');
    console.log(storage);
    const load = () => {
        let totalPrice = null;
        storage.forEach(elem => {
            
            const template = `<li>
            <h2>${elem.food}</h2>
            <br>
            <h4>Price: ${elem.price}</h4>
            <br>
            <h4>Quantity:</h4>
            <select class="select" onChange="loadorders(this.value, ${elem.foodid})"  name="quantity">
                <option value="1">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button class="delete" onclick="deleteCart(this)"  data-price="${elem.price}" data-foodid="${elem.foodid}" data-food="${elem.food}">Delete</button>
            <br>
            <br>
            <hr>  
        </li>`
        
        totalPrice += parseInt(elem.price);
        total.innerHTML= `N${totalPrice}`
        $('ul.list').append(template);
        }); 
    }

    load();
  
});

const deleteCart = (elem) => {
    elem.parentElement.style.display='none';
    const storage = JSON.parse(localStorage.getItem("orders"));
    const foodid = elem.getAttribute("data-foodid");
    let orders = null

    storage.forEach(food => {
       const id = storage.find((order) => order.foodid == foodid);
       const index = storage.indexOf(id)
        storage.splice(index, 1);
        orders = storage;
        localStorage.setItem("orders", JSON.stringify(orders));
    });
   
}

const loadorders = (elem, foodid) => {
    let orders = [];
    const storage = localStorage.getItem("orders");
    orders = JSON.parse(storage);
    const order = orders.find(item => item.foodid == foodid);
    const index = orders.indexOf(order);
    orders.splice(index, 1);
    order.quantity = elem;
    orders.push(order);
    
    console.log(order);

   localStorage.setItem("orders", JSON.stringify(orders));

   console.log(index);
  

}