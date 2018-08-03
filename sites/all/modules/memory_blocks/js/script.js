(function ($) {
    Drupal.behaviors.memory_blocks_script = {
        attach: function (context, settings) {


            if(
                window.location.pathname.match(/^\/memory_website\/memoire\/taxonomy\/term\/[0-9]*\/edit$/) &&
                window.location.search === "?destination=admin/structure/taxonomy/continent"
            ) {

                setDestinationTitle();
            }

            function setDestinationTitle(){

                var nameText = $(".form-item-name #edit-name").val();

                $(".field-name-field-destination-title input").val(nameText);
            }


        }
    };
}(jQuery));