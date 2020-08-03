<?php global $base_url; ?>
<div class="top-blocks-container">
    <h2><?php echo $title; ?></h2>
    <div class="top-blocks-description"><?php echo $description; ?></div>
    <div class="top-blocks-thumbnails">
        <?php
        for( $i = 0 ; $i < sizeof($arrayAllThumbnails) ; $i++ ){
            ?>
            <div style="background-image:url('<?php print $arrayAllThumbnails[$i]["image"] ?>'); background-size:cover;background-position:center;">
                <a href="<?php echo $base_url . $arrayAllThumbnails[$i]["url"]; ?>">
                    <p><?php echo $arrayAllThumbnails[$i]["name"]; ?></p>
                </a>
            </div>
            <?php
        }
        ?>
    </div>
</div>
