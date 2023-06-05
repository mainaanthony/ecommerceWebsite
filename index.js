const products_container = document.getElementById("products")
//  const productInfoContainer = document.getElementById("product-info");
const cart = document.getElementById("cartCount")
//lets initialize the card count
let cartCount = 0;



///we now fetch the products we will display in the carts
function displayCart(){
     let cartCountElement = document.getElementById("cartCount")
     let cartTotalElement = document.getElementById('cartTotal');
     let cartContainer = document.getElementById("cart")


         cartContainer.innerHTML = " ";

//using the local storage 

     let cartItems = JSON.parse(localStorage.getItem("cart"))   || [];

     // update the cart count


     cartCount = cartItems.length;

     if (cartCountElement)    {
      cartCountElement.innerHTML = `<i class="fas fa-cart-arrow-down"></i> Cart (${cartCount})`

     }


     //now lets display the cart items
     
     cartItems.forEach(item =>{
      let cartItemElement = document.createElement("div")
      cartItemElement.className = "cart-item"
      cartItemElement.innerHTML = `
           <img src="${item.image}"/>
           <h7>${item.title}</h7>
           <p>${item.price}</p>
           <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
           <p>Total: ${item.price * item.quantity}$</p>
           <button class="delete-button" onClick="deleteFromCart(${item.id})">Delete </button>
      `

         cartContainer.appendChild(cartItemElement)


     });
     

     
     let cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
     cartTotalElement.innerText = `Total: ${cartTotal}$`;



}



//now we add each product called to the cart per ID

    async function addToCart(Id){

         try{

              let response = await fetch(`https://fakestoreapi.com/products/${Id}`)
              let product =  await response.json();


              //now lets fetch the items in the carts from the local storage

              let cartItems = JSON.parse(localStorage.getItem("cart"))  || []
              
              //let's check if the product exists
              //remember I added the check quantity feature
              let index_of_Item = cartItems.findIndex(item=>item.id ===Id)//check the comparison later
    


    if(index_of_Item>=0){
        cartItems[index_of_Item].quantity += 1
    }else

    {

        let  new_product = {...product}
        new_product.quantity = 1;           //also check due to the spread method
        cartItems.push(new_product);


       localStorage.setItem("cart", JSON.stringify(cartItems))


       //lets update the cart count 
          cartCount++
          document.getElementById("cartCount").innerText = `Cart (${cartCount})`



          //display the updated cart
          displayCart()


    }






              




         }catch(error){
                console.log("error adding product to cart", error)

         }


    }


    // Delete product from cart
function deleteFromCart(Id) {
  // Fetch cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Find index of product in cart
  const productIndex = cartItems.findIndex(item => item.id === Id);

  if (productIndex !== -1) {
      // Remove product from cart
      cartItems.splice(productIndex, 1);

      // Save updated cart items to local storage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Update cart count
      cartCount = cartItems.length;
      let cartCountElement = document.getElementById("cartCount");
      if (cartCountElement) {
          cartCountElement.innerHTML = `<i class="fas fa-cart-arrow-down"></i> Cart (${cartCount})`;
      }


      // Display updated cart
      displayCart();
  }
}

// Toggle cart visibility
function toggleCart() {
  const cartContainer = document.getElementById('cartContainer');
  const cartCountElement = document.getElementById('cartCount');
  if (cartContainer.style.display === 'none') {
      cartContainer.style.display = 'block';
      cartCountElement.style.display = 'none';
  } else {
      cartContainer.style.display = 'none';
      cartCountElement.style.display = 'block';
  }
}


displayCart(); // Display initial cart items

// const local = localStorage.getItem("cart_items")
// console.log(local)
// //create an array for the carts items
// const cart_items =  JSON.parse(local);


//       //update cart counter
//       function updateCartCounter(){
//           return cart.innerText = cart_items.length;
//       }

//       //update cart items



// const updateCart = (product)=>{
     
//     let index_of_Item = cart_items.findIndex(cart_item=>cart_item.id)
    


//     if(index_of_Item>=0){
//         cart_items[index_of_Item].quantity += 1
//     }else

//     {

//         let  new_product = {...product}
//         new_product.quantity = 1;
//         cart_items.push(new_product);

