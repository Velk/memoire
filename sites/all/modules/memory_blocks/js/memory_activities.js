/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        /* Set the image on the entire size of its container depending on the container width greater than the image width or not */
        $(".act-cat-scop").each(function(){

            $(this).children("img.act-cat-vign-img").load(function(){

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
        var filtersNbTab = $(".act-cat-filter").length;
        var filtersTabSize = (100/filtersNbTab);

        $("#act-cat-filters").css("grid-template-columns", "repeat(" + filtersNbTab + ", " + filtersTabSize + "%)");

        /* Dynamic menu display */
        if( filtersNbTab === 1 ){
            $("#act-cat-filters").hide();
        }

        /* Filters for destinations page */
        $(".act-cat-filter").click(function(){

            var selectedSection = $(this).children("p").text();

            if( selectedSection === "Toutes nos Activités" ){

                $("#act-cat-main .act-cat-container").css("display", "block");
            }else{

                $("#act-cat-main .act-cat-container").each(function(){

                    var section = $(this).children("h2").text();

                    if( selectedSection === section ){
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });
            }
        });
    });
})(jQuery);