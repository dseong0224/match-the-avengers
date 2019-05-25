$(document).ready(function(){
    $('.card').click(handleCardClick);
})


//might have to make a conditional that restricts double clicks

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

var firstCard = null;
var secondCard = null;

var max_matches = 9;

var attempts = 0;
var games_played = 0;


function displayStats(){

    function calculateAccuracy(total,divider) {
        return parseInt(total/divider * 100) + "%";
    }

    var average = calculateAccuracy(matches,attempts);
    console.log(parseInt(average))

    $('.gamesPlayedCount span').text(games_played);
    $('.attemptsCount span').text(attempts);
    $('.accuracyPercentage span').text(average);

}

function handleCardClick(event) {




    $(this).find('.back').addClass('hidden');

    if(firstCardClicked === null && secondCardClicked === null){
        firstCardClicked = $(event.currentTarget).find(".front").css('background-image');
        firstCard = $(event.currentTarget).find(".back");
        console.log("firstcard: ",firstCardClicked);
        //first card cannot be clicked twice in a row
    }
    else if(firstCardClicked!== null && secondCardClicked === null){

        secondCardClicked = $(event.currentTarget).find(".front").css('background-image');
        secondCard = $(event.currentTarget).find('.back');
        console.log("secondcard: ",secondCardClicked);

        if(firstCardClicked !== null && secondCardClicked !== null){
            attempts++;
            console.log("attempts: ",attempts)
        }

        if(firstCardClicked === secondCardClicked){
            console.log("it's a match");
            //flipped cards should not be clicked

            if(matches < max_matches) {
                matches += 1;
                displayStats()
            }
            if(matches === max_matches){
                //win condition
                // alert("you won")
                games_played++;
                console.log("games played: ",games_played)

                attempts = 0;
                console.log('attempts:', attempts)
                matches = 0;
                console.log('matches: ', matches)

                $('#modalBody').removeClass("hide");

                // this lets you restart the game:
                // exit button selector
                // click exit button -> hide modal (ADD HIDE CLASS TO MODAL)

                //

            }
            console.log('match:',matches);

            if(firstCardClicked && secondCardClicked){
                firstCardClicked = null;
                secondCardClicked = null;
            }
        }
        else if(firstCardClicked !== secondCardClicked){
            console.log("not a match");
            setTimeout(function(){
                firstCard.removeClass('hidden');
                secondCard.removeClass('hidden')
            },1500);


            if(firstCardClicked && secondCardClicked){
                firstCardClicked = null;
                secondCardClicked = null;
            }
        }
    }
}








// console.log('Event:', event.currentTarget);




// jQuery reference for the first card you clicked

// firstCardClicked = $(this);
//
// if(firstCardClicked){
//     secondCardClicked = $(this)
// }
//
// if(firstCardClicked === secondCardClicked){
//     console.log("it's a match")
// }

