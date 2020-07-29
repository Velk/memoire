<?php
    global $base_url;
    module_load_include('inc', 'pathauto', 'pathauto'); // Include pathauto to clean a string for use in URLs in order to compare with the current URL

//    drupal_set_message("Destinations page");

    if(isset($_GET["category"]) && !empty($_GET["category"])){ // Get category TID (EVG, EVJF...) coming from intermediate page
      $is_category_target = true;
    }

    if (!empty($content['field_dst_image'])) {
        $img_head_url = file_create_url($content['field_dst_image']['#items'][0]['uri']);
    }

    // Get the current path of the page : taxonomy/term/[tid]
    $current_path = current_path();
    // Retrieve the tid
    $taxonomy_tid = explode("taxonomy/term/", $current_path)[1];
    $nids = taxonomy_select_nodes($taxonomy_tid, FALSE);
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

    try {

      foreach ($nids as $nid) {

        $node = node_load($nid);

        $activity_category_field = field_get_items("node", $node, "field_activity_category");
        $is_node_to_display = false;

        if($is_category_target){ // Mean we need to filter by the activity category targeted (EVG, EVJF...)

          foreach ($activity_category_field as $activity_category){

            if($activity_category["tid"] == $_GET["category"]){
              $is_node_to_display = true;
            }
          }
        }else{
          $is_node_to_display = true;
        }

        if($is_node_to_display){

          $activity_tid_field = field_get_items('node', $node, 'field_acti_cont_cat');
          $activity_tid = $activity_tid_field[0]["tid"];

          $activity_weight_field = field_get_items('node', $node, 'field_weight');
          $activity_weight = ( empty($activity_weight_field[0]["value"]) ) ? 0 : $activity_weight_field[0]["value"];

          $activity_custom_title_field = field_get_items('node', $node, 'field_activity_title');
          $activity_custom_title = $activity_custom_title_field[0]["value"];

          $activity_family_field = field_get_items('node', $node, 'field_activity_family');
          $array_activity_family = array();
          foreach ($activity_family_field as $activity_family){

            if(!empty($activity_family)){
              $activity_family_term = taxonomy_term_load($activity_family["tid"]);

              $activity_family_color_field = field_get_items('taxonomy_term', $activity_family_term, 'field_color');
              $activity_family_color = $activity_family_color_field[0]["rgb"];

              $activity_family_font_color_field = field_get_items('taxonomy_term', $activity_family_term, 'field_font_color');
              $activity_family_font_color = $activity_family_font_color_field[0]["rgb"];

              array_push($array_activity_family, array(
                "name" => $activity_family_term->name,
                "color" => $activity_family_color,
                "font-color" => $activity_family_font_color,
              ));
            }
          }

          $activity_image = field_get_items('node', $node, 'field_img_activite');
          $activity_price = field_get_items('node', $node, 'field_price_prestation');

          // Set the category if exist in order to retrieve activities from the right category (EVG, EVJF...) in the switch activities button (previous, next)
          if(isset($_GET["category"]) && !empty($_GET["category"])){
            $redirection_path = $base_url . "/" . drupal_get_path_alias('node/'.$node->nid) . "?category=" . $_GET["category"];
          }else{
            $redirection_path = $base_url . "/" . drupal_get_path_alias('node/'.$node->nid);
          }

          $cnt[$activity_tid][$activity_weight][$node->nid] = array(
            'custom_title' => $activity_custom_title,
            'node_nid' => $node->nid,
            'path' => $redirection_path,
            'price' => $activity_price[0]["value"],
  //          'weight' => $activity_weight,
            'group_act_cat' => $activity_tid,
            'img_uri' => image_style_url("large", $activity_image[0]["uri"]),
            'img_name' => $activity_image[0]['filename'],
            'activity_family' => $array_activity_family,
          );
        }
      }
    } catch (Exception $e) {
      drupal_set_message("Exception reçue : " .  $e->getMessage());
    }
?>

<div id="memory-main">
      <?php
      if( isset($img_head_url) || isset($content['field_destination_title']['#items'][0]['value']) ){

        $image_style = "";
        if(isset($img_head_url)){
          $image_style = "style=\"background-image:url(" . $img_head_url . "); background-size:cover;background-position:center;\"";
        }

        echo '<div id="image-container" ' . $image_style .'>';

        if( isset($img_head_url) ){
          echo '<div id="image-filter"></div>';
        }
        if( isset($content['field_destination_title']['#items'][0]['value']) ){
          echo '<h1>' . $content['field_destination_title']['#items'][0]['value'] . '</h1>';
        }

        echo '</div>';
      }

      if( isset($content['description']['#markup']) ){
        echo
          '<div id="description-container">' .
          $content['description']['#markup'] .
          '</div>'
        ;
      }
      ?>

    <div id="memory-filters-container">
        <div class="memory-filter">
            <p><i class="fa fa-th" aria-hidden="true"></i>Toutes nos Activités</p>
        </div>
        <?php
        foreach($activities as $activity){
            if( isset( $cnt[$activity->tid] ) ) {
                echo '<div class="memory-filter filter-' . $activity->tid . '">';
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

    <div id="main-thumbnails">
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
                <div class="thumbnails-container-4x">
                    <?php
                    // Sort array by activity weight
                    krsort($cnt[$activity->tid], 6);

                    foreach ($cnt[$activity->tid] as $cnt_weight_sorted){

                      // Sort array by activity name
                      asort($cnt_weight_sorted);

                      foreach ($cnt_weight_sorted as $cnt_act_sorted) {
                      ?>
                        <div class="thumbnail-container cont-scop-<?php print $activity->tid ?>" style="background-image:url('<?php print $cnt_act_sorted['img_uri'] ?>'); background-size:cover;background-position:center;">

                          <div id="<?php print $cnt_act_sorted['node_nid'] ?>">
                            <input type="hidden" class="cont-act-nid" value="<?php print $cnt_act_sorted['node_nid'] ?>">
                            <input type="hidden" class="cont-act-cat" value="<?php print $cnt_act_sorted['group_act_cat'] ?>">
                            <h3 class="thumbnail-title"><?php print $cnt_act_sorted['custom_title'] ?></h3>
                            <p class="thumbnail-price"><?php print $cnt_act_sorted['price'] ?><?php isset($cnt_act_sorted['price']) ? print "€" : ""; ?></p>
                            <a href="<?php print $cnt_act_sorted['path'] ?>" class="thumbnail-link"></a>
                            <?php
                            if(sizeof($cnt_act_sorted["activity_family"]) !== 0){

                              echo "<div class='banner-category-container'>";

                              foreach ($cnt_act_sorted["activity_family"] as $family){

                                if(sizeof($family) !== 0){

                                  echo
                                    "<div class='banner-category' style='background-color:" . $family["color"] . ";'>" .
                                    "<p style='color:" . $family["font-color"] . "'>" . $family["name"] . "</p>" .
                                    "</div>"
                                  ;
                                }
                              }

                              echo "</div>";
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

