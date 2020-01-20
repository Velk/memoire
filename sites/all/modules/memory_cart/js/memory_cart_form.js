(function ($) {
  Drupal.behaviors.memory_cart_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_form");

      settings.memory_cart_form = {};

      var location = null;
      var participants = null;
      var departureDate = null;
      var returnDate = null;
      var budget = null;
      var transport = null;
      var wish = null;

      function setDatePicker(){

        var todayDate = new Date();

        $( "#departure-datepicker" ).datepicker({
          minDate: new Date(todayDate.getFullYear(), (todayDate.getMonth()), todayDate.getDate()),
          // defaultDate: "+1w",
          // changeMonth: true,
          numberOfMonths: 1
        });

        $( "#return-datepicker" ).datepicker({
          defaultDate: "+1w",
          // changeMonth: true,
          numberOfMonths: 1
        });

        // Set datepicker french language
        if(navigator.languages.indexOf("fr") > 0){
          $("#departure-datepicker").datepicker( $.datepicker.regional["fr"] );
          $("#return-datepicker").datepicker( $.datepicker.regional["fr"] );
        }
      }
      setDatePicker();

      function setFieldsValueToObject(){

        location = $("#location > input").val();
        participants = $("#participants > input").val();
        departureDate = $("#departure-datepicker").datepicker("getDate");
        returnDate = $("#return-datepicker").datepicker("getDate");
        budget = $("#budget > select").val();
        transport = $("#transport > select").val();
        wish = $("#wish > textarea").val();

        settings.memory_cart_form = {
          "location" : (location === "") ? null : location,
          "participants" : (participants === "") ? null : participants,
          "departureDate" : (departureDate === null) ? null : departureDate.getTime(),
          "returnDate" : (returnDate === null) ? null : returnDate.getTime(),
          "budget" : parseInt(budget),
          "transport" : parseInt(transport),
          "wish" : (wish === "") ? null : wish,
        };
      }

      $("#validate-cart").click(function(){
        setFieldsValueToObject();
      });

      $("#empty-cart").click(function(){

        $("#location > input").val("");
        $("#participants > input").val("");
        $("#departure-datepicker").datepicker("setDate", null);
        // $("#departure-datepicker").datepicker("option", "minDate", null);
        $("#departure-datepicker").datepicker("option", "maxDate", null);
        $("#return-datepicker").datepicker("setDate", null);
        $("#return-datepicker").datepicker("option", "minDate", null);
        $("#return-datepicker").datepicker("option", "maxDate", null);
        $("#return-date").prop("disabled", true);
        $("#return-date").hide();
        $("#budget > select").find("option").removeAttr("selected");
        $("#budget > select").find("option[value=\"0\"]").attr("selected", "selected");
        $("#budget > select").val(0);
        $("#transport > select").find("option").removeAttr("selected");
        $("#transport > select").find("option[value=\"0\"]").attr("selected", "selected");
        $("#transport > select").val(0);
        $("#wish > select").val("");

        location = null;
        participants = null;
        departureDate = null;
        returnDate = null;
        budget = null;
        transport = null;
        wish = null;

        $("#trip-global-container > div").empty();
        $("#trip-disclaimer").show();
      });

      // Update field : Budget
      $("#budget > select").click(function(){
        var budget = $(this).val();
        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + budget + "\"]").attr("selected", "selected");
        $(this).val(budget);
      });

      // Update field : Transport
      $("#transport > select").click(function(){
        var transport = $(this).val();
        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + transport + "\"]").attr("selected", "selected");
        $(this).val(transport);
      });

      /* ---------- Date management ---------- */

      var lastValueDepartureDate;
      var lastValueReturnDate;

      // Get trip duration by subtracting departure and return dates
      function getTripDuration(currentReturnDate, currentDepartureDate){

        var date1 = new Date(currentDepartureDate).getTime();
        var date2 = new Date(currentReturnDate).getTime();
        var daysDifference = (date2 - date1) / (1000 * 3600 * 24);

        return daysDifference;
      }

      // Construct the HTML structure of a day
      function setStructureHTML(totalNumberOfDays, currentDepartureDate){

        for(var i = 0; i <= totalNumberOfDays; i++){

          var incrementDate = new Date(currentDepartureDate);
          incrementDate.setDate(incrementDate.getDate() + i);

          $("#trip-global-container > div").append(
            "<div class=\"trip-days day-" + i + "\">" +
              "<div class=\"trip-days-header\">" +
                "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
                "<p>" + incrementDate.toLocaleDateString() + "</p>" +
              "</div>" +
              "<div class=\"trip-days-body\">" +
                "<div class=\"trip-activities\">" +
                  "<p>Aucune activité choisie</p>" +
                "</div>" +
                "<div class=\"trip-accommodation\">" +
                  "<p>Aucun hébergement</p>" +
                  "<button type=\"button\" class=\"filter-70\">VOIR HEBERGEMENTS</button>" +
                "</div>" +
              "</div>" +
            "</div>"
          );

          // Add deleting day button when there are more than 1 day
          if(totalNumberOfDays > 0){
            $("#trip-global-container .trip-days-header").append("<i class=\"fa fa-times trip-delete-day\" aria-hidden=\"true\"></i>");
          }
        }
      }

      // Clean the HTML days container then add the new HTML structure
      function updateDates(){

        var currentReturnDate = $("#return-datepicker").datepicker("getDate");
        var currentDepartureDate = $("#departure-datepicker").datepicker("getDate");

        $("#trip-global-container > div").empty();

        if(currentReturnDate !== null && currentDepartureDate !== null){
          $("#trip-disclaimer").hide();

          var totalNumberOfDays = getTripDuration(currentReturnDate, currentDepartureDate);
          setStructureHTML(totalNumberOfDays, currentDepartureDate);
        }else{
          $("#trip-disclaimer").show();
        }
      }

      $("#departure-datepicker").click(function() {
        lastValueDepartureDate = $(this).datepicker("getDate");
      }).on( "change", function() {

        departureDate = $(this).datepicker("getDate");

        if(lastValueDepartureDate === null){ // Initialize the departure date

          $("#return-date").show();
          $("#return-datepicker").removeAttr("disabled");
          $("#return-datepicker").datepicker("option", "minDate", departureDate);
        }else{

          if(departureDate === null){ // Delete the departure date

            var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

            if(isConfirmed) {
              $("#return-datepicker").datepicker("option", "minDate", null);
              $("#return-datepicker").prop("disabled", true);
              $("#return-datepicker").datepicker("setDate", null);
              $("#return-date").hide();
              returnDate = null;

              $("#departure-datepicker").datepicker("option", "maxDate", null);

              updateDates();
            }else{ // Cancel change
              $(this).datepicker("setDate", lastValueDepartureDate);
            }
          }else{ // Change the departure date

            var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

            if(isConfirmed){

              $("#return-datepicker").datepicker("option", "minDate", departureDate);

              updateDates();
            }else{
              $(this).datepicker("setDate", lastValueDepartureDate);
            }
          }
        }
      });

      $("#return-datepicker").click(function() {
        lastValueReturnDate = $(this).datepicker("getDate");
      }).on( "change", function() {

        returnDate = $(this).datepicker("getDate");

        if(lastValueReturnDate === null) { // Initialize the return date

          $("#departure-datepicker").datepicker("option", "maxDate", returnDate);
          updateDates();
        }else{

          if(returnDate === null){ // Delete the return date

            var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

            if(isConfirmed){

              $("#departure-datepicker").datepicker("option", "maxDate", null);
              updateDates();
            }else{ // Cancel change
              $(this).datepicker("setDate", lastValueReturnDate);
            }
          }else{ // Change the return date

            var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

            if(isConfirmed){

              $("#departure-datepicker").datepicker("option", "maxDate", returnDate);
              updateDates();
            }else{ // Cancel change
              $(this).datepicker("setDate", lastValueReturnDate);
            }
          }
        }
      });

      // Delete day
      $("#trip-global-container").on("click", "i.trip-delete-day", function(){

        var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

        if(isConfirmed) {

          var currentReturnDate = $("#return-datepicker").datepicker("getDate");
          currentReturnDate.setDate(currentReturnDate.getDate() - 1);
          // var newReturnDate = currentReturnDate.toISOString().split('T')[0];
          var newReturnDate = $.datepicker.formatDate( "dd/mm/yy", currentReturnDate);

          $("#return-datepicker").datepicker("setDate", newReturnDate);
          $("#departure-datepicker").datepicker("option", "maxDate", newReturnDate);

          updateDates();
        }
      });
    }
  };
}(jQuery));
