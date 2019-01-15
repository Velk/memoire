<?php

/* Define pages intended to contain filters */

// Get every terms in the taxonomy vocabulary activity_categories
$vocabulary_act_cat = taxonomy_vocabulary_machine_name_load('activity_categories');
$terms_act_cat = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary_act_cat->vid));

$array_tid_filters_pages = array();

// Browse each term in order to retrieve the tid of the term wished
foreach ($terms_act_cat as $term_act_cat){

    if(
        $term_act_cat->name == "EVG (Enterrements de vie de garçon)" ||
        $term_act_cat->name == "EVJF (Enterrements de vie de jeune fille)"
    ){
        // Set the tid for the special pages containing filters
        $array_tid_filters_pages[$term_act_cat->tid] = array('tid' => $term_act_cat->tid);
    }
}

$isSpecialPageWithFilters = false;

foreach ($array_tid_filters_pages as $array_tid_filters_page) {
    // Check if the page is a special page
    if (current_path() == "taxonomy/term/" . $array_tid_filters_page["tid"]) {
        $isSpecialPageWithFilters = true;
    }
}
?>

<?php
if($isSpecialPageWithFilters){
 ?>
        <?php
        /* Special : With filters */
        global $base_url;
        if (!empty($content['field_category_activities_img'])) {
            $img_head_url = file_create_url($content['field_category_activities_img']['#items'][0]['file']->uri);
        }
        $tid = key(taxonomy_get_term_by_name($term_name));
        $nids = taxonomy_select_nodes($tid, FALSE);
        $vocabulary = taxonomy_vocabulary_machine_name_load('activite');
        $v_activities = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));

        $nb_act = count($v_activities);
        $activities = array();
        $count = 0;
        for ($i = 0; $count < $nb_act; $i++) {
            if (!empty($v_activities[$i])){
                if ($v_activities[$i]->weight == $count) {
                    $activities[$i] = $v_activities[$i];
                    $count++;
                    $i = 0;
                }
            }
        }

        $cnt = array();
        foreach ($nids as $nid) {
            $node = node_load($nid);
            foreach($node->field_acti_cont_cat['und'] as $cat) {
                $img_url = file_create_url($node->field_img_activite['und']['0']['uri']);
                $cnt[$cat['tid']][$node->vid] = array(
                    'title' => $node->field_activity_title['und']['0']['value'],
                    'img_name' => $node->field_img_activite['und']['0']['filename'],
                    'img_uri' => $img_url,
                    'price' => $node->field_price_prestation['und']['0']['value'],
                    'node' => $node->vid,
                    'path' => $base_url."/".drupal_get_path_alias('node/'.$node->vid),
                );
            }
        }

        ?>
        <div id="act-cat">
            <div class="act-cat-head">
                <div id="act-cat-head-img-container">
                    <h2 class="act-cat-head-title"><?php print $content['field_category_activities_title']['#items'][0]['value']; ?></h2>
                    <?php if(!empty($content['field_category_activities_img'])): ?>
                        <img src="<?php print $img_head_url;?>"
                             alt="<?php print $content['field_category_activities_img']['#items'][0]['filename']?>"
                             class="act-cat-head-img"
                             style="width:100%;"
                        />
                    <?php endif; ?>
                </div>
                <div id="act-cat-head-desc">
                    <?php print $content['description']['#markup']; ?>
                </div>
            </div>
            <div id="act-cat-filters">
                <div class="act-cat-filter">
                    <p><i class="fa fa-th" aria-hidden="true"></i>Toutes nos Activités</p>
                </div>
                <?php
                foreach($activities as $activity){
                    if( isset( $cnt[$activity->tid] ) ) {
                        echo '<div class="act-cat-filter">';
                        switch ($activity->name) {
                            case "Activités de jour" :
                                print '<p><i class="fa fa-sun-o" aria-hidden="true"></i>' . $activity->name . '</p>';
                                break;
                            case "Activités de nuit" :
                                print '<p><i class="fa fa-moon-o" aria-hidden="true"></i>' . $activity->name . '</p>';
                                break;
                            case "Transferts" :
                                print '<p><i class="fa fa-bus" aria-hidden="true"></i>' . $activity->name . '</p>';
                                break;
                            case "Hébergements" :
                                print '<p><i class="fa fa-home" aria-hidden="true"></i>' . $activity->name . '</p>';
                                break;
                            case "Nos packs" :
                                print '<p><i class="fa fa-globe" aria-hidden="true"></i>' . $activity->name . '</p>';
                                break;
                        }
                        echo '</div>';
                    }
                }
                ?>
            </div>
            <div id="act-cat-main">
                <?php foreach($activities as $activity): ?>
                    <?php if( isset( $cnt[$activity->tid] ) ){ ?>
                        <div id="act-cat-<?php print $activity->tid ?>" class="act-cat-container">
                            <?php
                            switch($activity->name){
                                case "Activités de jour" :
                                    print '<h2><i class="fa fa-sun-o" aria-hidden="true"></i>' . $activity->name . '</h2>';
                                    break;
                                case "Activités de nuit" :
                                    print '<h2><i class="fa fa-moon-o" aria-hidden="true"></i>' . $activity->name . '</h2>';
                                    break;
                                case "Transferts" :
                                    print '<h2><i class="fa fa-bus" aria-hidden="true"></i>' . $activity->name . '</h2>';
                                    break;
                                case "Hébergements" :
                                    print '<h2><i class="fa fa-home" aria-hidden="true"></i>' . $activity->name . '</h2>';
                                    break;
                                case "Nos packs" :
                                    print '<h2><i class="fa fa-globe" aria-hidden="true"></i>' . $activity->name . '</h2>';
                                    break;
                            }
                            ?>
                            <div class="act-cat-activities-container">
                                <?php foreach ($cnt[$activity->tid] as $event): ?>
                                    <div class="act-cat-scop act-cat-scop-<?php print $activity->tid ?>">
                                        <img src="<?php print $event['img_uri']?>"
                                             alt="<?php print $event['img_name']?>"
                                             class="act-cat-vign-img"
                                        />
                                        <div class="act-cat-datas-container">
                                            <h3 class="act-cat-stick-title"><?php print $event['title'] ?></h3>
                                            <p class="act-cat-price"><?php print $event['price']?> <?php isset($event['price']) ? print "€" : ""; ?></p>
                                            <a href="<?php print $event['path']?>" class="act-cat-readmore"></a>
                                            <?php
                                            $query = db_select('node', 'n');
                                            $query->fields('n', array('nid', 'title'));
                                            $query->condition('n.type', 'activite', '=');
                                            $query->orderBy('n.title', 'asc');
                                            $query->distinct();
                                            $results = $query->execute();

                                            foreach( $results as $result ){

                                                if( $event['title'] == $result->title ){

                                                    $var = "category_" . $result->nid;

                                                    switch($$var){
                                                        case "0" :
                                                            $isCategory = false;
                                                            break;
                                                        case "1" :
                                                            $isCategory = true;
                                                            $color = "#F42C1C";
                                                            $text = "Volcan";
                                                            break;
                                                        case "2" :
                                                            $isCategory = true;
                                                            $color = "#F42C1C";
                                                            $text = "Aventure";
                                                            break;
                                                        case "3" :
                                                            $isCategory = true;
                                                            $color = "#046C5C";
                                                            $text = "Survie";
                                                            break;
                                                        case "4" :
                                                            $isCategory = true;
                                                            $color = "#046C5C";
                                                            $text = "Nature";
                                                            break;
                                                        case "5" :
                                                            $isCategory = true;
                                                            $color = "#6C3C5C";
                                                            $text = "EVG";
                                                            break;
                                                        case "6" :
                                                            $isCategory = true;
                                                            $color = "#EF648A";
                                                            $text = "EVJF";
                                                            break;
                                                        case "7" :
                                                            $isCategory = true;
                                                            $color = "#FC6404";
                                                            $text = "Team<br>Building";
                                                            break;
                                                        case "8" :
                                                            $isCategory = true;
                                                            $color = "#FC6404";
                                                            $text = "Anniversaire";
                                                            break;
                                                        case "9" :
                                                            $isCategory = true;
                                                            $color = "#FC6404";
                                                            $text = "Vie<br>étudiante";
                                                            break;
                                                        case "10" :
                                                            $isCategory = true;
                                                            $color = "#8CDCFB";
                                                            $text = "Mariage";
                                                            break;
                                                        case "11" :
                                                            $isCategory = true;
                                                            $color = "#8CDCFB";
                                                            $text = "Demande<br>en mariage";
                                                            break;
                                                    }

                                                    if( $isCategory ){

                                                        print "<div class='act-cat-banner-category' style='background-color:$color;'><p>" . $text . "</p></div>";
                                                    }
                                                }
                                            }
                                            ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    <?php } ?>
                <?php endforeach; ?>
            </div>
        </div>
