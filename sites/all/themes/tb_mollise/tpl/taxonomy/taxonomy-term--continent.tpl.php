<?php
    global $base_url;

    // Include pathauto to clean a string for use in URLs in order to compare with the current URL
    module_load_include('inc', 'pathauto', 'pathauto');

    if (!empty($content['field_dst_image'])) {
        $img_head_url = file_create_url($content['field_dst_image']['#items'][0]['uri']);
    }

    $tid = key(taxonomy_get_term_by_name($term_name));
    $nids = taxonomy_select_nodes($tid, FALSE);
    $vocabulary = taxonomy_vocabulary_machine_name_load('activite');
    $v_activities = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));

    // Ascendant sorting of group of activities ("Activités de nuits", "Transfert", "Nos packs"...) depending on their weight
    $nb_act = count($v_activities);
    $activities = array();
    $count = 0;
    for ($i = 0; $count < $nb_act; $i++) {
        if (!empty($v_activities[$i])){
            if ($v_activities[$i]->weight == $count) {
                $activities[$i] = $v_activities[$i];
                $count++;
                $i = 0;
            }
        }
    }

    $cnt = array();

    foreach ($nids as $nid) {
        $node = node_load($nid);

        $group_activity_tid = $node->field_acti_cont_cat['und']['0']['tid'];
        $activity_weight = ( empty($node->field_weight['und']['0']['value']) ) ? 0 : $node->field_weight['und']['0']['value'];
        $img_url = file_create_url($node->field_img_activite['und']['0']['uri']);

        $cnt[$group_activity_tid][$activity_weight][$node->field_activity_title['und']['0']['value']] = array(
            'title' => $node->field_activity_title['und']['0']['value'],
            'title_cleaned' => pathauto_cleanstring($node->field_activity_title['und']['0']['value']),
            'img_name' => $node->field_img_activite['und']['0']['filename'],
            'img_uri' => $img_url,
            'price' => $node->field_price_prestation['und']['0']['value'],
            'node_vid' => $node->vid,
            'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
            'weight' => $activity_weight,
            'group_act_cat' => $group_activity_tid,
        );
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
        <div class="cont-filter">
            <p><i class="fa fa-th" aria-hidden="true"></i>Toutes nos Activités</p>
        </div>
        <?php
        foreach($activities as $activity){
            if( isset( $cnt[$activity->tid] ) ) {
                echo '<div class="cont-filter cont-filter-' . $activity->tid . '">';
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
                    <?php

                    // Sort array by activity weight
                    ksort($cnt[$activity->tid]);

                    foreach ($cnt[$activity->tid] as $cnt_weight_sorted){

                        // Sort array by activity name
                        ksort($cnt_weight_sorted);

                        foreach ($cnt_weight_sorted as $cnt_act_sorted) {

                    ?>
                            <div class="cont-scop cont-scop-<?php print $activity->tid ?>">
                                <img src="<?php print $cnt_act_sorted['img_uri'] ?>"
                                     alt="<?php print $cnt_act_sorted['img_name'] ?>"
                                     class="cont-vign-img"
                                />
                                <div class="cont-datas-container" id="<?php print $cnt_act_sorted['title_cleaned'] ?>">
                                    <input type="hidden" class="cont-act-nid" value="<?php print $cnt_act_sorted['node_vid'] ?>">
                                    <input type="hidden" class="cont-act-cat" value="<?php print $cnt_act_sorted['group_act_cat'] ?>">
                                    <h3 class="cont-stick-title"><?php print $cnt_act_sorted['title'] ?></h3>
                                    <p class="cont-price"><?php print $cnt_act_sorted['price'] ?><?php isset($cnt_act_sorted['price']) ? print "€" : ""; ?></p>

                                    <?php
                                    if( isset($cnt_act_sorted['price']) ){
                                    ?>
                                        <button class="cont-add-cart" type="button">
                                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                        </button>
                                    <?php
                                    }
                                    ?>

                                    <a href="<?php print $cnt_act_sorted['path'] ?>" class="cont-readmore"></a>
                                    <?php
                                    $query = db_select('node', 'n');
                                    $query->fields('n', array('nid', 'title'));
                                    $query->condition('n.type', 'activite', '=');
                                    $query->orderBy('n.title', 'asc');
                                    $query->distinct();
                                    $results = $query->execute();

                                    foreach ($results as $result) {

                                        if ($cnt_act_sorted['title'] == $result->title) {

                                            $var = "category_" . $result->nid;

                                            switch ($$var) {
                                                case "0" :
                                                    $isCategory = false;
                                                    break;
                                                case "1" :
                                                    $isCategory = true;
                                                    $color = "#F42C1C";
                                                    $text = "Volcan";
                                                    break;
                                                case "2" :
                                                    $isCategory = true;
                                                    $color = "#F42C1C";
                                                    $text = "Aventure";
                                                    break;
                                                case "3" :
                                                    $isCategory = true;
                                                    $color = "#046C5C";
                                                    $text = "Survie";
                                                    break;
                                                case "4" :
                                                    $isCategory = true;
                                                    $color = "#046C5C";
                                                    $text = "Nature";
                                                    break;
                                                case "5" :
                                                    $isCategory = true;
                                                    $color = "#6C3C5C";
                                                    $text = "EVG";
                                                    break;
                                                case "6" :
                                                    $isCategory = true;
                                                    $color = "#EF648A";
                                                    $text = "EVJF";
                                                    break;
                                                case "7" :
                                                    $isCategory = true;
                                                    $color = "#FC6404";
                                                    $text = "Team<br>Building";
                                                    break;
                                                case "8" :
                                                    $isCategory = true;
                                                    $color = "#FC6404";
                                                    $text = "Anniversaire";
                                                    break;
                                                case "9" :
                                                    $isCategory = true;
                                                    $color = "#FC6404";
                                                    $text = "Vie<br>étudiante";
                                                    break;
                                                case "10" :
                                                    $isCategory = true;
                                                    $color = "#8CDCFB";
                                                    $text = "Mariage";
                                                    break;
                                                case "11" :
                                                    $isCategory = true;
                                                    $color = "#8CDCFB";
                                                    $text = "Demande<br>en mariage";
                                                    break;
                                            }

                                            if ($isCategory) {

                                                print "<div class='banner-category' style='background-color:$color;'><p>" . $text . "</p></div>";
                                            }
                                        }
                                    }
                                    ?>
                                </div>
                            </div>
                    <?php
                        }
                    }
                    ?>
                </div>
            </div>
            <?php } ?>
        <?php endforeach; ?>
    </div>
</div>
