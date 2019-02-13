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

        $uri_category = taxonomy_term_uri($datas_category);
        $url_category = url($uri_category["path"]);

        $tab_global_categories[$categories[2]]['category'][] = array($categories[0], $categories[1], $url_category);
    }

    foreach ($tab_global_categories as $global_category){

        // Load taxonomy term datas
        $datas_global_category = taxonomy_term_load($global_category[1]);

        // Retrieve the fid (image ID) of the global category
        $fid_global_category = $datas_global_category->field_category_activities_img['und'][0]['fid'];

        if( isset($fid_global_category) ){

            // Load image by its fid
            $file = file_load($fid_global_category);
            $img_url_global_category = file_create_url($file->uri);

            // Set the url of the image in the array
            $tab_global_categories[$global_category[1]]['img_url'] = $img_url_global_category;
        }
    }

//    drupal_set_message("<pre>" . print_r($main_menu, true) . "</pre>");

//    kpr($menu_activity);
?>
<div id="memory-menu">
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
                        <hr>
                        <?php foreach($tab_continent as $cont): ?>
                        <div class="continent-menu">
                            <h3><?php print $cont[0] ?></h3>
                            <?php if(!empty($cont['country'])): ?>
                                <?php foreach($cont['country'] as $cntry): ?>
                                    <ul class="country-menu">
                                        <li>
                                            <?php if(!empty($cntry[2]) && count($cntry[2]) == 1){
                                                foreach($cntry[2] as $onlyOneCity){
                                                    print
                                                        "<a href=" . strtolower($base_url."/destinations/".$onlyOneCity[0]) . ">" .
                                                        $cntry[0] . " - " . $onlyOneCity[0] .
                                                        "</a>"
                                                    ;
                                                }
                                            }else{
                                                print $cntry[0];
                                            } ?>
                                        </li>
                                        <?php if(!empty($cntry[2]) && count($cntry[2]) > 1): ?>
                                            <ul class="city-menu">
                                                <?php foreach($cntry[2] as $place): ?>
                                                    <li><a href=<?php print strtolower($base_url."/destinations/".$place[0]); ?>>- <?php print $place[0] ?></a></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>
                                    </ul>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            <!-- End destination menu part -->

            <!-- Activity menu part -->
            <?php elseif ($menu['href'] == "activity-categories"): ?>
                <?php
                if( in_array('administrator', $user->roles) ) {
                ?>
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
                            <hr>
                            <div id="activity-menu-container">
                                <?php
                                foreach($tab_global_categories as $global_category){
                                    // Load taxonomy term by its tid
                                    $tax_global_activity_category = taxonomy_term_load($global_category[1]);
//                                    drupal_set_message("<pre>" . print_r($tax_global_activity_category,true) . "</pre>");
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
                                                            <a href=<?php print strtolower($category[2]); ?>>
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
                <?php
                }
                ?>
            <!-- End destination menu part -->

            <!-- Connexion menu part -->
            <?php elseif ($menu['title'] == "Nous contacter"): ?>
                <?php print '<li><img src="'.  $base_url .'/sites/default/files/icons_folder/telephone-of-old-design.png" class="memory-icons"><b>+32 (0)484 403 663</b><a href="'.  $base_url .'/contact" id="memory-contact-link">Votre demande de devis</a></li>'; ?>
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
