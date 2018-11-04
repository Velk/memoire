<?php
    global $base_url;
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
                'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
            );
        }
    }
?>
<div id="continent">
    <div class="cont-head">
        <div id="cont-head-img-container">
            <h2 class="cont-head-title"><?php print $content['field_destination_title']['#items'][0]['value']; ?></h2>
            <?php if(!empty($content['field_dst_image'])): ?>
                <img src="<?php print $img_head_url;?>"
                     alt="<?php print $content['field_dst_image']['#items'][0]['filename']?>"
                     class="cont-head-img"
                     style="width:100%;"
                />
            <?php endif; ?>
        </div>
        <div id="cont-head-desc">
            <?php print $content['description']['#markup']; ?>
        </div>
    </div>
    <div id="cont-filters">
        <!-- toutes nos activités, nos packs, Activités de Jour, Activités de Nuit, Transfert, Hébergement -->
        <div class="cont-filter">
            <p><i class="fa fa-th" aria-hidden="true"></i>Toutes nos Activités</p>
        </div>
<!--        <div class="cont-filter">-->
<!--            <p><i class="fa fa-globe" aria-hidden="true"></i>Nos Packs</p>-->
<!--        </div>-->
        <?php
        foreach($activities as $activity){
            if( isset( $cnt[$activity->tid] ) ) {
                echo '<div class="cont-filter">';
                switch ($activity->name) {
                    case "Activités de jour" :
                        print '<p><i class="fa fa-sun-o" aria-hidden="true"></i>' . $activity->name . '</p>';
                        break;
                    case "Activités de nuit" :
                        print '<p><i class="fa fa-moon-o" aria-hidden="true"></i>' . $activity->name . '</p>';
                        break;
                    case "Transferts" :
                        print '<p><i class="fa fa-bus" aria-hidden="true"></i>' . $activity->name . '</p>';
                        break;
                    case "Hébergements" :
                        print '<p><i class="fa fa-home" aria-hidden="true"></i>' . $activity->name . '</p>';
                        break;
                    case "Nos packs" :
                        print '<p><i class="fa fa-globe" aria-hidden="true"></i>' . $activity->name . '</p>';
                        break;
                }
                echo '</div>';
            }
        }
        ?>
    </div>
    <div id="cont-main">
        <?php foreach($activities as $activity): ?>
            <?php if( isset( $cnt[$activity->tid] ) ){ ?>
            <div id="cont-<?php print $activity->tid ?>" class="cont-container">
                <?php
                switch($activity->name){
                    case "Activités de jour" :
                        print '<h2><i class="fa fa-sun-o" aria-hidden="true"></i>' . $activity->name . '</h2>';
                        break;
                    case "Activités de nuit" :
                        print '<h2><i class="fa fa-moon-o" aria-hidden="true"></i>' . $activity->name . '</h2>';
                        break;
                    case "Transferts" :
                        print '<h2><i class="fa fa-bus" aria-hidden="true"></i>' . $activity->name . '</h2>';
                        break;
                    case "Hébergements" :
                        print '<h2><i class="fa fa-home" aria-hidden="true"></i>' . $activity->name . '</h2>';
                        break;
                    case "Nos packs" :
                        print '<h2><i class="fa fa-globe" aria-hidden="true"></i>' . $activity->name . '</h2>';
                        break;
                }
                ?>
                <div class="cont-activities-container">
                    <?php foreach ($cnt[$activity->tid] as $event): ?>
                        <div class="cont-scop cont-scop-<?php print $activity->tid ?>">
                            <img src="<?php print $event['img_uri']?>"
                                 alt="<?php print $event['img_name']?>"
                                 class="cont-vign-img"
                            />
                            <div class="cont-datas-container">
                                <h3 class="cont-stick-title"><?php print $event['title'] ?></h3>
                                <p class="cont-price"><?php print $event['price']?> <?php isset($event['price']) ? print "€" : ""; ?></p>
                                <a href="<?php print $event['path']?>" class="cont-readmore"></a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
            <?php } ?>
        <?php endforeach; ?>
    </div>
</div>
