$( document ).ready(function() {
    let header = $('body > header'),
        dropDown = $('.drop'),
        prevScroll = $(window).scrollTop(),
        actScroll = $(window).scrollTop();

    $(window).on('scroll', function() {
        actScroll = $(window).scrollTop();
        if (actScroll > 100 && actScroll <= 250) {
            dropDown.removeClass('open');
            if ((actScroll-5) > prevScroll) header.addClass('hide');
        }

        if (actScroll > 250) {
            dropDown.removeClass('open');
            if ((actScroll+5) < prevScroll) header.addClass('fixh').removeClass('transparent');
            else if ((actScroll-5) > prevScroll) header.addClass('transparent').removeClass('fixh');
            if ((actScroll+10) < prevScroll) header.removeClass('hide');
        } else {
            if (actScroll <= 100) header.removeClass('hide');
            if (actScroll <= 0) header.removeClass('fixh transparent');
        }

        prevScroll = actScroll;
    });
});