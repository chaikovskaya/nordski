/*--GLOBAL--*/
var GLOBAL = GLOBAL || {};
GLOBAL.widthWindow = GLOBAL.widthWindow || {};
GLOBAL.FORMERROR = GLOBAL.FORMERROR || {};
GLOBAL.FORMERROR.REQUIRED = GLOBAL.FORMERROR.REQUIRED || '';
GLOBAL.FORMERROR.EMAIL = GLOBAL.FORMERROR.EMAIL || '';
GLOBAL.mobile = GLOBAL.mobile || 720;
GLOBAL.tablet = GLOBAL.tablet || 992;
GLOBAL.columnsStartLength = GLOBAL.columnsStartLength || 0;

GLOBAL.parseData = function parseData(data) {
    try {
        data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
        data = {};
    }
    return data;
};


GLOBAL.owl = GLOBAL.owl || {};
GLOBAL.owl.common = GLOBAL.owl.common || {};
GLOBAL.owl.common.loop = true;
GLOBAL.owl.common.dots = false;
GLOBAL.owl.common.margin = 0;
GLOBAL.owl.common.responsiveClass = true;
GLOBAL.owl.common.autoHeight = true;
GLOBAL.owl.common.mouseDrag = true;
GLOBAL.owl.common.nav = false;
/*--/global--*/

function isMobile() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    } else {
        return false;
    }
}

function initDropdown() {
    if (typeof(Dropdown) === 'undefined' || !jQuery.isFunction(Dropdown)) {
        return false;
    }

    var common = {};

    $('.JS-Dropdown').not('.JS-Dropdown-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropdown'));
        new Dropdown(this, jQuery.extend({}, common, local));
    });
}

function initMobileMenu() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-MobileMenu').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}


function initScroll() {
    $('.js-custom-scroll').each(function(){
        var customScroll = this;
        new SimpleBar(customScroll, {
            autoHide: false
        });
    });
}

function initScrollUp() {
    $(window).scroll(function(){
        var position = $(window).scrollTop(),
            positionBlock = $('.js-main-content').scrollTop();

        if (position > positionBlock) {
            $('body').addClass('main-content-animate');
        } else {
            $('body').removeClass('main-content-animate');
        }
    });
}

function initFieldText() {
    if (typeof(FieldText) === 'undefined' || !jQuery.isFunction(FieldText)) {
        return false;
    }

    var common = {};

    jQuery('.JS-FieldText').not('.JS-FieldText-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('fieldtext'));
        new FieldText(this, jQuery.extend({}, common, local));
    });
}

function initValidate($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-form-validate');
    }

    $element.each(function() {
        var $element = jQuery(this),
            validator;

        validator = $element.validate({
            errorClass: 'form-error',
            validClass: 'form-success',
            submitHandler: function(form) {
                if (typeof(ajaxSubmit) == 'function') {
                    ajaxSubmit(form);
                }
            }
        });

        $.validator.messages.required = GLOBAL.FORMERROR.REQUIRED;
        $.validator.messages.email = GLOBAL.FORMERROR.EMAIL;
    });
}

function initMask() {
    $('.js-mask-phone').inputmask({
        mask: '+7 (X99) 999-99-99',
        "tabThrough": true,
        "showMaskOnHover": false,
        definitions: {
            'X': {
                validator: "9"
            }
        }
    });

    $('.js-mask-email').inputmask({
        alias: "email",
        "tabThrough": true,
        "showMaskOnHover": false,
    });
}

function initForm() {
    jQuery('.js-form').each(function() {
        var $checkbox = $(this).find('.js-form-checkbox'),
            $button = $(this).find('.js-form-button'),
            classDisabled = $(this).data('form-disabled');

        if ($checkbox.is(':checked')) {
            $button.removeClass(classDisabled);
        } else {
            $button.addClass(classDisabled);
        }

        $checkbox.on("change", function(e) {
            e.stopPropagation();
            if ($checkbox.is(':checked')) {
                $button.prop("disabled", false);
                $button.removeClass(classDisabled);
            } else {
                $button.prop("disabled", true);
                $button.addClass(classDisabled);
            }
        });
    });
}

