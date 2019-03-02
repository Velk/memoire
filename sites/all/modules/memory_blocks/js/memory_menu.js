(function ($) {
    Drupal.behaviors.memory_blocks_menu = {
        attach: function (context, settings) {

            /* Scroll - Resize header menu */
            var sliderHeight = $("#slider-container").height();
            var windowHeight = $(window).height();

            // Set basic social networks position
            $("div#block-memory-blocks-social-networks").css("top", "calc(80px + " + sliderHeight + "px/2)");

            $( window ).scroll(function() {

                if($(window).scrollTop() > 0){

                    $("#logo > img").css("height", "50px");
                    // $("#menu-bar-wrapper").css("padding", "10px 0");
                    $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "5px 30px");
                    // $( "a:contains('Connexion')" ).parent("li").css("transform", "translateY(-13px)");
                    $("div#page").css("margin-top", "60px");
                    $(".memory-menu-tabs").css("line-height", "60px");
                    // $("div#page").css("margin-top", "calc(60px + 34px)");
                    // $("div#block-memory-blocks-social-networks").css("top", "calc(60px/2 + " + windowHeight + "px/2)");
                    var topValueScroll = 60/2 + windowHeight/2;
                    $("div#block-memory-blocks-social-networks").stop().animate({
                        top: topValueScroll + "px",
                    });
                }
                if($(window).scrollTop() === 0){

                    $("#logo > img").css("height", "70px");
                    // $("#menu-bar-wrapper").css("padding", "15px 0");
                    $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "10px 30px");
                    // $( "a:contains('Connexion')" ).parent("li").css("transform", "translateY(-15px)");
                    $("div#page").css("margin-top", "80px");
                    $(".memory-menu-tabs").css("line-height", "80px");
                    // $("div#page").css("margin-top", "calc(80px + 34px)");
                    // $("div#block-memory-blocks-social-networks").css("top", "calc(80px + " + sliderHeight + "px/2)");
                    var topValue = 80 + sliderHeight/2;
                    $("div#block-memory-blocks-social-networks").stop().animate({
                        top: topValue + "px",
                    });
                }

            });

            function setDistanceTabMenu(tabID){

                if( $(tabID).is(":visible") ){

                    if( $("#admin-menu").is(":visible") ) {

                        var adminToolbarHeight = $("#admin-menu").height();

                        if($(window).scrollTop() > 0){

                            $(tabID).css("top", "calc(60px + " + adminToolbarHeight + "px)");
                        }
                        if($(window).scrollTop() === 0) {

                            $(tabID).css("top", "calc(80px + " + adminToolbarHeight + "px)");
                        }
                    }else{

                        if($(window).scrollTop() > 0){

                            $(tabID).css("top", "60px");
                        }
                        if($(window).scrollTop() === 0){

                            $(tabID).css("top", "80px");
                        }
                    }
                }
            }

            setInterval(function(){
                setDistanceTabMenu("#destinations-menu");
                setDistanceTabMenu("#activities-menu");
            }, 100);

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