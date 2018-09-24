(function ($) {
    Drupal.behaviors.memory_blocks_script = {
        attach: function (context, settings) {


            /* Autocomplete Destination title */
            if(
                window.location.pathname.match(/^.*\/taxonomy\/term\/[0-9]*\/edit$/) &&
                window.location.search === "?destination=admin/structure/taxonomy/continent"
            ) {

                setDestinationTitle();
            }

            function setDestinationTitle(){

                var nameText = $(".form-item-name #edit-name").val();

                $(".field-name-field-destination-title input").val(nameText);
            }

            /* Autocomplete activity title while writing */
            if(
                window.location.pathname.match(/^.*\/admin\/structure\/taxonomy\/continent\/add$/)
            ) {

                $(".form-item-name #edit-name").keyup(function() {
                    var textName = $(this).val();
                    $(".field-name-field-destination-title input").val(textName);
                });
            }

            /* ------------------------------------------------------------------------------------------------------ */

            /* Autocomplete activity title */
            if(
                (window.location.pathname.match(/^.*\/node\/[0-9]*\/edit$/) &&
                window.location.search === "?destination=admin/content") ||
                window.location.pathname.match(/^.*\/node\/add\/activite$/)
            ) {

                setActivityTitle();
            }

            function setActivityTitle(){

                var nameText = $(".form-item-title #edit-title").val();

                $(".field-name-field-activity-title input").val(nameText);
            }

            /* Autocomplete activity title while writing */
            if(
                window.location.pathname.match(/^.*\/node\/add\/activite$/)
            ) {

                $(".form-item-title #edit-title").keyup(function() {
                    var textName = $(this).val();
                    $(".field-name-field-activity-title input").val(textName);
                });
            }

            /* Get price of prestation de base and change the display */
            $(".node-activite .node-content .field-name-field-price-prestation .field-item").each(function(){

                // Get price and split to retrieve only the price and excluding prefix (€)
                var priceVignette = $(this).text().split(' ')[0];
                // Remove the two last decimal digits and also the dot separator
                priceVignette = priceVignette.slice(0, -3);
                // Change text of the price
                $(this).text(priceVignette + " €");
            });

            /* Get price of options and change the display */
            $(".node-activite .node-content .field-name-field-prix-option .field-item").each(function(){

                // Get price and split to retrieve only the price and excluding prefix (€)
                var priceVignette = $(this).text().split(' ')[0];
                // Remove the two last decimal digits and also the dot separator
                priceVignette = priceVignette.slice(0, -3);
                // Change text of the price
                $(this).text(priceVignette + " €");
            });

            /* Hide title when menu's element is hovered */
            var attrTitle = "";
            $('.tb-megamenu-main-menu a').mouseenter(function(){
                attrTitle = "";
                attrTitle = $(this).attr("title");
                $(this).attr("title", "");
            });
            $('.tb-megamenu-main-menu a').mouseleave(function(){
                $(this).attr("title", attrTitle);
            });
        }
    };
}(jQuery));