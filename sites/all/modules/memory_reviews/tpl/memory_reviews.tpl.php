<div id="memory-reviews-container">
  <h2><?=$reviews_title;?></h2>
  <?php if(!empty($reviews_trustpilot)){ ?>
  <div id="reviews-image">
    <img src="<?=$reviews_trustpilot;?>" alt="Trustpilot assessment" <?php if(!empty($reviews_trustpilot_width)) print "width=\"" . $reviews_trustpilot_width . "px\""; ?>>
  </div>
  <?php } ?>
  <div id="reviews-slider">
    <?php for($k = 0; $k < sizeof($arrayReviews); $k = $k + 3){ ?>
    <div class="memory-group-reviews group-nb-<?=($k==0)?0:$k/3;?>">
      <?php
      for($i = $k; $i < $k+3; $i++){
        if(!empty($arrayReviews[$i]["person"])) {
        ?>
        <div class="memory-review">
          <p class="review-person"><?= $arrayReviews[$i]["person"] ?></p>
          <p class="review-notation">
            <?php
            $nbEmptyStars = 5 - intval($arrayReviews[$i]["notation"]);

            // Set filled stars
            for ($j = 0; $j < intval($arrayReviews[$i]["notation"]); $j++) {
              print("<i class=\"fa fa-star\" aria-hidden=\"true\"></i>");
            }

            // Set empty stars
            for ($j = 0; $j < $nbEmptyStars; $j++) {
              print("<i class=\"fa fa-star-o\" aria-hidden=\"true\"></i>");
            }
            ?>
          </p>
          <div class="review-description"><?= $arrayReviews[$i]["description"]["value"] ?></div>
          <p class="review-nature"><?= $arrayReviews[$i]["nature"] ?></p>
          <p class="review-date"><?= $arrayReviews[$i]["date"] ?></p>
        </div>
    <?php
      }
    }
    ?>
    </div>
    <?php } ?>
  </div>
  <?php if(sizeof($arrayReviews) > 3){ ?>
  <div id="reviews-touchable-manager">
    <?php for($k = 0; $k < sizeof($arrayReviews); $k = $k + 3){ ?>
      <?php
      if($k == 0)
        print "<i class=\"fa fa-circle\" aria-hidden=\"true\"></i>";
      else
        print "<i class=\"fa fa-circle-thin\" aria-hidden=\"true\"></i>";
      ?>
    <?php } ?>
  </div>
  <?php } ?>
</div>
