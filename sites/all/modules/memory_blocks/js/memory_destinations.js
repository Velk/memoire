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
                       $(this).css("display", "block");
                   }else{
                       $(this).css("display", "none");
                   }
               });
           }

        });

    });
})(jQuery);