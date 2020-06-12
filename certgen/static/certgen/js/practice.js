$(function () {
    $('.tabs ul li').click(function () {
        var panelToShow = $(this).attr('rel');
        // alert(panelToShow);
        $('.tabs ul li.is-active').removeClass('is-active');
        $(this).addClass('is-active');

        $('.'+panelToShow).addClass('la-active');
        $('.'+panelToShow).siblings().removeClass('la-active');
    })

    // ===== IMAGE SLIDER =====
    //configuration
    var width = 720;
    var animatedSpeed = 1000;
    var pause = 1500;
    var currentSlide = 1;
    // cache DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');

    var interval;
    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animatedSpeed, function () {
                currentSlide++;
                if (currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', '0px');
                }
            })
        }, pause)
    }

    function stopSlider() {
        clearInterval(interval);
    }

    $slider.mouseenter(stopSlider).mouseleave(startSlider);

    startSlider();

    // ===== AJAX =====
    $orders = $('#orders');
    $.ajax({
        type: 'GET',
        url: '/api/orders/',
        success: function (orders) {
            $.each(orders, function (i, order) {
                $orders.append('<li>Name: ' + order.name + ', Meal: ' + order.meal + '</li>')
            })
        }
    });
})
