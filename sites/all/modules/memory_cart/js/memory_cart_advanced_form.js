(function ($) {
  Drupal.behaviors.memory_cart_advanced_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_advanced_form");

      // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
      var activityCategory = $(".activity-category").val();
      var activityNid = $(".activity-nid").val();
      var activityTitle = $(".activity-title").val();
      var activityDestinationPath = $(".activity-destination-path").val();
      var activityContainer = null;
      var optionImage = null;
      var optionTitle = null;
      var optionPrice = null;
      var maximumActivitiesNumber = 3;
      var categoryTransfersID = "68";
      var categoryAccomodationsID = "70";
      var isHtmlDefaultStructureSet = false;

      var localStorageCartTrip = JSON.parse(localStorage.getItem("localStorageCartTrip"));

      if(localStorageCartTrip === null){
        settings.memory_cart_advanced_form = {
          "transfers" : [null, null],
          "accomodations" : [],
          "activities" : [],
        };
      }else{
        settings.memory_cart_advanced_form = localStorageCartTrip;
      }

      // Init localStorage
      // var currentLocalStorageActivities = JSON.parse(localStorage.getItem("localStorageCartActivities"));
      //
      // if(currentLocalStorageActivities === null){
      //   settings.memory_cart_advanced_form = {};
      // }else{
      //   settings.memory_cart_advanced_form = currentLocalStorageActivities;
      // }


      function setLocalStorage(){
        // Stringify object to pass in localStorage
        localStorage.setItem("localStorageCartTrip", JSON.stringify(settings.memory_cart_advanced_form));
        // localStorage.setItem("localStorageCartTransfers", JSON.stringify(settings.memory_cart_advanced_form.transfer));
      }
      setLocalStorage();

      $("#trip-global-container").on("click", "i.trip-delete-default-day", function(){

        var isConfirmed = confirm("Attention, vous souhaitez supprimer une journée. Les activités relatives à cette journée seront supprimées.");

        if(isConfirmed) {

          var activitiesContainerToDelete = $(this).parent().parent();

          $("div.trip-days").each(function() {

            // Modify element day number data for every trip days with an index greater than the future delete one.
            if($(this).index() > activitiesContainerToDelete.index()){

              $(this).removeClass("day-" + $(this).index());
              $(this).addClass("day-" + ($(this).index() - 1));
              $(this).find(".trip-days-header p").text("Jour " + $(this).index());
            }
          });

          activitiesContainerToDelete.remove();

          if($(".trip-days").length === 0){
            $("#trip-disclaimer").show();
          }else{
            // Remove the accomodation section for the last day
            $(".trip-days").eq($(".trip-days").length - 1).find(".trip-accommodation").remove();
          }
        }
      });

      function addNewDay(dayIndexToAdd){

        $("#trip-disclaimer").hide();

        $("#trip-global-container > div#trip-activities-container").append(
          "<div class=\"trip-days day-" + dayIndexToAdd + "\">" +
            "<div class=\"trip-days-header\">" +
              "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
              "<p style=\"text-transform: capitalize;\">Jour " + (dayIndexToAdd + 1) + "</p>" +
              "<i class=\"fa fa-times trip-delete-default-day\" aria-hidden=\"true\"></i>" +
            "</div>" +
            "<div class=\"trip-days-body\">" +
              "<div class=\"trip-activities\">" +
                "<p>Aucune activité choisie</p>" +
              "</div>" +
            "</div>" +
          "</div>"
        );

        $(".trip-days").each(function(){

          if($(this).index() < ($(".trip-days").length - 1)){ // Add accomodation except for the last day

            if($(this).find(".trip-accommodation").length === 0){

              $(this).find(".trip-days-body").append(
                "<div class=\"trip-accommodation\">" +
                "<p>Aucun hébergement</p>" +
                "<button type=\"button\" class=\"filter-70\">VOIR HEBERGEMENTS</button>" +
                "</div>"
              );
            }
          }
        });
      }

      // Construct the HTML structure of a day
      function setDefaultStructureHTML(){

        $("#trip-disclaimer").hide();

        // Add one day
        $("#trip-global-container > div#trip-activities-container").append(
          "<div class=\"trip-days day-0\">" +
            "<div class=\"trip-days-header\">" +
              "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
              "<p style=\"text-transform: capitalize;\">Jour 1</p>" +
              "<i class=\"fa fa-times trip-delete-default-day\" aria-hidden=\"true\"></i>" +
            "</div>" +
            "<div class=\"trip-days-body\">" +
              "<div class=\"trip-activities\">" +
                "<p>Aucune activité choisie</p>" +
              "</div>" +
            "</div>" +
          "</div>"
        );

        // Add transfer for the first and last day
        var transferStructureHTML =
          "<div class=\"trip-transfer\">" +
            "<p>Aucun transfert</p>" +
            "<button type=\"button\" class=\"filter-68\">VOIR TRANSFERTS</button>" +
          "</div>"
        ;

        $("#trip-global-container")
          .prepend(transferStructureHTML)
          .append(transferStructureHTML);

        isHtmlDefaultStructureSet = true;
      }

      function addActivityToCart(dayIndex){

        if($(".trip-days.day-" + dayIndex + " .trip-activities").children("p").length === 1){
          $(".trip-days.day-" + dayIndex + " .trip-activities > p").remove();
        }

        // Add activity to cart
        $(".trip-days.day-" + dayIndex + " .trip-activities").append(
          "<div class=\"activities\">" +
            "<div class=\"positioning-btn\">" +
              "<button type=\"button\" class=\"btn-go-up\">" +
                "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
              "</button>" +
              "<button type=\"button\" class=\"btn-go-down\">" +
                "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
              "</button>" +
            "</div>" +
            "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + activityNid + "\">" +
            "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + activityDestinationPath + "\">" +
            "<div class=\"activities-img-container\">" +
              "<img src=\"" + optionImage + "\">" +
            "</div>" +
            "<div class=\"activities-titles-container\">" +
              "<p>" + activityTitle + "</p>" +
              "<p class='activities-pack-title'>" + optionTitle + "</p>" +
            "</div>" +
            "<div class=\"activities-price-container\">" +
              "<p>" + optionPrice + "</p>" +
            "</div>" +
            "<button type=\"button\" class=\"btn-remove-activity\">" +
              "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
            "</button>" +
          "</div>"
        );
      }

      function checkActivityNotAlreadySet(dayIndex){

        var isActivityExists = false;
        var activityContainer = $("div.trip-days.day-" + dayIndex + " .trip-activities .activities");

        activityContainer.each(function(){

          var thisActivityNid = $(this).find(".input-hidden-nid").val();
          var thisActivityTitle = $(this).find(".activities-titles-container").children("p:eq(0)").text();
          var thisActivityDestinationPath = $(this).find(".input-hidden-destination").val();
          var thisOptionTitle = $(this).find(".activities-pack-title").text();

          if(
            activityNid === thisActivityNid &&
            activityTitle === thisActivityTitle &&
            activityDestinationPath === thisActivityDestinationPath &&
            optionTitle === thisOptionTitle
          ){
            isActivityExists = true;
            return false;
          }
        });

        return isActivityExists;
      }

      function addToCalendarOrDefaultDates(dayIndex, alertMessage){

        var isCalendarDates = $("div.trip-days.day-" + dayIndex + "").attr("data-day-timestamp");

        if(typeof isCalendarDates === "undefined"){ // If dates were set by default.
          addNewDay(dayIndex + 1);
          addActivityToCart(dayIndex + 1);
        }else{ // If dates were set through calendar.

          alert(alertMessage);
        }
      }

      function checkDaysAvailability() {

        var alertMessage = "";
        var calendarNbDays = $("#trip-activities-container").children("div.trip-days").length; // Get the number of days

        if (calendarNbDays === 0) { // If any dates/days are set in the trip container. That means user didn't select dates through the calendar.
          addActivityToCart(0);
        } else { // If dates/days are already set in the trip container.

          for (var i = 0; i < calendarNbDays; i++) { // Browse through days container

            var isActivityExists = checkActivityNotAlreadySet(i); // Can't add twice the same activity in the same day

            if(isActivityExists){

              if(i === (calendarNbDays - 1)){ // If it's the last day.
                alertMessage = "L'activité sélectionnée est déjà présente une fois dans chaque journée. Veuillez étendre votre séjour pour ajouter d'autres activités.";
                addToCalendarOrDefaultDates(i, alertMessage);
              }
            }else{

              var nbActivitiesInDay = $("div.trip-days.day-" + i + " .trip-activities").children("div.activities").length;

              if (nbActivitiesInDay < maximumActivitiesNumber) { // Set activity to cart.
                addActivityToCart(i);
                break; // Add once then break statement.
              }

              if(nbActivitiesInDay === maximumActivitiesNumber && i === (calendarNbDays - 1)){ // If every days are filled.
                alertMessage = "Vos journées sont complètes. Veuillez étendre votre séjour pour ajouter d'autres activités.";
                addToCalendarOrDefaultDates(i, alertMessage);
              }
            }
          }
        }

        // TODO : Set to localStorage
        var activityObj = {};
      }

      function addTransferToCart(transferIndex, isTransferAdd){

        if(isTransferAdd){ // Check if it's a transfer in order to avoid the reset of settings...transfers fields.

          // Set Transfers localStorage
          var transferObject = {
            "activityNid" : activityNid,
            "activityDestinationPath" : activityDestinationPath,
            "optionImage" : optionImage,
            "activityTitle" : activityTitle,
            "optionTitle" : optionTitle,
            "optionPrice" : optionPrice
          };
          settings.memory_cart_advanced_form.transfers[transferIndex] = transferObject;
          setLocalStorage();
        }

        $(".trip-transfer:eq(" + transferIndex + ") > p").hide();
        $(".trip-transfer:eq(" + transferIndex + ") > button").hide();

        $(".trip-transfer:eq(" + transferIndex + ")").append(
          "<div class=\"transfer\">" +
            "<div class=\"positioning-btn\">" +
              "<button type=\"button\" class=\"btn-go-up\">" +
                "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
              "</button>" +
              "<button type=\"button\" class=\"btn-go-down\">" +
                "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
              "</button>" +
            "</div>" +
            "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.transfers[transferIndex].activityNid + "\">" +
            "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.transfers[transferIndex].activityDestinationPath + "\">" +
            "<div class=\"activities-img-container\">" +
              "<img src=\"" + settings.memory_cart_advanced_form.transfers[transferIndex].optionImage + "\">" +
            "</div>" +
            "<div class=\"activities-titles-container\">" +
              "<p>" + settings.memory_cart_advanced_form.transfers[transferIndex].activityTitle + "</p>" +
              "<p class='activities-pack-title'>" + settings.memory_cart_advanced_form.transfers[transferIndex].optionTitle + "</p>" +
            "</div>" +
            "<div class=\"activities-price-container\">" +
              "<p>" + settings.memory_cart_advanced_form.transfers[transferIndex].optionPrice + "</p>" +
            "</div>" +
            "<button type=\"button\" class=\"btn-remove-transfer\">" +
              "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
            "</button>" +
          "</div>"
        );
      }

      // Add an activity to the user cart
      $(".cont-add-cart").click(function(){

        activityContainer = $(this).parent().parent().parent();

        optionImage = activityContainer.children("div.prestation-main").find("div.prestation-image").css("background-image");
        if(typeof optionImage === "undefined"){ // If option has not image, set the activity image by default
          optionImage = $("#activity-header-container > img").attr("src");
        }else{
          optionImage = optionImage.split("url(\"")[1].split("\")")[0];
        }

        optionTitle = activityContainer.children("div.prestation-header").find("h2").text();
        optionPrice = activityContainer.children("div.prestation-header").find("p.prestation-price").text();

        // Add default HTML structure. Should called once.
        if(
          !isHtmlDefaultStructureSet &&
          (settings.memory_cart_form.departureDate === null ||
          settings.memory_cart_form.returnDate === null)
        ){ setDefaultStructureHTML(); }

        switch(activityCategory){
          case categoryTransfersID : // Add transfer

            var isFirstTransferSet = ($(".trip-transfer:eq(0) .transfer").length === 1 ) ? true : false;
            var isSecondTransferSet = ($(".trip-transfer:eq(1) .transfer").length === 1 ) ? true : false;

            if(!isFirstTransferSet || !isSecondTransferSet) {
              var transferIndex = (!isFirstTransferSet) ? 0 : 1; // Define the container number
              addTransferToCart(transferIndex, true);
            }

            break;
          case categoryAccomodationsID : // Add accomodation
            console.log("--- Add accomodation");
            break;
          default : // Add activity
            console.log("--- Add activity");
            checkDaysAvailability();
        }
      });

      $("#empty-cart").click(function() {
        isHtmlDefaultStructureSet = false;
      });

      // Remove a transfer
      $("#trip-global-container").on("click", ".btn-remove-transfer", function(){

        var transferContainer = $(this).parent().parent();
        var transferIndex = (transferContainer.index() === 0) ? 0 : 1;

        // Update Transfers localStorage
        settings.memory_cart_advanced_form.transfers[transferIndex] = null;
        setLocalStorage();

        // Update HTML transfer container
        transferContainer.children("p").show();
        transferContainer.children("button").show();
        transferContainer.children("div.transfer").remove();
      });

      // Filters part
      function autoScrollToRightCategory(activitiesFilter){

        var filterMenuOffsetTop = $("#cont-filters").offset().top - 100;

        $("html, body").stop().animate(
          {scrollTop:filterMenuOffsetTop},
          500,
          "swing",
          function(){
            $("#cont-filters ." + activitiesFilter).trigger("click");
          }
        );
      }

      // Click on a accomodation button
      $("#trip-global-container").on("click", ".trip-accommodation > button", function() {

        switch($("#cart-container").attr("class")){
          case "destination-page" :
            var activitiesFilter = $(this).attr("class");
            autoScrollToRightCategory(activitiesFilter);
            break;
          case "activity-page" :
            localStorage.setItem("showAccomodations", JSON.stringify(true));
            window.location = activityDestinationPath;
            break;
        }
      });

      // Click on a transfer button
      $("#trip-global-container").on("click", ".trip-transfer > button", function() {

        switch($("#cart-container").attr("class")){
          case "destination-page" :
            var activitiesFilter = $(this).attr("class");
            autoScrollToRightCategory(activitiesFilter);
            break;
          case "activity-page" :
            localStorage.setItem("showTransfers", JSON.stringify(true));
            window.location = activityDestinationPath;
            break;
        }
      });

      if(JSON.parse(localStorage.getItem("showAccomodations"))){
        var accomodationFilter = $("#trip-global-container .trip-accommodation > button").attr("class");
        autoScrollToRightCategory(accomodationFilter);
        localStorage.removeItem("showAccomodations");
      }
      if(JSON.parse(localStorage.getItem("showTransfers"))){
        var transferFilter = $("#trip-global-container .trip-transfer > button").attr("class");
        autoScrollToRightCategory(transferFilter);
        localStorage.removeItem("showTransfers");
      }

      // Init localStorage by setting every parameters in there right place
      function initLocalStorage(){

        // Init transfer localStorage
        if(
          settings.memory_cart_advanced_form.transfers[0] !== null ||
          settings.memory_cart_advanced_form.transfers[1] !== null
        ){
          // Add default HTML structure. Should called once.
          if(
            !isHtmlDefaultStructureSet &&
            (settings.memory_cart_form.departureDate === null ||
            settings.memory_cart_form.returnDate === null)
          ){ setDefaultStructureHTML(); }

          if(settings.memory_cart_advanced_form.transfers[0] !== null){
            addTransferToCart("0", false);
          }
          if(settings.memory_cart_advanced_form.transfers[1] !== null){
            addTransferToCart("1", false);
          }
        }
      }
      initLocalStorage();

      // Delete the return date
      $("#return-date i.clear-input").click(function(){
        isHtmlDefaultStructureSet = false;
        initLocalStorage();
      });
      // Delete the departure date
      $("#departure-date i.clear-input").click(function(){
        isHtmlDefaultStructureSet = false;
        initLocalStorage();
      });

      // When return date is set, call initLocalStorage() in order to set user cart choices
      $("#return-datepicker").on( "change", function() {
        initLocalStorage();
      });
    }
  };
}(jQuery));
