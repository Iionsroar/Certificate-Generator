$(function() {
    // navbar-brand design
    $('.navbar-end').find('.la-js-btn').hover(
        function() {
            if ($(window).width() > 1006) {
                $(this).removeClass('has-text-white').addClass('has-text-dark');
            }
        },
        function() {
            if ($(window).width() > 1006) {
                $(this).removeClass('has-text-dark').addClass('has-text-white');
            }
        });


    $('#app-name').hover(function () {
        $(this).children().each(function() {
            if ($(this).hasClass('has-text-dark')) {
                $(this).removeClass('has-text-dark').addClass('has-text-white');
            } else {
                $(this).removeClass('has-text-white').addClass('has-text-dark');
            };
        });
    },
    function () {
        $(this).children().each(function() {
            if ($(this).hasClass('has-text-dark')) {
                $(this).removeClass('has-text-dark').addClass('has-text-white');
            } else {
                $(this).removeClass('has-text-white').addClass('has-text-dark');
            };
        });
    });


    // navbar burger
    $('.navbar-burger').click(function() {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $('#mobile').removeClass('is-active');
            $('.navbar-end').find('.la-js-btn').removeClass('has-text-dark').addClass('has-text-white');
            $('.la-js-navlabel').hide();
        } else {
            $(this).addClass('is-active');
            $('#mobile').addClass('is-active');
            $('.navbar-end').find('.la-js-btn').removeClass('has-text-white').addClass('has-text-dark');
            $('.la-js-navlabel').show();
        }
    });
    $(window).resize(function () {
        if ($(this).width() > 1006) {
            $('.navbar-end').find('.la-js-btn').removeClass('has-text-dark').addClass('has-text-white');
            $('.la-js-navlabel').hide();
        } else {
            $('.navbar-end').find('.la-js-btn').removeClass('has-text-white').addClass('has-text-dark');
            $('.la-js-navlabel').show();
        }
    });

    // image modal
    $('.la-js-image-modal').click(function () {
        $(this).find('.modal').toggleClass('is-active');
        $('html').toggleClass('is-clipped');
    });
});