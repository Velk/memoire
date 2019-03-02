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
        $fid_global_category = $datas_global_category->field_category_activities_img['und'][0]['fid'];

        if( isset($fid_global_category) ){

            // Load image by its fid
            $file = file_load($fid_global_category);
            $img_url_global_category = file_create_url($file->uri);

            // Set the url of the image in the array
            $tab_global_categories[$global_category[1]]['img_url'] = $img_url_global_category;
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

    $user_location['country'] = $ip_data->geoplugin_countryCode;
    $user_location['city'] = $ip_data->geoplugin_city;
}
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

                                                    // Get dynamically the path alias when there is only 1 city
                                                    $destination_path_alias = drupal_get_path_alias("taxonomy/term/" . $onlyOneCity[1]);

                                                    print
                                                        "<a href=" . strtolower($base_url."/".$destination_path_alias) . ">" .
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
                                                <?php foreach($cntry[2] as $place){

                                                    // Get dynamically the path alias when there is more than 1 city
                                                    $destination_path_alias = drupal_get_path_alias("taxonomy/term/" . $place[1]);

                                                    print
                                                        "<li>" .
                                                            "<a href=" . strtolower($base_url."/".$destination_path_alias) . ">" .
                                                            "- " . $place[0] .
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

                                $country_ID = getCountryID($user_location["country"]);

                                if($country_phone_datas["id"] == $country_ID){

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

                                if($country_phone_datas["id"] != $default_country){
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
                    <div id="default-country">
                        <img src="<?php print $base_url . '/sites/default/files/flags/' . $datas_default_country["id"] . '.png'; ?>"/>
                        <p><?php print $datas_default_country["index"] . " " . $datas_default_country["phone_number"]; ?></p>
                        <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                </div>
                <a href="<?php print $base_url . '/contact'; ?>" id="memory-contact-link">Votre demande de devis</a>
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

<?php
function getCountryID($country){

    switch($country){
        case "Afghanistan" :
            return "af";
            break;
        case "Afrique du Sud" :
            return "za";
            break;
        case "Îles Åland" :
            return "ax";
            break;
        case "Albanie" :
            return "al";
            break;
        case "Algérie" :
            return "dz";
            break;
        case "Allemagne" :
            return "de";
            break;
        case "Andorre" :
            return "ad";
            break;
        case "Angleterre" :
            return "england";
            break;
        case "Angola" :
            return "ao";
            break;
        case "Anguilla" :
            return "ai";
            break;
        case "Antarctique" :
            return "aq";
            break;
        case "Antigua-et-Barbuda" :
            return "ag";
            break;
        case "Arabie saoudite" :
            return "sa";
            break;
        case "Argentine" :
            return "ar";
            break;
        case "Arménie" :
            return "am";
            break;
        case "Aruba" :
            return "aw";
            break;
        case "Australie" :
            return "au";
            break;
        case "Autriche" :
            return "at";
            break;
        case "Azerbaïdjan" :
            return "az";
            break;
        case "Bahamas" :
            return "bs";
            break;
        case "Bahreïn" :
            return "bh";
            break;
        case "Bangladesh" :
            return "bd";
            break;
        case "Barbade" :
            return "bb";
            break;
        case "Biélorussie" :
            return "by";
            break;
        case "Belgique" :
            return "be";
            break;
        case "Belize" :
            return "bz";
            break;
        case "Bénin" :
            return "bj";
            break;
        case "Bermudes" :
            return "bm";
            break;
        case "Bhoutan" :
            return "bt";
            break;
        case "Bolivie" :
            return "bo";
            break;
        case "Pays-Bas caribéens" :
            return "bq";
            break;
        case "Bosnie-Herzégovine" :
            return "ba";
            break;
        case "Botswana" :
            return "bw";
            break;
        case "Île Bouvet" :
            return "bv";
            break;
        case "Brésil" :
            return "br";
            break;
        case "Brunei" :
            return "bn";
            break;
        case "Bulgarie" :
            return "bg";
            break;
        case "Burkina Faso" :
            return "bf";
            break;
        case "Burundi" :
            return "bi";
            break;
        case "Îles Caïmans" :
            return "ky";
            break;
        case "Cambodge" :
            return "kh";
            break;
        case "Cameroun" :
            return "cm";
            break;
        case "Canada" :
            return "ca";
            break;
        case "Cap-Vert" :
            return "cv";
            break;
        case "République centrafricaine" :
            return "cf";
            break;
        case "Chili" :
            return "cl";
            break;
        case "Chine" :
            return "cn";
            break;
        case "Île Christmas" :
            return "cx";
            break;
        case "Chypre (pays)" :
            return "cy";
            break;
        case "Îles Cocos" :
            return "cc";
            break;
        case "Colombie" :
            return "co";
            break;
        case "Comores (pays)" :
            return "km";
            break;
        case "République du Congo" :
            return "cg";
            break;
        case "République démocratique du Congo" :
            return "cd";
            break;
        case "Îles Cook" :
            return "ck";
            break;
        case "Corée du Sud" :
            return "kr";
            break;
        case "Corée du Nord" :
            return "kp";
            break;
        case "Costa Rica" :
            return "cr";
            break;
        case "Côte d'Ivoire" :
            return "ci";
            break;
        case "Croatie" :
            return "hr";
            break;
        case "Cuba" :
            return "cu";
            break;
        case "Curaçao" :
            return "cw";
            break;
        case "Danemark" :
            return "dk";
            break;
        case "Djibouti" :
            return "dj";
            break;
        case "République dominicaine" :
            return "do";
            break;
        case "Dominique" :
            return "dm";
            break;
        case "Égypte" :
            return "eg";
            break;
        case "Salvador" :
            return "sv";
            break;
        case "Émirats arabes unis" :
            return "ae";
            break;
        case "Équateur (pays)" :
            return "ec";
            break;
        case "Érythrée" :
            return "er";
            break;
        case "Espagne" :
            return "es";
            break;
        case "Estonie" :
            return "ee";
            break;
        case "États-Unis" :
            return "us";
            break;
        case "USA" :
            return "us";
            break;
        case "Hawaii" :
            return "us";
            break;
        case "Hawaï" :
            return "us";
            break;
        case "Éthiopie" :
            return "et";
            break;
        case "Ethiopie" :
            return "et";
            break;
        case "Malouines" :
            return "fk";
            break;
        case "Îles Féroé" :
            return "fo";
            break;
        case "Fidji" :
            return "fj";
            break;
        case "Finlande" :
            return "fi";
            break;
        case "France" :
            return "fr";
            break;
        case "Gabon" :
            return "ga";
            break;
        case "Gambie" :
            return "gm";
            break;
        case "Géorgie (pays)" :
            return "ge";
            break;
        case "Géorgie du Sud-et-les îles Sandwich du Sud" :
            return "gs";
            break;
        case "Ghana" :
            return "gh";
            break;
        case "Gibraltar" :
            return "gi";
            break;
        case "Grèce" :
            return "gr";
            break;
        case "Grenade (pays)" :
            return "gd";
            break;
        case "Groenland" :
            return "gl";
            break;
        case "Guadeloupe" :
            return "gp";
            break;
        case "Guam" :
            return "gu";
            break;
        case "Guatemala" :
            return "gt";
            break;
        case "Guernesey" :
            return "gg";
            break;
        case "Guinée" :
            return "gn";
            break;
        case "Guinée-Bissau" :
            return "gw";
            break;
        case "Guinée équatoriale" :
            return "gq";
            break;
        case "Guyana" :
            return "gy";
            break;
        case "Guyane" :
            return "gf";
            break;
        case "Haïti" :
            return "ht";
            break;
        case "Îles Heard-et-MacDonald" :
            return "hm";
            break;
        case "Honduras" :
            return "hn";
            break;
        case "Hong Kong" :
            return "hk";
            break;
        case "Hongrie" :
            return "hu";
            break;
        case "Île de Man" :
            return "im";
            break;
        case "Îles mineures éloignées des États-Unis" :
            return "um";
            break;
        case "Îles Vierges britanniques" :
            return "vg";
            break;
        case "Îles Vierges des États-Unis" :
            return "vi";
            break;
        case "Inde" :
            return "in";
            break;
        case "Indonésie" :
            return "id";
            break;
        case "Iran" :
            return "ir";
            break;
        case "Irak" :
            return "iq";
            break;
        case "Irlande (pays)" :
            return "ie";
            break;
        case "Islande" :
            return "is";
            break;
        case "Israël" :
            return "il";
            break;
        case "Italie" :
            return "it";
            break;
        case "Jamaïque" :
            return "jm";
            break;
        case "Japon" :
            return "jp";
            break;
        case "Jersey" :
            return "je";
            break;
        case "Jordanie" :
            return "jo";
            break;
        case "Kazakhstan" :
            return "kz";
            break;
        case "Kenya" :
            return "ke";
            break;
        case "Kirghizistan" :
            return "kg";
            break;
        case "Kiribati" :
            return "ki";
            break;
        case "Koweït" :
            return "kw";
            break;
        case "Laos" :
            return "la";
            break;
        case "Lesotho" :
            return "ls";
            break;
        case "Lettonie" :
            return "lv";
            break;
        case "Liban" :
            return "lb";
            break;
        case "Liberia" :
            return "lr";
            break;
        case "Libye" :
            return "ly";
            break;
        case "Liechtenstein" :
            return "li";
            break;
        case "Lituanie" :
            return "lt";
            break;
        case "Luxembourg (pays)" :
            return "lu";
            break;
        case "Macao" :
            return "mo";
            break;
        case "République de Macédoine (pays)" :
            return "mk";
            break;
        case "Madagascar" :
            return "mg";
            break;
        case "Malaisie" :
            return "my";
            break;
        case "Malawi" :
            return "mw";
            break;
        case "Maldives" :
            return "mv";
            break;
        case "Mali" :
            return "ml";
            break;
        case "Malte" :
            return "mt";
            break;
        case "Îles Mariannes du Nord" :
            return "mp";
            break;
        case "Maroc" :
            return "ma";
            break;
        case "Îles Marshall (pays)" :
            return "mh";
            break;
        case "Martinique" :
            return "mq";
            break;
        case "Maurice (pays)" :
            return "mu";
            break;
        case "Mauritanie" :
            return "mr";
            break;
        case "Mayotte" :
            return "yt";
            break;
        case "Mexique" :
            return "mx";
            break;
        case "États fédérés de Micronésie (pays)" :
            return "fm";
            break;
        case "Moldavie" :
            return "md";
            break;
        case "Monaco" :
            return "mc";
            break;
        case "Mongolie" :
            return "mn";
            break;
        case "Monténégro" :
            return "me";
            break;
        case "Montserrat" :
            return "ms";
            break;
        case "Mozambique" :
            return "mz";
            break;
        case "Myanmar" :
            return "mm";
            break;
        case "Birmanie" :
            return "mm";
            break;
        case "Namibie" :
            return "na";
            break;
        case "Nauru" :
            return "nr";
            break;
        case "Népal" :
            return "np";
            break;
        case "Nicaragua" :
            return "ni";
            break;
        case "Niger" :
            return "ne";
            break;
        case "Nigeria" :
            return "ng";
            break;
        case "Niue" :
            return "nu";
            break;
        case "Île Norfolk" :
            return "nf";
            break;
        case "Norvège" :
            return "no";
            break;
        case "Nouvelle-Calédonie" :
            return "nc";
            break;
        case "Nouvelle-Zélande" :
            return "nz";
            break;
        case "Territoire britannique de l'océan Indien" :
            return "io";
            break;
        case "Oman" :
            return "om";
            break;
        case "Ouganda" :
            return "ug";
            break;
        case "Ouzbékistan" :
            return "uz";
            break;
        case "Pakistan" :
            return "pk";
            break;
        case "Palaos" :
            return "pw";
            break;
        case "Palestine" :
            return "ps";
            break;
        case "Panama" :
            return "pa";
            break;
        case "Papouasie-Nouvelle-Guinée" :
            return "pg";
            break;
        case "Paraguay" :
            return "py";
            break;
        case "Pays-Bas" :
            return "nl";
            break;
        case "Pérou" :
            return "pe";
            break;
        case "Philippines" :
            return "ph";
            break;
        case "Îles Pitcairn" :
            return "pn";
            break;
        case "Pologne" :
            return "pl";
            break;
        case "Polynésie française" :
            return "pf";
            break;
        case "Porto Rico" :
            return "pr";
            break;
        case "Portugal" :
            return "pt";
            break;
        case "Qatar" :
            return "qa";
            break;
        case "La Réunion" :
            return "re";
            break;
        case "Roumanie" :
            return "ro";
            break;
        case "Royaume-Uni" :
            return "gb";
            break;
        case "Russie" :
            return "ru";
            break;
        case "Rwanda" :
            return "rw";
            break;
        case "République arabe sahraouie démocratique" :
            return "eh";
            break;
        case "Saint-Barthélemy" :
            return "bl";
            break;
        case "Saint-Christophe-et-Niévès" :
            return "kn";
            break;
        case "Saint-Marin" :
            return "sm";
            break;
        case "Saint-Martin" :
            return "mf";
            break;
        case "Saint-Pierre-et-Miquelon" :
            return "pm";
            break;
        case "Saint-Siège (État de la Cité du Vatican)" :
            return "va";
            break;
        case "Saint-Vincent-et-les-Grenadines" :
            return "vc";
            break;
        case "Sainte-Hélène, Ascension et Tristan da Cunha" :
            return "sh";
            break;
        case "Sainte-Lucie" :
            return "lc";
            break;
        case "Salomon" :
            return "sb";
            break;
        case "Samoa" :
            return "ws";
            break;
        case "Samoa américaines" :
            return "as";
            break;
        case "Sao Tomé-et-Principe" :
            return "st";
            break;
        case "Sénégal" :
            return "sn";
            break;
        case "Serbie" :
            return "rs";
            break;
        case "Seychelles" :
            return "sc";
            break;
        case "Sierra Leone" :
            return "sl";
            break;
        case "Singapour" :
            return "sg";
            break;
        case "Slovaquie" :
            return "sk";
            break;
        case "Slovénie" :
            return "si";
            break;
        case "Somalie" :
            return "so";
            break;
        case "Soudan" :
            return "sd";
            break;
        case "Soudan du Sud" :
            return "ss";
            break;
        case "Sri Lanka" :
            return "lk";
            break;
        case "Suède" :
            return "se";
            break;
        case "Suisse" :
            return "ch";
            break;
        case "Suriname" :
            return "sr";
            break;
        case "Svalbard et ile Jan Mayen" :
            return "sj";
            break;
        case "Swaziland" :
            return "sz";
            break;
        case "Syrie" :
            return "sy";
            break;
        case "Tadjikistan" :
            return "tj";
            break;
        case "Taïwan / (République de Chine (Taïwan))" :
            return "tw";
            break;
        case "Tanzanie" :
            return "tz";
            break;
        case "Tchad" :
            return "td";
            break;
        case "Tchéquie" :
            return "cz";
            break;
        case "République Tchèque" :
            return "cz";
            break;
        case "Terres australes et antarctiques françaises" :
            return "tf";
            break;
        case "Thaïlande" :
            return "th";
            break;
        case "Timor oriental" :
            return "tl";
            break;
        case "Togo" :
            return "tg";
            break;
        case "Tokelau" :
            return "tk";
            break;
        case "Tonga" :
            return "to";
            break;
        case "Trinité-et-Tobago" :
            return "tt";
            break;
        case "Tunisie" :
            return "tn";
            break;
        case "Turkménistan" :
            return "tm";
            break;
        case "Îles Turques-et-Caïques" :
            return "tc";
            break;
        case "Turquie" :
            return "tr";
            break;
        case "Tuvalu" :
            return "tv";
            break;
        case "Ukraine" :
            return "ua";
            break;
        case "Uruguay" :
            return "uy";
            break;
        case "Vanuatu" :
            return "vu";
            break;
        case "Venezuela" :
            return "ve";
            break;
        case "Viêt Nam" :
            return "vn";
            break;
        case "Wallis-et-Futuna" :
            return "wf";
            break;
        case "Yémen" :
            return "ye";
            break;
        case "Zambie" :
            return "zm";
            break;
        case "Zimbabwe" :
            return "zw";
            break;
    }
}
?>