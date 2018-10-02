$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const appendMenu = (menu) => {

        menu.forEach(meal => {
            const template =`<div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymeOAHIZOShcIgKfAXzn04bASkye0gr2Sqmscl_hKrfaqwVdp" alt="food"><p> ${meal.food}  </p>
            <br>
            <p>Price: ${meal.price}</p>
            <br>
            <a>
             <button class="add-cart" onclick="addCart(this)"><i class="fas fa-shopping-cart fa-1x"></i>  add to cart</button>
            </a>
        </div>`
            $('div.content').append(template);
        });
        
    }
    const loadQuestion = () => {
        fetch('http://localhost:8000/api/v1/menu', {
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

    loadQuestion();  
})