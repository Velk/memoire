(function ($) {
  Drupal.behaviors.memory_cart_ajax_request = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_ajax_request");

      $("#validate-cart").click(function(){

        console.log("-------- AJAX REQUEST ---------");
        console.log(settings.memory_cart_form);
        console.log(settings.memory_cart_advanced_form);
      });


    }
  };
}(jQuery));
