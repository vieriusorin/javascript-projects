$(function() {
    /* Variables */
    var w = $(window).width(),
        $window = $(window),
        header = $('#main-header'),
        headerPos = header.offset().top,
        main = $('#main').offset().top;

    /* Functions */

    var headerSticky = function() {
        if ($(window).width() > 767) {
            if ($(window).scrollTop() > main) {
                header.addClass('is-sticky');
            } else header.removeClass('is-sticky');

            $(window).on('scroll', function() {
                if ($(window).scrollTop() > main) {
                    header.addClass('is-sticky');
                } else header.removeClass('is-sticky');
            });
        }        
    };

    headerSticky();
    
    /* Events Listeners */

    $(window).resize(function() {
        headerSticky();
    });
});
