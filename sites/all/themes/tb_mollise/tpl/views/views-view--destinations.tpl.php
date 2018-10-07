<?php 
	$vocabulary = taxonomy_vocabulary_machine_name_load('continent');
	$tree = taxonomy_get_tree($vocabulary->vid);

	$tab_continent = array();
	$tab_pays = array();
	$tab_ville = array();
	foreach ($tree as $term) {
		if($term->depth === 0) {
			$tab_continent[$term->tid] = array($term->name,$term->tid,);
		} elseif($term->depth === 1) {
			$tab_pays[$term->tid] = array($term->name,$term->tid,$term->parents[0]);
		} elseif($term->depth === 2) {
			$tab_ville[$term->tid] = array($term->name,$term->tid,$term->parents[0]);
		}
	}
	
	asort($tab_continent);
	asort($tab_pays);
	asort($tab_ville);
	
	foreach ($tab_ville as $city) {
		$tab_pays[$city[2]]['city'][] = array($city[0], $city[1]);
	}
	foreach ($tab_pays as $country) {
		if (!empty($country['city'])) {
			$tab_continent[$country[2]]['country'][] = array($country[0], $country[1], $country['city']);
		} else {
			$tab_continent[$country[2]]['country'][] = array($country[0], $country[1]);
		}
	}
?>
<div id="destination">
	<?php foreach($tab_continent as $cont): ?>
		<h3><?php print $cont[0] ?></h3>
		<?php if(!empty($cont['country'])): ?>
			<ul class="country">
			<?php foreach($cont['country'] as $cntry): ?>
				<li><?php print $cntry[0] ?></li>
				<?php if(!empty($cntry[2])): ?>
					<ul class="city">
						<?php foreach($cntry[2] as $place): ?>
							<li><a href=<?php print strtolower(current_path()."/".$place[0]); ?>><?php print $place[0] ?></a></li>
						<?php endforeach; ?>
					</ul>
				<?php endif; ?>
			<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	<?php endforeach; ?>
</div>