function initSliderBanner() {
    var sliderClass = ".js-slider-banner";

    var swiper = new Swiper(sliderClass, {
        loop: true,
        slidesPerView: "auto",
        pagination: false,
        navigation: {
            nextEl: ".js-slider-next",
            prevEl: ".js-slider-prev",
        },
        breakpoints: {
            0: {
                simulateTouch: false,
            },
            720: {
                simulateTouch: false,
            },
            992: {
            },
        },
        on: {
            beforeInit: function () {
                var length = $(sliderClass).find('.swiper-slide').length;
                if (length < 10) {
                    length =  '0' + length;
                }
                $(sliderClass).find('.js-slider-amount').html(length);
            },
            init: function () {
                var index = $(sliderClass).find('.swiper-slide-active').attr("data-swiper-slide-index");
                index = parseInt(index, 10) + 1;
                if (index < 10) {
                    index =  '0' + index;
                }

                $(sliderClass).find('.js-slider-current').html(index);
            },
            slideChangeTransitionEnd: function () {
                var index = $(sliderClass).find('.swiper-slide-active').attr("data-swiper-slide-index");

                index = parseInt(index, 10) + 1;
                if (index < 10) {
                    index =  '0' + index;
                }

                $(sliderClass).find('.js-slider-current').html(index);
                $('.js-slider-banner-detail').removeClass('main-banner-detail-item_active').eq(index - 1).addClass('main-banner-detail-item_active');
            },
        },
    });
}

function initSliderMobGallery() {
    var sliderClass = ".js-slider-mobgallery";

    var swiper = new Swiper(sliderClass, {
        loop: true,
        pagination: false,
        navigation: false,
        slidesPerView: "auto",
        spaceBetween: 10,
        breakpoints: {
            0: {
                simulateTouch: false,
            },
            720: {
                simulateTouch: false,
            },
            992: {
            },
        },
    });
}

function initSliderLinks() {
    var sliderClass = ".js-slider-links";

    var swiper = new Swiper(sliderClass, {
        loop: false,
        pagination: false,
        navigation: false,
        slidesPerView: "auto",
        resistance: true,
        resistanceRatio: 0,
    });
}

