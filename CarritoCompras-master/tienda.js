const addToShoppingCartButtons = document.querySelectorAll('.addToCart'); // 1 - done
addToShoppingCartButtons.forEach((addToCartButton) => {
    addToCartButton.addEventListener('click', addToCartClicked);
}); //

const comprarButton = document.querySelector('.comprarButton');
//comprarButton.addEventListener('click', comprarButtonCliked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer'); // 2 - done

function addToCartClicked(event){ // 1 - done
    const button = event.target;
    console.log(button)
    const item = button.closest('.item');
    //const item = document.querySelector('.item')
    console.log(item)

    const itemTitle = item.querySelector('.item-title').textContent;
    const itemPrice = item.querySelector('.item-price').textContent;
    const itemImage = item.querySelector('.item-image').src;


    addItemToShoppingCart(itemTitle, itemPrice, itemImage);
} //

function addItemToShoppingCart(itemTitle,itemPrice, itemImage){ // 2 - done

    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle'); // 6 - done
    for(let i = 0; i < elementsTitle.length; i++){
        if(elementsTitle[i].innerText === itemTitle){
            let elementQuantity = elementsTitle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
            elementQuantity.value++;
            //$('.toast').toast('show');
            updateShoppingCartTotal();
            return;
        }
    } // 6 - done

    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
                    <div class="col-6">
                        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <img src=${itemImage} class="shopping-cart-image">
                            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}
                            </h6>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
                        </div>
                    </div>
                    <div class="col-4">
                        <div
                            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                                value="1">
                            <button class="btn btn-danger buttonDelete" type="button">X</button>
                        </div>
                    </div>
                </div>
    `;
    shoppingCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shoppingCartRow);
    //console.log(shoppingCartItemsContainer)
    shoppingCartRow.querySelector('.buttonDelete').addEventListener('click', removeShoppingCartItem); // 4 - done

    shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged); // 5 -

    updateShoppingCartTotal();
} // 2 -

function updateShoppingCartTotal(){ // 3 - done
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
    
    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');
    
    shoppingCartItems.forEach((shoppingCartItem) =>{
        const shoppingCartItemPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');
        const shoppingCartItemPrice = Number(shoppingCartItemPriceElement.textContent.replace('€',''));
        console.log(shoppingCartItemPrice)
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    shoppingCartTotal.innerHTML = `${total.toFixed(2)}€`;

} // 3 - done

function removeShoppingCartItem(event){ // 4 - done
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}

function quantityChanged(event){ // 5 - done
    const input = event.target;
    //if(input.value <= 0){
      //  input.value = 1;
    //}
    input.value <= 0 ? input.value = 1 : null;
    updateShoppingCartTotal();
}

/*
function comprarButtonCliked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
*/