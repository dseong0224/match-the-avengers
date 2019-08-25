let levelOneCardsArray = [
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

let levelTwoCardsArray = [
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
    "url(./assets/images/cards/timholland_card.jpg)",
]

let levelThreeCardsArray = [
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/ironmaninsuit_card.png)"
];
let levelFourCardsArray = [
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)",
    "url(./assets/images/cards/hawkeye_card.jpg)"
];
let levelFiveCardsArray = [
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)",
    "url(./assets/images/cards/blackwidow_card.jpg)"
];

let deckInPlay = [];

let firstCardUrl = null;
let secondCardUrl = null;
let totalMatches = null;

let firstCard = null;
let secondCard = null;

let clickable = true;

let maxMatches = 8;
let attempts = 0;

let counter;
let timePassed = 0;


//shuffels and displays card
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
        let frontDiv = $('<div>').addClass('front').css('background-image', cardsArray[cardIndex]);
        let backDiv = $('<div>').addClass('back');
        let gameDeck = cardDiv.append(frontDiv,backDiv);
        $(".deck").append(gameDeck);
    }    
}
function setGameTable (deck){
    let shuffledArray = shuffleArray(deck);
    let gameDeck = shuffledArray.slice(0,8);
    gameDeck = gameDeck.concat(gameDeck);
    gameDeck = shuffleArray(gameDeck);
    generateCardHolders(gameDeck);
}


function pickLevel(){
    $(".play-button").click(function(){startGame()})
}


//start game
function startGame(deck) {
    
    resetStats();
    setGameTable(deck);
    $(".card").click(handleCardClick); //delegates event handler to eac hcard
    playAudio();
}



//start timer and audio

function startTimer(){
    counter = setInterval(function(){
    $("#countup").text(timePassed + "  sec");
    timePassed += 1;
    }, 1000);
}

function playAudio(){
    let cardClickSoundEffect = $(".mouse-action")[0];
    $(".background-music")[0].play();
    
    $(".card").click(function() {
        cardClickSoundEffect.play();
    });
    $(".levelup-button").mouseenter(function() {
        cardClickSoundEffect.play();
    })
    $(".close").mouseenter(function() {
        cardClickSoundEffect.play();
    });
}


//hides start modal
function hideStartModal(){
    $("#play-button-shadow").addClass('hide')
}



//play the game

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
        $('.attempts-count').text(attempts);
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
                finishGame()
                clickable = true;
            }, 1500);

        } else {
            return
        }
    }
}
}

//finished game and opens modal
function finishGame(){
    if(timePassed === 150 ){
        //when time up
        $(".win").text("Game Over"); //displays message
        $(".modal-attempts").text("You  made "+ attempts + " attempts"); //shows attempts
        $(".modal-time").text(" in " + timePassed + " seconds"); //shows time
        ratePlayer();
        $(".modal-score-title").append($(".modal-score")); //shows stone score
        clearInterval(counter); //stops timer
        openModal();
    }
    if(totalMatches === 8){
        //when all match complete
        $(".modal-attempts").text("You  made "+ attempts + " attempts");
        $(".modal-time").text(" in " + timePassed + " seconds");
        ratePlayer();
        $(".modal-score-title").append($(".modal-score"));
        clearInterval(counter);
        openModal();
    }
}

function ratePlayer(){
    if(totalMatches === 8){
        if (timePassed < 60){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".time").removeClass("shadow");
            $(".win").text("Wakanda Forever");
            deckInPlay = levelTwoCardsArray;
            startGame(deckInPlay);
        } else if(timePassed < 90){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".win").text("You're getting the hand of it");
            deckInPlay = levelTwoCardsArray;
            startGame(deckInPlay);
        } else if (timePassed < 120){
            $(".space").removeClass("shadow");
            $(".win").text("Good enough");
            deckInPlay = levelTwoCardsArray;
            startGame(deckInPlay);
        } else {
            $(".win").text("GAME OVER \n try again");
            $(".next-round-button").text("Try Again")
            $(".next-round-button").click(function(){restartGame()});
        }
    }
}

function openModal(){
    $("#popup_shadow").removeClass("hide");
}

function closeModal(){
    $("#popup_shadow").addClass('hide')
}

function resetStats(){
    totalMatches = null;
    attempts = 0;
    firstCard = null;
    firstCardUrl = null;
    secondCard = null;
    secondCardUrl = null;
    clearInterval(counter);
    timePassed = 0;

    $(".space").addClass("shadow");
    $(".power").addClass("shadow");
    $(".time").addClass("shadow");
}

function resetDom(){
    $("#countup").text("ready...");
    $('.attempts-count').text(attempts);
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');
}

function restartGame(){
    resetStats();
    startTimer();
    resetDom();
    closeModal();
}

// function startNextRound(){
//     resetStats();
//     startTimer()
//     closeModal();
// }