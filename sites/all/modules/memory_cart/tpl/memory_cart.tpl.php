<?php
global $base_url;

// Check if the current page is an activity or a destination
$isActivityPage = false;
$isDestinationPage = false;

if ( arg(0) == 'node' && is_numeric(arg(1)) ) {
  $node = node_load(arg(1));
  if ($node->type  == "activite" ) $isActivityPage = true;
}

if(arg(0) == "taxonomy" && arg(1) == "term" && is_numeric(arg(2))){
  $taxonomy = taxonomy_term_load(arg(2));
  if($taxonomy->vocabulary_machine_name == "continent") $isDestinationPage = true;
}

/* Retrieve activity categories */
$vocab_activity = taxonomy_vocabulary_machine_name_load('activite');
$vocab_activities_tree = taxonomy_get_tree($vocab_activity->vid);
$arrayFilters = [];

foreach ($vocab_activities_tree as $vocab_activity_tree){

    $arrayFilters[$vocab_activity_tree->name] = $vocab_activity_tree->tid;
}

// HTML Structure
$cart_class = "";

if($isActivityPage) {
  $cart_class = "activity-page";
}else if($isDestinationPage) {
  $cart_class = "destination-page";
}

if (!path_is_admin(current_path())) {
?>
<div id="cart-container" class="<?=$cart_class?>">
  <div style="display:none;">
    <h2>Préparez votre aventure</h2>
    <form id="devis">
      <div id="personnal-data">
        <h3>Informations personnelles</h3>
        <div>
          <div id="firstname">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="text" name="firstname" placeholder="Nom *" required>
          </div>
          <div id="lastname">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="text" name="lastname" placeholder="Prénom *" required>
          </div>
        </div>
        <div>
          <div id="email">
            <i class="fa fa-envelope-o" aria-hidden="true"></i>
            <input type="email" name="email" placeholder="E-mail *" required>
          </div>
          <div id="phone">
            <i class="fa fa-phone" aria-hidden="true"></i>
            <input type="tel" name="phone" placeholder="Téléphone *" required>
          </div>
        </div>
        <div>
          <p style="color:#e40e0e; font-style: italic; font-size: 12px; margin-bottom: 30px;">* Ces champs sont obligatoires.</p>
          <div id="express-validation">
            <p>J'ai la flemme :</p>
            <button type="button" id="express-validate-cart">Rappelez-moi</button>
          </div>
        </div>
        <hr/>
      </div>
      <div id="quotation-data">
        <h3>Demander un devis</h3>
        <div>
          <div id="location">
            <i class="fa fa-map-marker" aria-hidden="true"></i>
            <input type="text" name="location"  placeholder="Lieu de départ">
          </div>
          <div id="participants">
            <i class="fa fa-user" aria-hidden="true"></i>
            <input type="text" name="participants"  placeholder="Nombre de participants">
          </div>
        </div>
        <div id="date-fields-container">
          <div id="departure-date">
            <i class="fa fa-calendar-o" aria-hidden="true"></i>
            <input type="text" id="departure-datepicker" placeholder="Date de départ" readonly>
            <i class="fa fa-times clear-input" aria-hidden="true"></i>
          </div>
          <div id="return-date" style="display:none;">
            <i class="fa fa-calendar-o" aria-hidden="true"></i>
            <input type="text" id="return-datepicker" placeholder="Date de retour" disabled readonly>
            <i class="fa fa-times clear-input" aria-hidden="true"></i>
          </div>
        </div>
        <div>
          <div id="budget">
              <label>Budget par personne</label>
              <select name="budget">
                  <option value="" selected="selected">--- Selectionnez votre budget ---</option>
                  <option value="0">- de 100€</option>
                  <option value="1">100-200€</option>
                  <option value="2">200-300€</option>
                  <option value="3">300-400€</option>
                  <option value="4">400-500€</option>
                  <option value="5">+ de 500€</option>
              </select>
          </div>
          <div id="transport">
              <label>Transport</label>
              <select name="transport">
                  <option value="" selected="selected">--- Selectionnez votre transport ---</option>
                  <option value="0">Oui, j’en ai besoin</option>
                  <option value="1">Non je voyage par mes propres moyens</option>
                  <option value="2">Je ne sais pas encore</option>
              </select>
          </div>
        </div>
      </div>
      <div id="quotation-activities">
        <div>
          <h3>Construisez votre planning</h3>
          <button type="button" id="empty-cart">
            <i class="fa fa-trash-o" aria-hidden="true"></i>
            <span>Vider le panier</span>
          </button>
        </div>
        <div id="trip-global-container">
          <p id="trip-disclaimer">Pour planifier votre devis, veuillez selectionner une date de départ et une date de retour</p>
          <div id="trip-activities-container"></div>
        </div>
        <hr/>
      </div>
      <div id="wish">
          <textarea name="wish" placeholder="Nos agents sont là pour vous : une envie particulière, besoin d’un conseil, faites-le nous savoir… "></textarea>
      </div>
      <button type="button" id="validate-cart">Demandez un devis</button>
    </form>
  </div>
<?php
//  if(!drupal_is_front_page()){
  echo
  "<button type=\"button\" class=\"toggle-user-cart\">" .
    "<i class=\"fa fa-plus\" id=\"icon-plus\"></i>" .
    "<i class=\"fa fa-minus\" id=\"icon-minus\"></i>" .
  "</button>"
  ;
//  }
}
?>
</div>
