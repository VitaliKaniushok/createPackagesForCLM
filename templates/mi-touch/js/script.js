$(document).ready(function() {
    var video = document.getElementById('video');

    $('.start-video').bind('mousedown touchstart', function() {
        $('.popupVideo').fadeIn(800);
        video.play();
    });

    $('.closed').bind('mousedown touchstart', function() {
        $('.popupVideo').fadeOut(800);
        video.pause();
    });
})