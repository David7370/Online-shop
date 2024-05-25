const productsSection = document.getElementById("products");

function displayProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const image = document.createElement("img");
        image.src = product.image;

        const productName = document.createElement("h2");
        productName.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("p");
        price.textContent = `$${product.price}`;

        const addButton = document.createElement("button");
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", () => addToCart(product.id));

        productCard.appendChild(image);
        productCard.appendChild(productName);
        productCard.appendChild(description);
        productCard.appendChild(price);
        productCard.appendChild(addButton);

        productsSection.appendChild(productCard);

        return productCard;
    });
}


function createProductCard(product) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image;

    const productName = document.createElement("h2");
    productName.textContent = product.name;

    const description = document.createElement("p");
    description.textContent = product.description;

    const price = document.createElement("p");
    price.textContent = `$${product.price}`;

    const ratingContainer = document.createElement("div");
    ratingContainer.classList.add("rating-container");

    for (let i = 1; i <= 5; i++) {
        const starIcon = document.createElement("span");
        starIcon.classList.add("star");
        starIcon.textContent = "★"; 
        starIcon.dataset.ratingValue = i;
        starIcon.addEventListener("click", () => rateProduct(product.id, i));
        ratingContainer.appendChild(starIcon);
    }

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product.id));

    productCard.appendChild(image);
    productCard.appendChild(productName);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(ratingContainer);
    productCard.appendChild(addButton);

    return productCard;
}


function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value.trim().toLowerCase(); 
    const priceRangeInput = document.getElementById("priceRange");
    const selectedPrice = parseInt(priceRangeInput.value);
    displayProducts(searchQuery, selectedPrice);
}

function displayProducts(searchQuery = '', maxPrice = Infinity) {
    productsSection.innerHTML = '';

    const filteredProducts = products.filter(product => {
        
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const withinPriceRange = product.price <= maxPrice;
        return matchesSearch && withinPriceRange;
    });

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsSection.appendChild(productCard);
    });
}

document.getElementById("searchInput").addEventListener("input", handleSearch);

let shoppingCart = [];

function addToCart(productId) {

    const productToAdd = products.find(product => product.id === productId);

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems.push(productToAdd);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    updateCartUI();
}

function handlePriceRangeChange() {
    const priceRangeInput = document.getElementById("priceRange");
    const priceDisplay = document.getElementById("priceDisplay");
    const selectedPrice = parseInt(priceRangeInput.value);
    priceDisplay.textContent = `Price Range: $0 - $${selectedPrice}`;

    displayProductsByPrice(selectedPrice);
}

function displayProductsByPrice(maxPrice) {
    productsSection.innerHTML = '';

    const filteredProducts = products.filter(product => product.price <= maxPrice);

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsSection.appendChild(productCard);
    });
}

function rateProduct(productId, rating) {
    const product = products.find(product => product.id === productId);
    if (product) {
        console.log(`Rated product '${product.name}' (ID: ${productId}) with rating ${rating}`);
    } else {
        console.log(`Product with ID ${productId} not found.`);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const cartImage = document.querySelector(".cartimage");
    cartImage.addEventListener("click", function() {
        window.location.href = "cart.html"; 
    });
});

const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartSection = document.getElementById("cart");
    cartSection.innerHTML = "";

    cartItems.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const productName = document.createElement("span");
        productName.textContent = item.name;

        const price = document.createElement("span");
        price.textContent = `$${item.price}`;

        cartItem.appendChild(productName);
        cartItem.appendChild(document.createTextNode(" - "));
        cartItem.appendChild(price);

        cartSection.appendChild(cartItem);
    });
}

function setMaxPriceRange() {
    console.log("setMaxPriceRange function called");
    const maxPrice = Math.max(...products.map(product => product.price));
    console.log("Max price:", maxPrice);
    const priceRangeInput = document.getElementById("priceRange");
    priceRangeInput.max = maxPrice;
    console.log("Price range input max value set to:", priceRangeInput.max);
    priceRangeInput.value = maxPrice; 
    handlePriceRangeChange(); 
}

window.onload = () => {
    displayProducts();
    
    setMaxPriceRange();
};