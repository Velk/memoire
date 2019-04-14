/*jslint devel: true */
(function($) {
    $(document).ready(function($) {

        /* Set the image on the entire size of its container depending on the container width greater than the image width or not */
        $(".all-act-scop").each(function(){

            $(this).children("img.all-act-vign-img").load(function(){

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

        /* Ajax load more Thumbnails */

        // $(".all-act-scop").hide();
        // $(".all-act-scop:lt(20)").show();

        var isAjaxRun = false;

        var isEveryThumbnailsLoaded = false;

        function loadAjax(){

            if(isAjaxRun){
                return;
            }

            isAjaxRun = true;

            var totalNbThumbnails = $(".all-act-scop").length;

            var urlPathname = window.location.pathname.split("/activity-categories")[0];
            var ajaxUrl = null;
            if(urlPathname != null){
                ajaxUrl = urlPathname + "/activity-categories/ajax";
            }else{
                ajaxUrl = "/activity-categories/ajax";
            }

            // Ajax
            $.ajax({
                type: 'POST',
                url: ajaxUrl,
                data: { actualNbThumbnails: totalNbThumbnails },
                beforeSend: function(){

                    $("#all-activities-main").append('<i class="fa fa-spinner" aria-hidden="true"></i>');
                },
                success: function(data) {

                    $("div.all-act-scop").remove();
                    $("#all-activities-main > i.fa-spinner").remove();

                    for (var thumbnailsDatas in data) {

                        $(".all-activities-container").append(
                            "<div class='all-act-scop'>" +
                                "<img src='"+ data[thumbnailsDatas]['img_uri'] + "' alt='" + data[thumbnailsDatas]['img_alt_text'] + "' class='all-act-vign-img' />" +
                                "<div class='all-act-datas-container'>" +
                                    "<h3 class='all-act-stick-title'>" + data[thumbnailsDatas]['title'] + "</h3>" +
                                    "<a href='" + data[thumbnailsDatas]['base_url'] + "/activites/" + data[thumbnailsDatas]['intermediate_path'] + "' class='all-act-readmore'></a>" +
                                "</div>" +
                            "</div>"
                        );

                        isEveryThumbnailsLoaded = data[thumbnailsDatas]['is_every_thumbnails_loaded'];
                    }

                    isAjaxRun = false;
                }
            });
        }

        // Detect when user scroll is near the end of the activities thumbnail displaying
        $(window).scroll(function() {

            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var documentHeight = $(document).height();
            var footerHeight = $("#memory-footer").height();

            if(Math.ceil(scrollTop + windowHeight) >= (documentHeight - footerHeight - 75)) {

                if(isEveryThumbnailsLoaded !== true) {
                    loadAjax();
                }
            }
        });

    });
})(jQuery);