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
    //need to add feature: same card cannot be clicked twice in a row

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


        }

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
            }

            if(firstCardClicked && secondCardClicked){
                firstCardClicked = null;
                secondCardClicked = null;
            }
        }
        else if(firstCardClicked !== secondCardClicked){
            setTimeout(function(){
                firstCard.find(".back").removeClass('hidden');
                secondCard.find(".back").removeClass('hidden');
                firstCard.find('.selectedCardCover').addClass('hide');
                secondCard.find('.selectedCardCover').addClass('hide');
            },1500);


            if(firstCardClicked && secondCardClicked){
                firstCardClicked = null;
                secondCardClicked = null;
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
