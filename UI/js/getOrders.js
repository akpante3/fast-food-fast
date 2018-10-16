$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const orders = 'orders';
    const storage = JSON.parse(localStorage.getItem("menu"));
    
    /** on page load append orders all orders the gell all orders page
     *  @param {Array} order
     * @public
    */
    const appendOrders = (order) => {
        
        order.forEach(meal => {
            const name =  storage.find(order => order.foodid == meal.foodid);
            const template =`<hr>
            <li>
            <h2> ${name.food}</h2>
            <button class="info-button" onclick=" toggle_info(this);"
            data-time="${meal.timeordered}" data-quantity="${meal.quantity}" data-email="${meal.email}" data-orderid="${meal.orderid}"
            data-foodid="${meal.foodid}">info</button>
            <div class="info">
            </div>
            </li>
            `

            $('ul.list').append(template);
        
            
        });
        
    }
    /**  Lods all orders from the database using fetch
    * @public
    */
    const loadOrders = () => {
        fetch('https://fast-food-fast-food.herokuapp.com/api/v1/orders', {
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
                appendOrders(result.data)
            });
           }
       }); 
    }
    loadOrders();
});