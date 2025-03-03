//navbar functionality
const navbarToggler = document.getElementById("navbar-toggler");
const navbarCollapse = document.getElementById("navbar");

navbarToggler.addEventListener("click", function () {
  navbarCollapse.classList.toggle("show");
});

const urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
const productId = urlParams.get("id");
console.log(productId);

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);

    const {
      id,
      image,
      title,
      rating: { rate },
      description,
      price,
    } = data;

    let productContainer = document.getElementById("product-details");
    let productCard = document.createElement("div");
    productCard.classList.add("col-md-4", "my-3");

    productCard.innerHTML = `
      <div class="card h-100">
      <img src=${image} class="card-img-top" alt=${title} height="400">
      <div class="card-body d-flex flex-column justify-content-between">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${description}</p>
      <p class="card-text">Rating:${rate}</p>
      <p class="card-text">Price:${price}</p>
      <button class="btn btn-primary">Add to cart</button>
      </div>
      </div>
      `;
    productContainer.append(productCard);
  });
