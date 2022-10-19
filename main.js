let sliderContainer = document.querySelector(
  "#features .slide-container .container"
);
//import functions from module file
import {
  loader,
  imageLink,
  clickBtn,
  activeNav,
  addProducts,
  navFunc,
  loadMoreProduct,
  openFilter,
  addFilter,
  sortProducts,
} from "./module.js";
// add loader function
loader();
navFunc;

// first add products to slider
function addItems() {
  sliderContainer.innerHTML = products
    .map((product) => {
      return `<div class="thumbnail" data-id=${product.id}>
                <img class='img-fluid' src="img/products/${product.img}" alt="" onclick =" window.location='product.html'">
                <div class="product details">
                  <h2>free shipping</h2>
                </div>
                 
            </div>`;
    })
    .join("");
  let offersPro = sliderContainer.querySelectorAll(".thumbnail img");
  //add slider images function
  imageLink(offersPro);
}
addItems();
// start slider
let thumbnail = document.getElementsByClassName("thumbnail");
let slider = document.getElementById("slider");
let buttonLeft = document.querySelector(".fa-circle-chevron-left");
let buttonRight = document.querySelector(".fa-circle-chevron-right");

buttonLeft.addEventListener("click", () => {
  slider.scrollLeft -= 125;
});
buttonRight.addEventListener("click", () => {
  slider.scrollLeft += 125;
});

let maxScrollLeft = slider.scrollWidth - slider.clientWidth;
//autoplay slider
function autoplay() {
  if (slider.scrollLeft > maxScrollLeft - 1) {
    slider.scrollLeft -= maxScrollLeft;
  } else {
    slider.scrollLeft += 1;
  }
}
//set interval
let play = setInterval(autoplay, 50);

//pause autoplay with hover

for (let i = 0; i < thumbnail.length; i++) {
  thumbnail[i].addEventListener("mouseover", () => {
    clearInterval(play);
  });
  thumbnail[i].addEventListener("mouseout", () => {
    return (play = setInterval(autoplay, 50));
  });
}
// end slider

/* featured products  */
let proContainer = document.querySelector("#product1 .pro-container");
addProducts(proContainer, products);

//add products

let newArrivalCont = document.querySelector("#product2 .pro-container");
function addSection2() {
  newArrivalCont.innerHTML = products
    .map((product) => {
      const { img, title, company, id, price } = product;
      return `<div class="pro" data-id = ${id}>
                <img src="img/products/${img}" style = "cursor:pointer" alt="" onclick = "window.location.href = 'product.html'"' >
                <div class="des">
                    <span>${company}</span>
                    <h5>${title}</h5>
                    <div class="stars">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <div class="basket-stars">
                        <div class="price">$ ${price}</div>
                        <span class="add-product" id= ${id}><i class="fa-solid fa-basket-shopping"></i></span>
                    </div>
                </div>
            </div>`;
    })
    .join("");
  let images = document.querySelectorAll("#product2 .pro img");
  let addProdBtn = document.querySelectorAll("#product2 .pro .add-product i");
  imageLink(images);
  clickBtn(addProdBtn);
}
addSection2();
openFilter();
addFilter();
// load more function from module
loadMoreProduct();

// order by price

sortProducts();
