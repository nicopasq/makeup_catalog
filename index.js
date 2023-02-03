//variables
const form = document.getElementById("filterForm");
const resetBtn = document.getElementById("reset");
const photoGal = document.getElementById("photos");
const url = "http://makeup-api.herokuapp.com/api/v1/products.json";

//event listeners
addEventListener("DOMContentLoaded", (e) => {
  cardKeys();
  searchByType();
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  filter();
});
resetBtn.addEventListener("click", (e) => {
  cardKeys();
});

// BASIC PAGE CONTENT... NO FUNCTIONALITIES
function cardKeys(fetchUrl = url) {
  photoGal.innerHTML = "";
  return fetch(fetchUrl)
    .then((resp) => resp.json())
    .then((arrOfObj) => {
      arrOfObj.forEach((obj) => {
        const card = {
          id: obj.id,
          img: obj.image_link,
          price: `$${obj.price}`,
          name: obj.name,
          brand: obj.brand,
          description: obj.description,
          link: obj.product_link,
          type: obj.product_type,
        };
        if (card.price !== "$0.0" && card.price !== undefined) {
          return createCards(card);
        }
      });
    });
}
function createCards(card) {
  const cardDiv = document.createElement("div");
  cardDiv.id = `card_${card.id}`;
  cardDiv.classList.add("card", "front");
  cardDiv.innerHTML = `<img src =${card.img} alt="image link no longer exists">
        <p>${card.name}</p>
        <p>${card.brand}</p>
        <p id='desc'>${card.description}</p>
        <button id="link"><a href="${card.link}">Buy Now</a></button>`;
  cardDiv.addEventListener("click", (e) => flip(cardDiv, "front", "back"));
  photoGal.appendChild(cardDiv);
}
//ADDING FUNCTIONALITY TO PAGE
function searchByType() {
  let url = `http://makeup-api.herokuapp.com/api/v1/products.json?`;
  let searchBar = document.getElementById("searchBar");
  searchBar.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      let searchVal = searchBar.value;
      return cardKeys(url.concat(`product_type=${searchVal}`));
    }
  });
}
function filter() {
  let filterURL = `http://makeup-api.herokuapp.com/api/v1/products.json?`;
  const productValues = [];
  let brand = document.getElementById("brandsDropdown").value.toLowerCase();
  let productStrArr = productSearchValues();

  if (brand !== "select brand" && !productStrArr.length) {
    cardKeys(filterURL.concat(`brand=${brand}`));
  } else if (brand === "select brand" && productStrArr.length) {
    for (let searchVal of productStrArr) {
      cardKeys(filterURL.concat(searchVal));
    }
  } else if (brand !== "select brand" && productStrArr.length) {
    for (let searchVal of productStrArr) {
      cardKeys(filterURL.concat(`brand=${brand}&${searchVal}`));
    }
  }
}
function productSearchValues() {
  const productDropdown = [...document.querySelectorAll(".productDropdown")];
  const searchVals = productDropdown.map(item => {
    const prodType = item.querySelector("p").textContent;
    const productCat = item.querySelector(".category").value;

    if(productCat === 'all'){
    return `product_type=${prodType}`
    }else if(productCat === 'select'){
        return 
    } else {
        return `product_type=${prodType}&product_category=${productCat}`
    }
})
return searchVals.filter(item => item)
}
function flip(div, class1, class2) {
  if (div.classList.contains(class1)) {
    div.classList.remove(class1);
    div.classList.add(class2);
  } else if (div.classList.contains(class2)) {
    div.classList.remove(class2);
    div.classList.add(class1);
  }
}
