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

  foreach ($entities as $entity) {

      foreach ($entity as $node){

          // Retrieve and set into array each node ID with type "activite"
          array_push($nids, $node->nid);
      }
  }

  $activities_count = [];

  for($i = 0 ; $i < count($nids) ; $i++){

    // Retrieve all content of the node belonging to the activity category
    $node = node_load($nids[$i]);

    $activity_image = field_get_items('node', $node, 'field_img_activite');

    $activities[strtolower($node->title)] = array(
      'title' => $node->title,
      'img_uri' => image_style_url("large", $activity_image[0]["uri"]),
      'intermediate_path' => $base_url . "/activites/" . drupal_encode_path($node->title),
    );
  }
?>

<div id="container">
    <?php
    if( isset($all_act_image) || isset($all_act_title) ){

        echo '<div id="img-container">';

        if( isset($all_act_image) ){
            echo '<img src="' . $all_act_image . '">';
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
    <div id="all-activities-main">
        <div class="all-activities-container">
            <?php
            foreach ($activities as $activity){
            ?>
                    <div class="all-act-scop" style="background-image:url('<?php print $activity['img_uri'] ?>'); background-size:cover;">
                        <div class="all-act-datas-container">
                            <h3 class="all-act-stick-title"><?php print $activity['title'] ?></h3>
                            <a href="<?php print $activity['intermediate_path'] ?>"
                               class="all-act-readmore"></a>
                        </div>
                    </div>
            <?php
            }
            ?>
        </div>
    </div>
</div>
