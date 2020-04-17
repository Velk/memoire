(function ($) {
    Drupal.behaviors.memory_blocks_slider = {
        attach: function (context, settings) {

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------------------- Slider images ---------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            // Retrieve the total number of children
            var nbChildren = $("#slider-img-container > div").size();

            // Initialize the child number to 2 to go to the second number when the time interval is done
            var childNumber = 2;

            function sliderChangeImage(){

                // Display only the 'n' image
                $("div.slider-img-container").css("display", "none");
                $("div.slider-img-container:nth-child(" + childNumber + ")").css("display", "block");

                // Increment the child number to display the next image
                childNumber++;

                // If the child number is greater than the total number of children, reset the slider
                if(childNumber > nbChildren){
                    childNumber = 1;
                }
            }

            if( Drupal.settings.memory_blocks.slider_home_page.slider_type === "0"){

              // Display only the first image
              $("div.slider-img-container").css("display", "none");
              $("div.slider-img-container:nth-child(1)").css("display", "block");

              // Call the function sliderChangeImage() every 'x' millisecond
              // Note that Drupal.settings.memory_blocks.slider_time_interval call slider_time_interval in the define in the memory_block module
              setInterval(sliderChangeImage, Drupal.settings.memory_blocks.slider_home_page.scroll_time_interval);

              // Previous or next images - Icons behavior
              $("#slider-actions > i.fa-chevron-left").click(function(){

                  var arrayIndex = [];

                  $("div.slider-img-container").each(function(){

                      // If image container direct child is the image
                      if( $(this).children("img").length > 0 ){

                          // Retrieve every index of image containers except the one who's displayed
                          if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                              arrayIndex.push($( this ).index( $(this).is(":visible") ));
                          }

                      }
                      // If image container direct child is the <a> markup then the image
                      if( $(this).children("a").length > 0 ){

                          // Retrieve every index of image containers except the one who's displayed
                          if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                              arrayIndex.push($( this ).index( $(this).is(":visible") ));
                          }
                      }
                  });

                  var indexActualImage = 0;

                  for(var i = 0 ; i < arrayIndex.length ; i++){

                      // Check index of images retrieved then define the actual index of the image displayed
                      if( arrayIndex[i] === indexActualImage ){
                          indexActualImage++;
                      }
                  }

                  if( indexActualImage === 0 ){

                      $("div.slider-img-container").css("display", "none");
                      $("div.slider-img-container:nth-child(" + nbChildren + ")").css("display", "block");
                  }else{

                      $("div.slider-img-container").css("display", "none");
                      $("div.slider-img-container:nth-child(" + indexActualImage + ")").css("display", "block");
                  }
              });

              $("#slider-actions > i.fa-chevron-right").click(function(){

                  var arrayIndex = [];

                  $("div.slider-img-container").each(function(){

                      // If image container direct child is the image
                      if( $(this).children("img").length > 0 ){

                          // Retrieve every index of image containers except the one who's displayed
                          if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                              arrayIndex.push($( this ).index( $(this).is(":visible") ));
                          }

                      }
                      // If image container direct child is the <a> markup then the image
                      if( $(this).children("a").length > 0 ){

                          // Retrieve every index of image containers except the one who's displayed
                          if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                              arrayIndex.push($( this ).index( $(this).is(":visible") ));
                          }
                      }
                  });

                  var indexActualImage = 0;

                  for(var i = 0 ; i < arrayIndex.length ; i++){

                      // Check index of images retrieved then define the actual index of the image displayed
                      if( arrayIndex[i] === indexActualImage ){
                          indexActualImage++;
                      }
                  }

                  if( indexActualImage === (nbChildren-1) ){

                      // If the index (start at 0) of the actual image equals the number of children minus 1 (to fit with the index
                      // It would say that it is the last image so display the first image of the slider
                      $("div.slider-img-container").css("display", "none");
                      $("div.slider-img-container:nth-child(1)").css("display", "block");
                  }else{

                      // Set indexActualImage + 2 in order to get the next child image
                      $("div.slider-img-container").css("display", "none");
                      $("div.slider-img-container:nth-child(" + (indexActualImage+2) + ")").css("display", "block");
                  }
              });
            }

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* -------------------------------------------------- Video - Set sound behavior ---------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            if(Drupal.settings.memory_blocks.slider_home_page.slider_type === "1"){

                $("#set-sound").click(function(){

                  if($(this).find("i").attr("class").indexOf("fa-volume-off") >= 0){

                    $("#slider-container video").get(0).muted = false;
                    $("#slider-container video").get(0).play();

                    $("#set-sound > i").removeClass("fa-volume-off").addClass("fa-volume-up");
                  }else{

                    $("#slider-container video").get(0).muted = true;

                    $("#set-sound > i").removeClass("fa-volume-up").addClass("fa-volume-off");
                  }
                });

                $("#slider-container video").click(function(){

                    if( $.type($("#slider-container video").data("href")) !== "undefined" ){

                        var url = $(this).data("href");
                        window.open(url, "_blank");
                    }
                });

              // Video resizing
              document.onreadystatechange = function () {

                if (document.readyState === "complete") {

                  var ratioWidth = $("#slider-container").width()/$("#slider-container video").width();
                  var ratioHeight = $("#slider-container").height()/$("#slider-container video").height();

                  if(ratioWidth > 1){
                    $("#slider-container video").css({
                      "height":"auto",
                      "width":"100%",
                    });
                  }

                  if(ratioHeight > 1){
                    $("#slider-container video").css({
                      "height":"100%",
                      "width":"auto",
                    });
                  }
                }
              };
            }

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* ------------------------------------------------------- Go down behavior --------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            // Retrieve slider height
            var sliderHeight = $("#slider-container").height();

            // Scroll to the bottom of the slider
            $("#go-down > i").click(function(){
                $("html, body").stop().animate({scrollTop:sliderHeight+1}, 500, "swing");
            });

        }
    };
}(jQuery));
