$( function() {
    $('#datepicker').datepicker({showOn: "button", buttonText: ""});
    $(".selectSexForm").selectric();
} );

$('.js-add-extra-telephone').click(function(){
    var elem = $('.js-phone-item');
    $(".telephone-list-block").append($(".telephone-field:last").clone(true, true));
    $(".telephone-field:last").attr('name', 'phone'+ (elem.length + 1))
    $(".js-remove-extra-telephone.hidden").removeClass("hidden");
});

$('.js-remove-extra-telephone').click(function(){
    var elem = $('.js-phone-item');
    if(elem.length > 1)
        $(".telephone-field:last").remove(".telephone-field:last");
    if(elem.length == 2)
        $(this).addClass("hidden");
});

$('.js-add-extra-adress').click(function(){
    $(".form-add-adress").removeClass("hidden");
    $(this).addClass("hidden");
    $('.js-remove-extra-adress').removeClass("hidden");
});
$('.js-remove-extra-adress').click(function(){
    $(".form-add-adress").addClass("hidden");
    $(this).addClass("hidden");
    $(".js-add-extra-adress").removeClass("hidden");
});

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

var mozaic = '';
function initMozaic() {
    $('.masonry-mozaika').each(function() {
        mozaic = $(this).masonry({
            itemSelector: '.masonry-mozaika-item',
            columnWidth: '.masonry-mozaika-item',
            percentPosition: true
        });
    });
}
function reInitMozaic() {
    if (mozaic != '') {
        $('.masonry-mozaika').masonry('destroy');
    }
}
/*MAP*/
$(document).ready(function () {
    function regionItemHover(regionId, hover) {
      (hover === true) ? document.querySelector('.js-region-item[data-region="'+regionId+'"]').classList.add('region-item-hover') : document.querySelector('.js-region-item[data-region="'+regionId+'"]').classList.remove('region-item-hover');
    }
    
    function regionBaloonHover(regionId, hover) {
      var items = document.querySelectorAll('.js-region-baloon[data-region="'+regionId+'"]');
      for (var i = 0; i < items.length; i++) {
        (hover === true) ? items[i].classList.add('region-baloon-open-hover') : items[i].classList.remove('region-baloon-open-hover');
      }
    }
  
    function regionBaloonShow(regionId, show) {
      var regionBaloon = document.querySelector('.js-region-baloon-item[data-region="'+regionId+'"]');
      if (!regionBaloon) return;
      var regionArea = document.querySelector('.js-region-item[data-region="'+regionId+'"]');
      if (show) {
        var mapRect = document.querySelector('.js-region-map').getBoundingClientRect();
        var baloonRect = regionArea.getBoundingClientRect();
        var center = {
          x: (baloonRect.left - mapRect.left) + baloonRect.width / 2,
          y: (baloonRect.top - mapRect.top) + baloonRect.height / 2 - 10
        }
        regionBaloon.style.top = center.y + 'px';
        regionBaloon.style.left = center.x + 'px';
        regionBaloon.classList.add('banners-fon-list__baloon-active');
      } else {
        regionBaloon.classList.remove('banners-fon-list__baloon-active');
      }
    }
    
    function regionLinesHide(regionId, hide) {
      if (regionId == 'russia') {
        (hide === true) ? document.querySelector('.js-region-lines').classList.add('region-lines-hide') : document.querySelector('.js-region-lines').classList.remove('region-lines-hide');
      }
    }
  
    $('.js-region-baloon').hover(
      function() {
        var regionId = $(this).attr('data-region');
        regionItemHover(regionId, true);
        regionBaloonHover(regionId, true);
        regionBaloonShow(regionId, true);
        regionLinesHide(regionId, true);
      }, function() {
        var regionId = $(this).attr('data-region');
        regionItemHover(regionId, false);
        regionBaloonHover(regionId, false);
        regionBaloonShow(regionId, false);
        regionLinesHide(regionId, false);
      }
    );
  });

$(document).ready(function () {
    initSelSexForm();
    initSliderClubPurchaseProducts();
    initAjaxMoreLookBook();
    initMozaic();
    reInitMozaic()
});
