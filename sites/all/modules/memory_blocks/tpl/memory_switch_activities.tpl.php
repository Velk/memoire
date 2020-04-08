<?php
global $base_url;

// Set the category if exist in order to retrieve activities from the right category (EVG, EVJF...) in the switch activities button (previous, next)
if(isset($_GET["category"]) && !empty($_GET["category"])){
  $previous_redirection_path = $base_url . "/" . $previous_activity_path . "?category=" . $_GET["category"];
  $destination_redirection_path = $base_url . "/" . $destination_path . "?category=" . $_GET["category"];
  $next_redirection_path = $base_url . "/" . $next_activity_path . "?category=" . $_GET["category"];
}else{
  $previous_redirection_path = $base_url . "/" . $previous_activity_path;
  $destination_redirection_path = $base_url . "/" . $destination_path;
  $next_redirection_path = $base_url . "/" . $next_activity_path;
}
?>
<div id="memory-switch-act-container">
    <div id="memory-previous-act" class="memory-switch-act">
        <a href="<?= $previous_redirection_path ?>">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
            Activité précédente
        </a>
    </div>
    <div id="memory-destination" class="memory-switch-act">
        <a href="<?= $destination_redirection_path ?>">
            <?php print $destination_name; ?>
        </a>
    </div>
    <div id="memory-next-act" class="memory-switch-act">
        <a href="<?= $next_redirection_path ?>">
            Activité suivante
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </div>
</div>
