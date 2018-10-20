(function ($) {
    Drupal.behaviors.memory_cart = {
        attach: function (context, settings) {

            /* Scroll - Resize header menu */
            // $( window ).scroll(function() {
            //
            //     if($(window).scrollTop() > 0){
            //
            //         $("div#block-memory-cart-memory-cart").css("top", "calc(60px + 34px)");
            //     }
            //     if($(window).scrollTop() === 0){
            //
            //         $("div#block-memory-cart-memory-cart").css("top", "calc(80px + 34px)");
            //     }
            //
            // });

            $("#btn-display").click(function(){

                if($("#block-memory-cart-memory-cart").width() > 0){

                    $("#block-memory-cart-memory-cart").css("width", 0);
                    $("#icon-plus").css("display", "block");
                    $("#icon-minus").css("display", "none");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "none");
                }else if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");
                }
            });

            /* Empty cart */
            $("#empty-cart").click(function(){
               $("form#devis input").val("");
               $("form#devis select").val("0");
               $("form#devis textarea").val("");
            });

        }
    };
}(jQuery));