var sliderProducts;
function initSliderProducts() {
    jQuery('.js-slider-products').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index") || 0;
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderProducts = new Swiper($slider[0], {
            loop: isStart,
            pagination: {
                el: $slider.find('.js-slider-pagination')[0],
                type: "progressbar",
            },
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            spaceBetween: 10,
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    simulateTouch: false,
                },
                720: {
                    slidesPerView: 2,
                    simulateTouch: false,
                    speed: 100,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var mozaic = '';
function initMozaic() {
    $('.js-mozaic').each(function() {
        mozaic = $(this).masonry({
            itemSelector: '.js-mozaic-item',
            columnWidth: '.js-mozaic-item',
            percentPosition: true
        });
    });
}
function reInitMozaic() {
    if (mozaic != '') {
        $('.js-mozaic').masonry('destroy');
    }
}

function initSwitch() {
    $('.js-switch').each(function() {
        var $img = $(this).find('.js-switch-img'),
            $link = $(this).find('.js-switch-link'),
            classActive = 'products-img_active';

        if ($link.length == 1) {
            $link.hide();
        }

        $link.hover(function(){
            var index = $(this).index();

            $img.removeClass(classActive);
            $img.eq(index).addClass(classActive);
        });
    });
}

var sliderLookbook;
function initSliderLookbook() {
    jQuery('.js-slider-lookbook').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index") || 0;
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderLookbook = new Swiper($slider[0], {
            loop: isStart,
            pagination: {
                el: $slider.find('.js-slider-pagination')[0],
                type: "progressbar",
            },
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: 1,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: -16,
                },
                720: {
                    simulateTouch: false,
                    spaceBetween: -55,
                },
                992: {
                    spaceBetween: -70,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var sliderArticles;
function initSliderArticles() {
    jQuery('.js-slider-articles').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-articles",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index");
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderArticles = new Swiper(sliderClass, {
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
            slidesPerView: "auto",
            autoHeight: true,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 10,
                    initialSlide: 1,
                },
                720: {
                    simulateTouch: false,
                    spaceBetween: 10,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    spaceBetween: 30,
                    loop: sliderLength > 3 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var sliderKinds;
function initSliderKinds() {
    jQuery('.js-slider-kinds').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-kinds",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index");
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderKinds = new Swiper(sliderClass, {
            loop: isStart,
            autoplay:{
                delay:3000
            },
            pagination: {
                el: '.js-slider-pagination',
                type: "progressbar",
            },
            navigation: {
                nextEl: ".js-slider-next",
                prevEl: ".js-slider-prev",
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: "auto",
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: -59,
                 },
                720: {
                    simulateTouch: false,
                    spaceBetween: -84,
                },
                992: {
                    spaceBetween: -84,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var sliderAdditionalProducts;
function initSliderAdditionalProducts() {
    jQuery('.js-slider-additional-products').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-additional-products",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index");
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderAdditionalProducts = new Swiper(sliderClass, {
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
                0: {
                    slidesPerView: 1,
                    simulateTouch: false,
                },
                720: {
                    slidesPerView: 2,
                    simulateTouch: false,
                    speed: 100,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                1440: {
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var sliderSimilarProducts;
function initSliderSimilarProducts() {
    jQuery('.js-slider-similar-products').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-similar-products",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index");
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderSimilarProducts = new Swiper(sliderClass, {
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
                0: {
                    slidesPerView: 1,
                    simulateTouch: false,
                },
                720: {
                    slidesPerView: 2,
                    simulateTouch: false,
                    speed: 100,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 3,
                    loop: sliderLength > 3 ? true : false,
                },
                1440: {
                    slidesPerView: 4,
                    loop: sliderLength > 4 ? true : false,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

var sliderBlog;
function initSliderBlog() {
    jQuery('.js-slider-blog').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-blog",
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        sliderBlog = new Swiper(sliderClass, {
            loop: false,
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
                0: {
                    slidesPerView: 1,
                    simulateTouch: false,
                    loop: isStart,
                },
                720: {
                    slidesPerView: 2,
                    simulateTouch: false,
                    speed: 100,
                    loop: sliderLength > 2 ? true : false,
                },
                992: {
                    slidesPerView: 3,
                },
            },
        });
    });
}

function initPassword() {
    jQuery('.js-password').each(function() {
        var $element = jQuery(this),
            $link = $element.find('.js-password-link'),
            $input = $element.find('.js-password-input'),
            $classActive = $element.data('password');

        $link.on("click", function() {
            $element.toggleClass($classActive);
            if ($input.attr('type') == 'password') {
                $input.attr('type','text');
            } else {
                $input.attr('type','password');
            }
        });
    });
}

function initTab() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
        return false;
    }

    var common = {};

    jQuery('.JS-Tab').not('.JS-Tab-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('tab'));
        new Tab(this, jQuery.extend({}, common, local));
    });
}

function initPopup() {
    $(".js-popup").fancybox({
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>",
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function openPopupProfile($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-profile');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initPopupRegistration();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupProfile() {
    $(".js-open-profile").on('click', function() {
        $.fancybox.close();
        openPopupProfile($(".js-open-profile"));
    });
}

function openPopupRegistration($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-registration');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initPassword();
            initTab();
            initPopupForgotPassword();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupRegistration() {
    $(".js-open-registration").on('click', function() {
        $.fancybox.close();
        openPopupRegistration($(".js-open-registration"));
    });
}

function openPopupCode(srcData) {
    $.fancybox.open({
        src  : srcData,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initPopupRegistration();
            initPopupProfile();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupCode() {
    $(".js-open-code").on('click', function() {
        $.fancybox.close();
        openPopupCode($(".js-open-code"));
    });
}

function openPopupForgotPassword($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-forgot-password');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initPopupRegistration();
         },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupForgotPassword() {
    $(".js-open-forgot-password").on('click', function() {
        $.fancybox.close();
        openPopupForgotPassword($(".js-open-forgot-password"));
    });
}

function openPopupSubscribe($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-subscribe');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
         },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupSubscribe() {
    $(".js-open-subscribe").on('click', function() {
        $.fancybox.close();
        openPopupSubscribe($(".js-open-subscribe"));
    });
}

function initPopupGallery() {
    $(".js-popup-gallery").fancybox({
        loop: true,
        infobar: false,
        toolbar  : false,
        smallBtn : true,
        arrows : false,
        animationEffect: "fade",
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>",
        },
        beforeClose: function (instance) {
        },
        afterLoad: function(instance, current) {
            if ( instance.group.length > 1 && current.$content ) {
                current.$content.append('' +
                    '<div class="fancybox-nav-block">' +
                    '<button class="fancybox-button fancybox-button--arrow_left prev" data-fancybox-prev>' +
                    '<i class="fancybox-button-icon fancybox-button-icon_left fa fa-angle-left"></i></button>' +
                    '<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next>' +
                    '<i class="fancybox-button-icon fancybox-button-icon_right fa fa-angle-right"></i></button>' +
                    '</div>'
                );
            }
        }
    });
}

function openPopupFastbuy($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-fastbuy');
    }

    var url = $element.data('src') + '?id=' + $element.attr('data-id') + '&quantity=' + $element.attr('data-quantity');

    $.fancybox.open({
        src  : url,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
            initTextareaSize();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupFastbuy() {
    $(".js-open-fastbuy").on('click', function() {
        console.log("true");
        $.fancybox.close();
        openPopupFastbuy($(".js-open-fastbuy"));
    });
}

function openPopupProductArrival($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-product-arrival');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initValidate(data.$refs.container.find('.js-form-validate'));
            initFieldText();
            initForm();
            initMask();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupProductArrival() {
    $(".js-open-product-arrival").on('click', function() {
        openPopupProductArrival($(this));
    });
}

function openPopupBasket(srcData) {
    $.fancybox.open({
        src  : srcData,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function openPopupParams(srcData) {
    $.fancybox.open({
        src  : srcData,
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initTooltip();
            initPopupProductArrival();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initQuantity() {
    if (typeof(Quantity) === 'undefined' || !jQuery.isFunction(Quantity)) {
        return false;
    }

    var common = {};

    $('.JS-Quantity').not('.JS-Quantity-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('quantity'));
        new Quantity(this, jQuery.extend({}, common, local));
    });
}

function initPopupProduct() {
    $(".js-popup-product").fancybox({
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        },
        afterShow: function (data) {
            initQuantity();
            initShowMore();
            initGalleryCard();
            initTooltip();
            initAccordion();
            initPopupGallery();
            initPopupSizeChart();
            initPopupProductArrival();

            let basket = new Basket;
            basket.initDOMEvents();
        },
    });
}

function openPopupSizeChart($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-size-chart');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        touch: false,
        afterShow: function (data) {
            initScroll();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupSizeChart() {
    $(".js-open-size-chart").on('click', function() {
        openPopupSizeChart($(".js-open-size-chart"));
    });
}

function initSearch() {
    $('.js-search').each(function(){
        var $element = $(this),
            classDynamic = $(this).data('search-dynamic'),
            $input = $(this).find('.js-search-input'),
            $link = $(this).find('.js-search-reset');

        $link.on('click', function(e, data) {
            $input.val('');
            $element.removeClass(classDynamic);
        });

        $input.on('input', function(e, data) {
            var val = $input.val();
            if (val != '') {
                $element.addClass(classDynamic);
            } else {
                $element.removeClass(classDynamic);
            }
        });
    });
}

function initDropdownSearch() {
    if (typeof(DropSearch) === 'undefined' || !jQuery.isFunction(DropSearch)) {
        return false;
    }

    var common = { };

    $('.JS-DropSearch').not('.JS-DropSearch-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('dropsearch'));
        new DropSearch(this, jQuery.extend({}, common, local));
    });
}

function initScrollTop() {
    var $scrolltop = $('.js-scrolltop'),
        scrolltopActiveClass = $scrolltop.data('scrolltop');

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1) {
            $scrolltop.addClass(scrolltopActiveClass);
        } else {
            $scrolltop.removeClass(scrolltopActiveClass);
        }
    });
    $scrolltop.click(function(){
        $('html, body').animate({scrollTop: '0px'}, 500);
        return false;
    });
}

function initExpand() {
    jQuery('.js-expand').each(function() {
        var $element = $(this),
            $block = $element.find('.js-expand-block'),
            $link = $element.find('.js-expand-link'),
            local = GLOBAL.parseData(jQuery(this).data('expand')),
            classActive = local.classActive || 'active',
            classShow = local.classShow || 'show',
            heightParent = parseInt($block.css('min-height'),10) || 26,
            heightChild = $block.height();

        if (heightChild > heightParent) {
            $element.addClass(classActive);

            $link.on("click", function() {
                $element.addClass(classShow);
            });
        }
    });
}

function initAccordion() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion').not('.JS-Accordion-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

var sliderCatalogCategory = undefined;
function initSliderCatalogCategory() {
    jQuery('.js-slider-catalog-category').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-catalog-category";

        var isStart = $slider.find('.swiper-slide').length > 1 ? true : false;

        sliderCatalogCategory = new Swiper(sliderClass, {
            loop: isStart,
            pagination: false,
            navigation: false,
            slidesPerView: 1,
            autoHeight: true,
            spaceBetween: 10,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    initialSlide: 1,
                },
                720: {
                    simulateTouch: false,
                },
                992: {
                },
            },
        });
    });
}
function reInitSliderCatalogCategory() {
    if (sliderCatalogCategory) {
        sliderCatalogCategory.destroy();
    }
    sliderCatalogCategory = undefined;
}

function initShowMore(showmoreExtra) {
    if (typeof(ShowMore) === 'undefined' || !jQuery.isFunction(ShowMore)) {
        return false;
    }
    var common = { },
        showmoreExtra = showmoreExtra || {};

    $('.JS-ShowMore').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('showmore'));
        new ShowMore(this, jQuery.extend({}, common, local, showmoreExtra));
    });
}

function initSelect() {
    $('.js-select').selectric({
        disableOnMobile: false,
        nativeOnMobile: false,
        arrowButtonMarkup: '<b class="selectric-button"><i class="selectric-icon"></i></b>',
    });
}

function initAjaxMoreProducts() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        success: function () {
            initPopupProduct();
            initProgressbar();
        }
    };

    $('.JS-AjaxMore-Products').not('.JS-AjaxMore-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

function initAjaxMoreVacancies() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        success: function () {
            initProgressbar();
        }
    };

    $('.JS-AjaxMore-Vacancies').not('.JS-AjaxMore-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

function initAjaxMoreBlog() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        success: function () {
            initProgressbar();
            initPopup();
        }
    };

    $('.JS-AjaxMore-Blog').not('.JS-AjaxMore-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

function initPopupFilter() {
    if (typeof(MobileMenu) === 'undefined' || !jQuery.isFunction(MobileMenu)) {
        return false;
    }

    var common = {};

    jQuery('.JS-PopupFilter').not('.JS-MobileMenu-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('mobilemenu'));
        new MobileMenu(this, jQuery.extend({}, common, local));
    });
}

function initSliderRange() {
    jQuery('.js-slider-range').each(function() {
        var $element = $(this),
            $track = $element.find('.js-slider-range-track');

        var min = Number($(this).find('.min-price').attr('data-value'));
        var max = Number($(this).find('.max-price').attr('data-value'));

        var curMin = Number($(this).find('.min-price').attr('value'));
        var curMax = Number($(this).find('.max-price').attr('value')) || max;

        //var price_id = $(this).attr('data-code');

        $track.slider({
            range: true,
            min: min,
            max: max,
            drag: true,
            values: [curMin, curMax],
            classes: {
                "ui-slider-handle": "slider-range-button",
                "ui-slider-range": "slider-range-quantity"
            },
            slide: function (event, ui) {
                if (ui.values[0] <= min) ui.values[0] = '';
                if (ui.values[1] >= max) ui.values[1] = '';
                $element.find('.js-slider-range-min').val(ui.values[0]);
                $element.find('.js-slider-range-max').val(ui.values[1]);
                $element.find('.js-slider-range-min').trigger('keyup');
            },
            stop: function (event, ui) {
                if (ui.values[0] <= min) ui.values[0] = '';
                if (ui.values[1] >= max) ui.values[1] = '';
                $element.find('.js-slider-range-min').val(ui.values[0]);
                $element.find('.js-slider-range-max').val(ui.values[1]);
                $element.find('.js-slider-range-min').trigger('keyup');
            }
        });
    });
}

function initGalleryCard() {
    var galleryThumbs = new Swiper(".js-gallery-card-thumbs", {
        loop: true,
        centeredSlides: false,
        centeredSlidesBounds: false,
        direction: "vertical",
        spaceBetween: 10,
        slidesPerView: "auto",
        autoHeight: true,
        freeMode: false,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        watchOverflow: true,
        navigation: false,
        breakpoints: {
        }
    });
    var galleryTop = new Swiper(".js-gallery-card-main", {
        loop: true,
        direction: "horizontal",
        spaceBetween: 0,
        navigation: {
            nextEl: ".js-slider-next",
            prevEl: ".js-slider-prev",
        },
        pagination: {
            el: '.js-slider-bullets',
            type: 'bullets',
            clickable: true,
        },
        thumbs: {
            swiper: galleryThumbs
        },
    });
    $(".js-gallery-card-prev").on('click', function(e) {
        galleryTop.slidePrev();
    });
    $(".js-gallery-card-next").on('click', function(e) {
        galleryTop.slideNext();
    });
};

function initTooltip() {
    $('.js-tooltip').each(function() {
        var $content = $(this).find('.js-tooltip-content'),
            classElement = $(this).data('tooltip-class');

        Tipped.create($(this), $content, {
            position: 'top',
            size: 'x-small',
            skin: 'light',
            hideOthers: true,
        });
    });
}

function initProgressbar() {
    $('.js-progressbar').each(function() {
        var $indicator = $(this).find('.js-progressbar-indicator'),
            $amount = $(this).find('.js-progressbar-amount'),
            $total = $(this).find('.js-progressbar-total').text(),
            $item = $(this).find('.js-progressbar-item'),
            index = $(this).data('progressbar-index');

        var amount = $item.last().data('progressbar-index');
        $amount.html(amount);

        if ($total > amount) {
            var result = (amount * 100)/$total;
            $indicator.css('width', result + '%');
        }
    });
}

function initSliderSubcategory() {
    jQuery('.js-slider-subcategory').each(function() {
        var $slider = $(this),
            sliderClass = ".js-slider-subcategory";

        var isStart = $slider.find('.swiper-slide').length > 1 ? true : false;

        new Swiper(sliderClass, {
            loop: isStart,
            pagination: false,
            navigation: {
                nextEl: ".js-slider-next",
                prevEl: ".js-slider-prev",
            },
            spaceBetween: 10,
            breakpoints: {
                0: {
                    simulateTouch: false,
                    slidesPerView: 2,
                },
                720: {
                    simulateTouch: false,
                    slidesPerView: 4,
                },
                992: {
                    slidesPerView: 8,
                },
            },
            on: {
            },
        });
    });
}

function initTextareaSize() {
    $('.js-textarea-size').on('input', function (e) {
        e.target.style.innerHeight = 'auto';
        e.target.style.height = e.target.scrollHeight + "px";
    });
}

function initAccordionCard() {
    if (typeof(Accordion) === 'undefined' || !jQuery.isFunction(Accordion)) {
        return false;
    }

    var common = {};

    $('.JS-Accordion-Card').not('.JS-Accordion-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('accordion'));
        new Accordion(this, jQuery.extend({}, common, local));
    });
}

function initTabCard() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
        return false;
    }

    var common = {};

    jQuery('.JS-Tab-Card').not('.JS-Tab-ready').each(function() {
        var local = GLOBAL.parseData(jQuery(this).data('tab'));
        new Tab(this, jQuery.extend({}, common, local));
    });
}

function initAdaptiveMenu() {
    $('.js-adaptivemenu').each(function() {
        var $navItemMore = $(this).find('.js-adaptivemenu-more'),
            $navItems = $(this).find('.js-adaptivemenu-item'),
            targetClass = '.js-adaptivemenu-target',
            navItemWidthMore = $navItemMore.width(),
            windowWidth = $(this).width(),
            navItemWidth = 0;

        $navItemMore.before($(targetClass + ' > .js-adaptivemenu-item'));

        $navItems.each(function () {
            navItemWidth += $(this).outerWidth();
        });

        navItemWidth > windowWidth ? $navItemMore.show() : $navItemMore.hide();

        while (navItemWidth > windowWidth) {
            navItemWidth -= $navItems.last().width();
            $navItems.last().prependTo(targetClass);
            $navItems.splice(-1, 1);
        }
    });
}

function initFixSticky() {
    var sticky = new Sticky('.js-fix-sticky', { });
}

function initSearchСountry() {
    $('.js-search-country').each(function(){
        var $element = $(this),
            classDynamic = $(this).data('search-dynamic'),
            $input = $(this).find('.js-search-input'),
            $link = $(this).find('.js-search-reset');

        $link.on('click', function(e, data) {
            $input.val('');
            $element.removeClass(classDynamic);
            initFind();
        });

        $input.on('input', function(e, data) {
            var val = $input.val();
            if (val != '') {
                $element.addClass(classDynamic);
            } else {
                $element.removeClass(classDynamic);
            }
        });
    });
}

function initFind() {
    $('.js-find').each(function () {
        var $element = $(this),
            $input = $element.find('.js-find-input'),
            $item = $element.find('.js-find-container'),
            $value = $element.find('.js-find-value'),
            classHide = $element.data('find-hide') || 'find-hide';

        function startFind() {
            var value = $input.val().toUpperCase();

            $item.removeClass(classHide);

            if (value.length) {
                for (let i = 0; i < $value.length; i++) {
                    var text = $($value[i]).text().toUpperCase();
                    if (!(text.indexOf(value) + 1)) {
                        $($value[i]).closest('.js-find-container').addClass(classHide);
                    }
                }
            }
        }
        startFind();

        $input.on('input', function(){
            startFind();
        });
    });
}

function openPopupCountry($element) {
    if (typeof($element) == 'undefined') {
        $element = $('.js-popup-country');
    }

    $.fancybox.open({
        src  : $element.data('src'),
        type : 'ajax',
        toolbar  : false,
        smallBtn : true,
        afterShow: function (data) {
            initSearchСountry();
            initScroll();
            initFind();
        },
        btnTpl: {
            smallBtn:
                '<button type="button" data-fancybox-close class="fancybox-close" title="{{CLOSE}}">' +
                '<i class="fancybox-close-icon las la-times"></i>' +
                "</button>"
        },
        lang: "ru",
        i18n: {
            ru: {
                CLOSE: "Закрыть",
            },
        }
    });
}

function initPopupCountry() {
    $(".js-open-country").on('click', function() {
        $.fancybox.close();
        openPopupCountry($(".js-open-country"));
    });
}

function initIndicator() {
    $('.js-indicator').each(function() {
        var $element = $(this),
            total = $element.data("indicator-total"),
            percent = $element.data("indicator-percent"),
            $value = $element.find('.js-indicator-value');

        var res = (total * percent)/100;
        if (res) {
            $value.attr('stroke-dasharray', res + ',' + total);
        }
    });
}

function initAjaxMoreOrders() {
    if (typeof(AjaxMore) === 'undefined' || !jQuery.isFunction(AjaxMore)) {
        return false;
    }

    var common = {
        success: function () {
            initAccordion();
        }
    };

    $('.JS-AjaxMore-Orders').not('.JS-AjaxMore-ready').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('ajaxmore'));
        new AjaxMore(this, jQuery.extend({}, common, local));
    });
}

var sliderPartners;
function initSliderPartners() {
    jQuery('.js-slider-partners').each(function() {
        var $slider = $(this),
            sliderLength = $slider.find('.swiper-slide').length;

        var isStart = sliderLength > 1 ? true : false;

        function _buildSliderCounter() {
            var index = $slider.find('.swiper-slide-active').attr("data-slider-index") || 0;
            index = parseInt(index, 10) + 1;
            if (index < 10) {
                index =  '0' + index;
            }

            $slider.find('.js-slider-current').html(index);
        }

        sliderPartners = new Swiper($slider[0], {
            loop: isStart,
            pagination: {
                el: $slider.find('.js-slider-pagination')[0],
                type: "progressbar",
            },
            navigation: {
                nextEl: $slider.find('.js-slider-next')[0],
                prevEl: $slider.find('.js-slider-prev')[0],
                disabledClass: "slider-button_disabled",
            },
            slidesPerView: "auto",
            centeredSlides: true,
            effect: 'creative',
            creativeEffect: {
                limitProgress: 2,
                prev: {
                    translate: ['-40%', 0, 0],
                    scale: 0.8,
                },
                next: {
                    translate: ['40%', 0, 0],
                    scale: 0.8,
                },
            },
            breakpoints: {
                0: {
                    simulateTouch: false,
                    spaceBetween: 0,
                },
                720: {
                    simulateTouch: false,
                    spaceBetween: 0,
                },
                992: {
                    spaceBetween: 0,
                },
            },
            on: {
                beforeInit: function () {
                    var length = $slider.find('.swiper-slide').length;
                    if (length < 10) {
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

function initSticky() {
    if (typeof(Sticky) === 'undefined' || !jQuery.isFunction(Sticky)) {
        return false;
    }

    var common = {
        update: function (){
        }
    };

    $('.JS-Sticky').each(function(){
        var local = GLOBAL.parseData(jQuery(this).data('sticky'));
        new StickyFix(this, jQuery.extend({}, common, local));
    });
}

function initResizeWindow() {
    var width = $(window).outerWidth();
    if (width <= GLOBAL.mobile) {
        GLOBAL.widthWindow = 'isMobile';
        reInitMozaic();
        if (sliderCatalogCategory == undefined) {
            initSliderCatalogCategory();
        }
        initAccordionCard();
    } else if (width <= GLOBAL.tablet) {
        GLOBAL.widthWindow = 'isTablet';
        initMozaic();
        if (sliderCatalogCategory != undefined) {
            reInitSliderCatalogCategory();
        }
        initAccordionCard();
    } else {
        GLOBAL.widthWindow = '';
        reInitMozaic();
        if (sliderCatalogCategory != undefined) {
            reInitSliderCatalogCategory();
        }
        initTabCard();
    }
}

$(document).ready(function () {
    initResizeWindow();
    $(window).resize(function(){
        initResizeWindow();
        initAdaptiveMenu();
        initSticky();
    });

    initDropdown();
    initMobileMenu();
    initScroll();
    initScrollUp();
    initFieldText();
    initValidate();
    initMask();
    initForm();
    initSliderBanner();
    initSliderMobGallery();
    initSliderLinks();
    initSliderProducts();
    initSwitch();
    initSliderLookbook();
    initSliderArticles();
    initSliderKinds();
    initSliderAdditionalProducts();
    initSliderSimilarProducts();
    initSliderBlog();
    initPopup();
    initPopupProfile();
    initPopupRegistration();
    initPopupSubscribe();
    initPopupProduct();
    initPopupGallery();
    initPassword();
    initPopupFastbuy();
    initPopupProductArrival();
    initPopupSizeChart();
    initTab();
    initSearch();
    initDropdownSearch();
    initScrollTop();
    initExpand();
    initAccordion();
    initShowMore();
    initSelect();
    initAjaxMoreProducts();
    initAjaxMoreVacancies();
    initAjaxMoreBlog();
    initPopupFilter();
    initSliderRange();
    initQuantity();
    initGalleryCard();
    initTooltip();
    initProgressbar();
    initSliderSubcategory();
    initTextareaSize();
    initAdaptiveMenu();
    initFixSticky();
    initPopupCountry();
    initFind();
    initIndicator();
    initAjaxMoreOrders();
    initSliderPartners();
    initSticky();
});
