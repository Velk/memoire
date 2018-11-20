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

            /* Show Others field when Others option is selected */
            $(".webform-component--contact-details--others").hide();

            $("select#edit-submitted-contact-details-nature-request").click(function(){

                if( $("select#edit-submitted-contact-details-nature-request").find(":selected").text() === "Autres" ){

                    $(".webform-component--contact-details--others").slideDown("slow");
                }else{

                    $(".webform-component--contact-details--others").slideUp("slow");
                }
            });


            function fieldsBehavior() {
                if( $("select#edit-submitted-contact-details-nature-request").find(":selected").text() === "Demande de devis" ){

                    if( !$("fieldset.webform-component--quote-request").is(":visible") ){

                        $("fieldset.webform-component--quote-request").slideDown("slow");
                    }

                    if( $(".webform-component--contact-details--others").is(":visible") ){

                        $(".webform-component--contact-details--others").slideUp("slow");
                    }
                }
                if( $("select#edit-submitted-contact-details-nature-request").find(":selected").text() === "Autres" ){

                    if( !$(".webform-component--contact-details--others").is(":visible") ){

                        $(".webform-component--contact-details--others").slideDown("slow");
                    }

                    if( $("fieldset.webform-component--quote-request").is(":visible") ){

                        $("fieldset.webform-component--quote-request").slideUp("slow");
                    }
                }
                if(
                    $("select#edit-submitted-contact-details-nature-request").find(":selected").text() !== "Demande de devis" &&
                    $("select#edit-submitted-contact-details-nature-request").find(":selected").text() !== "Autres"
                ){

                    if( $("fieldset.webform-component--quote-request").is(":visible") ){

                        $("fieldset.webform-component--quote-request").slideUp("slow");
                    }
                    if( $(".webform-component--contact-details--others").is(":visible") ){

                        $(".webform-component--contact-details--others").slideUp("slow");
                    }
                }
            }
            setInterval(fieldsBehavior, 500);

        }
    };
}(jQuery));