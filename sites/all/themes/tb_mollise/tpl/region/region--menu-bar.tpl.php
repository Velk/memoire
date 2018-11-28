<?php
    $main_menu = menu_navigation_links('main-menu');
    global $base_url;

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
    
    $menu_activity = variable_get('menu_activity', '');
    kpr($menu_activity);
?>
<div id="min-menu">
    <?php foreach($main_menu as $menu): ?>
        <div style="display: inline-block;margin-right: 15px;">

            <!-- destination menu part -->
            <?php if($menu['identifier'] == "main-menu_destinations:destinations"): ?>
                <?php print '<a href="'.  $base_url .'/destinations">' . $menu['title'] . '</a>'; ?>
                <div id="destinations-menu" style="display:none;">
                    <?php foreach($tab_continent as $cont): ?>
                        <div class="continent-menu">
                            <h3><?php print $cont[0] ?></h3>
                            <?php if(!empty($cont['country'])): ?>
                                <?php foreach($cont['country'] as $cntry): ?>
                                    <ul class="country-menu">
                                        <li><?php print $cntry[0] ?></li>
                                        <?php if(!empty($cntry[2])): ?>
                                            <ul class="city-menu">
                                                <?php foreach($cntry[2] as $place): ?>
                                                    <li><a href=<?php print strtolower(current_path()."/".$place[0]); ?>><?php print $place[0] ?></a></li>
                                                <?php endforeach; ?>
                                            </ul>
                                        <?php endif; ?>
                                    </ul>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </div>
                    <?php endforeach; ?>
                </div>
            <!-- End destination menu part -->

            <!-- Activity menu part -->
            <?php elseif ($menu['identifier'] == "main-menu_sjours:node/4"): ?>
                <div>
                    <?php print '<a href="'.  $base_url .'/activite">'. $menu['title'] . '</a>'; ?>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>

            <!-- End Activity menu part -->
            <?php else: ?>
                <?php print '<a href="'.  $base_url . '/' . drupal_get_path_alias($menu['href']) . '">' . $menu['title'] . '</a>'; ?>
            <?php endif; ?>
        </div>
    <?php endforeach; ?>
</div>
