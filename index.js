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