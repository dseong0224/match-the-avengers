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

let maxMatches = 9;
let attempts = 0;
let games_played = 0;

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

    function setGameTable (){
        let shuffledArray = shuffleArray(singleCardsArray)
        let gameDeck = shuffledArray.slice(0,8)
        gameDeck = gameDeck.concat(gameDeck);
        console.log(gameDeck)
        let gameCardSet = shuffleCards(gameDeck);
        return gameCardSet
    }

    function startGame() {
        $('.card').click(handleCardClick);
        setGameTable()
        // $('.card').click(displayStats);
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
                    clickable = true;
                }, 1500);
            } else {
                return
            } 
        }
        }
    
    // function displayStats() {

    //     function calculateAccuracy(total, divider) {
    //         return parseInt(total / divider * 100) + "%";
    //     }

    //     var average = calculateAccuracy(totalMatches, attempts);

    //     $('.accuracyPercentage span').text(average);
    // }
    // displayStats()
    }
