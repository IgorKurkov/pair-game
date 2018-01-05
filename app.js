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
Card.prototype.addToContainer = function() {
  var div = document.createElement(this.wrapper);
  div.className = this.class;
  var img = document.createElement("img");
  img.src = this.url;
  div.appendChild(img);
  div.style.backgroundColor = this.color;
  this.container.appendChild(div);
}

//urls of images
var globalUrls = [
  'assets/image1.jpg',
  'assets/image2.jpg',
  'assets/image3.jpg',
  'assets/image4.jpg',
  'assets/image5.jpg',
  'assets/image6.jpg'
];


function shuffleCards(array){
  var shuffled = [];
  console.log(array.length)
  for(var i = array.length; i > 0; i--){
    var index = randomNumber(array.length);
    shuffled.push(array[index]); 
    array.splice(index, 1);
  }
  return shuffled;
}


function renderCards(urls, numOfCards, color){
  for (var i=0; i < numOfCards; i++){
    var card = new Card(urls[i], color || generateColor());
    card.addToContainer();
  }
}


renderCards(shuffleCards(globalUrls), 5)
//event if clicked card

//array for tow cards

//compare arrays images

//hide card if `