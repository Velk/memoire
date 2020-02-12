<?php
global $base_url;

// Include pathauto to clean a string for use in URLs in order to compare with the current URL
module_load_include('inc', 'pathauto', 'pathauto');

/* ---------------- Intermediate page - Admin settings ---------------- */

// Retrieve the part of the URL corresponding to the title of the activity cleaned
$url_path = explode("activites/", current_path())[1];
$url_path_cleaned = str_replace("-", "_", $url_path);

$query = db_select('node', 'n');
$query->fields('n', array('nid', 'title'));
$query->condition('n.type', 'activite', '=');
$query->orderBy('n.title', 'asc');
$query->distinct();
$results = $query->execute();

foreach( $results as $result ) {

  $cleaned_title = pathauto_cleanstring($result->title);

  // Each the URL path title match with the result title
  if( $url_path == $cleaned_title ){

    $intermediate_page = variable_get("fieldset_" . $cleaned_title, array());

    if($intermediate_page["ip_image"] !== 0){

      // $arrayName['image'] correspond to the fid
      // Load the file by its fid.
      // Create the URL file by using the file URI
      $file_ip_img = file_load($intermediate_page['ip_image']);
      $ip_img_url = file_create_url($file_ip_img->uri);
      $ip_image = $ip_img_url;

      $ip_title = $result->title;
    }

    if($intermediate_page["ip_description"]["value"] !== ""){

      $ip_description = $intermediate_page['ip_description']['value'];
    }
  }
}

/* ---------------- Intermediate page - Datas ---------------- */

/* -- Load taxonomy to get the destination of the activity -- */
$vocabulary = taxonomy_vocabulary_machine_name_load('continent');
$taxonomy_tree = taxonomy_get_tree($vocabulary->vid);

$array_taxonomy_tree = array();

foreach ($taxonomy_tree as $tax_tree){

    $tax_term = taxonomy_term_load($tax_tree->tid);

    // Load destination image by its fid
    $tax_term_img_fid = $tax_term->field_dst_image['und'][0]['fid'];
    if( isset($tax_term_img_fid) ){

        // Load image by its fid
        $file = file_load($tax_term_img_fid);
        $tax_term_img = file_create_url($file->uri);
    }

    $array_taxonomy_tree[$tax_term->tid]["tid"] = $tax_term->tid;
    $array_taxonomy_tree[$tax_term->tid]["name"] = $tax_term->name;
    $array_taxonomy_tree[$tax_term->tid]["path_alias"] = drupal_get_path_alias("taxonomy/term/".$tax_term->tid);
    $array_taxonomy_tree[$tax_term->tid]["image"] = $tax_term_img;
}

/* -- Load node datas corresponding to activities -- */
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

$activities_content = array();

for($i = 0 ; $i < count($nids) ; $i++){

    // Retrieve all content of the node belonging to the activity category
    $node = node_load($nids[$i]);

    // Retrieve the fid (image ID) of the activity
    $fid_activity = $node->field_img_activite['und'][0]['fid'];

    if( isset($fid_activity) ){

        // Load image by its fid
        $file = file_load($fid_activity);
        $img_url_activity = file_create_url($file->uri);
    }

    // Clean the title of the node (activity) to use as a part of the URL
    $clean_string_to_url = pathauto_cleanstring($node->field_activity_title['und'][0]['value']);

//    drupal_set_message("<pre>" . print_r($node, true) . "</pre>");

    $activities_content[$node->vid] = array(
        'title' => $node->field_activity_title['und'][0]['value'],
        'img_alt_text' => $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'],
        'img_uri' => $img_url_activity,
        'price' => $node->field_price_prestation['und'][0]['value'],
        'vid' => $node->vid,
        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
        'destination' => $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["name"],
        'destination_path' => $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["path_alias"],
        'destination_image' => $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["image"],
        'intermediate_path' => $clean_string_to_url,
    );
}
?>

<div id="container">
    <?php
    if( isset($ip_image) || isset($ip_title) ){

        echo '<div id="img-container">';

        if( isset($ip_image) ){
            echo '<img src="' . $ip_image . '">';
            echo '<div id="memory-img-filter"></div>';
        }
        if( isset($ip_title) ){
            echo '<h2>' . $ip_title . '</h2>';
        }

        echo '</div>';
    }

    if( isset($ip_description) ){
        echo
            '<div id="description-container">' .
            $ip_description .
            '</div>'
        ;
    }
    ?>
    <div id="act-dest-main">
        <div class="act-dest-container">
            <?php
            foreach ($activities_content as $activity_content){
                if($activity_content["intermediate_path"] == $url_path){
            ?>
                    <div class="act-dest-scop">
                        <img src="<?php print $activity_content['destination_image']?>"
                             class="act-dest-vign-img"
                        />
                        <div class="act-dest-datas-container">
                            <h3 class="act-dest-stick-title"><?php print $activity_content['destination'] ?></h3>
                            <a href="<?php print $base_url . "/" . $activity_content['destination_path'] . "#" . $url_path; ?>" class="act-dest-readmore"></a>
                        </div>
                    </div>
            <?php
                }
            }
            ?>
        </div>
    </div>
</div>
