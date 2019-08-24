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

function startTimer(){
    counter = setInterval(function(){
    $("#countup").text(timePassed + "  sec");
    timePassed += 1;
    }, 1000);
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

function startGame(deck) {
    firstCardUrl = null;
    secondCardUrl = null;
    totalMatches = null;
    
    firstCard = null;
    secondCard = null;
    
    maxMatches = 8;
    attempts = 0;
    
    timePassed = 0;

    setGameTable(deck);
    $(".card").click(handleCardClick);
    playAudio();
}

function hideStartModal(){
    $("#play-button-shadow").addClass('hide')
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

function finishGame(){
    if(timePassed === 150 ){
        $(".modal-attempts").text("You  made "+ attempts + " attempts");
        $(".modal-time").text(" in " + timePassed + " seconds");
        $(".modal-score-title").append($(".modal-score"));
        clearInterval(counter);
        $(".win").text("Game Over");
        ratePlayer();
        openModal();
    }
    if(totalMatches === 8){
        $(".modal-attempts").text("You  made "+ attempts + " attempts");
        $(".modal-time").text(" in " + timePassed + " seconds");
        console.log("counter: ", counter)
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

function restartGame(){
    totalMatches = null;
    attempts = 0;
    firstCard = null;
    firstCardUrl = null;
    secondCard = null;
    secondCardUrl = null;
    
    clearInterval(counter);
    timePassed = 0;
    startTimer()
    $("#countup").text("ready...");
    $('.attempts-count').text(attempts);
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');

    $(".space").addClass("shadow");
    $(".power").addClass("shadow");
    $(".time").addClass("shadow");
    closeModal();
}

function startNextRound(){
    totalMatches = null;
    attempts = 0;
    firstCard = null;
    firstCardUrl = null;
    secondCard = null;
    secondCardUrl = null;
    
    clearInterval(counter);
    timePassed = 0;
    startTimer()
    $("#countup").text("ready...");
    $('.attempts-count').text(attempts);
    $('.card').removeClass('isFlipped');
    $('.card').css('pointer-events', '');

    $(".space").addClass("shadow");
    $(".power").addClass("shadow");
    $(".time").addClass("shadow");
    closeModal();
    deck = levelTwoCardsArray;
    $(".next-round-button").click(startGame(deck))
}

function ratePlayer(){
    if(totalMatches === 8){
        if (timePassed < 60){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".time").removeClass("shadow");
            $(".win").text("Wakanda Forever");
        } else if(timePassed < 90){
            $(".space").removeClass("shadow");
            $(".power").removeClass("shadow");
            $(".win").text("You're getting the hand of it");
        } else if (timePassed < 120){
            $(".space").removeClass("shadow");
            $(".win").text("Maybe try again");
        } else {
            return;
        }
    }
}



