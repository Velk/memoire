<button type="button" id="btn-display">
    <i class="fa fa-plus" id="icon-plus"></i>
    <i class="fa fa-minus" id="icon-minus"></i>
</button>
<div id="cart-container">
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
        <button type="button" id="empty-cart">Vider le panier</button>
        <div id="trip">PARTIE A DEVELOPPER</div>
        <div id="wish">
            <textarea name="wish" placeholder="Autres souhaits, ambiance, destination, pour votre hôtel et/ou transport vous préférez: le moins cher possible, le meilleur rapport qualité: prix/confort/durée de transport ou le top confort?"></textarea>
        </div>

    </form>
</div>