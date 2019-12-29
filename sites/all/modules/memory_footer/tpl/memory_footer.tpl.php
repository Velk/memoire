<div id="memory-footer">
  <div>
    <div id="footer-container">
      <div id="first-col">
        <?php echo $footer_column_1; ?>
      </div>
      <div id="second-col">
        <?php echo $footer_column_2; ?>
      </div>
      <div id="third-col">
        <?php echo $footer_column_3; ?>
      </div>
      <div id="fourth-col">
        <?php echo $footer_column_4; ?>
      </div>
      <div id="fifth-col">
        <?php echo $footer_column_5; ?>
      </div>
      <div id="social-media-shortcuts">
        <div id="facebook">
          <iframe
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2F<?php echo $facebook_url; ?>%2F&width=150&layout=<?php echo $facebook_display_type; ?>&action=like&size=small&show_faces=false&share=true&height=<?php echo $facebook_display_height; ?>&appId"
            width="150"
            height="<?php echo $facebook_display_height; ?>"
            style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media">
          </iframe>
        </div>
        <div id="twitter">
          <iframe
            src="https://platform.twitter.com/widgets/tweet_button.html?url=https%3A%2F%2F<?php echo $twitter_url; ?>%2Fweb%2Ftweet-button&via=twitterdev&related=twitterapi%2Ctwitter&text=Bonjour%20Memory%20!&hashtags=Super%2CMemory"
            width="140"
            height="<?php echo $twitter_display_height; ?>"
            title="Twitter Tweet Button"
            style="border: 0; overflow: hidden;">
          </iframe>

        </div>
      </div>
      <div id="social-media-links">
        <div id="header-social-media-links">
          <hr><p id="follow-us">Suivez-nous</p><hr>
        </div>
        <div id="social-media-links-container">
          <?php
          for( $i = 1 ; $i <= $array_size_snl ; $i++ ){
            $social_networks_name = "social_networks_".$i."_name";
            $social_networks_url = "social_networks_".$i."_url";
            $social_networks_icon = "social_networks_".$i."_icon";

            if( !empty($$social_networks_name) && !empty($$social_networks_name) && !empty($$social_networks_name) ){
              ?>
              <div>
                <a href="<?php echo $$social_networks_url; ?>" target="_blank" title="<?php echo $$social_networks_name; ?>">
                  <i class="fa fa-2x <?php echo $$social_networks_icon; ?>" aria-hidden="true"></i>
                </a>
              </div>
              <?php
            }
          }
          ?>
        </div>
      </div>
      <?php
      if( !empty($footer_partners) ){
        ?>
        <div id="partners-container">
          <div id="header-partners">
            <hr><p>Nos partenaires</p><hr>
          </div>
          <?php echo $footer_partners; ?>
        </div>
        <?php
      }
      ?>
    </div>
  </div>
</div>
