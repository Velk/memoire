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
            
            $("body").css({
              "overflow-y": "scroll",
            });
          }else{
            $("div#memory-menu").show();

            $("body").css({
              "position": "relative",
              "overflow-y": "hidden",
            });
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

            if(!$("#activities-menu").is(":visible")){
              $("body").css("overflow-y", "scroll");
            }
          }
        });

        $("body").on("click", "#memory-menu-responsive-contact", function(){

          // Clickable phone text
          var phoneText = $("div#other-countries > div > p").text();
          var phoneTextWithoutSpace = phoneText.replace(/ /g, '');

          $("div#other-countries > div > p").remove();

          $("#other-countries > div").append(
            "<a href=\"tel:" + phoneTextWithoutSpace + "\">" +
              phoneText +
            "</a>"
          );
          var frPhoneText = $("div#default-country > p").text();
          var frPhoneTextWithoutSpace = frPhoneText.replace(/ /g, '');

          $("div#default-country > p").remove();

          $("#default-country").append(
            "<a href=\"tel:" + frPhoneTextWithoutSpace + "\">" +
            frPhoneText +
            "</a>"
          );

          $("#page").append(
            "<div id=\"memory-responsive-contact-page\">" +
              "<i class=\"fa fa-times\" aria-hidden=\"true\"></i>" +
              "<h2>Pour nous contacter</h2>" +
              "<div id=\"responsive-contact-us\"><p>Nous contacter par e-mail</p></div>" +
              "<p>Ou par téléphone</p>" +
              $("#phone-datas-container").get(0).outerHTML +
            "</div>"
          );
        });

        $("body").on("click", "#memory-responsive-contact-page > i", function() {
          $("#memory-responsive-contact-page").remove();
        });
        $("body").on("click", "#responsive-contact-us", function() {
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

          // $("#memory-remove-responsive-menu").hide();
          $("#activities-menu").show();
          $("#memory-act-tab-menu").append(
            "<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"remove-responsive-submenu-activities\"></i>"
          );

          $("body").css("overflow-y", "hidden");
        });

        $("body").on("click", "#remove-responsive-submenu-activities", function(){
          // $("#memory-remove-responsive-menu").show();
          $("#activities-menu").hide();
          $(this).remove();

          $("body").css("overflow-y", "scroll");
        });

        /* Set images at their right position and size */
        $(window).load(function() {

          /* Top destinations and Top activities */
          var taImgContainerWidth = $("#top-activities-grid > div").width();
          var taImgContainerHeight = $("#top-activities-grid > div").height();

          $("#top-activities-container").find("img.ta-img").each(function () {
            var imgClass = (this.width / this.height > (taImgContainerWidth/taImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });

          var tdImgContainerWidth = $("#top-destinations-grid > div").width();
          var tdImgContainerHeight = $("#top-destinations-grid > div").height();

          $("#top-destinations-container").find("img.td-img").each(function () {
            var imgClass = (this.width / this.height > (tdImgContainerWidth/tdImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });

          /* Page - Destinations */
          var destImgContainerWidth = $("#cont-head-img-container").width();
          var destImgContainerHeight = $("#cont-head-img-container").height();

          $("#cont-head-img-container").find("img.cont-head-img").each(function () {
            var imgClass = (this.width / this.height > (destImgContainerWidth/destImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });

          /* Page - Activity categories */
          var acImgContainerWidth = $("#act-cat-head-img-container").width();
          var acImgContainerHeight = $("#act-cat-head-img-container").height();

          $("#act-cat-head-img-container").find("img.act-cat-head-img").each(function () {
            var imgClass = (this.width / this.height > (acImgContainerWidth/acImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });

          /* Page - Intermediate page */
          var ipImgContainerWidth = $("#img-container").width();
          var ipImgContainerHeight = $("#img-container").height();

          $("#img-container").find("img").each(function () {
            var imgClass = (this.width / this.height > (ipImgContainerWidth/ipImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });

          /* Page - Activity page */
          var apImgContainerWidth = $("#activity-page-container #header-container").width();
          var apImgContainerHeight = $("#activity-page-container #header-container").height();

          $("#activity-page-container #header-container").find("img").each(function () {
            var imgClass = (this.width / this.height > (apImgContainerWidth/apImgContainerHeight)) ? "img-cover-tall" : "img-cover-wide";
            $(this).addClass(imgClass);
          });
        });
      }

      if($(window).width() <= 640){

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
