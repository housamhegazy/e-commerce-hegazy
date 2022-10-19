import {
  loader,
  updateBasket,
  basket,
  activeNav,
  addProducts,
  navFunc,
  loadMoreProduct,
} from "./module.js";
//loader function
loader();
let proContainer = document.querySelector("#product1 .pro-container");

//set main image from local storage

if (localStorage.getItem("imgObj")) {
  let imgObj = JSON.parse(localStorage.getItem("imgObj"));
  addItem(imgObj);
  addSProductToCart(imgObj);
}

function addItem(imgObj) {
  let singleProContainer = document.querySelector("#prodetails");
  singleProContainer.innerHTML = `<div class="single-pro-img"><img id="mainImg" src="img/products/${imgObj.img}" alt="" width="100%">
        <div class="small-img-group">
          <div class="sm-img-col"><img class="sm-img" src="img/products/f1.jpg" alt="" width="100%"></div>
          <div class="sm-img-col"><img class="sm-img" src="img/products/f2.jpg" alt="" width="100%"></div>
          <div class="sm-img-col"><img class="sm-img" src="img/products/f3.jpg" alt="" width="100%"></div>
          <div class="sm-img-col"><img class="sm-img" src="img/products/f4.jpg" alt="" width="100%"></div>
        </div>
      </div>
      <div class="single-pro-details">
        <h6>${imgObj.title} </h6>
        <h4>${imgObj.company}</h4>
        <h2>${imgObj.price}</h2>
        <label for="size">size</label>
        <select id="size" name="size">
          <option>select size</option>
          <option value="XL">XL</option>
          <option value="L">L</option>
          <option value="M">M</option>
          <option value="S">S</option>
        </select>
        <input type="number" value="1" id="">
        <button class="add" id = ${imgObj.id}>add to cart</button>
        <h4>product details</h4>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi unde soluta delectus tempore neque quidem
          ad fuga accusamus iste, quisquam, voluptate aliquam porro, modi nesciunt esse beatae asperiores sequi
          quis.
        </p>
      </div>`;
}
function addSProductToCart(imgObj) {
  let addBtn = document.querySelector(".single-pro-details .add");
  let quantInput = document.querySelector(".single-pro-details input");
  addBtn.addEventListener("click", (e) => {
    let quantInputValue = quantInput.value;
    updateLocalStorage(imgObj, quantInputValue, e);
  });
}

function updateLocalStorage(imgObj, quantInputValue, e) {
  let item = {
    img: imgObj.img,
    title: imgObj.title,
    company: imgObj.company,
    id: imgObj.id,
    price: imgObj.price,
    Quantity: parseInt(quantInputValue),
  };
  if (basket.length < 1) {
    basket.push(item);
    //add basketArray to local storage
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    let search = basket.find((product) => product.id === e.target.id);
    if (basket.includes(search)) {
      search.Quantity += parseInt(quantInputValue);
      //add basketArray to local storage
      localStorage.setItem("basket", JSON.stringify(basket));
    } else {
      basket.push(item);
      //add basketArray to local storage
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }
  updateBasket(basket);
}
//add products section 2
let newProducts = [];
let newLength = 5;
for (let i = 0; i < newLength; i++) {
  newProducts.push(products[Math.floor(Math.random() * products.length)]);
}
addProducts(proContainer, newProducts);
// change main img with small img
let mainImg = document.getElementById("mainImg");
let smallImgs = document.getElementsByClassName("sm-img");
[...smallImgs].forEach((img) => {
  img.addEventListener("click", (e) => {
    let src = e.target.src;
    mainImg.src = src;
  });
});

// user comments
let commentsContainer = document.querySelector("#proComments .rev-container");
async function getData() {
  try {
    let data = await fetch("https://jsonplaceholder.typicode.com/posts");
    let finalData = await data.json();
    let halfData = finalData.splice(0, finalData.length / 15);
    commentsContainer.innerHTML = halfData
      .map((x) => {
        return `<div class='container'>
              <div class='image'>
                <img src='img/people/2.png' alt=''>
              </div>
              <div class='comment' id='${x.id} style='margin:30px'>
                <div class='title'>${x.title}</div>
                <div class='body'>${x.body}</div>
              </div>
            </div>
              `;
      })
      .join("");
    let boxes = document.querySelectorAll(
      "#proComments .rev-container .container"
    );
    loadMore(boxes);
  } catch (err) {
    console.log("error " + err);
  }
}
getData();

//load more function
function loadMore(boxes) {
  let loadBtn = document.querySelector("#proComments .load-more span");
  // console.log(boxes)
  let openNumber = 2;
  loadBtn.addEventListener("click", (e) => {
    for (let i = openNumber; i < openNumber + 2; i++) {
      if(boxes[i]){
        if (!boxes[i].classList.contains("open")) {
          boxes[i].classList.add("open");
        }
      }
    }
    openNumber += 2;
    if (openNumber >= boxes.length) {
      loadBtn.style.display = "none";
    }
  });
}
loadMoreProduct();