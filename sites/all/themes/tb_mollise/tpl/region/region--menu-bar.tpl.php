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
//    kpr($menu_activity);
?>
<div id="memory-menu">
    <?php foreach($main_menu as $menu): ?>

        <div class="memory-menu-tabs <?php ( $menu['identifier'] == "main-menu_connexion:node/13" || $menu['title'] == "Nous contacter" ) ? print 'menu-pos-right' : print '' ?>">
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
                                                        "<a href=" . strtolower(current_path()."/".$onlyOneCity[0]) . ">" .
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
                                                    <li><a href=<?php print strtolower(current_path()."/".$place[0]); ?>>- <?php print $place[0] ?></a></li>
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
            <?php elseif ($menu['identifier'] == "main-menu_sjours:node/4"): ?>
                <?php print '<li><a href="'.  $base_url .'/activite">' . $menu['title'] . '</a></li>'; ?>
                <div>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>
            <!-- End Activity menu part -->

            <!-- Connexion menu part -->
            <?php elseif ($menu['title'] == "Nous contacter"): ?>
                <?php print '<li><a href="'.  $base_url .'/contact"><i class="fa fa-envelope-o" aria-hidden="true"></i>' . $menu['title'] . ' <b>+33 (0)9 86 37 49 14</b></a></li>'; ?>
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
