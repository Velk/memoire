<div id="memory_reviews_container">
  <h2><?=$reviews_title;?></h2>
  <div>
    <div>
      <?php
      for($i = 0; $i < sizeof($arrayReviews); $i++){
      ?>
      <div class="memory_review">
        <p class="review_person"><?= $arrayReviews[$i]["person"] ?></p>
        <p class="review_notation">
          <?php
          $nbEmptyStars = 5 - intval($arrayReviews[$i]["notation"]);

          // Set filled stars
          for($j = 0; $j < intval($arrayReviews[$i]["notation"]); $j++){
            print("<i class=\"fa fa-star\" aria-hidden=\"true\"></i>");
          }

          // Set empty stars
          for($j = 0; $j < $nbEmptyStars; $j++){
            print("<i class=\"fa fa-star-o\" aria-hidden=\"true\"></i>");
          }
          ?>
        </p>
        <div class="review_description"><?=$arrayReviews[$i]["description"]["value"]?></div>
        <p class="review_nature"><?=$arrayReviews[$i]["nature"]?></p>
        <p class="review_date"><?=$arrayReviews[$i]["date"]?></p>
      </div>
      <?php
      }
      ?>
    </div>
  </div>
</div>
