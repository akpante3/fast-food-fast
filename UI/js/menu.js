$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const message = document.querySelector('.error-message');

    const errorDisplay = () => {
        if (message.style.display = 'block'){
            message.style.display = 'none';
        }
        message.style.display = 'block'
    }
    /** on button click POST new food on the app
     *  @param {object} e
     * @public
    */
    $('button.postbtn').click((e) => {
       e.preventDefault();
       const food =$('input.food').val();
       const price = $('input.price').val();
       const image = localStorage.getItem('imageurl');
       console.log(image);

       const token = window.localStorage.getItem(Access_Key);
       fetch('https://fast-food-fast-food.herokuapp.com/api/v1/menu', {
            method : 'post',
            body : JSON.stringify({food, price, image}),
            headers : {
                'Accept' : 'application/json',
                'Content-Type':'application/json',
                accessToken : window.localStorage.getItem(Access_Key)
            }
       })
       .then(res => {
           res.json().then(data => {
            if (data.status === 'failure'){
                errorDisplay()
                message.innerHTML = data.message;
                return 
            }
            location.href =  './index.html';

           });
       }); 
    });
})