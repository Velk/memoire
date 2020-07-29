<?php
global $base_url;

//drupal_set_message("Activity page");

// Retrieve the part of the URL corresponding to the nid of the activity cleaned
$url_activity_nid = explode("node/", current_path())[1];

$node = node_load($url_activity_nid);

$destination_id = field_get_items("node", $node, "field_acti_content_desti")[0]["tid"];
$destination = taxonomy_term_load($destination_id);
$destination_name = $destination->name;

$destination_parent = taxonomy_get_parents($destination_id);
reset($destination_parent);
$destination_parent_name = $destination_parent[key($destination_parent)]->name;

/* ---------- FIELD - ACTIVITY BASIC INFORMATIONS ---------- */

// Retrieve the activity title
$title_field = field_get_items('node', $node, 'field_activity_title');
$title = $title_field[0]["value"];

// Retrieve the activity image
$image_uri = field_get_items('node', $node, 'field_img_activite');
$image = file_create_url($image_uri[0]["uri"]);

// Retrieve the activity description
$description_field = field_get_items('node', $node, 'body');
$description = $description_field[0]["safe_value"];

/* ---------- FIELD - ACTIVITY CATEGORY ---------- */

// Retrieve the activity category id
$activity_category_field = field_get_items('node', $node, 'field_acti_cont_cat');
$activity_category = $activity_category_field[0]["tid"];

/* ---------- FIELD - ACTIVITY DESTINATION ---------- */

// Retrieve the activity destination id
$activity_destination_field = field_get_items('node', $node, 'field_acti_content_desti');
$activity_destination = $activity_destination_field[0]["tid"];

/* ---------- FIELD - ACTIVITY MEMORY OPINION ---------- */

// Retrieve the activity memory opinion
$activity_memory_opinion_field = field_get_items('node', $node, 'field_memory_opinion');
$activity_memory_opinion = $activity_memory_opinion_field[0]["safe_value"];

/* ---------- FIELD - ACTIVITY BASIC PRESTATION ---------- */

// Retrieve the activity basic prestation title
$activity_basic_prest_title_field = field_get_items('node', $node, 'field_title_prestation_base');
$activity_basic_prest_title = $activity_basic_prest_title_field[0]["value"];

// Retrieve the activity basic prestation display type
$activity_basic_prest_display_type_field = field_get_items('node', $node, 'field_display_type_presta_base');
$activity_basic_prest_display_type = $activity_basic_prest_display_type_field[0]["value"];

// Retrieve the activity basic prestation display lock
$activity_basic_prest_display_lock_field = field_get_items('node', $node, 'field_fold_presta_base');
$activity_basic_prest_display_lock = $activity_basic_prest_display_lock_field[0]["value"];

// Retrieve the activity basic prestation quote
$activity_basic_prest_quote_field = field_get_items('node', $node, 'field_quote_prestation_base');
$activity_basic_prest_quote = $activity_basic_prest_quote_field[0]["value"];

// Retrieve the activity basic prestation image
$activity_basic_prest_image_field = field_get_items('node', $node, 'field_image_prestation_base');
$activity_basic_prest_image = (!empty($activity_basic_prest_image_field)) ? image_style_url("large", $activity_basic_prest_image_field[0]["uri"]) : null;

// Retrieve the activity basic prestation text
$activity_basic_prest_text_field = field_get_items('node', $node, 'field_text_prestation_base');
$activity_basic_prest_text = $activity_basic_prest_text_field[0]["value"];

// Retrieve the activity basic prestation price prefix
$activity_basic_prest_price_prefix_field = field_get_items('node', $node, 'field_price_prefix_prestation');
$activity_basic_prest_price_prefix = $activity_basic_prest_price_prefix_field[0]["value"];

// Retrieve the activity basic prestation price
$activity_basic_prest_price_field = field_get_items('node', $node, 'field_price_prestation');
$activity_basic_prest_price = $activity_basic_prest_price_field[0]["value"];

// Retrieve the activity basic prestation price precision
$activity_basic_prest_price_precision_field = field_get_items('node', $node, 'field_price_precision_prestation');
$activity_basic_prest_price_precision = $activity_basic_prest_price_precision_field[0]["value"];

