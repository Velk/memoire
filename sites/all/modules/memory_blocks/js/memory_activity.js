(function ($) {
    Drupal.behaviors.memory_blocks_activities = {
        attach: function (context, settings) {

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

            // var newCurrentImage = $("#carousel-container .active-slider-image").index();
            var newCurrentImageIndex = parseInt($("#carousel-container .active-slider-image").attr("data-slider-image"));
            var imageSliderImage = $("#carousel-slider > div");

            // Update image on the center
            if(newCurrentImageIndex === 0){

              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex + 1) + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + nbImages + "']").prependTo($(imageSliderImage));
            }else if(newCurrentImageIndex === nbImages){

              $("#carousel-container .carousel-slider-item[data-slider-image='0']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex - 1) + "']").prependTo($(imageSliderImage));
            }else{

              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex + 1) + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + newCurrentImageIndex + "']").prependTo($(imageSliderImage));
              $("#carousel-container .carousel-slider-item[data-slider-image='" + (newCurrentImageIndex - 1) + "']").prependTo($(imageSliderImage));
            }

            changeDotsSlider(currentImageIndex, followingImageIndex);
          }

          $("#carousel-container #carousel-button-next").click(function(){

            var currentImageIndex = $("#carousel-container .active-slider-image").attr("data-slider-image");
            var followingImageIndex = parseInt(currentImageIndex) + 1;

            if(followingImageIndex > nbImages){followingImageIndex = 0;}

            changeImageSlider(currentImageIndex, followingImageIndex);
          });

          $("#carousel-container #carousel-button-prev").click(function(){

            var currentImageIndex = $("#carousel-container .active-slider-image").attr("data-slider-image");
            var followingImageIndex = parseInt(currentImageIndex) - 1;

            if(followingImageIndex < 0){followingImageIndex = nbImages;}

            changeImageSlider(currentImageIndex, followingImageIndex);
          });

          $("#carousel-container #carousel-dots > i").click(function(){

            var currentImageIndex = $("#carousel-container #carousel-dots > i.fa-circle").attr("data-slider-image-dot");
            var followingImageIndex = $(this).attr("data-slider-image-dot");

            changeImageSlider(currentImageIndex, followingImageIndex);
          });

          // Zoom image
          $(".carousel-slider-item").click(function(){

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
            });

            $("div#slider-image-zoom-container").click(function(e) {

              if($(e.target).is('img')){
                e.preventDefault();
                return;
              }

              $("#slider-image-zoom-container").remove();
            });
          });

        }
    };
}(jQuery));
