(function ($) {
    Drupal.behaviors.memory_blocks_destination = {
        attach: function (context, settings) {

            $(".node-activite").mouseenter(function(){

                $(".node-activite .node-content .field-type-image img").css("filter", "grayscale()");

                $(this).children(".node-content").children(".field-type-image").children(".field-items").children(".field-item").children("a").children("img").css("filter", "none");

            });

            $(".node-activite").mouseleave(function(){

                $(".node-activite .node-content .field-type-image img").css("filter", "none");

            });

            $(".node-activite .node-links .node-readmore > a").text("PLUS D'INFORMATIONS");

        }
    };
}(jQuery));