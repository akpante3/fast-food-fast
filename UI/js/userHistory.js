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
            const template =`               <li>
            <h2>${name.food}</h2>
            <br>
            <h4>order-id: ${meal.orderid}</h4>
            <br>
            <h4>Quantity: ${meal.quantity} </h4>
            <br>
            <h4>Ordered:  ${meal.timeordered} </h4>
            <br>
            <br>
            <hr>
        </li>
            `

            $('ul.userOrders').append(template);
        
            
        });
        
    }
    
    let userid = null;

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
     };

     function userorders () {
        const user = localStorage.getItem('access_token');
        const decoded = parseJwt(user);
        userid = decoded.id
        console.log(userid);
     }
    userorders();
    /**  Loads all orders from the database using fetch
    * @public
    */
    const loadOrders = () => {
        fetch(`https://fast-food-fast-food.herokuapp.com/api/v1/orders/${userid}/orders`, {
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
                appendOrders(result.data); 
            });
           }
       }); 
    }
    loadOrders();
});