<div id="social-networks">
    <?php
    foreach ($resultsSocialNetworks as $resultSocialNetworks){
        ?>
        <div class="social-networks-container">
            <a href="<?php echo $resultSocialNetworks->url; ?>" target="_blank">
                <i class="fa fa-2x <?php echo $resultSocialNetworks->icon; ?>" aria-hidden="true"></i>
            </a>
        </div>
        <?php
    }
    ?>
</div>

