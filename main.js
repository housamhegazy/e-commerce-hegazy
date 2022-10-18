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
function addItems() {
  feContent.innerHTML = products
    .map((product) => {
      return `<div class="fe-box" data-id=${product.id}>
                <img src="img/products/${product.img}" alt="" onclick="window.location.href = 'product.html'">
                <h6>free shipping</h6>
            </div>`;
    })
    .join("");
  let offersPro = feContent.querySelectorAll(".fe-box img");
  console.log(offersPro);
  imageLink(offersPro);
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
