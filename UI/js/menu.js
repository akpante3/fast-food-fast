$('document').ready(() =>  {
    const Access_Key = 'access_token';
    const message = document.querySelector('.error-message');

    const errorDisplay = () => {
        if (message.style.display = 'block'){
            message.style.display = 'none';
        }
    }

    $('button.postbtn').click((e) => {
       e.preventDefault();
       const food =$('input.food').val();
       const price = $('input.price').val();

       const token = window.localStorage.getItem(Access_Key);
       fetch('http://localhost:8000/api/v1/menu', {
            method : 'post',
            body : JSON.stringify({food, price }),
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
                message.style.display = 'block'
                return message.innerHTML = data.message;
            }
            location.href =  './../UI/index.html';

           });
       }); 
    });
})