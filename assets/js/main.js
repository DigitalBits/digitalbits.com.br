 // svg
 svg4everybody();

 // Largura do carrosel do time.
 $('.team__list').css({
     width: $(document).width() - $('.team__list').offset().left
 });

 // Carrosel do time.
 $('#owl-team').owlCarousel({
     autoWidth: true,
     nav: false,
     dots: false,
     loop: true,
     responsive: {
         0: {
             margin: 10
         },
         400: {
             margin: 30,
         }
     }
 });
