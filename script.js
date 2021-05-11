

$( ".cta" ).ready(function() {
    $( ".transition").toggleClass( "anim-trans");
  });
  
// Code for Password Validation

function validate(){
    //access the value inside text box with id="staffPass"
     var staffInput = document.getElementById('staffPass').value;

     // REGEX password validation following specifications
     var regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!-\/:-@\[-`{-~]).{8,}$/;


    //Showing valid/invalid feedback after password input
     if (regx.test(staffInput)){
       document.getElementById('Valid').style.visibility = "visible";
       document.getElementById('inValid').style.visibility = "hidden";
     }
     else {
        document.getElementById('inValid').style.visibility = "visible";
        document.getElementById('Valid').style.visibility = "hidden";
     }
  }


  //Getting Random Users from API

  // Getting button
document.getElementById('user-button').addEventListener('click', getData);

function getData() {

    // Fetching API
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(data => {

            let author = data.results;

            // Getting data value
            let output = "<br>";

            // Getting random users data to fill out Name, picture, telephone, email & location 
            author.forEach(function (lists) {
                output += `
                <div class="container">
                    <div class="card mt-4">
                        <ul class="list-group">
                            <li class="list-group-item"><center><h3>Name: ${lists.name.first} ${lists.name.last}</h3></center></li>
                            <li class="list-group-item"><center><img src="${lists.picture.large}"></center></li>
                            <li class="list-group-item">Phone Number: ${lists.cell}</li>
                            <li class="list-group-item">Email: ${lists.email}</li>
                            <li class="list-group-item">Address: ${lists.location.city}, ${lists.location.country} | Post Code: ${lists.location.postcode}</li>
                        </ul>
                    </div>
                </div> `;
            });

            // Show all data received in the HTML element
            document.getElementById('output').innerHTML = output;

        });
};




  //Here starts the code for the Shopping Cart


  //adding event listener to get function started
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

//button to remove items
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('€', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '€' + total;
}