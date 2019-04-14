<?php global $base_url; ?>
<div id="top-activities-container">
    <h1><?php echo $title; ?></h1>
    <div id="description"><?php echo $description; ?></div>
    <div id="top-activities-grid">
        <?php
        for( $i = 0 ; $i < sizeof($arrayAllDatas) ; $i++ ){
            ?>
            <div>
                <a href="<?php echo $base_url . $arrayAllDatas[$i]["url"]; ?>">
                    <p class="ta-name"><?php echo $arrayAllDatas[$i]["name"]; ?></p>
                    <img src="<?php echo $arrayAllDatas[$i]["image"]; ?>" class="ta-img"/>
                </a>
            </div>
            <?php
        }
        ?>
    </div>
</div>
