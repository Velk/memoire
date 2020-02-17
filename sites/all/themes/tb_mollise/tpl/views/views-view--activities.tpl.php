<?php
global $base_url;
module_load_include('inc', 'pathauto', 'pathauto'); // Include pathauto to clean a string for use in URLs in order to compare with the current URL

//drupal_set_message("Intermediate page");

// Retrieve the part of the URL corresponding to the title of the activity cleaned
$url_path = explode("activites/", current_path());
$url_activity_name = $url_path[1];

$ip_title = $url_activity_name;

$intermediate_page_admin_config = variable_get("fieldset_" . pathauto_cleanstring($url_activity_name), array());

if($intermediate_page_admin_config["ip_image"] !== 0){ // Get the image for the intermediate page
  $file_ip_img = file_load($intermediate_page_admin_config['ip_image']);
  $ip_img_url = file_create_url($file_ip_img->uri);
  $ip_image = $ip_img_url;
}

if(!empty($intermediate_page_admin_config["ip_description"]["value"])){ // Get the description for the intermediate page
  $ip_description = $intermediate_page_admin_config['ip_description']['value'];
}

// Get all activities with the same name
$query = db_select("node", "n");
$query->fields("n", array("nid", "title"))
  ->condition("n.type", "activite", "=")
  ->condition("n.title", $url_activity_name, "=")
  ->orderBy("n.nid", "asc");
$results = $query->execute();

$array_destination = array();

foreach ($results as $result) {

  // Load node
  $node = node_load($result->nid);

  $activity_destination_field = field_get_items('node', $node, 'field_acti_content_desti');

  // Get taxonomy (destination) data
  $taxonomy = taxonomy_term_load($activity_destination_field[0]["tid"]);

  $destination_image_field = field_get_items('taxonomy_term', $taxonomy, 'field_dst_image');
  $destination_image_field_ip_img = file_load($destination_image_field[0]["fid"]);
  $destination_image = file_create_url($destination_image_field_ip_img->uri);

  $array_destination[$node->nid]["nid"] = $node->nid;
  $array_destination[$node->nid]["destination_image"] = $destination_image;
  $array_destination[$node->nid]["destination_name"] = $taxonomy->name;
  $array_destination[$node->nid]["destination_path"] = drupal_get_path_alias("taxonomy/term/" . $activity_destination_field[0]["tid"]);
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
            <?php foreach ($array_destination as $activity_content){ ?>
                <div class="act-dest-scop">
                    <img src="<?php print $activity_content['destination_image']?>"
                         class="act-dest-vign-img"
                    />
                    <div class="act-dest-datas-container">
                        <h3 class="act-dest-stick-title"><?php print $activity_content['destination_name'] ?></h3>
                        <a href="<?php print $base_url . "/" . $activity_content['destination_path'] . "#" . $activity_content["nid"]; ?>" class="act-dest-readmore"></a>
                    </div>
                </div>
            <?php } ?>
        </div>
    </div>
</div>
