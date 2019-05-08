(function ($) {
    Drupal.behaviors.memory_cart = {
        attach: function (context, settings) {

            // Array to stock all activities intended to setItem in the localStorage
            var localStorageAllActivities = [];
            //localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

            function addLocalStorageElementToCart(i){

                // Add activity to cart
                $("#trip .trip-days-details > .activities-container.act-cont-" + localStorageAllActivities[i].dayNumber).append(
                    "<div class=\"activities\">" +
                        "<div class=\"positioning-btn\">" +
                            "<button type=\"button\" class=\"btn-go-up\">" +
                                "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                            "</button>" +
                            "<button type=\"button\" class=\"btn-go-down\">" +
                                "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                            "</button>" +
                        "</div>" +
                        "<input type=\"hidden\" value=\"" + localStorageAllActivities[i].nid + "\">" +
                        "<div class=\"activities-img-container\">" +
                            "<img src=\"" + localStorageAllActivities[i].image + "\">" +
                        "</div>" +
                        "<p>" + localStorageAllActivities[i].title + "</p>" +
                        "<button type=\"button\" class=\"btn-remove-activity\">" +
                            "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                        "</button>" +
                    "</div>"
                );
            }

            /* Retrieve and set to the user cart all activities stocked into localStorage*/
            $( document ).ready(function() {

                var docReadyLocalStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                if(docReadyLocalStorageAllActivities != null){

                    for(var i=0; i < docReadyLocalStorageAllActivities.length; i++){

                        if(docReadyLocalStorageAllActivities[i].activityType === "activities"){

                            // Add new day if it doesn't exist
                            if($("#trip .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).length === 0){

                                var dayNumberToSet = docReadyLocalStorageAllActivities[i].dayNumber;

                                var hostingCategory = $(".hosting-container > button").attr("class").split("-")[1];
                                var transferCategory = $(".transfer-container > button").attr("class").split("-")[1];

                                $("#trip").append(
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
                                        "<div class=\"transfer-container transfer-cont-" + dayNumberToSet + "\">" +
                                            "<p>Aucun transfert</p>" +
                                            "<button type=\"button\" class=\"filter-" + transferCategory + "\">VOIR TRANSFERTS</button>" +
                                        "</div>" +
                                        "</div>" +
                                    "</div>"
                                );
                            }

                            // Remove default message
                            $("#trip .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > p.default-message").remove();

                            // Add activity to cart(type activity)
                            $("#trip .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).append(
                                "<div class=\"activities\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }else if(docReadyLocalStorageAllActivities[i].activityType === "hosting"){

                            // Remove default informations
                            $("#trip .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > p").hide();
                            $("#trip .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > button").hide();

                            // Add activity to cart(type hosting)
                            $("#trip .trip-days-details > .hosting-container.hosting-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).append(
                                "<div class=\"hosting\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                        "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                        "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }else if(docReadyLocalStorageAllActivities[i].activityType === "transfer"){

                            // Remove default informations
                            $("#trip .trip-days-details > .transfer-container.transfer-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > p").hide();
                            $("#trip .trip-days-details > .transfer-container.transfer-cont-" + docReadyLocalStorageAllActivities[i].dayNumber + " > button").hide();

                            // Add activity to cart(type transfer)
                            $("#trip .trip-days-details > .transfer-container.transfer-cont-" + docReadyLocalStorageAllActivities[i].dayNumber).append(
                                "<div class=\"transfer\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input type=\"hidden\" value=\"" + docReadyLocalStorageAllActivities[i].nid + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + docReadyLocalStorageAllActivities[i].image + "\">" +
                                    "</div>" +
                                    "<p>" + docReadyLocalStorageAllActivities[i].title + "</p>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );
                        }
                    }

                    // Position every activities (type activity) added to the user cart at their right place
                    for(var j = 0; j < docReadyLocalStorageAllActivities.length; j++){

                        $("#trip .trip-days-details > .activities-container.act-cont-" + docReadyLocalStorageAllActivities[j].dayNumber + " > .activities").each(function(){

                            if(
                              $(this).index() !== docReadyLocalStorageAllActivities[j].positionInDay &&
                              $(this).children("input[type=\"hidden\"]").val() === docReadyLocalStorageAllActivities[j].nid
                            ){
                                // console.log("EXPECTED : " + docReadyLocalStorageAllActivities[i].title);
                                // console.log("EXPECTED : " + docReadyLocalStorageAllActivities[i].positionInDay);
                                // console.log("CURRENT : " + $(this).children("p").text());
                                // console.log("CURRENT : " + $(this).index());

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
                $("#block-memory-cart-memory-cart").css("width", 0);
                $("#icon-plus").css("display", "block");
                $("#icon-minus").css("display", "none");
                $("#block-memory-cart-memory-cart").css("box-shadow", "none");
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

                    $("div#activity-page-container").css("width", "100%");
                    $("div#block-memory-blocks-memory-switch-activities").css("width", "100%");
                }else if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");

                    $("div#activity-page-container").css("width", "calc(100% - 400px)");
                    $("div#block-memory-blocks-memory-switch-activities").css("width", "calc(100% - 400px)");
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
            function addANewDay(){

                var nbCurrentDays = $(".trip-days").length;
                var dayNumberToSet = nbCurrentDays + 1;

                var hostingCategory = $(".hosting-container > button").attr("class").split("-")[1];
                var transferCategory = $(".transfer-container > button").attr("class").split("-")[1];

                $("#trip").append(
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
                        "<div class=\"transfer-container transfer-cont-" + dayNumberToSet + "\">" +
                            "<p>Aucun transfert</p>" +
                            "<button type=\"button\" class=\"filter-" + transferCategory + "\">VOIR TRANSFERTS</button>" +
                        "</div>" +
                        "</div>" +
                    "</div>"
                );
            }

            /* Add activity to cart */
            $(".cont-add-cart").click(function(){

                var actFilterCategory = null;
                var actNid = null;
                var actTitle = null;
                var ajaxUrl = null;

                if($("#cart-container").attr("class") === "destination-page"){

                  // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
                  actFilterCategory = $(this).parent().children(".cont-act-cat").val();

                  actNid = $(this).parent().children(".cont-act-nid").val();
                  actTitle = $(this).parent().children(".cont-stick-title").text();

                  var urlPathnameDestinationPage = window.location.pathname.split("/destinations")[0];

                  if(urlPathnameDestinationPage != null){
                    ajaxUrl = urlPathnameDestinationPage + "/destinations/ajax/cart";
                  }else{
                    ajaxUrl = "/destinations/ajax/cart";
                  }
                }else if($("#cart-container").attr("class") === "activity-page"){

                    // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
                    actFilterCategory = $(this).parent().children(".activity-category").val();

                    actNid = $(this).parent().children(".activity-nid").val();
                    actTitle = $(this).parent().children(".activity-title").val();

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
                            var positionInDay = $(".act-cont-" + dayNumber + " input[value='" + data.nid + "']").parent(".activities").index();

                            if(activityType === "activities"){
                                if(positionInDay === 1 && $(".act-cont-" + dayNumber + " > .activities").length === 1){
                                    positionInDay = 0;
                                }
                            }else{
                                positionInDay = 0;
                            }

                            // Add activity datas in object
                            objActivityDatas.dayNumber = dayNumber;
                            objActivityDatas.positionInDay = positionInDay;
                            objActivityDatas.activityType = activityType;
                            objActivityDatas.nid = data.nid;
                            objActivityDatas.title = data.title;
                            objActivityDatas.image = data.image;

                            // var localStorageAllActivitiesLength = Object.keys(localStorageAllActivities).length;

                            localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities")) || [];
                            // Add activity datas object in global localStorage object with incrementing index
                            // localStorageAllActivities[localStorageAllActivitiesLength] = objActivityDatas;
                            localStorageAllActivities.push(objActivityDatas);

                            // Stringify object to pass in localStorage
                            localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                            // var storedNames = JSON.parse(localStorage.getItem("localStorageAllActivities"));
                        }

                        /* Function intended to add an activity to the cart interface */
                        function addActivityToCart(dayNumber){

                            // Add activity to cart
                            $("#trip .trip-days-details > .activities-container.act-cont-" + dayNumber).append(
                                "<div class=\"activities\">" +
                                    "<div class=\"positioning-btn\">" +
                                        "<button type=\"button\" class=\"btn-go-up\">" +
                                            "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                        "<button type=\"button\" class=\"btn-go-down\">" +
                                            "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                        "</button>" +
                                    "</div>" +
                                    "<input type=\"hidden\" value=\"" + data.nid + "\">" +
                                    "<div class=\"activities-img-container\">" +
                                        "<img src=\"" + data.image + "\">" +
                                    "</div>" +
                                    "<p>" + data.title + "</p>" +
                                    "<button type=\"button\" class=\"btn-remove-activity\">" +
                                        "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                    "</button>" +
                                "</div>"
                            );

                            // Call addLocalStorage() function - Parameter : day number
                            addLocalStorage(dayNumber, "activities");
                        }

                        /* Function intended to check if an activity is already set inside a day */
                        function checkIfActivityIsAlreadyInTheDay(dayNumber){

                            var isActivityAlreadySet = null;

                            $(".act-cont-" + dayNumber + " .activities input[type=hidden]").each(function(){

                                if($(this).val() === data.nid){

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

                            $("." + nameActivity + "-container").each(function(){

                                if( $(this).children("." + nameActivity).length >= 1 ){

                                    isNameActivityIsFull = (isNameActivityIsFull === false) ? false : true;
                                }else{

                                    isNameActivityIsFull = false;
                                }
                            });

                            if(isNameActivityIsFull){

                                // Call addANewDat() intended to add a new day
                                addANewDay();
                            }else{

                                var nbHostingContainer = $("." + nameActivity + "-container").length;

                                for(var i = 1; i <= nbHostingContainer ; i++){

                                    $("." + nameActivity + "-cont-" + i + " > p").hide();
                                    $("." + nameActivity + "-cont-" + i + " > button").hide();

                                    // Get the number of activities added to this day
                                    var nbHostingInDay = $("." + nameActivity + "-cont-" + i + " ." + nameActivity).length;

                                    if(nbHostingInDay === 0){

                                        $("." + nameActivity + "-cont-" + i).append(
                                            "<div class=\"" + nameActivity + "\">" +
                                                "<div class=\"positioning-btn\">" +
                                                    "<button type=\"button\" class=\"btn-go-up\">" +
                                                        "<i class=\"fa fa-chevron-up\" aria-hidden=\"true\"></i>" +
                                                    "</button>" +
                                                    "<button type=\"button\" class=\"btn-go-down\">" +
                                                        "<i class=\"fa fa-chevron-down\" aria-hidden=\"true\"></i>" +
                                                    "</button>" +
                                                "</div>" +
                                                "<input type=\"hidden\" value=\"" + data.nid + "\">" +
                                                "<div class=\"activities-img-container\">" +
                                                    "<img src=\"" + data.image + "\">" +
                                                "</div>" +
                                                "<p>" + data.title + "</p>" +
                                                "<button type=\"button\" class=\"btn-remove-activity\">" +
                                                    "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
                                                "</button>" +
                                            "</div>"
                                        );

                                        // Call addLocalStorage() function - Parameter : day number
                                        addLocalStorage(i, nameActivity);

                                        break;
                                    }
                                }
                            }
                        }

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

                            $(".activities-container").each(function(){

                                if( $(this).children(".activities").length >= 6 ){

                                    isActivityIsFull = (isActivityIsFull === false) ? false : true;
                                }else{

                                    isActivityIsFull = false;
                                }
                            });

                            if(isActivityIsFull){

                              // Call addANewDat() intended to add a new day
                              addANewDay();
                            }else{

                                var activityIsInAllDays = null;

                                // Retrieve the number of days currently displayed for user cart
                                var nbDays =  $(".activities-container").length;

                                for(var i = 1; i <= nbDays ; i++){

                                    // Get the number of activities added to this day
                                    var nbActivitiesInDay = $(".act-cont-" + i + " .activities").length;

                                    if(nbActivitiesInDay < 6){

                                        // Retrieve return value from the function intended to check if an activity is already set in the day
                                        var isActivityAlreadySet = checkIfActivityIsAlreadyInTheDay(i);

                                        // If the activity is not set in the day, set it.
                                        if( !isActivityAlreadySet ){

                                            activityIsInAllDays = false;

                                            // Call addActivityToCart()
                                            addActivityToCart(i);

                                            /* Remove the default message if exists */
                                            if( $(".act-cont-" + i + " .default-message").length >= 1 ){
                                                $(".act-cont-" + i + " .default-message").remove();
                                            }

                                            break;
                                        }else{

                                            activityIsInAllDays = (activityIsInAllDays === false) ? false : true;
                                        }
                                    }
                                }

                                if(activityIsInAllDays) {

                                    // Call addANewDat() intended to add a new day
                                    addANewDay();
                                }
                            }
                        }
                    }
                });

            });

            /* Function intended to remove localStorage activity datas when user remove an activity in his cart */
            function removeLocalStorage(nidToRemove, dayNumberToRemove, activityTypeToRemove){

                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                for(var i = 0; i < localStorageAllActivities.length; i++){

                    if(
                        localStorageAllActivities[i].dayNumber == dayNumberToRemove &&
                        localStorageAllActivities[i].nid == nidToRemove &&
                        localStorageAllActivities[i].activityType == activityTypeToRemove
                    ){

                        //localStorage.removeItem(localStorageAllActivities[i]);
                        localStorageAllActivities.splice(i, 1);
                    }
                }

                // Update localStorage "positionInDay" value
                if(activityTypeToRemove === "activities"){
                    var indexActivityToRemove = $(".act-cont-" + dayNumberToRemove + " > .activities > input[value='" + nidToRemove + "']").parent(".activities").index();

                    for(var j = 0; j < localStorageAllActivities.length; j++){

                        if(
                            localStorageAllActivities[j].dayNumber == dayNumberToRemove &&
                            localStorageAllActivities[j].activityType == activityTypeToRemove &&
                            localStorageAllActivities[j].positionInDay > indexActivityToRemove
                        ){
                            localStorageAllActivities[j].positionInDay = parseInt(localStorageAllActivities[j].positionInDay) - 1;
                        }
                    }
                }

                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
                // Stringify object to pass in localStorage
                localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
            }

            /* Function intended to update days position and datas stocked into localStorage */
            function updateDaysPosition(currentElement){

              // Retrieve the current days number starting from 1
              var currentDaysNumber = $(".trip-days").length;
              // Retrieve the index position of the current day to remove starting from 0
              var dayContainer = $(currentElement).parent().parent(".trip-days").index();

              if(currentDaysNumber > dayContainer + 1){
                // Would mean there is days after the current day to remove

                for(var i = (dayContainer + 1) ; i < currentDaysNumber; i++){

                  $(".trip-days").eq(i).children(".trip-days-header").children("p").text("Journée n° " + i);

                  // Change class
                  $(".trip-days").eq(i).children(".trip-days-details").children("div").each(function(){

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

            /* ------------------------------ Click : Removing day ------------------------------ */
            $("body #trip").on("click", ".trip-days .btn-remove-day", function() {

                /* Activities container */
                var activitiesContainer = $(this).parent().parent().children(".trip-days-details").children("div");
                var classList = activitiesContainer.attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("-cont-") + 6);

                activitiesContainer.children("div").each(function(){
                    var nidToRemove = $(this).children("input[type='hidden']").val();
                    var activityType = $(this).attr("class");

                    // Call removeLocalStorage() function
                    removeLocalStorage(nidToRemove, dayNumberToRemove, activityType);
                });

                updateDaysPosition(this);

                // Remove the activity
                $(this).parent().parent().remove();
            });

            /* ------------------------------ Click : Removing activity ------------------------------ */
            $("body #trip").on("click", ".activities .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".activities").children("input[type='hidden']").val();
                var classList = $(this).parent().parent().attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("act-cont-") + 9);

                // Call removeLocalStorage() function
                removeLocalStorage(nidToRemove, dayNumberToRemove, "activities");

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
            $("body #trip").on("click", ".hosting .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".hosting").children("input[type='hidden']").val();
                var classList = $(this).parent().parent().attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("hosting-cont-") + 13);

                // Call removeLocalStorage() function
                removeLocalStorage(nidToRemove, dayNumberToRemove, "hosting");

                /* ----- Update - User cart display ----- */

                $(this).parent().parent().children("p").show();
                $(this).parent().parent().children("button").show();

                // Remove the activity
                $(this).parent().remove();
            });

            /* ------------------------------ Click : Removing transfer ------------------------------ */
            $("body #trip").on("click", ".transfer .btn-remove-activity", function() {

                /* ----- Update - LocalStorage ----- */

                // Retrieve the removing activity nid
                var nidToRemove = $(this).parent(".transfer").children("input[type='hidden']").val();
                var classList = $(this).parent().parent().attr("class");
                var dayNumberToRemove = classList.substr(classList.indexOf("transfer-cont-") + 14);

                // Call removeLocalStorage() function
                removeLocalStorage(nidToRemove, dayNumberToRemove, "transfer");

                /* ----- Update - User cart display ----- */

                $(this).parent().parent().children("p").show();
                $(this).parent().parent().children("button").show();

                // Remove the activity
                $(this).parent().remove();
            });

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
            $("body #trip").on("click", ".hosting-container > button", function() {

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
            $("body #trip").on("click", ".transfer-container > button", function() {

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

            /* ------------------------------ Click : Activities positionning (type : activities) ------------------------------ */
            $("body #trip").on("click", ".activities .btn-go-up", function() {

                // Retrieve the clicked activity (type : activity)
                var activityContainer = $(this).parent().parent(".activities");
                // Retrieve the nid of the clicked activity (type : activity)
                var activityNid = $(this).parent().parent(".activities").children("input[type='hidden']").val();
                // Retrieve the clicked activities container (type : activity)
                var activitiesContainer = $(this).parent().parent(".activities").parent(".activities-container");
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("act-cont-") + 9));

                if(
                    activityContainer.index() === 0 &&
                    dayNumber > 1
                ){
                    /* Change activity position between days */

                    var dayIsFullOfActivities = false;
                    var activityIsInPreviousDay = false;

                    if($(".act-cont-" + (dayNumber - 1) + " > .activities").length === 6){
                        dayIsFullOfActivities = true;
                    }

                    $(".act-cont-" + (dayNumber - 1) + " > .activities").each(function(){

                        // Check if the activity (activityNid) is already set in the previous day
                        if($(this).children("input[type='hidden']").val() === activityNid){
                            activityIsInPreviousDay = true;
                        }
                    });

                    if(!dayIsFullOfActivities && !activityIsInPreviousDay){

                        // If the day is not full and the activity is not already in the day

                        // Clone the current clicked activity and add it at the end of the previous day
                        activityContainer.clone().appendTo(".act-cont-" + (dayNumber - 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var i = 0; i < localStorageAllActivities.length; i++){

                          if(
                            localStorageAllActivities[i].dayNumber == dayNumber &&
                            localStorageAllActivities[i].activityType == "activities"
                          ){

                            if(localStorageAllActivities[i].nid == activityNid){
                              // Update activity position in the new day (previous day)
                              localStorageAllActivities[i].dayNumber = (dayNumber - 1);
                              localStorageAllActivities[i].positionInDay = ($(".act-cont-" + (dayNumber - 1) + " > .activities").length) - 1;
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
                        if($(".act-cont-" + (dayNumber - 1) + " > .activities").length === 1){
                            if( $(".act-cont-" + (dayNumber - 1) + " > .default-message").length >= 1 ){
                                $(".act-cont-" + (dayNumber - 1) + " > .default-message").remove();
                            }
                        }

                        // Add the default message if doesn't exist
                        if($(".act-cont-" + dayNumber + " > .activities").length === 0){
                            if( $(".act-cont-" + dayNumber + " > .default-message").length === 0 ){
                                $(".act-cont-" + dayNumber).append("<p class=\"default-message\">Aucune activité choisie</p>");
                            }
                        }

                    }else if(dayIsFullOfActivities && !activityIsInPreviousDay){

                        // if the day is full and the activity is not already in the day

                        // Get the last activity of the prior day
                        var lastActivityPriorDay = $(".act-cont-" + (dayNumber - 1) + " > .activities").eq($(".act-cont-" + (dayNumber - 1) + " > .activities").length - 1);

                        // Clone the last activity in the previous day and add it to the current day where the activity is clicked
                        lastActivityPriorDay.clone().prependTo(".act-cont-" + dayNumber);
                        lastActivityPriorDay.remove();

                        // Clone the current clicked activity and add it at the end of the previous day
                        activityContainer.clone().appendTo(".act-cont-" + (dayNumber - 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var j = 0; j < localStorageAllActivities.length; j++){

                          // Update the position of the last activity located in the previous day
                          if(
                              localStorageAllActivities[j].dayNumber == (dayNumber - 1) &&
                              localStorageAllActivities[j].activityType == "activities" &&
                              localStorageAllActivities[j].positionInDay == ($(".act-cont-" + (dayNumber - 1) + " > .activities").length - 1) &&
                              localStorageAllActivities[j].nid == lastActivityPriorDay.children("input[type=\"hidden\"]").val()
                          ){
                              localStorageAllActivities[j].dayNumber = dayNumber;
                              localStorageAllActivities[j].positionInDay = 0;
                          }

                          // Update the position of the activity located in the current day
                          if(
                              localStorageAllActivities[j].dayNumber == dayNumber &&
                              localStorageAllActivities[j].activityType == "activities" &&
                              localStorageAllActivities[j].positionInDay == 0 &&
                              localStorageAllActivities[j].nid == activityNid
                          ){
                              localStorageAllActivities[j].dayNumber = (dayNumber - 1);
                              localStorageAllActivities[j].positionInDay = ($(".act-cont-" + (dayNumber - 1) + " > .activities").length - 1);
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
                            localStorageAllActivities[k].nid == activityNid
                        ){
                            localStorageAllActivities[k].positionInDay = (activityContainerIndex - 1);
                        }

                        if(
                            localStorageAllActivities[k].dayNumber == dayNumber &&
                            localStorageAllActivities[k].activityType == "activities" &&
                            localStorageAllActivities[k].nid != activityNid &&
                            localStorageAllActivities[k].positionInDay == (activityContainerIndex - 1)
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

            $("body #trip").on("click", ".activities .btn-go-down", function() {

                // Retrieve the clicked activity (type : activity)
                var activityContainer = $(this).parent().parent(".activities");
                // Retrieve the nid of the clicked activity (type : activity)
                var activityNid = $(this).parent().parent(".activities").children("input[type='hidden']").val();
                // Retrieve the clicked activities container (type : activity)
                var activitiesContainer = $(this).parent().parent(".activities").parent(".activities-container");
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("act-cont-") + 9));
                // Retrieve the total number of days in the user cart
                var totalDaysNumber = $(".trip-days").length;

                if(
                    activityContainer.index() === (activitiesContainer.children(".activities").length - 1) &&
                    dayNumber < totalDaysNumber
                ){
                    /* Change activity position between days */

                    var dayIsFullOfActivities = false;
                    var activityIsInNextDay = false;

                    if($(".act-cont-" + (dayNumber + 1) + " > .activities").length === 6){
                        dayIsFullOfActivities = true;
                    }

                    $(".act-cont-" + (dayNumber + 1) + " > .activities").each(function(){

                        // Check if the activity (activityNid) is already set in the next day
                        if($(this).children("input[type='hidden']").val() === activityNid){
                          activityIsInNextDay = true;
                        }
                    });

                    if(!dayIsFullOfActivities && !activityIsInNextDay){

                        // If the day is not full and the activity is not already in the day

                        // Clone the current clicked activity and add it at the beginning of the next day
                        activityContainer.clone().prependTo(".act-cont-" + (dayNumber + 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var i = 0; i < localStorageAllActivities.length; i++){

                          if(
                            localStorageAllActivities[i].dayNumber == dayNumber &&
                            localStorageAllActivities[i].activityType == "activities"
                          ){

                            if(localStorageAllActivities[i].nid == activityNid){
                              // Update activity position in the new day (next day)
                              localStorageAllActivities[i].dayNumber = (dayNumber + 1);
                              localStorageAllActivities[i].positionInDay = 0;
                              // localStorageAllActivities[i].positionInDay = ($(".act-cont-" + (dayNumber - 1) + " > .activities").length) - 1;
                            }
                          }

                          if(
                            localStorageAllActivities[i].dayNumber == (dayNumber + 1) &&
                            localStorageAllActivities[i].activityType == "activities" &&
                            localStorageAllActivities[i].nid != activityNid
                          ){
                            localStorageAllActivities[i].positionInDay = parseInt(localStorageAllActivities[i].positionInDay) + 1;
                          }
                        }

                        // Remove the old localStorage variable
                        localStorage.removeItem("localStorageAllActivities");
                        // Stringify object to pass in localStorage
                        localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                        // Remove the default message if exists
                        if($(".act-cont-" + (dayNumber + 1) + " > .activities").length === 1){
                          if( $(".act-cont-" + (dayNumber + 1) + " > .default-message").length >= 1 ){
                            $(".act-cont-" + (dayNumber + 1) + " > .default-message").remove();
                          }
                        }

                        // Add the default message if doesn't exist
                        if($(".act-cont-" + dayNumber + " > .activities").length === 0){
                          if( $(".act-cont-" + dayNumber + " > .default-message").length === 0 ){
                            $(".act-cont-" + dayNumber).append("<p class=\"default-message\">Aucune activité choisie</p>");
                          }
                        }

                    }else if(dayIsFullOfActivities && !activityIsInNextDay){

                        // if the day is full and the activity is not already in the day

                        // Get the last activity of the next day
                        var lastActivityNextDay = $(".act-cont-" + (dayNumber + 1) + " > .activities").eq(0);

                        // Clone the last activity in the next day and add it to the current day where the activity is clicked
                        lastActivityNextDay.clone().appendTo(".act-cont-" + dayNumber);
                        lastActivityNextDay.remove();

                        // Clone the current clicked activity and add it at the beginning of the next day
                        activityContainer.clone().prependTo(".act-cont-" + (dayNumber + 1));
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
                            localStorageAllActivities[j].nid == lastActivityNextDay.children("input[type=\"hidden\"]").val()
                          ){
                            localStorageAllActivities[j].dayNumber = dayNumber;
                            localStorageAllActivities[j].positionInDay = ($(".act-cont-" + dayNumber + " > .activities").length - 1);
                          }

                          // Update the position of the activity located in the current day
                          if(
                            localStorageAllActivities[j].dayNumber == dayNumber &&
                            localStorageAllActivities[j].activityType == "activities" &&
                            localStorageAllActivities[j].positionInDay == ($(".act-cont-" + dayNumber + " > .activities").length - 1) &&
                            localStorageAllActivities[j].nid == activityNid
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
                        localStorageAllActivities[k].nid == activityNid
                      ){
                        localStorageAllActivities[k].positionInDay = (activityContainerIndex + 1);
                      }

                      if(
                        localStorageAllActivities[k].dayNumber == dayNumber &&
                        localStorageAllActivities[k].activityType == "activities" &&
                        localStorageAllActivities[k].nid != activityNid &&
                        localStorageAllActivities[k].positionInDay == (activityContainerIndex + 1)
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

            /* ------------------------------ Click : Activities positionning (type : hosting) ------------------------------ */
            $("body #trip").on("click", ".hosting .btn-go-up", function() {

                // Retrieve the clicked activity (type : hosting & transfer)
                var activityContainer = $(this).parent().parent(".hosting");
                // Retrieve the nid of the clicked activity (type : hosting & transfer)
                var activityNid = $(this).parent().parent(".hosting").children("input[type='hidden']").val();
                // Retrieve the clicked activities container (type : hosting & transfer)
                var activitiesContainer = $(this).parent().parent(".hosting").parent(".hosting-container");
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("hosting-cont-") + 13));

                if(
                    activityContainer.index() === 2 &&
                    dayNumber > 1
                ){

                    /* Change activity position between days */

                    var dayIsFullOfActivities = false;
                    var activityIsInPreviousDay = false;

                    if($(".hosting-cont-" + (dayNumber - 1) + " > .hosting").length === 1){
                        dayIsFullOfActivities = true;
                    }

                    $(".hosting-cont-" + (dayNumber - 1) + " > .hosting").each(function(){

                        // Check if the activity (activityNid) is already set in the previous day
                        if($(this).children("input[type='hidden']").val() === activityNid){
                            activityIsInPreviousDay = true;
                        }
                    });

                    if(!dayIsFullOfActivities && !activityIsInPreviousDay){

                        // If the day is not full and the activity is not already in the day

                        // Clone the current clicked activity and add it at the end of the previous day
                        activityContainer.clone().appendTo(".hosting-cont-" + (dayNumber - 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var i = 0; i < localStorageAllActivities.length; i++){

                            if(
                                localStorageAllActivities[i].dayNumber == dayNumber &&
                                localStorageAllActivities[i].activityType == "hosting"
                            ){

                                if(localStorageAllActivities[i].nid == activityNid){
                                    // Update activity position in the new day (previous day)
                                    localStorageAllActivities[i].dayNumber = (dayNumber - 1);
                                    localStorageAllActivities[i].positionInDay = 0;
                                }
                            }
                        }

                        // Remove the old localStorage variable
                        localStorage.removeItem("localStorageAllActivities");
                        // Stringify object to pass in localStorage
                        localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                        // Show the basics information for previous day having hosting activity
                        $(".hosting-cont-" + (dayNumber - 1) + " > p").hide();
                        $(".hosting-cont-" + (dayNumber - 1) + " > button").hide();

                        // Show the basics information for day not having hosting activity
                        $(".hosting-cont-" + dayNumber + " > p").show();
                        $(".hosting-cont-" + dayNumber + " > button").show();

                    }else if(dayIsFullOfActivities && !activityIsInPreviousDay){

                        // if the day is full and the activity is not already in the day

                        // Get the last activity of the prior day
                        var lastActivityPriorDay = $(".hosting-cont-" + (dayNumber - 1) + " > .hosting").eq($(".hosting-cont-" + (dayNumber - 1) + " > .hosting").length - 1);

                        // Clone the last activity in the previous day and add it to the current day where the activity is clicked
                        lastActivityPriorDay.clone().appendTo(".hosting-cont-" + dayNumber);
                        lastActivityPriorDay.remove();

                        // Clone the current clicked activity and add it at the end of the previous day
                        activityContainer.clone().appendTo(".hosting-cont-" + (dayNumber - 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var j = 0; j < localStorageAllActivities.length; j++){

                            // Update the position of the last activity located in the previous day
                            if(
                                localStorageAllActivities[j].dayNumber == (dayNumber - 1) &&
                                localStorageAllActivities[j].activityType == "hosting" &&
                                localStorageAllActivities[j].nid == lastActivityPriorDay.children("input[type=\"hidden\"]").val()
                            ){
                                localStorageAllActivities[j].dayNumber = dayNumber;
                                localStorageAllActivities[j].positionInDay = 0;
                            }

                            // Update the position of the activity located in the current day
                            if(
                                localStorageAllActivities[j].dayNumber == dayNumber &&
                                localStorageAllActivities[j].activityType == "hosting" &&
                                localStorageAllActivities[j].nid == activityNid
                            ){
                                localStorageAllActivities[j].dayNumber = (dayNumber - 1);
                                localStorageAllActivities[j].positionInDay = 0;
                            }
                        }

                        // Remove the old localStorage variable
                        localStorage.removeItem("localStorageAllActivities");
                        // Stringify object to pass in localStorage
                        localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
                    }
                }
            });

            $("body #trip").on("click", ".hosting .btn-go-down", function() {

                // Retrieve the clicked activity (type : hosting)
                var activityContainer = $(this).parent().parent(".hosting");
                // Retrieve the nid of the clicked activity (type : hosting)
                var activityNid = $(this).parent().parent(".hosting").children("input[type='hidden']").val();
                // Retrieve the clicked activities container (type : hosting)
                var activitiesContainer = $(this).parent().parent(".hosting").parent(".hosting-container");
                // Retrieve the day number of the current clicked activity
                var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("hosting-cont-") + 13));
                // Retrieve the total number of days in the user cart
                var totalDaysNumber = $(".trip-days").length;

                if(
                    activityContainer.index() === 2 &&
                    dayNumber < totalDaysNumber
                ){
                    /* Change activity position between days */

                    var dayIsFullOfActivities = false;
                    var activityIsInNextDay = false;

                    if($(".hosting-cont-" + (dayNumber + 1) + " > .hosting").length === 1){
                      dayIsFullOfActivities = true;
                    }

                    $(".hosting-cont-" + (dayNumber + 1) + " > .hosting").each(function(){

                      // Check if the activity (activityNid) is already set in the next day
                      if($(this).children("input[type='hidden']").val() === activityNid){
                        activityIsInNextDay = true;
                      }
                    });

                    if(!dayIsFullOfActivities && !activityIsInNextDay){

                        // If the day is not full and the activity is not already in the day

                        // Clone the current clicked activity and add it at the beginning of the next day
                        activityContainer.clone().appendTo(".hosting-cont-" + (dayNumber + 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var i = 0; i < localStorageAllActivities.length; i++){

                            if(
                                localStorageAllActivities[i].dayNumber == dayNumber &&
                                localStorageAllActivities[i].activityType == "hosting"
                            ){

                                if(localStorageAllActivities[i].nid == activityNid){
                                    // Update activity position in the new day (previous day)
                                    localStorageAllActivities[i].dayNumber = (dayNumber + 1);
                                    localStorageAllActivities[i].positionInDay = 0;
                                }
                            }
                        }

                        // Remove the old localStorage variable
                        localStorage.removeItem("localStorageAllActivities");
                        // Stringify object to pass in localStorage
                        localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                        // Show the basics information for previous day having hosting activity
                        $(".hosting-cont-" + (dayNumber + 1) + " > p").hide();
                        $(".hosting-cont-" + (dayNumber + 1) + " > button").hide();

                        // Show the basics information for day not having hosting activity
                        $(".hosting-cont-" + dayNumber + " > p").show();
                        $(".hosting-cont-" + dayNumber + " > button").show();

                    }else if(dayIsFullOfActivities && !activityIsInNextDay){

                        // if the day is full and the activity is not already in the day

                        // Get the last activity of the next day
                        var lastActivityNextDay = $(".hosting-cont-" + (dayNumber + 1) + " > .hosting").eq(0);

                        // Clone the last activity in the next day and add it to the current day where the activity is clicked
                        lastActivityNextDay.clone().appendTo(".hosting-cont-" + dayNumber);
                        lastActivityNextDay.remove();

                        // Clone the current clicked activity and add it at the beginning of the next day
                        activityContainer.clone().appendTo(".hosting-cont-" + (dayNumber + 1));
                        activityContainer.remove();

                        /* Update localStorage "positionInDay" value */
                        localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                        // Update activities position
                        for(var j = 0; j < localStorageAllActivities.length; j++){

                            // Update the position of the last activity located in the previous day
                            if(
                                localStorageAllActivities[j].dayNumber == (dayNumber + 1) &&
                                localStorageAllActivities[j].activityType == "hosting" &&
                                localStorageAllActivities[j].nid == lastActivityNextDay.children("input[type=\"hidden\"]").val()
                            ){
                                localStorageAllActivities[j].dayNumber = dayNumber;
                                localStorageAllActivities[j].positionInDay = 0;
                            }

                            // Update the position of the activity located in the current day
                            if(
                                localStorageAllActivities[j].dayNumber == dayNumber &&
                                localStorageAllActivities[j].activityType == "hosting" &&
                                localStorageAllActivities[j].nid == activityNid
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
                }
            });

          /* ------------------------------ Click : Activities positionning (type : transfer) ------------------------------ */
          $("body #trip").on("click", ".transfer .btn-go-up", function() {

            // Retrieve the clicked activity (type : transfer)
            var activityContainer = $(this).parent().parent(".transfer");
            // Retrieve the nid of the clicked activity (type : transfer)
            var activityNid = $(this).parent().parent(".transfer").children("input[type='hidden']").val();
            // Retrieve the clicked activities container (type : transfer)
            var activitiesContainer = $(this).parent().parent(".transfer").parent(".transfer-container");
            // Retrieve the day number of the current clicked activity
            var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("transfer-cont-") + 14));

            if(
              activityContainer.index() === 2 &&
              dayNumber > 1
            ){

              /* Change activity position between days */

              var dayIsFullOfActivities = false;
              var activityIsInPreviousDay = false;

              if($(".transfer-cont-" + (dayNumber - 1) + " > .transfer").length === 1){
                dayIsFullOfActivities = true;
              }

              $(".transfer-cont-" + (dayNumber - 1) + " > .transfer").each(function(){

                // Check if the activity (activityNid) is already set in the previous day
                if($(this).children("input[type='hidden']").val() === activityNid){
                  activityIsInPreviousDay = true;
                }
              });

              if(!dayIsFullOfActivities && !activityIsInPreviousDay){

                // If the day is not full and the activity is not already in the day

                // Clone the current clicked activity and add it at the end of the previous day
                activityContainer.clone().appendTo(".transfer-cont-" + (dayNumber - 1));
                activityContainer.remove();

                /* Update localStorage "positionInDay" value */
                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                // Update activities position
                for(var i = 0; i < localStorageAllActivities.length; i++){

                  if(
                    localStorageAllActivities[i].dayNumber == dayNumber &&
                    localStorageAllActivities[i].activityType == "transfer"
                  ){

                    if(localStorageAllActivities[i].nid == activityNid){
                      // Update activity position in the new day (previous day)
                      localStorageAllActivities[i].dayNumber = (dayNumber - 1);
                      localStorageAllActivities[i].positionInDay = 0;
                    }
                  }
                }

                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
                // Stringify object to pass in localStorage
                localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                // Show the basics information for previous day having transfer activity
                $(".transfer-cont-" + (dayNumber - 1) + " > p").hide();
                $(".transfer-cont-" + (dayNumber - 1) + " > button").hide();

                // Show the basics information for day not having transfer activity
                $(".transfer-cont-" + dayNumber + " > p").show();
                $(".transfer-cont-" + dayNumber + " > button").show();

              }else if(dayIsFullOfActivities && !activityIsInPreviousDay){

                // if the day is full and the activity is not already in the day

                // Get the last activity of the prior day
                var lastActivityPriorDay = $(".transfer-cont-" + (dayNumber - 1) + " > .transfer").eq($(".transfer-cont-" + (dayNumber - 1) + " > .transfer").length - 1);

                // Clone the last activity in the previous day and add it to the current day where the activity is clicked
                lastActivityPriorDay.clone().appendTo(".transfer-cont-" + dayNumber);
                lastActivityPriorDay.remove();

                // Clone the current clicked activity and add it at the end of the previous day
                activityContainer.clone().appendTo(".transfer-cont-" + (dayNumber - 1));
                activityContainer.remove();

                /* Update localStorage "positionInDay" value */
                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                // Update activities position
                for(var j = 0; j < localStorageAllActivities.length; j++){

                  // Update the position of the last activity located in the previous day
                  if(
                    localStorageAllActivities[j].dayNumber == (dayNumber - 1) &&
                    localStorageAllActivities[j].activityType == "transfer" &&
                    localStorageAllActivities[j].nid == lastActivityPriorDay.children("input[type=\"hidden\"]").val()
                  ){
                    localStorageAllActivities[j].dayNumber = dayNumber;
                    localStorageAllActivities[j].positionInDay = 0;
                  }

                  // Update the position of the activity located in the current day
                  if(
                    localStorageAllActivities[j].dayNumber == dayNumber &&
                    localStorageAllActivities[j].activityType == "transfer" &&
                    localStorageAllActivities[j].nid == activityNid
                  ){
                    localStorageAllActivities[j].dayNumber = (dayNumber - 1);
                    localStorageAllActivities[j].positionInDay = 0;
                  }
                }

                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
                // Stringify object to pass in localStorage
                localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));
              }
            }
          });

          $("body #trip").on("click", ".transfer .btn-go-down", function() {

            // Retrieve the clicked activity (type : transfer)
            var activityContainer = $(this).parent().parent(".transfer");
            // Retrieve the nid of the clicked activity (type : transfer)
            var activityNid = $(this).parent().parent(".transfer").children("input[type='hidden']").val();
            // Retrieve the clicked activities container (type : transfer)
            var activitiesContainer = $(this).parent().parent(".transfer").parent(".transfer-container");
            // Retrieve the day number of the current clicked activity
            var dayNumber = parseInt(activitiesContainer.attr("class").substr(activitiesContainer.attr("class").indexOf("transfer-cont-") + 14));
            // Retrieve the total number of days in the user cart
            var totalDaysNumber = $(".trip-days").length;

            if(
              activityContainer.index() === 2 &&
              dayNumber < totalDaysNumber
            ){
              /* Change activity position between days */

              var dayIsFullOfActivities = false;
              var activityIsInNextDay = false;

              if($(".transfer-cont-" + (dayNumber + 1) + " > .transfer").length === 1){
                dayIsFullOfActivities = true;
              }

              $(".transfer-cont-" + (dayNumber + 1) + " > .transfer").each(function(){

                // Check if the activity (activityNid) is already set in the next day
                if($(this).children("input[type='hidden']").val() === activityNid){
                  activityIsInNextDay = true;
                }
              });

              if(!dayIsFullOfActivities && !activityIsInNextDay){

                // If the day is not full and the activity is not already in the day

                // Clone the current clicked activity and add it at the beginning of the next day
                activityContainer.clone().appendTo(".transfer-cont-" + (dayNumber + 1));
                activityContainer.remove();

                /* Update localStorage "positionInDay" value */
                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                // Update activities position
                for(var i = 0; i < localStorageAllActivities.length; i++){

                  if(
                    localStorageAllActivities[i].dayNumber == dayNumber &&
                    localStorageAllActivities[i].activityType == "transfer"
                  ){

                    if(localStorageAllActivities[i].nid == activityNid){
                      // Update activity position in the new day (previous day)
                      localStorageAllActivities[i].dayNumber = (dayNumber + 1);
                      localStorageAllActivities[i].positionInDay = 0;
                    }
                  }
                }

                // Remove the old localStorage variable
                localStorage.removeItem("localStorageAllActivities");
                // Stringify object to pass in localStorage
                localStorage.setItem("localStorageAllActivities", JSON.stringify(localStorageAllActivities));

                // Show the basics information for previous day having transfer activity
                $(".transfer-cont-" + (dayNumber + 1) + " > p").hide();
                $(".transfer-cont-" + (dayNumber + 1) + " > button").hide();

                // Show the basics information for day not having transfer activity
                $(".transfer-cont-" + dayNumber + " > p").show();
                $(".transfer-cont-" + dayNumber + " > button").show();

              }else if(dayIsFullOfActivities && !activityIsInNextDay){

                // if the day is full and the activity is not already in the day

                // Get the last activity of the next day
                var lastActivityNextDay = $(".transfer-cont-" + (dayNumber + 1) + " > .transfer").eq(0);

                // Clone the last activity in the next day and add it to the current day where the activity is clicked
                lastActivityNextDay.clone().appendTo(".transfer-cont-" + dayNumber);
                lastActivityNextDay.remove();

                // Clone the current clicked activity and add it at the beginning of the next day
                activityContainer.clone().appendTo(".transfer-cont-" + (dayNumber + 1));
                activityContainer.remove();

                /* Update localStorage "positionInDay" value */
                localStorageAllActivities = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                // Update activities position
                for(var j = 0; j < localStorageAllActivities.length; j++){

                  // Update the position of the last activity located in the previous day
                  if(
                    localStorageAllActivities[j].dayNumber == (dayNumber + 1) &&
                    localStorageAllActivities[j].activityType == "transfer" &&
                    localStorageAllActivities[j].nid == lastActivityNextDay.children("input[type=\"hidden\"]").val()
                  ){
                    localStorageAllActivities[j].dayNumber = dayNumber;
                    localStorageAllActivities[j].positionInDay = 0;
                  }

                  // Update the position of the activity located in the current day
                  if(
                    localStorageAllActivities[j].dayNumber == dayNumber &&
                    localStorageAllActivities[j].activityType == "transfer" &&
                    localStorageAllActivities[j].nid == activityNid
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
            }
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
                var date = $("#cart-container > #devis > #date > input").val();
                var trip = JSON.parse(localStorage.getItem("localStorageAllActivities"));

                if(location === "" || date === "" || trip === null || trip.length === 0) {

                    // Add alert missing informations
                    $("#cart-container").scrollTop(0);

                    if($("#cart-container > p.user-alert-datas-lack").length === 0){
                        var alertMissingInformations = $("<p class='user-alert-datas-lack'>Pour effectuer une demande de devis, merci de choisir des activités ainsi que de renseigner le \"Lieu de départ\" et la \"Date\".</p>");
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
                var date = $("#cart-container > #devis > #date > input").val();
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
                        budget = "100-250€";
                        break;
                    case "2" :
                        budget = "250€-500€";
                        break;
                    case "3" :
                        budget = "500-750€";
                        break;
                    case "4" :
                        budget = "750€-1000€";
                        break;
                    case "5" :
                        budget = "1000-1500€";
                        break;
                    case "6" :
                        budget = "1500-2000€";
                        break;
                    case "7" :
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
                        date: date,
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
                    success: function (data) {

                        if(data["is_success"] === true){
                            $("#cart-container button#empty-cart").click();
                        }

                        if( $("div#user-cart-user-not-logged-container").length > 0 ){
                            $("div#user-cart-user-not-logged-container").hide();
                        }

                        // Alert result message
                        alert(data["result_sentence"]);
                    }
                });
            }

            $("button#user-not-logged-remove-overlay").click(function(){
                $("div#user-cart-user-not-logged-container").hide();
            })

        }
    };
}(jQuery));
