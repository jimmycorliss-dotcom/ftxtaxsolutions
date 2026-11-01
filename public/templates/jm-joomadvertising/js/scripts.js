/*--------------------------------------------------------------
# Copyright (C) joomla-monster.com
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Website: http://www.joomla-monster.com
# Support: info@joomla-monster.com
---------------------------------------------------------------*/

//Set Module's Height script
function setModulesHeight() {
	var regexp = new RegExp("_mod([0-9]+)$");
	var jmmodules = jQuery(document).find('.jm-module') || [];
	if (jmmodules.length) {
		jmmodules.each(function(index,element){
			var match = regexp.exec(element.className) || [];
			if (match.length > 1) {
				var modHeight = parseInt(match[1]);
				jQuery(element).find('.jm-module-content').css('height', modHeight + 'px');
			}
		});
	}
}

// responsive tabs on product page
jQuery(document).on('show', '.nav-tabs-responsive [data-toggle="tab"]', function(e) {
	var $target = jQuery(e.target);
	var $tabs = $target.closest('.nav-tabs-responsive');
	var $current = $target.closest('li');
	var $next = $current.next();
	var $prev = $current.prev();
	$tabs.find('>li').removeClass('next prev');
	$prev.addClass('prev');
	$next.addClass('next');
});

//dom ready
jQuery(document).ready(function(){

	//module height
	setModulesHeight();

	//search
	var searchTarget = jQuery('.search-ms');
	if (searchTarget.length > 0) {
		searchTarget.addClass('visible');
		var searchModule = searchTarget.find('.dj_cf_search');
		var searchForm = searchModule.find('form');
		var searchLocationsuffix = jQuery('.search-ms.locationcategory-ms');
		var searchCategorysuffix = jQuery('.search-ms.category-ms');
		var searchInHeader = jQuery("#jm-header-content").find(".search-ms");
		if (searchModule.length > 0) {
			if (searchLocationsuffix.length > 0) {

				//without radius
				var elems = searchForm.children('.search_regions, .search_ex_fields, .search_type, .search_time, .search_price, .search_only_images, .search_only_video, .search_also_18, .search_only_auctions, .search_only_buynow, .search_radius_range');
			} else {

				//with radius
				var elems = searchForm.children('.search_radius, .search_cats, .search_regions, .search_ex_fields, .search_type, .search_time, .search_price, .search_only_images, .search_only_video, .search_also_18, .search_only_auctions, .search_only_buynow, .search_radius_range');
			}
			if (searchCategorysuffix.length > 0) {
				//without radius

				var elems2 = searchForm.children('.search_radius, .search_regions, .search_ex_fields, .search_type, .search_time, .search_price, .search_only_images, .search_only_video, .search_also_18, .search_only_auctions, .search_only_buynow, .search_radius_range');
			} else {
				//with radius

				var elems2 = searchForm.children('.search_radius, .search_cats, .search_regions, .search_ex_fields, .search_type, .search_time, .search_price, .search_only_images, .search_only_video, .search_also_18, .search_only_auctions, .search_only_buynow, .search_radius_range');
			}
			var wrapper = jQuery('<div class="search-wrapper clearfix" />');
			searchForm.append(wrapper);
			if (searchLocationsuffix.length > 0) {
			wrapper.append(elems);
			} else if (searchCategorysuffix.length > 0) {
			wrapper.append(elems2);
			} else {
			wrapper.append(elems);
			}

		}
		//search position
		var searchHeight = searchTarget.outerHeight();
		var searchOffset = searchTarget.offset().top + searchHeight + 10;
	}

	//classifeds prev/next
	jQuery('.nav-tabs-responsive li.active').next().addClass('next');
});