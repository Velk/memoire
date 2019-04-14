<?php
global $base_url;
?>
<div id="memory-switch-act-container">
    <div id="memory-previous-act" class="memory-switch-act">
        <a href="<?php print $base_url . "/" . $previous_activity_path; ?>">
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
<!--            --><?php //print $previous_activity_name; ?>
            Activité précédente
        </a>
    </div>
    <div id="memory-destination" class="memory-switch-act">
        <a href="<?php print $base_url . "/" . $destination_path; ?>">
            <?php print $destination_name; ?>
        </a>
    </div>
    <div id="memory-next-act" class="memory-switch-act">
        <a href="<?php print $base_url . "/" . $next_activity_path; ?>">
<!--            --><?php //print $next_activity_name; ?>
            Activité suivante
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
    </div>
</div>