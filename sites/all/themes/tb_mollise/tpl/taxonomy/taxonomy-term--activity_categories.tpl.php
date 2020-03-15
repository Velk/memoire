<?php
global $base_url;
global $user;
module_load_include('inc', 'pathauto', 'pathauto');

//drupal_set_message("Page activity category (EVG, EVJF...)");

/* ------------------------------------- SPECIAL FILTERS & INTERMEDIATE PAGE ------------------------------------- */

// Get the current path of the page : taxonomy/term/[tid]
$current_path = current_path();
// Retrieve the tid
$taxonomy_tid = explode("taxonomy/term/", $current_path)[1];
// Retrieve an array containing nodes ID belonging to the activity category
$nids = taxonomy_select_nodes($taxonomy_tid, FALSE);

// Retrieve the boolean value of special filters
$bool_is_special_filters = $content['field_is_special_filters']['#items'][0]['value'];
// Retrieve the boolean value of intermediate page
$bool_is_intermediate_page = $content['field_is_intermediate_page']['#items'][0]['value'];

/* -------------------------------------------------- CONTENT -------------------------------------------------- */

if (!empty($content['field_category_activities_img'])) {
  $img_head_url = file_create_url($content['field_category_activities_img']['#items'][0]['file']->uri);
}

$array_activity_types = array();
$cnt = array();

foreach ($nids as $nid) {

  $node = node_load($nid);

  if($bool_is_special_filters == 1){ // Get the activity type filters are enabled

    $activity_type_field = field_get_items('node', $node, 'field_acti_cont_cat');
    $activity_type = $activity_type_field[0]["tid"];

    if(!in_array($activity_type, $array_activity_types) && !empty($activity_type)){
      array_push($array_activity_types, $activity_type);
    }
  }

  $activity_tid_field = field_get_items('node', $node, 'field_acti_cont_cat');
  $activity_tid = $activity_tid_field[0]["tid"];

  $activity_price_field = field_get_items('node', $node, 'field_price_prestation');
  $activity_price = $activity_price_field[0]["value"];

  $activity_weight_field = field_get_items('node', $node, 'field_weight');
  $activity_weight = ( empty($activity_weight_field[0]["value"]) ) ? 0 : $activity_weight_field[0]["value"];

  $activity_image = field_get_items('node', $node, 'field_img_activite');

  $cnt[$activity_tid][$node->title] = array(
    'title' => $node->title,
    'img_uri' => image_style_url("large", $activity_image[0]["uri"]),
    'price' => $activity_price,
    'path' => $base_url . "/" . drupal_get_path_alias('node/' . $node->vid),
    'intermediate_path' => $base_url . "/activites/" . drupal_encode_path($node->title) . "?category=" . $tid,
  );
}

// Order filters
$ordered_activity_categories = array();

foreach ($array_activity_types as $activity_type){

  $taxonomy = taxonomy_term_load($activity_type);

  $ordered_activity_categories[$taxonomy->weight] = $activity_type;
}

ksort($ordered_activity_categories);
?>

<div id="act-cat">
  <div class="act-cat-head">
    <?php
    if( isset($img_head_url) || isset($content['field_category_activities_title']['#items'][0]['value']) ){

      $image_style = "";
      if(isset($img_head_url)){
        $image_style = "style=\"background-image:url(" . $img_head_url . "); background-size:cover;background-position:center;\"";
      }

      echo '<div id="act-cat-head-img-container" ' . $image_style .'>';

      if( isset($img_head_url) ){
        echo '<div id="memory-img-filter"></div>';
      }
      if( isset($content['field_category_activities_title']['#items'][0]['value']) ){
        echo '<h2 class="act-cat-head-title">' . $content['field_category_activities_title']['#items'][0]['value'] . '</h2>';
      }

      echo '</div>';
    }

    if( isset($content['description']['#markup']) ){
      echo
        '<div id="act-cat-head-desc">' .
        $content['description']['#markup'] .
        '</div>'
      ;
    }
    ?>
  </div>

  <?php if(sizeof($array_activity_types) != 0){ echo getSpecialFiltersHTML($ordered_activity_categories); } ?>

  <div id="act-cat-main">
    <?php
    if($bool_is_intermediate_page == 1){ // Intermediate page

      if($bool_is_special_filters == 1){ // Special filters
        echo getMainContentWithFilters($ordered_activity_categories, $cnt, $bool_is_intermediate_page);
      }else{ // Not special filters
        echo getMainContentWithoutFilters($cnt, $bool_is_intermediate_page);
      }
    }else{ //  Not intermediate page

      if($bool_is_special_filters == 1){ // Special filters
        echo getMainContentWithFilters($ordered_activity_categories, $cnt, $bool_is_intermediate_page);
      }else{ // Not special filters
        echo getMainContentWithoutFilters($cnt, $bool_is_intermediate_page);
      }
    } ?>
  </div>
</div>

