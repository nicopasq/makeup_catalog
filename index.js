// ON LOAD
addEventListener('DOMContentLoaded', e => {
    cardKeys()
    filter()
    reset()
    searchByType()
})


// BASIC PAGE CONTENT... NO FUNCTIONALITIES
const photoGal = document.getElementById('photos')
const url = "http://makeup-api.herokuapp.com/api/v1/products.json"
function cardKeys(fetchUrl = url) {
    photoGal.innerHTML = ''
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
        const cardDiv = document.createElement('div')
        cardDiv.id = 'card'
        cardDiv.className = 'front'
        cardDiv.innerHTML = `<img src =${card.img} alt="image link no longer exists">
        <p>${card.name}</p>
        <p>${card.brand}</p>
        <p id='desc'>${card.description}</p>
        <button id="link"><a href="${card.link}">Buy Now</a></button>`;
        photoGal.appendChild(cardDiv);
        flip(cardDiv)
    }

//ADDING FUNCTIONALITY TO PAGE
function searchByType() {
    let url = `http://makeup-api.herokuapp.com/api/v1/products.json?`
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
function productSearchValues (){
    const searchVals = []
    let urlConcat 
    const productDropdown = document.querySelectorAll('.productDropdown')
    productDropdown.forEach(item => {
        let prodType = item.querySelector('p').textContent
        let productCat = item.querySelector('.category').value
        if(productCat === 'all'){
            urlConcat = `product_type=${prodType}`
        } else if(productCat === 'select'){
            urlConcat = ''
        } else{urlConcat = `product_type=${prodType}&product_category=${productCat}`}
        searchVals.push(urlConcat.toLowerCase())
    })
    return searchVals
}
function flip(cardDiv) {
        cardDiv.addEventListener("click", (e) => {
            if (cardDiv.className === "front") {
                cardDiv.className = "back";
            } else if (cardDiv.className === "back") {
                cardDiv.className = "front";
            }
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