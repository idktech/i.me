'use strict';
/*****************************************

	TABLE OF CONTENTS
	---------------------------
		1. Intro effects
		2. Box Effect
		3. Counter
		4. Text Animation
		5. Subscribe
		6. Social Icons
		7. Subscribe input field

 *****************************************/

 /******************************************************************
 *******************************		1. Intro effects
 ******************************************************************/
	function loader() {
		var body = $('body')[0];
		var loader = $('#loader-wrap')[0];

		setTimeout(function() {
			loader.style.opacity = 0;
			loader.style.visibility = 'hidden';
			body.style.overflow = 'visible';
		},1000);
	};
	function introMain() {
		setTimeout(function() {
			$('#counter').addClass('loaded');
			setTimeout(function() {
				$('.countdown-wrap').addClass('countdown-wrap-active');
				$('.main-paragraph').addClass('main-paragraph-active');
				$('.main-subparagraph').addClass('main-subparagraph-active');
				setTimeout(function() {	
					$('.logo').addClass('logo-active');
					setTimeout(function() {
						$('.switch-button-1').addClass('switch-button-1-active');
						$('.subscribe-btn').addClass('subscribe-btn-active');
					}, 100);
				}, 500);
			}, 300);
		}, 0);
	};
	function outroMain() {
		setTimeout(function() {
			$('#counter').removeClass('loaded');
			setTimeout(function() {
				$('.countdown-wrap').removeClass('countdown-wrap-active');
				$('.main-paragraph').removeClass('main-paragraph-active');
				$('.main-subparagraph').removeClass('main-subparagraph-active');
				setTimeout(function() {	
					$('.logo').removeClass('logo-active');
					setTimeout(function() {
						$('.switch-button-1').removeClass('switch-button-1-active');
						$('.subscribe-btn').removeClass('subscribe-btn-active');
					}, 50);
				}, 200);
			}, 100);
		},0);
	}
	function introSubscribe() {
		setTimeout(function() {
	 	$('.subscribe-z').addClass('subscribe-wrap-active');
	 	$('.subscribe').addClass('borders-merge');
	 	$('.subscribe').addClass('subscribe-active');
		}, 800);
	}
	function outroSubscribe() {
		$('.subscribe-z').removeClass('subscribe-wrap-active');
		$('.subscribe').removeClass('borders-merge');
		$('.subscribe').removeClass('subscribe-active');
	}
	function introAbout() {
		setTimeout(function() {
			$("#content-section").fadeIn();
			$('.social').addClass('social-active');
			setTimeout(function() {
				$('.soc-wrap').addClass('soc-wrap-hover');
				$('.about-head1,.about-head2').addClass('about-head-active');
				setTimeout(function() {
					$('.about-head-container').addClass('about-head-container-active');
					$('.soc-wrap').removeClass('soc-wrap-hover');
				}, 1000);
			}, 500);
		}, 1000);
	}
	function outroAbout() {
		setTimeout(function() {
			$("#content-section").fadeOut();
			$('.social').removeClass('social-active');
			setTimeout(function() {
				$('.soc-wrap').removeClass('soc-wrap-hover');
				$('.about-head1,.about-head2').removeClass('about-head-active');
				setTimeout(function() {
					$('.about-head-container').removeClass('about-head-container-active');
					$('.soc-wrap').removeClass('soc-wrap-hover');
				}, 100);
			}, 100);
		}, 100);
	}
	window.onload = function() {
	loader();
		setTimeout(function() {
			introMain();
		}, 1500);
	}
/******************************************************************
*******************************		2. SWITCH SECTION
******************************************************************/
	$(document).ready(function() {
		
		$('.switch-button-1').click(function() {
			introAbout();
			outroMain();
		});
		$('.switch-button-2').click(function () {
			outroAbout();
			introMain();
			
		})
		$('.subscribe-btn').click(function () {
			introSubscribe();
			outroMain();
		});
		$('.switch-button-3').click(function () {
			outroSubscribe();
			introMain();
		})
	});

/******************************************************************
*******************************		3. COUNTER
******************************************************************/
	
	var Month = counter.setMonth;
	var Day = counter.setDay;
	var Year = counter.setYear;
	var target_date = new Date(Month +','+ Day +','+ Year).getTime();
	 
	var days, hours, minutes, seconds;
	 
	var countdownDays = document.getElementById("days");
	var countdownHours = document.getElementById("hours");
	var countdownMinutes = document.getElementById("minutes");
	var countdownSeconds = document.getElementById("seconds");

	setInterval(function () {
	 
		var current_date = new Date().getTime();
		var seconds_left = (target_date - current_date) / 1000;

		days = parseInt(seconds_left / 86400);
		seconds_left = seconds_left % 86400;

		hours = parseInt(seconds_left / 3600);
		seconds_left = seconds_left % 3600;

		minutes = parseInt(seconds_left / 60);
		seconds = parseInt(seconds_left % 60);


		days = (String(days).length >= 2) ? days : '0' + days;
		hours = (String(hours).length >= 2) ? hours : '0' + hours;
		minutes = (String(minutes).length >= 2) ? minutes : '0' + minutes;
		seconds = (String(seconds).length >= 2) ? seconds : '0' + seconds;

		countdownDays.innerHTML = days;
		countdownHours.innerHTML = hours;
		countdownMinutes.innerHTML = minutes;
		countdownSeconds.innerHTML = seconds;

	 
	}, 1000);
	

