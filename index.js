// ON LOAD
addEventListener('DOMContentLoaded', e => {
    createCards()
    filter()
    reset()
    searchByType()
})


// BASIC PAGE CONTENT... NO FUNCTIONALITIES
function createCardObj(arr) {
    const card = {
        img: arr[0],
        price: `${arr[1]}`,
        name: arr[2],
        brand: arr[3],
        description: arr[4],
        link: arr[5],
        type: arr[6]
    };
    return card;
}
function cardKeys(fetchUrl) {
    return fetch(fetchUrl)
        .then((resp) => resp.json())
        .then((data) => {
            let cardObj = [];
            data.forEach((obj) => {
                let cardData = [
                    obj.image_link,
                    obj.price,
                    obj.name,
                    obj.brand,
                    obj.description,
                    obj.product_link,
                    obj.product_type
                ];
                cardObj.push(cardData);
            });
            return cardObj;
        });
}
const url = "http://makeup-api.herokuapp.com/api/v1/products.json";
function createCards(fetchUrl = url) {
    const photoGal = document.getElementById("photos");
    cardKeys(fetchUrl).then((resp) => {
        resp.forEach((dataSet) => {
            if (dataSet[1] !== "0.0" && dataSet[1] !== undefined) {
                let obj = createCardObj(dataSet);
                let cardDiv = document.createElement("div");
                cardDiv.id = "card";
                cardDiv.className = "front";
                cardDiv.innerHTML = `<img src =${obj.img} alt="image link no longer exists">
              <p>${obj.name}</p>
              <p>${obj.brand}</p>
              <p id='desc'>${obj.description}</p>
              <button id="link"><a href="${obj.link}">Buy Now</a></button>`;
                photoGal.appendChild(cardDiv);
            }
        });
        flip()
    });
}

//ADDING FUNCTIONALITY TO PAGE
function searchByType() {
    let url = `http://makeup-api.herokuapp.com/api/v1/products.json?`
    const photoGal = document.getElementById('photos')
    let searchBar = document.getElementById('searchBar')
    searchBar.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            let searchVal = searchBar.value
            let searchRes = createCards(url.concat(`product_type=${searchVal}`))
            photoGal.innerHTML = ``
            if (searchRes !== undefined) {
                photoGal.append(searchRes)
            }
        }
    })
}
function filter() {
    const form = document.getElementById('filterForm')
    const photoGal = document.getElementById('photos')
    let url = 'http://makeup-api.herokuapp.com/api/v1/products.json?'
    form.addEventListener('submit', e => {
        e.preventDefault()
        photoGal.innerHTML = ``
        let brand = document.getElementById('brandsDropdown').value.toLowerCase()
        let productInfo;
        prodTypeSearch().forEach(str => {
            if(str.length !== 0){
                productInfo = str
            }
        })
        if(brand !== 'select brand' && productInfo === undefined){
            createCards(url.concat(`brand=${brand}`))
        } else if (brand !== 'select brand' && productInfo !== undefined){
            createCards(url.concat(`brand=${brand}&${productInfo}`))
        }
    })
}
function prodTypeSearch() {
    const searchVals = []
    let prodType = document.querySelectorAll('.category')
    prodType.forEach(item => {
        let urlAppend;
        let makeupType = `product_type=${item.parentElement.querySelector('p').textContent}`
        let prodCat = `product_category=${item.value}`
        if (item.value === 'all') {
            urlAppend = makeupType
        } else if (item.value === 'select') {
            urlAppend = ''
        } else {
            urlAppend = `${makeupType}&${prodCat}`
        }
        searchVals.push(urlAppend.toLowerCase())
    })
    return searchVals
}
function flip() {
    const cards = document.querySelectorAll("#card");
    cards.forEach((div) => {
        div.addEventListener("click", (e) => {
            if (div.className === "front") {
                div.className = "back";
            } else if (div.className === "back") {
                div.className = "front";
            }
        });
    });
}
function reset() {
    const resetBtn = document.getElementById('reset')
    const photoGal = document.getElementById('photos')
    resetBtn.addEventListener('click', e => {
        photoGal.innerHTML = ``
        let resetSearch = createCards(url)
        if (resetSearch !== undefined) {
            photoGal.append(resetSearch)
        }
    })
}

