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
        </div>
    </div>
</div>