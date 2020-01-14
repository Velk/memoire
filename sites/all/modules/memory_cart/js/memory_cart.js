(function ($) {
  Drupal.behaviors.memory_cart = {
    attach: function (context, settings) {

      var cartForm = $("#cart-container > div");
      var mainMenuHeight = $("#header-wrapper").outerHeight(true);

      /* Positioning of the user cart interface */
      function setCartInterfacePosition() {

        if ($("#responsive-user-cart-btn").length === 0) {

          mainMenuHeight = $("#header-wrapper").outerHeight(true);

          cartForm.css({
            "margin-top": mainMenuHeight + "px",
            "height": "calc(100% - " + mainMenuHeight + "px)",
          });
        }
      }

      function shiftMainContainer(isCartFormVisible){

        setCartInterfacePosition();

        if(isCartFormVisible){

          $("#page > div:not(#header-wrapper)").css("width", "calc(100% - 450px)");

          $("#cart-container .toggle-user-cart i:eq(0)").css("display", "none");
          $("#cart-container .toggle-user-cart i:eq(1)").css("display", "block");
        }else{

          $("#page > div:not(#header-wrapper)").css("width", "100%");

          $("#cart-container .toggle-user-cart i:eq(0)").css("display", "block");
          $("#cart-container .toggle-user-cart i:eq(1)").css("display", "none");
        }
      }

      // Toggle display the user cart
      $(".toggle-user-cart").click(function () {
        cartForm.toggle();
        shiftMainContainer(cartForm.is(":visible"));
      });

      $( window ).scroll(function() {
        setCartInterfacePosition();
      });

      // Run functions
      shiftMainContainer(cartForm.is(":visible"));
    }
  };
}(jQuery));
