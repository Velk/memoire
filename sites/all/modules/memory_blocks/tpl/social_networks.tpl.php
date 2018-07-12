<div id="social-networks">
    <?php
    foreach ($resultsSocialNetworks as $resultSocialNetworks){
        ?>
        <a href="<?php echo $resultSocialNetworks->url; ?>">
            <i class="fa <?php echo $resultSocialNetworks->icon; ?>" aria-hidden="true"></i>
        </a>
        <?php
    }
    ?>
</div>

