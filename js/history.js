
function initSliderHistory() {
    $(".js-slider-history").each(function(){
        var $element = $(this),
            $list = $element.find('.js-slider-list'),
            $buttons = $element.find('.js-slider-buttons'),
            $pager = $element.find('.js-slider-pager'),
            $item = $list.find('.js-slider-item');

        var isLoop = $item.length > 1 ? true : false;

        $list.owlCarousel(jQuery.extend({}, GLOBAL.owl.common, {
            loop: isLoop,
            mouseDrag: isLoop,
            touchDrag: isLoop,
            nav: true,
            autoHeight: false,
            smartSpeed: 600,
            responsive: {
                0: {
                    items: 1,
                    margin: 15,
                },
                720: {
                    items: 1,
                    margin: 15,
                },
                992: {
                    items: 1,
                    margin: 30,
                },
            },
            navContainer: $buttons,
            dotsContainer: $pager,
            onInitialize: function (event) {
            },
        }));
    });
}

function initDragging() {
    new ScrollBooster({
        viewport: document.querySelector('.js-dragging'),
        content: document.querySelector('.js-dragging-content'),
        scrollMode: 'transform',
        direction: 'horizontal',
        bounceForce: 0.2,
    });
}

function initAjaxHistory() {
    $(".js-history").each(function() {
        var $element = $(this),
            $url = $element.data('src');

        $('.js-preloader').removeClass('g-hidden');

        $.ajax({
            url: $url,
            method: "POST",
            dataType: "html",
            success: function (data) {
                if (data) {
                    $element.html(data);
                }

                initTab();
                initDragging();
                initSliderHistory();

                $('.js-preloader').addClass('g-hidden');
            }
        });
    });
}

$(document).ready(function () {
    initSliderHistory();
    initAjaxHistory();
});