<?php
// Get the HTML structure of the main content with filter categories
function getMainContentWithFilters($ordered_activity_categories, $cnt, $bool_is_intermediate_page){

  $main_content = "";

  foreach($ordered_activity_categories as $activity_category):

    if( isset( $cnt[$activity_category] ) ){

      $main_content .=
        "<div id=\"act-cat-" . $activity_category . "\" class=\"act-cat-container\">" .
        getCategoriesHTML($activity_category) .
        "<div class=\"act-cat-activities-container\">";

          // Sort array by activity name
          ksort($cnt[$activity_category]);

          foreach ($cnt[$activity_category] as $cnt_act_sorted){

            $main_content .=
              "<div class=\"act-cat-scop act-cat-scop-" . $activity_category . "\" style=\"background-image:url('" . $cnt_act_sorted['img_uri'] . "'); background-size:cover;background-position:center;\">" .
                "<div class=\"act-cat-datas-container\">" .
                  "<h3 class=\"act-cat-stick-title\">" . $cnt_act_sorted['title'] . "</h3>" .
                  "<p class=\"act-cat-price\">" . $cnt_act_sorted['price'] . (isset($cnt_act_sorted['price']) ? ' €' : '') . "</p>" .
                  "<a href=\"" . (($bool_is_intermediate_page == 1) ? $cnt_act_sorted['intermediate_path'] : $cnt_act_sorted['path']) . "\" class=\"act-cat-readmore\"></a>" .
                "</div>" .
              "</div>"
            ;
          }
      $main_content .=
        "</div>" .
      "</div>"
      ;
    }
  endforeach;

  return $main_content;
}

// Get the HTML structure of the main content without filter categories
function getMainContentWithoutFilters($cnt, $bool_is_intermediate_page){

  // Sort array by activity weight
  ksort($cnt);

  $main_content = "<div class=\"act-cat-activities-container\">";

  foreach ($cnt as $act_weight_sorted){

    // Sort array by activity name
    ksort($act_weight_sorted);

    foreach ($act_weight_sorted as $act_sorted) {

      $main_content .=
        "<div class=\"act-cat-scop\" style=\"background-image:url('" . $act_sorted['img_uri'] . "'); background-size:cover;background-position:center;\">" .
          "<div class=\"act-cat-datas-container\">" .
            "<h3 class=\"act-cat-stick-title\">" . $act_sorted['title'] . "</h3>" .
            "<p class=\"act-cat-price\">" . $act_sorted['price'] . (isset($act_sorted['price']) ? ' €' : '') . "</p>" .
            "<a href=\"" . (($bool_is_intermediate_page == 1) ? $act_sorted['intermediate_path'] : $act_sorted['path']) . "\" class=\"act-cat-readmore\"></a>" .
          "</div>" .
        "</div>"
      ;
    }
  }

  $main_content .= "</div>";

  return $main_content;
}

// Get category
function getCategoriesHTML($activity_category){

  $taxonomy = taxonomy_term_load($activity_category);

  switch ($taxonomy->name){
    case "Activités de jour" :
      $icon = "fa-sun-o";
      break;
    case "Activités de nuit" :
      $icon = "fa-moon-o";
      break;
    case "Transferts" :
      $icon = "fa-bus";
      break;
    case "Hébergements" :
      $icon = "fa-home";
      break;
    case "Nos packs" :
      $icon = "fa-globe";
      break;
  }

  $category_structure =
    "<h2>" .
      "<i class=\"fa " . $icon . "\" aria-hidden=\"true\"></i>" .
      $taxonomy->name .
    "</h2>"
  ;

  return $category_structure;
}

// Get the HTML structure for special filters
function getSpecialFiltersHTML($ordered_activity_categories){

  // HTML Structure of filters
  $filter_structure =
    "<div id=\"act-cat-filters\">" .
      "<div class=\"act-cat-filter\">" .
        "<p><i class=\"fa fa-th\" aria-hidden=\"true\"></i>Toutes nos Activités</p>" .
      "</div>"
  ;

  foreach ($ordered_activity_categories as $filter){

    $taxonomy = taxonomy_term_load($filter);

    switch ($taxonomy->name){
      case "Activités de jour" :
        $icon = "fa-sun-o";
        break;
      case "Activités de nuit" :
        $icon = "fa-moon-o";
        break;
      case "Transferts" :
        $icon = "fa-bus";
        break;
      case "Hébergements" :
        $icon = "fa-home";
        break;
      case "Nos packs" :
        $icon = "fa-globe";
        break;
    }

    $filter_structure .=
      "<div class=\"act-cat-filter\">" .
        "<p>" .
          "<i class=\"fa " . $icon . "\" aria-hidden=\"true\"></i>" .
          $taxonomy->name .
        "</p>" .
      "</div>"
    ;
  }

  $filter_structure .=
    "</div>"
  ;

  return $filter_structure;
}
?>
