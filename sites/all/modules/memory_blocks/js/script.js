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

        }
    };
}(jQuery));