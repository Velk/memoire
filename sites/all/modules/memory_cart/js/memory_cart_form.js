(function ($) {
  Drupal.behaviors.memory_cart_form = {
    attach: function (context, settings) {

      console.log("--- Load : memory_cart_form");

      settings.memory_cart_form = {};

      var location = null;
      var participants = null;
      var departureDate = null;
      var returnDate = null;
      var budget = null;
      var transport = null;
      var wish = null;

      // Update field : Departure date
      $("#departure-date input").change(function(){

        departureDate = ($(this).val() === "") ? null : $(this).val();

        if(departureDate === null){ // If the departure date is removed, reset the return date
          $("#return-date input").prop("disabled", true);
          $("#return-date input").removeAttr("min");
          $("#return-date input").val("");
          $("#return-date").hide();
          returnDate = null;
        }else{ // If a departure date is selected, enable and show return date
          $("#return-date input").removeAttr("disabled");
          $("#return-date input").attr("min", departureDate);
          $("#return-date").show();
        }
      });

      // Update field : Return date
      $("#return-date input").change(function(){
        returnDate = ($(this).val() === "") ? null : $(this).val();
      });

      // Update field : Budget
      $("#budget > select").click(function(){
        var budget = $(this).val();
        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + budget + "\"]").attr("selected", "selected");
        $(this).val(budget);
      });

      // Update field : Transport
      $("#transport > select").click(function(){
        var transport = $(this).val();
        $(this).find("option").removeAttr("selected");
        $(this).find("option[value=\"" + transport + "\"]").attr("selected", "selected");
        $(this).val(transport);
      });

      function setFieldsValueToObject(){

        location = $("#location > input").val();
        participants = $("#participants > input").val();
        departureDate = $("#departure-date input").val();
        returnDate = $("#return-date input").val();
        budget = $("#budget > select").val();
        transport = $("#transport > select").val();
        wish = $("#wish > textarea").val();

        settings.memory_cart_form = {
          "location" : (location === "") ? null : location,
          "participants" : (participants === "") ? null : participants,
          "departureDate" : (departureDate === "") ? null : new Date(departureDate).getTime(),
          "returnDate" : (returnDate === "") ? null : new Date(returnDate).getTime(),
          "budget" : parseInt(budget),
          "transport" : parseInt(transport),
          "wish" : (wish === "") ? null : wish,
        };
      }

      $("#validate-cart").click(function(){
        setFieldsValueToObject();
      });

      $("#empty-cart").click(function(){

        $("#location > input").val("");
        $("#participants > input").val("");
        $("#departure-date > input").val("");
        $("#return-date > input").val("");
        $("#budget > select").find("option").removeAttr("selected");
        $("#budget > select").find("option[value=\"0\"]").attr("selected", "selected");
        $("#budget > select").val(0);
        $("#transport > select").find("option").removeAttr("selected");
        $("#transport > select").find("option[value=\"0\"]").attr("selected", "selected");
        $("#transport > select").val(0);
        $("#wish > select").val("");

        location = null;
        participants = null;
        departureDate = null;
        returnDate = null;
        budget = null;
        transport = null;
        wish = null;
      });
    }
  };
}(jQuery));
