(function ($) {
    Drupal.behaviors.memory_map = {
        attach: function (context, settings) {

            var mouseX;
            var mouseY;
            $(document).mousemove( function(e) {
                mouseX = e.pageX;
                mouseY = e.pageY;
            });

            $("svg#svg-container path").mousemove(function(){

                $("div#info-map").css({
                    "top" : mouseY - $("div#info-map").outerHeight() - 10,
                    "left" : mouseX - $("div#info-map").outerWidth()/2
                }).fadeIn("slow");
            });

            $("svg#svg-container path").mouseenter(function(){

                if( $(this).css("color") === "rgb(255, 143, 0)" ){

                    if($("div#info-map").length === 0){

                        $("body").append("<div id='info-map'><p></p></div>");
                    }

                    $("div#info-map > p").text($(this).data( "name" ));
                }
            });

            $("svg#svg-container path").mouseleave(function(){

                if($("div#info-map").length > 0){

                    $("div#info-map").remove();
                }
            });

            /* Zoom */
            function setBasicPosition(){

                $("svg#svg-container").css({
                    "top": "0",
                    "left": "0",
                });

                $("svg#svg-container").css("transform", "translateX(-4%) translateY(0%) scale(1)");
            }

            setBasicPosition();

            $(".world").click(function(){
                setBasicPosition();
            });

            $(".europe").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-50%) translateY(100%) scale(4)");
               $("svg#svg-container").css("transform", "translateX(0%) translateY(100%) scale(4)");
            });

            $(".north-america").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(10%) translateY(45%) scale(2.25)");
               $("svg#svg-container").css("transform", "translateX(60%) translateY(45%) scale(2.25)");
            });

            $(".south-america").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-10%) translateY(-46%) scale(2.25)");
               $("svg#svg-container").css("transform", "translateX(40%) translateY(-47%) scale(2.25)");
            });

            $(".asia").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-105%) translateY(42%) scale(2.25)");
               $("svg#svg-container").css("transform", "translateX(-58%) translateY(42%) scale(2.25)");
            });

            $(".africa").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-60%) translateY(-10%) scale(2)");
               $("svg#svg-container").css("transform", "translateX(-10%) translateY(-14%) scale(2.25)");
            });

            $(".middle-east").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-90%) translateY(40%) scale(3.5)");
               $("svg#svg-container").css("transform", "translateX(-45%) translateY(40%) scale(4)");
            });

            $(".oceania").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-140%) translateY(-50%) scale(2.5)");
               $("svg#svg-container").css("transform", "translateX(-100%) translateY(-52%) scale(2.75)");
            });

            /* Manual zoom */
            $("div#zoom-in").click(function(){

                // Get transform CSS property values
                var transformVal = $("svg#svg-container").css("transform").split(/[()]/)[1];

                // Retrieve only the translateX and parse it in Float type
                var translateX = transformVal.split(",")[4];
                translateX = parseFloat(translateX);

                // Retrieve only the translateY and parse it in Float type
                var translateY = transformVal.split(",")[5];
                translateY = parseFloat(translateY);

                // Retrieve only the scale and parse it in Float type
                var scale = transformVal.split(",")[3];
                scale = parseFloat(scale);

                // Add a += 0.5 zoom for each zoom-in
                var newScale = (scale + 0.5);

                // Set a zoom-in maximum to 10
                if(newScale >= 10){
                    newScale = 10;
                }

                // Apply changes
                $("svg#svg-container").css("transform", "translateX(" + translateX + "px) translateY(" + translateY + "px) scale(" + newScale + ")");
            });

            $("div#zoom-out").click(function(){

                // Get transform CSS property values
                var transformVal = $("svg#svg-container").css("transform").split(/[()]/)[1];

                // Retrieve only the translateX and parse it in Float type
                var translateX = transformVal.split(",")[4];
                translateX = parseFloat(translateX);

                // Retrieve only the translateY and parse it in Float type
                var translateY = transformVal.split(",")[5];
                translateY = parseFloat(translateY);

                // Retrieve only the scale and parse it in Float type
                var scale = transformVal.split(",")[3];
                scale = parseFloat(scale);

                // Add a += 0.5 zoom for each zoom-in
                var newScale = (scale - 0.5);

                // Set a zoom-out maximum to 1
                if(newScale <= 1){
                    newScale = 1;
                }

                // Apply changes
                $("svg#svg-container").css("transform", "translateX(" + translateX + "px) translateY(" + translateY + "px) scale(" + newScale + ")");
            });
        }
    };
}(jQuery));
