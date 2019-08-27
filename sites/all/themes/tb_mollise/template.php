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
}
