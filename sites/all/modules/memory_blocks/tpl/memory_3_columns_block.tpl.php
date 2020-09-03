<div>
    <?php
    if( isset($mcb_title) ){
        print "<h2 class='memory-block-title'>" . $mcb_title . "</h2>";
    }
    ?>

    <?php
    if( isset($mcb_text_1) ){
        print '<div class="mcb-text">' . $mcb_text_1 . '</div>';
    }
    ?>

    <?php
    if(
        isset($mcb_column_1_picto) || isset($mcb_column_1_text) || isset($mcb_column_2_picto) ||
        isset($mcb_column_2_text) || isset($mcb_column_3_picto) || isset($mcb_column_3_text)
    ){
        print '<div id="mcb-blocks-container">';

        $max_pictogram_height = max($mcb_column_1_height, $mcb_column_2_height, $mcb_column_3_height);

        for ( $i = 1 ; $i < 4 ; $i++ ){

            $mcb_picto = "mcb_column_" . $i . "_picto";
            $mcb_height = "mcb_column_" . $i . "_height";
            $mcb_text = "mcb_column_" . $i . "_text";

            if( isset($$mcb_picto) || isset($$mcb_text) ){
                print '<div class="mcb-block">';

                if( isset($$mcb_picto) ){
                    print
                      '<div class="mcb-img-container" style="height:' . (empty($max_pictogram_height) ? 175 : $max_pictogram_height) . 'px;">' .
                        '<img src="' . $$mcb_picto . '" height="' . ((empty($$mcb_height)) ? 175 : $$mcb_height) . '"/>' .
                      '</div>'
                    ;
                }
                if( isset($$mcb_text) ){
                    print '<div class="mcb-text-container">' . $$mcb_text . '</div>';
                }

                print '</div>';
            }
        }
        print '</div>';
    }
    ?>

    <?php
    if( isset($mcb_text_2) ){
        print '<div class="mcb-text">' . $mcb_text_2 . '</div>';
    }
    ?>

<!--    --><?php
//    print "Bloc 1<br>";
//    print "<img src='$mcb_column_1_picto' />";
//    print $mcb_column_1_text;
//
//    print "Bloc 2<br>";
//    print "<img src='$mcb_column_2_picto' />";
//    print $mcb_column_2_text;
//
//    print "Bloc 3<br>";
//    print "<img src='$mcb_column_3_picto' />";
//    print $mcb_column_3_text;
//
//    print $mcb_text_2;
//
//    ?>
</div>
