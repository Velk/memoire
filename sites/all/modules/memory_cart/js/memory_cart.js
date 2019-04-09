(function ($) {
    Drupal.behaviors.memory_cart = {
        attach: function (context, settings) {

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
                }else if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");
                }
            });

            /* Show user cart when user click on cart thumbnail */
            $(".cont-add-cart").click(function(){

                if($("#block-memory-cart-memory-cart").width() === 0){

                    $("#block-memory-cart-memory-cart").css("width", "400px");
                    $("#icon-plus").css("display", "none");
                    $("#icon-minus").css("display", "block");
                    $("#block-memory-cart-memory-cart").css("box-shadow", "-1px 0px 5px #bababa");
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
                    '<div class="trip-days">' +
                        '<div class="trip-days-header">' +
                            '<i class="fa fa-calendar-o" aria-hidden="true"></i>' +
                            '<p>Journée n° ' + dayNumberToSet + '</p>' +
                        '</div>' +
                        '<div class="trip-days-details">' +
                            '<div class="activities-container act-cont-' + dayNumberToSet + '">' +
                            '<p class="default-message">Aucune activité choisie</p>' +
                        '</div>' +
                        '<div class="hosting-container hosting-cont-' + dayNumberToSet + '">' +
                            '<p>Aucun hébergement</p>' +
                            '<button type="button" class="filter-' + hostingCategory + '">VOIR HEBERGEMENTS</button>' +
                        '</div>' +
                        '<div class="transfer-container transfer-cont-' + dayNumberToSet + '">' +
                            '<p>Aucun transfert</p>' +
                            '<button type="button" class="filter-' + transferCategory + '">VOIR TRANSFERTS</button>' +
                        '</div>' +
                        '</div>' +
                    '</div>'
                );
            }

            /* Add activity to cart */
            $(".cont-add-cart").click(function(){

                // Get the filter category NID to set the activity at the right place (Activity, transfer or hosting)
                var actFilterCategory = $(this).parent().children(".cont-act-cat").val();

                var actNid = $(this).parent().children(".cont-act-nid").val();
                var actTitle = $(this).parent().children(".cont-stick-title").text();

                var urlPathname = window.location.pathname.split("/destinations")[0];
                var ajaxUrl = null;

                if(urlPathname != null){
                    ajaxUrl = urlPathname + "/destinations/ajax/cart";
                }else{
                    ajaxUrl = "/destinations/ajax/cart";
                }

                // Ajax
                $.ajax({
                    type: 'POST',
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
                        
                        /* Function intended to add an activity to the cart interface */
                        function addActivityToCart(dayNumber){

                            // Add activity to cart
                            $("#trip .trip-days-details > .activities-container.act-cont-" + dayNumber).append(
                                '<div class="activities">' +
                                    '<div class="positioning-btn">' +
                                        '<button type="button" class="btn-go-up">' +
                                            '<i class="fa fa-chevron-up" aria-hidden="true"></i>' +
                                        '</button>' +
                                        '<button type="button" class="btn-go-down">' +
                                            '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                        '</button>' +
                                    '</div>' +
                                    '<input type="hidden" value="' + data["nid"] + '">' +
                                    '<div class="activities-img-container">' +
                                        '<img src="' + data["image"] + '">' +
                                    '</div>' +
                                    '<p>' + data["title"] + '</p>' +
                                    '<button type="button" class="btn-remove-activity">' +
                                        '<i class="fa fa-times" aria-hidden="true"></i>' +
                                    '</button>' +
                                '</div>'
                            );
                        }

                        /* Function intended to check if an activity is already set inside a day */
                        function checkIfActivityIsAlreadyInTheDay(dayNumber){

                            var isActivityAlreadySet = null;

                            $(".act-cont-" + dayNumber + " .activities input[type=hidden]").each(function(){

                                if($(this).val() == data["nid"]){

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

                                    isNameActivityIsFull = (isNameActivityIsFull == false) ? false : true;
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
                                            '<div class="' + nameActivity + '">' +
                                                '<div class="positioning-btn">' +
                                                    '<button type="button" class="btn-go-up">' +
                                                        '<i class="fa fa-chevron-up" aria-hidden="true"></i>' +
                                                    '</button>' +
                                                    '<button type="button" class="btn-go-down">' +
                                                        '<i class="fa fa-chevron-down" aria-hidden="true"></i>' +
                                                    '</button>' +
                                                '</div>' +
                                                '<input type="hidden" value="' + data["nid"] + '">' +
                                                '<div class="activities-img-container">' +
                                                    '<img src="' + data["image"] + '">' +
                                                '</div>' +
                                                '<p>' + data["title"] + '</p>' +
                                                '<button type="button" class="btn-remove-activity">' +
                                                    '<i class="fa fa-times" aria-hidden="true"></i>' +
                                                '</button>' +
                                            '</div>'
                                        );

                                        break;
                                    }
                                }
                            }
                        }

                        // Get Hosting filter category NID
                        var hostingFilterCatNID = $(".hosting-container > button").attr("class").split("-")[1];

                        // Get Transfer filter category NID
                        var transferFilterCatNID = $(".transfer-container > button").attr("class").split("-")[1];

                        if(actFilterCategory === hostingFilterCatNID){ // If the activity clicked is a hosting activity

                            var nameActivityCategory = "hosting";
                            addHostingOrTransfer(nameActivityCategory);

                        }else if(actFilterCategory === transferFilterCatNID){ // If the activity clicked is a transfer activity

                            var nameActivityCategory = "transfer";
                            addHostingOrTransfer(nameActivityCategory);

                        }else{ // If the activity clicked is an activity

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

                                        // Call addActivityToCart()
                                        addActivityToCart(i);

                                        /* Remove the default message if exists */
                                        if( $(".act-cont-" + i + " .default-message").length >= 1 ){
                                            $(".act-cont-" + i + " .default-message").remove();
                                        }

                                        break;
                                    }

                                }
                            }
                        }

                    }
                });

            });

            /* ------------------------------ Click : Removing activity ------------------------------ */
            $("body #trip").on("click", ".activities .btn-remove-activity", function() {

                /* Set the default message if it doesn't exist and if there is no activities in the activity container */
                if(
                    $(this).parent().parent().children(".default-message").length === 0 &&
                    $(this).parent().parent().children().length === 1
                ){

                    $(this).parent().parent().append('<p class="default-message">Aucune activité choisie</p>');
                }

                // Remove the activity
                $(this).parent().remove();
            });

            /* ------------------------------ Click : Removing hosting ------------------------------ */
            $("body #trip").on("click", ".hosting .btn-remove-activity", function() {

                $(this).parent().parent().children("p").show();
                $(this).parent().parent().children("button").show();

                // Remove the activity
                $(this).parent().remove();
            });

            /* ------------------------------ Click : Removing transfer ------------------------------ */
            $("body #trip").on("click", ".transfer .btn-remove-activity", function() {

                $(this).parent().parent().children("p").show();
                $(this).parent().parent().children("button").show();

                // Remove the activity
                $(this).parent().remove();
            });

            /* ------------------------------ Click : Filters displaying ------------------------------ */
            $(".hosting-container > button").click(function(){

                // Check if there is a filter called "Hébergements"
                if($('.cont-filter:contains("Hébergements")').length >= 1){
                    $('.cont-filter:contains("Hébergements")').click();
                }else{
                    $('.hosting-container > button').remove();
                    $('.hosting-container > p').text("Aucun hébergement n'est disponible.");
                }
            });
            $("body #trip").on("click", ".hosting-container > button", function() {

                // Check if there is a filter called "Hébergements"
                if($('.cont-filter:contains("Hébergements")').length >= 1){
                    $('.cont-filter:contains("Hébergements")').click();
                }else{
                    $('.hosting-container > button').remove();
                    $('.hosting-container > p').text("Aucun hébergement n'est disponible.");
                }
            });

            $(".transfer-container > button").click(function(){

                // Check if there is a filter called "Transferts"
                if($('.cont-filter:contains("Transferts")').length >= 1){
                    $('.cont-filter:contains("Transferts")').click();
                }else{
                    $('.transfer-container > button').remove();
                    $('.transfer-container > p').text("Aucun transfert n'est disponible.");
                }
            });
            $("body #trip").on("click", ".transfer-container > button", function() {

                // Check if there is a filter called "Transferts"
                if($('.cont-filter:contains("Transferts")').length >= 1){
                    $('.cont-filter:contains("Transferts")').click();
                }else{
                    $('.transfer-container > button').remove();
                    $('.transfer-container > p').text("Aucun transfert n'est disponible.");
                }
            });

        }
    };
}(jQuery));