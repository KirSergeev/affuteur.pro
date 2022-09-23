let ShowAnim = {};

$(function () {
    ShowAnim = $.extend({}, {
        timer: null,
        busy: false,
        scroll_padding: 0,
        effects_padding: 0,
        refresh: function () {
        }
    }, typeof ShowAnim !== 'undefined' ? ShowAnim : {});

    ShowAnim.refresh = function () {
        let $window = $(window);
        let $document = $(document);
        let $body = $(document.body);
        let i = 0;
        let window_top = ShowAnim.effects_padding;
        let window_bottom = $window.height() - ShowAnim.effects_padding;
        let document_top = ShowAnim.scroll_padding;
        let document_bottom = $document.height() - ShowAnim.scroll_padding;

        if ($window.scrollTop() === 0) {
            if (!$body.hasClass('at-top')) {
                $body.addClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
            }
        } else if ($window.scrollTop() + $window.height() === $document.height()) {
            if (!$body.hasClass('at-bottom')) {
                $body.addClass('at-bottom').removeClass('at-top').removeClass('near-top').removeClass('near-bottom');
            }
        } else if ($window.scrollTop() <= document_top) {
            if (!$body.hasClass('near-top')) {
                $body.addClass('near-top').removeClass('near-bottom').removeClass('at-top').removeClass('at-bottom');
            }
        } else if ($window.scrollTop() + $window.height() >= document_bottom) {
            if (!$body.hasClass('near-bottom')) {
                $body.addClass('near-bottom').removeClass('near-top').removeClass('at-top').removeClass('at-bottom');
            }
        } else {
            if ($body.hasClass('at-top') || $body.hasClass('at-bottom') || $body.hasClass('near-top') || $body.hasClass('near-bottom')) {
                $body.removeClass('at-top').removeClass('at-bottom').removeClass('near-top').removeClass('near-bottom');
            }
        }


        $('*[class*="sh-anim"]').each(function () {
            i++;
            let element = this;
            let $element = $(element);
            let element_bounding = element.getBoundingClientRect();

            let position_class = undefined;

            // if ($element.hasClass('slBox')) {
            //     console.log(
            //         'element_bounding.top - ' + element_bounding.top +
            //         '\nelement_bounding.bottom - ' + element_bounding.bottom +
            //         '\nwindow_top - ' + window_top +
            //         '\nwindow_bottom - ' + window_bottom +
            //         '\n-----------'
            //     );
            // }

            let prEl = window_bottom / 100;
            let elOpa = 0;

            if ($element.hasClass('slBox')){
                if (element_bounding.top > window_bottom ) {
                    elOpa = 0;
                } else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom)  {
                    elOpa = ((element_bounding.top - window_bottom) / prEl * -1) ;
                    // console.log('--elOpa--');
                    // console.log(elOpa);
                    elOpa = elOpa - ((1 - elOpa)/10);
                    // console.log(elOpa);
                    // console.log('--elOpa--');
                } else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
                    elOpa = element_bounding.bottom / prEl ;
                } else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
                    elOpa = 0;
                } else {
                    elOpa = 100;
                }
                console.log(elOpa);
                $element.css({'--tran':elOpa+'px'})

            }

            if (element_bounding.top > window_bottom ) {
                position_class = 'sh-anim-below';
            } else if ((element_bounding.top + 150) < window_bottom && (element_bounding.bottom) > window_bottom) {
                position_class = 'sh-anim-partially-below-quot'
            } else if (element_bounding.top < window_bottom && element_bounding.bottom > window_bottom) {
                position_class = 'sh-anim-partially-below'
            } else if (element_bounding.top < window_top && element_bounding.bottom < window_top) {
                position_class = 'sh-anim-above';
            } else if (element_bounding.top < window_top && (element_bounding.bottom - 250) < window_top) {
                position_class = 'sh-anim-above-quot'
            } else if (element_bounding.top < window_top && element_bounding.bottom > window_top) {
                position_class = 'sh-anim-partially-above'
            } else {
                position_class = 'sh-anim-within';
            }

            // console.log(element_bounding.top - window_top);

            if ($element.hasClass('sh-anim-load') && !$element.hasClass('sh-anim-within')) {
                $element.removeClass('sh-anim-below sh-anim-partially-below sh-anim-within sh-anim-partially-above sh-anim-above sh-anim-partially-below-quot sh-anim-above-quot');
                $element.addClass('sh-anim-within');
            } else if ($element.hasClass('sh-anim-partially-above') || $element.hasClass('sh-anim-partially-below') || $element.hasClass('sh-anim-within')) {
                $element.removeClass('sh-anim-partially-below-quot sh-anim-above-quot');
            } else if ($element.hasClass('sh-anim-partially-above') || $element.hasClass('sh-anim-above')) {
                $element.removeClass('sh-anim-partially-below-quot sh-anim-above-quot');
            }

            if (!$element.hasClass(position_class) && !$element.hasClass('sh-anim-load')) {
                if ($element.hasClass('sh-anim-once')) {
                    if (!$element.hasClass('sh-anim-within')) {
                        $element.removeClass('sh-anim-below sh-anim-partially-below sh-anim-within sh-anim-partially-above sh-anim-above sh-anim-partially-below-quot sh-anim-above-quot');
                        $element.addClass(position_class);
                    }
                    if ($element.hasClass('sh-anim-partially-above') || $element.hasClass('sh-anim-above')) {
                        $element.addClass('sh-anim-within');
                    }
                } else {
                    $element.removeClass('sh-anim-below sh-anim-partially-below sh-anim-within sh-anim-partially-above sh-anim-above sh-anim-partially-below-quot sh-anim-above-quot');
                    $element.addClass(position_class);
                }
            }
        });
    };

    $(window).bind('scroll resize load ready', function () {
        if (!ShowAnim.busy) {
            ShowAnim.busy = true;
            setTimeout(function () {
                ShowAnim.busy = false;
                ShowAnim.refresh();
            }, 150);
        }
    });
});