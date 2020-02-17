<?php
    global $base_url;
    module_load_include('inc', 'pathauto', 'pathauto'); // Include pathauto to clean a string for use in URLs in order to compare with the current URL

//    drupal_set_message("Destinations page");

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

      $activity_tid_field = field_get_items('node', $node, 'field_acti_cont_cat');
      $activity_tid = $activity_tid_field[0]["tid"];

      $activity_weight_field = field_get_items('node', $node, 'field_weight');
      $activity_weight = ( empty($activity_weight_field[0]["value"]) ) ? 0 : $activity_weight_field[0]["value"];

      $activity_custom_title_field = field_get_items('node', $node, 'field_activity_title');
      $activity_custom_title = $activity_custom_title_field[0]["value"];

      $activity_image = field_get_items('node', $node, 'field_img_activite');
      $activity_price = field_get_items('node', $node, 'field_price_prestation');

      $cnt[$activity_tid][$activity_weight][$node->nid] = array(
        'node_vid' => $node->vid,
        'node_nid' => $node->nid,
        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
        'custom_title' => $activity_custom_title,
        'price' => $activity_price[0]["value"],
        'weight' => $activity_weight,
        'group_act_cat' => $activity_tid,
        'img_uri' => file_create_url($activity_image[0]["uri"]),
        'img_name' => $activity_image[0]['filename'],
        'activity_family' => getActivityFamily($node->nid),
      );
    }

//drupal_set_message("<pre>" . print_r($cnt, true) . "</pre>");
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
                echo '<div class="cont-filter filter-' . $activity->tid . '">';
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
            <div id="filter-<?php print $activity->tid ?>" class="cont-container">
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
                                <div class="cont-datas-container" id="<?php print $cnt_act_sorted['node_nid'] ?>">
                                    <input type="hidden" class="cont-act-nid" value="<?php print $cnt_act_sorted['node_vid'] ?>">
                                    <input type="hidden" class="cont-act-cat" value="<?php print $cnt_act_sorted['group_act_cat'] ?>">
                                    <h3 class="cont-stick-title"><?php print $cnt_act_sorted['custom_title'] ?></h3>
                                    <p class="cont-price"><?php print $cnt_act_sorted['price'] ?><?php isset($cnt_act_sorted['price']) ? print "€" : ""; ?></p>
                                    <a href="<?php print $cnt_act_sorted['path'] ?>" class="cont-readmore"></a>
                                    <?php
                                    if(sizeof($cnt_act_sorted["activity_family"]) !== 0)
                                      echo
                                        "<div class='banner-category' style='background-color:" .
                                        $cnt_act_sorted["activity_family"]["color"] .
                                        ";'><p>" . $cnt_act_sorted["activity_family"]["text"] . "</p></div>";
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

<?php
// Get category type. Exemple : Survie, Aventure, Team Building, etc.
function getActivityFamily($node_id){

  $array_results = array();
  $admin_family = variable_get("category_" . $node_id);
  $isFamily = true;

  switch ($admin_family) {
    case "0" :
      $isFamily = false;
      break;
    case "1" :
      $array_results["color"] = "#F42C1C";
      $array_results["text"] = "Volcan";
      break;
    case "2" :
      $array_results["color"] = "#F42C1C";
      $array_results["text"] = "Aventure";
      break;
    case "3" :
      $array_results["color"] = "#046C5C";
      $array_results["text"] = "Survie";
      break;
    case "4" :
      $array_results["color"] = "#046C5C";
      $array_results["text"] = "Nature";
      break;
    case "5" :
      $array_results["color"] = "#6C3C5C";
      $array_results["text"] = "EVG";
      break;
    case "6" :
      $array_results["color"] = "#EF648A";
      $array_results["text"] = "EVJF";
      break;
    case "7" :
      $array_results["color"] = "#FC6404";
      $array_results["text"] = "Team<br>Building";
      break;
    case "8" :
      $array_results["color"] = "#FC6404";
      $array_results["text"] = "Anniversaire";
      break;
    case "9" :
      $array_results["color"] = "#FC6404";
      $array_results["text"] = "Vie<br>étudiante";
      break;
    case "10" :
      $array_results["color"] = "#8CDCFB";
      $array_results["text"] = "Mariage";
      break;
    case "11" :
      $array_results["color"] = "#8CDCFB";
      $array_results["text"] = "Demande<br>en mariage";
      break;
  }

  if ($isFamily) {
    return $array_results;
  }else{
    return $array_results;
  }
}
?>
