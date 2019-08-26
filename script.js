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

let deckInPlay = levelOneCardsArray;

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

function startGame(deck) {
    removePreviousDeck();
    resetCardValues();
    resetTimer();
    startTimer();
    resetStats();
    setGameTable(deck);
    closeModal();
    hideStartModal();
    $(".card").click(handleCardClick);
    playAudio();
}

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

function startTimer(){
    counter = setInterval(function(){
    $("#countup").text(timePassed + "  sec");
    timePassed += 1;
    }, 1000);
}

function resetTimer(){
    clearInterval(counter);
    timePassed = 0;
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
                }, 1500);
            } else if (firstCardUrl === secondCardUrl) {
                totalMatches++;
                resetCardValues();
                clickable = false;
                setTimeout( function () {
                    displayGameResult()
                    clickable = true;
                }, 1500);

            } else {
                return
            }
        }
    }
}

function displayGameResult(){
    if(timePassed === 150 ){
        $(".modal-attempts").text("You  made "+ attempts + " attempts");
        $(".modal-time").text(" in " + timePassed + " seconds");
        $(".modal-score-title").append($(".modal-score"));
        clearInterval(counter);
        $(".win").text("Game Over");
        ratePlayer();
        openModal();
    }
    if(totalMatches === maxMatches){
        $(".modal-attempts").text("You  made "+ attempts + " attempts");
        $(".modal-time").text(" in " + timePassed + " seconds");
        $(".modal-score-title").append($(".modal-score"));
        clearInterval(counter);
        ratePlayer();
        openModal();
    }
}

function openModal(){
    $("#popup_shadow").removeClass("hide");
}

function closeModal(){
    $("#popup_shadow").addClass('hide')
}

function hideStartModal(){
    $("#play-button-shadow").addClass('hide')
}

function restartGame(){
    resetStats();
    startTimer()
    $("#countup").text("ready...");
    $('.attempts-count').text(attempts);
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');
    hideGameScore();
    closeModal();
}

function hideGameScore(){
    $(".space").addClass("shadow");
    $(".power").addClass("shadow");
    $(".time").addClass("shadow");
}

function resetStats(){
    totalMatches = null;
    attempts = 0;
}

function resetCardValues(){
    firstCard = null;
    firstCardUrl = null;
    secondCard = null;
    secondCardUrl = null;
}

function ratePlayer(){
    if(totalMatches === maxMatches){
        if (timePassed < 60){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".time").removeClass("shadow");
            $(".win").text("Wakanda Forever");
            deckInPlay = levelTwoCardsArray;
        } else if(timePassed < 90){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".win").text("You're getting the hand of it");
            deckInPlay = levelTwoCardsArray;
        } else if (timePassed < 120){
            $(".space").removeClass("shadow");
            $(".win").text("Maybe try again");
            deckInPlay = levelOneCardsArray;
        } else {
            return;
        }
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

