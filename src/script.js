document.addEventListener("DOMContentLoaded", () => {
  const products = [
    { id: 1, name: "Sunslik", price: 399.99 },
    { id: 2, name: "Capri", price: 99.99 },
    { id: 3, name: "Oil", price: 499.99 },
  ];

  let cartProducts = JSON.parse(localStorage.getItem("CART")) || [];
  const listProducts = document.getElementById("product-list");
  const cartProductsDisplay = document.getElementById("cart-items");
  const emptyCartdDisplay = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPriceDisplay = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutMessageDisplay = document.getElementById("checkout-display");

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add(
      "bg-gray-700",
      "w-full",
      "flex",
      "justify-between",
      "items-center",
      "p-3",
      "mt-2",
      "rounded-md"
    );
    productDiv.innerHTML = `<span class="text-white">${
      product.name
    } - Rs ${product.price.toFixed(2)}</span> <button data-id="${
      product.id
    }" class="text-white p-2 bg-purple-800 rounded-md border border-purple-600 hover:bg-purple-900">Add To Cart</button>`;
    listProducts.appendChild(productDiv);
  });

  listProducts.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productId = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productId);
      addToCart(product);
    }
  });

  cartProductsDisplay.addEventListener('click',(e)=>{
    if(e.target.tagName === 'BUTTON'){
      const productId = parseInt(e.target.getAttribute("data-id"));
      const index = cartProducts.findIndex((item) => item.id === productId);
      console.log(index);
      
      if (index > -1) {
        cartProducts.splice(index,1);
        
        saveCart();
        renderCart();
      }
    }
  })
  
  function addToCart(product) {
    cartProducts.push(product);
    console.log(cartProducts);
    saveCart();
    renderCart();
  }

  function renderCart() {
    cartProductsDisplay.innerHTML = "";
    let totalPrice = 0;
    if (cartProducts.length > 0) {
      emptyCartdDisplay.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      cartProducts.forEach((item) => {
        totalPrice += item.price;
        const cartDiv = document.createElement("div");
        cartDiv.classList.add(
          "bg-gray-700",
          "w-full",
          "flex",
          "justify-between",
          "items-center",
          "p-3",
          "mt-2",
          "rounded-md"
        );
        cartDiv.innerHTML = `<span  class="text-white">${item.name} - Rs ${item.price.toFixed(2)}</span><button data-id=${item.id} class="p-2 bg-gray-800 text-white rounded-md border border-gray-600 hover:bg-gray-900">Remove</button>`;
        cartProductsDisplay.appendChild(cartDiv);
      });
      totalPriceDisplay.textContent = `Rs ${totalPrice.toFixed(2)}`
    } else {
      emptyCartdDisplay.classList.remove("hidden");
      cartProductsDisplay.classList.add('text-white' ,'mt-2')
      cartProductsDisplay.textContent = `Your cart is empty`;
      cartTotal.classList.add("hidden");
      totalPriceDisplay.textContent = `Rs 0.00`;
    }
  }

  function saveCart() {
    localStorage.setItem("CART", JSON.stringify(cartProducts));
  }
  
  checkoutBtn.addEventListener('click',() => {
    cartProducts = [];
    saveCart();
    renderCart();
   checkoutMessageDisplay.classList.remove('hidden');
   
    setTimeout(() => {
      checkoutMessageDisplay.classList.add("hidden");
    }, 3000);
  })
  renderCart();
});
