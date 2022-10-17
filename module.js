//open nav function
let toggleBtn = document.querySelector("#header .toggle");
let nav = document.querySelector("#navbar");
// basket variable
let basket = JSON.parse(localStorage.getItem("basket")) || [];
// cart number
let cartEle = document.querySelector(".cart .number");
//open and close nav function
function navFunc() {
  toggleBtn.addEventListener("click", (e) => {
    nav.classList.toggle("open");
  });
  window.addEventListener("scroll", () => {
    if (nav.classList.contains("open")) {
      nav.classList.remove("open");
    }
  });
}
navFunc();
// add products function
function addProducts(container, data) {
  container.innerHTML = data
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
  let images = document.querySelectorAll(".pro img");
  let addProdBtn = document.querySelectorAll(".pro .add-product i");
  imageLink(images);
  clickBtn(addProdBtn);
}
function clickBtn(btns) {
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      addToBasket(e);
    });
  });
}
// function to send singleProduct image link to local storage
function imageLink(images) {
  images.forEach((img) => {
    // console.log(img.parentElement.dataset.id);
    img.addEventListener("click", (e) => {
      let search = products.find(
        (product) => product.id == e.target.parentElement.dataset.id
      );
      console.log(search);
      localStorage.setItem("imgObj", JSON.stringify(search));
    });
  });
}

function activeNav() {
  let navBtns = document.querySelectorAll("#navbar li a");
  if (window.location.href.includes("index")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    navBtns[0].classList.add("active");
  }
  if (window.location.href.includes("shop")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    navBtns[1].classList.add("active");
  }
  if (window.location.href.includes("blog")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    navBtns[2].classList.add("active");
  }
  if (window.location.href.includes("about")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    navBtns[3].classList.add("active");
  }
  if (window.location.href.includes("contact")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    navBtns[4].classList.add("active");
  }
  if (window.location.href.includes("cart")) {
    navBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
  }
}
activeNav();

// function to add products to basketArray
function addToBasket(e) {
  basket = JSON.parse(localStorage.getItem("basket")) || [];
  let element = products.find((ele) => ele.id === e.target.parentElement.id);
  let item = {
    img: element.img,
    title: element.title,
    company: element.company,
    id: element.id,
    price: element.price,
    Quantity: 1,
  };
  if (basket.length < 1) {
    basket.push(item);
    //add basketArray to local storage
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    let search = basket.find(
      (product) => product.id === e.target.parentElement.id
    );
    if (basket.includes(search)) {
      search.Quantity += 1;
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

function updateBasket(basket) {
  let cartNum = [...basket]
    .map((ele) => {
      return ele.Quantity;
    })
    .reduce(
      (acc, curr) => {
        return +acc + +curr;
      },
      [0]
    );
  cartEle.textContent = cartNum;
}
updateBasket(basket);

//load more function

let proContainers = document.querySelectorAll(".inside-container");
function loadMoreProduct() {
  proContainers.forEach((container) => {
    let loadBtn = container.querySelector(".load-more span");
    let products = container.querySelectorAll(".pro");
    let openNumber = 10;
    for (let i = openNumber; i < products.length; i++) {
      products[i].style.display = "none";
    }
    // open load
    loadBtn.addEventListener("click", (e) => {
      for (let j = openNumber; j < openNumber + 5; j++) {
        if (products[j]) {
          if ((products[j].style.display = "none")) {
            products[j].style.display = "block";
          }
        }
      }
      openNumber += 5;
      if (openNumber >= products.length) {
        loadBtn.style.display = "none";
      }
    });
  });
}

// filter open
function openFilter() {
  let filterBtn = document.querySelector("#filter .filter-icon");
  filterBtn.addEventListener("click", () => {
    document
      .querySelector("#filter .filter-container")
      .classList.toggle("open");
  });
}
// create filter elements
let filterNames = ["all"].concat(
  Array.from(
    new Set(
      products.map((product) => {
        return product.company;
      })
    )
  )
);
let filterContainer = document.querySelector(
  "#filter .filter-container .by-name .list"
);
function addFilter() {
  filterContainer.innerHTML = filterNames
    .map((ele) => {
      return `<li data-name=${ele}>${ele}</li>`;
    })
    .join("");
  let items = document.querySelectorAll("#filter .by-name .list li");
  filterItems(items);
}

// filter by name function
let proContainer = document.querySelector("#product1 .pro-container");
function filterItems(items) {
  items.forEach((item) => {
    item.addEventListener("click", (e) => {
      if (e.target.dataset.name == "all") {
        addProducts(proContainer, products);
      } else {
        let search = products.filter(
          (product) => product.company == e.target.dataset.name
        );
        addProducts(proContainer, search);
      }
    });
  });
}
//order by price
function sortProducts() {
  let chooseBtns = document.querySelectorAll("#filter .by-price input");
  chooseBtns.forEach((btn) => {
    btn.addEventListener("change", (e) => {
      if (e.target.id == "low-to-high") {
        let LTHProducts = products.sort((a, b) => (a.price > b.price ? 1 : -1));
        addProducts(proContainer, LTHProducts);
      } else if (e.target.id == "high-to-low") {
        let HTLProducts = products.sort((a, b) => (a.price < b.price ? 1 : -1));
        addProducts(proContainer, HTLProducts);
      }
    });
  });
}

export {
  basket,
  imageLink,
  clickBtn,
  activeNav,
  updateBasket,
  addProducts,
  navFunc,
  loadMoreProduct,
  openFilter,
  addFilter,
  sortProducts,
};
