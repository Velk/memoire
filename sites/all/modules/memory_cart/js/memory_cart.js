(function ($) {
    Drupal.behaviors.memory_cart = {
        attach: function (context, settings) {

            // Array to stock all activities intended to setItem in the localStorage
            var localStorageAllActivities = [];
            //localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

            function totalQuotationCost(){

                var localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));
                var totalQuotationCost = 0;

                if(localStorageAllActivities != null){

                    for(var i=0; i < localStorageAllActivities.length; i++){

                      var activityPrice = localStorageAllActivities[i].actPrice;

                      if (activityPrice.substring(activityPrice.length-1) === "€")
                      {
                        activityPrice = activityPrice.substring(0, activityPrice.length-1);
                        activityPrice = activityPrice.trim();
                      }

                      totalQuotationCost = parseInt(totalQuotationCost) + parseInt(activityPrice);
                    }
                }

                if(totalQuotationCost > 0){
                    if( $("#total-quotation-cost").length > 0 ){
                        $("#total-quotation-cost").remove();
                    }
                    $("form#devis").append(
                        "<div id='total-quotation-cost'>" +
                            "<p>Coût total estimé : " + totalQuotationCost + " €</p>" +
                            "<p>Le prix de l’estimation correspond à un prix par personne pour un groupe de 10 personnes. Les prix peuvent varier en fonction du nombre de participant et de la saison. Pour une estimation précise, faites une demande de devis ci-dessous</p>" +
                        "</div>"
                    );
                }
            }

            // function addLocalStorageElementToCart(i){
            //
            //     // Add activity to cart
            //     $(".trip .trip-days-details > .activities-container.act-cont-" + localStorageAllActivities[i].dayNumber).append(
            //         "<div class=\"activities\">" +
            //             "<div class=\"positioning-btn\">" +
            //                 "<button type=\"button\" class=\"btn-go-up\">" +
            //                     "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
            //                 "</button>" +
            //                 "<button type=\"button\" class=\"btn-go-down\">" +
            //                     "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
            //                 "</button>" +
            //             "</div>" +
            //             "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + localStorageAllActivities[i].nid + "\">" +
            //             "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + localStorageAllActivities[i].actDestination + "\">" +
            //             "<div class=\"activities-img-container\">" +
            //                 "<img src=\"" + localStorageAllActivities[i].image + "\">" +
            //             "</div>" +
            //             "<div class=\"activities-titles-container\">" +
            //                 "<p>" + localStorageAllActivities[i].title + "</p>" +
            //                 "<p class='activities-pack-title'>" + localStorageAllActivities[i].packTitle + "</p>" +
            //             "</div>" +
            //             "<div class=\"activities-price-container\">" +
            //                 "<p>" + localStorageAllActivities[i].actPrice + "</p>" +
            //             "</div>" +
            //             "<button type=\"button\" class=\"btn-remove-activity\">" +
            //                 "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
            //             "</button>" +
            //         "</div>"
            //     );
            // }

            // function removingElements(){

              /* ------------------------------ Click : Removing day ------------------------------ */
              // $("body .trip").on("click", ".trip-days .btn-remove-day", function() {
              $("body #trip-global-container").on("click", ".trip-days .btn-remove-day", function() {

                /* Activities container */
                var activitiesContainer = $(this).parent().parent().children(".trip-days-details").children("div");
                var classList = activitiesContainer.attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("-cont-") + 6);
                var actDestinationToRemove = $(this).parent().parent().parent().parent().children(".trip-city-name").text();

                activitiesContainer.each(function(){

                  var activityTypeContainer = $(this).attr("class");
                  var activityPackTitle = $(this).children("div").children(".activities-titles-container").children(".activities-pack-title").text();
                  var activityType = null;
                  var nidToRemove = null;

                  if(activityTypeContainer.indexOf("activities-container") >= 0){

                    activityType = $(this).children("div").attr("class");
                    nidToRemove = $(this).children(".activities").children("input[type='hidden'].input-hidden-nid").val();
                  }else if(activityTypeContainer.indexOf("hosting-container ") >= 0){

                    activityType = $(this).children("div").attr("class");
                    nidToRemove = $(this).children("input[type='hidden'].input-hidden-nid").val();
                  }

                  // Call removeLocalStorage() function
                  removeLocalStorage(nidToRemove, dayNumberToRemove, activityType, activityPackTitle, actDestinationToRemove);
                });

                updateDaysPosition(this, actDestinationToRemove);

                // Remove the hosting if set in the new last day
                var currentDay = $(this).parent().parent().index();

                if($(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children(".hosting").length >= 1 ){

                  var nidToRemove = $(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children(".hosting").children("input[type=\"hidden\"].input-hidden-nid").val();
                  var activityPackTitle = $(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children(".hosting").children(".activities-titles-container").children(".activities-pack-title").text();
                  var activityDestination = $(this).parent().parent().parent().parent().children(".trip-city-name").text();

                  console.log("------------------");
                  console.log("nid : " + nidToRemove);
                  console.log("dayNumber : " + currentDay);
                  console.log("activityType : " + "hosting");
                  console.log("activityPackTitle : " + activityPackTitle);
                  console.log("activityDestination : " + activityDestination);

                  // Call removeLocalStorage() function
                  removeLocalStorage(nidToRemove, currentDay, "hosting", activityPackTitle, activityDestination);

                  $(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children(".hosting").remove();
                  $(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children("p").remove();
                  $(this).parent().parent().parent().children(".trip-days:eq(" + (currentDay - 1) + ")").children(".trip-days-details").children(".hosting-container").children("button").remove();
                }

                // Remove the activity
                $(this).parent().parent().remove();

                // // Remove the hosting container for the new last day and remove the hosting container on localstorage
                // var hostingNidToRemove = $(".trip .trip-days").eq($(".trip-days").length - 1).children(".trip-days-details").children(".hosting-container").children(".hosting").children("input[type='hidden'].input-hidden-nid").val();
                // var hostingTitleToRemove = $(".trip .trip-days").eq($(".trip-days").length - 1).children(".trip-days-details").children(".hosting-container").children(".hosting").children("p").text();
                // var hostingDayNumberToRemove = $(".trip-days").length - 1;
                // var hostingActivityTypeToRemove = "hosting";
                //
                // removeLocalStorage(hostingNidToRemove, hostingDayNumberToRemove, hostingActivityTypeToRemove);

                $(".trip:eq(" + actDestinationToRemove + ") .trip-days").eq($(".trip:eq(" + actDestinationToRemove + ") .trip-days").length - 1).children(".trip-days-details").children(".hosting-container").remove();
                // if( $(this).parent().parent(".trip-days") == ($(".trip-days").length - 1) ){
                //
                // }
              });

              /* ------------------------------ Click : Removing activity ------------------------------ */
              $("body #trip-global-container").on("click", ".activities .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".activities").children("input[type='hidden'].input-hidden-nid").val();
                var packTitleToRemove = $(this).parent(".activities").children(".activities-titles-container").children(".activities-pack-title").text();
                var classList = $(this).parent().parent().attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("act-cont-") + 9);
                var actDestinationToRemove = $(this).parent(".activities").children("input[type='hidden'].input-hidden-destination").val();

                // Call removeLocalStorage() function
                removeLocalStorage(nidToRemove, dayNumberToRemove, "activities", packTitleToRemove, actDestinationToRemove);

                /* ----- Update - User cart display ----- */

                //Set the default message if it doesn't exist and if there is no activities in the activity container
                if(
                  $(this).parent().parent().children(".default-message").length === 0 &&
                  $(this).parent().parent().children().length === 1
                ){

                  $(this).parent().parent().append("<p class=\"default-message\">Aucune activité choisie</p>");
                }

                // Remove the activity
                $(this).parent().remove();

              });

              /* ------------------------------ Click : Removing hosting ------------------------------ */
              $("body #trip-global-container").on("click", ".hosting .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".hosting").children("input[type='hidden'].input-hidden-nid").val();
                var packTitleToRemove = $(this).parent(".hosting").children(".activities-titles-container").children(".activities-pack-title").text();
                // var classList = $(this).parent().parent().attr("class");
                // var dayNumberToRemove = classList.substr(classList.indexOf("hosting-cont-") + 13);
                var actDestinationToRemove = $(this).parent(".hosting").children("input[type='hidden'].input-hidden-destination").val();

                var indexActDestination;
                //Get the index of the trip city name
                $(".trip").each(function(){

                  if(actDestinationToRemove === $(this).children(".trip-city-name").text().trim()){

                    indexActDestination = $(this).index();
                  }
                });

                // Call removeLocalStorage() function
                var totalDaysNumber = $(".trip:eq(" + indexActDestination + ") .trip-days").length - 1;

                for(var i = 1; i <= totalDaysNumber; i++){
                  removeLocalStorage(nidToRemove, i, "hosting", packTitleToRemove, actDestinationToRemove);
                }

                /* ----- Update - User cart display ----- */

                console.log("remove hsoting");
                // Remove the activity
                $(".trip:eq(" + indexActDestination + ") .trip-days .hosting-container .hosting").remove();
                $(".trip:eq(" + indexActDestination + ") .trip-days .hosting-container > p").show();
                $(".trip:eq(" + indexActDestination + ") .trip-days .hosting-container > button").show();
              });

              /* ------------------------------ Click : Removing transfer ------------------------------ */
              $("body #trip-global-container").on("click", ".transfer .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".transfer").children("input[type='hidden'].input-hidden-nid").val();
                var packTitleToRemove = $(this).parent(".transfer").children(".activities-titles-container").children(".activities-pack-title").text();
                var classList = $(this).parent().parent().attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("transfer-cont-") + 14);
                var actDestinationToRemove = $(this).parent(".transfer").children("input[type='hidden'].input-hidden-destination").val();

                // Call removeLocalStorage() function
                removeLocalStorage(nidToRemove, dayNumberToRemove, "transfer", packTitleToRemove, actDestinationToRemove);

                /* ----- Update - User cart display ----- */

                $(this).parent().parent().children("p").show();
                $(this).parent().parent().children("button").show();

                // Remove the activity
                $(this).parent().remove();

              });
            // }

            // function filtersElements(){

              /* ------------------------------ Click : Filters (Hosting & Transfer) displaying ------------------------------ */
              $(".hosting-container > button").click(function(){

                if($("#cart-container").attr("class") === "destination-page"){

                  // Check if there is a filter called "Hébergements"
                  if($(".cont-filter:contains('Hébergements')").length >= 1){
                    $(".cont-filter:contains('Hébergements')").click();
                  }else{
                    $(".hosting-container > button").remove();
                    $(".hosting-container > p").text("Aucun hébergement n'est disponible.");
                  }
                }else if($("#cart-container").attr("class") === "activity-page"){

                  var destinationUrlPath = $("input.activity-destination-path").val();
                  window.location = destinationUrlPath;
                }
              });
              $("body #trip-global-container").on("click", ".hosting-container > button", function() {

                if($("#cart-container").attr("class") === "destination-page"){

                  // Check if there is a filter called "Hébergements"
                  if($(".cont-filter:contains('Hébergements')").length >= 1){
                    $(".cont-filter:contains('Hébergements')").click();
                  }else{
                    $(".hosting-container > button").remove();
                    $(".hosting-container > p").text("Aucun hébergement n'est disponible.");
                  }
                }else if($("#cart-container").attr("class") === "activity-page"){

                  var destinationUrlPath = $("input.activity-destination-path").val();
                  window.location = destinationUrlPath;
                }
              });

              $(".transfer-container > button").click(function(){

                if($("#cart-container").attr("class") === "destination-page"){

                  // Check if there is a filter called "Transferts"
                  if($(".cont-filter:contains('Transferts')").length >= 1){
                    $(".cont-filter:contains('Transferts')").click();
                  }else{
                    $(".transfer-container > button").remove();
                    $(".transfer-container > p").text("Aucun transfert n'est disponible.");
                  }
                }else if($("#cart-container").attr("class") === "activity-page"){

                  var destinationUrlPath = $("input.activity-destination-path").val();
                  window.location = destinationUrlPath;
                }
              });
              $("body #trip-global-container").on("click", ".transfer-container > button", function() {

                if($("#cart-container").attr("class") === "destination-page"){

                  // Check if there is a filter called "Transferts"
                  if($(".cont-filter:contains('Transferts')").length >= 1){
                    $(".cont-filter:contains('Transferts')").click();
                  }else{
                    $(".transfer-container > button").remove();
                    $(".transfer-container > p").text("Aucun transfert n'est disponible.");
                  }
                }else if($("#cart-container").attr("class") === "activity-page"){

                  var destinationUrlPath = $("input.activity-destination-path").val();
                  window.location = destinationUrlPath;
                }
              });
            // }

            // function movingElements(){

              /* ------------------------------ Click : Activities positionning (type : activities) ------------------------------ */
              $("body #trip-global-container").on("click", ".activities .btn-go-up", function() {

                // Retrieve the clicked activity (type : activity)
                var activityContainer = $(this).parent().parent(".activities");
                // Retrieve the nid of the clicked activity (type : activity)
                var activityNid = $(this).parent().parent(".activities").children("input[type='hidden'].input-hidden-nid").val();
                // Retrieve the clicked activities container (type : activity)
                var activitiesContainer = $(this).parent().parent(".activities").parent(".activities-container");
                console.log("----------------");
                console.log(activitiesContainer.attr("class"));
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("act-cont-") + 9));
                // Retrieve the pack title of the current clicked activity
                var activityPackTitle = $(this).parent().parent(".activities").children(".activities-titles-container").children(".activities-pack-title").text();
                // Retrieve the city name of the clicked activity (type : activity)
                var activityDestination = $(this).parent().parent(".activities").children("input[type='hidden'].input-hidden-destination").val();
                var indexActivityDestination = null;

                $(".trip").each(function(){

                  if(activityDestination == $(this).children(".trip-city-name").text().trim()){

                    indexActivityDestination = $(this).index();
                  }
                });

                if(
                  activityContainer.index() === 0 &&
                  dayNumber > 1
                ){
                  /* Change activity position between days */

                  var dayIsFullOfActivities = false;
                  var activityIsInPreviousDay = false;

                  if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length === 6){
                    dayIsFullOfActivities = true;
                  }

                  $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").each(function(){

                    // Check if the activity (activityNid) and the pack title is already set in the previous day
                    if($(this).children("input[type='hidden'].input-hidden-nid").val() === activityNid && $(this).children(".activities-titles-container").children(".activities-pack-title").text() === activityPackTitle){
                      activityIsInPreviousDay = true;
                    }
                  });

                  if(!dayIsFullOfActivities && !activityIsInPreviousDay){

                    // If the day is not full and the activity is not already in the day

                    // Clone the current clicked activity and add it at the end of the previous day
                    activityContainer.clone().appendTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1));
                    activityContainer.remove();

                    /* Update localStorage "positionInDay" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == dayNumber &&
                        localStorageAllActivities[i].activityType == "activities" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){

                        if(localStorageAllActivities[i].nid == activityNid && localStorageAllActivities[i].packTitle == activityPackTitle){
                          // Update activity position in the new day (previous day)
                          localStorageAllActivities[i].dayNumber = (dayNumber - 1);
                          localStorageAllActivities[i].positionInDay = ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length) - 1;
                        }else{
                          // Update activities position in the current day
                          localStorageAllActivities[i].positionInDay = parseInt(localStorageAllActivities[i].positionInDay) - 1;
                        }
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                    // Remove the default message if exists
                    if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length === 1){
                      if( $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .default-message").length >= 1 ){
                        $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .default-message").remove();
                      }
                    }

                    // Add the default message if doesn't exist
                    if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .activities").length === 0){
                      if( $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .default-message").length === 0 ){
                        $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber).append("<p class=\"default-message\">Aucune activité choisie</p>");
                      }
                    }

                  }else if(dayIsFullOfActivities && !activityIsInPreviousDay){

                    // if the day is full and the activity is not already in the day

                    // Get the last activity of the prior day
                    var lastActivityPriorDay = $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").eq($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length - 1);

                    // Clone the last activity in the previous day and add it to the current day where the activity is clicked
                    lastActivityPriorDay.clone().prependTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber);
                    lastActivityPriorDay.remove();

                    // Clone the current clicked activity and add it at the end of the previous day
                    activityContainer.clone().appendTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1));
                    activityContainer.remove();

                    /* Update localStorage "positionInDay" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var j = 0; j < localStorageAllActivities.length; j++){

                      // Update the position of the last activity located in the previous day
                      if(
                        localStorageAllActivities[j].dayNumber == (dayNumber - 1) &&
                        localStorageAllActivities[j].activityType == "activities" &&
                        localStorageAllActivities[j].positionInDay == ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length - 1) &&
                        localStorageAllActivities[j].nid == lastActivityPriorDay.children("input[type=\"hidden\"].input-hidden-nid").val() &&
                        localStorageAllActivities[j].packTitle == lastActivityPriorDay.children(".activities-titles-container").children(".activities-pack-title").text() &&
                        localStorageAllActivities[j].actDestination == lastActivityPriorDay.children("input[type=\"hidden\"].input-hidden-destination").val()
                      ){
                        localStorageAllActivities[j].dayNumber = dayNumber;
                        localStorageAllActivities[j].positionInDay = 0;
                      }

                      // Update the position of the activity located in the current day
                      if(
                        localStorageAllActivities[j].dayNumber == dayNumber &&
                        localStorageAllActivities[j].activityType == "activities" &&
                        localStorageAllActivities[j].positionInDay == 0 &&
                        localStorageAllActivities[j].nid == activityNid &&
                        localStorageAllActivities[j].packTitle == activityPackTitle &&
                        localStorageAllActivities[j].actDestination == activityDestination
                      ){
                        localStorageAllActivities[j].dayNumber = (dayNumber - 1);
                        localStorageAllActivities[j].positionInDay = ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length - 1);
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }
                }else if(
                  activityContainer.index() <= (activitiesContainer.children(".activities").length - 1) &&
                  activityContainer.index() > 0
                ){
                  /* Change activity position inside the day */

                  var activityContainerIndex = activityContainer.index();

                  // Insert the current clicked activity before the activity prior the clicked one
                  activityContainer.insertBefore(activitiesContainer.children(".activities").eq((activityContainerIndex - 1)));

                  /* Update localStorage "positionInDay" value */
                  localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                  // Update activities position
                  for(var k = 0; k < localStorageAllActivities.length; k++){

                    if(
                      localStorageAllActivities[k].dayNumber == dayNumber &&
                      localStorageAllActivities[k].activityType == "activities" &&
                      localStorageAllActivities[k].nid == activityNid &&
                      localStorageAllActivities[k].packTitle == activityPackTitle &&
                      localStorageAllActivities[k].actDestination == activityDestination
                    ){
                      localStorageAllActivities[k].positionInDay = (activityContainerIndex - 1);
                      console.log("1 | Ville : " + activityDestination + " | " + activityPackTitle + " SWITCH " + (activityContainerIndex - 1));
                    }

                    if(
                      localStorageAllActivities[k].dayNumber == dayNumber &&
                      localStorageAllActivities[k].activityType == "activities" &&
                      //localStorageAllActivities[k].nid != activityNid &&
                      localStorageAllActivities[k].packTitle != activityPackTitle &&
                      localStorageAllActivities[k].positionInDay == (activityContainerIndex - 1) &&
                      localStorageAllActivities[k].actDestination == activityDestination
                    ){
                      localStorageAllActivities[k].positionInDay = activityContainerIndex;
                      console.log("2 | Ville : " + activityDestination + " | " + activityPackTitle + " SWITCH " + (activityContainerIndex));
                    }
                  }

                  // Remove the old localStorage variable
                  localStorage.removeItem("localStorageAllActivities");
                  // Stringify object to pass in localStorage
                  localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                }
              });

              $("body #trip-global-container").on("click", ".activities .btn-go-down", function() {
                console.log("click");
                // Retrieve the clicked activity (type : activity)
                var activityContainer = $(this).parent().parent(".activities");
                // Retrieve the nid of the clicked activity (type : activity)
                var activityNid = $(this).parent().parent(".activities").children("input[type='hidden'].input-hidden-nid").val();
                // Retrieve the clicked activities container (type : activity)
                var activitiesContainer = $(this).parent().parent(".activities").parent(".activities-container");
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("act-cont-") + 9));
                // Retrieve the total number of days in the user cart
                var totalDaysNumber = $(".trip-days").length;
                // Retrieve the pack title of the current clicked activity
                var activityPackTitle = $(this).parent().parent(".activities").children(".activities-titles-container").children(".activities-pack-title").text();
                // Retrieve the city name of the clicked activity (type : activity)
                var activityDestination = $(this).parent().parent(".activities").children("input[type='hidden'].input-hidden-destination").val();
                var indexActivityDestination = null;

                $(".trip").each(function(){

                  if(activityDestination == $(this).children(".trip-city-name").text().trim()){

                    indexActivityDestination = $(this).index();
                  }
                });

                if(
                  activityContainer.index() === (activitiesContainer.children(".activities").length - 1) &&
                  dayNumber < totalDaysNumber
                ){
                  /* Change activity position between days */

                  var dayIsFullOfActivities = false;
                  var activityIsInNextDay = false;

                  if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .activities").length === 6){
                    dayIsFullOfActivities = true;
                  }

                  $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .activities").each(function(){

                    // Check if the activity (activityNid) is already set in the next day
                    if($(this).children("input[type='hidden'].input-hidden-nid").val() === activityNid && $(this).children(".activities-titles-container").children(".activities-pack-title").text() === activityPackTitle){
                      activityIsInNextDay = true;
                    }
                  });

                  if(!dayIsFullOfActivities && !activityIsInNextDay){

                    // If the day is not full and the activity is not already in the day

                    if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1)).length === 0){

                      // Call addANewDay() intended to add a new day
                      addANewDay(indexActivityDestination);
                    }

                    // Clone the current clicked activity and add it at the beginning of the next day
                    activityContainer.clone().prependTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1));
                    activityContainer.remove();

                    /* Update localStorage "positionInDay" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == dayNumber &&
                        localStorageAllActivities[i].activityType == "activities" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){

                        if(localStorageAllActivities[i].nid == activityNid && localStorageAllActivities[i].packTitle == activityPackTitle){
                          // Update activity position in the new day (next day)
                          localStorageAllActivities[i].dayNumber = (dayNumber + 1);
                          localStorageAllActivities[i].positionInDay = 0;
                          // localStorageAllActivities[i].positionInDay = ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber - 1) + " > .activities").length) - 1;
                        }
                      }

                      if(
                        localStorageAllActivities[i].dayNumber == (dayNumber + 1) &&
                        localStorageAllActivities[i].activityType == "activities" &&
                        //localStorageAllActivities[i].nid != activityNid &&
                        localStorageAllActivities[i].packTitle != activityPackTitle &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){
                        localStorageAllActivities[i].positionInDay = parseInt(localStorageAllActivities[i].positionInDay) + 1;
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                    // Remove the default message if exists
                    if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .activities").length === 1){
                      if( $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .default-message").length >= 1 ){
                        $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .default-message").remove();
                      }
                    }

                    // Add the default message if doesn't exist
                    if($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .activities").length === 0){
                      if( $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .default-message").length === 0 ){
                        $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber).append("<p class=\"default-message\">Aucune activité choisie</p>");
                      }
                    }

                  }else if(dayIsFullOfActivities && !activityIsInNextDay){

                    // if the day is full and the activity is not already in the day

                    // Get the last activity of the next day
                    var lastActivityNextDay = $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1) + " > .activities").eq(0);

                    // Clone the last activity in the next day and add it to the current day where the activity is clicked
                    lastActivityNextDay.clone().appendTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber);
                    lastActivityNextDay.remove();

                    // Clone the current clicked activity and add it at the beginning of the next day
                    activityContainer.clone().prependTo(".trip:eq(" + indexActivityDestination + ") .act-cont-" + (dayNumber + 1));
                    activityContainer.remove();

                    /* Update localStorage "positionInDay" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var j = 0; j < localStorageAllActivities.length; j++){

                      // Update the position of the first activity located in the next day
                      if(
                        localStorageAllActivities[j].dayNumber == (dayNumber + 1) &&
                        localStorageAllActivities[j].activityType == "activities" &&
                        localStorageAllActivities[j].positionInDay == 0 &&
                        localStorageAllActivities[j].nid == lastActivityNextDay.children("input[type=\"hidden\"].input-hidden-nid").val() &&
                        localStorageAllActivities[j].packTitle == lastActivityNextDay.children(".activities-titles-container").children(".activities-pack-title").text() &&
                        localStorageAllActivities[j].actDestination == lastActivityNextDay.children("input[type=\"hidden\"].input-hidden-destination").val()
                      ){
                        localStorageAllActivities[j].dayNumber = dayNumber;
                        localStorageAllActivities[j].positionInDay = ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .activities").length - 1);
                      }

                      // Update the position of the activity located in the current day
                      if(
                        localStorageAllActivities[j].dayNumber == dayNumber &&
                        localStorageAllActivities[j].activityType == "activities" &&
                        localStorageAllActivities[j].positionInDay == ($(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .activities").length - 1) &&
                        localStorageAllActivities[j].nid == activityNid &&
                        localStorageAllActivities[j].packTitle == activityPackTitle &&
                        localStorageAllActivities[j].actDestination == activityDestination
                      ){
                        localStorageAllActivities[j].dayNumber = (dayNumber + 1);
                        localStorageAllActivities[j].positionInDay = 0;
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }
                }else if(
                  activityContainer.index() <= (activitiesContainer.children(".activities").length - 2) &&
                  activityContainer.index() >= 0
                ){
                  /* Change activity position inside the day */

                  var activityContainerIndex = activityContainer.index();

                  // Insert the current clicked activity after the activity following of the clicked one
                  activityContainer.insertAfter(activitiesContainer.children(".activities").eq(activityContainer.index() + 1));

                  /* Update localStorage "positionInDay" value */
                  localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                  // Update activities position
                  for(var k = 0; k < localStorageAllActivities.length; k++){

                    if(
                      localStorageAllActivities[k].dayNumber == dayNumber &&
                      localStorageAllActivities[k].activityType == "activities" &&
                      localStorageAllActivities[k].nid == activityNid &&
                      localStorageAllActivities[k].packTitle == activityPackTitle &&
                      localStorageAllActivities[k].actDestination == activityDestination
                    ){
                      localStorageAllActivities[k].positionInDay = (activityContainerIndex + 1);
                    }

                    if(
                      localStorageAllActivities[k].dayNumber == dayNumber &&
                      localStorageAllActivities[k].activityType == "activities" &&
                      localStorageAllActivities[k].packTitle != activityPackTitle &&
                      localStorageAllActivities[k].positionInDay == (activityContainerIndex + 1) &&
                      localStorageAllActivities[k].actDestination == activityDestination
                    ){
                      localStorageAllActivities[k].positionInDay = activityContainerIndex;
                    }
                  }

                  // Remove the old localStorage variable
                  localStorage.removeItem("localStorageAllActivities");
                  // Stringify object to pass in localStorage
                  localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                }
              });

              /* ------------------------------ Click : Activities positionning (type : transfer) ------------------------------ */
              $("body #trip-global-container").on("click", ".transfer .btn-go-up", function() {

                // Retrieve the clicked activity (type : transfer)
                var activityContainer = $(this).parent().parent(".transfer");
                // Retrieve the nid of the clicked activity (type : transfer)
                var activityNid = $(this).parent().parent(".transfer").children("input[type='hidden'].input-hidden-nid").val();
                // Retrieve the clicked activities container (type : transfer)
                var activitiesContainer = $(this).parent().parent(".transfer").parent(".transfer-container");
                // Retrieve the transfer number of the current clicked activity
                var transferNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("transfer-cont-") + 14));
                // Retrieve the city name of the clicked activity (type : activity)
                var activityDestination = $(this).parent().parent(".transfer").children("input[type='hidden'].input-hidden-destination").val();
                var indexActivityDestination = null;

                $(".trip").each(function(){

                  if(activityDestination == $(this).children(".trip-city-name").text().trim()){

                    indexActivityDestination = $(this).index();
                  }
                });

                if(transferNumber === 2){
                  // Second transfer go instead of the first

                  var isTransferAlreadySet = false;
                  if($(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 .transfer").length === 1){
                    isTransferAlreadySet = true;
                  }

                  if(!isTransferAlreadySet){
                    // Set the second transfer in the empty transfer (first one)

                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > p").hide();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > button").hide();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > p").show();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > button").show();

                    // Clone the current clicked activity and add it at the end of the previous day
                    activityContainer.clone().appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1");
                    activityContainer.remove();

                    /* Update localStorage "dayNumber" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == transferNumber &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].nid == activityNid &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){

                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = (transferNumber - 1);
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }else{
                    // Invert the second transfer with the first one

                    // Clone the current clicked activity and add it at the end of the previous day
                    var currentTransfer = activityContainer.clone();
                    activityContainer.remove();

                    var otherTransfer = $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > .transfer").clone();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > .transfer").remove();

                    currentTransfer.appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1");
                    otherTransfer.appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2");

                    /* Update localStorage "dayNumber" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == transferNumber &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){
                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = (transferNumber - 1);
                      }else if(
                        localStorageAllActivities[i].dayNumber == 1 &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){
                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = 2;
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }
                }
              });

              $("body #trip-global-container").on("click", ".transfer .btn-go-down", function() {

                // Retrieve the clicked activity (type : transfer)
                var activityContainer = $(this).parent().parent(".transfer");
                // Retrieve the nid of the clicked activity (type : transfer)
                var activityNid = $(this).parent().parent(".transfer").children("input[type='hidden'].input-hidden-nid").val();
                // Retrieve the clicked activities container (type : transfer)
                var activitiesContainer = $(this).parent().parent(".transfer").parent(".transfer-container");
                // Retrieve the transfer number of the current clicked activity
                var transferNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("transfer-cont-") + 14));
                // Retrieve the city name of the clicked activity (type : activity)
                var activityDestination = $(this).parent().parent(".transfer").children("input[type='hidden'].input-hidden-destination").val();
                var indexActivityDestination = null;

                $(".trip").each(function(){

                  if(activityDestination == $(this).children(".trip-city-name").text().trim()){

                    indexActivityDestination = $(this).index();
                  }
                });

                if(transferNumber === 1){
                  // First transfer go instead of the second

                  var isTransferAlreadySet = false;
                  if($(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 .transfer").length === 1){
                    isTransferAlreadySet = true;
                  }

                  if(!isTransferAlreadySet){
                    // Set the first transfer in the empty transfer (second one)

                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > p").show();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 > button").show();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > p").hide();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > button").hide();

                    // Clone the current clicked activity and add it at the end of the previous day
                    activityContainer.clone().appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2");
                    activityContainer.remove();

                    /* Update localStorage "dayNumber" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == transferNumber &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].nid == activityNid &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){

                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = (transferNumber + 1);
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }else{
                    // Invert the second transfer with the first one

                    // Clone the current clicked activity and add it at the end of the previous day
                    var currentTransfer = activityContainer.clone();
                    activityContainer.remove();

                    var otherTransfer = $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > .transfer").clone();
                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 > .transfer").remove();

                    currentTransfer.appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2");
                    otherTransfer.appendTo(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1");

                    /* Update localStorage "dayNumber" value */
                    localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                    // Update activities position
                    for(var i = 0; i < localStorageAllActivities.length; i++){

                      if(
                        localStorageAllActivities[i].dayNumber == transferNumber &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){
                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = (transferNumber + 1);
                      }else if(
                        localStorageAllActivities[i].dayNumber == 2 &&
                        localStorageAllActivities[i].activityType == "transfer" &&
                        localStorageAllActivities[i].actDestination == activityDestination
                      ){
                        // Update activity transfer number (dayNumber)
                        localStorageAllActivities[i].dayNumber = 1;
                      }
                    }

                    // Remove the old localStorage variable
                    localStorage.removeItem("localStorageAllActivities");
                    // Stringify object to pass in localStorage
                    localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                  }
                }
              });
            // }

            // Call removingElements(), filtersElements() & movingElements() functions
            // removingElements();
            // filtersElements();
            // movingElements();

            function addNewCity(actCityName){

                var transferTid = $(".transfer-container > button").attr("class");
                var hostingTid = $(".hosting-container > button").attr("class");

                $("#trip-global-container").append(
                    "<div class=\"trip\">" +
                        "<h3 class=\"trip-city-name\">" + actCityName + "</h3>" +
                        "<div class=\"transfer-container transfer-cont-1\">" +
                            "<p>Aucun transfert</p>" +
                            "<button type=\"button\" class=\"" + transferTid + "\">VOIR TRANSFERTS</button>" +
                        "</div>" +
                        "<hr class=\"transfer-separation\">" +
                        "<div class=\"trip-container\">" +
                        "</div>" +
                        "<hr class=\"transfer-separation\">" +
                        "<div class=\"transfer-container transfer-cont-2\">" +
                            "<p>Aucun transfert</p>" +
                            "<button type=\"button\" class=\"" + transferTid + "\">VOIR TRANSFERTS</button>" +
                        "</div>" +
                    "</div>"
                );

                for(var i = 1; i <= 3; i++){

                    // Get the last trip previously created
                    $("#trip-global-container > .trip:eq(" + ($("#trip-global-container > .trip").length - 1) + ") .trip-container").append(
                        "<div class=\"trip-days\">" +
                            "<div class=\"trip-days-header\">" +
                                "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
                                "<p>Journée n° " + i + "</p>" +
                            "</div>" +
                            "<div class=\"trip-days-details\">" +
                                "<div class=\"activities-container act-cont-" + i + "\">" +
                                    "<p class=\"default-message\">Aucune activité choisie</p>" +
                                "</div>" +
                                "<div class=\"hosting-container hosting-cont-" + i + "\">" +
                                    "<p>Aucun hébergement</p>" +
                                    "<button type=\"button\" class=\"" + hostingTid + "\">VOIR HEBERGEMENTS</button>" +
                                "</div>" +
                            "</div>" +
                        "</div>"
                    );

                    if(i == 3){
                        $("#trip-global-container > .trip:eq(" + ($("#trip-global-container > .trip").length - 1) + ") .hosting-cont-3").remove();
                    }
                }

                // // Call removingElements(), filtersElements() & movingElements() function
                // // onClick function need to be redefined when append a new City
                // removingElements();
                // filtersElements();
                // movingElements();
            }

            /* Retrieve and set to the user cart all activities stocked into localStorage*/
            $( document ).ready(function() {

                var docReadyLocalStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                if(docReadyLocalStorageAllActivities != null){

                    for(var i=0; i < docReadyLocalStorageAllActivities.length; i++){

                        var isCityAlreadySet = false;

                        // Check if the city name is set for the trip else create the trip container
                        $(".trip").each(function(){

                            // If the activity destination is not set in the city name
                            if(docReadyLocalStorageAllActivities[i].actDestination !== $(this).children(".trip-city-name").text().trim()){

                                if($(this).children(".trip-city-name").text().trim() == "Ville"){

                                    // If the city name is "Ville" change it with the name of the activity destination
                                    $(this).children(".trip-city-name").text(docReadyLocalStorageAllActivities[i].actDestination);
                                    isCityAlreadySet = true;

                                    return false;
                                }else{
                                    isCityAlreadySet = (isCityAlreadySet) ? true : false;
                                }

                            }else{

                                isCityAlreadySet = true;

                                return false;
                            }
                        });

                        // Add a new city
                        if(!isCityAlreadySet){

                            // If the city name is not "Ville" add a new city
                            addNewCity(docReadyLocalStorageAllActivities[i].actDestination);
                        }

                        var indexActDestination = null;

                        if(docReadyLocalStorageAllActivities[i].activityType === "activities"){

                            //Get the index of the trip city name
                            $(".trip").each(function(){

                                if(docReadyLocalStorageAllActivities[i].actDestination === $(this).children(".trip-city-name").text().trim()){

                                    indexActDestination = $(this).index();
                                }
                            });


                            // Add new day if it doesn't exist
                            if($(".trip:eq(" + indexActDestination + ") .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).length === 0){

                                var dayNumberToSet = docReadyLocalStorageAllActivities[i].dayNumber;
                                var hostingCategory = $(".hosting-container > button").attr("class").split("-")[1];

                                $(".trip:eq(" + indexActDestination + ") .trip-container").append(
                                    "<div class=\"trip-days\">" +
                                        "<div class=\"trip-days-header\">" +
                                            "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
                                            "<p>Journée n° " + dayNumberToSet + "</p>" +
                                            "<button type=\"button\" class=\"btn-remove-day\">" +
                                                "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                            "</button>" +
                                        "</div>" +
                                        "<div class=\"trip-days-details\">" +
                                            "<div class=\"activities-container act-cont-" + dayNumberToSet + "\">" +
                                                "<p class=\"default-message\">Aucune activité choisie</p>" +
                                            "</div>" +
                                            "<div class=\"hosting-container hosting-cont-" + dayNumberToSet + "\">" +
                                                "<p>Aucun hébergement</p>" +
                                                "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
                                            "</div>" +
                                        "</div>" +
                                    "</div>"
                                );
                            }

//                             // Add the hosting container the day
//                             if($(".trip:eq(" + indexActDestination +") .trip-days:eq(" + (dayNumberToSet - 1) + ") .trip-days-details .hosting-container").length === 0){
// console.log("No hosting container for dayNumber : " + dayNumberToSet);
//                                 $(".trip:eq(" + indexActDestination +") .trip-days:eq(" + (dayNumberToSet - 1) + ") .trip-days-details").append(
//                                     "<div class=\"hosting-container hosting-cont-" + dayNumberToSet + "\">" +
//                                         "<p>Aucun hébergement</p>" +
//                                         "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
//                                     "</div>"
//                                 );
//                             }

                            // Remove the hosting container of the last day
                            var totalNbOfDays = $(".trip:eq(" + indexActDestination + ") .trip-days").length;
                            $(".trip:eq(" + indexActDestination + ") .trip-days:eq(" + (totalNbOfDays - 1) + ") .hosting-container").remove();



                            // Remove default message
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > p.default-message").remove();

                            // Add activity to cart(type activity)
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).append(
                                "<div class=\"activities\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].actDestination + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<div class=\"activities-titles-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                        "<p class='activities-pack-title'>" + docReadyLocalStorageAllActivities[i].packTitle + "</p>" +
                                    "</div>" +
                                    "<div class=\"activities-price-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].actPrice + "</p>" +
                                    "</div>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }else if(docReadyLocalStorageAllActivities[i].activityType === "hosting"){

                            //Get the index of the trip city name
                            $(".trip").each(function(){

                                if(docReadyLocalStorageAllActivities[i].actDestination === $(this).children(".trip-city-name").text().trim()){

                                    indexActDestination = $(this).index();
                                }
                            });

                            // Remove default informations
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > p").hide();
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > button").hide();

                            // Add activity to cart(type hosting)
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).append(
                                "<div class=\"hosting\">" +
                                    // "<div class=\"positioning-btn\">" +
                                    //     "<button type=\"button\" class=\"btn-go-up\">" +
                                    //     "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                    //     "</button>" +
                                    //     "<button type=\"button\" class=\"btn-go-down\">" +
                                    //     "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                    //     "</button>" +
                                    // "</div>" +
                                    "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].actDestination + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<div class=\"activities-titles-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                        "<p class='activities-pack-title'>" + docReadyLocalStorageAllActivities[i].packTitle + "</p>" +
                                    "</div>" +
                                    "<div class=\"activities-price-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].actPrice + "</p>" +
                                    "</div>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }else if(docReadyLocalStorageAllActivities[i].activityType === "transfer"){

                            //Get the index of the trip city name
                            $(".trip").each(function(){

                                if(docReadyLocalStorageAllActivities[i].actDestination === $(this).children(".trip-city-name").text().trim()){

                                    indexActDestination = $(this).index();
                                }
                            });

                            var transferNumber = docReadyLocalStorageAllActivities[i].dayNumber;

                            // Remove default informations
                            $(".trip:eq(" + indexActDestination + ") .transfer-cont-" + transferNumber + " > p").hide();
                            $(".trip:eq(" + indexActDestination + ") .transfer-cont-" + transferNumber + " > button").hide();

                            // Add activity to cart(type transfer)
                            $(".trip:eq(" + indexActDestination + ") .transfer-cont-" + transferNumber).append(
                                "<div class=\"transfer\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].actDestination + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<div class=\"activities-titles-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                        "<p class='activities-pack-title'>" + docReadyLocalStorageAllActivities[i].packTitle + "</p>" +
                                    "</div>" +
                                    "<div class=\"activities-price-container\">" +
                                        "<p>" + docReadyLocalStorageAllActivities[i].actPrice + "</p>" +
                                    "</div>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }
                    }

                    // Add the hosting container the day
                    $(".trip").each(function(){

                        var hostingToAdd = null;
                        var totalNbDays = $(this).children(".trip-container").children(".trip-days").length;

                        $(this).children(".trip-container").children(".trip-days").each(function(){

                            // Add hosting container if does not exist
                            if(
                              $(this).children(".trip-days-details").children(".hosting-container").length === 0 &&
                              $(this).index() < (totalNbDays - 1)
                            ){

                                $(this).children(".trip-days-details").append(
                                    "<div class=\"hosting-container hosting-cont-" + ($(this).index() + 1) + "\">" +
                                        "<p>Aucun hébergement</p>" +
                                        "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
                                    "</div>"
                                );
                            }

                            // Add hosting(s) if doesn't exist
                            if($(this).children(".trip-days-details").children(".hosting-container").children(".hosting").length >= 1){

                                hostingToAdd = $(this).children(".trip-days-details").children(".hosting-container").children(".hosting").clone();
                            }else{

                                if($(this).index() < (totalNbDays - 1)){
                                    if($(this).children(".trip-days-details").children(".hosting-container").children(".hosting").length === 0){

                                      $(this).children(".trip-days-details").children(".hosting-container").append(hostingToAdd);
                                      $(this).children(".trip-days-details").children(".hosting-container").children("p").hide();
                                      $(this).children(".trip-days-details").children(".hosting-container").children("button").hide();
                                    }
                                }
                            }
                        });

                        if(hostingToAdd === null){
                            $(this).children(".trip-container").children(".trip-days").children(".trip-days-details").children(".hosting-container").children("p").show();
                            $(this).children(".trip-container").children(".trip-days").children(".trip-days-details").children(".hosting-container").children("button").show();
                        }
                    });

//                     if($(".trip:eq(" + indexActDestination +") .trip-days:eq(" + (dayNumberToSet - 1) + ") .trip-days-details .hosting-container").length === 0){
// console.log("No hosting container for dayNumber : " + dayNumberToSet);
//                         $(".trip:eq(" + indexActDestination +") .trip-days:eq(" + (dayNumberToSet - 1) + ") .trip-days-details").append(
//                             "<div class=\"hosting-container hosting-cont-" + dayNumberToSet + "\">" +
//                                 "<p>Aucun hébergement</p>" +
//                                 "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
//                             "</div>"
//                         );
//                     }

                    // Position every activities (type activity) added to the user cart at their right place
                    for(var j = 0; j < docReadyLocalStorageAllActivities.length; j++){
//TODO : Maybe check if we need to add the index of the city
                        $(".trip .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[j].dayNumber + " > .activities").each(function(){

                          // console.log("CURRENT : " + $(this).children(".activities-titles-container").children("p:first-child").text());
                          // console.log("CURRENT : " + $(this).children(".activities-titles-container").children(".activities-pack-title").text());
                          // console.log("CURRENT : " + $(this).index());
                          // console.log("--------------------------");
                            if(
                              $(this).index() !== docReadyLocalStorageAllActivities[j].positionInDay &&
                              $(this).children("input[type=\"hidden\"].input-hidden-nid").val() === docReadyLocalStorageAllActivities[j].nid &&
                              $(this).children(".activities-titles-container").children(".activities-pack-title").text() === docReadyLocalStorageAllActivities[j].packTitle
                            ){
                                // console.log("EXPECTED : " + docReadyLocalStorageAllActivities[j].title);
                                // console.log("EXPECTED : " + docReadyLocalStorageAllActivities[j].packTitle);
                                // console.log("EXPECTED : " + docReadyLocalStorageAllActivities[j].positionInDay);
                                // console.log("CURRENT : " + $(this).children(".activities-titles-container").children("p:first-child").text());
                                // console.log("CURRENT : " + $(this).children(".activities-titles-container").children(".activities-pack-title").text());
                                // console.log("CURRENT : " + $(this).index());
                                // console.log("--------------------------");

                                if(docReadyLocalStorageAllActivities[j].positionInDay > $(this).index()){

                                    //console.log("----- WARNING : EXPECTED > CURRENT");

                                    if(docReadyLocalStorageAllActivities[j].positionInDay === ($(this).parent().children(".activities").length - 1)){

                                        $(this).insertAfter($(this).parent().children(".activities:eq(" + (docReadyLocalStorageAllActivities[j].positionInDay) + ")"));

                                        //console.log("CURRENT insertAfter EXPECTED - 1");
                                    }else{

                                        $(this).insertBefore($(this).parent().children(".activities:eq(" + (docReadyLocalStorageAllActivities[j].positionInDay + 1) + ")"));

                                        //console.log("CURRENT insertBefore EXPECTED + 1");
                                    }
                                }else if(docReadyLocalStorageAllActivities[j].positionInDay < $(this).index()){

                                    //console.log("----- WARNING : CURRENT > EXPECTED");

                                    if(docReadyLocalStorageAllActivities[j].positionInDay === 0){

                                        $(this).insertBefore($(this).parent().children(".activities:eq(" + (docReadyLocalStorageAllActivities[j].positionInDay) + ")"));

                                        //console.log("CURRENT insertBefore EXPECTED + 1");
                                    }else{

                                        $(this).insertAfter($(this).parent().children(".activities:eq(" + (docReadyLocalStorageAllActivities[j].positionInDay - 1) + ")"));

                                        //console.log("CURRENT insertAfter EXPECTED - 1");
                                    }
                                }

                                //console.log("--------------------------------------------");
                            }
                        });
                    }
                }

                // New calcul of the total quotation cost
                totalQuotationCost();
            });

            /* Positioning of the user cart interface */
            function setCartInterfacePosition(){

                var menuHeight = $("#header-wrapper").height();
                var cartInterfaceHeight = $("#cart-container").css("top");

                if (cartInterfaceHeight.indexOf("px") > -1){
                    cartInterfaceHeight = cartInterfaceHeight.replace("px", "");
                }

                if(menuHeight !== cartInterfaceHeight){

                    $("#cart-container").css("height", "calc(100% - " + menuHeight + "px)");

                    var setBtnDisplay = menuHeight + (($(window).height() - menuHeight)/2) - ($("#btn-display").outerHeight()/2);

                    $("#btn-display").stop().animate({
                        top: setBtnDisplay + "px",
                    }, 150);

                    $("#cart-container").stop().animate({
                        top: menuHeight + "px",
                    }, 150);
                }
            }

            setInterval(function(){
                setCartInterfacePosition();
            }, 100);

            /* Display or Hide cart interface following the page type */
            if($("#cart-container").attr("class") === "destination-page"){
                $("#block-memory-cart-memory-cart").css("width", "400px");
                $("#icon-plus").css("display", "none");
                $("#icon-minus").css("display", "block");
                $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");

                $("div#continent").css("width", "calc(100% - 400px)");
                $("div#breadcrumb-wrapper").css("width", "calc(100% - 400px)");
            }else if($("#cart-container").attr("class") === "activity-page"){
                $("#block-memory-cart-memory-cart").css("width", "400px");
                $("#icon-plus").css("display", "none");
                $("#icon-minus").css("display", "block");
                $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");

                $("div#activity-page-container").css("width", "calc(100% - 400px)");
                $("div#block-memory-blocks-memory-switch-activities").css("width", "calc(100% - 400px)");
            }

            /* Scroll - Resize header menu */
            // $( window ).scroll(function() {
            //
            //     if($(window).scrollTop() > 0){
            //
            //         $("div#block-memory-cart-memory-cart").css("top", "calc(60px + 34px)");
            //     }
            //     if($(window).scrollTop() === 0){
            //
            //         $("div#block-memory-cart-memory-cart").css("top", "calc(80px + 34px)");
            //     }
            //
            // });

            $("#btn-display").click(function(){

                if($("#block-memory-cart-memory-cart").width() > 0){

                    $("#block-memory-cart-memory-cart").css("width", 0);
                    $("#icon-plus").css("display", "block");
                    $("#icon-minus").css("display", "none");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "none");

                    if( $("div#activity-page-container").length >= 1 ){
                        $("div#activity-page-container").css("width", "100%");
                        $("div#block-memory-blocks-memory-switch-activities").css("width", "100%");
                    }
                    if( $("div#continent").length >= 1 ){
                        $("div#continent").css("width", "100%");
                        $("div#breadcrumb-wrapper").css("width", "100%");
                    }
                }else if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");

                    if( $("div#activity-page-container").length >= 1 ){
                        $("div#activity-page-container").css("width", "calc(100% - 400px)");
                        $("div#block-memory-blocks-memory-switch-activities").css("width", "calc(100% - 400px)");
                    }
                    if( $("div#continent").length >= 1 ){
                        $("div#continent").css("width", "calc(100% - 400px)");
                        $("div#breadcrumb-wrapper").css("width", "calc(100% - 400px)");
                    }
                }
            });

            /* Show user cart when user click on cart thumbnail */
            $(".cont-add-cart").click(function(){

                if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");

                    $("div#activity-page-container").css("width", "calc(100% - 400px)");
                    $("div#block-memory-blocks-memory-switch-activities").css("width", "calc(100% - 400px)");
                }
            });

            /* Empty cart */
            $("#empty-cart").click(function(){
               $("form#devis input").val("");
               $("form#devis select").val("0");
               $("form#devis textarea").val("");
            });

            /* Function intended to add a new day when every activity or hosting or transfer are set inside a day */
            function addANewDay(activityDestinationIndex){

                var nbCurrentDays = $(".trip:eq(" + activityDestinationIndex + ") .trip-days").length;
                var dayNumberToSet = nbCurrentDays + 1;

                var hostingCategory = $(".trip:eq(" + activityDestinationIndex + ") .hosting-container > button").attr("class").split("-")[1];
                //var transferCategory = $(".transfer-container > button").attr("class").split("-")[1];

                $(".trip:eq(" + activityDestinationIndex + ") .trip-container").append(
                    "<div class=\"trip-days\">" +
                        "<div class=\"trip-days-header\">" +
                            "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" +
                            "<p>Journée n° " + dayNumberToSet + "</p>" +
                            "<button type=\"button\" class=\"btn-remove-day\">" +
                                "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                            "</button>" +
                        "</div>" +
                        "<div class=\"trip-days-details\">" +
                            "<div class=\"activities-container act-cont-" + dayNumberToSet + "\">" +
                                "<p class=\"default-message\">Aucune activité choisie</p>" +
                            "</div>" +
                            // "<div class=\"hosting-container hosting-cont-" + dayNumberToSet + "\">" +
                            //     "<p>Aucun hébergement</p>" +
                            //     "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
                            // "</div>" +
                        "</div>" +
                    "</div>"
                );

                // Add hosting container for every trip days except the last one if it doesn't exist
                $(".trip:eq(" + activityDestinationIndex + ") .trip-days").each(function(){

                    var totalNbOfDays = $(".trip:eq(" + activityDestinationIndex + ") .trip-days").length;

                    if( $(this).index() < (totalNbOfDays - 1) ){

                        if($(this).children(".trip-days-details").children(".hosting-container").length < 1){

                            $(this).children(".trip-days-details").append(
                                "<div class=\"hosting-container hosting-cont-" + $(this).children(".trip-days-details").children(".activities-container").attr("class").substr($(this).children(".trip-days-details").children(".activities-container").attr("class").indexOf("act-cont-") + 9) + "\">" +
                                    "<p>Aucun hébergement</p>" +
                                    "<button type=\"button\" class=\"filter-" + hostingCategory + "\">VOIR HEBERGEMENTS</button>" +
                                "</div>"
                            );
                        }
                    }
                });

                // Check if a hosting is defined into the city
                if($(".trip:eq(" + activityDestinationIndex + ") .trip-days .hosting-container .hosting").length >= 1){

                    var hostingElement = $(".trip:eq(" + activityDestinationIndex + ") .trip-days .hosting-container .hosting").clone()[0];

                    $(".trip:eq(" + activityDestinationIndex + ") .trip-days .hosting-container").each(function(){

                        // Add hosting if it's defined and not set in the trip day
                        if($(this).children(".hosting").length === 0){

                            $(this).append(hostingElement);
                            $(this).children("p").hide();
                            $(this).children("button").hide();

                            // Add LocalStorage
                            var objActivityDatas = {};

                            // Add activity datas in object
                            objActivityDatas.dayNumber = $(this).parent(".trip-days-details").parent(".trip-days").index() + 1;
                            objActivityDatas.positionInDay = 0;
                            objActivityDatas.activityType = "hosting";
                            objActivityDatas.nid = $(this).children(".hosting").children("input[type=\"hidden\"].input-hidden-nid").val();
                            objActivityDatas.title = $(this).children(".hosting").children(".activities-titles-container").children("p:eq(0)").text();
                            objActivityDatas.packTitle = $(this).children(".hosting").children(".activities-titles-container").children(".activities-pack-title").text();
                            objActivityDatas.actPrice = $(this).children(".hosting").children(".activities-price-container").children("p").text();
                            objActivityDatas.actDestination = $(".trip:eq(" + activityDestinationIndex + ") .trip-city-name").text();
                            objActivityDatas.image = $(this).children(".hosting").children(".activities-img-container").children("img").attr("src");

                            console.log(objActivityDatas);
                            // var localStorageAllActivitiesLength = Object.keys(localStorageAllActivities).length;

                            localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities")) || [];
                            // Add activity datas object in global localStorage object with incrementing index
                            // localStorageAllActivities[localStorageAllActivitiesLength] = objActivityDatas;
                            localStorageAllActivities.push(objActivityDatas);

                            // Stringify object to pass in localStorage
                            localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                        }
                    });

                }
            }

            /* Add activity to cart */
            $(".cont-add-cart").click(function(){

                var actFilterCategory = null;
                var actNid = null;
                var actTitle = null;
                var packTitle = null;
                var actPrice = null;
                var ajaxUrl = null;
                var actDestination = null;

                if($("#cart-container").attr("class") === "destination-page"){

                    // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
                    actFilterCategory = $(this).parent().children(".cont-act-cat").val();

                    actNid = $(this).parent().children(".cont-act-nid").val();
                    actTitle = $(this).parent().children(".cont-stick-title").text();
                    // Activity price and activity destination are not set

                    var urlPathnameDestinationPage = window.location.pathname.split("/destinations")[0];

                    if(urlPathnameDestinationPage != null){
                      ajaxUrl = urlPathnameDestinationPage + "/destinations/ajax/cart";
                    }else{
                      ajaxUrl = "/destinations/ajax/cart";
                    }
                }else if($("#cart-container").attr("class") === "activity-page"){

                    // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
                    // actFilterCategory = $(this).parent().children(".activity-category").val();
                    actFilterCategory = $(".activity-category").val();

                    // actNid = $(this).parent().children(".activity-nid").val();
                    actNid = $(".activity-nid").val();

                    // actTitle = $(this).parent().children(".activity-title").val();
                    actTitle = $(".activity-title").val();
                    packTitle = $(this).parent().parent().parent(".activity-prestation-container").children(".activity-page-label").text();
                    actPrice = $(this).parent().children(".prestation-price").text();
                    actDestination = $("#memory-switch-act-container > #memory-destination").text().trim();

                    // if (packTitle.substring(packTitle.length-1) === ":")
                    // {
                    //   packTitle = packTitle.substring(0, packTitle.length-1);
                    // }

                    var urlPathnameActivityPage = window.location.pathname.split("/destinations")[0];

                    if(urlPathnameActivityPage != null){
                      ajaxUrl = urlPathnameActivityPage + "/destinations/ajax/cart";
                    }else{
                      ajaxUrl = "/destinations/ajax/cart";
                    }
                }

                // Ajax
                $.ajax({
                    type: "POST",
                    url: ajaxUrl,
                    data: {
                        actNid: actNid,
                        actTitle : actTitle,
                    },
                    success: function(data) {

                        // console.log(
                        //     "La donnée résultante : " + "\n\t" +
                        //     "- NID : " + data["nid"] + "\n\t" +
                        //     "- Title : " + data["title"] + "\n\t" +
                        //     "- Image : " + data["image"]
                        // );

                        /* Function intended to add an activity to the localStorage in order to stock and retrieve datas in other pages */
                        function addLocalStorage(dayNumber, activityType){

                            var objActivityDatas = {};
                            var positionInDay;

                            var indexActivityDestination = null;

                            $(".trip").each(function(){

                                if(actDestination == $(this).children(".trip-city-name").text().trim()){

                                    indexActivityDestination = $(this).index();
                                }
                            });

                            if(activityType === "activities"){

                                positionInDay = $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " input[value='" + data.nid + "'].input-hidden-nid").parent(".activities").index();

                                if(positionInDay === 1 && $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " > .activities").length === 1){
                                    positionInDay = 0;
                                }
                            }else{
                                // Transfer doesn't have position in day
                                // There is only 1 Hosting in a day
                                positionInDay = 0;
                            }

                            // Add activity datas in object
                            objActivityDatas.dayNumber = dayNumber;
                            objActivityDatas.positionInDay = positionInDay;
                            objActivityDatas.activityType = activityType;
                            objActivityDatas.nid = data.nid;
                            objActivityDatas.title = data.title;
                            objActivityDatas.packTitle = packTitle;
                            objActivityDatas.actPrice = actPrice;
                            objActivityDatas.actDestination = actDestination;
                            objActivityDatas.image = data.image;

                            // var localStorageAllActivitiesLength = Object.keys(localStorageAllActivities).length;

                            localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities")) || [];
                            // Add activity datas object in global localStorage object with incrementing index
                            // localStorageAllActivities[localStorageAllActivitiesLength] = objActivityDatas;
                            localStorageAllActivities.push(objActivityDatas);

                            // Stringify object to pass in localStorage
                            localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                            // var storedNames = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                            // New calcul of the total quotation cost
                            totalQuotationCost();
                        }

                        /* Function intended to add an activity to the cart interface */
                        function addActivityToCart(dayNumber){

                            if($(".trip").length === 1 && $(".trip:eq(0) .trip-city-name").text() === "Ville"){
                                $(".trip:eq(0) .trip-city-name").text(actDestination);
                            }

                            var isDestinationContainerSet = false;

                            $(".trip").each(function(){

                                if( $(this).children(".trip-city-name").text() === actDestination ){
                                  isDestinationContainerSet = true;

                                  return false;
                                }
                            });

                            if(!isDestinationContainerSet){
                                addNewCity(actDestination);
                            }

                            //Get the index of the trip city name
                            var indexActDestination = null;

                            $(".trip").each(function(){

                                if(actDestination === $(this).children(".trip-city-name").text().trim()){

                                    indexActDestination = $(this).index();
                                }
                            });

                            // Add activity to cart
                            $(".trip:eq(" + indexActDestination + ") .trip-days-details > .activities-container.act-cont-" + dayNumber).append(
                                "<div class=\"activities\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + data.nid + "\">" +
                                    "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + actDestination + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + data.image + "\">" +
                                    "</div>" +
                                    "<div class=\"activities-titles-container\">" +
                                        "<p>" + data.title + "</p>" +
                                        "<p class='activities-pack-title'>" + packTitle + "</p>" +
                                    "</div>" +
                                    "<div class=\"activities-price-container\">" +
                                        "<p>" + actPrice + "</p>" +
                                    "</div>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );

                            // Call addLocalStorage() function - Parameter : day number
                            addLocalStorage(dayNumber, "activities");

                            //$(".trip:eq(" + indexActDestination + ") .trip-days-details > .activities-container.act-cont-" + dayNumber)

                            /* Remove the default message if exists */
                            if( $(".trip:eq(" + indexActDestination + ") .act-cont-" + dayNumber + " .default-message").length >= 1 ){
                                $(".trip:eq(" + indexActDestination + ") .act-cont-" + dayNumber + " .default-message").remove();
                            }
                        }

                        /* Function intended to check if an activity is already set inside a day */
                        function checkIfActivityIsAlreadyInTheDay(dayNumber){

                            var isActivityAlreadySet = null;

                            var indexActivityDestination = null;

                            $(".trip").each(function(){

                                if(actDestination == $(this).children(".trip-city-name").text().trim()){

                                    indexActivityDestination = $(this).index();
                                }
                            });

                            $(".trip:eq(" + indexActivityDestination + ") .act-cont-" + dayNumber + " .activities input[type=hidden].input-hidden-nid").each(function(){

                                if($(this).val() === data.nid && $(this).parent().children(".activities-titles-container").children(".activities-pack-title").text() === packTitle){

                                    isActivityAlreadySet = true;

                                    // Equivalent to break inside each()
                                    return false;
                                }else{
                                    isActivityAlreadySet = false;
                                }
                            });

                            // Return values here because we can't return values inside each(). Return in each are specific to each() statement
                            if(isActivityAlreadySet){

                                // There is already THIS activity inside the day
                                return true;
                            }else{

                                // There isn't THIS activity inside the day
                                return false;
                            }
                        }

                        /* Function intended to add Hosting activity or Transfer activity */
                        function addHostingOrTransfer(nameActivity){

                            var isNameActivityIsFull = null;

                            var indexActivityDestination = null;

                            $(".trip").each(function(){

                                if(actDestination == $(this).children(".trip-city-name").text().trim()){

                                    indexActivityDestination = $(this).index();
                                }
                            });

                            if( nameActivity === "transfer" ){

                                // Max 2 transfer by city
                                var nbTransferContainer = $(".trip:eq(" + indexActivityDestination + ") .transfer-container .transfer").length;

                                if(nbTransferContainer < 2){

                                    var transferNumber;

                                    if( $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-1 .transfer").length === 0 ){
                                        // If the first transfer is not set
                                        transferNumber = 1;
                                    }else if( $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-2 .transfer").length === 0 ){
                                        // If the second transfer is not set
                                        transferNumber = 2;
                                    }

                                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-" + transferNumber + "> p").hide();
                                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-" + transferNumber + " > button").hide();

                                    $(".trip:eq(" + indexActivityDestination + ") .transfer-cont-" + transferNumber).append(
                                        "<div class=\"transfer\">" +
                                            "<div class=\"positioning-btn\">" +
                                                "<button type=\"button\" class=\"btn-go-up\">" +
                                                    "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                                "</button>" +
                                                "<button type=\"button\" class=\"btn-go-down\">" +
                                                    "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                                "</button>" +
                                            "</div>" +
                                            "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + data.nid + "\">" +
                                            "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + actDestination + "\">" +
                                            "<div class=\"activities-img-container\">" +
                                                "<img src=\"" + data.image + "\">" +
                                            "</div>" +
                                            "<div class=\"activities-titles-container\">" +
                                                "<p>" + data.title + "</p>" +
                                                "<p class='activities-pack-title'>" + data.packTitle + "</p>" +
                                            "</div>" +
                                            "<div class=\"activities-price-container\">" +
                                                "<p>" + actPrice + "</p>" +
                                            "</div>" +
                                            "<button type=\"button\" class=\"btn-remove-activity\">" +
                                                "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                            "</button>" +
                                        "</div>"
                                    );

                                    // Call addLocalStorage() function - Parameter : transfer number
                                    addLocalStorage(transferNumber, nameActivity);
                                }

                            }else if( nameActivity === "hosting" ){

                                // $(".hosting-container").each(function(){
                                //
                                //     if( $(this).children(".hosting").length >= 1 ){
                                //         isNameActivityIsFull = (isNameActivityIsFull === false) ? false : true;
                                //     }else{
                                //         isNameActivityIsFull = false;
                                //     }
                                // });

                                // if(isNameActivityIsFull){
                                //
                                //   // Call addANewDat() intended to add a new day
                                //   addANewDay();
                                // }else{

                              console.log("addHosting");

                                  var nbHostingContainer = $(".trip:eq(" + indexActivityDestination + ") .hosting-container").length;

                              console.log("nbHostingContainer : " + nbHostingContainer);

                                  for(var i = 1; i <= nbHostingContainer ; i++){

                                      $(".trip:eq(" + indexActivityDestination + ") .hosting-cont-" + i + " > p").hide();
                                      $(".trip:eq(" + indexActivityDestination + ") .hosting-cont-" + i + " > button").hide();

                                      // Get the number of activities added to this day
                                      var nbHostingInDay = $(".trip:eq(" + indexActivityDestination + ") .hosting-cont-" + i + " .hosting").length;

                                      if(nbHostingInDay === 0){

                                          $(".trip:eq(" + indexActivityDestination + ") .hosting-cont-" + i).append(
                                              "<div class=\"hosting\">" +
                                                  // "<div class=\"positioning-btn\">" +
                                                  //     "<button type=\"button\" class=\"btn-go-up\">" +
                                                  //         "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                                  //     "</button>" +
                                                  //     "<button type=\"button\" class=\"btn-go-down\">" +
                                                  //         "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                                  //     "</button>" +
                                                  // "</div>" +
                                                  "<input class=\"input-hidden-nid\" type=\"hidden\" value=\"" + data.nid + "\">" +
                                                  "<input class=\"input-hidden-destination\" type=\"hidden\" value=\"" + actDestination + "\">" +
                                                  "<div class=\"activities-img-container\">" +
                                                      "<img src=\"" + data.image + "\">" +
                                                  "</div>" +
                                                  "<div class=\"activities-titles-container\">" +
                                                      "<p>" + data.title + "</p>" +
                                                      "<p class='activities-pack-title'>" + data.packTitle + "</p>" +
                                                  "</div>" +
                                                  "<div class=\"activities-price-container\">" +
                                                      "<p>" + actPrice + "</p>" +
                                                  "</div>" +
                                                  "<button type=\"button\" class=\"btn-remove-activity\">" +
                                                      "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                                  "</button>" +
                                              "</div>"
                                          );

                                          // Call addLocalStorage() function - Parameter : day number
                                          addLocalStorage(i, nameActivity);

                                          //break;
                                      }
                                  }
                                // }
                            }
                        }


                        // Determine if the city already exists or not
                        // var freeTripIndex = null;
                        //
                        // $(".trip").each(function(){
                        //
                        //     var tripIndex = $(this).index();
                        //
                        //     if(
                        //         $(".trip:eq(" + tripIndex + ") .activities").length >= 1 ||
                        //         $(".trip:eq(" + tripIndex + ") .transfer").length >= 1 ||
                        //         $(".trip:eq(" + tripIndex + ") .hosting").length >= 1
                        //     ){
                        //         console.log($(this).index() + " contient 1 enfant");
                        //     }else{
                        //         freeTripIndex = tripIndex;
                        //         $(".trip:eq(" + tripIndex + ") > .trip-city-name").text(actDestination);
                        //     }
                        // });

                        var activityDestinationIndex = 0;

                        $(".trip").each(function(){

                            if(actDestination == $(this).children(".trip-city-name").text().trim()){

                                activityDestinationIndex = $(this).index();
                            }
                        });

                        // Get Hosting filter category NID
                        var hostingFilterCatNID = $(".hosting-container > button").attr("class").split("-")[1];

                        // Get Transfer filter category NID
                        var transferFilterCatNID = $(".transfer-container > button").attr("class").split("-")[1];

                        var nameActivityCategory = null;

                        if(actFilterCategory === hostingFilterCatNID){ // If the activity clicked is a hosting activity

                            nameActivityCategory = "hosting";
                            addHostingOrTransfer(nameActivityCategory);

                        }else if(actFilterCategory === transferFilterCatNID){ // If the activity clicked is a transfer activity

                            nameActivityCategory = "transfer";
                            addHostingOrTransfer(nameActivityCategory);

                        }else{ // If the activity clicked is an activity

                            var isActivityIsFull = null;

                            $(".trip:eq(" + activityDestinationIndex + ") .activities-container").each(function(){

                                if( $(this).children(".activities").length >= 6 ){

                                    isActivityIsFull = (isActivityIsFull === false) ? false : true;
                                }else{

                                    isActivityIsFull = false;
                                }
                            });

                            if(isActivityIsFull){

                              // Call addANewDay() intended to add a new day
                              addANewDay(activityDestinationIndex);
                            }else{

                                var activityIsInAllDays = null;

                                // Retrieve the number of days currently displayed for user cart
                                var nbDays =  $(".trip:eq(" + activityDestinationIndex + ") .activities-container").length;

                                for(var i = 1; i <= nbDays ; i++){

                                    // Get the number of activities added to this day
                                    var nbActivitiesInDay = $(".trip:eq(" + activityDestinationIndex + ") .act-cont-" + i + " .activities").length;

                                    if(nbActivitiesInDay < 6){

                                        // Retrieve return value from the function intended to check if an activity is already set in the day
                                        var isActivityAlreadySet = checkIfActivityIsAlreadyInTheDay(i);

                                        // If the activity is not set in the day, set it.
                                        if( !isActivityAlreadySet ){

                                            activityIsInAllDays = false;

                                            // Call addActivityToCart()
                                            addActivityToCart(i);

                                            // /* Remove the default message if exists */
                                            // if( $(".trip:eq(" + activityDestinationIndex + ") .act-cont-" + i + " .default-message").length >= 1 ){
                                            //     $(".trip:eq(" + activityDestinationIndex + ") .act-cont-" + i + " .default-message").remove();
                                            // }

                                            break;
                                        }else{
                                            activityIsInAllDays = (activityIsInAllDays === false) ? false : true;
                                        }
                                    }
                                }

                                if(activityIsInAllDays) {

                                    // Call addANewDay() intended to add a new day
                                    addANewDay(activityDestinationIndex);
                                }
                            }
                        }
                    }
                });

                // // Call removingElements(), filtersElements() & movingElements() function
                // // onClick function need to be redefined when append a new City
                // removingElements();
                // filtersElements();
                // movingElements();
            });

            /* Function intended to remove localStorage activity datas when user remove an activity in his cart */
            function removeLocalStorage(nidToRemove, dayNumberToRemove, activityTypeToRemove, packTitleToRemove, actDestinationToRemove){

              // console.log("remove localstorage !!");
              // console.log("nidToRemove : " + nidToRemove);
              // console.log("dayNumberToRemove : " + dayNumberToRemove);
              // console.log("activityTypeToRemove : " + activityTypeToRemove);
              // console.log("packTitleToRemove : " + packTitleToRemove);
              // console.log("actDestinationToRemove : " + actDestinationToRemove);

                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                console.log(localStorageAllActivities);

                for(var i = 0; i < localStorageAllActivities.length; i++){

                  // console.log("blablabla");
                  //
                  // console.log("--------------- remove");
                  // console.log("dayNumberToRemove : " + dayNumberToRemove + " | " + localStorageAllActivities[i].dayNumber);
                  // console.log("nidToRemove : " + nidToRemove + " | " + localStorageAllActivities[i].nid);
                  // console.log("activityTypeToRemove : " + activityTypeToRemove + " | " + localStorageAllActivities[i].activityType);
                  // console.log("packTitleToRemove : " + packTitleToRemove + " | " + localStorageAllActivities[i].packTitle);
                  // console.log("actDestinationToRemove : " + actDestinationToRemove + " | " + localStorageAllActivities[i].actDestination);
                  // console.log("----> i : " + i);

                    if(
                        localStorageAllActivities[i].dayNumber == dayNumberToRemove &&
                        localStorageAllActivities[i].nid == nidToRemove &&
                        localStorageAllActivities[i].activityType == activityTypeToRemove &&
                        localStorageAllActivities[i].packTitle == packTitleToRemove &&
                        localStorageAllActivities[i].actDestination == actDestinationToRemove
                    ){


                        //localStorage.removeItem(localStorageAllActivities[i]);
                        localStorageAllActivities.splice(i, 1);
                    }
                }

                var activityDestinationIndex = null;

                $(".trip").each(function(){

                  if(actDestinationToRemove == $(this).children(".trip-city-name").text().trim()){

                    activityDestinationIndex = $(this).index();
                  }
                });

                // Update localStorage "positionInDay" value
                if(activityTypeToRemove === "activities"){
                    var indexActivityToRemove = $(".trip:eq(" + activityDestinationIndex + ") .act-cont-" + dayNumberToRemove + " > .activities > input[value='" + nidToRemove + "'].input-hidden-nid").parent(".activities").index();

                    for(var j = 0; j < localStorageAllActivities.length; j++){

                        if(
                            localStorageAllActivities[j].dayNumber == dayNumberToRemove &&
                            localStorageAllActivities[j].activityType == activityTypeToRemove &&
                            localStorageAllActivities[j].positionInDay > indexActivityToRemove &&
                            localStorageAllActivities[j].actDestination == actDestinationToRemove
                        ){
                            localStorageAllActivities[j].positionInDay = parseInt(localStorageAllActivities[j].positionInDay) - 1;
                        }
                    }
                }

                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
                // Stringify object to pass in localStorage
                localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                // New calcul of the total quotation cost
                totalQuotationCost();
            }

            /* Function intended to update days position and datas stocked into localStorage */
            function updateDaysPosition(currentElement, actDestinationToRemove){

              // Retrieve the current days number starting from 1
              var currentDaysNumber = $(".trip:eq(" + actDestinationToRemove + ") .trip-days").length;
              // Retrieve the index position of the current day to remove starting from 0
              var dayContainer = $(currentElement).parent().parent(".trip-days").index();

              if(currentDaysNumber > dayContainer + 1){
                // Would mean there is days after the current day to remove

                for(var i = (dayContainer + 1) ; i < currentDaysNumber; i++){

                  $(".trip:eq(" + actDestinationToRemove + ") .trip-days").eq(i).children(".trip-days-header").children("p").text("Journée n° " + i);

                  // Change class
                  $(".trip:eq(" + actDestinationToRemove + ") .trip-days").eq(i).children(".trip-days-details").children("div").each(function(){

                    var currentClass = $(this).attr("class");

                    if(currentClass.indexOf("activities-container") !== -1){
                      $(this).removeClass("act-cont-" + (i+1));
                      $(this).addClass("act-cont-" + i);
                    }else if(currentClass.indexOf("hosting-container") !== -1){
                      $(this).removeClass("hosting-cont-" + (i+1));
                      $(this).addClass("hosting-cont-" + i);
                    }else if(currentClass.indexOf("transfer-container") !== -1){
                      $(this).removeClass("transfer-cont-" + (i+1));
                      $(this).addClass("transfer-cont-" + i);
                    }
                  });

                  // Update localStorage
                  localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                  for(var j = 0; j < localStorageAllActivities.length; j++){

                    if(localStorageAllActivities[j].dayNumber === (i+1)){

                      localStorageAllActivities[j].dayNumber = i;
                    }
                  }

                  // Remove the old localStorage variable
                  localStorage.removeItem("localStorageAllActivities");
                  // Stringify object to pass in localStorage
                  localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                }
              }
            }

            /* ------------------------------ Click : Empty cart ------------------------------ */
            $("#empty-cart").click(function(){

                // Remove all activities
                $(".activities-container .activities").remove();

                if($(".activities-container > .default-message").length === 0){
                    $(".activities-container").append("<p class=\"default-message\">Aucune activité choisie</p>");
                }

                // Remove all hosting
                $(".hosting-container .hosting").remove();

                $(".hosting-container > p").show();
                $(".hosting-container > button").show();

                // Remove all transfer
                $(".transfer-container .transfer").remove();

                $(".transfer-container > p").show();
                $(".transfer-container > button").show();

                // Remove added days
                $(".trip-days > .trip-days-header > .btn-remove-day").click();

                // Empty the localStorageAllActivities
                localStorageAllActivities = [];
                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
            });

            /* -------------------------------- VALIDATE USER CART -------------------------------- */

            $("button#validate-cart").click(function(){

                var userIsAnonymous = $("#user-cart-user-not-logged-container").length;

                if(userIsAnonymous === 1){

                    userIsAnonymousCartValidation();
                }else{
                    userIsLoggedInCartValidation();
                }

            });

            /* User is anonymous */
            function userIsAnonymousCartValidation(){

                var resultCheckIfCartFieldsAreFilled = checkIfCartFieldsAreFilled();

                if(resultCheckIfCartFieldsAreFilled){
                    $("#user-cart-user-not-logged-container").show();
                }
            }

            $("button#user-not-logged-validate-cart").click(function(){

                var userFirstname = $("#user-cart-user-not-logged-container #user-cart-user-firstname > input").val();
                var userLastname = $("#user-cart-user-not-logged-container #user-cart-user-lastname > input").val();
                var userEmail = $("#user-cart-user-not-logged-container #user-cart-user-email > input").val();
                var userPhone = $("#user-cart-user-not-logged-container #user-cart-user-phone > input").val();
                var userApproval = $("#user-cart-user-not-logged-container #user-cart-user-approval > input").is(":checked");

                if(userFirstname === "" || userLastname === "" || userEmail === "" || userPhone === "" || userApproval === false) {

                    if(userFirstname === "" || userLastname === "" || userEmail === "" || userPhone === ""){

                        if($(".user-alert-datas-lack").length > 0){
                          $(".user-alert-datas-lack").remove();
                        }

                        var userAlertDatasLack = $("<p class='user-alert-datas-lack'>Veuillez renseigner tous les champs.</p>");
                        userAlertDatasLack.insertBefore($("#user-cart-user-not-logged-container #user-cart-user-datas-container"));
                    }else if(userApproval === false){

                        if($(".user-alert-datas-lack").length > 0){
                            $(".user-alert-datas-lack").remove();
                        }

                        var userAlertNeedApproval = $("<p class='user-alert-datas-lack'>Veuillez cocher la case.</p>");
                        userAlertNeedApproval.insertBefore($("#user-cart-user-not-logged-container #user-cart-user-datas-container"));
                    }else{

                        if($(".user-alert-datas-lack").length > 0){
                            $(".user-alert-datas-lack").remove();
                        }

                        var userAlertDatasLack = $("<p class='user-alert-datas-lack'>Veuillez renseigner toutes les informations.</p>");
                        userAlertDatasLack.insertBefore($("#user-cart-user-not-logged-container #user-cart-user-datas-container"));
                    }
                }else{

                    if($(".user-alert-datas-lack").length > 0){
                      $(".user-alert-datas-lack").remove();
                    }

                    ajaxSendQuotation(true);
                }
            });

            /* User is logged in */
            function userIsLoggedInCartValidation(){

                var resultCheckIfCartFieldsAreFilled = checkIfCartFieldsAreFilled();

                if(resultCheckIfCartFieldsAreFilled){

                    ajaxSendQuotation(false);
                }
            }

            function checkIfCartFieldsAreFilled(){

                var location = $("#cart-container > #devis > #location > input").val();
                //var date = $("#cart-container > #devis > #date > input").val();
                var departureDate = $("#cart-container > #devis > #departure-date > input").val();
                var returnDate = $("#cart-container > #devis > #return-date > input").val();
                var trip = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                //if(location === "" || date === "" || trip === null || trip.length === 0) {
                if(location === "" || departureDate === "" || returnDate === "" || trip === null || trip.length === 0) {

                    // Add alert missing informations
                    $("#cart-container").scrollTop(0);

                    if($("#cart-container > p.user-alert-datas-lack").length === 0){
                        var alertMissingInformations = $("<p class='user-alert-datas-lack'>Pour effectuer une demande de devis, merci de choisir des activités ainsi que de renseigner le \"Lieu de départ\", la \"Date de départ\" et la \"Date de retour\".</p>");
                        alertMissingInformations.insertAfter($("#cart-container > h1"));
                    }

                    return false;
                }else{

                    // Remove alert missing informations if exists
                    if($("#cart-container > .user-alert-datas-lack").length > 0){
                        $("#cart-container > .user-alert-datas-lack").remove();
                    }

                    return true;
                }
            }

            /* AJAX Send quotation */
            function ajaxSendQuotation(userIsAnonymous){

                var location = $("#cart-container > #devis > #location > input").val();
                //var date = $("#cart-container > #devis > #date > input").val();
                var departureDate = $("#cart-container > #devis > #departure-date > input").val();
                var returnDate = $("#cart-container > #devis > #return-date > input").val();
                var participants = $("#cart-container > #devis > #participants > input").val();
                var budget = $("#cart-container > #devis > #budget > select").val();
                var transport = $("#cart-container > #devis > #transport > select").val();
                var trip = JSON.parse(localStorage.getItem("localStorageAllActivities"));
                var wish = $("#cart-container > #devis > #wish > textarea").val();

                var userFirstname = $("#user-cart-user-not-logged-container #user-cart-user-firstname > input").val();
                var userLastname = $("#user-cart-user-not-logged-container #user-cart-user-lastname > input").val();
                var userEmail = $("#user-cart-user-not-logged-container #user-cart-user-email > input").val();
                var userPhone = $("#user-cart-user-not-logged-container #user-cart-user-phone > input").val();
                // var userApproval = $("#user-cart-user-not-logged-container #user-cart-user-approval > input").is(":checked");

                switch (budget) {
                    case "0" :
                        budget = "- de 100€";
                        break;
                    case "1" :
                        budget = "100-200€";
                        break;
                    case "2" :
                        budget = "200-300€";
                        break;
                    case "3" :
                        budget = "300-400€";
                        break;
                    case "4" :
                        budget = "400-500€";
                        break;
                    case "5" :
                        budget = "500-750€";
                        break;
                    case "6" :
                        budget = "750-1000€";
                        break;
                    case "7" :
                        budget = "1000-1500€";
                        break;
                    case "8" :
                        budget = "1500-2000€";
                        break;
                    case "9" :
                        budget = "+ de 2000€";
                        break;
                }

                switch (transport) {
                    case "0" :
                        transport = "Oui, j’en ai besoin";
                        break;
                    case "1" :
                        transport = "Non je voyage par mes propres moyens";
                        break;
                    case "2" :
                        transport = "Je ne sais pas encore";
                        break;
                }

                // console.log("location : " + location);
                // console.log("date : " + date);
                // console.log("participants : " + participants);
                // console.log("budget : " + budget);
                // console.log("transport : " + transport);
                // console.log("trip : " + trip);
                // console.log("wish : " + wish);
                // console.log("userFirstname : " + userFirstname);
                // console.log("userLastname : " + userLastname);
                // console.log("userEmail : " + userEmail);
                // console.log("userPhone : " + userPhone);

                var ajaxUrl = null;
                var urlPathnameDestinationPage = window.location.pathname.split("/destinations")[0];

                if(urlPathnameDestinationPage != null){
                  ajaxUrl = urlPathnameDestinationPage + "/ajax/cart/quotation";
                }else{
                  ajaxUrl = "/ajax/cart/quotation";
                }
                // Ajax
                $.ajax({
                    type: "POST",
                    url: ajaxUrl,
                    data: {
                        location: location,
                        //date: date,
                        departureDate: departureDate,
                        returnDate: returnDate,
                        participants: participants,
                        budget: budget,
                        transport: transport,
                        trip: trip,
                        wish: wish,
                        userFirstname: userFirstname,
                        userLastname: userLastname,
                        userEmail: userEmail,
                        userPhone: userPhone,
                        userIsAnonymous: userIsAnonymous,
                    },
                    beforeSend: function(){
                        $("body").append("<div id=\"send-quotation-loader\"><div class=\"lds-dual-ring\"></div></div>");
                    },
                    success: function (data) {

                        if(data["is_success"] === true){
                            //$("#cart-container button#empty-cart").click();
                        }

                        if( $("div#user-cart-user-not-logged-container").length > 0 ){

                            $("#user-cart-user-datas-container").hide();
                            $("#user-cart-user-not-logged-container > div").append("<p id=\"send-quotation-feedback\">" + data["result_sentence"] + "</p>");
                            // $("div#user-cart-user-not-logged-container").hide();
                        }else{

                            if($("#user-cart-user-logged-container").length >= 1){
                                $("#user-cart-user-logged-container").remove();
                            }

                            $("body").append(
                                "<div id=\"user-cart-user-logged-container\">" +
                                    "<div>" +
                                        "<h2>Demande d'informations</h2>" +
                                        "<p id=\"send-quotation-feedback\">" + data["result_sentence"] + "</p>" +
                                        "<button type=\"button\" id=\"user-logged-remove-overlay\"><i class=\"fa fa-times\" aria-hidden=\"true\"></i></button>" +
                                    "</div>" +
                                "</div>"
                            );

                            $("#user-cart-user-logged-container").show();
                        }
                    },
                    complete: function(){
                        $("#send-quotation-loader").remove();
                    }
                });
            }

            // $("button#user-not-logged-remove-overlay").click(function(){
            //     $("div#user-cart-user-not-logged-container").hide();
            // });
            $("body").on("click", "button#user-not-logged-remove-overlay", function() {
                $("div#user-cart-user-not-logged-container").hide();

                $("#send-quotation-feedback").remove();
                $("#user-cart-user-datas-container").show();
            });

            $("body").on("click", "button#user-logged-remove-overlay", function() {
                $("#user-cart-user-logged-container").remove();
            });

        }
    };
}(jQuery));
