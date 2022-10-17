// =========
let btnLeft = document.querySelector("#features .btn.left");
let btnRight = document.querySelector("#features .btn.right");
let feContent = document.querySelector("#features .fe-content");
let feContentWidth = feContent.getBoundingClientRect().width;

//import functions from module file
import {
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

navFunc;
//add slider images function
let images = [
  "f1.png",
  "f2.png",
  "f3.png",
  "f4.png",
  "f5.png",
  "f6.png",
  "f1.png",
  "f2.png",
  "f3.png",
  "f4.png",
  "f5.png",
  "f6.png",
  "f1.png",
  "f2.png",
  "f3.png",
  "f4.png",
  "f5.png",
  "f6.png",
];
function addItems() {
  feContent.innerHTML = images
    .map((image) => {
      return `<div class="fe-box">
                <img src="img/features/${image}" alt="">
                <h6>free shipping</h6>
            </div>`;
    })
    .join("");
}
addItems();
function moveBoxes() {
  btnLeft.addEventListener("click", (e) => {
    feContent.scrollLeft += feContentWidth / 2;
  });
  btnRight.addEventListener("click", (e) => {
    feContent.scrollLeft -= feContentWidth / 2;
  });
}
moveBoxes();
/* featured products  */
let proContainer = document.querySelector("#product1 .pro-container");
addProducts(proContainer, products);

//add products

let newArrivalCont = document.querySelector("#product2 .pro-container");
// addProducts(newArrivalCont, products);

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

// add slider
// function addSlider() {
//   let sliderContainer = [
//     ...document.querySelectorAll(".lg-container .carousel-inner"),
//   ];
//   sliderContainer.forEach(
//     (container) =>
//       (container.innerHTML = products
//         .map((product) => {
//           return `<div class="carousel-item">
//                   <img src='img/products/${product.img}' class="d-block w-100" alt="image">
//                   <div class="carousel-caption d-none d-md-block">
//                     <h5>Third slide label</h5>
//                     <p>Some representative placeholder content for the third slide.</p>
//                   </div>
//                 </div>`;
//         })
//         .join(""))
//   );
// }
// addSlider();

openFilter();
addFilter();
// load more function from module
loadMoreProduct();

// order by price

sortProducts();
