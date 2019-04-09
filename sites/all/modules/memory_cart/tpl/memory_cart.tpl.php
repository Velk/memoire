<?php
global $base_url;

/* Retrieve URL path to know if the current page is an activity or a destination */
$currentPathUrl = drupal_get_path_alias(current_path());
$arrayCurrentPathUrl = explode("/", $currentPathUrl);

$isActivityPage = ( sizeof($arrayCurrentPathUrl) == 3 ) ? true : false;
$isDestinationPage = ( sizeof($arrayCurrentPathUrl) == 2 ) ? true : false;


/* Retrieve activity categories */
$vocab_activity = taxonomy_vocabulary_machine_name_load('activite');
$vocab_activities_tree = taxonomy_get_tree($vocab_activity->vid);
$arrayFilters = [];

foreach ($vocab_activities_tree as $vocab_activity_tree){

    $arrayFilters[$vocab_activity_tree->name] = $vocab_activity_tree->tid;
}

?>
<button type="button" id="btn-display">
    <i class="fa fa-plus" id="icon-plus"></i>
    <i class="fa fa-minus" id="icon-minus"></i>
</button>
<div id="cart-container" class="<?php print ($isActivityPage)? 'activity-page' : ''; ?><?php print ($isDestinationPage)? 'destination-page' : ''; ?>">
    <h1>Mon voyage</h1>
    <form id="devis">
        <div id="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <input type="text" name="location"  placeholder="Lieu de départ">
        </div>
        <div id="date">
            <i class="fa fa-calendar-o" aria-hidden="true"></i>
            <input type="date" name="date"  placeholder="Date de départ">
        </div>
        <div id="participants">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="number" name="participants"  placeholder="Nombre de participants" min="1">
        </div>
        <div id="budget">
            <label>Budget par personne</label>
            <select name="budget">
                <option value="0">- de 100€</option>
                <option value="1">100-250€</option>
                <option value="2">250€-500€</option>
                <option value="3">500-750€</option>
                <option value="4">750€-1000€</option>
                <option value="5">1000-1500€</option>
                <option value="6">1500-2000€</option>
                <option value="7">+ de 2000€</option>
            </select>
        </div>
        <div id="transport">
            <label>Transport</label>
            <select name="transport">
                <option value="0">Oui, j’en ai besoin</option>
                <option value="1">Non je voyage par mes propres moyens</option>
                <option value="2">Je ne sais pas encore</option>
            </select>
        </div>
        <button type="reset" id="empty-cart">Vider le panier</button>
        <div id="trip">
            <?php
            for($i=1; $i <= 2 ; $i++){
            ?>
                <div class="trip-days">
                    <div class="trip-days-header">
                        <i class="fa fa-calendar-o" aria-hidden="true"></i>
                        <p>Journée n° <?php print $i; ?></p>
                    </div>
                    <div class="trip-days-details">
                        <div class="activities-container act-cont-<?php print $i; ?>">
                            <p class="default-message">Aucune activité choisie</p>
                        </div>
                        <div class="hosting-container hosting-cont-<?php print $i; ?>">
                            <p>Aucun hébergement</p>
                            <button type="button" class="filter-<?php print $arrayFilters['Hébergements']; ?>">VOIR HEBERGEMENTS</button>
                        </div>
                        <div class="transfer-container transfer-cont-<?php print $i; ?>">
                            <p>Aucun transfert</p>
                            <button type="button" class="filter-<?php print $arrayFilters['Transferts']; ?>">VOIR TRANSFERTS</button>
                        </div>
                    </div>
                </div>
            <?php
            }
            ?>
        </div>
        <div id="wish">
            <textarea name="wish" placeholder="Autres souhaits, ambiance, destination, pour votre hôtel et/ou transport vous préférez: le moins cher possible, le meilleur rapport qualité: prix/confort/durée de transport ou le top confort?"></textarea>
        </div>

    </form>
</div>