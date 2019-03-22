(function ($) {
    Drupal.behaviors.memory_blocks_destination = {
        attach: function (context, settings) {

            $("ul.country-container").each(function(){

                if($(this).children("ul.city").length == 0){

                    $(this).children("li").css("text-decoration", "line-through");
                }

                if($(this).children("ul.city").length > 0){

                    $(this).children("li").css({
                        "cursor": "pointer"
                    });
                }
            });

            $("ul.country-container > li").click(function(){

                if($(this).parent().children("ul.city").length > 0){

                    if( $(this).parent().children("ul.city").is(":visible") ){

                        $(this).parent().children("ul.city").css({
                            "display": "none"
                        });
                    }else{

                        $(this).parent().children("ul.city").css({
                            "display": "block"
                        });
                    }
                }
            });

            /* Set dynamically the height of continent title */
            var maxTitleContinentHeight = 0;

            $(".continent-container > h3").each(function(){

                var titleContinentHeight = $(this).outerHeight();

                if ( titleContinentHeight > maxTitleContinentHeight ){
                    maxTitleContinentHeight = titleContinentHeight;
                }
            });

            $(".continent-container > h3").each(function(){

                $(this).height(maxTitleContinentHeight);
            });

        }
    };
}(jQuery));