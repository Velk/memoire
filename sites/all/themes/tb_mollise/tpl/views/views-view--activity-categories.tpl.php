<?php
global $base_url;

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

    $activities_content[$node->vid] = array(
        'title' => $node->field_activity_title['und'][0]['value'],
        'img_alt_text' => $node->field_img_activite['und'][0]['field_file_image_alt_text']['und'][0]['value'],
        'img_uri' => $img_url_activity,
        'price' => $node->field_price_prestation['und'][0]['value'],
        'vid' => $node->vid,
        'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
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
            <?php foreach ($activities_content as $activity_content): ?>
                <div class="all-act-scop">
                    <img src="<?php print $activity_content['img_uri']?>"
                         alt="<?php print $activity_content['img_alt_text']?>"
                         class="all-act-vign-img"
                    />
                    <div class="all-act-datas-container">
                        <h3 class="all-act-stick-title"><?php print $activity_content['title'] ?></h3>
                        <p class="all-act-price"><?php print $activity_content['price']?> <?php isset($activity_content['price']) ? print "€" : ""; ?></p>
                        <a href="<?php print $activity_content['path']?>" class="all-act-readmore"></a>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>