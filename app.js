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
  var wrapper = document.createElement(this.wrapper);
  wrapper.className = this.class;
  // wrapper.style.width = "calc(1/4*100% - (1 - 1/4)*10px)";

  var front = document.createElement("div");
  front.className = "front";
  front.style.backgroundImage = "url('"+ this.url +"')";

  var back = document.createElement("div");
  back.className = "back";
  back.style.backgroundColor = this.color;

  wrapper.appendChild(back);
  wrapper.appendChild(front);
  this.container.appendChild(wrapper);
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
  array = array.concat(array);
  console.log(array)
  var shuffled = [];
  console.log(array.length)
  for(var i = array.length; i > 0; i--){
    var index = array.length == 1 ? 0 : randomNumber(array.length);
    shuffled.push(array[index]); 
    array.splice(index, 1);
    // console.log(array[index])
    // console.log("array.length = "+array.length)
    // console.log("index = "+index)
    // console.log("i = "+i)
    // console.log("===========")
  }
  console.log(shuffled)
  return shuffled;
}


function renderCards(urls, numOfCards, color){
  for (var i=0; i < numOfCards; i++){
    var card = new Card(urls[i], color || generateColor());
    card.addToContainer();
  }
}


renderCards(shuffleCards(globalUrls), 12)
//event if clicked card

//array for tow cards

//compare arrays images

//hide card if `