/******************************************************************
*******************************		5. SUBSCRIBE
******************************************************************/
	
	( function ( $ ) {
	    'use strict';
		$(document).ready(function() {
			$('.subscribe-email-field').focus(function () {
				$(this).attr('placeholder','ENTER YOUR EMAIL');
			});
			$('.subscribe-email-field').blur(function () {
				$(this).attr('placeholder','');
			});

			// Event on submit subscribe form
			$('.send-email-span, .submit-mobile').on('click', function() {

				// Get value from input field
	          	var email = $('.subscribe-email-field').val(),
					emailTo = '',
					apiKey = '',
					listID = '',
					is_email_enabled = false,
					is_mailchimp_enabled = false;

				// Subscribe via email
				if( subscribe.emailTo ) {
					is_email_enabled = true;
					emailTo = subscribe.emailTo;
				}
				// Subscribe via mailchimp
				if( subscribe.apiKey && subscribe.listID ) {
					is_mailchimp_enabled = true;
					apiKey = subscribe.apiKey;
					listID = subscribe.listID;
				}

	          	// Ajax request for sending mails
	            $.ajax({
					type: 'POST',
					url: 'assets/subscribe.php',
					data: {
						// Mailchimp service
						via_mailchimp: is_mailchimp_enabled,
						// Subscribe via email service
						via_email: is_email_enabled,
						// Field value
						email: email,
						// Your email
						email_to: emailTo,
						// Mailchimp api key
						api_key: apiKey,
						// Mailchimp list id
						list_id: listID,
						// Server success message
						success_msg: subscribe.successMsg
					},
					dataType: 'json',
					success: function(json) {
		                if(json.valid === 0) {
		                	// Set response text below field
		                	$('.subscribe-email-label').addClass('subscribe-email-label-animation-error');
		                	$('.subscribe-email-field').addClass('subscribe-email-field-animation-error');
		                }
		                else {
		                	// Set response text below field
		                	$('.subscribe-email-label').removeClass('subscribe-email-label-animation-error');
		                	$('.subscribe-email-field').removeClass('subscribe-email-field-animation-error');
		                	$('.subscribe-email-field').val(json.message);
		                	setTimeout(function() {
		                		$('.subscribe-email-field').val('');
		                		$('.subscribe-form').removeClass('subscribe-email-field-on-focus');
		                	}, 2000);
		                }
	              	},
	              	error: function (jqXHR, textStatus, errorThrown) {
	                    console.log(textStatus, errorThrown);
	                }

	          });

	          return false;

	        });

		});
	} ( jQuery ) );
	
/***************************************************************************
*******************************		6. SUBSCRIBE AND SOCIAL BUTTONS HOVER
****************************************************************************/
	$('.subscribe-btn').hover(function () {
		$(this).addClass('subscribe-btn-hover subscribe-btn-color-active');
	},function () {
		$(this).removeClass('subscribe-btn-hover subscribe-btn-color-active')
	});

	$('.soc-wrap').hover(function () {
		$(this).addClass('soc-wrap-hover');
	},function () {
		$(this).removeClass('soc-wrap-hover')
	});
/******************************************************************
*******************************		7. SUBSCRIBE INPUT FIELD
******************************************************************/

	/*!
	 * classie - class helper functions
	 * from bonzo https://github.com/ded/bonzo
	 * 
	 * classie.has( elem, 'my-class' ) -> true/false
	 * classie.add( elem, 'my-new-class' )
	 * classie.remove( elem, 'my-unwanted-class' )
	 * classie.toggle( elem, 'my-class' )
	 */

	/*jshint browser: true, strict: true, undef: true */
	/*global define: false */

	( function( window ) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg( className ) {
	  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

	// transport
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( classie );
	} else {
		// browser global
		window.classie = classie;
	}

	})( window );

	(function() {

		// trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( 'input.subscribe-email-field' ) ).forEach( function( inputEl ) {
			// in case the input is already filled..
			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'subscribe-email-field-on-focus' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'subscribe-email-field-on-focus' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'subscribe-email-field-on-focus' );
			}
		}
		
	})();


	
