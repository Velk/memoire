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
            $(".world").click(function(){
               $("svg#svg-container").css("transform", "translateX(-50%) scale(1)");
            });
            $(".europe").click(function(){
               $("svg#svg-container").css("transform", "translateX(-50%) translateY(100%) scale(4)");
            });
            $(".north-america").click(function(){
               $("svg#svg-container").css("transform", "translateX(20%) translateY(55%) scale(2.5)");
            });
            $(".central-america").click(function(){
               $("svg#svg-container").css("transform", "translateX(100%) translateY(10%) scale(6)");
            });
            $(".south-america").click(function(){
               $("svg#svg-container").css("transform", "translateX(-10%) translateY(-46%) scale(2.25)");
            });
            $(".asia").click(function(){
               $("svg#svg-container").css("transform", "translateX(-110%) translateY(30%) scale(2.5)");
            });
            $(".africa").click(function(){
               $("svg#svg-container").css("transform", "translateX(-60%) translateY(-10%) scale(2)");
            });
            $(".north-africa").click(function(){
               $("svg#svg-container").css("transform", "translateX(-60%) translateY(40%) scale(3.5)");
            });
            $(".oceania").click(function(){
               $("svg#svg-container").css("transform", "translateX(-140%) translateY(-50%) scale(2.5)");
            });
        }
    };
}(jQuery));