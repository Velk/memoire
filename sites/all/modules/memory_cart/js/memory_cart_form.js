(function ($) {
  Drupal.behaviors.memory_cart_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_form");

      var currentLocalStorage = JSON.parse(localStorage.getItem("localStorageCartFormSettings"));

      if(currentLocalStorage === null){
        settings.memory_cart_form = {
          "firstname" : null,
          "lastname" : null,
          "email" : null,
          "phone" : null,
          "location" : null,
          "participants" : null,
          "departureDate" : null,
          "returnDate" : null,
          "budget" : null,
          "transport" : null,
          "wish" : null
        };
      }else{
        settings.memory_cart_form = currentLocalStorage;
      }

      function initDatePicker(){

        var todayDate = new Date();

        $( "#departure-datepicker" ).datepicker({
          minDate: new Date(todayDate.getFullYear(), (todayDate.getMonth()), todayDate.getDate()),
          numberOfMonths: 1
        });

        $( "#return-datepicker" ).datepicker({
          defaultDate: "+1w",
          numberOfMonths: 1
        });

        // Set datepicker french language
        if(navigator.languages.indexOf("fr") > 0){
          $("#departure-datepicker").datepicker( $.datepicker.regional["fr"] );
          $("#return-datepicker").datepicker( $.datepicker.regional["fr"] );
        }
      }
      initDatePicker();

      function setLocalStorage(){
        // Stringify object to pass in localStorage
        localStorage.setItem("localStorageCartFormSettings", JSON.stringify(settings.memory_cart_form));
      }
      setLocalStorage();

      function initLocalStorage(){

        // Retrieve and parse localStorage
        // var cartFormSettings = JSON.parse(localStorage.getItem("localStorageCartFormSettings"));
        //
        // console.log(cartFormSettings);
      }
      initLocalStorage();

      // Update field : Firstname
      $("#firstname input").keyup(function() {
        var firstname = $(this).val();

        settings.memory_cart_form.firstname = (firstname === "") ? null : firstname;
        setLocalStorage();
      });

      // Update field : Lastname
      $("#lastname input").keyup(function() {
        var lastname = $(this).val();

        settings.memory_cart_form.lastname = (lastname === "") ? null : lastname;
        setLocalStorage();
      });

      // Update field : E-mail
      $("#email input").keyup(function() {
        var email = $(this).val();

        settings.memory_cart_form.email = (email === "") ? null : email;
        setLocalStorage();
      });

      // Update field : Phone
      $("#phone input").keyup(function() {
        var phone = $(this).val();

        settings.memory_cart_form.phone = (phone === "") ? null : phone;
        setLocalStorage();
      });

      // Update field : Location
      $("#location input").keyup(function() {
        var location = $(this).val();

        settings.memory_cart_form.location = (location === "") ? null : location;
        setLocalStorage();
      });

      // Update field : Participants
      $("#participants input").keypress(function (e) {
        e.preventDefault();
      });
      $("#participants input").change(function() {
        var participants = $(this).val();

        settings.memory_cart_form.participants = (participants === "") ? null : participants;
        setLocalStorage();
      });

      // Update field : Budget
      $("#budget > select").click(function(){
        var budget = $(this).val();

        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + budget + "\"]").attr("selected", "selected");
        $(this).val(budget);

        settings.memory_cart_form.budget = (budget === "") ? null : budget;
        setLocalStorage();
      });

      // Update field : Transport
      $("#transport > select").click(function(){
        var transport = $(this).val();

        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + transport + "\"]").attr("selected", "selected");
        $(this).val(transport);

        settings.memory_cart_form.transport = (transport === "") ? null : transport;
        setLocalStorage();
      });

      // Update field : Wish
      $("#wish textarea").keyup(function() {
        var wish = $(this).val();

        settings.memory_cart_form.wish = (wish === "") ? null : wish;
        setLocalStorage();
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
          var dayName = $.datepicker.formatDate("DD", incrementDate);

          $("#trip-global-container > div").append(
            "<div class=\"trip-days day-" + i + "\">" +
              "<div class=\"trip-days-header\">" +
                "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
                "<p style=\"text-transform: capitalize;\">" + dayName + " " + incrementDate.toLocaleDateString() + "</p>" +
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

        var departureDate = $(this).datepicker("getDate");

        if(lastValueDepartureDate === null){ // Initialize the departure date

          $("#return-date").show();
          $("#return-datepicker").removeAttr("disabled");
          $("#return-datepicker").datepicker("option", "minDate", departureDate);
        }else{

          var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

          if(isConfirmed){

            $("#return-datepicker").datepicker("option", "minDate", departureDate);

            updateDates();
          }else{
            $(this).datepicker("setDate", lastValueDepartureDate);
          }
        }

        settings.memory_cart_form.departureDate = (departureDate === null) ? null : departureDate.getTime();
        setLocalStorage();

        $("#departure-date i.clear-input").css("display", "block");
      });

      // Delete the departure date
      $("#departure-date i.clear-input").click(function(){

        var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

        if(isConfirmed) {

          $("#return-datepicker").datepicker("option", "minDate", null);
          $("#return-datepicker").prop("disabled", true);
          $("#return-datepicker").datepicker("setDate", null);
          $("#return-date").hide();

          settings.memory_cart_form.returnDate = null;
          settings.memory_cart_form.departureDate = null;

          $("#departure-datepicker").datepicker("option", "maxDate", null);
          $("#departure-datepicker").datepicker("setDate", null);

          setLocalStorage();
          updateDates();

          $("#departure-date i.clear-input").css("display", "none");
          $("#return-date i.clear-input").css("display", "none");
        }
      });

      $("#return-datepicker").click(function() {
        lastValueReturnDate = $(this).datepicker("getDate");
      }).on( "change", function() {

        var returnDate = $(this).datepicker("getDate");

        if(lastValueReturnDate === null) { // Initialize the return date

          $("#departure-datepicker").datepicker("option", "maxDate", returnDate);
          updateDates();
        }else{

          var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

          if(isConfirmed){

            $("#departure-datepicker").datepicker("option", "maxDate", returnDate);
            updateDates();
          }else{ // Cancel change
            $(this).datepicker("setDate", lastValueReturnDate);
          }
        }

        settings.memory_cart_form.returnDate = (returnDate === null) ? null : returnDate.getTime();
        setLocalStorage();

        $("#return-date i.clear-input").css("display", "block");
      });

      // Delete the return date
      $("#return-date i.clear-input").click(function(){

        var isConfirmed = confirm("Attention, vous avez sélectionné de nouvelle date. Certaines journées ainsi que leurs activités seront supprimées.");

        if(isConfirmed){

          $("#departure-datepicker").datepicker("option", "maxDate", null);
          $("#return-datepicker").datepicker("setDate", null);

          settings.memory_cart_form.returnDate = null;
          setLocalStorage();

          updateDates();

          $("#return-date i.clear-input").css("display", "none");
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

          settings.memory_cart_form.returnDate = currentReturnDate.getTime();
          setLocalStorage();

          updateDates();
        }
      });

      /* ---------- Validate cart ---------- */
      // function setFieldsValueToObject(){
      //
      //   location = $("#location > input").val();
      //   participants = $("#participants > input").val();
      //   departureDate = $("#departure-datepicker").datepicker("getDate");
      //   returnDate = $("#return-datepicker").datepicker("getDate");
      //   budget = $("#budget > select").val();
      //   transport = $("#transport > select").val();
      //   wish = $("#wish > textarea").val();
      //
      //   settings.memory_cart_form = {
      //     "location" : (location === "") ? null : location,
      //     "participants" : (participants === "") ? null : participants,
      //     "departureDate" : (departureDate === null) ? null : departureDate.getTime(),
      //     "returnDate" : (returnDate === null) ? null : returnDate.getTime(),
      //     "budget" : parseInt(budget),
      //     "transport" : parseInt(transport),
      //     "wish" : (wish === "") ? null : wish,
      //   };
      // }

      // $("#validate-cart").click(function(){
      //   setFieldsValueToObject();
      // });

      /* ---------- Empty cart ---------- */
      $("#empty-cart").click(function(){

        var isConfirmed = confirm("Attention, les données relatives à votre séjour ainsi que les activités seront supprimées. Voulez-vous continuer ?");

        if(isConfirmed){

          $("#location > input").val("");

          $("#participants > input").val("");

          $("#departure-datepicker").datepicker("setDate", null);
          $("#departure-datepicker").datepicker("option", "maxDate", null);

          $("#return-datepicker").datepicker("setDate", null);
          $("#return-datepicker").datepicker("option", "minDate", null);
          $("#return-datepicker").datepicker("option", "maxDate", null);
          $("#return-date").prop("disabled", true);
          $("#return-date").hide();

          $("#budget > select").find("option").removeAttr("selected");
          $("#budget > select").find("option[value=\"\"]").attr("selected", "selected");
          $("#budget > select").val("");

          $("#transport > select").find("option").removeAttr("selected");
          $("#transport > select").find("option[value=\"\"]").attr("selected", "selected");
          $("#transport > select").val("");

          $("#wish textarea").val("");

          settings.memory_cart_form = {
            "firstname" : settings.memory_cart_form.firstname,
            "lastname" : settings.memory_cart_form.lastname,
            "email" : settings.memory_cart_form.email,
            "phone" : settings.memory_cart_form.phone,
            "location" : null,
            "participants" : null,
            "departureDate" : null,
            "returnDate" : null,
            "budget" : null,
            "transport" : null,
            "wish" : null,
          };

          setLocalStorage();

          $("#trip-global-container > div").empty();
          $("#trip-disclaimer").show();
          $("#departure-date i.clear-input").css("display", "none");
          $("#return-date i.clear-input").css("display", "none");
        }
      });
    }
  };
}(jQuery));
