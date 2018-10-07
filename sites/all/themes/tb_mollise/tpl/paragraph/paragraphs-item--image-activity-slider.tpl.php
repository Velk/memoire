<div class="activity-slider">
    <div class="activity-slider-title">
        <h3><?php print $content['field_slider_image_activity_titr']['#items'][0]['value'] ?></h3>
    </div>
    <div class="activity-slider-wrapper">
    <?php
        $asw_pid = array();
        for ($i=0; $content['field_slider_image_activity_wrap']['#items'][$i]; $i++) {
            $asw_pid[$i] = $content['field_slider_image_activity_wrap']['#items'][$i]['value'];
            $asw_entities = entity_load('paragraphs_item', array($asw_pid));
            $asw_paragraphs_render = entity_view('paragraphs_item', $asw_entities);
        }
        print drupal_render($asw_paragraphs_render);
    ?>
</div>
