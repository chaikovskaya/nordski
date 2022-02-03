$( function() {
    $('#datepicker').datepicker({showOn: "button", buttonText: ""});
    $(".selectSexForm").selectric();
} );
/*
$('.input_right_image.input_right_image_pass').mousedown(function()
{
    $(this).prev()[0]['type'] = "text";
    $(this).prev().css("font-size", "12px");
});
$('.input_right_image.input_right_image_pass').mouseup(function()
{
    $(this).prev()[0]['type'] = "password";
    $(this).prev().css("font-size", "16px");
});
*/
function initSelSexForm() {
    $('.selectSexForm').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

var sliderClubPurchaseProducts;
function initSliderClubPurchaseProducts() {
    jQuery('.js-slider-ClubPurchase-products').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-ClubPurchase-products",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;
        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index");
            index = parseInt(index, 10) + 1;
                //index=Math.floor(index/3) + 1;//костылирую для того чтобы 1 страница симулировала 1 элемент для текущего слайда
                index =  '0' + index;

            $slider.find('.js-slider-current').html(index);
        }

        ClubPurchaseProducts = new Swiper(sliderClass, {
            loop: isStart,
            pagination: {
                el: '.js-slider-pagination',
                type: "progressbar",
            },
            navigation: {
                nextEl: ".js-slider-next",
                prevEl: ".js-slider-prev",
                disabledClass: "slider-button_disabled",
            },
            spaceBetween: 10,
            breakpoints: {
                720: {
                    slidesPerView: 2,
                    slidesPergroup: 2,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 3,
                    slidesPergroup: 3,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
                        //length=Math.floor(length/3);//костылирую для того чтобы 1 страница симулировала 1 элемент для кол-ва слайдов
                        if(!length)
                            length=1;
                        length =  '0' + length;
                    }
                    $slider.find('.js-slider-amount').html(length);
                },
                init: function () {
                    _buildSliderCounter();
                },
                slideChangeTransitionEnd: function () {
                    _buildSliderCounter();
                },
            },
        });
    });
}


function initAjaxMoreLookBook() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        success: function () {
            initProgressbar();
        }
    };

    $('.JS-AjaxMore-LookBook').not('.JS-AjaxMore-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

$(document).ready(function () {
    initSelSexForm();
    initSliderClubPurchaseProducts();
    initAjaxMoreLookBook();
});
