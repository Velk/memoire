(function ($) {
  Drupal.behaviors.memory_cart_ajax_request = {
    attach: function (context, settings) {

      var sendQuotationErrorMessage = "";
      var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      function ajaxSendQuotation(expressQuotation){

        // Ajax request for sending email
        $.ajax({
          type: "POST",
          url: "/ajax/cart/quotation",
          data: {
            cartGlobalData : JSON.stringify(settings.memory_cart_form),
            cartActivitiesData : JSON.stringify(settings.memory_cart_advanced_form),
            expressQuotation : JSON.stringify(expressQuotation),
          },
          beforeSend: function(){
            $("body").append("<div id=\"send-quotation-loader\"><div class=\"lds-dual-ring\"></div></div>");
          },
          success: function (data) {

            $("body").append(
              "<div id=\"quotation-email-sending-message\">" +
                "<div>" +
                  "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                  "<p>" + data.message + "</p>" +
                "</div>" +
              "</div>"
            );
          },
          complete: function(){
            $("#send-quotation-loader").remove();
          }
        });
      }

      function checkMandatoryFields(){

        if(
          settings.memory_cart_form.firstname !== null &&
          settings.memory_cart_form.lastname !== null &&
          settings.memory_cart_form.email !== null &&
          settings.memory_cart_form.phone !== null
        ){

          if(emailRegex.test(String(settings.memory_cart_form.email).toLowerCase())){
            return true;
          }else{
            sendQuotationErrorMessage = "Le format de votre adresse e-mail n'est pas valide";
          }
        }else{
          sendQuotationErrorMessage = "Veuillez renseigner vos informations personnelles.";
        }

        return false;
      }

      function displayErrorMessage(){

        $("body").append(
          "<div id=\"quotation-email-sending-message\">" +
            "<div>" +
              "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
              "<p>" + sendQuotationErrorMessage + "</p>" +
            "</div>" +
          "</div>"
        );
      }

      $("#validate-cart").click(function(){
        var isContinue = checkMandatoryFields();

        if(isContinue){
          ajaxSendQuotation(false);
        }else{
          displayErrorMessage();
        }
      });

      $("#express-validate-cart").click(function(){
        var isContinue = checkMandatoryFields();

        if(isContinue){
          ajaxSendQuotation(true);
        }else{
          displayErrorMessage();
        }
      });

      $("body").on("click", "#quotation-email-sending-message > div > i", function(){
        $("#quotation-email-sending-message").remove();
      });
    }
  };
}(jQuery));
