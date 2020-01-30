(function ($) {

  var activityCategory = null;
  var activityNid = null;
  var activityTitle = null;
  var activityDestinationPath = null;
  var activityContainer = null;
  var optionImage = null;
  var optionTitle = null;
  var optionPrice = null;
  var maximumActivitiesNumber = 3;
  var categoryTransfersID = "68";
  var categoryAccommodationsID = "70";
  var isHtmlDefaultStructureSet = false;
  var _advancedFormConfig;

  Drupal.behaviors.memory_cart_advanced_form = {

    setDrupalConfig : function(){
      activityCategory = $(".activity-category").val();
      activityNid = $(".activity-nid").val();
      activityTitle = $(".activity-title").val();
      activityDestinationPath = $(".activity-destination-path").val();
      _advancedFormConfig = Drupal.behaviors.memory_cart_advanced_form;
    },

    attach: function (context, settings) {

      this.setDrupalConfig();

      console.log("--- Load : memory_cart_advanced_form");

      var localStorageCartTrip = JSON.parse(localStorage.getItem("localStorageCartTrip"));

      if(localStorageCartTrip === null){
        settings.memory_cart_advanced_form = {
          "transfers" : [null, null],
          "accommodations" : [],
          "activities" : [],
        };
      }else{
        settings.memory_cart_advanced_form = localStorageCartTrip;
      }

      _advancedFormConfig.setLocalStorage(settings);

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

          // Remove an accommodation : Update localStorage for accommodations
          settings.memory_cart_advanced_form.accommodations.splice(activitiesContainerToDelete.index(),1);
          _advancedFormConfig.setLocalStorage(settings);

          activitiesContainerToDelete.remove();

          if($(".trip-days").length === 0){
            $("#trip-disclaimer").show();
          }else{
            // Remove the accommodation section for the last day
            $(".trip-days").eq($(".trip-days").length - 1).find(".trip-accommodation").remove();

            // Remove the last accommodation : Update localStorage for accommodations
            settings.memory_cart_advanced_form.accommodations.splice(($(".trip-days").length - 1),1);
            _advancedFormConfig.setLocalStorage(settings);
          }
        }
      });

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
          _advancedFormConfig.addNewDay(dayIndex + 1);
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
        ){ _advancedFormConfig.setDefaultStructureHTML(); }

        switch(activityCategory){
          case categoryTransfersID : // Add transfer

            var isFirstTransferSet = ($(".trip-transfer:eq(0) .transfer").length === 1 ) ? true : false;
            var isSecondTransferSet = ($(".trip-transfer:eq(1) .transfer").length === 1 ) ? true : false;

            if(!isFirstTransferSet || !isSecondTransferSet) {
              var transferIndex = (!isFirstTransferSet) ? 0 : 1; // Define the container number
              _advancedFormConfig.addTransferToCart(settings, transferIndex, true);
            }

            break;
          case categoryAccommodationsID : // Add accommodation
            console.log("--- Add accommodation");

            var isAccommodationField = ($(".trip-accommodation").length === 0) ? false : true;

            if(isAccommodationField){

              var accommodationIndex = null;

              $(".trip-accommodation").each(function(elIndex){

                if($(this).find(".accommodation").length === 0){
                  accommodationIndex = elIndex;
                  return false;
                }
              });

              if(accommodationIndex !== null){
                _advancedFormConfig.addAccommodationToCart(settings, accommodationIndex, true);
              }
            }

            break;
          default : // Add activity
            console.log("--- Add activity");
            checkDaysAvailability();
        }
      });

      $("#empty-cart").click(function() {
        isHtmlDefaultStructureSet = false;

        // TODO : Reset localStorage
        settings.memory_cart_advanced_form.transfers = [null, null];
        settings.memory_cart_advanced_form.accommodations = [];

        _advancedFormConfig.setLocalStorage(settings);
      });

      // Remove a transfer
      $("#trip-global-container").on("click", ".btn-remove-transfer", function(){

        var transferContainer = $(this).parent().parent();
        var transferIndex = (transferContainer.index() === 0) ? 0 : 1;

        // Update Transfers localStorage
        settings.memory_cart_advanced_form.transfers[transferIndex] = null;
        _advancedFormConfig.setLocalStorage(settings);

        // Update HTML transfer container
        transferContainer.children("p").show();
        transferContainer.children("button").show();
        transferContainer.children("div.transfer").remove();
      });

      // Remove an accommodation
      $("#trip-global-container").on("click", ".btn-remove-accommodation", function(){

        var accommodationContainer = $(this).parent().parent();
        var accommodationIndex = accommodationContainer.parent().parent().index();

        // Update Transfers localStorage
        settings.memory_cart_advanced_form.accommodations[accommodationIndex] = null;
        _advancedFormConfig.setLocalStorage(settings);

        // Update HTML transfer container
        accommodationContainer.children("p").show();
        accommodationContainer.children("button").show();
        accommodationContainer.children("div.accommodation").remove();
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

      // Click on a accommodation button
      $("#trip-global-container").on("click", ".trip-accommodation > button", function() {

        switch($("#cart-container").attr("class")){
          case "destination-page" :
            var activitiesFilter = $(this).attr("class");
            autoScrollToRightCategory(activitiesFilter);
            break;
          case "activity-page" :
            localStorage.setItem("showAccommodations", JSON.stringify(true));
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

      if(JSON.parse(localStorage.getItem("showAccommodations"))){
        var accommodationFilter = $("#trip-global-container .trip-accommodation > button").attr("class");
        autoScrollToRightCategory(accommodationFilter);
        localStorage.removeItem("showAccommodations");
      }
      if(JSON.parse(localStorage.getItem("showTransfers"))){
        var transferFilter = $("#trip-global-container .trip-transfer > button").attr("class");
        autoScrollToRightCategory(transferFilter);
        localStorage.removeItem("showTransfers");
      }

      _advancedFormConfig.initLocalStorage(settings);

      // Delete the return date
      $("#return-date i.clear-input").click(function(){
        isHtmlDefaultStructureSet = false;
        _advancedFormConfig.initLocalStorage(settings);
      });
      // Delete the departure date
      $("#departure-date i.clear-input").click(function(){
        isHtmlDefaultStructureSet = false;
        _advancedFormConfig.initLocalStorage(settings);
      });

      // When return date is set, call initLocalStorage() in order to set user cart choices
      $("#return-datepicker").on( "change", function() {
        _advancedFormConfig.initLocalStorage(settings);
      });
    },

    // Init localStorage by setting every parameters in there right place
    initLocalStorage : function(settings){

      console.log("initLocalStorage ADVANCED FORM ");

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
        ){ _advancedFormConfig.setDefaultStructureHTML(); }

        if(settings.memory_cart_advanced_form.transfers[0] !== null){
          _advancedFormConfig.addTransferToCart(settings, "0", false);
        }
        if(settings.memory_cart_advanced_form.transfers[1] !== null){
          _advancedFormConfig.addTransferToCart(settings,"1", false);
        }
      }

      // Init accommodation localStorage
      if(settings.memory_cart_advanced_form.accommodations.length !== 0){

        // Add default HTML structure. Should called once.
        if(
          !isHtmlDefaultStructureSet &&
          (settings.memory_cart_form.departureDate === null ||
            settings.memory_cart_form.returnDate === null)
        ){
          _advancedFormConfig.setDefaultStructureHTML();
        }

        if(
          (settings.memory_cart_form.departureDate === null ||
            settings.memory_cart_form.returnDate === null)
        ) {
          for (var j = 0; j < settings.memory_cart_advanced_form.accommodations.length; j++) {
            _advancedFormConfig.addNewDay(j + 1);
          }
        }

        for(var i = 0; i < settings.memory_cart_advanced_form.accommodations.length; i++){
          if(settings.memory_cart_advanced_form.accommodations[i] !== null){
            _advancedFormConfig.addAccommodationToCart(settings, i, false);
          }
        }
      }
    },

    // Construct the HTML structure of a day
    setDefaultStructureHTML : function(){

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
    },

    addNewDay : function(dayIndexToAdd){

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

        if($(this).index() < ($(".trip-days").length - 1)){ // Add accommodation except for the last day

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
    },

    addAccommodationToCart : function(settings, accommodationIndex, isAccommodationAdd){

      if(isAccommodationAdd){ // Check if it's an accommodation in order to avoid the reset of settings...accommodations fields.

        // Set Accommodation localStorage
        var accommodationObject = {
          "activityNid" : activityNid,
          "activityDestinationPath" : activityDestinationPath,
          "optionImage" : optionImage,
          "activityTitle" : activityTitle,
          "optionTitle" : optionTitle,
          "optionPrice" : optionPrice
        };

        var accommodationIndexArray = settings.memory_cart_advanced_form.accommodations.indexOf(accommodationObject);

        if(accommodationIndexArray !== -1){ // Init the accommodation localStorage
          settings.memory_cart_advanced_form.accommodations[accommodationIndex] = accommodationObject;
        }else{

          var isNullIndex = settings.memory_cart_advanced_form.accommodations.indexOf(null);

          if(isNullIndex !== -1){
            settings.memory_cart_advanced_form.accommodations[isNullIndex] = accommodationObject;
          }else{
            settings.memory_cart_advanced_form.accommodations.push(accommodationObject);
          }
        }

        _advancedFormConfig.setLocalStorage(settings);
      }

      $(".trip-accommodation:eq(" + accommodationIndex + ") > p").hide();
      $(".trip-accommodation:eq(" + accommodationIndex + ") > button").hide();

      $(".trip-accommodation:eq(" + accommodationIndex + ")").append(
        "<div class=\"accommodation\">" +
        "<div class=\"positioning-btn\">" +
        "<button type=\"button\" class=\"btn-go-up\">" +
        "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
        "</button>" +
        "<button type=\"button\" class=\"btn-go-down\">" +
        "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
        "</button>" +
        "</div>" +
        "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].activityNid + "\">" +
        "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].activityDestinationPath + "\">" +
        "<div class=\"activities-img-container\">" +
        "<img src=\"" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].optionImage + "\">" +
        "</div>" +
        "<div class=\"activities-titles-container\">" +
        "<p>" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].activityTitle + "</p>" +
        "<p class='activities-pack-title'>" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].optionTitle + "</p>" +
        "</div>" +
        "<div class=\"activities-price-container\">" +
        "<p>" + settings.memory_cart_advanced_form.accommodations[accommodationIndex].optionPrice + "</p>" +
        "</div>" +
        "<button type=\"button\" class=\"btn-remove-accommodation\">" +
        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
        "</button>" +
        "</div>"
      );
    },

    setLocalStorage : function(settings){
      console.log("setLocalStorage");
      // Stringify object to pass in localStorage
      localStorage.setItem("localStorageCartTrip", JSON.stringify(settings.memory_cart_advanced_form));
      // localStorage.setItem("localStorageCartTransfers", JSON.stringify(settings.memory_cart_advanced_form.transfer));
    },

    addTransferToCart : function(settings, transferIndex, isTransferAdd){

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
        _advancedFormConfig.setLocalStorage(settings);
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
  };
}(jQuery));
