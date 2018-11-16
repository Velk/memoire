/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        // var header_top = $("#header-top-wrapper");
        // var header_top_button = $("#header-wrapper a.accordion").addClass("active");
        // var header = $("#header-wrapper");
        // var clickToShow = true;
        //
        // header_top_button.removeClass("active");
        //
        //
        // header_top_button.click(function(e){
        //     e.preventDefault();
        //     var heightToReach = "+="+ header_top.height();
        //
        //     header_top.slideToggle(600);
        //     if(clickToShow){
        //
        //         header_top_button.addClass("active");
        //
        //         header.animate({
        //             top: heightToReach
        //         }, 650);
        //
        //         clickToShow = false;
        //     }else{
        //
        //         header_top_button.removeClass("active");
        //
        //         header.animate({
        //             top: "0"
        //         }, 600);
        //
        //         clickToShow = true;
        //     }
        // });

        $( "a:contains('Connexion')" ).parent("li").css({
            "position": "absolute",
            "right": "0",
            "transform": "translateY(-15px)",
        });
        $( "a:contains('Connexion')" ).prepend('<i class="fa fa-sign-in" aria-hidden="true"></i>');
        $( "a:contains('Connexion')" ).children("i").css({
            "display": "block",
            "text-align": "center",
            "margin-bottom": "5px",
            "font-size": "20px",
        });


        /* Scroll - Resize header menu */
        var sliderHeight = $("#slider-container").height();
        var windowHeight = $(window).height();

        // Set basic social networks position
        $("div#block-memory-blocks-social-networks").css("top", "calc(80px + " + sliderHeight + "px/2)");

        $( window ).scroll(function() {

            if($(window).scrollTop() > 0){

                $("#logo > img").css("height", "50px");
                $("#menu-bar-wrapper").css("padding", "10px 0");
                $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "5px 30px");
                $( "a:contains('Connexion')" ).parent("li").css("transform", "translateY(-13px)");
                $("div#page").css("margin-top", "60px");
                // $("div#page").css("margin-top", "calc(60px + 34px)");
                // $("div#block-memory-blocks-social-networks").css("top", "calc(60px/2 + " + windowHeight + "px/2)");
                var topValueScroll = 60/2 + windowHeight/2;
                $("div#block-memory-blocks-social-networks").stop().animate({
                    top: topValueScroll + "px",
                });
            }
            if($(window).scrollTop() === 0){

                $("#logo > img").css("height", "70px");
                $("#menu-bar-wrapper").css("padding", "15px 0");
                $("div#menu-bar-wrapper > div > div > div > ul > li > a").css("padding", "10px 30px");
                $( "a:contains('Connexion')" ).parent("li").css("transform", "translateY(-15px)");
                $("div#page").css("margin-top", "80px");
                // $("div#page").css("margin-top", "calc(80px + 34px)");
                // $("div#block-memory-blocks-social-networks").css("top", "calc(80px + " + sliderHeight + "px/2)");
                var topValue = 80 + sliderHeight/2;
                $("div#block-memory-blocks-social-networks").stop().animate({
                    top: topValue + "px",
                });
            }

        });

        // header_top_button.click(function() {
        //
        //     if(header_top_button.hasClass("active")) {
        //         header_top_button.removeClass("active");
        //         $("#header-wrapper").css("top", "0");
        //         header_top.css({"display": "none"});
        //         header_top.stop(true, false).slideToggle({"height": "0px"}, 500, function(){
        //         });
        //     }
        //     else {
        //         header_top.stop(true, false).slideToggle({"height": header_top_height + "px"}, 500, function(){
        //             $("#header-wrapper").css("top", header_top_height);
        //             header_top_button.addClass("active");
        //             header_top.css({"display": "block"});
        //         });
        //     }
        // });

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

                console.log("RUN METHOD");
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

    });
})(jQuery);