const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartSection = document.getElementById("cart");
    cartSection.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productImage = document.createElement("img");
        productImage.src = item.image;
        productImage.alt = item.name;

        const productName = document.createElement("span");
        productName.textContent = item.name;

        const price = document.createElement("span");
        price.textContent = `$${item.price}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(item.id));

        cartItem.appendChild(productImage);
        cartItem.appendChild(document.createElement("br")); 
        cartItem.appendChild(productName);
        cartItem.appendChild(document.createTextNode(" - "));
        cartItem.appendChild(price);
        cartItem.appendChild(removeButton);

        cartSection.appendChild(cartItem);
    });
}

function removeFromCart(productId) {
    const index = cartItems.findIndex(item => item.id === productId);
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cartItems));
        displayCartItems();
    }
}

window.onload = () => {
    displayCartItems();
};