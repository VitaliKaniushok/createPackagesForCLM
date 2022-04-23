$(function(){

    $('.infoBox').click(function(){
    	$('.APpopup--info').fadeIn(500);
    });

    // Jeżeli chcemy dokonać zmiany czasu trwania animacji przejść pomiędzy KM, lub je wyłączyć, musimy dokonać poniższego zapisu. 
    // Pierwszy parametr określa czas trwania animacji w milisekundach, drugi jest nieobowiązkowy i jeżeli chcemy wyłączyć animację 
    // ustawiamy go na false. Domyślnie czas wynosi 500ms a animacje przejść pomiedzy KM są włączone.
    // Poniższy zapis jest opcjonalny i nie jest wymagany do uruchomienia swipera.
    var swiper = new APSwiper(600, true);


    // W swiperze dostępne są poniższe 3 metody, które uruchamiają się kolejno: 
    // APSwiper.swipeStart - podczas ruchu swajpnięcia do następnego lub poprzedniego slajdu
    // APSwiper.swipeNext - podczas ruchu swajpnięcia w lewo do nastepnego slajdu
    // APSwiper.swipePrev - podczas ruchu swajpnięcia w prawo do poprzedniego slajdu
    // dzięki poniższemu zapisowi możemy dopisać własne funkcje podczas uruchamiania swipera, 
   //  APSwiper.swipeStart = function(){
   //  	console.log('Function swipe start');
  	// }
  	// APSwiper.swipeNext = function(){
  	// 	console.log('Function swipe next');
  	// }
  	// APSwiper.swipePrev = function(){
  	// 	console.log('Function swipe prev');
  	// }
});
    
