/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

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

          console.log("click");

            var selectedSection = $(this).children("p").text();

            if( selectedSection === "Toutes nos Activités" ){

                $(".act-cat-container").css("display", "block");
            }else{

                $(".act-cat-container").each(function(){

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
