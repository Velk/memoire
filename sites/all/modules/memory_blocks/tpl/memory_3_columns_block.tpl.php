<div id="mcb-container">

    <?php
    if( isset($mcb_title) ){
        print "<h2>" . $mcb_title . "</h2>";
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

        for ( $i = 1 ; $i < 4 ; $i++ ){

            $mcb_picto = "mcb_column_" . $i . "_picto";
            $mcb_text = "mcb_column_" . $i . "_text";

            if( isset($$mcb_picto) || isset($$mcb_text) ){
                print '<div class="mcb-block">';

                if( isset($$mcb_picto) ){
                    print '<img src="' . $$mcb_picto . '" />';
                }
                if( isset($$mcb_text) ){
                    print '<div>' . $$mcb_text . '</div>';
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
