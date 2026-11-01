/*--------------------------------------------------------------
# Copyright (C) joomla-monster.com
# License: http://www.gnu.org/licenses/gpl-2.0.html GNU/GPLv2 only
# Website: http://www.joomla-monster.com
# Support: info@joomla-monster.com
---------------------------------------------------------------*/

// Sticky Bar
var bar;
var barSpace;
var barHeight;
var megamenuPosition;
var scroll;
function stickyBar() {
	bar = jQuery('#jm-logo-nav');
	barSpace = jQuery('#jm-logo-nav-space');
	scroll = jQuery(window).scrollTop();
	if(bar.length) {
		megamenuPosition = barSpace.offset();
		barHeight = bar.outerHeight();
		scroll = jQuery(window).scrollTop();
		barSpace.css('min-height', barHeight + 'px');
		if (scroll >= megamenuPosition.top) {
			bar.addClass("scrolled");
		} else {
			bar.removeClass("scrolled");
		}
	}
}

//header position
var header;
var headerHeight;
var headerContent;
var headerContentIn;
var headerOffset;
var screenHeight;
function adjustHeader() {
	header = jQuery('#jm-header');
	headerContent = header.find('#jm-header-content');
	headerOffset = headerContent.offset();
	headerHeight = header.outerHeight();
	headerContentIn = header.find("*[class*='_mod'] .jm-module-in");
	screenHeight = jQuery(window).height();
	if((screenHeight < headerHeight) && headerContentIn.length) {
		headerContentIn.css('padding-bottom', headerOffset.top + 'px');
	} else {
		headerContentIn.removeAttr('style');
	}
}

jQuery(window).load(function(){
	stickyBar();
	adjustHeader();
	jQuery(window).scroll(function() {
		stickyBar();
	});
	jQuery(window).resize(function() {
		stickyBar();
		adjustHeader();
	});
	
});
