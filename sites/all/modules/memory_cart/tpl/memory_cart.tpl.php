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

if(drupal_is_front_page())
  $cart_class = "cart-hide";
else if($isActivityPage)
  $cart_class = "activity-page cart-show";
else if($isDestinationPage)
  $cart_class = "destination-page cart-show";
?>
<div id="cart-container">
  <div class="<?=$cart_class?>">
    <h2>Préparez votre aventure</h2>
    <form id="devis">
      <div>
        <div id="location">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <input type="text" name="location"  placeholder="Lieu de départ">
        </div>
        <div id="participants">
          <i class="fa fa-user" aria-hidden="true"></i>
          <input type="number" name="participants"  placeholder="Nombre de participants" min="1">
        </div>
      </div>
      <div>
        <div id="departure-date">
          <i class="fa fa-calendar-o" aria-hidden="true"></i>
          <input type="text" id="departure-datepicker" placeholder="Date de départ">
        </div>
        <div id="return-date" style="display:none;">
          <i class="fa fa-calendar-o" aria-hidden="true"></i>
          <input type="text" id="return-datepicker" placeholder="Date de retour" disabled>
        </div>
      </div>
      <div>
        <div id="budget">
            <label>Budget par personne</label>
            <select name="budget">
                <option value="0" selected="selected">- de 100€</option>
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
                <option value="0" selected="selected">Oui, j’en ai besoin</option>
                <option value="1">Non je voyage par mes propres moyens</option>
                <option value="2">Je ne sais pas encore</option>
            </select>
        </div>
      </div>
      <button type="reset" id="empty-cart">Vider le panier</button>
      <hr>
      <div id="trip-global-container">
        <p id="trip-disclaimer">Pour planifier votre devis, veuillez selectionner une date de départ et une date de retour</p>
        <div></div>
      </div>
      <hr>
      <div id="wish">
          <textarea name="wish" placeholder="Nos agents sont là pour vous : une envie particulière, besoin d’un conseil, faites-le nous savoir… "></textarea>
      </div>
      <button type="button" id="validate-cart">Demander un devis</button>
    </form>
  </div>
  <?php
  if(!drupal_is_front_page()){
  echo
  "<button type=\"button\" class=\"toggle-user-cart\">" .
    "<i class=\"fa fa-plus\" id=\"icon-plus\"></i>" .
    "<i class=\"fa fa-minus\" id=\"icon-minus\"></i>" .
  "</button>"
  ;
  }
  ?>
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
