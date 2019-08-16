
$(document).ready(startGame)

let singleCardsArray = [
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/captain_america_card.jpg)",
    "url(./assets/images/cards/antman_card.jpg)",
    "url(./assets/images/cards/hulk_card.jpg)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/thor_card.jpg)",
    "url(./assets/images/cards/drstrange_card.jpeg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/scarletwitch_card.jpg)",
    "url(./assets/images/cards/vision_card.jpg)",
    "url(./assets/images/cards/shuri_card.jpeg)",
    "url(./assets/images/cards/captainmarvel_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/ironmaninsuit_from_poster.png)"
]

let firstCardUrl = null;
let secondCardUrl = null;
let totalMatches = null;

let firstCard = null;
let secondCard = null;

let clickable = true;

let maxMatches = 8;
let attempts = 0;

let timePassed = 0;

let counter;

function startTimer(){
    counter = setInterval(function(){
    $("#countup").text(timePassed + "  sec");
    timePassed += 1;
    }, 1000);

    // if(timePassed === 150 || totalMatches === 8){
    //     clearInterval(counter);
    // }
}

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
    $('.attempts span').text(attempts);
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
            if(timePassed === 150 || totalMatches === 8){
                clearInterval(counter);
            }
            ratePlayer();
            clickable = true;
        }, 1500);

    } else {
        return
    }
}
}
}

function restartGame(){
    totalMatches = null;
    attempts = 0;
    $('.attempts span').text(attempts);
    timePassed = 0;
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');
    console.log('restarted')
}

function ratePlayer(){
    if(totalMatches === 8){
                if (timePassed < 60){
                    $(".space").removeClass("shadow");
                    $(".power").removeClass("shadow");
                    $(".time").removeClass("shadow");
                } else if(timePassed < 90){
                    $(".space").removeClass("shadow");
                    $(".power").removeClass("shadow");
                } else if (timePassed < 120){
                    $(".space").removeClass("shadow");
                } else {
                    return;
                }
            }
}



