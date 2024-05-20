const products = [
    {
        id: 1,
        name: "Baby Shoes",
        description: "This is high quality Shoes",
        price: 15,
        image: "https://m.media-amazon.com/images/I/81gGSALt18L._AC_UL1500_.jpg"
    },
    {
        id: 2,
        name: "Baby Shoes",
        description: "This is high quality Shoes",
        price: 10,
        image: "https://proactivebaby.com/cdn/shop/products/lovebaby-newborn-baby-shoes-with-rubber-sole-anti-slip-first-walkers-for-infant-baby-footwear-proactive-baby-38490419626226_2000x.jpg?v=1664655154"
    },
    {
        id: 3,
        name: "Braclete For Kids",
        description: "This is high quality Braclete",
        price: 7,
        image: "https://cdn.caratlane.com/media/catalog/product/U/T/UT00998-1Y0000_1_lar.jpg"
    },
];

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

function displayProducts(searchQuery = '') {
    productsSection.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const regex = new RegExp(searchQuery, 'gi');
        return product.name.match(regex) || product.description.match(regex);
    });

    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsSection.appendChild(productCard);
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

    const addButton = document.createElement("button");
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product.id));

    productCard.appendChild(image);
    productCard.appendChild(productName);
    productCard.appendChild(description);
    productCard.appendChild(price);
    productCard.appendChild(addButton);

    return productCard;
}



function handleSearch() {
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value;
    displayProducts(searchQuery);
}


window.onload = () => {
    displayProducts();
    updateCartUI();
};

let shoppingCart = [];

function addToCart(productId) {

    const productToAdd = products.find(product => product.id === productId);

    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems.push(productToAdd);

    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    updateCartUI();
}

document.addEventListener("DOMContentLoaded", function() {
    const cartImage = document.querySelector(".cartimage");
    cartImage.addEventListener("click", function() {
        window.location.href = "cart.html";
    });
});

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