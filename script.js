$( document ).ready(function() {
    startApp();
});

let levelOneCardsArray = [
    "url(./assets/images/cards/levelOneCards/timholland_card.jpg)",
    "url(./assets/images/cards/levelOneCards/captain_america_card.jpg)",
    "url(./assets/images/cards/levelOneCards/antman_card.jpg)",
    "url(./assets/images/cards/levelOneCards/hulk_card.jpg)",
    "url(./assets/images/cards/levelOneCards/ironmaninsuit_card.png)",
    "url(./assets/images/cards/levelOneCards/thor_card.jpg)",
    "url(./assets/images/cards/levelOneCards/drstrange_card.jpeg)",
    "url(./assets/images/cards/levelOneCards/blackwidow_card.jpg)",
    "url(./assets/images/cards/levelOneCards/scarletwitch_card.jpg)",
    "url(./assets/images/cards/levelOneCards/vision_card.jpg)",
    "url(./assets/images/cards/levelOneCards/shuri_card.jpeg)",
    "url(./assets/images/cards/levelOneCards/captainmarvel_card.jpg)",
    "url(./assets/images/cards/levelOneCards/hawkeye_card.jpg)",
    "url(./assets/images/cards/levelOneCards/ironmaninsuit_from_poster.png)"
]

let levelTwoCardsArray = [
    "url(./assets/images/cards/levelTwoCards/blackpanther1.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther2.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther3.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther4.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther5.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther6.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther7.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther8.jpeg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther9.jpg)",
    "url(./assets/images/cards/levelTwoCards/blackpanther10.jpg)"
]

let levelThreeCardsArray = [
    "url(./assets/images/cards/levelThreeCards/iron_legion.png)",
    "url(./assets/images/cards/levelThreeCards/mark_I.png)",
    "url(./assets/images/cards/levelThreeCards/mark_II.png)",
    "url(./assets/images/cards/levelThreeCards/mark_XII.png)",
    "url(./assets/images/cards/levelThreeCards/mark_XIV.png)",
    "url(./assets/images/cards/levelThreeCards/mark_V.png)",
    "url(./assets/images/cards/levelThreeCards/mark_XLIV.png)",
    "url(./assets/images/cards/levelThreeCards/mark_XLIX.png)",
    "url(./assets/images/cards/levelThreeCards/mark_XLVII.png)"
]

let levelFourCardsArray = [
    "url(./assets/images/cards/levelFourCards/mark_III.png)",
    "url(./assets/images/cards/levelFourCards/mark_IV.png)",
    "url(./assets/images/cards/levelFourCards/mark_L.png)",
    "url(./assets/images/cards/levelFourCards/mark_LXXXV.png)",
    "url(./assets/images/cards/levelFourCards/mark_V.png)",
    "url(./assets/images/cards/levelFourCards/mark_VI.png)",
    "url(./assets/images/cards/levelFourCards/mark_VII.png)",
    "url(./assets/images/cards/levelFourCards/mark_VIII.png)",
    "url(./assets/images/cards/levelFourCards/mark_X.png)",
    "url(./assets/images/cards/levelFourCards/mark_XLIII.png)",
    "url(./assets/images/cards/levelFourCards/mark_XLV.png)",
    "url(./assets/images/cards/levelFourCards/mark_XLVI.png)",
    "url(./assets/images/cards/levelFourCards/mark_XLVII.png)"
]

let deckArray = [
    levelOneCardsArray,
    levelTwoCardsArray,
    levelThreeCardsArray,
    levelFourCardsArray
]

let deckIndex = 0;

let deckInPlay = deckArray[deckIndex];

let firstCardUrl = null;
let secondCardUrl = null;
let totalMatches = null;

let firstCard = null;
let secondCard = null;

let clickable = true;

let maxMatches = 1;
let attempts = 0;

let counter;
let timePassed = 0;

function startApp(){
    // on play button click, play with first deck
    $(".play-button").click(function(){
        console.log("play button clicked")
        deckIndex = 0;
        deckInPlay = deckArray[deckIndex];
        startGame(deckInPlay);
        deckIndex = deckIndex++;
    })
    // on 'next round' button click, play with next deck
    $(".next-round-button").click(function(){
         
        deckInPlay = deckArray[deckIndex];
        startGame(deckInPlay);
    })
    // when deck in play is last in list, 
    if($(".next-round-button").text() === "PLAY AGAIN");
    $(".next-round-button").click(function(){
        resetGame();
    })
}