//     }

//     let stuff =localStorage.setItem("cart_items", JSON.stringify(cart_items))
//     console.log(stuff);
//     updateCartCounter();
// }






//creating all the products

function createProductCards(product){

  const img = document.createElement("img");
  img.setAttribute("src", product.image)
  
const title_product = document.createElement("h4");
title_product.innerText = product.title;



const category = document.createElement("span");
category.innerText = product.category;
const price = document.createElement("p");
price.innerHTML = `Price: <span>$${product.price}</span>`;


const button = document.createElement("button")



const product_card = document.createElement("div");
product_card.classList.add("product");
 product_card.addEventListener("click", () => handleProductClick(product));


product_card.append(img, title_product, category, price, button);

return product_card

}


// Update quantity for cart item
function updateQuantity(productId, quantity) {
  // Fetch cart items from local storage
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Find the cart item
  const cartItem = cartItems.find(item => item.id === productId);
  if (cartItem) {
      // Update the quantity
      cartItem.quantity = parseInt(quantity);

      // Save updated cart items to local storage
      localStorage.setItem('cart', JSON.stringify(cartItems));

      // Display updated cart
      displayCart();
  }
}




async function getProducts(){
try{
  let res = await fetch('https://fakestoreapi.com/products')
  let results = await res.json()
  return results;
 
}catch(error){
  console.log(error);
}

}




async function mountProducts(){
   let products = await getProducts()
    if(products && products.length > 0){
       let product_cards = products.map(product=>createProductCards(product))
       products_container.append(...product_cards)
       

    }else{
      const errorElement = document.createElement("h4")
      errorElement.innerText = "Something went wrong with the products";
      errorElement.style.color = "red"
      products_container.appendChild(errorElement)


    }

}

mountProducts()


const menuIcon = document.getElementById("menu-icon")


const listItems = document.querySelector(".list")

listItems.style.maxHeight = "0px"

function menuToggle() {
        if(listItems.style.maxHeight === "0px"){

           listItems.style.maxHeight = "200px"

        }else{

           listItems.style.maxHeight = "0px"

        }



}



//carts

// function handleAddToCart(product){
//    updateCart(product)


// }

// export { updateCart, updateCartCounter }










//filter products by category



// Function to fetch products by category from the API
async function getProductsByCategory(category) {
  try {
    let res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    let results = await res.json();
    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Function to clear existing products
function clearProducts() {
  products_container.innerHTML = "";
}

// Function to handle category filter
async function handleCategoryFilter(category) {
  try {
    clearProducts();

    if (category === "all") {
      // Fetch all products if category is "all"
      let products = await getProducts();
      
      let product_cards = products.map((product) => createProductCards(product));
      products_container.append(...product_cards);
    } else {
      // Fetch products by category
      let products = await getProductsByCategory(category);
      let product_cards = products.map((product) => createProductCards(product));
      products_container.append(...product_cards);
    }
  } catch (error) {
    const errorElement = document.createElement("h4");
    errorElement.innerText = "Something went wrong with the products";
    errorElement.style.color = "red";
    products_container.appendChild(errorElement);
  }
}

// Function to add event listeners to category links
function addCategoryEventListeners() {
  const categoryLinks = document.querySelectorAll(".nav-bar .list a");
  categoryLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      categoryLinks.forEach((link) => {
        link.classList.remove("active");
      });

      link.classList.add("active");

      const category = link.innerText.toLowerCase();
      handleCategoryFilter(category);
    });
  });
}


// Function to mount products
async function mountProducts() {
  addCategoryEventListeners();
  await handleCategoryFilter("all");
}

mountProducts();



//show information about a specific product


