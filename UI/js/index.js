$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const orders = 'orders';
    const storage = JSON.parse(localStorage.getItem("orders"));
    const shoppingCart = document.querySelector('.shopping-cart-button');
    


    const appendMenu = (menu) => {
        

        menu.forEach(meal => {
            const id =  storage.find(order => order.foodid == meal.foodid);
            const ordered = `<div><img src="${meal.image}" alt="food"><p> ${meal.food}  </p>
            <br>
            <p>Price: ${meal.price}</p>
            <br>
            <a>
            <button class="add-cart"><i class="fas fa-shopping-cart fa-1x"></i>  added to cart</button>
            </a>
          </div>`

            const template =`<div><img src="${meal.image}" alt="food"><p> ${meal.food}  </p>
            <br>
            <p>Price: ${meal.price}</p>
            <br>
            <a>
             <button class="add-cart" onclick="addCart(this)"  data-price="${meal.price}" data-foodid="${meal.foodid}" data-food="${meal.food}"><i class="fas fa-shopping-cart fa-1x"></i>  add to cart</button>
            </a>
        </div>`

        if(id){
            $('div.content').append(ordered);  
        } else{
            $('div.content').append(template);
        }
            
        });
        
    }

    const loadOrders = () => {
        fetch('https://fast-food-fast-food.herokuapp.com/api/v1/menu', {
            method : 'get',
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                accessToken : window.localStorage.getItem(Access_Key)
            }
       })
       .then(res => {
           if(res.status == 200) {
            res.json().then(result => {
                appendMenu(result.data)
            });
           }
       }); 
    }
    shoppingCart.innerHTML =` ${storage.length}`;
    loadOrders()

})