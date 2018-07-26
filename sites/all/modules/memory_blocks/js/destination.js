(function ($) {
    Drupal.behaviors.memory_blocks = {
        attach: function (context, settings) {

            console.log("qdfsgsr");

            $(".node-activite").mouseenter(function(){

                $(".node-activite .node-content .field-type-image img").css("filter", "grayscale()");

                $(this).children(".node-content").children(".field-type-image").children(".field-items").children(".field-item").children("a").children("img").css("filter", "none");

            });

            $(".node-activite").mouseleave(function(){

                $(".node-activite .node-content .field-type-image img").css("filter", "none");

            });

            $(".node-activite .node-links .node-readmore > a").text("AJOUTER AU PANIER");
                // ajouter au panier

        }
    };
}(jQuery));