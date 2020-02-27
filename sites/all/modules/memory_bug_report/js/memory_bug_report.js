(function ($) {
    Drupal.behaviors.memory_blocks_bug_report = {
        attach: function (context, settings) {

            var aHeight;

            function getHeight(){

                if( $("#slider-container").length > 0 ){
                    aHeight = $("#slider-container").height()/2;
                }else{
                    aHeight = $(window).height()/2;
                }
            }

            getHeight();

            if( $("#slider-container").length > 0 ){
                // Set basic social networks position
                $("div#block-memory-blocks-memory-bug-report").css("top", "calc(80px + " + aHeight + "px)");
            }else{
                // Set basic social networks position
                $("div#block-memory-blocks-memory-bug-report").css("top", "calc(80px/2 + " + aHeight + "px)");
            }

            $( window ).scroll(function() {

                getHeight();

                var menuHeight;
                if($(window).scrollTop() === 0){
                    menuHeight = 80;
                }else{
                    menuHeight = 60;
                }

                if($(window).scrollTop() > 0){

                    aHeight = $(window).height()/2;

                    var topValueScroll = menuHeight/2 + aHeight;

                    $("div#block-memory-blocks-memory-bug-report").stop().animate({
                        top: topValueScroll + "px",
                    });
                }
                if($(window).scrollTop() === 0){

                    var topValue;

                    if( $("#slider-container").length > 0 ){
                        topValue = menuHeight + aHeight;
                    }else{
                        topValue = menuHeight/2 + aHeight;
                    }

                    $("div#block-memory-blocks-memory-bug-report").stop().animate({
                        top: topValue + "px",
                    });
                }

            });
        }
    };
}(jQuery));