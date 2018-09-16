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

        }
    };
}(jQuery));