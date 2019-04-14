<?php
global $base_url;
global $user;
module_load_include('inc', 'pathauto', 'pathauto');

/* ------------------------------------- SPECIAL FILTERS & INTERMEDIATE PAGE ------------------------------------- */
// Get the current path of the page : taxonomy/term/[tid]
$current_path = current_path();
// Retrieve the tid
$taxonomy_tid = explode("taxonomy/term/", $current_path)[1];
// Load the taxonomy term by its tid
$taxonomy_term_load = taxonomy_term_load($taxonomy_tid);
// Retrieve the boolean value of special filters
$bool_is_special_filters = $content['field_is_special_filters']['#items'][0]['value'];
// Retrieve the boolean value of intermediate page
$bool_is_intermediate_page = $content['field_is_intermediate_page']['#items'][0]['value'];

$bool_is_special_filters = (!isset($bool_is_special_filters)) ? 0 : 1;
$bool_is_intermediate_page = (!isset($bool_is_intermediate_page)) ? 0 : 1;

/* -------------------------------------------------- CONTENT -------------------------------------------------- */

if (!empty($content['field_category_activities_img'])) {
  $img_head_url = file_create_url($content['field_category_activities_img']['#items'][0]['file']->uri);
}

// Retrieve the taxonomy ID
$tid = key(taxonomy_get_term_by_name($term_name));

// Retrieve an array containing nodes ID belonging to the activity category
$nids = taxonomy_select_nodes($tid, FALSE);

/* Get activities filters depending on activite taxonomy */
$vocabulary = taxonomy_vocabulary_machine_name_load('activite');
$v_activities = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));

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

  $activity_weight = ( empty($node->field_weight['und']['0']['value']) ) ? 0 : $node->field_weight['und']['0']['value'];
  $img_url = file_create_url($node->field_img_activite['und']['0']['uri']);

  if($bool_is_special_filters == 1) {

    if($bool_is_intermediate_page == 1){

      // Page WITH special filters & WITH intermediate page

      // Clean the title of the node (activity) to use as a part of the URL
      $clean_string_to_url = pathauto_cleanstring($node->field_activity_title['und']['0']['value']);

      $group_activity_tid = $node->field_acti_cont_cat['und']['0']['tid'];
      $cnt[$group_activity_tid][$activity_weight][$node->field_activity_title['und']['0']['value']] = array(
        'title' => $node->field_activity_title['und']['0']['value'],
        // 'title_cleaned' => pathauto_cleanstring($node->field_activity_title['und']['0']['value']),
        'img_name' => $node->field_img_activite['und']['0']['filename'],
        'img_uri' => $img_url,
        'price' => $node->field_price_prestation['und']['0']['value'],
        'node' => $node->vid,
        'path' => $base_url . "/" . drupal_get_path_alias('node/' . $node->vid),
        'weight' => $activity_weight,
        'intermediate_path' => $base_url . "/activites/" . $clean_string_to_url,
      );

    }else{

      // Page WITH special filters & WITHOUT intermediate page
      $group_activity_tid = $node->field_acti_cont_cat['und']['0']['tid'];
      $cnt[$group_activity_tid][$activity_weight][$node->field_activity_title['und']['0']['value']] = array(
        'title' => $node->field_activity_title['und']['0']['value'],
        // 'title_cleaned' => pathauto_cleanstring($node->field_activity_title['und']['0']['value']),
        'img_name' => $node->field_img_activite['und']['0']['filename'],
        'img_uri' => $img_url,
        'price' => $node->field_price_prestation['und']['0']['value'],
        'node' => $node->vid,
        'path' => $base_url . "/" . drupal_get_path_alias('node/' . $node->vid),
        'weight' => $activity_weight,
      );
    }
  }else{

    if($bool_is_intermediate_page == 1){

      // Page WITHOUT special filters & WITH intermediate page

      // Clean the title of the node (activity) to use as a part of the URL
      $clean_string_to_url = pathauto_cleanstring($node->field_activity_title['und']['0']['value']);

      $cnt[$activity_weight][$node->field_activity_title['und']['0']['value']] = array(
        'title' => $node->field_activity_title['und']['0']['value'],
        'title_cleaned' => pathauto_cleanstring($node->field_activity_title['und']['0']['value']),
        'img_alt_text' => $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'],
        'img_name' => $node->field_img_activite['und']['0']['filename'],
        'img_uri' => $img_url,
        'price' => $node->field_price_prestation['und']['0']['value'],
        'node' => $node->vid,
        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
        'weight' => $activity_weight,
        'intermediate_path' => $base_url . "/activites/" . $clean_string_to_url,
      );

    }else{

      // Page WITHOUT special filters & WITHOUT intermediate page
      $cnt[$activity_weight][$node->field_activity_title['und']['0']['value']] = array(
        'title' => $node->field_activity_title['und']['0']['value'],
        'title_cleaned' => pathauto_cleanstring($node->field_activity_title['und']['0']['value']),
        'img_alt_text' => $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'],
        'img_name' => $node->field_img_activite['und']['0']['filename'],
        'img_uri' => $img_url,
        'price' => $node->field_price_prestation['und']['0']['value'],
        'node' => $node->vid,
        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
        'weight' => $activity_weight,
      );
    }
  }
}

?>

