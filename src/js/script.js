/*  $(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1100,  
        
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/Arrow_1.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/Arrow_2.png"></button>',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
      });
});*/
$(document).ready(function(){

$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
        });
    };

    
});

const slider = tns({
    container: '.carousel__inner',
    speed: 1000,
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    /* nav: false, */
    
    autoplayButtonOutput: false,
    responsive: {
        992: {
            
        }
    }
    
  });
document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
  });
  document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
  });

  
