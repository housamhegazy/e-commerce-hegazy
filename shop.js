let proContainer = document.querySelector("#product1 .pro-container");
import {
  loader,
  addProducts,
  navFunc,
  loadMoreProduct,
  openFilter,
  addFilter,
  sortProducts,
} from "./module.js";
loader();
addProducts(proContainer, products);
loadMoreProduct();
openFilter();
addFilter();
sortProducts();
