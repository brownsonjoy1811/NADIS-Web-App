import Fuse from "/node_modules/fuse.js/dist/fuse.min.mjs";

// Product data as a JSON array
const initialProducts = [
    { 
        id: "1001", 
        name: "Wireless Headphones", 
        price: 79.99, 
        imageUrl: "../../images/headphones/04.png",
        description: "High-quality wireless headphones with noise cancellation." 
    },
    { 
        id: "1002", 
        name: "Speakers", 
        price: 71.9, 
        imageUrl: "../images/headphones/04.png",
        description: "High-quality wireless Speakers with extra bass." 
    },
    { 
        id: "1003", 
        name: "Charger", 
        price: 90.9, 
        imageUrl: "../../images/Laptop-Charger/1a.jpg",
        description: "High-voltage Charger for android." 
    },
    { 
        id: "1003", 
        name: "Phone", 
        price: 90.9, 
        imageUrl: "../../images/EarPod/1c.jpg",
        description: "High-voltage Charger for android." 
    },
    { 
        id: "1003", 
        name: "Samsung Charger", 
        price: 90.9, 
        imageUrl: "../../images/headphones/02a.png",
        description: "High-voltage Charger for android." 
    },
    { 
        id: "1003", 
        name: "itel Charger", 
        price: 90.9, 
        imageUrl: "../../images/Keyboard/1c.jpg",
        description: "High-voltage Charger for android." 
    },
];

let allProducts = [...initialProducts]; // Copy for filtering
let cartItems = []; // Shopping cart items

// product grid
const productsGrid = document.getElementById('product-grid');
const searchGridContainer = document.getElementById('search-grid');
const noProductsMessage = document.getElementById('empty-products');

// Search 
const searchInput = document.getElementById('searchInput');

const searchButton = document.getElementById('search-button');

// Fuzzy search code here
const options = {
    includeMatches: true,
    location: 2,
    keys: [{name: 'name', description: 'description'}],
    useExtendedSearch: true,
    threshold: 0.6,
    ignoreLocation: true,
    isCaseSensitive: false
}

const fuse = new Fuse(allProducts, options)



// Function to load cart from localStorage
const loadCartFromLocalStorage = () => {
const storedProducts = localStorage.getItem('shoppingCart');            
    if (storedProducts) {
    try {
        cartItems = JSON.parse(cartItems);
    } catch (error) {
        console.error("Error parsing stored cart from localStorage:", error);
            cartItems = []; // Reset cart if parsing fails
    }}};
    
// Function to save cart to localStorage
const saveCartToLocalStorage = () => localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
// Display Products
const displayProducts = (productsToDisplay) => {
    productsGrid.innerHTML = ''; // Clear existing products
    
    // const {name, description, price, imageUrl} = productsToDisplay

    if(productsToDisplay <= 0) noProductsMessage.innerText = `NO RESULTS FOUND FOR "${searchInput.value}"`;
    else {
    noProductsMessage.innerText = `SEARCH RESULTS FOR "${searchInput.value}"`;

    productsToDisplay.map(product => {
        const productCard = `
            <div class="product-card">
                <img src=${product.item.imageUrl} alt=${product.item.description}>
                <h3>${product.item.name}</h3>
                <p>${product.item.price}</p> 
                <button class='add-to-cart-btn'>Add to Cart</button>
            </div>`;
        productsGrid.innerHTML += productCard
    })}};
        // // code to filter products
        const filterProducts = (searchTerm) => {
            const results = fuse.search(searchTerm);
            console.log(results[0]);
            displayProducts(results )
        };
// Event for search button, when clicked , it takes the input's value and pass it as a parameter to the filteredProduct function
searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.toLowerCase();
        if(searchValue.length === 0) return
        else{
            const debounceSearchterm = () => {
                setTimeout(()=>{
                    filterProducts(searchValue);
                }, 500)}
        debounceSearchterm();}        
    });


//load cart from storae when page is loaded 
if(document.readyState === "complete") loadCartFromLocalStorage(),saveCartToLocalStorage();
else document.addEventListener('DOMContentLoaded', () => loadCartFromLocalStorage(), saveCartToLocalStorage());