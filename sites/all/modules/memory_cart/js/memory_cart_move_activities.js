(function ($) {

  var maximumActivitiesNumber = 6;

  Drupal.behaviors.memory_cart_move_activities = {
    attach: function (context, settings) {

      var activityContainer;
      var activityNid;
      var activityTitle;
      var optionTitle;
      var optionPrice;

      function updateActivitiesDisplay(){

        var isTimestampMode = false;

        if(
          settings.memory_cart_form.departureDate !== null &&
          settings.memory_cart_form.returnDate !== null
        ){
          isTimestampMode = true;
        }

        $(".trip-transfer").remove();
        $("#trip-activities-container").empty();

        if(isTimestampMode){
          Drupal.behaviors.memory_cart_form.updateDates(settings);
        }

        Drupal.behaviors.memory_cart_advanced_form.initLocalStorage(settings, isTimestampMode, false);
      }

      function retrieveActivity(_this){

        activityContainer = $(_this).parent().parent();

        activityNid = activityContainer.find(".input-hidden-nid").val();
        activityTitle = activityContainer.find(".activities-titles-container > p:eq(0)").text();
        optionTitle = activityContainer.find(".activities-titles-container > p.activities-pack-title").text();
        optionPrice = activityContainer.find(".activities-price-container > p").text();
      }

      /* ------------------------------ Click : Transfer positioning ------------------------------ */
      $("body #trip-global-container").on("click", ".transfer .btn-go-up", function() {

        retrieveActivity(this);

        var currentTransferIndex = null;

        $.each(settings.memory_cart_advanced_form.transfers, function(index, transfer){

          if(transfer !== null){
            if(
              transfer.activityNid === activityNid &&
              transfer.activityTitle === activityTitle &&
              transfer.optionTitle === optionTitle &&
              transfer.optionPrice === optionPrice
            ){
              currentTransferIndex = index;
            }
          }
        });

        if(
          currentTransferIndex !== null &&
          currentTransferIndex !== 0 // Impossible to move up the first transfer
        ){
          var tempTransfer = settings.memory_cart_advanced_form.transfers[currentTransferIndex];

          settings.memory_cart_advanced_form.transfers[currentTransferIndex] = settings.memory_cart_advanced_form.transfers[0];
          settings.memory_cart_advanced_form.transfers[0] = tempTransfer;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }
      });

      $("body #trip-global-container").on("click", ".transfer .btn-go-down", function() {

        retrieveActivity(this);

        var currentTransferIndex = null;

        $.each(settings.memory_cart_advanced_form.transfers, function(index, transfer){

          if(transfer !== null){
            if(
              transfer.activityNid === activityNid &&
              transfer.activityTitle === activityTitle &&
              transfer.optionTitle === optionTitle &&
              transfer.optionPrice === optionPrice
            ){
              currentTransferIndex = index;
            }
          }
        });

        if(
          currentTransferIndex !== null &&
          currentTransferIndex !== 1 // Impossible to move down the last (second) transfer
        ){
          var tempTransfer = settings.memory_cart_advanced_form.transfers[currentTransferIndex];

          settings.memory_cart_advanced_form.transfers[currentTransferIndex] = settings.memory_cart_advanced_form.transfers[1];
          settings.memory_cart_advanced_form.transfers[1] = tempTransfer;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }
      });

      /* ------------------------------ Click : Accommodation positioning ------------------------------ */
      $("body #trip-global-container").on("click", ".accommodation .btn-go-up", function() {

        retrieveActivity(this);

        var currentAccommodationIndex = $(this).parent().parent().parent().parent().parent().attr("class").split("day-")[1];
        currentAccommodationIndex = parseInt(currentAccommodationIndex) - 1; // Set to 0 base index

        if(
          currentAccommodationIndex !== null &&
          currentAccommodationIndex !== 0 // Impossible to move up the first accommodation
        ){
          var tempAccommodation = settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex];

          settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex] = settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex - 1];
          settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex - 1] = tempAccommodation;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }
      });

      $("body #trip-global-container").on("click", ".accommodation .btn-go-down", function() {

        retrieveActivity(this);

        var currentAccommodationIndex = $(this).parent().parent().parent().parent().parent().attr("class").split("day-")[1];
        currentAccommodationIndex = parseInt(currentAccommodationIndex) - 1; // Set to 0 base index

        if(
          currentAccommodationIndex !== null &&
          currentAccommodationIndex !== (settings.memory_cart_advanced_form.accommodations.length - 1) // Impossible to move down the last accommodation
        ){
          var tempAccommodation = settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex];

          settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex] = settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex + 1];
          settings.memory_cart_advanced_form.accommodations[currentAccommodationIndex + 1] = tempAccommodation;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }
      });

      /* ------------------------------ Click : Activities positioning ------------------------------ */
      function activityAlreadyExistsInTargetDay(targetDay){

        var activityExists = false;

        $.each(targetDay, function(index, activity){

          if(activity !== null){
            if(
              activity.activityNid === activityNid &&
              activity.activityTitle === activityTitle &&
              activity.optionTitle === optionTitle &&
              activity.optionPrice === optionPrice
            ){
              activityExists = true;
            }
          }
        });

        return activityExists;
      }

      $("body #trip-global-container").on("click", ".activities .btn-go-up", function() {

        retrieveActivity(this);

        var currentDayIndex = parseInt($(this).parent().parent().parent().parent().parent().attr("class").split("day-")[1]);
        var currentActivityIndex = $(this).parent().parent().index();

        // Move intra-day
        if(
          currentActivityIndex !== null &&
          currentActivityIndex !== 0 // Impossible to move up the first accommodation
        ){
          var tempActivity = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex];

          settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex] = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex - 1];
          settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex - 1] = tempActivity;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }

        // Move inter-days
        if(
          currentDayIndex !== 1 && // Can't move activity to the previous when it's the first day
          currentActivityIndex === 0
        ){
          var tempActivity = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex];
          var previousDay = settings.memory_cart_advanced_form.activities[currentDayIndex - 1];

          var isActivityExists = activityAlreadyExistsInTargetDay(previousDay);

          if(!isActivityExists){

            if(settings.memory_cart_advanced_form.activities[currentDayIndex - 1].length === maximumActivitiesNumber){ // Previous day is full

              settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex] = previousDay[previousDay.length - 1];
              settings.memory_cart_advanced_form.activities[currentDayIndex - 1][previousDay.length - 1] = tempActivity;
            }else{

              settings.memory_cart_advanced_form.activities[currentDayIndex].splice(currentActivityIndex, 1);
              settings.memory_cart_advanced_form.activities[currentDayIndex - 1].splice(previousDay.length, 0, tempActivity);
            }

            Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

            updateActivitiesDisplay();
          }else{
            alert("Impossible de déplacer l'activité car elle existe déjà dans le jour précédent.");
          }
        }
      });

      $("body #trip-global-container").on("click", ".activities .btn-go-down", function() {

        retrieveActivity(this);

        var currentDayIndex = parseInt($(this).parent().parent().parent().parent().parent().attr("class").split("day-")[1]);
        var currentActivityIndex = $(this).parent().parent().index();

        // Move intra-day
        if(
          currentActivityIndex !== null &&
          currentActivityIndex !== (settings.memory_cart_advanced_form.activities[currentDayIndex].length - 1) // Impossible to move up the first accommodation
        ){
          var tempActivity = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex];

          settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex] = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex + 1];
          settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex + 1] = tempActivity;

          Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

          updateActivitiesDisplay();
        }

        // Move inter-days
        if(
          currentDayIndex !== Object.keys(settings.memory_cart_advanced_form.activities).length && // Can't move activity to the next when it's the last day
          currentActivityIndex === (settings.memory_cart_advanced_form.activities[currentDayIndex].length - 1) // Last activity of the day
        ){
          var tempActivity = settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex];
          var nextDay = settings.memory_cart_advanced_form.activities[currentDayIndex + 1];

          var isActivityExists = activityAlreadyExistsInTargetDay(nextDay);

          if(!isActivityExists){

            if(settings.memory_cart_advanced_form.activities[currentDayIndex + 1].length === maximumActivitiesNumber){ // Next day is full

              settings.memory_cart_advanced_form.activities[currentDayIndex][currentActivityIndex] = nextDay[0];
              settings.memory_cart_advanced_form.activities[currentDayIndex + 1][0] = tempActivity;
            }else{

              settings.memory_cart_advanced_form.activities[currentDayIndex].splice(currentActivityIndex, 1);
              settings.memory_cart_advanced_form.activities[currentDayIndex + 1].splice(0, 0, tempActivity);
            }

            Drupal.behaviors.memory_cart_advanced_form.setLocalStorage(settings);

            updateActivitiesDisplay();
          }else{
            alert("Impossible de déplacer l'activité car elle existe déjà dans le jour suivant.");
          }
        }
      });
    }
  };
}(jQuery));
