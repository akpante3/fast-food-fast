$('document').ready(() =>  {
    const detail =JSON.parse(localStorage.getItem('orderDetails'));
    const price = localStorage.getItem('lastOrderPrice');
    const div = document.querySelector('.detail');

    div.innerHTML=` <br>
                    <li>
                        <h4>OrderId: ${detail.orderID} </h4>
                        <br>
                        <h4>Ordered:  ${detail.timeOrdered} </h4>
                        <br>
                        <h4>Total Price:  ${price} </h4>
                        <br>
                        <hr>
                    </li>`

});