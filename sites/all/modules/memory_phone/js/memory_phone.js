(function ($) {
    Drupal.behaviors.memory_phone = {
        attach: function (context, settings) {


            $(".toggle-display-countries").click(function(){
              console.log("click");
              $("#other-countries").toggle();

              var menuHeight = $("#header-wrapper").height();
              $("#other-countries").css("top", "calc(5px + " + menuHeight + "px)");
            });

            function setDropdownMenuPosition(){

              var menuHeight = $("#header-wrapper").height();
              var dropdownMenuPosition = $("#other-countries").css("top");

              if( (menuHeight + 5) !== dropdownMenuPosition){
                $("#other-countries").css("top", "calc(5px + " + menuHeight + "px)");
              }
            }

            setInterval(function(){
              setDropdownMenuPosition();
            }, 100);
        }
    };
}(jQuery));
