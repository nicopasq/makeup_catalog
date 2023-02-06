# Makeup Catalog
## Project Description
For the phase-1 JavaScript project, I made a catalog of makeup products that has 3 main functionalities (filter, search, and flipping cards).
### Brief Desctiption of Functionalities
1) Filter - This is a submit event. When a user submits the HTML form with at least one input, it will display a list of product cards that have been filtered using keywords from the form input. It can handle any amount of input from 1 selection - max selections.
2) Search - This is a keydown event. It's a simple search bar, only used to find a specific type of makeup. The searchable types of makeup are...
    
    Blush, Bronzer, Eyebrow, Eyeliner, Eyeshadow, Foundation, Lip Liner, Lipstick, Mascara, Nail Polish
3) Flipping Cards - This is a click event. It will flip a product card to the 'back side' and display a product description, provided by the API, and a link to purchase. When a card is on the back, it can be clicked again to return to its original display.
# How to Use
This is a web application, so in order to use it the user needs to open the page and give input(s). A user can give input by typing in the search bar and pressing the Enter key, filling out the HTML form to filter products, clicking on a card to turn it over, and clicking the 'Reset Filters' button. The 'Reset Filters' button will clear the products, and display the unfiltered list of products that is initially loaded onto the page.
# Credits
Makeup API: 'http://makeup-api.herokuapp.com/api/v1/products.json'

The API contains all of the product data that I used, it is my only source for this project.


