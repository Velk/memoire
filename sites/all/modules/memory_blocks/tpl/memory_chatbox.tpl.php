<?php if(isset($chatbox_title) && isset($chatbox_text)){ ?>
<div id="memory-chatbox">
    <div id="chatbox-title">
        <p><i class="fa fa-info" aria-hidden="true"></i><?php echo $chatbox_title; ?></p>
    </div>
    <div id="chatbox-text">
        <div>
            <p><?php echo $chatbox_text; ?></p>
        </div>
    </div>
</div>
<?php } ?>
