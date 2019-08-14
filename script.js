
$(document).ready(startGame)

let singleCardsArray = [
    "url(./assets/images/timholland_card.jpg)",
    "url(./assets/images/captain_america_card.jpg)",
    "url(./assets/images/antman_card.jpg)",
    "url(./assets/images/hulk_card.jpg)",
    "url(./assets/images/ironmaninsuit_card.png)",
    "url(./assets/images/thor_card.jpg)",
    "url(./assets/images/drstrange_card.jpeg)",
    "url(./assets/images/blackwidow_card.jpg)",
    "url(./assets/images/scarletwitch_card.jpg)",
    "url(./assets/images/vision_card.jpg)",
    "url(./assets/images/shuri_card.jpeg)",
    "url(./assets/images/captainmarvel_card.jpg)",
    "url(./assets/images/hawkeye_card.jpg)",
    "url(./assets/images/ironmaninsuit_from_poster.png)"
]

let firstCardUrl = null;
let secondCardUrl = null;
let totalMatches = null;

let firstCard = null;
let secondCard = null;

let clickable = true;

let maxMatches = 8;
let attempts = 0;


var timeleft = 60;
var downloadTimer = setInterval(function(){
  document.getElementById("countdown").innerHTML = "00:"+timeleft;
  timeleft -= 1;
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Time Up"
  }
}, 1000);







function shuffleArray(array) {
var currentIndex = array.length, temporaryValue, randomIndex;

while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);   
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
}
return array;
}

function shuffleCards (cardsArray) {             
for (cardIndex = 0; cardIndex < cardsArray.length; cardIndex++ ) {
    $(".front:eq("+cardIndex+")").css('background-image', cardsArray[cardIndex]);
}    
}
function generateCardHolders(cardsArray){
                
    for (cardIndex = 0; cardIndex < cardsArray.length; cardIndex++ ) {
        let cardDiv = $('<div>').addClass('card');
        let frontDiv = $('<div>').addClass('front').css('background-image', cardsArray[cardIndex])
        let backDiv = $('<div>').addClass('back');
        let gameDeck = cardDiv.append(frontDiv,backDiv);
        $(".deck").append(gameDeck)
    }    
}
function setGameTable (){
let shuffledArray = shuffleArray(singleCardsArray)
let gameDeck = shuffledArray.slice(0,8);
gameDeck = gameDeck.concat(gameDeck);
gameDeck = shuffleArray(gameDeck);
generateCardHolders(gameDeck);
}

function startGame() {
setGameTable()
$('.card').click(handleCardClick);
$('.card').click(displayStats);
}

function handleCardClick(event) {

if(clickable) {
let clickedCard = $(event.currentTarget);
clickedCard.toggleClass('isFlipped');

    if (!firstCard) {
        firstCard = clickedCard;
        firstCardUrl = clickedCard.find(".front").css('background-image');
        clickedCard.css('pointer-events', 'none');
    } else if (!secondCard) {
        secondCard = clickedCard;
        secondCardUrl = clickedCard.find(".front").css('background-image');
        clickedCard.css('pointer-events', 'none');
        attempts++;
        $('.attemptsCount span').text(attempts);
    }

if (firstCardUrl && secondCardUrl){
    if (firstCardUrl !== secondCardUrl) {
    clickable = false; 
        setTimeout( function () {
            firstCard.toggleClass('isFlipped');
            secondCard.toggleClass('isFlipped');
            firstCard.css('pointer-events', ''); 
            secondCard.css('pointer-events', '');
            firstCard = null;
            secondCard = null;
            firstCardUrl = null;
            secondCardUrl = null;
            clickable = true; 
        }, 1500);
    } else if (firstCardUrl === secondCardUrl) {
        totalMatches++;
        
        firstCard = null;
        firstCardUrl = null;
        secondCard = null;
        secondCardUrl = null;
        clickable = false;
        setTimeout( function () {
            if(totalMatches === 8){
            $(".power").removeClass("shadow");
            $(".space").removeClass("shadow");
            $(".time").removeClass("shadow")
            }
            clickable = true;
        }, 1500);

    } else {
        return
    } 
}
}
}


