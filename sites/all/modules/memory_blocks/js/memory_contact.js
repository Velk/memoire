(function ($) {
    Drupal.behaviors.memory_blocks_contact = {
        attach: function (context, settings) {


            /* Show Quote request section when the nature request option is Demande de devis */
            $("fieldset.webform-component--quote-request").hide();

            $("select#edit-submitted-contact-details-nature-request").click(function(){

                if( $("select#edit-submitted-contact-details-nature-request").find(":selected").text() === "Demande de devis" ){

                    $("fieldset.webform-component--quote-request").slideDown("slow");
                }else{

                    $("fieldset.webform-component--quote-request").slideUp("slow");
                }
            });


        }
    };
}(jQuery));