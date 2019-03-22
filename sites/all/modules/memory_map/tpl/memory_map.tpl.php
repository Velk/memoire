<?php
if(!empty($world_map_title) && !empty($world_map_description)){
?>
<div id="map-header">
    <h1 id="title"><?php echo $world_map_title; ?></h1>
    <div id="description"><?php echo $world_map_description; ?></div>
</div>
<?php
}
?>
<div id="world-map-container">
    <div>
        <div id="world-map">

            <!--
            *************Map created by Simplemaps.com********************
            *************Attribution is highly appreciated!***************
            *************http://simplemaps.com****************************

            The MIT License (MIT)

            Copyright (c) 2015 Pareto Softare, LLC DBA Simplemaps.com

            Permission is hereby granted, free of charge, to any person obtaining a copy
            of this software and associated documentation files (the "Software"), to deal
            in the Software without restriction, including without limitation the rights
            to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
            copies of the Software, and to permit persons to whom the Software is
            furnished to do so, subject to the following conditions:

            The above copyright notice and this permission notice shall be included in
            all copies or substantial portions of the Software.

            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
            IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
            FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
            AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
            LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
            OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
            THE SOFTWARE.

            -->

            <svg
                xmlns:svg="http://www.w3.org/2000/svg"
                xmlns="http://www.w3.org/2000/svg"
                width="2000px"
                height="1001px"
                pretty_print="False"
                style="stroke-linejoin: round; stroke:#000; fill: none;"
                version="1.1"
                viewBox="0 0 2000 1001"
                id="svg-container"
                inkscape:version="0.48.4 r9939"
                sodipodi:docname="world.svg">
                <sodipodi:namedview
                    pagecolor="#ffffff"
                    bordercolor="#666666"
                    borderopacity="1"
                    objecttolerance="10"
                    gridtolerance="10"
                    guidetolerance="10"
                    inkscape:pageopacity="0"
                    inkscape:pageshadow="2"
                    inkscape:window-width="1920"
                    inkscape:window-height="1137"
                    id="namedview231"
                    showgrid="false"
                    inkscape:zoom="1.144"
                    inkscape:cx="593.00732"
                    inkscape:cy="460.46398"
                    inkscape:window-x="1192"
                    inkscape:window-y="118"
                    inkscape:window-maximized="1"
                    inkscape:current-layer="svg2" />
                <defs
                    id="defs4">
                    <style
                        type="text/css"
                        id="style6">path { fill-rule: evenodd; }</style>
                </defs>
                <metadata
                    id="metadata8">
                    <views
                        id="views10">
                        <view
                            h="1001"
                            padding="0"
                            w="2000"
                            id="view12">
                            <proj
                                flip="auto"
                                id="robinson"
                                lon0="100.0" />
                            <bbox
                                h="2233.1"
                                w="5271.17"
                                x="-2635.59"
                                y="-1308.06"
                                id="bbox15" />
                        </view>
                    </views>
                    <rdf:RDF>
                        <cc:Work
                            rdf:about="">
                            <dc:format>image/svg+xml</dc:format>
                            <dc:type
                                rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
                            <dc:title />
                        </cc:Work>
                    </rdf:RDF>
                </metadata>
                <?php
                for($i = 1 ; $i <= $array_size_countries_list ; $i++){

                    $country_id = "country_" . $i . "_id";
                    $country_name = "country_" . $i . "_name";
                    $country_svg_pattern = "country_" . $i . "_svg_pattern";
                    $country_redirect_link = "country_" . $i . "_redirect_link";
                    ?>
                    <?php if( !empty($$country_redirect_link) ){ ?>
                    <a href="<?php echo $$country_redirect_link; ?>">
                    <?php } ?>
                        <path
                            inkscape:connector-curvature="0"
                            <?php echo ( !empty($$country_redirect_link) ) ? "class=\"country-redirection\"" : ""; ?>
                            id="<?php echo $$country_id; ?>"
                            data-name="<?php echo $$country_name; ?>"
                            data-id="<?php echo $$country_id; ?>"
                            d="<?php echo $$country_svg_pattern; ?>"
                        />
                    <?php if( !empty($$country_redirect_link) ){ ?>
                    </a>
                    <?php } ?>
                <?php
                }
                ?>
            </svg>
            <div id="zoom">
                <div id="zoom-in">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                </div><div id="zoom-out">
                    <i class="fa fa-minus" aria-hidden="true"></i>
                </div>
            </div>
        </div>
        <div id="menu-map">
            <div>
                <button type="button" class="world">
                    Monde
                </button>
            </div><div>
                <button type="button" class="europe">
                    Europe
                </button>
            </div><div>
                <button type="button" class="asia">
                    Asie
                </button>
            </div><div>
                <button type="button" class="north-america">
                    Amérique du nord
                </button>
            </div><div>
                <button type="button" class="south-america">
                    Amérique du sud
                </button>
            </div><div>
                <button type="button" class="africa">
                    Afrique
                </button>
            </div><div>
                <button type="button" class="middle-east">
                    Moyen-Orient
                </button>
            </div><div>
                <button type="button" class="oceania">
                    Océanie
                </button>
            </div>
        </div>
    </div>
</div>