(function ($) {
  Drupal.behaviors.memory_responsive = {
    attach: function (context, settings) {

      if($(window).width() <= 640){

        $("#memory-contact-link").insertAfter("#logo");

        $("#memory-menu-responsive > i").click(function(){

          if($("div#memory-menu").is(":visible")){
            $("div#memory-menu").hide();
          }else{
            $("div#memory-menu").show();
          }

          $("#destinations-menu").hide();
          $("#activities-menu").hide();
          $("#responsive-user-cart-btn").hide();

          //$("body").css("overflow-y", "hidden");

          // $("#header").append(
          //   "<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"memory-remove-responsive-menu\"></i>"
          // );
        });

        // $("#header").on( "click", "#memory-remove-responsive-menu", function() {
        //
        //   $("div#memory-menu").hide();
        //   $("#responsive-user-cart-btn").show();
        //
        //   $("body").css("overflow-y", "scroll");
        //
        //   $(this).remove();
        // });

        /* SubMenu - Destinations */
        //$("#destinations-menu").appendTo("#memory-menu");

        // $("#memory-menu-tab-destination > a").click(function(e){
        //   e.preventDefault();
        //
        //   $("#memory-remove-responsive-menu").hide();
        //   $("#memory-dest-tab-menu").append(
        //     "<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"remove-responsive-submenu-destinations\"></i>"
        //   );
        //   $("#destinations-menu").show();
        // });

        // $("#header").on("click", "#remove-responsive-submenu-destinations", function(){
        //   $("#memory-remove-responsive-menu").show();
        //   $("#destinations-menu").hide();
        //   $(this).remove();
        // });

        /* SubMenu - Activities */
        $("#activities-menu").appendTo("#memory-menu");

        $("#memory-menu-tab-activity > a").click(function(e){
          e.preventDefault();

          // $("#memory-remove-responsive-menu").hide();
          $("#activities-menu").show();
          $("#memory-act-tab-menu").append(
            "<i class=\"fa fa-times\" aria-hidden=\"true\" id=\"remove-responsive-submenu-activities\"></i>"
          );
        });

        $("#header").on("click", "#remove-responsive-submenu-activities", function(){
          // $("#memory-remove-responsive-menu").show();
          $("#activities-menu").hide();
          $(this).remove();
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

        /* User cart */
        if($("#cart-container").length > 0){

          if($("#responsive-user-cart-btn").length === 0){
            $("body").append(
              "<div id=\"responsive-user-cart-btn\"><i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i></div>"
            );
          }
        }

        $("body").on("click", "#responsive-user-cart-btn", function(){

          if($("div#block-memory-cart-memory-cart").is(":visible")){
            $("div#block-memory-cart-memory-cart").hide();
          }else{
            $("div#block-memory-cart-memory-cart").show();
          }
        });

        /* Go to top page */
        $( window ).scroll(function() {

          var pageHeight = $(document).height() - $(window).height();
          if ($(window).scrollTop() === pageHeight) {
            $("div#block-memory-blocks-memory-go-top-page").attr('style', 'bottom: 65px !important');
          }else{
            $("div#block-memory-blocks-memory-go-top-page").attr('style', 'bottom: 10px !important');
          }
        });
      }
    }
  };
}(jQuery));
