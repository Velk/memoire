<?php
    $main_menu = menu_navigation_links('main-menu');

    global $base_url;

    /* Destinations tab */
    $vocabulary = taxonomy_vocabulary_machine_name_load('continent');
    $tree = taxonomy_get_tree($vocabulary->vid);

    $tab_continent = array();
    $tab_pays = array();
    $tab_ville = array();
    foreach ($tree as $term) {
        if($term->depth === 0) {
            $tab_continent[$term->tid] = array($term->name,$term->tid,);
        } elseif($term->depth === 1) {
            $tab_pays[$term->tid] = array($term->name,$term->tid,$term->parents[0]);
        } elseif($term->depth === 2) {
            $tab_ville[$term->tid] = array($term->name,$term->tid,$term->parents[0]);
        }
    }

    asort($tab_continent);
    asort($tab_pays);
    asort($tab_ville);

    foreach ($tab_ville as $city) {
        $tab_pays[$city[2]]['city'][] = array($city[0], $city[1]);
    }
    foreach ($tab_pays as $country) {
        if (!empty($country['city'])) {
            $tab_continent[$country[2]]['country'][] = array($country[0], $country[1], $country['city']);
        } else {
            $tab_continent[$country[2]]['country'][] = array($country[0], $country[1]);
        }
    }

    /* Activities tab */
    $vocabulary_category_activities = taxonomy_vocabulary_machine_name_load('activity_categories');
    $tree_category_activities = taxonomy_get_tree($vocabulary_category_activities->vid);

    $tab_global_categories = array();
    $tab_categories = array();

    foreach ($tree_category_activities as $term_category_activities) {
        if($term_category_activities->depth === 0) {
            $tab_global_categories[$term_category_activities->tid] = array($term_category_activities->name,$term_category_activities->tid,);
        } elseif($term_category_activities->depth === 1) {
            $tab_categories[$term_category_activities->tid] = array($term_category_activities->name,$term_category_activities->tid,$term_category_activities->parents[0]);
        }
    }

    asort($tab_global_categories);
    asort($tab_categories);

    foreach ($tab_categories as $categories) {

        // Load taxonomy term datas
        $datas_category = taxonomy_term_load($categories[1]);

        $url_category = drupal_get_path_alias("taxonomy/term/" . $datas_category->tid);

        $tab_global_categories[$categories[2]]['category'][] = array($categories[0], $categories[1], $url_category);
    }

    foreach ($tab_global_categories as $global_category){

        // Load taxonomy term datas
        $datas_global_category = taxonomy_term_load($global_category[1]);

        // Retrieve the fid (image ID) of the global category
        $activity_image_field = field_get_items('taxonomy_term', $datas_global_category, 'field_category_activities_img');
        $activity_image_field_ip_img = file_load($activity_image_field[0]["fid"]);
        $activity_image = image_style_url("large", $activity_image_field_ip_img->uri);

        if( !empty($activity_image) ){

            // Set the url of the image in the array
            $tab_global_categories[$global_category[1]]['img_url'] = $activity_image;
        }
    }

// Retrieve automatically the user location by his IP Address
function getRealIpAddress()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
        $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
        $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$user_ip = getRealIpAddress();

$ip_data = @json_decode(file_get_contents("http://www.geoplugin.net/json.gp?ip=".$user_ip));

if($ip_data && $ip_data->geoplugin_countryName != null){

    // To allow getting phone number by user IP address
    $user_location['country'] = strtolower($ip_data->geoplugin_countryCode); // Uncomment this line
//    $user_location['country'] = ""; // Comment this line

    $user_location['city'] = $ip_data->geoplugin_city;
}
?>

<?php
/* PHONE */

// Function countries_list() is declare in memory_phone.module
$array_countries = countries_list();

$countries_phone_datas = array();

$countries_container = variable_get('countries_container', array());

