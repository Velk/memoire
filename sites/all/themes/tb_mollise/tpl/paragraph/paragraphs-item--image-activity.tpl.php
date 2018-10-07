<?php $img_url = file_create_url($content['field_activity_slider_image']['#items'][0]['uri'])?>
<div class="activity-carousel">
  <span class="ac-title"><?php print $content['field_activity_slider_titre']['#items'][0]['value']?></span>
  <img src="<?php print $img_url ?>"
       alt="<?php print $content['field_activity_slider_image']['#items'][0]['filename'] ?>"
       class="ac-picture">
</div>
