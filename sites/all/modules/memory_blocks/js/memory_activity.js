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

              $("#carousel-container .carousel-slider-item[data-slider-image='1']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='0']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
            }else if(newCurrentImageIndex === (nbImages - 1)){

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
