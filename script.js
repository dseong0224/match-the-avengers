$(document).ready(function(){
    $('.card').click(handleCardClick);
})

function handleCardClick(event) {

    console.log('Card clicked', $(this).find('.back'));

    $('.card').find('.back').addClass('hidden')

}