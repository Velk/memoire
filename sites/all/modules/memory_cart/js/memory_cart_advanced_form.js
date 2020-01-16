(function ($) {
  Drupal.behaviors.memory_cart_advanced_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_advanced_form");

      settings.memory_cart_advanced_form = {};


      function getTotalDays(currentReturnDate, currentDepartureDate){

        var date1 = new Date(currentDepartureDate).getTime();
        var date2 = new Date(currentReturnDate).getTime();
        var daysDifference = (date2 - date1) / (1000 * 3600 * 24);

        return daysDifference;
      }

      function setStructureHTML(totalNumberOfDays){

        console.log("Nombre de jours : " + totalNumberOfDays);
      }

      $("#return-date input").change(function(){

        var currentReturnDate = ($(this).val() === "") ? null : $(this).val();
        var currentDepartureDate = ($("#departure-date input").val() === "") ? null : $("#departure-date input").val();

        if(currentReturnDate !== null && currentDepartureDate !== null){
          $("#trip-disclaimer").hide();

          var totalNumberOfDays = getTotalDays(currentReturnDate, currentDepartureDate);
          setStructureHTML(totalNumberOfDays);
        }else{
          $("#trip-disclaimer").show();
        }
      });


    }
  };
}(jQuery));