<?php
}else{
?>
        <?php
        /* Page content */

        global $base_url;

        $activity_category_content = array();

        // Retrieve the fid (image ID) of the activity category
        $fid_activity_category = $content['field_category_activities_img']['#object']->field_category_activities_img[0]['fid'];

        if( isset($fid_activity_category) ){

            // Load image by its fid
            $file = file_load($fid_activity_category);
            $img_url_activity_category = file_create_url($file->uri);
        }

        $activity_category_content = array(
            'title' => $term_name,
            'img_alt_text' =>  $content['field_category_activities_img']['#object']->field_category_activities_img[0]['field_file_image_alt_text'],
            'img_uri' => $img_url_activity_category,
            'description' => $content['description']['#markup'],
        );

        // Retrieve the taxonomy ID
        $tid = key(taxonomy_get_term_by_name($term_name));

        // Retrieve an array containing nodes ID belonging to the activity category
        $nids = taxonomy_select_nodes($tid, FALSE);

        $activities_content = array();

        foreach ($nids as $nid) {

            // Retrieve all content of the node belonging to the activity category
            $node = node_load($nid);

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

        /* Get activities filters depending on activite taxonomy */
        $vocabulary = taxonomy_vocabulary_machine_name_load('activite');
        $v_activities = entity_load('taxonomy_term', FALSE, array('vid' => $vocabulary->vid));

        $nb_act = count($v_activities);
        $activities = array();
        $count = 0;
        for ($i = 0; $count < $nb_act; $i++) {
            if (!empty($v_activities[$i])){
                if ($v_activities[$i]->weight == $count) {
                    $activities[$i] = $v_activities[$i];
                    $count++;
                    $i = 0;
                }
            }
        }

        ?>
        <div id="act-cat">
            <div class="act-cat-head-head">
                <div id="act-cat-head-img-container">
                    <h2 class="act-cat-head-title"><?php print $activity_category_content['title']; ?></h2>
                    <?php if(!empty($activity_category_content['img_uri'])): ?>
                        <img src="<?php print $activity_category_content['img_uri'];?>"
                             alt="<?php print $activity_category_content['img_alt_text']?>"
                             class="act-cat-head-img"
                             style="width:100%;"
                        />
                    <?php endif; ?>
                </div>
                <div id="act-cat-head-desc">
                    <?php print $activity_category_content['description']; ?>
                </div>
            </div>
            <div id="act-cat-main">
                <div class="act-cat-activities-container">
                    <?php foreach ($activities_content as $activity_content): ?>
                        <div class="act-cat-scop">
                            <img src="<?php print $activity_content['img_uri']?>"
                                 alt="<?php print $activity_content['img_alt_text']?>"
                                 class="act-cat-vign-img"
                            />
                            <div class="act-cat-datas-container">
                                <h3 class="act-cat-stick-title"><?php print $activity_content['title'] ?></h3>
                                <p class="act-cat-price"><?php print $activity_content['price']?> <?php isset($activity_content['price']) ? print "€" : ""; ?></p>
                                <a href="<?php print $activity_content['path']?>" class="act-cat-readmore"></a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
<?php
}
?>



