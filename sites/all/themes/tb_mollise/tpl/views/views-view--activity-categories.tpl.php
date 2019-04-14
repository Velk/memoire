<?php
global $base_url;

// Include pathauto to clean a string for use in URLs
module_load_include('inc', 'pathauto', 'pathauto');

/* Load taxonomy to get the destination of the activity */
$vocabulary = taxonomy_vocabulary_machine_name_load('continent');
$taxonomy_tree = taxonomy_get_tree($vocabulary->vid);
//drupal_set_message("<pre>" . print_r($taxonomy_tree, true) . "</pre>");

$array_taxonomy_tree = array();
foreach ($taxonomy_tree as $tax_tree){
    $array_taxonomy_tree[$tax_tree->tid]["tid"] = $tax_tree->tid;
    $array_taxonomy_tree[$tax_tree->tid]["name"] = $tax_tree->name;
    $array_taxonomy_tree[$tax_tree->tid]["path_alias"] = drupal_get_path_alias("taxonomy/term/".$tax_tree->tid);
//    drupal_set_message("TID : " . $tax_tree->tid . " - Name : " . $tax_tree->name . " - Path : " . drupal_get_path_alias("taxonomy/term/".$tax_tree->tid));
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

//$activities_content = array();

$activities_count = [];

for($i = 0 ; $i < count($nids) ; $i++){

    // Retrieve all content of the node belonging to the activity category
    $node = node_load($nids[$i]);

//    drupal_set_message("<pre>" . print_r($node, true) . "</pre>");

    // Retrieve the fid (image ID) of the activity
    $fid_activity = $node->field_img_activite['und'][0]['fid'];

    if( isset($fid_activity) ){

        // Load image by its fid
        $file = file_load($fid_activity);
        $img_url_activity = file_create_url($file->uri);
    }

    // Clean the title of the node (activity) to use as a part of the URL
    $clean_string_to_url = pathauto_cleanstring($node->field_activity_title['und'][0]['value']);

    $activities_count[$node->field_activity_title['und'][0]['value']]["title"] = $node->field_activity_title['und'][0]['value'];
    $activities_count[$node->field_activity_title['und'][0]['value']]["count"] += 1;
    $activities_count[$node->field_activity_title['und'][0]['value']]["img_alt_text"] = $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'];
    $activities_count[$node->field_activity_title['und'][0]['value']]["img_uri"] = $img_url_activity;
    $activities_count[$node->field_activity_title['und'][0]['value']]["price"] = $node->field_price_prestation['und'][0]['value'];
    $activities_count[$node->field_activity_title['und'][0]['value']]["vid"] = $node->vid;
    $activities_count[$node->field_activity_title['und'][0]['value']]["path"] = $base_url."/".drupal_get_path_alias('node/'.$node->vid);
    $activities_count[$node->field_activity_title['und'][0]['value']]["destination"] = $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["name"];
    $activities_count[$node->field_activity_title['und'][0]['value']]["destination_path"] = $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["path_alias"];
    $activities_count[$node->field_activity_title['und'][0]['value']]["intermediate_path"] = $clean_string_to_url;

//    $activities_content[$node->field_activity_title['und'][0]['value']][$node->vid] = array(
//        'title' => $node->field_activity_title['und'][0]['value'],
//        'img_alt_text' => $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'],
//        'img_uri' => $img_url_activity,
//        'price' => $node->field_price_prestation['und'][0]['value'],
//        'vid' => $node->vid,
//        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
//        'destination' => $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["name"],
//        'destination_path' => $array_taxonomy_tree[$node->field_acti_content_desti['und'][0]['tid']]["path_alias"],
//    );
}

$maxThumbnailsToDisplay = (!empty($all_act_nb_thumbnails)) ? $all_act_nb_thumbnails : 20;
$maxThumbnailsCounter = 0;
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
            foreach ($activities_count as $activity_count){

                if( $maxThumbnailsCounter == $maxThumbnailsToDisplay){
                    break;
                }else {
            ?>
                    <div class="all-act-scop">
                        <img src="<?php print $activity_count['img_uri'] ?>"
                             alt="<?php print $activity_count['img_alt_text'] ?>"
                             class="all-act-vign-img"
                        />
                        <div class="all-act-datas-container">
                            <h3 class="all-act-stick-title"><?php print $activity_count['title'] ?></h3>
                            <a href="<?php print $base_url . "/activites/" . $activity_count['intermediate_path'] ?>"
                               class="all-act-readmore"></a>
                        </div>
                    </div>
            <?php
                }
                $maxThumbnailsCounter++;
            }
            ?>
        </div>
    </div>
</div>