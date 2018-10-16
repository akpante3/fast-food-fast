$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const user = localStorage.getItem(Access_Key)
    const orders = [];
    let storage = JSON.parse(localStorage.getItem("orders"));
    const shoppingCart = document.querySelector('.shopping-cart-button');
    const admin = document.querySelector('.admin');
    const sign = document.querySelector('.signout');
    
    if(!storage || storage === null){
        storage = []
    };

    if(user){
      sign.innerHTML ='sign out';
    }
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
     };

     function userorders () {
        const user = localStorage.getItem('access_token');
        const decoded = parseJwt(user);
        const name = decoded.name;
        if(name !== 'foodadmin' || !user){
           admin.style.display = 'none';
        }
        
     }
     userorders();

    /** Append avalaible food menu to the index page
     *  @param {Array} menu
     * @public
    */
    const appendMenu = (menu) => {
        menu.forEach(meal => {
            const id =  storage.find(order => order.foodid == meal.foodid);
            const ordered = `<div><img src="${meal.image}" onerror="if(this.src != '.././UI/images/download.png' ) this.src = '.././UI/images/download.png';" alt="food"><p> ${meal.food}  </p>
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
             <button class="add-cart" onclick="addCart(this)"  data-price="${meal.price}" data-foodid="${meal.foodid}" data-email="${meal.email}" data-food="${meal.food}"
             data-price="${meal.price}" ><i class="fas fa-shopping-cart fa-1x"></i>  add to cart</button>
            </a>
        </div>`

        if(id){
            $('div.content').append(ordered);  
        } else{
            $('div.content').append(template);
        }
            
        });
        
    }

    $('.signout').click((e) => {
      localStorage.removeItem('access_token');
    });

    /** Load avaliable food menu from data the database
    * @public
    */
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
                localStorage.setItem("menu", JSON.stringify(result.data));
            });
           }
       }); 
    }
    
      shoppingCart.innerHTML =` ${storage.length}`;
    
    loadOrders()

});
