//settings
var enableLogs = true;
var allowClicks = true;
var classMatch = "hide-finished";
var classNotMatch = "close";
var transitionSpeed = "0.6s";
var closingCardsDelay = 800;

//generate random color
function randomNumber(max){
  return Math.floor(Math.random()* (max - 1) + 1);
}

function log(data){ 
  if(enableLogs) console.log(data);  
};

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
var Card = function(url, id, color){
  this.id = id;
  this.url = url;
  this.name = url.toString().split('/').pop().replace(/\.\w+$/, '');
  this.color = color;
  Config.call(this);
}

//build card
Card.prototype.addToContainer = function() {
  var wrapper = document.createElement(this.wrapper);
  wrapper.className = this.class;
  wrapper.style.transition = transitionSpeed;
  wrapper.setAttribute("data", this.name);
  wrapper.setAttribute("data-id", this.id);
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
  array = array.concat(array); //for pairing cards
  var shuffled = [];
  for(var i = array.length; i > 0; i--){
    var index = array.length == 1 ? 0 : randomNumber(array.length);
    shuffled.push(array[index]); 
    array.splice(index, 1);
    //log(array[index]); log("array.len = "+array.length); log("index = "+index); log("i = "+i); log("===========")
  }
  return shuffled;
}


function renderCards(urls, numOfCards, color){
  for (var i = 0; i < numOfCards; i++){
    var card = new Card(urls[i], i+1, color || generateColor());
    card.addToContainer();
  }
}


renderCards(shuffleCards(globalUrls), 12)




var selected = [];

//event if clicked card
document.addEventListener("click", function(event){
  
  if(!allowClicks && event.target.id != "container") { 
    event.target.style.animation = "effect_disabled_clicks 0.3s ease-out";
  }
  if(allowClicks && event.target.classList.contains("back")) {
    log(event)
    var el = event.target.parentNode;
    log(el.attributes.data.nodeValue);
    if(selected.length <= 1 && !el.classList.contains(classMatch)) {
      el.classList.toggle(classNotMatch);
      selected.push(el);
    }

    if (selected.length === 2) {
      if (selected[0].attributes.data.nodeValue === selected[1].attributes.data.nodeValue) {
        doWithCards(selected[0], selected[1], classMatch, "Matched!");
      } else {
        doWithCards(selected[0], selected[1], classNotMatch, "Not matched");
      }
    }
  }

function doWithCards(first, second, className, message){
  log(message || "");
  allowClicks = false;
  setTimeout(function(){
    first.classList.toggle(className);
    second.classList.toggle(className);
    
    selected = [];
    setTimeout(function(){
      allowClicks = true;
    }, 300)
  }, closingCardsDelay);
}

  
  // console.log(selectedCards)
});
//array for tow cards

//compare arrays images

//hide card if `