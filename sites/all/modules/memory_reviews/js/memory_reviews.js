(function($, Drupal) {
  Drupal.behaviors.memory_reviews = {
    attach: function(context, settings) {

      $(document).ready(function($) {

        var refreshIntervalId;
        var reviewsContainerWidth = $("#memory-reviews-container > div#reviews-slider").width();

        // Retrieve variables set through the administration pannel
        var nbReviews = Drupal.settings.memory_reviews.nb_reviews;
        var reviewSlidingTime = Drupal.settings.memory_reviews.review_sliding_time;
        var reviewSlidingSpeed = Drupal.settings.memory_reviews.review_sliding_speed;

        function stopInfiniteSlider(){

          // Stop the infinite slider
          clearInterval(refreshIntervalId);
        }

        function changeAutomaticallyDotsSliderManager(){

          var nbReviewsDot = $("#reviews-touchable-manager > i").length;
          var currentDot = $("#reviews-touchable-manager > i.fa-circle").index();

          if(currentDot < (nbReviewsDot - 1)){ // Set the current dot to the next one

            $("#reviews-touchable-manager > i:eq(" + currentDot + ")").addClass("fa-circle-thin").removeClass("fa-circle");
            $("#reviews-touchable-manager > i:eq(" + (currentDot + 1) + ")").addClass("fa-circle").removeClass("fa-circle-thin");
          }else if(currentDot === (nbReviewsDot - 1)){ // Reset the current dot to the first

            $("#reviews-touchable-manager > i:eq(" + currentDot+ ")").addClass("fa-circle-thin").removeClass("fa-circle");
            $("#reviews-touchable-manager > i:eq(0)").addClass("fa-circle").removeClass("fa-circle-thin");
          }
        }

        (function responsiveChangeStructure(){

          if(screen.width <= 640){ // Small device

            // Create new Reviews structure
            var reviewSmallStructure = "";

            $(".memory-review").each(function(index, el){
              reviewSmallStructure +=
                "<div class=\"memory-group-reviews group-nb-" + index + "\">" +
                  el.outerHTML +
                "</div>"
              ;
            });

            $("#reviews-slider").empty(); // Empty the old Reviews structure

            $("#reviews-slider").append(reviewSmallStructure); // Add the new Reviews structure

            // Modify review switch manager
            var newSwitchManager =
              "<button type=\"button\" id=\"previous-review\">" +
                "<i class=\"fa fa-long-arrow-left\" aria-hidden=\"true\"></i>" +
              "</button>" +
              "<button type=\"button\" id=\"next-review\">" +
                "<i class=\"fa fa-long-arrow-right\" aria-hidden=\"true\"></i>" +
              "</button>"
            ;

            $("#reviews-touchable-manager").empty();
            $("#reviews-touchable-manager").append(newSwitchManager);

            $("#previous-review").click(function(){

              stopInfiniteSlider();

              var firstReview = $("#reviews-slider .memory-group-reviews:first");
              var lastReview = $("#reviews-slider .memory-group-reviews:last");

              firstReview.before(lastReview);

              // Re-run the infinite slider
              infiniteSlider();
            });
            $("#next-review").click(function(){

              stopInfiniteSlider();

              var firstReview = $("#reviews-slider .memory-group-reviews:first");
              var lastReview = $("#reviews-slider .memory-group-reviews:last");

              lastReview.after(firstReview);

              // Re-run the infinite slider
              infiniteSlider();
            });
          }
        }());

        function infiniteSlider(){

          if(screen.width <= 640){ // Small devices

            if(nbReviews > 1){ // Because on small device, reviews are displayed one by one.

              // Infinite reviews carousel
              refreshIntervalId = setInterval(function(){

                // Slide reviews and fade the sliding review
                $("#memory-reviews-container > div#reviews-slider > .memory-group-reviews:first").animate(
                  {marginLeft:-reviewsContainerWidth},
                  0,
                  function(){
                    $(".memory-group-reviews:last").after($(this));

                    $("#memory-reviews-container > div#reviews-slider > .memory-group-reviews").css({
                      marginLeft:0
                    });
                  }
                );
              }, reviewSlidingTime);
            }
          }else{

            if(nbReviews > 3){ // Because a group of reviews is composed of 3 reviews

              // Infinite reviews carousel
              refreshIntervalId = setInterval(function(){

                // Slide reviews and fade the sliding review
                $("#memory-reviews-container > div#reviews-slider > .memory-group-reviews:first").animate(
                  {marginLeft:-reviewsContainerWidth, opacity:0},
                  reviewSlidingSpeed,
                  function(){
                    $(".memory-group-reviews:last").after($(this));

                    $("#memory-reviews-container > div#reviews-slider > .memory-group-reviews").css({
                      marginLeft:0,
                      opacity: 1,
                    });

                    changeAutomaticallyDotsSliderManager();
                  }
                );
              }, reviewSlidingTime);
            }
          }
        }

        // Run the infinite slider
        infiniteSlider();

        // Change manually the reviews on the slider
        $("#reviews-touchable-manager > i").click(function(){

          if($(this).hasClass("fa-circle-thin")){

            stopInfiniteSlider();

            var selectedDotIndex = $(this).index();
            var groupReviewsIndex = $(".group-nb-" + selectedDotIndex).index();
            var arrayGroupReviewsToMove = [];

            // Retrieve the class of the groups of reviews to move. Get the class instead of directly moving them
            // because it avoid conflict between a group of review moved and the next to be moved.
            for(var i = 0; i < groupReviewsIndex; i++){
              arrayGroupReviewsToMove.push("." + $(".memory-group-reviews").eq(i).attr("class").split(" ")[1]);
            }

            // Move groups of reviews
            arrayGroupReviewsToMove.forEach((el) => {
              $(".memory-group-reviews:last").after($(el));
            });

            $("#reviews-touchable-manager > i").addClass("fa-circle-thin").removeClass("fa-circle");
            $(this).addClass("fa-circle").removeClass("fa-circle-thin");

            // Re-run the infinite slider
            infiniteSlider();
          }
        });
      });
    }
  };
})(jQuery, Drupal);
