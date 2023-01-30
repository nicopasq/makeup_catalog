// ON LOAD
addEventListener('DOMContentLoaded', e => {
    cardKeys()
    filter()
    reset()
    searchByType()
})


// BASIC PAGE CONTENT... NO FUNCTIONALITIES
const url = "http://makeup-api.herokuapp.com/api/v1/products.json"
function cardKeys(fetchUrl = url) {
    return fetch(fetchUrl)
        .then((resp) => resp.json())
        .then((arrOfObj) => {
            arrOfObj.forEach(obj => {
                const card = {
                    img: obj.image_link,
                    price: `$${obj.price}`,
                    name: obj.name,
                    brand: obj.brand,
                    description: obj.description,
                    link: obj.product_link,
                    type: obj.product_type
                };
                if (card.price !== "$0.0" && card.price !== undefined) {
                return createCards(card)
                }
            })
        })
}

function createCards(card) {
    const photoGal = document.getElementById("photos");
        const cardDiv = document.createElement('div')
        cardDiv.id = 'card'
        cardDiv.className = 'front'
        cardDiv.innerHTML = `<img src =${card.img} alt="image link no longer exists">
        <p>${card.name}</p>
        <p>${card.brand}</p>
        <p id='desc'>${card.description}</p>
        <button id="link"><a href="${card.link}">Buy Now</a></button>`;
        photoGal.appendChild(cardDiv);
flip()
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
        } else if (brand === 'select brand' && productInfo !== undefined){
            createCards(url.concat(productInfo))
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