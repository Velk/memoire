(function ($) {
    Drupal.behaviors.memory_blocks_menu = {
        attach: function (context, settings) {

            /* Scroll - Resize header menu */
            var sliderHeight = $("#slider-container").height();
            var windowHeight = $(window).height();

            // Set basic social networks position
            $("div#block-memory-blocks-social-networks").css("top", "calc(80px + " + sliderHeight + "px/2)");

            // Change display when user scroll down
            $( window ).scroll(function() {

                // Remove this behavior under tablet responsive mode
                if($(window).width() > 1024) {

                    if ($(window).scrollTop() > 0) {

                        $("div#header").css("height", "60px");
                        $("#logo > img").css("height", "50px");
                        $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "5px 30px");
                        $("div#page").css("margin-top", "60px");

                        $("div##activities-menu").css("top", "60px");
                        $("div##destinations-menu").css("top", "60px");

                        var topValueScroll = 60 / 2 + windowHeight / 2;
                        $("div#block-memory-blocks-social-networks").stop().animate({
                            top: topValueScroll + "px",
                        });
                    }

                    if ($(window).scrollTop() === 0) {

                        $("div#header").css("height", "80px");
                        $("#logo > img").css("height", "70px");
                        $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "10px 30px");
                        $("div#page").css("margin-top", "80px");

                        $("div##activities-menu").css("top", "80px");
                        $("div##destinations-menu").css("top", "80px");

                        var topValue = 80 + sliderHeight / 2;
                        $("div#block-memory-blocks-social-networks").stop().animate({
                            top: topValue + "px",
                        });
                    }
                }
            });

            // function setDistanceTabMenu(tabID){
            //
            //     if( $(tabID).is(":visible") ){
            //
            //         if( $("#admin-menu").is(":visible") ) {
            //
            //             var adminToolbarHeight = $("#admin-menu").height();
            //
            //             if($(window).scrollTop() > 0){
            //
            //                 $(tabID).css("top", "calc(60px + " + adminToolbarHeight + "px)");
            //             }
            //             if($(window).scrollTop() === 0) {
            //
            //                 $(tabID).css("top", "calc(80px + " + adminToolbarHeight + "px)");
            //             }
            //         }else{
            //
            //             if($(window).scrollTop() > 0){
            //
            //                 $(tabID).css("top", "60px");
            //             }
            //             if($(window).scrollTop() === 0){
            //
            //                 $(tabID).css("top", "80px");
            //             }
            //         }
            //     }
            // }
            //
            // setInterval(function(){
            //     setDistanceTabMenu("#destinations-menu");
            //     setDistanceTabMenu("#activities-menu");
            // }, 100);

            /* ------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------- Admin menu ---------------------------------------------------- */
            /* ------------------------------------------------------------------------------------------------------------- */

            var adminToolbarVisibility = setInterval(setPageDistance, 100);

            // Set the page (menu and rest of the page) to the bottom of the admin toolbar
            function setPageDistance(){

                if( $("#admin-menu").is(":visible") ){

                    var adminToolbarHeight = $("#admin-menu").height();

                    $("#header-wrapper").css("margin-top", adminToolbarHeight);

                    var menuHeight = $("#header-wrapper").height();

                    $("#page").css("margin-top", (menuHeight + adminToolbarHeight));

                    clearInterval(adminToolbarVisibility);
                }
            }

            // Check if the screen width changed
            var tempMenuWidth;

            setInterval(function(){

                if( $("#admin-menu").is(":visible") ){

                    var menuWidth = $("#admin-menu").width();

                    // If the last width is set and if the last width is different than the current width (that's to say the width change)
                    if( tempMenuWidth !== null && tempMenuWidth !== menuWidth ){

                        // Call setPageDistance()
                        setPageDistance();
                    }

                    tempMenuWidth = $("#admin-menu").width();
                }
            }, 500);

            $(window).scroll(function(){

                if( $("#admin-menu").is(":visible") ){

                    var adminMenuHeight = $("#admin-menu").height();
                    var menuHeight = $("#header-wrapper").height();

                    $("#page").css("margin-top", (menuHeight + adminMenuHeight));
                }
            });

        }
    };
}(jQuery));
