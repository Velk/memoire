(function ($) {
  Drupal.behaviors.memory_cart_advanced_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_advanced_form");

      // Init localStorage
      var currentLocalStorageActivities = JSON.parse(localStorage.getItem("localStorageCartActivities"));

      if(currentLocalStorageActivities === null){
        settings.memory_cart_advanced_form = {};
      }else{
        settings.memory_cart_advanced_form = currentLocalStorageActivities;
      }

      // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
      //var activityCategory = $(".activity-category").val();
      var activityNid = null;
      var activityTitle = null;
      var activityDestinationPath = null;
      var activityContainer = null;
      var optionImage = null;
      var optionTitle = null;
      var optionPrice = null;
      var maximumActivitiesNumber = 3;

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

      // Construct the HTML structure of a day
      function setDefaultStructureHTML(dayIndexToAdd){

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

          setDefaultStructureHTML(dayIndex + 1);
          addActivityToCart(dayIndex + 1);
        }else{ // If dates were set through calendar.

          alert(alertMessage);
        }
      }

      function checkDaysAvailability() {

        var alertMessage = "";
        var calendarNbDays = $("#trip-activities-container").children("div.trip-days").length;

        if (calendarNbDays === 0) { // If any dates/days are set in the trip container. That means user didn't select dates through the calendar.

          // Init first day. Should called only once.
          setDefaultStructureHTML(0);
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

      $(".cont-add-cart").click(function(){

        console.log("Add activity to cart");

        // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
        //var activityCategory = $(".activity-category").val();
        activityNid = $(".activity-nid").val();
        activityTitle = $(".activity-title").val();
        activityDestinationPath = $(".activity-destination-path").val();

        activityContainer = $(this).parent().parent().parent();

        optionImage = activityContainer.children("div.prestation-main").find("div.prestation-image").css("background-image");
        if(typeof optionImage === "undefined"){ // If option has not image, set the activity image by default
          optionImage = $("#activity-header-container > img").attr("src");
        }else{
          optionImage = optionImage.split("url(\"")[1].split("\")")[0];
        }

        optionTitle = activityContainer.children("div.prestation-header").find("h2").text();
        optionPrice = activityContainer.children("div.prestation-header").find("p.prestation-price").text();

        checkDaysAvailability();
      });
    }
  };
}(jQuery));