function startGame(deck) { //reset card values, stats, close all modals, reset timer
    removePreviousDeck();
    resetCardValues();
    resetStats();
    setGameTable(deck);
    resetTimer();
    closeResultModal();
    closeStartModal();
    $(".card").click(handleCardClick);
    playAudio();
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////


function setGameTable (deck){
    let shuffledArray = shuffleArray(deck);
    let gameDeck = shuffledArray.slice(0,8);
    gameDeck = gameDeck.concat(gameDeck);
    gameDeck = shuffleArray(gameDeck);
    generateCardDivs(gameDeck);
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

function generateCardDivs(cardsArray){
    for (cardIndex = 0; cardIndex < cardsArray.length; cardIndex++ ) {
        let cardDiv = $('<div>').addClass('card');
        let frontDiv = $('<div>').addClass('front').css('background-image', cardsArray[cardIndex]);
        let backDiv = $('<div>').addClass('back');
        let gameDeck = cardDiv.append(frontDiv,backDiv);
        $(".deck").append(gameDeck);
    }    
}
function removePreviousDeck(){
    $("div").remove('.card');
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
                    resetCardValues();
                    clickable = true;
                }, 900);
            } else if (firstCardUrl === secondCardUrl) {
                totalMatches++;
                resetCardValues();
                $('.attempts-count').text(attempts);
                clickable = false;
                setTimeout( function () {
                    displayGameResult()
                    clickable = true;
                }, 900);
            } else {
                return;
            }
        }
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////



function resetGame(){

    closeResultModal();
    openStartModal();

    deckArray = [
        levelOneCardsArray,
        levelTwoCardsArray,
        levelThreeCardsArray,
        levelFourCardsArray
    ]
    
    deckIndex = 0;
    
    deckInPlay = deckArray[deckIndex];
    
    firstCardUrl = null;
    secondCardUrl = null;
    totalMatches = null;
    
    firstCard = null;
    secondCard = null;
    
    clickable = true;
    
    maxMatches = 1;
    attempts = 0;
    
    counter;
    timePassed = 0;

    startApp();
}

function displayGameResult(){
    if(timePassed === 150 ){
        clearInterval(counter);
        ratePlayer();
        updateStats();
        $(".win").text("Game Over");
        openResultModal();
    }
    if(totalMatches === maxMatches){
        if(deckIndex === 3){
            clearInterval(counter);
            ratePlayer();
            updateStats();
            deckIndex = 0;
            $(".next-round-button").text("PLAY AGAIN");
            $(".end-of-game").text("You are worthy now!");
            $("#victory_popup").removeClass('hide');
            openResultModal();
        } 
        openResultModal();
    }
}

function startTimer(){
    counter = setInterval(function(){
    $("#countup").text(timePassed + "  sec");
    timePassed += 1;
    }, 1000);
}

function resetTimer(){ //resets and starts timer
    clearInterval(counter);
    timePassed = 0;
    startTimer();
}

function updateStats(){
    $(".modal-attempts").text("You  made "+ attempts + " attempts");
    $(".modal-time").text(" in " + timePassed + " seconds");
    $(".modal-score-title").append($(".modal-score"));
}

function openResultModal(){
    clearInterval(counter);
    ratePlayer();
    updateStats();
    $("#popup_shadow").removeClass("hide");
}

function closeResultModal(){
    ratePlayer();
    $("#popup_shadow").addClass('hide')
}

function openStartModal(){

    $("#play-button-shadow").removeClass('hide')
}

function closeStartModal(){
    resetStats()
    dimStones();
    $("#play-button-shadow").addClass('hide')
}

function restartGame(){  

    // openStartModal();
    startGame(deckInPlay);//start game with current card deck
    // $("#countup").text("ready...");
    // $('.attempts-count').text(attempts);
    // $('.card').removeClass('isFlipped');
    // $('.card').css('pointer-events', '');
    // dimStones();
    // closeResultModal();
    // resetStats();
    // startTimer();
}

function dimStones(){//shadows the stones both in modal and side panel
    $(".space").addClass("shadow");
    $(".power").addClass("shadow");
    $(".time").addClass("shadow");
}

function resetStats(){ // resests stats at beginning of each new game
    totalMatches = null;
    attempts = 0;
    resetTimer();
}

function resetCardValues(){ //reset card values at beginning of each game
    firstCard = null;
    firstCardUrl = null;
    secondCard = null;
    secondCardUrl = null;
}

function ratePlayer(){ // rates performance by displaying stones
        if (timePassed < 50){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".time").removeClass("shadow");
            $(".win").text("Wakanda Forever");
            deckIndex++;
        } else if(timePassed < 90){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".win").text("You're getting the hand of it");
            deckIndex++;
        } else if (timePassed < 120){
            $(".space").removeClass("shadow");
            $(".win").text("Try again");
        } else {
            return;
        }
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

