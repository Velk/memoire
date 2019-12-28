(function($, Drupal) {
  Drupal.behaviors.common = {
    attach: function(context, settings) {

      $(document).ready(function($) {

        // Retrieve variables set through the administration pannel
        var nb_reviews = Drupal.settings.common.nb_reviews;
        var review_sliding_time = Drupal.settings.common.review_sliding_time;
        var review_sliding_speed = Drupal.settings.common.review_sliding_speed;

        if(nb_reviews > 1){

          // Infinite reviews carrousel
          $(function(){
            setInterval(function(){

              // Slide reviews
              $("#memory_reviews_container > div > div").animate(
                {marginLeft:-650},
                review_sliding_speed,
                function(){
                  $(this)
                    .css({marginLeft:0})
                    .find(".memory_review:last")
                    .after($(this).find(".memory_review:first"));
                }
              );

              // Fade the sliding review to an opacity equals to 0 then reset the opacity
              $("#memory_reviews_container > div > div").find(".memory_review:first").fadeTo(
                review_sliding_speed,
                0,
                function() {
                  $(this).css("opacity", 1);
                }
              );
            }, review_sliding_time);
          });
        }
      });
    }
  };
})(jQuery, Drupal);
