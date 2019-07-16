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
    <h1>Préparez votre aventure</h1>
    <form id="devis">
        <div id="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <input type="text" name="location"  placeholder="Lieu de départ">
        </div>
        <div id="participants">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="number" name="participants"  placeholder="Nombre de participants" min="1">
        </div>
        <div id="departure-date">
          <i class="fa fa-calendar-o" aria-hidden="true"></i>
          <label for="departure-date">Date de départ</label>
          <input type="date" name="departure-date">
        </div>
        <div id="return-date">
          <i class="fa fa-calendar-o" aria-hidden="true"></i>
          <label for="return-date">Date de retour</label>
          <input type="date" name="return-date">
        </div>
        <div id="budget">
            <label>Budget par personne</label>
            <select name="budget">
                <option value="0">- de 100€</option>
                <option value="1">100-200€</option>
                <option value="2">200-300€</option>
                <option value="3">300-400€</option>
                <option value="4">400-500€</option>
                <option value="5">500-750€</option>
                <option value="6">750-1000€</option>
                <option value="7">1000-1500€</option>
                <option value="8">1500-2000€</option>
                <option value="9">+ de 2000€</option>
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
        <div id="trip-global-container">
            <div class="trip">
                <h3 class="trip-city-name">Ville</h3>
                <div class="transfer-container transfer-cont-1">
                    <p>Aucun transfert</p>
                    <button type="button" class="filter-<?php print $arrayFilters['Transferts']; ?>">VOIR TRANSFERTS</button>
                </div>
                <hr class="transfer-separation">
                <div class="trip-container">
                <?php
                for($i=1; $i <= 3 ; $i++){
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
                            <?php if( $i < 3 ){ ?>
                            <div class="hosting-container hosting-cont-<?php print $i; ?>">
                                <p>Aucun hébergement</p>
                                <button type="button" class="filter-<?php print $arrayFilters['Hébergements']; ?>">VOIR HEBERGEMENTS</button>
                            </div>
                            <?php } ?>
                        </div>
                    </div>
                <?php } ?>
                </div>
                <hr class="transfer-separation">
                <div class="transfer-container transfer-cont-2">
                    <p>Aucun transfert</p>
                    <button type="button" class="filter-<?php print $arrayFilters['Transferts']; ?>">VOIR TRANSFERTS</button>
                </div>
            </div>
        </div>
        <div id="wish">
            <textarea name="wish" placeholder="Nos agents sont là pour vous : une envie particulière, besoin d’un conseil, faites-le nous savoir… "></textarea>
        </div>
        <button type="button" id="validate-cart">Demander un devis</button>
    </form>
</div>
<?php if(!$is_user_logged_in){ ?>
<div id="user-cart-user-not-logged-container">
    <div>
        <h2>Demande d'informations</h2>
        <div id="user-cart-user-datas-container">
            <div id="user-cart-user-firstname">
              <input type="text" name="firstname"  placeholder="Prénom">
            </div>
            <div id="user-cart-user-lastname">
              <input type="text" name="lastname"  placeholder="Nom">
            </div>
            <div id="user-cart-user-email">
              <input type="text" name="email"  placeholder="E-mail">
            </div>
            <div id="user-cart-user-phone">
              <input type="text" name="phone"  placeholder="Téléphone">
            </div>
            <div id="user-cart-user-approval">
              <input type="checkbox" name="approval">
              <label for="approval">J'accepte d'être contacté par Memory.</label>
            </div>
            <button type="button" id="user-not-logged-validate-cart">Valider</button>
        </div>
        <button type="button" id="user-not-logged-remove-overlay"><i class="fa fa-times" aria-hidden="true"></i></button>
    </div>
</div>
<?php } ?>
