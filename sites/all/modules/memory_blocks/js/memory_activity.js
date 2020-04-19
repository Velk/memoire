(function ($) {
    Drupal.behaviors.memory_blocks_activities = {
        attach: function (context, settings) {

          /* ---------------------------------------------------------------------------------------------------------------------------------- */
          /* --------------------------------------------------------- OPTION FOLDING --------------------------------------------------------- */
          /* ---------------------------------------------------------------------------------------------------------------------------------- */
          $("#activity-prestations").on("click",".option-more", function() {
            $(this).parent().children(".prestation-main").addClass("prestation-show").removeClass("prestation-hide");
            $(this).addClass("option-less").removeClass("option-more");
            $(this).html("<i class=\"fa fa-caret-up\" aria-hidden=\"true\"></i>Voir moins");
          });

          $("#activity-prestations").on("click",".option-less", function() {
            $(this).parent().children(".prestation-main").addClass("prestation-hide").removeClass("prestation-show");
            $(this).addClass("option-more").removeClass("option-less");
            $(this).html("<i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>Voir plus");
          });

          /* ---------------------------------------------------------------------------------------------------------------------------------- */
          /* --------------------------------------------------------- IMAGES SLIDER --------------------------------------------------------- */
          /* ---------------------------------------------------------------------------------------------------------------------------------- */
          var nbImages = $(".carousel-slider-item").length - 1;

          if(nbImages === 0){

            $(".carousel-slider-item").css({
              "width": "75vw",
              "margin": "0"
            });
          }else if(nbImages === 1){

            if(screen.width < 640){

              $(".carousel-slider-item").css({
                "width": "75vw",
                "margin": "0"
              });
            }else{

              $(".carousel-slider-item").css({
                "width": "calc(75vw/2 - 5px)"
              });

              $(".carousel-button").hide();
              $("#carousel-dots").hide();
            }
          }else if(nbImages === 2){

            if(screen.width < 640){

              $(".carousel-slider-item").css({
                "width": "75vw",
                "margin": "0"
              });
            }else if(screen.width < 1024){

              $(".carousel-slider-item").css({
                "width": "calc(75vw/2 - 5px)"
              });
            }else{
              $(".carousel-button").hide();
              $("#carousel-dots").hide();
            }
          }

          function changeDotsSlider(currentImageIndex, followingImageIndex){

            $("#carousel-container #carousel-dots > i[data-slider-image-dot='" + currentImageIndex + "']").removeClass("fa-circle").addClass("fa-circle-thin");
            $("#carousel-container #carousel-dots > i[data-slider-image-dot='" + followingImageIndex + "']").removeClass("fa-circle-thin").addClass("fa-circle");
          }

          function changeImageSlider(currentImageIndex, followingImageIndex){

            $("#carousel-container .carousel-slider-item[data-slider-image='" + currentImageIndex + "']").removeClass("active-slider-image");
            $("#carousel-container .carousel-slider-item[data-slider-image='" + followingImageIndex + "']").addClass("active-slider-image");

            var newCurrentImageIndex = parseInt($("#carousel-container .active-slider-image").attr("data-slider-image"));
            var imageSliderImage = $("#carousel-slider > div");

            // Update image on the center
            if(newCurrentImageIndex === nbImages){

<<<<<<< HEAD
            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------------------- OPTION FOLDING --------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            $("#activity-prestations").on("click",".option-more", function() {

              $(this).parent().children(".prestation-main").addClass("prestation-show").removeClass("prestation-hide");
              $(this).addClass("option-less").removeClass("option-more");
              $(this).html("<i class=\"fa fa-caret-up\" aria-hidden=\"true\"></i>Voir moins");
            });

          $("#activity-prestations").on("click",".option-less", function() {

              $(this).parent().children(".prestation-main").addClass("prestation-hide").removeClass("prestation-show");
              $(this).addClass("option-more").removeClass("option-less");
              $(this).html("<i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>Voir plus");
            });

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------------------- Slider images ---------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            // Retrieve the total number of children
            var nbChildren = $(".activity-slider-wrapper > div").size();

            // Initialize the child number to 2 to go to the second number when the time interval is done
            var childNumber = 1;

            function sliderChangeImage(){

                // Display only the 'n' image
                $("div.activity-carousel").css({
                    "display": "none",
                    "grid-area": "none",
                });

                // Previous image
                var previousImg = (childNumber - 1);
                if( previousImg === 0 ){
                    previousImg = nbChildren;
                }
                $("div.activity-carousel:nth-child(" + previousImg + ")").css({
                    "display": "block",
                    "grid-area": "a",
                    "background-color": "#000",
                });
                $("div.activity-carousel:nth-child(" + previousImg + ") > img.ac-picture").css({
                    "opacity": "0.5",
                    "filter": "grayscale(1) blur(2px)",
                });

                // Current image
                $("div.activity-carousel:nth-child(" + childNumber + ")").css({
                    "display": "block",
                    "grid-area": "b",
                    "background-color": "none",
                });
                $("div.activity-carousel:nth-child(" + childNumber + ") > img.ac-picture").css({
                    "opacity": "1",
                    "filter": "none",
                });

                // Next image
                var nextImg = (childNumber + 1);
                if( nextImg > nbChildren ){
                    nextImg = 1;
                }
                $("div.activity-carousel:nth-child(" + nextImg + ")").css({
                    "display": "block",
                    "grid-area": "c",
                    "background-color": "none",
                });
                $("div.activity-carousel:nth-child(" + nextImg + ") > img.ac-picture").css({
                    "opacity": "1",
                    "filter": "none",
                });

                // Next next image
                var nextNextImg = (nextImg + 1);
                if( nextNextImg > nbChildren ){
                    nextNextImg = 1;
                }
                $("div.activity-carousel:nth-child(" + nextNextImg + ")").css({
                    "display": "block",
                    "grid-area": "d",
                    "background-color": "#000",
                });
                $("div.activity-carousel:nth-child(" + nextNextImg + ") > img.ac-picture").css({
                    "opacity": "0.5",
                    "filter": "grayscale(1) blur(2px)",
                });

                // Call loadImage()
                loadImage(previousImg);
                loadImage(childNumber);
                loadImage(nextImg);
                loadImage(nextNextImg);

                // Increment the child number to display the next image
                childNumber++;

                // If the child number is greater than the total number of children, reset the slider
                if(childNumber > nbChildren){
                    childNumber = 1;
                }
            }
=======
              $("#carousel-container .carousel-slider-item[data-slider-image='1']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='0']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
            }else if(newCurrentImageIndex === (nbImages - 1)){
>>>>>>> preprod

              $("#carousel-container .carousel-slider-item[data-slider-image='0']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + nbImages + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
            }else{

              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex + 2) + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex + 1) + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex) + "']").prependTo($(imageSliderImage));
            }

            changeDotsSlider(currentImageIndex, followingImageIndex);
          }

          // Auto Scroll behavior
          var autoScroll = null;
          var sliderScrollTimeInterval =
            (
              Drupal.settings.memory_blocks.slider_activity_page.scroll_time_interval === 0 ||
              Drupal.settings.memory_blocks.slider_activity_page.scroll_time_interval === typeof undefined ||
              Drupal.settings.memory_blocks.slider_activity_page.scroll_time_interval === ""
            ) ? 2000 : Drupal.settings.memory_blocks.slider_activity_page.scroll_time_interval
          ;

          function sliderAutoScroll(){

            var currentImageIndex = $("#carousel-container .active-slider-image").attr("data-slider-image");
            var followingImageIndex = parseInt(currentImageIndex) + 1;

            if(followingImageIndex > nbImages){followingImageIndex = 0;}

            changeImageSlider(currentImageIndex, followingImageIndex);
          }
          function sliderStartAutoScroll(){
            autoScroll = setInterval(sliderAutoScroll, sliderScrollTimeInterval);
          }
          function sliderStopAutoScroll(){
            window.clearInterval(autoScroll);
          }
          sliderStartAutoScroll();

          // User events behavior
          $("#carousel-container #carousel-button-next").click(function(){

            sliderStopAutoScroll();

            var currentImageIndex = $("#carousel-container .active-slider-image").attr("data-slider-image");
            var followingImageIndex = parseInt(currentImageIndex) + 1;

            if(followingImageIndex > nbImages){followingImageIndex = 0;}

            changeImageSlider(currentImageIndex, followingImageIndex);

            sliderStartAutoScroll();
          });

          $("#carousel-container #carousel-button-prev").click(function(){

            sliderStopAutoScroll();

            var currentImageIndex = $("#carousel-container .active-slider-image").attr("data-slider-image");
            var followingImageIndex = parseInt(currentImageIndex) - 1;

            if(followingImageIndex < 0){followingImageIndex = nbImages;}

            changeImageSlider(currentImageIndex, followingImageIndex);

            sliderStartAutoScroll();
          });

          $("#carousel-container #carousel-dots > i").click(function(){

            sliderStopAutoScroll();

            var currentImageIndex = $("#carousel-container #carousel-dots > i.fa-circle").attr("data-slider-image-dot");
            var followingImageIndex = $(this).attr("data-slider-image-dot");

            changeImageSlider(currentImageIndex, followingImageIndex);

            sliderStartAutoScroll();
          });

          // Zoom image
          $(".carousel-slider-item").click(function(){

            sliderStopAutoScroll();

            var urlImage = $(this).css("background-image").replace("url(","").replace(")","").replace(/\"/gi, "");

            if($("#slider-image-zoom-container").length >= 1){ $("#slider-image-zoom-container").remove(); }

            $("body").append(
              "<div id=\"slider-image-zoom-container\">" +
                "<div>" +
                  "<i class=\"fa fa-times\"></i>" +
                  "<img src=\"\" />" +
                "</div>" +
              "</div>"
            );

            $("#slider-image-zoom-container img").attr("src", urlImage);

            $("div#slider-image-zoom-container i").click(function () {
              $("#slider-image-zoom-container").remove();

              sliderStartAutoScroll();
            });

            $("div#slider-image-zoom-container").click(function(e) {

              if($(e.target).is("img")){
                e.preventDefault();
                return;
              }

              $("#slider-image-zoom-container").remove();

              sliderStartAutoScroll();
            });
          });
        }
    };
}(jQuery));
