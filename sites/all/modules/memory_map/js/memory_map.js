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
                    'top': mouseY - $("div#info-map").outerHeight() - 10,
                    'left': mouseX - $("div#info-map").outerWidth()/2
                }).fadeIn('slow');
            });

            $("svg#svg-container path").mouseenter(function(){

                if($("div#info-map").length === 0){

                    $("body").append("<div id='info-map'><p></p></div>");
                }

                $("div#info-map > p").text($(this).data( "name" ));
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

                $("svg#svg-container").css("transform", "translateX(-50%) translateY(0) scale(1)");
            }

            $(".world").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-50%) scale(1)");
            });
            $(".europe").click(function(){
                setBasicPosition();
               $("svg#svg-container").css("transform", "translateX(-50%) translateY(100%) scale(4)");
            });
            $(".north-america").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(20%) translateY(55%) scale(2.5)");
               $("svg#svg-container").css("transform", "translateX(10%) translateY(45%) scale(2.25)");
            });
            // $(".central-america").click(function(){
            //    $("svg#svg-container").css("transform", "translateX(100%) translateY(10%) scale(6)");
            // });
            $(".south-america").click(function(){
                setBasicPosition();
               $("svg#svg-container").css("transform", "translateX(-10%) translateY(-46%) scale(2.25)");
            });
            $(".asia").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-110%) translateY(30%) scale(2.5)");
               $("svg#svg-container").css("transform", "translateX(-105%) translateY(42%) scale(2.25)");
            });
            $(".africa").click(function(){
                setBasicPosition();
               $("svg#svg-container").css("transform", "translateX(-60%) translateY(-10%) scale(2)");
            });
            $(".middle-east").click(function(){
                setBasicPosition();
               // $("svg#svg-container").css("transform", "translateX(-60%) translateY(40%) scale(3.5)");
               $("svg#svg-container").css("transform", "translateX(-90%) translateY(40%) scale(3.5)");
            });
            $(".oceania").click(function(){
                setBasicPosition();
               $("svg#svg-container").css("transform", "translateX(-140%) translateY(-50%) scale(2.5)");
            });

            /* Manual zoom */
            $("div#zoom-in").click(function(){

                // Get transform CSS property values
                var transformVal = $("svg#svg-container").css("transform").split(/[()]/)[1];

                // Retrieve only the translateX and parse it in Float type
                var translateX = transformVal.split(',')[4];
                translateX = parseFloat(translateX);

                // Retrieve only the translateY and parse it in Float type
                var translateY = transformVal.split(',')[5];
                translateY = parseFloat(translateY);

                // Retrieve only the scale and parse it in Float type
                var scale = transformVal.split(',')[3];
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
                var translateX = transformVal.split(',')[4];
                translateX = parseFloat(translateX);

                var totalSVGWidth = $("svg#svg-container")[0].getBoundingClientRect().width;
                // (949.68*100)/3692.806396
                // Try : Recuperer la taille du SVG de base. Lors d'un dezoom, recupérer sa nouvelle taille puis calculer le ratio en %
                // Récuperer la valeur du translateX de base puis lors dezoom, enlever le ratio précédemment calculer pour trouver la nouvelle taille
                // Ca devrait garder le meme point de dezoom

                // Retrieve only the translateY and parse it in Float type
                var translateY = transformVal.split(',')[5];
                translateY = parseFloat(translateY);

                // if(translateX <= -527.6){
                //     console.log("FIRST");
                //     translateX = -527.6;
                // }
                // if(translateY <= 0){
                //     console.log("FIRST 22");
                //     translateY = 0;
                // }

                // Retrieve only the scale and parse it in Float type
                var scale = transformVal.split(',')[3];
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

            /* Draggable */

            // Allow draggable element on svg-container
            // $("svg#svg-container").draggable();

            var clicking = false;

            $('svg#svg-container').mousedown(function(){
                clicking = true;
            });

            $(document).mouseup(function(){
                clicking = false;
            });

            var topValue;
            $('svg#svg-container').mousemove(function(){
                if(clicking == false) return;

                // Mouse click + moving

            });

        }
    };
}(jQuery));