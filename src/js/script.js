document.addEventListener('DOMContentLoaded', function(){
    $(".slickSlider").slick({
        // normal options...
        infinite: true,
        slidesToShow: 3,
        variableWidth: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        // centerPadding: '40px',
    });
});