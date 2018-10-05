$(document).ready(() => {
    const Access_Key = 'access_token';
    const message = document.querySelector('.error-message');

    const errorDisplay = () => {
        if (message.style.display = 'block'){
            message.style.display = 'none';
        }
    }

    const validateForm = (email, address, phoneNumber) =>{  
        errorDisplay()
        
        if ( email || email.length > 50) {
            $('div.shopping-cart').append(`<p class='error-message'> email is not valid, please input valid address</p>`)
            return;
          } else if (!address || address.length > 100) {
            $('div.shopping-cart').append(`<p class='error-message'>address is not valid, please input valid address</p>`)
            return;
          } else if (!phoneNumber || phoneNumber.length >16) {
            $('div.shopping-cart').append(`<p class='error-message'>please number is not valid</p>`)
            return;
          } 
    }

    $('button#place-order').click((e) => {
        e.preventDefault();
        const email = $('input.email').val();
        const address = $('input.address').val();
        const number = $('input.number').val();
        const message = document.querySelector('.error-message');
        const orders = [];
        const foodList = [];
        const list = JSON.parse(localStorage.getItem("orders"));

        // validateForm(email, address, phoneNumber);
        
        const validOrder = () => {
          list.map(element => {
            if(element.foodid && element.quantity){
                const index = list.indexOf(element);
                orders.push({
                    foodid: element.foodid,
                    quantity: element.quantity
                });
                return
            }
            foodList.push(element);
          
          });
        }
      
        validOrder();
        console.log(list);
        localStorage.setItem("orders", JSON.stringify(foodList));

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
             location.href =  './../UI/index.html';
 
            });
        });
        }); 

    });


        
