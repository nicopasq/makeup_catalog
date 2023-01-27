// ON LOAD
addEventListener('DOMContentLoaded', e => {
    createCards()
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
  });
  }

  //ADDING FUNCTIONALITY TO PAGE
  function searchByType(){
    let url =`http://makeup-api.herokuapp.com/api/v1/products.json?`
    const photoGal = document.getElementById('photos')
    let searchBar = document.getElementById('searchBar')
    searchBar.addEventListener('keydown', e => {
        if (e.key === 'Enter'){
            let searchVal = searchBar.value
            let searchRes = createCards(url.concat(`product_type=${searchVal}`))
            photoGal.innerHTML=``
            if(searchRes !== undefined){
                photoGal.append(searchRes)
            }
        }
    })
}