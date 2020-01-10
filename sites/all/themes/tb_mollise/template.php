<?php
/**
 * @file
 * controls load theme.
 */

require_once drupal_get_path('theme', 'tb_mollise') . '/inc/preprocess_functions.inc';
require_once drupal_get_path('theme', 'tb_mollise') . '/inc/theme_function_overrides.inc';

function tb_mollise_preprocess_html(&$vars) {

  $viewport = array(
    '#tag' => 'meta',
    '#attributes' => array(
      'name' => 'viewport',
      'content' => 'width=device-width, initial-scale=1.0, maximum-scale=1',
    ),
  );

  drupal_add_html_head($viewport, 'viewport');

//  $path = $GLOBALS['base_url'] . '/' . path_to_theme() . '/js/memory.js';
//  $selectivizr = array(
//    '#tag' => 'script',
////    '#attributes' => array(
////      'src' => $path,
////    ),
////    '#prefix' => '<!--[if lte IE 8]>',
////    '#suffix' => '</script><![endif]-->',
//    '#value' => ''
//  );
//  drupal_add_html_head($selectivizr, 'selectivizr');

  // Add font awesome
  $filepath = path_to_theme() . '/font-awesome/font-awesome-4.7.0/css/font-awesome.min.css';

  drupal_add_css($filepath, array(
    'group' => CSS_THEME,
  ));
}