// Retrieve the activity basic prestation duration
$activity_basic_prest_duration_field = field_get_items('node', $node, 'field_duration_prestation');
$activity_basic_prest_duration = $activity_basic_prest_duration_field[0]["value"];

// Retrieve the activity basic prestation group
$activity_basic_prest_group_field = field_get_items('node', $node, 'field_group_prestation');
$activity_basic_prest_group = $activity_basic_prest_group_field[0]["value"];

// Retrieve the activity basic prestation availability
$activity_basic_prest_availability_field = field_get_items('node', $node, 'field_availability_prestation');
$activity_basic_prest_availability = $activity_basic_prest_availability_field[0]["value"];

/* ---------- FIELD - ACTIVITY OPTIONS ---------- */

// Retrieve the activity options
$activity_options_field = field_get_items('node', $node, 'field_options');
$activity_options = array();

for($i = 0 ; $i < sizeof($activity_options_field) ; $i++){

  // Option display type
  $query_option_display_type = db_select('field_data_field_option_display_type', 'option_display_type');
  $query_option_display_type->fields('option_display_type', array('field_option_display_type_value'));
  $query_option_display_type->condition('option_display_type.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_display_type = $query_option_display_type->execute();

  foreach ($results_option_display_type as $result_option_display_type){
    $activity_options[$i]["display_type"] = $result_option_display_type->field_option_display_type_value;
  }

  // Option display lock
  $query_option_display_lock = db_select('field_data_field_fold', 'option_fold');
  $query_option_display_lock->fields('option_fold', array('field_fold_value'));
  $query_option_display_lock->condition('option_fold.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_display_lock = $query_option_display_lock->execute();

  foreach ($results_option_display_lock as $result_option_display_lock){
    $activity_options[$i]["display_lock"] = $result_option_display_lock->field_fold_value;
  }

  // Option title
  $query_option_title = db_select('field_data_field_titre_option', 'option_title');
  $query_option_title->fields('option_title', array('field_titre_option_value'));
  $query_option_title->condition('option_title.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_title = $query_option_title->execute();

  foreach ($results_option_title as $result_option_title){
    $activity_options[$i]["title"] = $result_option_title->field_titre_option_value;
  }

  // Option quote
  $query_option_quote = db_select('field_data_field_quote_option', 'option_quote');
  $query_option_quote->fields('option_quote', array('field_quote_option_value'));
  $query_option_quote->condition('option_quote.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_quote = $query_option_quote->execute();

  foreach ($results_option_quote as $result_option_quote){
    $activity_options[$i]["quote"] = $result_option_quote->field_quote_option_value;
  }

  // Option image
  $query_option_image = db_select('field_data_field_image_option', 'option_image');
  $query_option_image->fields('option_image', array('field_image_option_fid'));
  $query_option_image->condition('option_image.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_image = $query_option_image->execute();

  foreach ($results_option_image as $result_option_image){
    $activity_options[$i]["image"] = image_style_url("large", file_load($result_option_image->field_image_option_fid)->uri);
  }

  // Option text
  $query_option_text = db_select('field_data_field_texte_option', 'option_text');
  $query_option_text->fields('option_text', array('field_texte_option_value'));
  $query_option_text->condition('option_text.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_text = $query_option_text->execute();

  foreach ($results_option_text as $result_option_text){
    $activity_options[$i]["text"] = $result_option_text->field_texte_option_value;
  }

  // Option price prefix
  $query_option_price_prefix = db_select('field_data_field_option_price_prefix', 'option_price_prefix');
  $query_option_price_prefix->fields('option_price_prefix', array('field_option_price_prefix_value'));
  $query_option_price_prefix->condition('option_price_prefix.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_price_prefix = $query_option_price_prefix->execute();

  foreach ($results_option_price_prefix as $result_option_price_prefix){
    $activity_options[$i]["price_prefix"] = $result_option_price_prefix->field_option_price_prefix_value;
  }

  // Option price
  $query_option_price = db_select('field_data_field_prix_option', 'option_price');
  $query_option_price->fields('option_price', array('field_prix_option_value'));
  $query_option_price->condition('option_price.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_price = $query_option_price->execute();

  foreach ($results_option_price as $result_option_price){
    $activity_options[$i]["price"] = $result_option_price->field_prix_option_value;
  }

  // Option price precision
  $query_option_price_precision = db_select('field_data_field_option_price_precision', 'option_price_precision');
  $query_option_price_precision->fields('option_price_precision', array('field_option_price_precision_value'));
  $query_option_price_precision->condition('option_price_precision.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_price_precision = $query_option_price_precision->execute();

  foreach ($results_option_price_precision as $result_option_price_precision){
    $activity_options[$i]["price_precision"] = $result_option_price_precision->field_option_price_precision_value;
  }

  // Option duration
  $query_option_duration = db_select('field_data_field_duration', 'option_duration');
  $query_option_duration->fields('option_duration', array('field_duration_value'));
  $query_option_duration->condition('option_duration.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_duration = $query_option_duration->execute();

  foreach ($results_option_duration as $result_option_duration){
    $activity_options[$i]["duration"] = $result_option_duration->field_duration_value;
  }

  // Option group
  $query_option_group = db_select('field_data_field_group', 'option_group');
  $query_option_group->fields('option_group', array('field_group_value'));
  $query_option_group->condition('option_group.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_group = $query_option_group->execute();

  foreach ($results_option_group as $result_option_group){
    $activity_options[$i]["group"] = $result_option_group->field_group_value;
  }

  // Option availability
  $query_option_availability = db_select('field_data_field_availability', 'option_availability');
  $query_option_availability->fields('option_availability', array('field_availability_value'));
  $query_option_availability->condition('option_availability.entity_id', $activity_options_field[$i]["value"], '=');
  $results_option_availability = $query_option_availability->execute();

  foreach ($results_option_availability as $result_option_availability){
    $activity_options[$i]["availability"] = $result_option_availability->field_availability_value;
  }

}

/* ---------- FIELD - ACTIVITY CAROUSEL ---------- */

// Retrieve the activity carousel
$activity_carousel_field = field_get_items('node', $node, 'field_acti_carousel');
$activity_carousel_title = null;
$activity_carousel_images = array();

$query_carousel_title = db_select('field_data_field_slider_image_activity_titr', 'slider_title');
$query_carousel_title->fields('slider_title', array('field_slider_image_activity_titr_value'));
$query_carousel_title->condition('slider_title.entity_id', $activity_carousel_field[0]["value"], '=');
$results_carousel_title = $query_carousel_title->execute();

foreach ($results_carousel_title as $result_carousel_title){
  $activity_carousel_title = $result_carousel_title->field_slider_image_activity_titr_value;
}

$query_carousel_images_container = db_select('field_data_field_slider_image_activity_wrap', 'slider_image_container');
$query_carousel_images_container->fields('slider_image_container', array('field_slider_image_activity_wrap_value'));
$query_carousel_images_container->condition('slider_image_container.entity_id', $activity_carousel_field[0]["value"], '=');
$results_carousel_images_container = $query_carousel_images_container->execute();

$counter = 0;

foreach ($results_carousel_images_container as $result_carousel_images_container){

  // Image title
  $query_carousel_images_title = db_select('field_data_field_activity_slider_titre', 'slider_image_title');
  $query_carousel_images_title->fields('slider_image_title', array('field_activity_slider_titre_value'));
  $query_carousel_images_title->condition('slider_image_title.entity_id', $result_carousel_images_container->field_slider_image_activity_wrap_value, '=');
  $results_carousel_images_title = $query_carousel_images_title->execute();

  foreach ($results_carousel_images_title as $result_carousel_images_title){
    $activity_carousel_images[$counter]["title"] = $result_carousel_images_title->field_activity_slider_titre_value;
  }

  // Image fid
  $query_carousel_images_fid = db_select('field_data_field_activity_slider_image', 'slider_image_fid');
  $query_carousel_images_fid->fields('slider_image_fid', array('field_activity_slider_image_fid'));
  $query_carousel_images_fid->condition('slider_image_fid.entity_id', $result_carousel_images_container->field_slider_image_activity_wrap_value, '=');
  $results_carousel_images_fid = $query_carousel_images_fid->execute();

  foreach ($results_carousel_images_fid as $result_carousel_images_fid){
    $file_carousel_image = file_load($result_carousel_images_fid->field_activity_slider_image_fid);
    $uri_carousel_image = $file_carousel_image->uri;
    $activity_carousel_images[$counter]["image"] = file_create_url($uri_carousel_image);
  }

  $counter++;
}

/* ---------- FIELD - ACTIVITY FAMILY ---------- */

// Retrieve the activity family
$activity_family_field = field_get_items('node', $node, 'field_activity_category');
$activity_family = [];
foreach ($activity_family_field as $activity_family_iteration){
    array_push($activity_family, $activity_family_iteration);
}
?>

<div id="memory-main">
    <?php
    if( isset($image) || isset($title) ){

      $image_style = "";
      if(isset($image)){
        $image_style = "style=\"background-image:url(" . $image . "); background-size:cover;background-position:center;\"";
      }

      echo '<div id="image-container" ' . $image_style .'>';

      if( isset($image) ){
        echo '<div id="image-filter"></div>';
      }
      if( isset($title) ){
        echo '<h1>' . $title . '</h1>';
      }

      echo '</div>';
    }

    if( isset($description) ){
      echo
        '<div class="description-container">' .
          '<h2>DESCRIPTIF : </h2>' .
          '<div>' . $description . '</div>' .
        '</div>'
      ;
    }
    ?>
    <div id="activity-page-main">
        <div id="activity-prestations">
          <?php
          /* ------------------------------------------ BASIC ACTIVITY -----------------------------------------------*/

          $prestation_base_title = "";
          $prestation_base_display_type = ($activity_basic_prest_display_type == 1) ? "prestation-hide" : "prestation-show";
          $prestation_base_button_display_type = "";
          $prestation_base_display_lock = ($activity_basic_prest_display_lock == 1) ? true : false;
          $prestation_base_price = "";
          $prestation_base_quote = "";
          $prestation_base_image = "";
          $prestation_base_description = "";
          $prestation_base_details = "";

          if($activity_basic_prest_display_lock == 1) { // Lock

            $prestation_base_display_type = "prestation-show";
          }else{

            if( $activity_basic_prest_display_type == 1 )
              $prestation_base_button_display_type = "<button class=\"option-more\"><i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>Voir plus</button>";
            else
              $prestation_base_button_display_type = "<button class=\"option-less\"><i class=\"fa fa-caret-up\" aria-hidden=\"true\"></i>Voir moins</button>";
          }

          // Construct the section : Title
          if( !empty($activity_basic_prest_title) )
            $prestation_base_title = "<h2>" . $activity_basic_prest_title . "</h2>";

          // Construct the section : Price
          if(
            !empty($activity_basic_prest_price_prefix) ||
            !empty($activity_basic_prest_price) ||
            !empty($activity_basic_prest_price_precision)
          ){
            $prestation_base_price = "<div class=\"prestation-price-container\">";

            if(
              !empty($activity_basic_prest_price_prefix) ||
              !empty($activity_basic_prest_price)
            ){
              $prestation_base_price .= "<div class=\"prestation-price-first\">";

              if( !empty($activity_basic_prest_price_prefix) )
                $prestation_base_price =
                  $prestation_base_price .
                  "<p class=\"prestation-price-prefix\">" . $activity_basic_prest_price_prefix . "</p>";

              if( !empty($activity_basic_prest_price) )
                $prestation_base_price =
                  $prestation_base_price .
                  "<p class=\"prestation-price\">" . $activity_basic_prest_price . " €</p>" .
                  "<button class=\"cont-add-cart\" type=\"button\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\"></i></button>";

              $prestation_base_price .= "</div>";
            }

            if( !empty($activity_basic_prest_price_precision) )
              $prestation_base_price =
                $prestation_base_price .
                "<div class=\"prestation-price-second\">" .
                  "<p class=\"prestation-price-precision\">" . $activity_basic_prest_price_precision . "</p>" .
                "</div>";

            $prestation_base_price = $prestation_base_price . "</div>";
          }

          // Construct the section : Quote
          if( !empty($activity_basic_prest_quote) )
            $prestation_base_quote = "<p class=\"prestation-quote\">« " . $activity_basic_prest_quote . " »</p>";

          // Construct the section : Image
          if( !empty($activity_basic_prest_image) )
            $prestation_base_image =
              "<div class=\"prestation-image\" style=\"background-image: url(" . $activity_basic_prest_image . ")\"></div>";

          // Construct the section : Description
          if( !empty($activity_basic_prest_text) )
            $prestation_base_description = "<div class=\"prestation-description\">" . $activity_basic_prest_text . "</div>";

          // Construct the section : Details
          if(
            !empty($activity_basic_prest_duration) ||
            !empty($activity_basic_prest_group) ||
            !empty($activity_basic_prest_availability)
          ){
            $prestation_base_details = "<div class=\"prestation-details-container\">";

            if( !empty($activity_basic_prest_duration) )
              $prestation_base_details =
                $prestation_base_details .
                "<div class=\"prestation-detail\">" .
                  "<div class=\"activity-page-detail-label\">" .
                    "<i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>" .
                    "<h3>Durée totale de l'activité (transferts inclus) :</h3>" .
                  "</div>" .
                  "<p>" . $activity_basic_prest_duration . "</p>" .
                "</div>";

            if( !empty($activity_basic_prest_group) )
              $prestation_base_details =
                $prestation_base_details .
                "<div class=\"prestation-detail\">" .
                  "<div class=\"activity-page-detail-label\">" .
                    "<i class=\"fa fa-users\" aria-hidden=\"true\"></i>" .
                    "<h3>Groupe :</h3>" .
                  "</div>" .
                  "<p>" . $activity_basic_prest_group . "</p>" .
                "</div>";

            if( !empty($activity_basic_prest_availability) )
              $prestation_base_details =
                $prestation_base_details .
                "<div class=\"prestation-detail\">" .
                  "<div class=\"activity-page-detail-label\">" .
                    "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" .
                    "<h3>Période de validité :</h3>" .
                  "</div>" .
                  "<p>" . $activity_basic_prest_availability . "</p>" .
                "</div>";

            $prestation_base_details = $prestation_base_details . "</div>";
          }

          echo
            "<div class=\"activity-prestation-container\">" .
              "<div class=\"prestation-header\">" .
                "<div>" .
                  $prestation_base_title .
                  $prestation_base_quote .
                "</div>" .
                $prestation_base_price .
              "</div>" .
              "<div class=\"prestation-main " . $prestation_base_display_type . "\">" .
                "<hr/>" .
                "<div>" .
                  $prestation_base_image .
                  $prestation_base_description .
                "</div>" .
                $prestation_base_details .
              "</div>" .
              $prestation_base_button_display_type .
            "</div>"
          ;

          /* -------------------------------------------- OPTIONS ----------------------------------------------------*/
          if( sizeof($activity_options) != 0 ){
              for($i = 0 ; $i < sizeof($activity_options) ; $i++){

                  // Display LOCK equals TRUE means the option is show without any button to hide it
                  $prestation_display_lock = ($activity_options[$i]["display_lock"] == 1) ? true : false;
                  $prestation_display_type = ($activity_options[$i]["display_type"] == 1) ? "prestation-hide" : "prestation-show";
                  $prestation_button_display_type = "";
                  $prestation_title = "";
                  $prestation_price = "";
                  $prestation_quote = "";
                  $prestation_image = "";
                  $prestation_description = "";
                  $prestation_details = "";

                  if($activity_options[$i]["display_lock"] == 1){ // Lock

                    $prestation_display_type = "prestation-show";
                  }else{

                    if( $activity_options[$i]["display_type"] == 1 )
                      $prestation_button_display_type = "<button class=\"option-more\"><i class=\"fa fa-caret-down\" aria-hidden=\"true\"></i>Voir plus</button>";
                    else
                      $prestation_button_display_type = "<button class=\"option-less\"><i class=\"fa fa-caret-up\" aria-hidden=\"true\"></i>Voir moins</button>";
                  }

                  // Construct the section : Title
                  if( !empty($activity_options[$i]["title"]) )
                    $prestation_title = "<h2>" . $activity_options[$i]["title"] . "</h2>";

                  // Construct the section : Price
                  if(
                    !empty($activity_options[$i]["price_prefix"]) ||
                    !empty($activity_options[$i]["price"]) ||
                    !empty($activity_options[$i]["price_precision"])
                  ){
                    $prestation_price = "<div class=\"prestation-price-container\">";

                    if(
                      !empty($activity_options[$i]["price_prefix"]) ||
                      !empty($activity_options[$i]["price"])
                    ){
                      $prestation_price .= "<div class=\"prestation-price-first\">";

                      if( !empty($activity_options[$i]["price_prefix"]) )
                        $prestation_price =
                          $prestation_price .
                          "<p class=\"prestation-price-prefix\">" . $activity_options[$i]["price_prefix"] . "</p>";

                      if( !empty($activity_options[$i]["price"]) )
                        $prestation_price =
                          $prestation_price .
                          "<p class=\"prestation-price\">" . $activity_options[$i]["price"] . " €</p>" .
                          "<button class=\"cont-add-cart\" type=\"button\"><i class=\"fa fa-cart-plus\" aria-hidden=\"true\"></i></button>";

                      $prestation_price .= "</div>";
                    }

                    if( !empty($activity_options[$i]["price_precision"]) )
                      $prestation_price =
                        $prestation_price .
                        "<div class=\"prestation-price-second\">" .
                          "<p class=\"prestation-price-precision\">" . $activity_options[$i]["price_precision"] . "</p>" .
                        "</div>";

                    $prestation_price = $prestation_price . "</div>";
                  }

                  // Construct the section : Quote
                  if( !empty($activity_options[$i]["quote"]) )
                    $prestation_quote = "<p class=\"prestation-quote\">« " . $activity_options[$i]["quote"] . " »</p>";

                  // Construct the section : Image
                  if( !empty($activity_options[$i]["image"]) )
                    $prestation_image =
                      "<div class=\"prestation-image\" style=\"background-image: url(" . $activity_options[$i]["image"] . ")\"></div>";

                  // Construct the section : Description
                  if( !empty($activity_options[$i]["text"]) )
                    $prestation_description = "<div class=\"prestation-description\">" . $activity_options[$i]["text"] . "</div>";

                  // Construct the section : Details
                  if(
                    !empty($activity_options[$i]["duration"]) ||
                    !empty($activity_options[$i]["group"]) ||
                    !empty($activity_options[$i]["availability"])
                  ){
                    $prestation_details = "<div class=\"prestation-details-container\">";

                    if( !empty($activity_options[$i]["duration"]) )
                      $prestation_details =
                        $prestation_details .
                        "<div class=\"prestation-detail\">" .
                          "<div class=\"activity-page-detail-label\">" .
                            "<i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>" .
                            "<h3>Durée totale de l'activité (transferts inclus) :</h3>" .
                          "</div>" .
                          "<p>" . $activity_options[$i]["duration"] . "</p>" .
                        "</div>";

                    if( !empty($activity_options[$i]["group"]) )
                      $prestation_details =
                        $prestation_details .
                        "<div class=\"prestation-detail\">" .
                          "<div class=\"activity-page-detail-label\">" .
                            "<i class=\"fa fa-users\" aria-hidden=\"true\"></i>" .
                            "<h3>Groupe :</h3>" .
                          "</div>" .
                          "<p>" . $activity_options[$i]["group"] . "</p>" .
                        "</div>";

                    if( !empty($activity_options[$i]["availability"]) )
                      $prestation_details =
                        $prestation_details .
                        "<div class=\"prestation-detail\">" .
                          "<div class=\"activity-page-detail-label\">" .
                            "<i class=\"fa fa-calendar-o\" aria-hidden=\"true\"></i>" .
                            "<h3>Période de validité :</h3>" .
                          "</div>" .
                          "<p>" . $activity_options[$i]["availability"] . "</p>" .
                        "</div>";

                    $prestation_details = $prestation_details . "</div>";
                  }

                  echo
                    "<div class=\"activity-prestation-container\">" .
                      "<div class=\"prestation-header\">" .
                        "<div>" .
                          $prestation_title .
                          $prestation_quote .
                        "</div>" .
                        $prestation_price .
                      "</div>" .
                      "<div class=\"prestation-main " . $prestation_display_type . "\">" .
                        "<hr/>" .
                        "<div>" .
                          $prestation_image .
                          $prestation_description .
                        "</div>" .
                        $prestation_details .
                      "</div>" .
                      $prestation_button_display_type .
                    "</div>";
              }
          }
          ?>
        </div>
        <?php
        if( isset($activity_memory_opinion) ){
            echo
                '<div class="description-container">' .
                    '<h2>MOTS DE MEMORY :</h2>' .
                    '<div>' .
                    $activity_memory_opinion .
                    '</div>' .
                '</div>';
        }
        ?>
    </div>
<?php
if( sizeof($activity_carousel_images) != 0 ){

  $slider_activity = variable_get('slider_activity_page', array());

  $slider_height = (!empty($slider_activity["height"])) ? $slider_activity["height"] : 200;
  $slider_scroll_time_interval = (!empty($slider_activity["scroll_time_interval"])) ? $slider_activity["scroll_time_interval"] : 10000;

  // Pass variables to JS file
  drupal_add_js(
    array(
      'memory_blocks' => array(
        'slider_activity_page' => array(
          'scroll_time_interval' => $slider_scroll_time_interval
        )
      )
    ),
    array('type' => 'setting')
  );
?>
      <div id="carousel-container">
        <p style="font-size: 14px; color:#000; font-weight: bold; margin-bottom: 15px;">En image :</p>
        <div>
          <div id="carousel-slider" style="height:<?= $slider_height ?>px">
            <div>
            <?php
            for($i = 0 ; $i < (sizeof($activity_carousel_images)) ; $i++) {

              $image_class = ($i == 0) ? "active-slider-image" : "";
              $image_style = "style=\"background-image:url(" . $activity_carousel_images[$i]["image"] . "); background-size:cover;background-position:center;\"";

              echo
                "<div class=\"carousel-slider-item " . $image_class . "\" " . $image_style . " data-slider-image=\"" . $i . "\"></div>"
              ;
            }
            ?>
            </div>
          </div>
          <button class="carousel-button" id="carousel-button-prev" style="top:<?= $slider_height/2 ?>px">
            <i class="fa fa-chevron-left"></i>
          </button>
          <button class="carousel-button" id="carousel-button-next" style="top:<?= $slider_height/2 ?>px">
            <i class="fa fa-chevron-right"></i>
          </button>
          <div id="carousel-dots">
            <?php
            for($i = 0 ; $i < sizeof($activity_carousel_images) ; $i++) {

              $dotClass = ($i == 0) ? "fa-circle" : "fa-circle-thin";

              echo "<i class=\"fa " . $dotClass . "\" aria-hidden=\"true\" data-slider-image-dot=\"" . $i . "\"></i>";
            }
            ?>
          </div>
        </div>
      </div>
<?php
    }
    ?>
    <?php
    if( isset($activity_category) ){
        echo '<input type="hidden" class="activity-category" value="' . $activity_category . '">';
    }

    if( isset($url_activity_nid) ){
        echo '<input type="hidden" class="activity-nid" value="' . $url_activity_nid . '">';
    }

    if( isset($title) ){
        echo '<input type="hidden" class="activity-title" value="' . $title . '">';
    }

    if( isset($activity_destination) ){
        echo
          '<input type="hidden" class="activity-destination-path" value="' .
          $base_url . '/' . drupal_get_path_alias("taxonomy/term/" . $activity_destination) .
          '">'
        ;
    }

    if( isset($destination_parent_name) && isset($destination_parent) ){
        echo '<input type="hidden" class="destination-name" value="' . $destination_parent_name . "⫼" . $destination_name . '">';
    }
    ?>
</div>
