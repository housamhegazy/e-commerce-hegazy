let proContainer = document.querySelector("#product1 .pro-container");
import {
  addProducts,
  navFunc,
  loadMoreProduct,
  openFilter,
  addFilter,
  sortProducts,
} from "./module.js";
addProducts(proContainer, products);
loadMoreProduct();
openFilter();
addFilter();
sortProducts();
