(function ($) {
    Drupal.behaviors.memory_cookies = {
        attach: function (context, settings) {

            /* Ajax - Cookies */
            $("#cookies-accept").click(function(){

                var acceptCookies = true;

                var ajaxUrl = null;

                if (window.location.href.indexOf("memory_website/memoire") >= 0){
                    ajaxUrl = window.location.origin + "/memory_website/memoire/cookies/preferences";
                }else{
                    ajaxUrl = "/cookies/preferences";
                }

                // Ajax
                $.ajax({
                    type: 'POST',
                    url: ajaxUrl,
                    data: {
                        acceptCookies: acceptCookies,
                    },
                    success: function(data) {

                        if(data){
                            $("#block-memory-cookies-memory-cookies").remove();
                        }
                    }
                });

            });

        }
    };
}(jQuery));