// Function to create detailed product information
function createDetailedProductInfo(product) {
  

  


  const title = document.createElement("h5");
  title.innerHTML = product.title;
  

  const image = document.createElement("img");
  image.setAttribute("src", product.image);

  const price = document.createElement("p2");
  price.innerHTML = `Price: $${product.price}`;

  const description = document.createElement("p3");
  description.innerText = product.description;
  

  const buttonsWrapper = document.createElement("div"); // Create the buttons wrapper div
  buttonsWrapper.classList.add("buttons-wrapper"); // Add the desired class to the wrapper div

  const detailedInfo = document.createElement("div");
  detailedInfo.classList.add("detailed-info");

  //please note the changes here
  const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";
// addToCartBtn.addEventListener("click", () => {
//   handleAddToCart(product);
// });




addToCartBtn.onclick = () => {
  const Id = product.id; // Retrieve the product id
  addToCart(Id); // Call the addToCart function with the id parameter
  console.log(Id); // Output the product id to the console
};



  
  // const removeFromCartBtn = document.createElement("button");
  // removeFromCartBtn.innerText = "Remove from Cart";
  // removeFromCartBtn.addEventListener("click", () => {
  //   removeFromCart(product);
  // });

  buttonsWrapper.append(addToCartBtn); // Append buttons to the wrapper div
  

  detailedInfo.append(title, image, price, description,buttonsWrapper);

  return detailedInfo;
  
}



// Function to handle product click and display detailed information
function handleProductClick(product) {
  const productInfoContainer = document.getElementById("products");
  productInfoContainer.innerHTML = "";
  
  

  let detailedProductInfo = createDetailedProductInfo(product);
  productInfoContainer.appendChild(detailedProductInfo);

  
}





// // // Function to create product cards
// // function createProductCards(product) {
// //   const img = document.createElement("img");
// //   img.setAttribute("src", product.image);

// //   const title_product = document.createElement("h4");
// //   title_product.innerText = product.title;

// //   const category = document.createElement("span");
// //   category.innerText = product.category;

// //   const price = document.createElement("p");
// //   price.innerHTML = `Price: <span>$${product.price}</span>`;

// //   const product_card = document.createElement("div");
// //   product_card.classList.add("product");
// //   product_card.addEventListener("click", () => handleProductClick(product));

// //   product_card.append(img, title_product, category, price);

// //   return product_card;
// // }

// // ...




//dealing with carts
// Initialize cart items count
// let cartItemsCount = 0;

// // Function to update the cart items count
// function updateCartItemsCount(count) {
//   const cartCountElement = document.getElementById("cart-count");
//   cartCountElement.innerText = count;
// }

// // Function to fetch cart items from the API
// async function getCartItems() {
//   try {
//     const response = await fetch("https://fakestoreapi.com/carts/5");
//     const data = await response.json();
//     return data.products;
    
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// console.log(getCartItems())



// // Function to add a product to the cart
// async function addToCart(product) {
//   try {
//     await fetch("https://fakestoreapi.com/carts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         productId: product.id,
//         quantity: 1,
//       }),
//     });

//     // Increase the cart items count
//     cartItemsCount++;
//     updateCartItemsCount(cartItemsCount);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// // Function to remove a product from the cart
// async function removeFromCart(product) {
//   try {
//     await fetch(`https://fakestoreapi.com/carts${product.id}`, {
//       method: "DELETE",
//     });

//     // Decrease the cart items count
//     cartItemsCount--;
//     updateCartItemsCount(cartItemsCount);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

// // Function to create the cart product cards
// function createCartProductCards(products) {
//   const cartProductsContainer = document.querySelector(".products");
//   cartProductsContainer.innerHTML = "";

//   if (products && products.length > 0) {
//     products.forEach((product) => {
//       const cartProductCard = document.createElement("div");
//       cartProductCard.classList.add("cart_product");

//       const image = document.createElement("img");
//       image.src = product.image;
//       image.alt = product.title;

//       const title = document.createElement("h8");
//       title.innerText = product.title;

//       const price = document.createElement("p");
//       price.innerHTML = `Price: <span>$${product.price}</span>`;

//       cartProductCard.append(image, title, price);
//       cartProductsContainer.appendChild(cartProductCard);
//     });
//   } else {
//     const emptyCartMessage = document.createElement("p");
//     emptyCartMessage.innerText = "Your cart is empty.";
//     cartProductsContainer.appendChild(emptyCartMessage);
//   }
// }

// // Function to display the cart products
// async function displayCartProducts() {
//   try {
//     const cartItems = await getCartItems();
//     createCartProductCards(cartItems);
//   } catch (error) {
//     console.log(error);
//   }
// }

