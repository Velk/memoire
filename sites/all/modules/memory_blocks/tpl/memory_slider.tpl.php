<?php

drupal_set_message("slider_home_page");
drupal_set_message($slider_home_page_height);
drupal_set_message("<pre>" . print_r($slider_home_page_data, true) . "</pre>");

// Build slider of images
function getSliderImage($slider_home_page_data)
{


  return
  "<div id=\"slider-img-container\">" .
  "</div>" .
  "<div id=\"slider-actions\">" .
    "<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>" .
    "<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>" .
  "</div>"
  ;
}

// Build video
function getVideo($slider_home_page_data)
{
  $autoplay = ($slider_home_page_data['autoplay'] == 1) ? "autoplay muted" : "muted";
  $controls = ($slider_home_page_data['controls'] == 1) ? "controls" : "";
  $loop = ($slider_home_page_data['loop'] == 1) ? "loop" : "";
  $redirection_link = (!empty($slider_home_page_data['redirection_link'])) ? "data-href=\"".$slider_home_page_data['redirection_link']."\"" : "";

  $poster = "";
  if (
    $slider_home_page_data['poster'] == 1 &&
    $slider_home_page_data['poster_image'] != 0 &&
    !empty($slider_home_page_data['poster_image'])
  ) {
      $file = file_load($slider_home_page_data['poster_image']);
      $url = file_create_url($file->uri);
      $poster = "poster=" . $url;
  }

  $video = "";
  if (
    $slider_home_page_data['video'] != 0 &&
    !empty($slider_home_page_data['video'])
  ) {
      $file = file_load($slider_home_page_data['video']);
      $url = file_create_url($file->uri);
      $video = $url;
  }

  return
  "<video
    style=\"object-fit:cover;width:100%;height:auto;\"
    " . $autoplay . "
    " . $controls . "
    " . $loop . "
    " . $poster . "
    " . $redirection_link . "
    >" .
      "<source src=" . $video . " type=\"video/mp4\">" .
    "</video>" .
    "<button id=\"set-sound\">" .
        "<i class=\"fa fa-volume-off\" aria-hidden=\"true\"></i>" .
    "</button>"
  ;
}

// Build fixed image
function getFixedImage($slider_home_page_data)
{
  $redirection_link = (!empty($slider_home_page_data['redirection_link'])) ? $slider_home_page_data['redirection_link'] : "";
  $image = "";
  if (
    $slider_home_page_data['image'] != 0 &&
    !empty($slider_home_page_data['image'])
  ) {
    $file = file_load($slider_home_page_data['image']);
    $url = file_create_url($file->uri);
    $image = $url;
  }

  return
  "<div id=\"still-img\">" .
      "<a href=\"" . $redirection_link . "\" target=\"_blank\">" .
        "<img src=\"" . $image . "\" alt=\"Homepage image\" class=\"slider-img\" />" .
      "</a>" .
  "</div>"
  ;
}
?>

<div id="slider-container" style="height:<?php echo $slider_home_page_height; ?>px">
    <div>
        <?php
        switch ($slider_home_page_display_type){
          case 0 :
            echo getSliderImage($slider_home_page_data);
            break;
          case 1 :
            echo getVideo($slider_home_page_data);
            break;
          case 2 :
            echo getFixedImage($slider_home_page_data);
            break;
        }
        ?>
    </div>
    <div id="go-down">
        <i class="fa fa-angle-down" aria-hidden="true"></i>
    </div>
</div>
