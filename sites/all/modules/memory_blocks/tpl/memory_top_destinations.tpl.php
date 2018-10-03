<div id="top-destinations-container">
    <h1><?php echo $title; ?></h1>
    <p id="description"><?php echo $description; ?></p>
    <div id="top-destinations-grid">

        <?php
        for( $i = 0 ; $i < sizeof($arrayAllDatas) ; $i++ ){
        ?>
            <div>
                <a href="<?php echo $arrayAllDatas[$i]["url"]; ?>">
                    <p class="td-name"><?php echo $arrayAllDatas[$i]["name"]; ?></p>
                    <img src="<?php echo $arrayAllDatas[$i]["image"]; ?>" class="td-img"/>
                </a>
            </div>
        <?php
        }
        ?>
    </div>


</div>