// const cartProductsContainer = document.getElementById(".cart_products");

// // Function to handle the cart icon click event
// function handleCartIconClick() {
  

//     displayCartProducts();
// //   if (cartProductsContainer.style.display === "none") {
// //     cartProductsContainer.style.display = "block";
// //     displayCartProducts();
// //   } else {
// //     cartProductsContainer.style.display = "none";
// //   }

// }

// Add event listener to the cart icon
// const cartIcon = document.querySelector(".details .cart");
// cartIcon.addEventListener("click", handleCartIconClick);





///adding to cart emmanuel's way
// const menuItems = document.getElementById("menu-items");
// const cart = document.getElementById("cart");
// const cartItems = document.getElementById("cart-items");
// const cartTotal = document.getElementById("total-amount");
// const categorySelect = document.getElementById("categorySelect");

// menuItems.style.maxHeight = "0px";
// cart.classList.add("hidden");

// function menutoggle() {
//     if (menuItems.style.maxHeight === "0px") {
//         menuItems.style.maxHeight = "200px";
//     } else {
//         menuItems.style.maxHeight = "0px";
//     }
// }

// function toggleCart() {
//     cart.classList.toggle("hidden");
// }

// let cartData = [];

// document.addEventListener("DOMContentLoaded", function () {
//     const productsContainer = document.querySelector(".products");

//     async function fetchProducts(url) {
//         try {
//             const response = await fetch(url);
//             const products = await response.json();
//             displayProducts(products);
//             populateCategories(products);
//         } catch (err) {
//             console.log(err);
//         }
//     }

//     function displayProducts(products) {
//         productsContainer.innerHTML = "";
//         if (products.length === 0) {
//             productsContainer.innerHTML = "<p>No products found.</p>";
//             return;
//         }
//         for (const product of products) {
//             const { id, title, category, price, description, image } = product;
//             productsContainer.innerHTML += `
//                 <div class="product">
//                     <img src="${image}" alt="" class="product-image">
//                     <div class="product-details">
//                         <h2 class="product-title">${title}</h2>
//                         <p class="product-category">${category}</p>
//                         <p class="product-description">${description}</p>
//                         <div class="product-price-counter">
//                             <h3 class="product-price">Ksh.${price}</h3>
//                             <button class="add-to-cart" onclick="addToCart(${id}, ${price})">Add to Cart</button>
//                         </div>
//                     </div>
//                 </div>
//             `;
//         }
//     }

//     function populateCategories(products) {
//         const categories = new Set();
//         for (const product of products) {
//             categories.add(product.category);
//         }
//         const categoryOptions = Array.from(categories);
//         categoryOptions.sort();
//         for (const category of categoryOptions) {
//             categorySelect.innerHTML += `<option value="${category}">${category}</option>`;
//         }
//     }

//     categorySelect.addEventListener("change", function () {
//         const selectedCategory = categorySelect.value;
//         if (selectedCategory === "") {
//             fetchProducts("https://fakestoreapi.com/products");
//         } else {
//             const url = `https://fakestoreapi.com/products/category/${selectedCategory}`;
//             fetchProducts(url);
//         }
//     });

//     fetchProducts("https://fakestoreapi.com/products");
// });

// function addToCart(id, price) {
//     const cartItem = {
//         id,
//         price,
//     };
//     cartData.push(cartItem);
//     updateCart();
// }

// function removeFromCart(index) {
//     cartData.splice(index, 1);
//     updateCart();
// }

// function updateCart() {
//     cartItems.innerHTML = "";
//     let total = 0;
//     for (let i = 0; i < cartData.length; i++) {
//         const { id, price } = cartData[i];
//         const cartItem = document.createElement("li");
//         cartItem.classList.add("cart-item");
//         cartItem.innerHTML = `
//             <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" alt="Product Image">
//             <div>
//                 <h4 class="cart-item-title">Product Title</h4>
//                 <p class="cart-item-price">Ksh.${price}</p>
//             </div>
//             <button onclick="removeFromCart(${i})">Remove</button>
//         `;
//         cartItems.appendChild(cartItem);
//         total += price;
//     }
//     cartTotal.textContent = total;
// }