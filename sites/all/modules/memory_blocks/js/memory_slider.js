(function ($) {
    Drupal.behaviors.memory_blocks_slider = {
        attach: function (context, settings) {

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------------------- Slider images ---------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            // Retrieve the total number of children
            var nbChildren = $("#slider-container > div > div").size();

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

            if( Drupal.settings.memory_blocks.slider_type === "0"){

                // Display only the first image
                $("div.slider-img-container").css("display", "none");
                $("div.slider-img-container:nth-child(1)").css("display", "block");

                // Call the function sliderChangeImage() every 'x' millisecond
                // Note that Drupal.settings.memory_blocks.slider_time_interval call slider_time_interval in the define in the memory_block module
                setInterval(sliderChangeImage, Drupal.settings.memory_blocks.slider_time_interval);
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