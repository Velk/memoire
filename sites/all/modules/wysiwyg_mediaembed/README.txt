This is simple module to integrate the CKEditor MediaEmbed plugin with the 
Wysiwyg module.


INSTALLATION

1) Download and install the Wysiwyg MediaEmbed module as usual.
2) Download the Media Embed plugin from 
   http://ckeditor.com/addon/mediaembed
3) Unzip the plugin in the 'plugin' folder. The main Javascript file of 
   the module should be in 'wysiwyg_mediaembed/plugin/mediaembed/plugin.js'
4) Enable the plugin in the Wysiwyg profile configuration page. Look for: 
"media embed" plugins in:
   Configuration -> Media -> WYSIWYG Profiles -> Buttons and Plugins

Optional: Download IFrame Dialog Field
This plugin provides the iframe dialog field that embeds another HTML page
in the dialog for interaction: http://ckeditor.com/addon/iframedialog

Troubleshooting: If buttons are not appearing, clear caches and reopen the full editor.

BACKGROUND

This module was largely inspired by the discussion at 
http://groups.drupal.org/node/55688#comment-634648

Module updated in 2014 by HongPong: https://www.drupal.org/user/60005/
Credit for bug patches to tregismoreira, acrosman