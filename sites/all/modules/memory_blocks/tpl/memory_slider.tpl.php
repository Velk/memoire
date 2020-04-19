<?php
// Build slider of images
function getSliderImage($slider_home_page_data)
{

  $image_html_structure = "";

  for ($i = 1; $i <= $slider_home_page_data['nb_images']; $i++)
  {
    // Pass variables to JS file
    drupal_add_js(
      array(
        'memory_blocks' => array(
          'slider_home_page' => array(
            'scroll_time_interval' => $slider_home_page_data['scroll_time_interval']
          )
        )
      ),
      array('type' => 'setting')
    );

    if (
      $slider_home_page_data['image_container_' . $i]['image'] != 0 &&
      !empty($slider_home_page_data['image_container_' . $i]['image'])
    ) {
      $file = file_load($slider_home_page_data['image_container_' . $i]['image']);
      $url = file_create_url($file->uri);
      $image = $url;

      $image_html_structure .=
        "<div class=\"slider-img-container\">" .
          "<a href=" . $slider_home_page_data['image_container_' . $i]['redirection_link'] . " target=\"_blank\">" .
            "<img src=" . $image . " alt=\"Homepage slider of images\" />" .
          "</a>" .
        "</div>"
      ;
    }
  }

  return
  "<div id=\"slider-img-container\">" .
  $image_html_structure .
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
  "<div id=\"fixed-image\">" .
      "<a href=\"" . $redirection_link . "\" target=\"_blank\">" .
        "<img src=\"" . $image . "\" alt=\"Homepage fixed image\" />" .
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
