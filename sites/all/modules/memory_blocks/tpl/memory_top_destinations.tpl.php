<?php global $base_url; ?>
<div id="top-destinations-container">
    <h2><?php echo $title; ?></h2>
    <div id="description"><?php echo $description; ?></div>
    <div id="top-destinations-grid">
        <?php
        for( $i = 0 ; $i < sizeof($arrayAllDestinations) ; $i++ ){
        ?>
            <div style="background-image:url('<?php print $arrayAllDestinations[$i]["image"] ?>'); background-size:cover;background-position:center;">
                <a href="<?php echo $base_url . $arrayAllDestinations[$i]["url"]; ?>">
                    <p class="td-name"><?php echo $arrayAllDestinations[$i]["name"]; ?></p>
                </a>
            </div>
        <?php
        }
        ?>
    </div>
</div>
