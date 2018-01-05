//generate random color
function randomNumber(max){
  return Math.floor(Math.random()* (max - 1) + 1);
}

function generateColor(){
  var hex = "1234567890ABCDEF";
  var color = "#";
  for(var i = 0; i < 6; i++) {
    color += hex[randomNumber(hex.length)];
  }
  return color;
}

//global config
var Config = function() {  
  this.class = "card";
  this.wrapper = "div";
  this.container = document.getElementById("container");
}

//card prototype
var Card = function(url, color){
  this.url = url;
  this.color = color;
  Config.call(this);
}

//build card
function buildCard(card) {
  var div = document.createElement(card.wrapper);
  div.className = card.class;
  var img = document.createElement("img");
  img.src = card.url;
  div.appendChild(img);
  card.container.appendChild(div);
  return '1'
}

//urls of images
var imageUrls = [
  'assets/image1.jpg',
  'assets/image2.jpg',
  'assets/image3.jpg',
  'assets/image4.jpg',
  'assets/image5.jpg',
  'assets/image6.jpg'
];


//render cards on page 
function renderCards(imageUrls, numOfCards, color){
  for (var i=0; i < numOfCards; i++){
    var card = new Card(imageUrls[randomNumber(imageUrls.length)], color || generateColor());
    buildCard(card);

  }
}
renderCards(imageUrls, 5)
//event if clicked card

//array for tow cards

//compare arrays images

//hide card if `