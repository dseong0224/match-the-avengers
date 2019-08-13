$(document).ready(startGame)

const cardsArray = [
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
    "url(./assets/images/captainmarvel_card.jpeg)",
    "url(./assets/images/hawkeye_card.jpeg)",
    "url(./assets/images/ironmaninsuit_from_poster.png)"
]

let shuffledArray = shuffleArray(cardsArray)

let gameDeck = shuffledArray.slice(0,8)

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
        // $(".front:eq("+cardIndex+")").css('background-image', cardsArray[cardIndex]);
        $(".front:eq("+cardIndex+")").css('background-image', cardsArray[cardIndex]);
    }    
}

var firstCardClicked = null;
var secondCardClicked = null;
var totalMatches = null;

var firstCard = null;
var secondCard = null;

var cardsClickable = true;

var maxMatches = 9;
var attempts = 0;
var games_played = 0;


    function startGame() {
        $('.card').click(handleCardClick);
        // $('.card').click(displayStats);
    }

    function handleCardClick(event) {

    if(!cardsClickable) {
        return;
    }

    var clickedCard = $(event.currentTarget);

        clickedCard.find('.card')

        // $(this).find('.back').addClass('hidden');
        clickedCard.toggleClass('isFlipped');

        if (!firstCardClicked && !secondCardClicked) {

            firstCardClicked = clickedCard.find(".front").css('background-image');
            clickedCard.css('pointer-events', 'none');
            firstCard = clickedCard;
    
            // setTimeout(function(){
            //     cardsClickable = true;
            // },1500);
        
        } else if (firstCardClicked && !secondCardClicked) {

            secondCard = clickedCard;
            secondCardClicked = clickedCard.find(".front").css('background-image');
            clickedCard.css('pointer-events', 'none');
        
            
            if (firstCardClicked && secondCardClicked) {
                attempts++;
                cardsClickable = false;

                $('.attemptsCount span').text(attempts);

                if (firstCardClicked === secondCardClicked) {

                    firstCard.find('.selectedCardCover').removeClass('hide');

                    secondCard.find('.selectedCardCover').removeClass('hide');

                        if (totalMatches < maxMatches) {
                            totalMatches += 1;
                        }
                        if (totalMatches === maxMatches) {

                            attempts = 0;
                            totalMatches = 0;

                            $('#modalBody').removeClass("hide");

                            $('.exit').click(function () {
                                $('#modalBody').addClass("hide");
                            });
                            $('.playAgain').click(function () {
                                $('#modalBody').addClass("hide");
                                $('.card').find('.back').removeClass('hidden');
                            });
                            // attempts = 0;
                            // totalMatches = 0;
                            games_played++;
                            $('.gamesPlayedCount span').text(games_played);
                            $('div').find('.selectedCardCover').addClass('hide')
                        }

                        if (firstCardClicked && secondCardClicked) {
                            firstCardClicked = null; 
                            secondCardClicked = null;
                        }

                        setTimeout(function(){
                            cardsClickable = true;
                        },1500);

                        } else if (firstCardClicked !== secondCardClicked) {
                            setTimeout(function () {
                                firstCard.find(".back").removeClass('hidden');
                                secondCard.find(".back").removeClass('hidden');
                                cardsClickable = true;
                            }, 1500);

                            if (firstCardClicked && secondCardClicked) {
                                firstCardClicked = null; 
                                secondCardClicked = null; 
                            }
                        }
            }
        }
    

    function displayStats() {

        function calculateAccuracy(total, divider) {
            return parseInt(total / divider * 100) + "%";
        }

        var average = calculateAccuracy(totalMatches, attempts);

        $('.accuracyPercentage span').text(average);
    }
    displayStats()
    }
