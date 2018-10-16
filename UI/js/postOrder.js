$(document).ready(() => {
    const Access_Key = 'access_token';
    const message = document.querySelector('.error-message');

    const errorDisplay = () => {
        if (message.style.display = 'block'){
            message.style.display = 'none';
        }
    }
    /**  POST new  food
     * @param {string} email
     * @param {string} address
     * @param {string} phoneNumber
     * @return {string} error message 
     * @public
    */
    const validateForm = (email, address, phoneNumber) =>{  
        errorDisplay()
        
        if ( !email || email.length > 50) {
            errorDisplay();
            message.style.display = 'block'
            message.innerHTML = 'Email is invalid, please input a valid email';
            return;
          } else if (!address || address.length > 100) {
            errorDisplay();
            message.style.display = 'block'
            message.innerHTML = 'Email is invalid, please input a valid email';
            return;
          } else if (!phoneNumber || phoneNumber.length >16) {
            errorDisplay();
            message.style.display = 'block'
            message.innerHTML = 'Email is invalid, please input a valid email';
            return;
          } 
    }
    /** click event to fetch the'post an order' Api endpoint
     *  @param {object} e 
     * @public
    */
    $('button#place-order').click((e) => {
        e.preventDefault();
        const email = $('input.email').val();
        const address = $('input.address').val();
        const number = $('input.number').val();
        const message = document.querySelector('.error-message');
        const list = JSON.parse(localStorage.getItem("orders"));
        const orders = [];
        const foodList = [];
        let price = null;
        

        // validateForm(email, address, number);
        
        const validOrder = () => {
          list.map(element => {
            if(element.foodid && element.quantity){
                const index = list.indexOf(element);
                orders.push({
                    foodid: element.foodid,
                    quantity: element.quantity
                });
                price += parseInt(element.price) * parseInt(element.quantity);
                return
            }
            foodList.push(element);
          
          });
        }
      
        validOrder();

        fetch('https://fast-food-fast-food.herokuapp.com/api/v1/orders', {
             method : 'post',
             body : JSON.stringify({email, address, number, orders}),
             headers : {
                 'Accept' : 'application/json',
                 'Content-Type':'application/json',
                 accessToken : window.localStorage.getItem('access_token')
             }
        })
        .then(res => {
            res.json().then(data => {
             if (data.status === 'failure'){
                 errorDisplay()
                 message.style.display = 'block'
                 message.innerHTML = data.message;
                 return 
             }
             localStorage.setItem("lastOrderPrice", JSON.stringify(price));
             localStorage.setItem("orderDetails", JSON.stringify(data.data));
             localStorage.setItem("orders", JSON.stringify(foodList));
             location.href =  './successpage.html';
 
            });
        });
        }); 

    });


        
