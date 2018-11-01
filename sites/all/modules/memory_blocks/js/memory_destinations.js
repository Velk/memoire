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
           console.log("p : " + $(this).children("p").text());

           var selectedSection = $(this).children("p").text();

           if(
               selectedSection === "Toutes nos Activités" ||
               selectedSection === "Nos Packs"
           ){

               $("#cont-main .cont-container").css("display", "block");
           }else{

               $("#cont-main .cont-container").each(function(){

                   console.log("h2 : " + $(this).children("h2").text());

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