/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        /* Set the image on the entire size of its container depending on the container width greater than the image width or not */
        $(".cont-scop").each(function(){

            $(this).children("img.cont-vign-img").load(function(){

                var divContainerWidth = $(this).parent().width();
                var imgWidth = $(this).width();

                if( imgWidth < divContainerWidth ){

                    $(this).css({
                        "width": "100%",
                        "height": "auto",
                    });
                }
            });
        });

        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        /* ---------------------------------------------------------- Filters ----------------------------------------------------------------------------- */
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */

        /* Dynamic size of filters menu */
        var filtersNbTab = $(".cont-filter").length;
        var filtersTabSize = (100/filtersNbTab);

        $("#cont-filters").css("grid-template-columns", "repeat(" + filtersNbTab + ", " + filtersTabSize + "%)");

        /* Dynamic menu display */
        if( filtersNbTab === 1 ){
            $("#cont-filters").hide();
        }

        /* Filters for destinations page */
        $(".cont-filter").click(function(){

           var selectedSection = $(this).children("p").text();

           if( selectedSection === "Toutes nos Activités" ){

               $("#cont-main .cont-container").css("display", "block");
           }else{

               $("#cont-main .cont-container").each(function(){

                   var section = $(this).children("h2").text();

                   if( selectedSection === section ){
                       $(this).show();
                   }else{
                       $(this).hide();
                   }
               });
           }
        });

        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        /* ---------------------------------------------------- SCROLL and HIGHLIGHT ACTIVITY ------------------------------------------------------------------------ */
        /* ------------------------------------------------------------------------------------------------------------------------------------------------ */
        // This function allow to remove the hash from the URL without reloading the page
        function removeHash () {
          var scrollV, scrollH, loc = window.location;

          if ("pushState" in history)
            history.pushState("", document.title, loc.pathname + loc.search);
          else {
            // Prevent scrolling by storing the page's current scroll offset
            scrollV = document.body.scrollTop;
            scrollH = document.body.scrollLeft;

            loc.hash = "";

            // Restore the scroll offset, should be flicker free
            document.body.scrollTop = scrollV;
            document.body.scrollLeft = scrollH;
          }
        }

        if(window.location.hash){

          var isTimeOut = false;
          var urlHashDecode = decodeURIComponent(window.location.hash);
          var activityOffsetTop = $(urlHashDecode).offset().top;
          var menuHeight = $("#header-wrapper").height();

          $("html, body").stop().animate(
            { scrollTop: activityOffsetTop - menuHeight },
            2000,
            function() {
              $(window.location.hash).css("border", "4px solid #ff8f00");

              setTimeout( function(){ isTimeOut = true; }, 5000 );
            }
          );

          // If user scroll and the time out of 5 seconds is over, so remove highlight and hash in URL
          $(window).scroll(function () {
            if(isTimeOut){
              $(window.location.hash).css("border", "");
              removeHash();
            }
          });
        }
    });
})(jQuery);
