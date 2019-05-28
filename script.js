//currently in branch 'blockRepeatClick'

$(document).ready(function(){
    $('.card').click(handleCardClick);
})
//add feature: make a conditional that restricts double clicks
var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

var firstCard = null;
var secondCard = null;

var max_matches = 9;
var attempts = 0;
var games_played = 0;


function handleCardClick(event) {

    // displayStats();
    $(event.currentTarget).find('.card').addClass('unclickable')
    //add feature: same card cannot be clicked twice in a row

    $(this).find('.back').addClass('hidden');

    if(firstCardClicked === null && secondCardClicked === null){

        firstCardClicked = $(event.currentTarget).find(".front").css('background-image');
        firstCard = $(event.currentTarget);
    }
    else if(firstCardClicked!== null && secondCardClicked === null){

        secondCardClicked = $(event.currentTarget).find(".front").css('background-image');
        secondCard = $(event.currentTarget);

        if(firstCardClicked !== null && secondCardClicked !== null){
            attempts++;
            $('.attemptsCount span').text(attempts);
            //need a cover for all cards the moment second card is flipped regardless of match condition.
            //give it a 1.5sec gap before you can click a third card.
            // $('.container').find('.containerCover').addClass('unclickable') howwww!!???


            if(firstCardClicked === secondCardClicked){

                firstCard.find('.selectedCardCover').removeClass('hide');
                secondCard.find('.selectedCardCover').removeClass('hide');

                //add feature: flipped cards should not be clicked

                if(matches < max_matches) {
                    matches += 1;
                }
                if(matches === max_matches){

                    attempts = 0;
                    matches = 0;

                    $('#modalBody').removeClass("hide");

                    $('.exit').click(function () {
                        $('#modalBody').addClass("hide");
                    });
                    $('.playAgain').click(function () {
                        $('#modalBody').addClass("hide");
                        $('.card').find('.back').removeClass('hidden')
                    });
                    attempts = 0;
                    matches = 0;
                    games_played++;
                    $('.gamesPlayedCount span').text(games_played);
                    $('div').find('.selectedCardCover').addClass('hide')
                }

                if(firstCardClicked && secondCardClicked){
                    firstCardClicked = null; //shadows the rest of the cards when matched
                    secondCardClicked = null; //shadows the rest of the cards when matched
                }
            }
            else if(firstCardClicked !== secondCardClicked){
                setTimeout(function(){
                    firstCard.find(".back").removeClass('hidden');
                    secondCard.find(".back").removeClass('hidden');
                },1500);

                if(firstCardClicked && secondCardClicked){
                    firstCardClicked = null; //shadows the rest of the cards when matched
                    secondCardClicked = null; //shadows the rest of the cards when matched
                }
            }

        }


    }

    function displayStats(){

        function calculateAccuracy(total,divider) {
            return parseInt(total/divider * 100) + "%";
        }

        var average = calculateAccuracy(matches,attempts);

        $('.accuracyPercentage span').text(average);
    }
    displayStats();

}