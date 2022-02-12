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
            $('.catalog-item__block').eq(i).toggleClass('catalog-item__block_active');
        })
    });
};

toggleSlide('.catalog-item__link');
toggleSlide('.catalog-item__block');

// modal window

    $('[data-modal=consultation]').on('click', function() {     /* Получает элементы по определенному data атрибуту и ровняется consultation, 
        затем происходит функция клика пользователя, которая несет в себе функцию, которая описывает действие на сайте когда пользователь кликнет*/
        $('.overlay, #consultation').fadeIn('slow');    /* Получаем селектор - оверлей, и идентификатор и указывает fadeIn для отображения на сайте  */
    });
    $('.modal__close').on('click', function(){ /* Происходит обращение к классу modal, затем пользователь при клике вызывает следующую функцию*/
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow'); /* происходит перечисление классов и id, которые будут закрываться при помощи атрибута fadeOut   */
    });
    /* $('.button_mini').on('click', function(){
        $('.overlay, #order').fadeIn('slow');
    }); */
    $('.button_mini').each(function(i) { /* Для каждой кнопки буде выполняться операция с аргументом i, который будет отвечать за номер элеменат по порядку (1, 2, 3, 4 и т.д.) */
        $(this).one('click', function() {    /* this - та кнопка на которую нажали, на нее будет совершен клик с функцией  */
            $('#order .modal__subtitle').text($('.catalog-item__subtitle').eq(i).text());    /*Внутри модального окна #order есть такой класс как modal__title  внутрь него необходимо поместить 
            текст заголовков c карточек товаров, затем необходимо получить нужный заголовок по его индексу .eq(i) - позволяет получить определенный элемент по порядку */
            $('.overlay, #order').fadeIn('slow');
        })  
    });
   /*  $('#consultation-form').validate();
    $('#order form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            phone: "required",
            email: {
                reqiured: true,
                email: true
            }
        },
        messages: {
            name: 
            {
                required: "Пожалуста введите свое имя",
                minlength: jQuery.validator.format("Введите минимум {0} символа!!!")
              },
            phone: "Пожалуста введите номер телефона",
            email: {
              required: "Пожалуста введите свой email",
              email: "ваш формат не подлежит name@domain.com"
            }
          }
    });
    $('#consultation form').validate(); */
    
    function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: {
                    required: true,
                    minlength: 4,
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуста введите свое имя",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!!!")
                  },
                phone: {
                    required: "Пожалуста введите номер телефона",
                    minlength: jQuery.validator.format("Введите минимум {0} символа!!!")
                },
                email: {
                  required: "Пожалуста введите свой email",
                  email: "ваш формат не подлежит name@domain.com"
                }
            }
        });
    };
    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');
    
    $('input[name=phone]').mask("+7 (999) 999-99-99");
    $('form').submit(function(e){ /* Обращаемся ко всем формам и когда они все будут submit (подтверждаться), затем фукция с аргументом e (event)  */
        e.preventDefault(); /* Команда способствующая отменить стандартное поведение браузера. ТО ЕСТЬ отменяет перезагрузку браузера, при клике кнопки отправки формы  */
        
        if(!$(this).valid()) { /* Устанвока условия, если форма не прошал ваоидацию, то она не будет отправлена методом POST  */
            return;
        }
        $.ajax({
            type: "POST", /* В открытом объекте указывается тип данных ОТПРАВИТЬ - POST */
            url: "mailer/smart.php", /* Отправляем данные через обработчик PHP */
            data: $(this).serialize()  /* this - работаем с конкретной формой и подготавливаем к отпрапвке методом serialize */
        }).done(function(){             /* При выполнении данной операциию, выполним еще действие  */
            $(this).find("input").val(""); /* Внутри конкретной формы мы на ходим find input (тэги) и указываем, что их val устанавливаем в пустую строку, при отправке формы очищаем все строки  */
            $('#consultation, #order').fadeOut(); /* ЗАкрытие модальных окон  */
            $('.overlay, #thanks').fadeIn('slow');
            $('form').trigger('reset') /* Все формы на сайте с помощью триггера очищаются */
        
        });
        return false;  /*  */
    });
    // Smooth scroll and pageup12q
        $(window).scroll(function(){ /*объявляем событие скролл и внутрь помещаем функцию  */
            if($(this).scrollTop() > 1600) {    /* Если наша страница this и в ней пользователь пролистал более 1600 px */
                $('.pageup').fadeIn();  /* Тогда берет элемент pageup и отображаем его .fadeIn  */
            } else {
                $('.pageup').fadeOut(); /* В противном случае селектор будет скрываться .fadeOut */
            }  
        }); 

        $("a[href^='#up']").click(function(){  /* Получаем все ссылки с определенныйм параметром [Какйо то атрибут с началом # ], затем клик и вызов функци */
            const _href = $(this).attr("href"); /* Создаем переменную _href и промещаем в переменную значение которое было в href = берем ссылку ан которую нажали (this) и указываем атрибут href   */
            $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
            return false;
        });
        
        new WOW({
         
        }
        ).init(); 

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

  
