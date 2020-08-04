/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

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
