(function ($) {

  var activityCategory = null;
  var activityNid = null;
  var activityTitle = null;
  var activityDestinationPath = null;
  var activityContainer = null;
  var optionImage = null;
  var optionTitle = null;
  var optionPrice = null;
  var maximumActivitiesNumber = 6;
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

      var localStorageCartTrip = JSON.parse(localStorage.getItem("localStorageCartTrip"));

      if(localStorageCartTrip === null){
        settings.memory_cart_advanced_form = {
          "city" : null,
          "transfers" : [null, null],
          "accommodations" : [],
          "activities" : {},
        };
      }else{
        settings.memory_cart_advanced_form = localStorageCartTrip;
      }

      _advancedFormConfig.setLocalStorage(settings);

      $("#trip-global-container").on("click", "i.trip-delete-default-day", function(){

        var isConfirmed = confirm("Attention, vous souhaitez supprimer une journée. Les activités relatives à cette journée seront supprimées.");

        if(isConfirmed) {

          var activitiesContainerToDelete = $(this).parent().parent();
          var dayIndexToDelete = activitiesContainerToDelete.index() + 1; // Day starts at 1 not 0

          $("div.trip-days").each(function() {

            var dayIndexToCompare = $(this).index() + 1;

            // Modify element day number data for every trip days with an index greater than the future delete one.
            if(dayIndexToCompare > dayIndexToDelete){

              $(this).removeClass("day-" + dayIndexToCompare);
              $(this).addClass("day-" + (dayIndexToCompare - 1));
              $(this).find(".trip-days-header p").text("Jour " + (dayIndexToCompare - 1));
            }
          });

          // Remove activities : Update localStorage for activities
          delete(settings.memory_cart_advanced_form.activities[dayIndexToDelete]);

          // Update localStorage in order to change the key (day) value for day greater than the one to delete
          for(var[key, value] of Object.entries(settings.memory_cart_advanced_form.activities)) {
            if(key > dayIndexToDelete){
              Object.defineProperty(settings.memory_cart_advanced_form.activities, (key - 1), Object.getOwnPropertyDescriptor(settings.memory_cart_advanced_form.activities, key));
              delete settings.memory_cart_advanced_form.activities[key];
            }
          }
          _advancedFormConfig.setLocalStorage(settings);

          activitiesContainerToDelete.remove();

          if($(".trip-days").length === 1){ // Remove the delete day button
            $(".trip-days.day-1 .trip-delete-default-day").remove();

            // Remove accommodation because can't have accommodation for 1 day
            settings.memory_cart_advanced_form.accommodations = [];
          }

          // Remove the accommodation section for the last day
          $(".trip-days.day-" + $(".trip-days").length).find(".trip-accommodation").remove();

          _advancedFormConfig.setLocalStorage(settings);

          _advancedFormConfig.anyActivitiesSet(settings);
        }
      });

      // Add an activity to the user cart
      $(".cont-add-cart").click(function(){

        var cityName = settings.memory_cart_advanced_form.city;
        var currentCityName = $(".destination-name").val();

        if(cityName === null || cityName === currentCityName){ // If city name is not set or activities are located in the city choosed

          activityContainer = $(this).parent().parent().parent();

          optionImage = activityContainer.children("div.prestation-main").find("div.prestation-image").css("background-image");
          if(typeof optionImage === typeof undefined || optionImage === false){ // If option has not image, set the activity image by default
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
          ){ _advancedFormConfig.setDefaultStructureHTML(settings); }

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

              var isAccommodationField = ($(".trip-accommodation").length === 0) ? false : true;

              if(isAccommodationField){

                if(settings.memory_cart_advanced_form.accommodations.length === 0){
                  _advancedFormConfig.addAccommodationToCart(settings, true);
                }
              }

              break;
            default : // Add activity

              var activityToAddContainer = $(this).parent().parent().parent();
              var thisActivityNid = $("#activity-page-container .activity-nid").val();
              var thisActivityTitle = $("#activity-page-container .activity-title").val();
              var thisActivityDestinationPath = $("#activity-page-container .activity-destination-path").val();
              var thisOptionTitle = activityToAddContainer.find(".prestation-header > div:eq(0) > h2").text();
              var dayIndex = null;
              var activityIndex = null;

              for(let [key, value] of Object.entries(settings.memory_cart_advanced_form.activities)){

                if(settings.memory_cart_advanced_form.activities[key].length < maximumActivitiesNumber){ // If days are not full. Means there is enough place to set an activity

                  if(settings.memory_cart_advanced_form.activities[key].length === 0){ // If the day contains no activity
                    dayIndex = parseInt(key);
                    activityIndex = 0;

                    if(
                      $("#return-datepicker").datepicker("getDate") === null &&
                      Object.keys(settings.memory_cart_advanced_form.activities).indexOf((dayIndex + 1).toString()) === -1
                    ){ // If no dates are set in calendar
                      _advancedFormConfig.addNewDay(settings, (dayIndex + 1));
                    }

                    break;
                  }else{ // If the day contains activities

                    var isActivityExists = false;

                    for(var l = 0; l < settings.memory_cart_advanced_form.activities[key].length; l++){ // Check if activity exists

                      if(
                        settings.memory_cart_advanced_form.activities[key][l].activityNid === thisActivityNid &&
                        settings.memory_cart_advanced_form.activities[key][l].activityTitle === thisActivityTitle &&
                        settings.memory_cart_advanced_form.activities[key][l].activityDestinationPath === thisActivityDestinationPath &&
                        settings.memory_cart_advanced_form.activities[key][l].optionTitle === thisOptionTitle
                      ){
                        isActivityExists = true;
                        break;
                      }
                    }

                    if(!isActivityExists){ // If the activity does not exist, add it.
                      dayIndex = key;
                      activityIndex = settings.memory_cart_advanced_form.activities[key].length;
                      break;
                    }
                  }
                }
              }

              if($("#return-datepicker").datepicker("getDate") === null){ // If no dates are set in calendar
                if(dayIndex === null && activityIndex === null){ // Case when every day contain the activity
                  dayIndex = Object.keys(settings.memory_cart_advanced_form.activities).length + 1;
                  activityIndex = 0;
                  _advancedFormConfig.addNewDay(settings, dayIndex);
                  _advancedFormConfig.addNewDay(settings, (dayIndex + 1));
                }
              }

              if(dayIndex !== null && activityIndex !== null){
                _advancedFormConfig.addActivityToCart(settings, dayIndex, activityIndex, true);
              }
          }

          settings.memory_cart_advanced_form.city = currentCityName;

          _advancedFormConfig.setCityName(settings);

          _advancedFormConfig.setLocalStorage(settings);
        }else{
          alert("Si vous souhaitez effectuer un séjour sur plusieurs destinations, contactez-nous directement par e-mail.");
        }
      });

      $("#empty-cart").click(function() {
        isHtmlDefaultStructureSet = false;

        settings.memory_cart_advanced_form.city = null;
        settings.memory_cart_advanced_form.transfers = [null, null];
        settings.memory_cart_advanced_form.accommodations = [];
        settings.memory_cart_advanced_form.activities = {};

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

        _advancedFormConfig.anyActivitiesSet(settings);
      });

      // Remove an accommodation
      $("#trip-global-container").on("click", ".btn-remove-accommodation", function(){

        // Update Accommodations localStorage
        settings.memory_cart_advanced_form.accommodations = [];
        _advancedFormConfig.setLocalStorage(settings);

        // Update HTML accommodation container
        $(".trip-accommodation > p").show();
        $(".trip-accommodation > button").show();
        $(".trip-accommodation > div.accommodation").remove();

        _advancedFormConfig.anyActivitiesSet(settings);
      });

      // Remove an activity
      $("#trip-global-container").on("click", ".btn-remove-activity", function(){

        var activityContainer = $(this).parent(".activities");
        var activitiesContainer = activityContainer.parent(".trip-activities");
        var activityIndex = activityContainer.index();
        var dayContainerIndex = parseInt(activitiesContainer.parent().parent().attr("class").split("day-")[1]);

        // Update Transfers localStorage
        settings.memory_cart_advanced_form.activities[dayContainerIndex].splice(activityIndex, 1);
        _advancedFormConfig.setLocalStorage(settings);

        // Update HTML transfer container
        if(activitiesContainer.children().length === 1 && activitiesContainer.children("p").length === 0){
          activitiesContainer.append("<p>Aucune activité choisie</p>");
        }

        activityContainer.remove();

        _advancedFormConfig.anyActivitiesSet(settings);
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

      _advancedFormConfig.initLocalStorage(settings, false, false);
    },

    // Init localStorage by setting every parameters in there right place
    initLocalStorage : function(settings, isTimestampMode, isHtmlDefaultStructureSet){

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
        ){
          _advancedFormConfig.setDefaultStructureHTML(settings);
          isHtmlDefaultStructureSet = true;
        }

        if(settings.memory_cart_advanced_form.transfers[0] !== null){
          _advancedFormConfig.addTransferToCart(settings, "0", false);
        }
        if(settings.memory_cart_advanced_form.transfers[1] !== null){
          _advancedFormConfig.addTransferToCart(settings,"1", false);
        }
      }

      if(
        settings.memory_cart_advanced_form.accommodations.length !== 0 ||
        Object.keys(settings.memory_cart_advanced_form.activities).length !== 0
      ){
        // Add default HTML structure. Should called once.
        if(
          !isHtmlDefaultStructureSet &&
          (settings.memory_cart_form.departureDate === null ||
            settings.memory_cart_form.returnDate === null)
        ){
          _advancedFormConfig.setDefaultStructureHTML(settings);
          isHtmlDefaultStructureSet = true;
        }

        // Set the number of days
        if(
          (settings.memory_cart_form.departureDate === null ||
            settings.memory_cart_form.returnDate === null)
        ){
          var nbDaysToAdd = Object.keys(settings.memory_cart_advanced_form.activities).length;

          if(settings.memory_cart_advanced_form.accommodations.length > nbDaysToAdd){
            nbDaysToAdd = settings.memory_cart_advanced_form.accommodations.length;
          }

          if(!isTimestampMode){
            for (var k = 2; k <= nbDaysToAdd; k++) { // setDefaultStructureHTML() add the first day so start here from the second
              _advancedFormConfig.addNewDay(settings,k);
            }
          }
        }

        // Init accommodation localStorage
        if( settings.memory_cart_advanced_form.accommodations.length !== 0 ){
          _advancedFormConfig.addAccommodationToCart(settings, false);
        }

        // Init activities localStorage
        for(var[key, value] of Object.entries(settings.memory_cart_advanced_form.activities)){
          for(var l = 0; l < settings.memory_cart_advanced_form.activities[key].length; l++){
            _advancedFormConfig.addActivityToCart(settings, key, l, false);
          }
        }
      }

      _advancedFormConfig.setCityName(settings);
    },

    // Construct the HTML structure of a day
    setDefaultStructureHTML : function(settings){

      $("#trip-disclaimer").hide();

      // Add one day
      $("#trip-global-container > div#trip-activities-container").append(
        "<div class=\"trip-days day-1\">" +
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

      if(Object.keys(settings.memory_cart_advanced_form.activities).length === 1){ // Remove trip delete button
        $(".trip-days.day-1 .trip-delete-default-day").remove();
      }

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

      // Set localStorage first day structure
      if(!(1 in settings.memory_cart_advanced_form.activities)){ // If key index does not exist
        settings.memory_cart_advanced_form.activities[1] = [];
        _advancedFormConfig.setLocalStorage(settings);
      }
    },

    addNewDay : function(settings, dayIndexToAdd){

      $("#trip-disclaimer").hide();

      $("#trip-global-container > div#trip-activities-container").append(
        "<div class=\"trip-days day-" + dayIndexToAdd + "\">" +
          "<div class=\"trip-days-header\">" +
            "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
            "<p style=\"text-transform: capitalize;\">Jour " + dayIndexToAdd + "</p>" +
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

        var dayIndexToCompare = $(this).index() + 1;

        if(dayIndexToCompare < $(".trip-days").length){ // Add accommodation except for the last day

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

      // If the first day does not contain delete button, add it
      if($(".trip-days").length > 1){
        if($(".trip-days.day-1 .trip-delete-default-day").length === 0){
          $(".trip-days.day-1 .trip-days-header").append("<i class=\"fa fa-times trip-delete-default-day\" aria-hidden=\"true\"></i>");
        }
      }

      // Set localStorage day structure
      if(!((dayIndexToAdd) in settings.memory_cart_advanced_form.activities)){ // If key index does not exist
        settings.memory_cart_advanced_form.activities[(dayIndexToAdd)] = [];
        _advancedFormConfig.setLocalStorage(settings);
      }
    },

    // addAccommodationToCart : function(settings, accommodationIndex, isAccommodationAdd){
    addAccommodationToCart : function(settings, isAccommodationAdd){

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

        settings.memory_cart_advanced_form.accommodations.push(accommodationObject);

        _advancedFormConfig.setLocalStorage(settings);
      }

      $(".trip-accommodation > p").hide();
      $(".trip-accommodation > button").hide();

      $(".trip-accommodation").append(
        "<div class=\"accommodation\">" +
          "<div class=\"positioning-btn\">" +
            "<button type=\"button\" class=\"btn-go-up\">" +
              "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
            "</button>" +
            "<button type=\"button\" class=\"btn-go-down\">" +
              "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
            "</button>" +
          "</div>" +
          "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.accommodations[0].activityNid + "\">" +
          "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.accommodations[0].activityDestinationPath + "\">" +
          "<div class=\"activities-img-container\">" +
            "<img src=\"" + settings.memory_cart_advanced_form.accommodations[0].optionImage + "\">" +
          "</div>" +
          "<div class=\"activities-titles-container\">" +
            "<p>" + settings.memory_cart_advanced_form.accommodations[0].activityTitle + "</p>" +
            "<p class='activities-pack-title'>" + settings.memory_cart_advanced_form.accommodations[0].optionTitle + "</p>" +
          "</div>" +
          "<div class=\"activities-price-container\">" +
            "<p>" + settings.memory_cart_advanced_form.accommodations[0].optionPrice + "</p>" +
          "</div>" +
          "<button type=\"button\" class=\"btn-remove-accommodation\">" +
            "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
          "</button>" +
        "</div>"
      );
    },

    setLocalStorage : function(settings){
      // Stringify object to pass in localStorage
      localStorage.setItem("localStorageCartTrip", JSON.stringify(settings.memory_cart_advanced_form));
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
    },

    addActivityToCart : function(settings, dayIndex, activityIndex, isActivityAdd){

      var dayDataTimestamp = $(".trip-days.day-" + dayIndex).attr("data-day-timestamp");
      dayDataTimestamp = (typeof dayDataTimestamp === typeof undefined) ? null : dayDataTimestamp;

      if(isActivityAdd){ // Check if it's an activity in order to avoid the reset of settings...activities fields.

        // Set activity localStorage
        var activityObject = {
          "activityNid" : activityNid,
          "activityDestinationPath" : activityDestinationPath,
          "optionImage" : optionImage,
          "activityTitle" : activityTitle,
          "optionTitle" : optionTitle,
          "optionPrice" : optionPrice,
          "dayTimestamp" : parseInt(dayDataTimestamp)
        };

        settings.memory_cart_advanced_form.activities[dayIndex][activityIndex] = activityObject;

        _advancedFormConfig.setLocalStorage(settings);
      }else{ // Update day timestamp if it changes

        var currentDayTimestamp = settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].dayTimestamp;

        if(currentDayTimestamp !== dayDataTimestamp){

          settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].dayTimestamp = parseInt(dayDataTimestamp);
          _advancedFormConfig.setLocalStorage(settings);
        }
      }

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
          "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].activityNid + "\">" +
          "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].activityDestinationPath + "\">" +
          "<div class=\"activities-img-container\">" +
            "<img src=\"" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].optionImage + "\">" +
          "</div>" +
          "<div class=\"activities-titles-container\">" +
            "<p>" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].activityTitle + "</p>" +
            "<p class='activities-pack-title'>" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].optionTitle + "</p>" +
          "</div>" +
          "<div class=\"activities-price-container\">" +
            "<p>" + settings.memory_cart_advanced_form.activities[dayIndex][activityIndex].optionPrice + "</p>" +
          "</div>" +
          "<button type=\"button\" class=\"btn-remove-activity\">" +
            "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
          "</button>" +
        "</div>"
      );
    },

    anyActivitiesSet : function(settings){

      var isAnyActivities = false;
      var isAnyAccommodations = false;
      var isAnyTransfers = false;

      // Check if any activity is set
      for(var[key, value] of Object.entries(settings.memory_cart_advanced_form.activities)) {
        if(settings.memory_cart_advanced_form.activities[key].length !== 0){
          isAnyActivities = true;
        }
      }

      // Check if any accommodation is set
      if(settings.memory_cart_advanced_form.accommodations.length !== 0){
        isAnyAccommodations = true;
      }

      // Check if any transfer is set
      for(var i = 0; i < settings.memory_cart_advanced_form.transfers.length; i++){
        if(settings.memory_cart_advanced_form.transfers[i] !== null){
          isAnyTransfers = true;
        }
      }

      if(!isAnyActivities && !isAnyAccommodations && !isAnyTransfers){
        settings.memory_cart_advanced_form.city = null;

        $("#trip-global-container > #city-name").remove();

        _advancedFormConfig.setLocalStorage(settings);
      }
    },

    setCityName : function(settings){

      if(settings.memory_cart_advanced_form.city !== null){

        var cityNameToDisplay = settings.memory_cart_advanced_form.city.split("⫼");

        if($("#trip-global-container > #city-name").length !== 0){
          $("#trip-global-container > #city-name").remove();
        }

        $("#trip-global-container").prepend("" +
          "<div id=\"city-name\">" +
            "<i class=\"fa fa-globe\" aria-hidden=\"true\"></i>" +
            "<div>" +
              "<p>" + cityNameToDisplay[0] + "</p>" +
              "<p>" + cityNameToDisplay[1] + "</p>" +
            "</div>" +
          "</div>"
        );
      }
    }
  };
}(jQuery));
