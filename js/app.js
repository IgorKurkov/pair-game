//settings
var debugging = false; 
var allowClicks = true;
var classMatch = "hide-finished";
var classNotMatch = "close";
var transitionSpeed = "0.6s";
var closingCardsDelay = 600;
var shuffleDelay = 2500;
var defaultCardColor = "#C6C"; 
var cardsCount = 12;
var container = document.getElementById("container");
var modalWinner = document.getElementById("modal-winner");
var score = 0;
var clicks = 0;


//generate random color
function randomNumber(max){
  return Math.floor(Math.random()* (max - 1) + 1);
}

function debug(data){ 
  if(debugging) console.log(data);  
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
}

var Card = function(url, id, color){
  this.id = id;
  this.url = url;
  this.name = url.toString().split('/').pop().replace(/\.\w+$/, '');
  this.color =  color;
  Config.call(this);
}

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
  container.appendChild(wrapper);
}

//urls of images
var globalUrls = [
  'assets/image1.png',
  'assets/image2.png',
  'assets/image3.png',
  'assets/image4.png',
  'assets/image5.png',
  'assets/image6.png'
];


function shuffleCards(array){
  array = array.concat(array); //for pairing cards
  var shuffled = [];
  for(var i = array.length; i > 0; i--){
    var index = array.length == 1 ? 0 : randomNumber(array.length);
    shuffled.push(array[index]); 
    array.splice(index, 1);
    //debug(array[index]); debug("array.len = "+array.length); debug("index = "+index); debug("i = "+i); debug("===========")
  }
  return shuffled;
}


function renderCards(urls, numOfCards, color){
  container.innerHTML = "";
  container.style.animation = "effect_disabled_clicks 0.5s ease-out";
  for (var i = 0; i < numOfCards; i++){
    var card = new Card(urls[i], i+1, color || generateColor());
    card.addToContainer();
  }
  setTimeout(function(){ container.style.animation = "inherit"; }, 500);
}

renderCards(shuffleCards(globalUrls), cardsCount, defaultCardColor)

//controls
function isColored(e){
  if(e.target.id == "colored" && e.srcElement.checked ) { 
    renderCards(shuffleCards(globalUrls), cardsCount);
    
   } 
   if(e.target.id == "colored" && !e.srcElement.checked ) { 
    renderCards(shuffleCards(globalUrls), cardsCount, defaultCardColor);
   } 
}

var timer;
function isForcedSuffling(e){
  if (e.target.id == "shuffle" && e.srcElement.checked ) { 
    $('#container').shuffle({ times: 1, /* durations: [500, 650, 750, 500, 900] */ }); 
    $(document).ready(function() {
      timer = setInterval("$('#container').shuffle()", shuffleDelay);
    });
  } 
   if (e.target.id == "shuffle" && !e.srcElement.checked ){
     clearInterval(timer);
     renderCards(shuffleCards(globalUrls), cardsCount, defaultCardColor);
   }
}

function plusClick(){
  document.getElementById("count-clicks-el").innerHTML = ++clicks;
}

function plusScore(){
  document.getElementById("count-score-el").innerHTML = ++score;
}

function checkVictory(){
  if(document.getElementsByClassName("hide-finished").length == 12) { 
    modalWinner.style.display = "block"; 
    modalWinner.style.animation = "effect_disabled_clicks 0.8s ease-out";
    setTimeout(function(){ 
      modalWinner.style.display = "none"; 
      modalWinner.style.animation = "inherit";
    }, 1000);
  }
}

var selected = [];
document.addEventListener("click", function(event){
  //check controls
  isColored(event);
  isForcedSuffling(event);

  if(!allowClicks && event.target.id != "container") { 
    event.target.style.animation = "effect_disabled_clicks 0.3s ease-out";
  }
  if(allowClicks && event.target.classList.contains("back")) {
    plusClick();
    debug(event);
    var el = event.target.parentNode;
    debug(el.attributes.data.nodeValue);
    if(selected.length <= 1 && !el.classList.contains(classMatch)) {
      el.classList.toggle(classNotMatch);
      selected.push(el);
    }

    if (selected.length === 2) {
      if (selected[0].attributes.data.nodeValue === selected[1].attributes.data.nodeValue) {
        doWithCards(selected[0], selected[1], classMatch, "Matched!");
        plusScore();
      } else {
        doWithCards(selected[0], selected[1], classNotMatch, "Not matched");
      }
    }
  }
  
});

function doWithCards(first, second, className, message){
  debug(message || "");
  allowClicks = false;
  setTimeout(function(){
    first.classList.toggle(className);
    second.classList.toggle(className);
    checkVictory();
    selected = [];

    setTimeout(function(){
      allowClicks = true;
    }, 300)
  }, closingCardsDelay);
  
}
//jpg to png
//fb share
//add more cards
//add different card's counts
//refactoring 
//https://codepen.io/doggard/pen/dXYzjW