<?php
if($bool_is_special_filters == 1){
  ?>
  <div id="act-cat">
    <div class="act-cat-head">
      <div id="act-cat-head-img-container">
        <h2 class="act-cat-head-title"><?php print $content['field_category_activities_title']['#items'][0]['value']; ?></h2>
        <?php if(!empty($content['field_category_activities_img'])): ?>
          <img src="<?php print $img_head_url;?>"
               alt="<?php print $content['field_category_activities_img']['#items'][0]['filename']?>"
               class="act-cat-head-img"
               style="width:100%;"
          />
        <?php endif; ?>
      </div>
      <div id="act-cat-head-desc">
        <?php print $content['description']['#markup']; ?>
      </div>
    </div>
    <div id="act-cat-filters">
      <div class="act-cat-filter">
        <p><i class="fa fa-th" aria-hidden="true"></i>Toutes nos Activités</p>
      </div>
      <?php
      foreach($activities as $activity){
        if( isset( $cnt[$activity->tid] ) ) {
          echo '<div class="act-cat-filter">';
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
    <div id="act-cat-main">
      <?php foreach($activities as $activity): ?>
        <?php if( isset( $cnt[$activity->tid] ) ){ ?>
          <div id="act-cat-<?php print $activity->tid ?>" class="act-cat-container">
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
            <div class="act-cat-activities-container">
              <?php

              // Sort array by activity weight
              ksort($cnt[$activity->tid]);

              foreach ($cnt[$activity->tid] as $cnt_weight_sorted){

                // Sort array by activity name
                ksort($cnt_weight_sorted);

                foreach ($cnt_weight_sorted as $cnt_act_sorted) {
                  ?>
                  <div class="act-cat-scop act-cat-scop-<?php print $activity->tid ?>">
                    <img src="<?php print $cnt_act_sorted['img_uri']?>"
                         alt="<?php print $cnt_act_sorted['img_name']?>"
                         class="act-cat-vign-img"
                    />
                    <div class="act-cat-datas-container">
                      <h3 class="act-cat-stick-title"><?php print $cnt_act_sorted['title'] ?></h3>
                      <p class="act-cat-price"><?php print $cnt_act_sorted['price']?> <?php isset($cnt_act_sorted['price']) ? print "€" : ""; ?></p>
                      <a href="<?php print ($bool_is_intermediate_page == 1) ? $cnt_act_sorted['intermediate_path'] : $cnt_act_sorted['path'] ?>" class="act-cat-readmore"></a>
                      <?php

//                      drupal_set_message($cnt_act_sorted['title']);
//                      drupal_set_message("<pre>" . print_r($cnt_act_sorted, true) . "</pre>");

                      $query = db_select('node', 'n');
                      $query->fields('n', array('nid', 'title'));
                      $query->condition('n.type', 'activite', '=');
                      $query->condition('n.nid', $cnt_act_sorted['node'], '=');
                      $query->condition('n.title', $cnt_act_sorted['title'], '=');
                      $query->orderBy('n.title', 'asc');
                      $query->distinct();
                      $results = $query->execute();

                      foreach( $results as $result ){

                        if( $cnt_act_sorted['title'] == $result->title ){

                          $admin_var_get_category = variable_get("category_" . $result->nid);

                          switch($admin_var_get_category){
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
drupal_set_message("ISCATEGORY : " . $isCategory);
                          if( $isCategory ){
drupal_set_message("OKKK");
                            print "<div class='act-cat-banner-category' style='background-color:$color;'><p>" . $text . "</p></div>";
                          }
                        }
                      }
                      drupal_set_message("-------------------------------------------------------------------------");
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
}else{
  ?>
  <div id="act-cat">
    <div class="act-cat-head">
      <div id="act-cat-head-img-container">
        <h2 class="act-cat-head-title"><?php print $content['field_category_activities_title']['#items'][0]['value']; ?></h2>
        <?php if(!empty($content['field_category_activities_img'])): ?>
          <img src="<?php print $img_head_url;?>"
               alt="<?php print $content['field_category_activities_img']['#items'][0]['filename']?>"
               class="act-cat-head-img"
               style="width:100%;"
          />
        <?php endif; ?>
      </div>
      <div id="act-cat-head-desc">
        <?php print $content['description']['#markup']; ?>
      </div>
    </div>
    <div id="act-cat-main">
      <div class="act-cat-activities-container">
        <?php

        // Sort array by activity weight
        ksort($cnt);

        foreach ($cnt as $act_weight_sorted){

          // Sort array by activity name
          ksort($act_weight_sorted);

          foreach ($act_weight_sorted as $act_sorted) {

            ?>
            <div class="act-cat-scop">
              <img src="<?php print $act_sorted['img_uri']?>"
                   alt="<?php print $act_sorted['img_alt_text']?>"
                   class="act-cat-vign-img"
              />
              <div class="act-cat-datas-container">
                <h3 class="act-cat-stick-title"><?php print $act_sorted['title'] ?></h3>
                <p class="act-cat-price"><?php print $act_sorted['price']?> <?php isset($act_sorted['price']) ? print "€" : ""; ?></p>
                <a href="<?php print ($bool_is_intermediate_page == 1) ? $act_sorted['intermediate_path'] : $act_sorted['path'] ?>" class="act-cat-readmore"></a>
              </div>
            </div>
            <?php
          }
        }
        ?>
      </div>
    </div>
  </div>
  <?php
}
?>
