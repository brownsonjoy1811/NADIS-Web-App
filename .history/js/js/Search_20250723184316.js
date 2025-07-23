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
const noProductsMessage = document.getElementById('empty-products');

// Search 
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');

        // Function to load cart from localStorage
        const loadCartFromLocalStorage = () => {
            const storedProducts = localStorage.getItem('shoppingCart');
            
            if (storedProducts) {
                try {
                    cartItems = JSON.parse(cartItems);
                } catch (e) {
                    console.error("Error parsing stored cart from localStorage:", e);
                    cartItems = []; // Reset cart if parsing fails
                }
            }
        };

        // Function to save cart to localStorage
        const saveCartToLocalStorage = () => {
            localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
        };

        // Display Products
        const displayProducts = (productsToDisplay) => {
            productsGrid.innerHTML = ''; // Clear existing products

            // check for availability of products
            if (productsToDisplay.length === 0) {
                // noProductsMessage.classList.remove('hidden');
                noProductsMessage.textContent = `SEARCH RESULTS FOR '${searchInput.value}' is not found`
            } 
            else {
                noProductsMessage.classList.add('hidden');

                productsToDisplay.map(product => {
                   const productCard = `
                    <div class="product-card">
                        <img src=${product.imageUrl} alt=${product.description}>
                        <h3>${product.name.length > 10 ? product.name.slice(0, 12) + '...' : product.name}</h3>
                        <p>${product.price}</p>
                        <button class='add-to-cart-btn'>Add to Cart</button>
                    </div>            
                `;
                productsGrid.innerHTML += productCard;

                });
            }
        };

        // code to filter products
        const filterProducts = (searchTerm) => {
            const filteredproduct = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
            // We are calling displayProducts so that we can pass in th parameter to the function: "filteredproduct"
            displayProducts(filteredproduct);
        };


        // Event for search button, when clicked , it takes the input's value and pass it as a parameter to the filteredProduct function
        searchButton.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            filterProducts(searchTerm);

            const debounceSearchterm = () => {
                setTimeout(()=>{
                    return filterProducts(searchTerm);
                    }, 500)
                }
            debounceSearchterm();

        });

        // Event for input element 
        searchInput.addEventListener('change', (event) => {
            if (event.key === 'Enter' || event.key !== "Enter") {
                const searchTerm = searchInput.value.toLowerCase().trim();

                // Delay our function "filteredproducts" to avoid search per input
                const debounceSearchterm = () => {
                    setTimeout(()=>{
                        return filterProducts(searchTerm);
                    }, 500)
                }
                debounceSearchterm()
            }
        });

        
    const initializeStore = () => {
        
        loadCartFromLocalStorage(); // Load cart when store initializes

    };

// call initializestore when the browser loads
window.addEventListener('DOMContentLoaded', initializeStore)