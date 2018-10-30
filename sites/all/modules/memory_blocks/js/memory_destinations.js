/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

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

    });
})(jQuery);