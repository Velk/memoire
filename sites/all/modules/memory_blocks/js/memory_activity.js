(function ($) {
    Drupal.behaviors.memory_blocks_activities = {
        attach: function (context, settings) {

            // Check if image is loaded
            var isImageLoaded = false;

            /* Set the image on the entire size of its container depending on the container height greater than the image height or not */
            function setImageSize(image){

                var thisImg = $("div.activity-carousel:nth-child(" + image + ") > img.ac-picture");

                var divContainerHeight = thisImg.parent().height();
                var imgHeight = thisImg.height();

                var divContainerWidth = thisImg.parent().width();
                var imgWidth = thisImg.width();

                if( imgHeight < divContainerHeight ){

                    thisImg.css({
                        "height": "100%",
                        "width": "auto",
                        "transform": "translateX(-50%)",
                        "top": "0",
                        "left": "50%",
                    });
                }else if( imgWidth < divContainerWidth ){

                    thisImg.css({
                        "height": "auto",
                        "width": "100%",
                        "transform": "translateY(-50%)",
                        "top": "50%",
                        "left": "0",
                    });
                }
            }

            /* Load image before set size */
            function loadImage(image) {

                $(window).load(function () {

                    isImageLoaded = true;

                    setImageSize(image);
                });

                if( isImageLoaded ){

                    setImageSize(image);
                }
            }

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* --------------------------------------------------------- Slider images ---------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            // Retrieve the total number of children
            var nbChildren = $(".activity-slider-wrapper > div").size();

            // Initialize the child number to 2 to go to the second number when the time interval is done
            var childNumber = 1;

            function sliderChangeImage(){

                // Display only the 'n' image
                $("div.activity-carousel").css({
                    "display": "none",
                    "grid-area": "none",
                });

                // Previous image
                var previousImg = (childNumber - 1);
                if( previousImg === 0 ){
                    previousImg = nbChildren;
                }
                $("div.activity-carousel:nth-child(" + previousImg + ")").css({
                    "display": "block",
                    "grid-area": "a",
                    "background-color": "#000",
                });
                $("div.activity-carousel:nth-child(" + previousImg + ") > img.ac-picture").css({
                    "opacity": "0.5",
                    "filter": "grayscale(1) blur(2px)",
                });

                // Current image
                $("div.activity-carousel:nth-child(" + childNumber + ")").css({
                    "display": "block",
                    "grid-area": "b",
                    "background-color": "none",
                });
                $("div.activity-carousel:nth-child(" + childNumber + ") > img.ac-picture").css({
                    "opacity": "1",
                    "filter": "none",
                });

                // Next image
                var nextImg = (childNumber + 1);
                if( nextImg > nbChildren ){
                    nextImg = 1;
                }
                $("div.activity-carousel:nth-child(" + nextImg + ")").css({
                    "display": "block",
                    "grid-area": "c",
                    "background-color": "none",
                });
                $("div.activity-carousel:nth-child(" + nextImg + ") > img.ac-picture").css({
                    "opacity": "1",
                    "filter": "none",
                });

                // Next next image
                var nextNextImg = (nextImg + 1);
                if( nextNextImg > nbChildren ){
                    nextNextImg = 1;
                }
                $("div.activity-carousel:nth-child(" + nextNextImg + ")").css({
                    "display": "block",
                    "grid-area": "d",
                    "background-color": "#000",
                });
                $("div.activity-carousel:nth-child(" + nextNextImg + ") > img.ac-picture").css({
                    "opacity": "0.5",
                    "filter": "grayscale(1) blur(2px)",
                });

                // Call loadImage()
                loadImage(previousImg);
                loadImage(childNumber);
                loadImage(nextImg);
                loadImage(nextNextImg);

                // Increment the child number to display the next image
                childNumber++;

                // If the child number is greater than the total number of children, reset the slider
                if(childNumber > nbChildren){
                    childNumber = 1;
                }
            }

            if( nbChildren >= 4 ){

                // Call sliderChangeImage() once
                sliderChangeImage();

                // Call the function sliderChangeImage() every 'x' millisecond
                // Note that Drupal.settings.memory_blocks.slider_time_interval call slider_time_interval in the define in the memory_block module
                setInterval(sliderChangeImage, 10000);

                /* Previous or next image buttons */
                $(".activity-slider").append(
                    "<div id='activity-slider-actions'>" +
                    "<i class='fa fa-chevron-left' aria-hidden='true'></i>" +
                    "<i class='fa fa-chevron-right' aria-hidden='true'></i>" +
                    "</div>"
                );

                /* ---------------------------------------------------------------------------------------------------------------------------------- */
                /* ---------------------------------------------------- Previous | Next button ------------------------------------------------------ */
                /* ---------------------------------------------------------------------------------------------------------------------------------- */

                // Previous or next images - Icons behavior
                $( "#activity-slider-actions > i.fa-chevron-left" ).click(function(){

                    if( nbChildren === 4 ) {

                        $("div.activity-carousel").each(function(){

                            switch( $(this).css("grid-area") ){
                                case "a / a / a / a":
                                    $(this).css({
                                        "grid-area": "b / b / b / b",
                                        "background-color": "none",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "1",
                                        "filter": "none",
                                    });
                                    break;
                                case "b / b / b / b":
                                    $(this).css({
                                        "grid-area": "c / c / c / c",
                                        "background-color": "none",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "1",
                                        "filter": "none",
                                    });
                                    break;
                                case "c / c / c / c":
                                    $(this).css({
                                        "grid-area": "d / d / d / d",
                                        "background-color": "#000",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "0.5",
                                        "filter": "grayscale(1) blur(2px)",
                                    });
                                    break;
                                case "d / d / d / d":
                                    $(this).css({
                                        "grid-area": "a / a / a / a",
                                        "background-color": "#000",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "0.5",
                                        "filter": "grayscale(1) blur(2px)",
                                    });
                                    break;
                            }
                        });

                    }else{

                        // Array to stock the index of the images not displayed
                        var arrayIndex = [];

                        $("div.activity-carousel").each(function(){

                            // If image container direct child is the image
                            if( $(this).children("img").length > 0 ){

                                // Retrieve every index of image containers except the those displayed
                                if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                                    arrayIndex.push($( this ).index( $(this).is(":visible") ));
                                }
                            }
                        });

                        var minIndex = arrayIndex[0];

                        for(var i = 0 ; i < arrayIndex.length ; i++){

                            // Retrieve the minimum index that's to say the index of the first image not displayed
                            if(
                                arrayIndex[arrayIndex.length - 1] === (nbChildren-1) &&
                                arrayIndex[i] === 0
                            ){

                                // If one of the index is the last image and one other is the first
                                minIndex = nbChildren;
                            }else if( minIndex > arrayIndex[i] ){

                                minIndex = arrayIndex[i];
                            }
                        }

                        var fourthImage = (minIndex === 0) ? (nbChildren-1) : ( (minIndex === 1) ? nbChildren : (minIndex-1) );
                        var thirdImage = (fourthImage === 0) ? (nbChildren-1) : ( (fourthImage === 1) ? nbChildren : (fourthImage-1) );
                        var secondImage = (thirdImage === 0) ? (nbChildren-1) : ( (thirdImage === 1) ? nbChildren : (thirdImage-1) );
                        var firstImage = (secondImage === 0) ? (nbChildren-1) : ( (secondImage === 1) ? nbChildren : (secondImage-1) );

                        // Display only the 'n' image
                        $("div.activity-carousel").css({
                            "display": "none",
                            "grid-area": "none",
                        });

                        // Previous image
                        $("div.activity-carousel:nth-child(" + firstImage + ")").css({
                            "display": "block",
                            "grid-area": "a",
                            "background-color": "#000",
                        });
                        $("div.activity-carousel:nth-child(" + firstImage + ") > img.ac-picture").css({
                            "opacity": "0.5",
                            "filter": "grayscale(1) blur(2px)",
                        });

                        // Current image
                        $("div.activity-carousel:nth-child(" + secondImage + ")").css({
                            "display": "block",
                            "grid-area": "b",
                            "background-color": "none",
                        });
                        $("div.activity-carousel:nth-child(" + secondImage + ") > img.ac-picture").css({
                            "opacity": "1",
                            "filter": "none",
                        });

                        // Next image
                        $("div.activity-carousel:nth-child(" + thirdImage + ")").css({
                            "display": "block",
                            "grid-area": "c",
                            "background-color": "none",
                        });
                        $("div.activity-carousel:nth-child(" + thirdImage + ") > img.ac-picture").css({
                            "opacity": "1",
                            "filter": "none",
                        });

                        // Next next image
                        $("div.activity-carousel:nth-child(" + fourthImage + ")").css({
                            "display": "block",
                            "grid-area": "d",
                            "background-color": "#000",
                        });
                        $("div.activity-carousel:nth-child(" + fourthImage + ") > img.ac-picture").css({
                            "opacity": "0.5",
                            "filter": "grayscale(1) blur(2px)",
                        });

                        // Call loadImage()
                        loadImage(firstImage);
                        loadImage(secondImage);
                        loadImage(thirdImage);
                        loadImage(fourthImage);
                    }

                });

                // Previous or next images - Icons behavior
                $( "#activity-slider-actions > i.fa-chevron-right" ).click(function(){

                    if( nbChildren === 4 ) {

                        $("div.activity-carousel").each(function(){

                            switch( $(this).css("grid-area") ){
                                case "a / a / a / a":
                                    $(this).css({
                                        "grid-area": "d / d / d / d",
                                        "background-color": "#000",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "0.5",
                                        "filter": "grayscale(1) blur(2px)",
                                    });
                                    break;
                                case "b / b / b / b":
                                    $(this).css({
                                        "grid-area": "a / a / a / a",
                                        "background-color": "#000",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "0.5",
                                        "filter": "grayscale(1) blur(2px)",
                                    });
                                    break;
                                case "c / c / c / c":
                                    $(this).css({
                                        "grid-area": "b / b / b / b",
                                        "background-color": "none",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "1",
                                        "filter": "none",
                                    });
                                    break;
                                case "d / d / d / d":
                                    $(this).css({
                                        "grid-area": "c / c / c / c",
                                        "background-color": "none",
                                    });
                                    $(this).children("img.ac-picture").css({
                                        "opacity": "1",
                                        "filter": "none",
                                    });
                                    break;
                            }
                        });

                    }else{

                        // Array to stock the index of the images not displayed
                        var arrayIndex = [];

                        $("div.activity-carousel").each(function(){

                            // If image container direct child is the image
                            if( $(this).children("img").length > 0 ){

                                // Retrieve every index of image containers except the those displayed
                                if( $( this ).index( $(this).is(":visible") ) !== -1 ){

                                    arrayIndex.push($( this ).index( $(this).is(":visible") ));
                                }
                            }
                        });

                        var minIndex = arrayIndex[0];

                        for(var i = 0 ; i < arrayIndex.length ; i++){

                            // Retrieve the minimum index that's to say the index of the first image not displayed
                            if(
                                arrayIndex[arrayIndex.length - 1] === (nbChildren-1) &&
                                arrayIndex[i] === 0
                            ){

                                // If one of the index is the last image and one other is the first
                                minIndex = nbChildren;
                            }else if( minIndex > arrayIndex[i] ){

                                minIndex = arrayIndex[i];
                            }
                        }

                        var fourthImage = (minIndex+1);
                        var thirdImage = ((fourthImage-1) === 0) ? nbChildren : (fourthImage-1);
                        var secondImage = ((thirdImage-1) === 0) ? nbChildren : (thirdImage-1);
                        var firstImage = ((secondImage-1) === 0) ? nbChildren : (secondImage-1);

                        // Display only the 'n' image
                        $("div.activity-carousel").css({
                            "display": "none",
                            "grid-area": "none",
                        });

                        // Previous image
                        $("div.activity-carousel:nth-child(" + firstImage + ")").css({
                            "display": "block",
                            "grid-area": "a",
                            "background-color": "#000",
                        });
                        $("div.activity-carousel:nth-child(" + firstImage + ") > img.ac-picture").css({
                            "opacity": "0.5",
                            "filter": "grayscale(1) blur(2px)",
                        });

                        // Current image
                        $("div.activity-carousel:nth-child(" + secondImage + ")").css({
                            "display": "block",
                            "grid-area": "b",
                            "background-color": "none",
                        });
                        $("div.activity-carousel:nth-child(" + secondImage + ") > img.ac-picture").css({
                            "opacity": "1",
                            "filter": "none",
                        });

                        // Next image
                        $("div.activity-carousel:nth-child(" + thirdImage + ")").css({
                            "display": "block",
                            "grid-area": "c",
                            "background-color": "none",
                        });
                        $("div.activity-carousel:nth-child(" + thirdImage + ") > img.ac-picture").css({
                            "opacity": "1",
                            "filter": "none",
                        });

                        // Next next image
                        $("div.activity-carousel:nth-child(" + fourthImage + ")").css({
                            "display": "block",
                            "grid-area": "d",
                            "background-color": "#000",
                        });
                        $("div.activity-carousel:nth-child(" + fourthImage + ") > img.ac-picture").css({
                            "opacity": "0.5",
                            "filter": "grayscale(1) blur(2px)",
                        });

                        // Call loadImage()
                        loadImage(firstImage);
                        loadImage(secondImage);
                        loadImage(thirdImage);
                        loadImage(fourthImage);
                    }

                });
            }else{

                if( nbChildren === 1 ){

                    $("fieldset.group-slider").css("margin", "40px 10%");

                    $(".activity-slider-wrapper").css({
                        "grid-template-areas": "unset",
                        "grid-template-columns": "100%",
                    });

                    loadImage(1);
                }else if( nbChildren === 2 ){

                    $(".activity-slider-wrapper").css({
                        "grid-template-areas": "unset",
                        "grid-template-columns": "repeat(2, calc(50% - (10px/2)*1))",
                    });

                    loadImage(1);
                    loadImage(2);
                }else if( nbChildren === 3 ){

                    $(".activity-slider-wrapper").css({
                        "grid-template-areas": "unset",
                        "grid-template-columns": "repeat(3, calc(33.3333% - (10px/3)*2))",
                    });

                    loadImage(1);
                    loadImage(2);
                    loadImage(3);
                }
            }

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* ------------------------------------------------- Thumbnails : Slider images ----------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            if( nbChildren >= 4 ) {

                /* Previous or next image buttons */
                $(".activity-slider").append(
                    "<div id='activity-slider-thumbnails'>" +
                    "</div>"
                );

                $(".activity-carousel").each(function(){

                    var element = $(this).clone().removeClass("activity-carousel");
                    element = element.addClass("activity-slider-thumbnail");
                    element = element.removeAttr("style");
                    element.appendTo("#activity-slider-thumbnails");

                });

                $(".activity-slider-thumbnail").each(function(){

                    // element.child("span").removeClass("ac-");
                    $(this).children("img").removeClass("ac-picture");
                    $(this).children("img").removeAttr("style");
                });

                // Click on thumbnails
                $( "#activity-slider-thumbnails > .activity-slider-thumbnail" ).click(function(){

                    var selectedThumbnail = $(this).index();

                    var firstImage = ( selectedThumbnail < 1 ) ? nbChildren : selectedThumbnail;
                    var secondImage = (selectedThumbnail+1);
                    var thirdImage = ( (secondImage+1) > nbChildren ) ? 1 : (secondImage+1) ;
                    var fourthImage = ( (thirdImage+1) > nbChildren ) ? 1 : (thirdImage+1);

                    // Display only the 'n' image
                    $("div.activity-carousel").css({
                        "display": "none",
                        "grid-area": "none",
                    });

                    // Previous image
                    $("div.activity-carousel:nth-child(" + firstImage + ")").css({
                        "display": "block",
                        "grid-area": "a",
                        "background-color": "#000",
                    });
                    $("div.activity-carousel:nth-child(" + firstImage + ") > img.ac-picture").css({
                        "opacity": "0.5",
                        "filter": "grayscale(1) blur(2px)",
                    });

                    // Current image
                    $("div.activity-carousel:nth-child(" + secondImage + ")").css({
                        "display": "block",
                        "grid-area": "b",
                        "background-color": "none",
                    });
                    $("div.activity-carousel:nth-child(" + secondImage + ") > img.ac-picture").css({
                        "opacity": "1",
                        "filter": "none",
                    });

                    // Next image
                    $("div.activity-carousel:nth-child(" + thirdImage + ")").css({
                        "display": "block",
                        "grid-area": "c",
                        "background-color": "none",
                    });
                    $("div.activity-carousel:nth-child(" + thirdImage + ") > img.ac-picture").css({
                        "opacity": "1",
                        "filter": "none",
                    });

                    // Next next image
                    $("div.activity-carousel:nth-child(" + fourthImage + ")").css({
                        "display": "block",
                        "grid-area": "d",
                        "background-color": "#000",
                    });
                    $("div.activity-carousel:nth-child(" + fourthImage + ") > img.ac-picture").css({
                        "opacity": "0.5",
                        "filter": "grayscale(1) blur(2px)",
                    });

                    // Call loadImage()
                    loadImage(firstImage);
                    loadImage(secondImage);
                    loadImage(thirdImage);
                    loadImage(fourthImage);

                });

            }

            /* ---------------------------------------------------------------------------------------------------------------------------------- */
            /* ------------------------------------------------ Button - Submit activity -------------------------------------------------------- */
            /* ---------------------------------------------------------------------------------------------------------------------------------- */

            // $(".node-activite").append(
            //     "<button id='submit-btn-activity'>Acheter</button>" +
            //     "<div id='info-submit-activity'>" +
            //         "<div>" +
            //             "<p>Partie en construction</p>" +
            //             "<p>L'action n'a pas abouti car cette partie est en construction.<br>Pour commander, veuillez contacter l'agence Memory directement par téléphone ou par e-mail.</p>" +
            //             "<i class='fa fa-times' aria-hidden='true'></i>" +
            //         "</div>" +
            //     "</div>"
            // );
            //
            // $("#submit-btn-activity").click(function(){
            //
            //     $("#info-submit-activity").show();
            // });
            //
            // $("#info-submit-activity i.fa-times").click(function(){
            //
            //     $("#info-submit-activity").hide();
            // });

        }
    };
}(jQuery));