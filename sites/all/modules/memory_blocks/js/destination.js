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


            /* Get price on cards (vignettes) */
            $(".node-activite .node-content .field-name-field-price-prestation .field-item").each(function(){

                // Get price and split to retrieve only the price and excluding prefix (€)
                var priceVignette = $(this).text().split(' ')[0];
                // Remove the two last decimal digits and also the dot separator
                priceVignette = priceVignette.slice(0, -3);
                // Change text of the price
                $(this).text(priceVignette + " €");
            });
        }
    };
}(jQuery));