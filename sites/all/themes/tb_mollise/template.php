<?php
/**
 * @file
 * controls load theme.
 */

require_once drupal_get_path('theme', 'tb_mollise') . '/inc/preprocess_functions.inc';
require_once drupal_get_path('theme', 'tb_mollise') . '/inc/theme_function_overrides.inc';
<<<<<<< HEAD
=======

function tb_mollise_preprocess_html(&$vars) {

  $viewport = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0, maximum-scale=1',
    ),
  );

  drupal_add_html_head($viewport, 'viewport');

  // Add font awesome
  $FontAwesome_filepath = libraries_get_path("font-awesome-4.7.0") . '/css/font-awesome.min.css';

  drupal_add_css($FontAwesome_filepath, array(
    'group' => CSS_THEME,
  ));

  // Add jQuery UI
  $jQuery_UI_filepath = libraries_get_path("jquery-ui-1.12.1") .  '/jquery-ui.min.js';

  drupal_add_js($jQuery_UI_filepath, array(
    'group' => JS_THEME,
  ));

  // Add jQuery UI french language
  $jQuery_UI_filepath = libraries_get_path("jquery-ui-datepicker-language") .  '/datepicker-fr.js';

  drupal_add_js($jQuery_UI_filepath, array(
    'group' => JS_THEME,
  ));
}
>>>>>>> preprod
