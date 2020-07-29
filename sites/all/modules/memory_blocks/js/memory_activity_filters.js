/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        /* Dynamic size of filters menu */
        var filtersNbTab = $(".memory-filter").length;
        var filtersTabSize = (100/filtersNbTab);

        $("#memory-filters-container").css("grid-template-columns", "repeat(" + filtersNbTab + ", " + filtersTabSize + "%)");

        /* Dynamic menu display */
        if( filtersNbTab === 1 ){
            $("#memory-filters-container").hide();
        }

        /* Filters for destinations page */
        $(".memory-filter").click(function(){

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
