<?php
  global $base_url;
  module_load_include('inc', 'pathauto', 'pathauto'); // Include pathauto to clean a string for use in URLs

//  drupal_set_message("\"Toutes nos activités\" page");

  /* ---------------- All activities page - Admin settings ---------------- */

  // $arrayName['image'] correspond to the fid
  // Load the file by its fid.
  // Create the URL file by using the file URI

  $file_all_act = file_load(variable_get("all_act_image"));
  $url_all_act = file_create_url($file_all_act->uri);
  $all_act_image = $url_all_act;

  $all_act_title = variable_get('all_act_title');

  $all_act_description_array = variable_get('all_act_description', array());
  $all_act_description = $all_act_description_array['value'];

  /* ---------------- All activities page - Activities ---------------- */

  /* Load taxonomy to get the destination of the activity */
  $vocabulary = taxonomy_vocabulary_machine_name_load('continent');
  $taxonomy_tree = taxonomy_get_tree($vocabulary->vid);

  $array_taxonomy_tree = array();
  foreach ($taxonomy_tree as $tax_tree){
      $array_taxonomy_tree[$tax_tree->tid]["tid"] = $tax_tree->tid;
      $array_taxonomy_tree[$tax_tree->tid]["name"] = $tax_tree->name;
      $array_taxonomy_tree[$tax_tree->tid]["path_alias"] = drupal_get_path_alias("taxonomy/term/".$tax_tree->tid);
  }

  /* Load node datas corresponding to activities */
  // Query to retrieve every node with the type "activite"
  $query = new EntityFieldQuery();
  $entities = $query->entityCondition('entity_type', 'node')
      ->propertyCondition('type', 'activite')
      ->propertyCondition('status', 1)
      ->propertyOrderBy('title', 'ASC')
      ->execute();

  // Array intended to contain every node ID
  $nids = [];
  $array_activity_types = array();

  foreach ($entities as $entity) {

      foreach ($entity as $node){

          // Retrieve and set into array each node ID with type "activite"
          array_push($nids, $node->nid);
      }
  }

  // Get max weight of each activities
  $activities_weight = array();
  foreach ($nids as $nid){
    $node = node_load($nid);

    $activity_weight_field = field_get_items('node', $node, 'field_weight');
    $activity_weight = ( empty($activity_weight_field[0]["value"]) ) ? 0 : $activity_weight_field[0]["value"];

    if(empty($activities_weight[$node->title]) || !isset($activities_weight[$node->title])){
      $activities_weight[$node->title] = intval($activity_weight);
    }else{
      if(intval($activity_weight) > $activities_weight[$node->title]){
        $activities_weight[$node->title] = intval($activity_weight);
      }
    }
  }

  $activities_count = [];

  for($i = 0 ; $i < count($nids) ; $i++){

    // Retrieve all content of the node belonging to the activity category
    $node = node_load($nids[$i]);

    // Add TID in order to display Filters
    $activity_type_field = field_get_items('node', $node, 'field_acti_cont_cat');
    $activity_type = $activity_type_field[0]["tid"];

    if(!in_array($activity_type, $array_activity_types) && !empty($activity_type)){
      array_push($array_activity_types, $activity_type);
    }

    $activity_tid_field = field_get_items('node', $node, 'field_acti_cont_cat');
    $activity_tid = $activity_tid_field[0]["tid"];

    // Image of activity
    //$activity_image = field_get_items('node', $node, 'field_img_activite');
    $file_ip_img = "";
    $intermediate_page_admin_config = variable_get("fieldset-" . pathauto_cleanstring($node->title), array());
    if($intermediate_page_admin_config["ip_image"] !== 0){ // Get the image for the intermediate page
      $file_ip_img = file_load($intermediate_page_admin_config['ip_image']);
    }

    // [$activity_weight]
    $activities[$activity_tid][$activities_weight[$node->title]][strtolower($node->title)] = array(
      'title' => $node->title,
//      'img_uri' => image_style_url("large", $activity_image[0]["uri"]),
      'img_uri' => image_style_url("large", $file_ip_img->uri),
      'intermediate_path' => $base_url . "/activites/" . drupal_encode_path($node->title),
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

<div id="container">
    <?php
    if( isset($all_act_image) || isset($all_act_title) ){

        $image_style = "";
        if(isset($all_act_image)){
          $image_style = "style=\"background-image:url(" . $all_act_image . "); background-size:cover;background-position:center;\"";
        }

        echo '<div id="img-container" ' . $image_style .'>';

        if( isset($all_act_image) ){
            echo '<div id="memory-img-filter"></div>';
        }
        if( isset($all_act_title) ){
            echo '<h2>' . $all_act_title . '</h2>';
        }

        echo '</div>';
    }

    if( isset($all_act_description) ){
        echo
            '<div id="description-container">' .
            $all_act_description .
            '</div>'
        ;
    }
    ?>

    <?php if(sizeof($array_activity_types) != 0){ echo getSpecialFiltersHTML($ordered_activity_categories); } ?>

    <div id="all-activities-main">

        <?php foreach($ordered_activity_categories as $activity_category): ?>
        <?php if( isset( $activities[$activity_category] ) ){ ?>
        <div id="act-cat-<?php print $activity_category ?>" class="act-cat-container">

          <?= getCategoriesHTML($activity_category); ?>

            <div class="all-activities-container">
                <?php
                // Sort array by activity weight
                krsort($activities[$activity_category], 6);

                foreach ($activities[$activity_category] as $act_weight_sorted) {

                  // Sort array by activity name
                  asort($act_weight_sorted);

                  foreach ($act_weight_sorted as $activity) {
                  ?>
                    <div class="all-act-scop"
                         style="background-image:url('<?php print $activity['img_uri'] ?>'); background-size:cover;background-position:center;">
                      <div class="all-act-datas-container">
                        <h3 class="all-act-stick-title"><?php print $activity['title'] ?></h3>
                        <a href="<?php print $activity['intermediate_path'] ?>"
                           class="all-act-readmore"></a>
                      </div>
                    </div>
                  <?php
                  }
                }
                ?>
            </div>
        </div>
        <?php }
        endforeach;?>
    </div>
</div>

<?php
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
