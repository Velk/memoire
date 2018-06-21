/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        var header_top = $("#header-top-wrapper");
        var header_top_button = $("#header-wrapper a.accordion").addClass("active");
        var header = $("#header-wrapper");
        var clickToShow = true;

        header_top_button.removeClass("active");


        header_top_button.click(function(e){
            e.preventDefault();
            var heightToReach = "+="+ header_top.height();

            header_top.slideToggle(600);
            if(clickToShow){

                header_top_button.addClass("active");

                header.animate({
                    top: heightToReach
                }, 650);

                clickToShow = false;
            }else{

                header_top_button.removeClass("active");

                header.animate({
                    top: "0"
                }, 600);

                clickToShow = true;
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

    });
})(jQuery);