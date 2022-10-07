//! 04-drop.js
$(function() {
    console.log('start drop');

    let $drop = $('.drop'),
        $head = $drop.find('.head');

    $drop.find('.toggle').click(function() {
        console.log($(this));
        $(this).parent().toggleClass('open')
        if ($(this).hasClass('open')) $drop.on('shown.bs.dropdown');
    })

    if($('.drop .head')[0]) {
        $head.parent().each(function (){
            console.log($(this).find('.body').height());
            if ($(this).hasClass('open')) $(this).css({'--h':($(this).find('.body').innerHeight())+'px'});
            else $(this).css({'--h':0});
        })
        $head.click(function() {
            if ($(this).parent().hasClass('open')) $(this).parent().removeClass('open').css({'--h': 0});
            else $(this).parent().addClass('open').css({'--h': ($(this).parent().find('.body').innerHeight()) + 'px'});
        })

    }

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.toggle')) {
            $('.drop.wb .in').each(function (){
                $(this).parent().removeClass('open');
            })
        }
    }

});