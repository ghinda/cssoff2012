/* CSSOff 2011
 *
 * Everything should also work with js disabled.
 */

// monolith, roar
var cssoff = (function($) {
	
	// cross-brower get scrollable element - css-tricks.com - http://css-tricks.com/examples/SmoothPageScroll
	function scrollableElement(els) {
		for (var i = 0, argLength = arguments.length; i <argLength; i++) {
			var el = arguments[i],
			$scrollElement = $(el);
			if ($scrollElement.scrollTop()> 0) {
				return el;
			} else {
				$scrollElement.scrollTop(1);
				var isScrollable = $scrollElement.scrollTop()> 0;
				$scrollElement.scrollTop(0);
				if (isScrollable) {
					return el;
				}
			}
		}
		return [];
	};
	
	var $window = $(window),
		$scroll = $(scrollableElement('html', 'body'));
	
	// add class to top navigation to make it less transparent
	var scroll = function() {
		var timer,
			$nav = $('nav:first');			
		
		$('a', $nav).click(function() {
			var hash = this.hash,
				targetOffset = (this.hash) ? $(this.hash).offset().top : 0;
			
			$scroll.stop().animate({
				scrollTop: targetOffset
			}, 500, function() {
				location.hash = hash;
			});
		
			return false;
		});
		
		var checkScroll = function() {
			if(timer) {
				clearTimeout(timer);
			}
			
			timer = setTimeout(function() {
				if($window.scrollTop() > 150) {
					if(!$nav.hasClass('dark-nav')) $nav.addClass('dark-nav');
				} else {
					$nav.removeClass('dark-nav');
				}
			}, 1000);
		};
		
		$window.scroll(checkScroll);
	};

	// logo shadow movement
	var logoShadow = function() {
		var $header = $('header h1');
		
		var moveLogoShade = function(e) {
			var v = 170 - Math.round(e.clientY / 40 - 15),
				h = 20 - Math.round(e.clientX / 40 - 15);
				
			$header.css('background-position', h + 'px ' + v + 'px');
		};
	
		if (!window.Touch) {
			$window.mousemove(moveLogoShade);
		};
	};
	
	// init tabs
	var tabs = function() {
		var $obstacles = $('#obstacles'),
			$tabs = $('ul a', $obstacles);
			
		var switchTab = function() {
			var $this = $(this),
				$target = $(this.hash),
				$activeTab = $tabs.filter('.active'),
				$active = $('.active-tab', $obstacles);
			
			if(!$this.hasClass('active')) {
				$activeTab.removeClass('active');
				$active.removeClass('active-tab').hide();
				
				$this.addClass('active');
				$target.show().addClass('active-tab');
			};
			return false;
		};
		
		$tabs.click(switchTab);
	};
	
	//countdown
	var countdown = function() {
		var $countdown = $('.countdown-time'),
			time = $countdown.text() * 1,
			timer;
			
		timer = setInterval(function() {
			time--;
			$countdown.text(time);
			
			if(time == 0) {
				clearInterval(timer);
				$countdown.addClass('zero-time');
			}
		}, 1000);
	};
	
	// init form controls
	var forms = function() {
		
		var $form = $('form'),
			$this,
			pos;
		
		// init dropkick
		$('select', $form).dropkick();
		
		/* For accessibility reasons, and for the use case, labels are much better suited than placeholders. 
		 * Mimicking the behaviour of placeholders.
		 */
		
		// position labels on top of inputs
		var positionLabel = function(e, i) {
			$this = $(this);
			pos = $this.next('input').position();
			
			$this.css({
				left: pos.left,
				top: pos.top
			});
		};
		
		// trigger only on window load to make sure we're getting proper possitions
		$window.load(function() {
			$('label', $form).each(positionLabel);
		});
		
		// bind focus and blur events to hide and show the labels
		$('input').bind('focus', function() {
			$(this).prev('label').fadeOut('fast');
		});
		
		$('input').bind('blur', function() {
			$(this).prev('label').fadeIn('fast');
		});
		
	};
	
	var init = function() {
		
		logoShadow();
		scroll();
		tabs();
		forms();
		countdown();
		
	};
	
	return {
		init: init
	}
})(jQuery);

jQuery(document).ready(cssoff.init);