foreach ($array_countries as $country){

//        $country_datas = variable_get("countries_list_" . $country["id"], array());

  if(!empty($countries_container['countries_list_' . $country["id"]]['index']) && !empty($countries_container['countries_list_' . $country["id"]]['phone_number'])){

//            drupal_set_message("Country ID : " . $country["id"] . " - Index : " . $country_datas["index"] . " - Phone number : " . $country_datas["phone_number"]);
    $countries_phone_datas[$country["id"]]["id"] = $country["id"];
    $countries_phone_datas[$country["id"]]["index"] = $countries_container['countries_list_' . $country["id"]]["index"];
    $countries_phone_datas[$country["id"]]["phone_number"] = $countries_container['countries_list_' . $country["id"]]["phone_number"];
  }
}
?>
<div id="memory-menu-responsive"><i class="fa fa-bars" aria-hidden="true"></i></div>
<div id="memory-menu">
  <div>
    <?php foreach($main_menu as $menu): ?>

        <div class="memory-menu-tabs <?php ( $menu['identifier'] == "main-menu_connexion:node/13" || $menu['title'] == "Nous contacter" ) ? print 'menu-pos-right' : print '' ?> <?php ( $menu['title'] == "Nous contacter" ) ? print 'menu-contact-link' : print '' ?>">
            <!-- destination menu part -->
            <?php if($menu['identifier'] == "main-menu_destinations:destinations"): ?>
                <?php print '<li id="memory-menu-tab-destination"><a href="'.  $base_url .'/destinations">' . $menu['title'] . '</a></li>'; ?>
                <div id="destinations-menu">
                    <div>
                        <div id="memory-dest-tab-menu">
                            <div id="memory-dest-tab-menu-title">
                                <p>Nos destinations</p>
                            </div>
                            <div id="memory-dest-tab-menu-link">
                                <a href="<?php print $base_url; ?>/destinations">Toutes nos destinations</a>
                            </div>
                        </div>
                        <hr/>
                        <div id="destination-menu-container">
                          <?php foreach($tab_continent as $cont): ?>
                          <div class="continent-menu">
                              <h3><?php print $cont[0] ?></h3>
                              <?php if(!empty($cont['country'])): ?>
                                  <?php foreach($cont['country'] as $cntry): ?>
                                      <ul class="country-menu">
                                          <li>
                                              <?php if(!empty($cntry[2]) && count($cntry[2]) == 1){
                                                  foreach($cntry[2] as $onlyOneCity){

                                                      // Get dynamically the path alias when there is only 1 city
                                                      $destination_path_alias = drupal_get_path_alias("taxonomy/term/" . $onlyOneCity[1]);

                                                      print
                                                          "<a href=" . strtolower($base_url."/".$destination_path_alias) . ">" .
                                                          $cntry[0] . "<span>" . $onlyOneCity[0] . "</span>" .
                                                          "</a>"
                                                      ;
                                                  }
                                              }else{
                                                  print $cntry[0];
                                              } ?>
                                          </li>
                                          <?php if(!empty($cntry[2]) && count($cntry[2]) > 1): ?>
                                              <ul class="city-menu">
                                                  <?php foreach($cntry[2] as $place){

                                                      // Get dynamically the path alias when there is more than 1 city
                                                      $destination_path_alias = drupal_get_path_alias("taxonomy/term/" . $place[1]);

                                                      print
                                                          "<li>" .
                                                              "<a href=" . strtolower($base_url."/".$destination_path_alias) . ">" .
                                                                "<i class=\"fa fa-circle\" aria-hidden=\"true\"></i>" .
                                                                "<span>" . $place[0] . "</span>" .
                                                              "</a>" .
                                                          "</li>"
                                                      ;
                                                  } ?>
                                              </ul>
                                          <?php endif; ?>
                                      </ul>
                                  <?php endforeach; ?>
                              <?php endif; ?>
                          </div>
                          <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            <!-- End destination menu part -->

            <!-- Activity menu part -->
            <?php elseif ($menu['href'] == "activity-categories"): ?>
                    <?php print '<li id="memory-menu-tab-activity"><a href="'.  $base_url .'/activity-categories">' . $menu['title'] . '</a></li>'; ?>
                    <div id="activities-menu">
                        <div>
                            <div id="memory-act-tab-menu">
                                <div id="memory-act-tab-menu-title">
                                    <p>Nos activités</p>
                                </div>
                                <div id="memory-act-tab-menu-link">
                                    <a href="<?php print $base_url; ?>/activity-categories">Toutes nos activités</a>
                                </div>
                            </div>
                            <hr/>
                            <div id="activity-menu-container">
                                <?php
                                foreach($tab_global_categories as $global_category){
                                    // Load taxonomy term by its tid
                                    $tax_global_activity_category = taxonomy_term_load($global_category[1]);
                                ?>
                                    <div class="activity-menu">
                                        <?php if(!empty($global_category['img_url'])) :?>
                                            <div class="activity-categories-image">
                                                <img src="<?php print $global_category['img_url']; ?>" />
                                            </div>
                                        <?php endif; ?>
                                        <div class="activity-categories-content">
                                            <h3><?php print $tax_global_activity_category->field_category_activities_title['und'][0]['value'] ?></h3>
                                            <?php if(!empty($global_category['category'])): ?>
                                                <?php foreach($global_category['category'] as $category){
                                                    // Load taxonomy term by its tid
                                                    $tax_activity_category = taxonomy_term_load($category[1]);
                                                ?>
                                                    <ul class="activity-categories-menu">
                                                        <li>
                                                            <a href=<?php print $base_url . "/" . $category[2]; ?>>
                                                                <?php print $tax_activity_category->field_category_activities_title['und'][0]['value']; ?>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                <?php } ?>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php } ?>
                            </div>
                        </div>
                    </div>
            <!-- End destination menu part -->

            <!-- Connexion menu part -->
            <?php elseif ($menu['title'] == "Nous contacter"): ?>
            <div id="memory-contact-container">
                <div id="phone-datas-container">

                    <div id="other-countries">
                        <?php
                        $datas_default_country = array();

                        foreach ($countries_phone_datas as $country_phone_datas){

                            // If we can get user location
                            if(!empty($user_location["country"])){

                                if($country_phone_datas["id"] == $user_location["country"]){

                                    $datas_default_country = array(
                                        "id" =>$country_phone_datas["id"],
                                        "index" =>$country_phone_datas["index"],
                                        "phone_number" =>$country_phone_datas["phone_number"],
                                    );
                                }else{
                        ?>
                                    <div>
                                        <img src="<?php print $base_url . '/sites/default/files/flags/' . $country_phone_datas["id"] . '.png'; ?>"/>
                                        <p><?php print $country_phone_datas["index"] . " " . $country_phone_datas["phone_number"]; ?></p>
                                    </div>
                        <?php
                                }
                            // If we can't get the user location, set the default country first
                            }else{

                                if($country_phone_datas["id"] != variable_get('default_country')){
                        ?>
                                    <div>
                                        <img src="<?php print $base_url . '/sites/default/files/flags/' . $country_phone_datas["id"] . '.png'; ?>"/>
                                        <p><?php print $country_phone_datas["index"] . " " . $country_phone_datas["phone_number"]; ?></p>
                                    </div>
                        <?php
                                }else{
                                    $datas_default_country = array(
                                        "id" =>$country_phone_datas["id"],
                                        "index" =>$country_phone_datas["index"],
                                        "phone_number" =>$country_phone_datas["phone_number"],
                                    );
                                }
                            }
                        }
                        ?>
                    </div>
                    <div id="default-country" <?php print((sizeof($countries_phone_datas) > 1) ? "class=\"toggle-display-countries\"" : "")?>>
                        <img src="https://www.memoryvoyage.com/sites/default/files/icons_folder/telephone-of-old-design.png" class="memory-icons">
                        <img src="<?php print $base_url . '/sites/default/files/flags/' . $datas_default_country["id"] . '.png'; ?>"/>
                        <p><?php print $datas_default_country["index"] . " " . $datas_default_country["phone_number"]; ?></p>
                        <i class="fa fa-chevron-down" aria-hidden="true" <?php print((sizeof($countries_phone_datas) <= 1) ? "style='display:none;'" : "")?>></i>
                    </div>
                </div>
                <a href="<?php print $base_url . '/contact'; ?>" id="memory-contact-link">Besoin d’un conseil ?</a>
                <?php if(drupal_get_path_alias(current_path()) != "contact" && module_exists("memory_cart")){
                  echo
                    "<button type=\"button\" class=\"toggle-user-cart\" id=\"menu-tab-cart\">" .
                      "<i class=\"fa fa-shopping-cart\" aria-hidden=\"true\"></i>" .
                    "</button>"
                  ;

                } ?>
            </div>
            <!-- End Connexion menu part -->

            <!-- Connexion menu part -->
            <?php elseif ($menu['identifier'] == "main-menu_connexion:node/13"): ?>
                <?php print '<li><a href="'.  $base_url .'/connexion"><i class="fa fa-sign-in" aria-hidden="true"></i>' . $menu['title'] . '</a></li>'; ?>
            <!-- End Connexion menu part -->

            <?php else: ?>
                <?php print '<li><a href="'.  $base_url . '/' . drupal_get_path_alias($menu['href']) . '">' . $menu['title'] . '</a></li>'; ?>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
  </div>
</div>
