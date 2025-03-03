//navbar functionality
const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});

//product
let products = [];

let productContainer = document.getElementById("product-container");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    products = data;

    data.map(({ id, title, price, description, image, rating: { rate } }) => {
      let productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "my-3");

      productCard.innerHTML = `
      <div class="card h-100 rounded" onclick="showProductDetails(${id})">
      <img src=${image} class="card-img-top" alt=${title} height="400">
      <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${title}</h5>
      <p class="card-text text-truncate" style="max-width:95%">${description}</p>
      <p class="card-text">Rating:${rate}</p>
      <p class="card-text">Price:$${price}</p>
      <button class="btn btn-primary" onclick="addToCart(event,${id})">Add to cart</button>
      </div>
      </div>
      `;
      productContainer.append(productCard);
    });
  });

function showProductDetails(id) {
  //   alert(id);

  const currentPath = window.location.pathname;
  console.log("currentPath", currentPath);

  const newPath =
    currentPath.replace("index.html", "product.html") + `?id=${id}`;
  console.log("newPath", newPath);

  window.location.href = newPath;
}

$(".slide-show").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  dots: true,
  arrows: true,
});

function addToCart(e, id) {
  e.stopPropagation();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("cart", cart);

  let product = products.find((item) => item.id === id);
  console.log("product", product);

  if (product) {
    let existingProduct = cart.find((item) => item.id === id);
    console.log("existingProduct", existingProduct);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      product.quantity = 1;
      cart.push(product);
    }

    Swal.fire({ title: "Product added to cart", icon: "success" });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}
