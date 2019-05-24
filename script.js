$(document).ready(function(){
    $('.card').click(handleCardClick);
})


//might have to make a conditional that restricts double clicks

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;

var firstCard = null;
var secondCard = null;

var max_matches = 9

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

        if(firstCardClicked === secondCardClicked){
            console.log("it's a match");
            //flipped cards should not be clicked

            if(matches < max_matches) {
                matches += 1;
            }
            if(matches === max_matches){
                //win condition
                alert("you won")
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

