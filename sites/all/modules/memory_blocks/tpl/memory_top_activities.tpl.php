<?php global $base_url; ?>
<div id="top-activities-container">
    <h2><?php echo $title; ?></h2>
    <div id="description"><?php echo $description; ?></div>
    <div id="top-activities-grid">
        <?php
        for( $i = 0 ; $i < sizeof($arrayAllActivities) ; $i++ ){
            ?>
            <div style="background-image:url('<?php print $arrayAllActivities[$i]["image"] ?>'); background-size:cover;">
                <a href="<?php echo $base_url . $arrayAllActivities[$i]["url"]; ?>">
                    <p class="ta-name"><?php echo $arrayAllActivities[$i]["name"]; ?></p>
                </a>
            </div>
            <?php
        }
        ?>
    </div>
</div>
