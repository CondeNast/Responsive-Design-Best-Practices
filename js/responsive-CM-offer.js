		var CN = typeof(CN) != 'undefined' ? CN : {};
		CN.offers = (function(){
			return {
				changeToStep : function(stepNum){
					//collapse all bodies
					$('.steps').removeClass('unfolded').addClass('folded');

					//step specific logic
					if(stepNum == 1){
						$('#step1 #selections').hide();
						$('#step1 .selection').addClass('hidden');
					}

					//open step
					$('#step'+stepNum).removeClass('folded').addClass('unfolded');
				},
				bindLinks : function(){
					//step1 selection change
					$('#step1 .selection a').unbind();
					$('#step1 .selection a').on('click', function(){
						CN.offers.changeToStep('1');
						return false;
					});

					//step2 selection change
					$('#step2 .selection a').unbind();
					$('#step2 .selection a').on('click', function(){
						CN.offers.changeToStep('2');
						return false;
					});
				}
			}
		})();

		jQuery(document).ready(function ($) { /* only include 1 doc ready function */
			if ( $.browser.msie ) {
				if(parseInt($.browser.version, 10) < 9){
				}
			} else {
				$("label").inFieldLabels();
				$("label").html("");
			}

			$('.offers').on('click', function(){
				var $this = $(this),
					selection = $this.data('selection');
						
				$('#step1 .offers').removeClass('checked');
				$this.addClass('checked');

				$('#step1').addClass('selected-step');
				$('#step1 .selection-'+selection).removeClass('hidden');

				CN.offers.bindLinks();
				
				CN.offers.changeToStep('2');
				return false;
			});

			$('.payments').on('click', function(){
				$this = $(this),
				selection = $this.data('selection');

				//toggle active class
				$('#step2 .payments').removeClass('active');
				$this.addClass('active');

				$('#step2').addClass('selected-step');
				$('#step2 .selection-'+selection).removeClass('hidden');

				CN.offers.changeToStep('3');
				return false;
			})

		});