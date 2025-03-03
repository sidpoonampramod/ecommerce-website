//navbar functionality
const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});

let cartItems = document.getElementById("cart-items");
let cartTotal = document.getElementById("cart-total");
let buyNowButton = document.getElementById("buy-now-button");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
console.log("cart", cart);

let total = 0;

function updateCart() {
  cartItems.innerHTML = "";
  total = 0;
  cart.map((item, index) => {
    let cartList = document.createElement("li");
    cartList.classList.add("list-group-item");

    cartList.innerHTML = `
    <div class="d-flex justify-content-between">
    <div>
    <h4>${item.title}</h4>
    <h4>$${item.price}</h4>
    </div>
    <div class="btn-group">
    <button type="button" class="btn btn-primary decrement" data-index="${index}">-</button>
    <span class="p-4 fs-3 fw-bold">${item.quantity}</span>
    <button type="button" class="btn btn-primary increment" data-index="${index}">+</button>
    <button type="button" class="btn btn-danger remove" data-index="${index}">Remove</button>
    </div>
    </div>
    `;
    cartItems.append(cartList);

    //total
    total += item.price * item.quantity;
    // console.log(item.price, item.quantity);
    // console.log("total", total);
    cartTotal.innerHTML = total;
  });

  //increment
  let increment = document.querySelectorAll(".increment");
  console.log(increment);
  increment.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      console.log(event.target.getAttribute("data-index"));
      let id = event.target.getAttribute("data-index");
      console.log(cart[id].quantity);
      cart[id].quantity++;
      setCartToLS();
      updateCart();
    });
  });

  //decrement
  let decrement = document.querySelectorAll(".decrement");
  console.log(decrement);
  decrement.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      console.log(event.target.getAttribute("data-index"));
      let id = event.target.getAttribute("data-index");
      console.log(cart[id].quantity);
      if (cart[id].quantity > 1) {
        cart[id].quantity--;
      }
      setCartToLS();
      updateCart();
    });
  });

  //remove
  let remove = document.querySelectorAll(".remove");
  remove.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      console.log(event.target.getAttribute("data-index"));
      let id = event.target.getAttribute("data-index");
      cart.splice(id, 1);
      setCartToLS();
      updateCart();
    });
  });

  function setCartToLS() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

updateCart();

buyNowButton.addEventListener("click", handleBuy);

function handleBuy() {
  // Swal.fire({ title: "Product added to cart", icon: "success" });
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    Swal.fire({
      title: "Your cart is empty.Please add items to cart",
      icon: "warning",
    });
  } else {
    window.location.href = "orderSuccess.html";
    localStorage.removeItem("cart");
  }
}
