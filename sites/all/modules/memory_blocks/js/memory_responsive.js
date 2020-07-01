(function ($) {
  Drupal.behaviors.memory_responsive = {
    attach: function (context, settings) {

      if($(window).width() <= 1024){

        $("#memory-contact-link").insertAfter("#logo");

        // Add "Nous contacter" menu
        $("div#memory-menu > div:not(#activities-menu)").append(
          "<div class=\"memory-menu-tabs\">" +
              "<li class=\"toggle-user-cart\" id=\"menu-responsive-your-cart\">" +
                  "<i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i><p>Votre panier</p>" +
              "</li>" +
          "</div>"
        );

        // Add "Nous contacter" menu
        $("div#memory-menu > div:not(#activities-menu)").append(
          "<div class=\"memory-menu-tabs\">" +
            "<li id=\"memory-menu-responsive-contact\">" +
              "<i class=\"fa fa-phone\" aria-hidden=\"true\"></i><p>Nous contacter</p>" +
            "</li>" +
          "</div>"
        );
        $("div#memory-menu > div:not(#activities-menu)").prepend(
          "<div class=\"memory-menu-tabs\">" +
            "<li id=\"menu-responsive-home-page\">" +
              "<i class=\"fa fa-home\" aria-hidden=\"true\"></i><p>Page d'accueil</p>" +
            "</li>" +
          "</div>"
        );
        $("#memory-menu-tab-destination > a").prepend("<i class=\"fa fa-map-signs\" aria-hidden=\"true\"></i>");
        $("#memory-menu-tab-activity > a").prepend("<i class=\"fa fa-flag-checkered\" aria-hidden=\"true\"></i>");

        // Click on the burger menu
        $("#memory-menu-responsive > i").click(function(){

          $(".menu-contact-link").hide();

          if($("div#memory-menu").is(":visible")){
            $("div#memory-menu").hide();
            $("aside#qt-app-container").show(); // Show chatbot
          }else{
            $("div#memory-menu").show();
            $("aside#qt-app-container").hide(); // Hide chatbot
          }

          $("#destinations-menu").hide();
          $("#activities-menu").hide();
        });

        // Hide menu when click out the memory menu
        $("body").click(function(evt){

          if($("div#memory-menu").is(":visible")){

            if($(evt.target).closest("#memory-menu").length){return;}
            if($(evt.target).closest("#memory-menu > div").length){return;}
            if($(evt.target).closest("#memory-menu-responsive").length){return;}

            //Do processing of click event here for every element except with id menu_content
            $("div#memory-menu").hide();

            $("aside#qt-app-container").show(); // Show chatbot
          }
        });

        $("#page").on("click", "#menu-responsive-your-cart", function(){

          $("div#memory-menu").hide();
          $("div#cart-container > div").show();

          $("aside#qt-app-container").show(); // Show chatbot
        });

        $("#page").on("click", "#memory-menu-responsive-contact", function(){

          // Construct HTML for default phone
          var defaultPhoneText = $("div#default-country > p").text();
          var defaultPhoneTextWithoutSpace = defaultPhoneText.replace(/ /g, '');
          var defaultPhoneImage = $("div#default-country > img").get(1).outerHTML;
          var defaultPhoneHTML =
            "<div id=\"responsive-default-phone\">" +
              "<a href=\"tel:" + defaultPhoneTextWithoutSpace + "\">" +
                defaultPhoneImage +
                defaultPhoneText +
              "</a>" +
            "</div>"
          ;

          // Construct HTML for other phones
          var othersPhoneHTML =
            "<div id=\"responsive-others-phone\">" +
            "<p>(Autres pays : Voir les numéros)</p>" +
            "<div>"
          ;
          $("#other-countries > div").each(function(index, el){

            var otherPhoneText = $(el).find("p").text();
            var otherPhoneTextWithoutSpace = otherPhoneText.replace(/ /g, '');
            var otherPhoneImage = $(el).find("img").get(0).outerHTML;

            othersPhoneHTML +=
              "<a href=\"tel:" + otherPhoneTextWithoutSpace + "\">" +
                otherPhoneImage +
                otherPhoneText +
              "</a>"
            ;
          });
          othersPhoneHTML += "</div></div>";

          $("#page").append(
            "<div id=\"memory-responsive-contact-page\">" +
              "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
              "<h2>Nous contacter</h2>" +
              "<div>" +
                "<p>Par e-mail</p>" +
                "<button type=\"button\" id=\"responsive-contact-us\"><i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>Envoyer un e-mail</button>" +
              "</div>" +
              "<div>" +
                "<p>Par téléphone</p>" +
                  defaultPhoneHTML +
                  othersPhoneHTML +
              "</div>" +
            "</div>"
          );

          $("div#responsive-others-phone > p").click(function(){
            $("div#responsive-others-phone > div").toggle();
          });

          if($("#memory-responsive-contact-page").is(":visible")){ $("body").addClass("noscroll"); }

          // Remove user cart if visible
          if($("#cart-container > div").is(":visible")){
            $("div#cart-container .toggle-user-cart").click();
          }

          $("aside#qt-app-container").hide(); // Hide chatbot
        });

        $("#page").on("click", "#memory-responsive-contact-page > i", function() {
          $("#memory-responsive-contact-page").remove();
          if(!$("#memory-responsive-contact-page").is(":visible")){ $("body").removeClass("noscroll"); }

          $("aside#qt-app-container").show(); // Show chatbot
        });

        $("#page").on("click", "#responsive-contact-us", function() {
          window.location = $("#memory-contact-link").attr("href");
        });
        $("body").on("click", "#menu-responsive-home-page", function() {
          window.location = $("#logo").attr("href");
        });

        /* SubMenu - Activities */
        // $("#activities-menu").appendTo("#memory-menu");
        $("#activities-menu").appendTo("#page");

        $("#memory-menu-tab-activity > a").click(function(e){

          e.preventDefault();

          // Remove user cart if visible
          if($("#cart-container > div").is(":visible")){
            $("div#cart-container .toggle-user-cart").click();
          }

          $("#activities-menu").show();

          if($("#activities-menu").is(":visible")){ $("body").addClass("noscroll"); }

          $("#memory-act-tab-menu").append(
            "<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"remove-responsive-submenu-activities\"></i>"
          );

          $("aside#qt-app-container").hide(); // Hide chatbot
        });

        $("#activities-menu").on("click", "#remove-responsive-submenu-activities", function(){

          $("#activities-menu").hide();

          if(!$("#activities-menu").is(":visible")){ $("body").removeClass("noscroll"); }

          $(this).remove();

          $("aside#qt-app-container").show(); // Show chatbot
        });
      }

      if($(window).width() <= 640){


        $("#page").on("click", "#menu-responsive-your-cart", function(){

          $("aside#qt-app-container").hide(); // Hide chatbot
          
          if($("#responsive-remove-user-cart").length === 0){
            $("div#cart-container > div:not(#user-cart-captcha)").append("<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"responsive-remove-user-cart\"></i>");

            $("#responsive-remove-user-cart").click(function(){

              $("div#cart-container .toggle-user-cart").click();

              if($("#cart-container > div").is(":visible")){
                $("body").addClass("noscroll");
              }else{
                $("body").removeClass("noscroll");
              }

              $("aside#qt-app-container").show(); // Show chatbot
            });
          }

          if($("#cart-container > div").is(":visible")){
            $("body").addClass("noscroll");
          }else{
            $("body").removeClass("noscroll");
          }
        });

        /* Go to top page */
        $(document).scroll(function() {

          if ($(window).scrollTop() + $(window).height() >= ($(document).height() - 50)) {
            $("div#block-memory-blocks-memory-go-top-page").attr("style", "bottom: 65px !important");
          }else{
            $("div#block-memory-blocks-memory-go-top-page").attr("style", "bottom: 10px !important");
          }
        });
      }
    }
  };
}(jQuery));
