//import functions from module file
import {loader, updateBasket, navFunc } from "./module.js";
//loader function
loader();
let cartContainer = document.querySelector("section .cartTable tbody");
// check if there is products in local storage
let items = JSON.parse(localStorage.getItem("basket")) || [];
function addTbody() {
  if (localStorage.getItem("basket")) {
    if (items < 1) {
      cartContainer.innerHTML = `<tr>
                <td colspan="6">empty cart</td>
              </tr>`;
    } else {
      addCartItems(items);
    }
  } else {
    cartContainer.innerHTML = `<tr><td>empty</td></tr>`;
  }
}
addTbody();

function addCartItems(xItems) {
  cartContainer.innerHTML = xItems
    .map((item) => {
      return `<tr class="product-cart" id = ${item.id}>
              <td><img src='img/products/${item.img}'></td>
              <td class="quantity">${item.Quantity}</td>
              <td class="price">$ ${item.price * item.Quantity}</td>
              <td class="title">${item.title}</td>
              <td class="company">${item.company}</td>
              <td class = "delete"><button>Delete</button></td>
          </tr>`;
    })
    .join("");
}

let DeleteBtns = [...document.querySelectorAll("table tbody .delete button")];
DeleteBtns.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    console.log("ok");
    let id = e.target.parentElement.parentElement.id;
    let search = items.find((item) => item.id === id);
    items = items.filter((item) => item != search);
    console.log(items);
    updateBasket(items);
    sumProducts();
    sumPrice();
    localStorage.setItem("basket", JSON.stringify(items));
    e.target.parentElement.parentElement.remove();
    // addCartItems(items);
  })
);
let DeleteAll = document.querySelector("table thead button");
DeleteAll.addEventListener("click", () => {
  items = [];
  localStorage.setItem("basket", JSON.stringify(items));
  addTbody();
  sumProducts();
  sumPrice();
  updateBasket(items);
});

// sum products
let sumEle = document.querySelector("table tfoot .summProducts");
function sumProducts() {
  sumEle.textContent = items
    .map((item) => {
      return item.Quantity;
    })
    .reduce((acc, curr) => {
      return +acc + +curr;
    }, 0);
}
sumProducts();

// sum price
let priceEle = document.querySelector("table tfoot .summPrice");
function sumPrice() {
  let AllPrice = items
    .map((item) => {
      return parseInt(item.price) * parseInt(item.Quantity);
    })
    .reduce((acc, curr) => {
      return +acc + +curr;
    }, 0);
  priceEle.textContent = `$ ${AllPrice}`;
}
sumPrice();
