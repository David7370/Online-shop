const products = [
    {
        id: 1,
        name: "Silver Chain",
        description: "This is drippy silver chain",
        price: 10,
        image: "https://silvadore.co.uk/cdn/shop/products/silvadore-ssmc-chains-18-velvet-pouch-9mm-flat-curb-mens-necklace-silver-chain-stainless-steel-jewellery-07-4913802510409_5000x.jpg?v=1575945267"
    },
    {
        id: 2,
        name: "Golden Chain",
        description: "This is good looking golden chain",
        price: 20,
        image: "https://www.peoplesjewellers.com/productimages/processed/V-20173938_0_800.jpg"
    },
    {
        id: 3,
        name: "Diamond Chain",
        description: "This is high quality diamond chain",
        price: 35,
        image: "https://m.media-amazon.com/images/I/71h7Nr4RZcL._AC_UY1000_.jpg"
    },
    {
        id: 4,
        name: "Silver Necklace",
        description: "This is Silver Heart Shaped Necklace",
        price: 20,
        image: "https://nz.pandora.net/dw/image/v2/BKNF_PRD/on/demandware.static/-/Sites-pandora-master-catalog/default/dw3859f953/productimages/singlepackshot/393014C01_RGB.jpg?sw=900&sh=900&sm=fit&sfrm=png&bgcolor=F5F5F5"
    },
    {
        id: 5,
        name: "Gold Necklace",
        description: "This is Heart Shaped Golden Necklace",
        price: 40,
        image: "https://www.missoma.com/cdn/shop/products/ridge-heart-charm-necklace-18ct-gold-plated-necklaces-missoma-592969.jpg?v=1694770073"
    },
    {
        id: 6,
        name: "Handmade",
        description: "This is Unique Hand Made Necklace",
        price: 35,
        image: "https://target.scene7.com/is/image/Target/GUEST_1e9f6d8a-97ab-4c25-84ad-95556e7cd496?wid=488&hei=488&fmt=pjpeg"
    },
    {
        id: 7,
        name: "Golden Braclet",
        description: "This is high quality Braclet",
        price: 25,
        image: "https://brookandyork.com/cdn/shop/files/BYB1236G_APR.jpg?v=1694529534&width=1080"
    },    {
        id: 8,
        name: "Black Braclet",
        description: "This is high quality good looking Braclet",
        price: 15,
        image: "https://cdn.myka.com/digital-asset/product/leo-personalized-lava-bracelet-for-men-in-sterling-silver-1.jpg"
    },    {
        id: 9,
        name: "Silver Braclet",
        description: "This is high quality Silver Braclet",
        price: 10,
        image: "https://ringconcierge.com/cdn/shop/products/ring-concierge-bracelets-14k-white-gold-eternity-mini-diamond-tennis-bracelet-30076806791256_1024x1024.jpg?v=1668020802"
    },
    {
        id: 10,
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