<div id="slider-container" style="height:<?php echo $slider_height; ?>px">
    <div>
        <?php
        if( $slider_type == 0 ){
        ?>
            <div id="slider-img-container">
            <?php
                for($i = 1 ; $i <= $array_size_slider ; $i++){

                    $slider_image_name = "slider_" . $i . "_name";
                    $slider_image_image = "slider_" . $i . "_image";
                    $slider_image_redirection_link = "slider_" . $i . "_redirection_link";

                    if( !empty($$slider_image_name) && !empty($$slider_image_image) ) {
            ?>
                    <div class="slider-img-container">
                        <?php if( !empty($$slider_image_redirection_link) ){ ?>
                        <a href="<?php echo $$slider_image_redirection_link; ?>">
                        <?php } ?>
                        <img src="<?php echo $$slider_image_image; ?>" alt="<?php echo $$slider_image_name; ?>" class="slider-img" />
                        <?php if( !empty($$slider_image_redirection_link) ){ ?>
                        </a>
                        <?php } ?>
                    </div>
            <?php
                    }
                }
            ?>
            </div>
            <div id="slider-actions">
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
            </div>
        <?php
        }
        ?>
        <?php
        if( $slider_type == 1 ){
        ?>
            <video
                width="100%"
                height="auto"
                <?php echo ($video_autoplay == 1) ? "autoplay" : ""; ?>
                <?php echo ($video_controls == 1) ? "controls" : ""; ?>
                <?php echo ($video_loop == 1) ? "loop" : ""; ?>
                <?php echo ($video_muted == 1) ? "muted" : ""; ?>
                <?php echo ($video_poster == 1 && !empty($video_poster_image) ) ? "poster=".$video_poster_image : ""; ?>
                <?php echo ( !empty($video_redirection_link) ) ? "data-href=\"" . $video_redirection_link . "\"" : ""; ?>
            >
                <source src="<?php echo $video_video; ?>" type="video/mp4">
            </video>
            <div id="set-sound">
                <i class="fa fa-volume-off" aria-hidden="true"></i>
            </div>
        <?php
        }
        ?>
        <?php
        if( $slider_type == 2 ){
        ?>
            <div id="still-img">
                <?php if( !empty($still_img_redirection_link) ){ ?>
                <a href="<?php echo $still_img_redirection_link; ?>">
                <?php } ?>
                <img src="<?php echo $still_img_image; ?>" alt="<?php echo $still_img_name; ?>" class="slider-img" />
                <?php if( !empty($still_img_redirection_link) ){ ?>
                </a>
                <?php } ?>
            </div>
        <?php
        }
        ?>
    </div>
    <div id="go-down">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
</div>
