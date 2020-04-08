(function ($) {
  Drupal.behaviors.memory_cart = {
    attach: function (context, settings) {

      var cartGlobalContainer = $("#block-memory-cart-memory-cart");
      var cartForm = $("#cart-container > div");
      var mainMenuHeight = $("#header-wrapper").outerHeight(true);

      /* Set user cart display in local storage */
      var currentUserCartVisibility = cartForm.is(":visible");
      var localStorageCartVisibility = JSON.parse(localStorage.getItem("isCartFormVisible"));

      if(localStorageCartVisibility != null){
        currentUserCartVisibility = JSON.parse(localStorageCartVisibility);
      }

      // Positioning of the user cart interface
      function setCartInterfacePosition() {

        if ($("#responsive-user-cart-btn").length === 0) {

          mainMenuHeight = $("#header-wrapper").outerHeight(true);

          // cartForm.css({
          cartGlobalContainer.css({
            "margin-top": mainMenuHeight + "px",
            "height": "calc(100% - " + mainMenuHeight + "px)"
          });
        }
      }

      // Shift main container when user cart is displayed
      function shiftMainContainer(isCartFormVisible){

        setCartInterfacePosition();

        if(isCartFormVisible){

          $("#page > div:not(#header-wrapper)").css( "width", "calc(100% - " + $("#cart-container > div").outerWidth() + "px)" );

          $("#cart-container .toggle-user-cart i:eq(0)").css("display", "none");
          $("#cart-container .toggle-user-cart i:eq(1)").css("display", "block");

          // Set localStorage preference
          cartForm.show();

          if(screen.width > 640){
            currentUserCartVisibility = true;
            localStorage.setItem("isCartFormVisible", JSON.stringify(currentUserCartVisibility));
          }else{
            localStorage.removeItem("isCartFormVisible"); // Avoid user cart auto display on smartphone
          }
        }else{

          $("#page > div:not(#header-wrapper)").css("width", "100%");

          $("#cart-container .toggle-user-cart i:eq(0)").css("display", "block");
          $("#cart-container .toggle-user-cart i:eq(1)").css("display", "none");

          // Set localStorage preference
          cartForm.hide();

          if(screen.width > 640){
            currentUserCartVisibility = false;
            localStorage.setItem("isCartFormVisible", JSON.stringify(currentUserCartVisibility));
          }else{
            localStorage.removeItem("isCartFormVisible"); // Avoid user cart auto display on smartphone
          }
        }
      }

      // Toggle display the user cart
      $(".toggle-user-cart").click(function () {

        cartForm.toggle();
        shiftMainContainer(cartForm.is(":visible"));
      });

      // Show user cart when user click on cart thumbnail
      $("button.cont-add-cart").click(function(){
        cartForm.show();
        shiftMainContainer(cartForm.is(":visible"));
      });

      $( window ).scroll(function() {
        setCartInterfacePosition();
      });

      // Run functions
      shiftMainContainer(currentUserCartVisibility);
    }
  };
}(jQuery));
>>>>>>> preprod
