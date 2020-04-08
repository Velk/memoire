(function($, Drupal) {
  Drupal.behaviors.memory_footer = {
    attach: function(context, settings) {

      $(document).ready(function($) {

        var partnersContainerWidth = $("#partners-container > div#partners-slider").width();

        // Retrieve variables set through the administration pannel
        var nbPartners = Drupal.settings.memory_footer.partners_number;
        var partnerSlidingTime = Drupal.settings.memory_footer.partner_sliding_time;
        var partnerSlidingSpeed = Drupal.settings.memory_footer.partner_sliding_speed;

        function infiniteSlider(){

          if(nbPartners > 7){ // Because a group of reviews is composed of 3 reviews

            // Infinite partners carousel
            setInterval(function(){

              // Slide reviews and fade the sliding review
              $("#partners-container > div#partners-slider > .memory-group-partners:first").animate(
                {marginLeft:-partnersContainerWidth, opacity:0},
                partnerSlidingSpeed,
                function(){
                  $(".memory-group-partners:last").after($(this));
                  $(this).css({
                    marginLeft:0,
                    "opacity": 1
                  });
                }
              );
            }, partnerSlidingTime);
          }
        }

        // Run the infinite slider
        infiniteSlider();
      });
    }
  };
})(jQuery, Drupal);
