(function ($) {
    Drupal.behaviors.memory_blocks_go_top_page = {
        attach: function (context, settings) {

            /* Scroll behavior */

            function displayGoTopPage(){

                if( $(window).scrollTop() > 0 ){

                    $("div#block-memory-blocks-memory-go-top-page").show();
                }else{

                    $("div#block-memory-blocks-memory-go-top-page").hide();
                }
            }

            displayGoTopPage();

            $(window).scroll(function () {

                displayGoTopPage();
            });

            /* Click behavior */

            $("button#go-top-page").click(function(){

                $("html, body").stop().animate({ scrollTop: 0 }, 600);
            });


        }
    };
}(jQuery));