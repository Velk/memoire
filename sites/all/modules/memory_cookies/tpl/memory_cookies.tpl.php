<?php
$isAcceptCookies = $_COOKIE['isCookiesAccept'];

if(
    !isset($isAcceptCookies) ||
    $isAcceptCookies == false
){
?>
    <div id="memory-cookies-container">
        <div id="cookies-description"><?php echo $cookies_description; ?></div>
        <div
            id="cookies-btn-container"
            style="<?php print ($cookies_deny_btn_is_display) ? 'justify-content: space-between;' : 'justify-content: center;'?>"
        >
            <button id="cookies-accept"><?php print $cookies_accept_btn_text; ?></button>
            <?php
            if( $cookies_deny_btn_is_display ){
            ?>
                <button id="cookies-deny">
                    <a href="<?php print $cookies_deny_btn_redirection; ?>">
                        <?php print $cookies_deny_btn_text; ?>
                    </a>
                </button>
            <?php
            }
            ?>
        </div>
    </div>
<?php
}
?>
