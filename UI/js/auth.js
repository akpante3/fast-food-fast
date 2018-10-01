$(document).ready(() => {
    const message = document.querySelector('.error-message');

    const errorDisplay = () => {
        if (message.style.display = 'block'){
            message.style.display = 'none';
        }
    }

    const validateSignup = (email, password, address, username) =>{  
        const userName = /^[a-zA-Z0-9- ,_]*$/.test(username); 

        errorDisplay()
        
        if (!validateEmail(email) || email.length > 50) {
            $('form.sign-container').append(`<p class='error-message'>please input a valid email</p>`)
            message.innerHTML= 'invalid email please input a valid email';
            message.style.display = 'block'
            return;
          } else if (!address || address.length > 100) {
            $('form.sign-container').append(`<p class='error-message'>please address is not valid, please input valid address</p>`)
            return;
          } else if (!password || password.length >50) {
            $('form.sign-container').append(`<p class='error-message'>please passwrod is not valid</p>`)
            return;
          } else if (!username || username.length >50 || userName === false) {
            $('form.sign-container').append(`<p class='error-message'>please passwrod is not valid</p>`)
            return;
          }
    }


        const Access_Key = 'access_token'
        console.log(window.localStorage.getItem(Access_Key))
       
        const setAccessToken = (token) => {
            if(window.localStorage.getItem(Access_Key) === null){
                window.localStorage.setItem(Access_Key, token);
                return;
            }
            localStorage.removeItem(Access_Key);
            window.localStorage.setItem(Access_Key, token);
        }

        const validateEmail = (email) => {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
          };    
    
        $('button.signupbtn').click((e) => {
            e.preventDefault();
            const email = $('input.email').val();
            const password = $('input.password').val();
            const address = $('input.address').val();
            const username = $('input.username').val();

            validateSignup(email, password, address, username);

    
            fetch('http://localhost:8000/api/v1/auth/signup', {
                method : 'post',
                body : JSON.stringify({email, password, username, address}),
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type':'application/json'
                }
    
            }).then(res => {
                res.json().then(data => {
                    if (data.status === 'failure'){
                        errorDisplay()
                        message.style.display = 'block'
                        return message.innerHTML = data.message;
                    }     
                    const token = data.data.token;
                    setAccessToken(token);
                    location.href =  './../UI/index.html';
                });
                
            }).catch((error) => {
                console.log(error);
            });
        });
        
});