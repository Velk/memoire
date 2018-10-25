<div id="slider-container" style="height:<?php echo $slider_height; ?>px">
    <div>
        <?php
        if( $slider_type == 0 ){

            for($i = 1 ; $i <= $array_size_slider ; $i++){

                $slider_image_name = "slider_" . $i . "_name";
                $slider_image_image = "slider_" . $i . "_image";

                if( !empty($$slider_image_name) && !empty($$slider_image_image) ) {
        ?>
                <div class="slider-img-container">
                    <img src="<?php echo $$slider_image_image; ?>" alt="<?php echo $$slider_image_name; ?>" class="slider-img" />
                </div>
        <?php
                }
            }

        }
        ?>
        <?php
        if( $slider_type == 1 ){
        ?>
            <iframe
                    width="100%"
                    height="100%"
                    frameborder="0"
                    src="<?php echo $video_url; ?>">
            </iframe>
        <?php
        }
        ?>
        <?php
        if( $slider_type == 2 ){
        ?>
            <div id="still-img">
                <img src="<?php echo $still_img_image; ?>" alt="<?php echo $still_img_name; ?>" class="slider-img" />
            </div>
        <?php
        }
        ?>
    </div>
    <div id="go-down">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
</div>
