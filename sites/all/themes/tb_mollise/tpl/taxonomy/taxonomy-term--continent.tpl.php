<?php
    if (!empty($content['field_dst_image'])) {
        $img_head_url = file_create_url($content['field_dst_image']['#items'][0]['uri']);
    }
    $tid = key(taxonomy_get_term_by_name($term_name));
    $nids = taxonomy_select_nodes($tid, FALSE);
    $vocabulary = taxonomy_vocabulary_machine_name_load('activite');
    $activities = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));
    $cnt = array();
    foreach ($nids as $nid) {
        $node = node_load($nid);
        foreach($node->field_acti_cont_cat['und'] as $cat) {
            $img_url = file_create_url($node->field_img_activite['und']['0']['uri']);
            $cnt[$cat['tid']][$node->vid] = array(
                'title' => $node->field_activity_title['und']['0']['value'],
                'img_name' => $node->field_img_activite['und']['0']['filename'],
                'img_uri' => $img_url,
                'price' => $node->field_price_prestation['und']['0']['value'],
                'node' => $node->vid,
                'path' => drupal_get_path_alias('node/'.$node->vid),
            );
        }
    }
?>
<div id="continent">
    <div class="cont-head">
        <h2 class="cont-head-title"><?php print $content['field_destination_title']['#items'][0]['value']; ?></h2>
        <?php if(!empty($content['field_dst_image'])): ?>
            <img src="<?php print $img_head_url;?>"
                 alt="<?php print $content['field_dst_image']['#items'][0]['filename']?>"
                 class="cont-head-img"
                 style="width:100%;"
            />
        <?php endif; ?>
        <p class="cont-head-desc">
            <?php print $content['description']['#markup']; ?>
        </p>
    </div>
    <div class="cont-main">
        <?php foreach($activities as $activity): ?>
            <div class="cont-<?php print $activity->tid ?>">
                <h2><?php print $activity->name ?></h2>
                <?php foreach ($cnt[$activity->tid] as $event): ?>
                    <div class="cont-scop-<?php print $activity->tid ?>">
                        <h3 class="cont-stick-title"><?php print $event['title'] ?></h3>
                        <img src="<?php print $event['img_uri']?>"
                             alt="<?php print $event['img_name']?>"
                             class="cont-vign-img"
                             style="width: 150px;"
                        />
                        <p class="cont-price"><?php print $event['price']?></p>
                        <a href="<?php print $event['path']?>" class="cont-readmore">En savoir plus</a>
                    </div>
                <?php endforeach; ?>
            </div>
        <?php endforeach; ?>
    </div>
</div>
