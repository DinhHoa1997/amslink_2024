$(function () {
    $('#menu').mmenu();
    $('.nav li').hover(function () {
        $('ul:first', this).stop().fadeIn();
    }, function () {
        $('ul', this).hide();
    });
    $('#searchformmobile').click(function () {
        $('.box-search-mobile').stop().slideToggle();
        return false;
    });
    $('.icon-cart').click(function () {
        window.location = '/addcart/';
    });
    $('.selectcat').click(function () {
        $('.categorypage').stop().slideToggle();
    });
    $('.btn-show-search-mobile').click(function () {
        $('.box-search-mobile-1').stop().slideToggle();
        return false;
    })
    $('.item-tab-detail-product').click(function () {
        $('.item-tab-detail-product').removeClass('active');
        $(this).addClass('active');
        $('.content-tab-pro').hide();
        $('#' + $(this).attr('data-tab')).stop().fadeIn();
    });
    $('.item-tab-product').click(function () {
        $('.item-tab-product').removeClass('active-tab');
        $(this).addClass('active-tab');
        $('.content-tab-pro').hide();
        $('#' + $(this).attr('data-tab')).stop().slideDown();
    });
    var divi = 0;
    $('.content-detail table').each(function () {
        var me = $(this);
        divi++;
        $('<div id ="div-scroll-' + divi + '" class="div-scroll" />').insertBefore(me);
        $("#div-scroll-" + divi).html(me);
    });
    $(".menu-click-down").click(function () {
        $(".nav").stop().slideToggle(0);
    });
    $("#button-btt").click(function () {
        $("html, body").animate({scrollTop: 0}, "slow");
        return false;
    });


    $(window).scroll(function (event) {
        if ($(this).scrollTop() > 500) {
            $("#button-btt").fadeIn();
        } else {
            $("#button-btt").fadeOut();
        }
    });


    var menubar = $('.header').position();
    $(window).scroll(function (event) {
        if ($(this).scrollTop() > (menubar.top + 200)) {
            $('.header').addClass("header-fixed");
        } else {
			$('.header').removeClass("header-fixed");
        }
    });		
	
    

    /*Disable full page*/
    /*
    $(".content-detail, .cat-content").on("contextmenu", function (e) {
        return false;
    });

    $('body').bind('cut copy paste', function (e) {
        e.preventDefault();
    });
    */

});
$.fn.digits = function () {
    return this.each(function () {
        $(this).text($(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
$.fn.dinhdangso = function () {
    return this.each(function () {
        $(this).html($(this).html().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1."));
    });
};
(function ($) {
    $.fn.extend({
        checkNull: function () {
            var obj = this;
            var ok = true;
            $('.notNull', obj).each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('error');
                    ok = false;
                }
            });
            return ok;
        },
        frmSubmit: function () {
            var obj = this;
            obj.submit(function () {
                var ok = $(this).checkNull();
                if (ok == false) {
                    alert(obj.attr('data-alert'));
                    obj.find(".modal-box, .modal-overlay").fadeOut(500, function () {
                        $(".modal-overlay").remove();
                    });


                } else {
                    obj.ajaxSubmit({
                        beforeSubmit: function (a, f, o) {
                            obj.fadeTo('fast', 0.3);
                            o.dataType = 'html';
                        },
                        success: function (data) {
                            obj.fadeTo('fast', 1);
                            if (data == 1) {
                                obj.find(".msgbox").removeClass("form-error");

                                obj[0].reset();
                                obj.find(".msgbox").html(obj.attr('data-success'));
                                obj.find(".msgbox").addClass("form-success");
                                obj.find(".captcha_message").fadeOut();
								
								window.location.href = obj.attr('data-redirect');

                            } else if (data == -1) {
                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(obj.attr('data-captcha'));
                            } else {

                                obj.find(".msgbox").addClass("form-error");
                                obj.find(".msgbox").html(data);
                            }
                            $('.imgCaptcha').attr("src", "/lib/imagesercurity.php");
                        }
                    });
                }
                return false;
            });
        }
    });
    $(document).ready(function () {
        $('#regform').frmSubmit();
		$('#regform2').frmSubmit();
		
        $('#contactform').frmSubmit();
		$('#dailyform').frmSubmit();
		
		$('#news_regform').frmSubmit();
		$('#pop_regform').frmSubmit();
		
		
    });
})(jQuery);


// Create Countdown
var Countdown = {
  
    // Backbone-like structure
    $el: $('.countdown'),
    
    // Params
    countdown_interval: null,
    total_seconds     : 0,
    
    // Initialize the countdown  
    init: function() {
      
      // DOM
          this.$ = {
          hours  : this.$el.find('.bloc-time.hours .figure'),
          minutes: this.$el.find('.bloc-time.min .figure'),
          seconds: this.$el.find('.bloc-time.sec .figure')
         };
  
      // Init countdown values
      this.values = {
            hours  : this.$.hours.parent().attr('data-init-value'),
          minutes: this.$.minutes.parent().attr('data-init-value'),
          seconds: this.$.seconds.parent().attr('data-init-value'),
      };
      
      // Initialize total seconds
      this.total_seconds = this.values.hours * 60 * 60 + (this.values.minutes * 60) + this.values.seconds;
  
      // Animate countdown to the end 
      this.count();    
    },
    
    count: function() {
      
      var that    = this,
          $hour_1 = this.$.hours.eq(0),
          $hour_2 = this.$.hours.eq(1),
          $min_1  = this.$.minutes.eq(0),
          $min_2  = this.$.minutes.eq(1),
          $sec_1  = this.$.seconds.eq(0),
          $sec_2  = this.$.seconds.eq(1);
      
          this.countdown_interval = setInterval(function() {
  
          if(that.total_seconds > 0) {
  
              --that.values.seconds;              
  
              if(that.values.minutes >= 0 && that.values.seconds < 0) {
  
                  that.values.seconds = 59;
                  --that.values.minutes;
              }
  
              if(that.values.hours >= 0 && that.values.minutes < 0) {
  
                  that.values.minutes = 59;
                  --that.values.hours;
              }
  
              // Update DOM values
              // Hours
              that.checkHour(that.values.hours, $hour_1, $hour_2);
  
              // Minutes
              that.checkHour(that.values.minutes, $min_1, $min_2);
  
              // Seconds
              that.checkHour(that.values.seconds, $sec_1, $sec_2);
  
              --that.total_seconds;
          }
          else {
              clearInterval(that.countdown_interval);
          }
      }, 1000);    
    },
    
    animateFigure: function($el, value) {
      
       var that         = this,
               $top         = $el.find('.top'),
           $bottom      = $el.find('.bottom'),
           $back_top    = $el.find('.top-back'),
           $back_bottom = $el.find('.bottom-back');
  
      // Before we begin, change the back value
      $back_top.find('span').html(value);
  
      // Also change the back bottom value
      $back_bottom.find('span').html(value);
  
      // Then animate
      TweenMax.to($top, 0.8, {
          rotationX           : '-180deg',
          transformPerspective: 300,
            ease                : Quart.easeOut,
          onComplete          : function() {
  
              $top.html(value);
  
              $bottom.html(value);
  
              TweenMax.set($top, { rotationX: 0 });
          }
      });
  
      TweenMax.to($back_top, 0.8, { 
          rotationX           : 0,
          transformPerspective: 300,
            ease                : Quart.easeOut, 
          clearProps          : 'all' 
      });    
    },
    
    checkHour: function(value, $el_1, $el_2) {
      
      var val_1       = value.toString().charAt(0),
          val_2       = value.toString().charAt(1),
          fig_1_value = $el_1.find('.top').html(),
          fig_2_value = $el_2.find('.top').html();
  
      if(value >= 10) {
  
          // Animate only if the figure has changed
          if(fig_1_value !== val_1) this.animateFigure($el_1, val_1);
          if(fig_2_value !== val_2) this.animateFigure($el_2, val_2);
      }
      else {
  
          // If we are under 10, replace first figure with 0
          if(fig_1_value !== '0') this.animateFigure($el_1, 0);
          if(fig_2_value !== val_1) this.animateFigure($el_2, val_1);
      }    
    }
  };
  
  // Let's go !
  Countdown.init();


(function ( $ ) {
 
    $.fn.LongPageNavigation = function( options ) {
 
        var settings = $.extend({
			longPageNavigationPosition:"" ,
        }, options );
 
 
	if(settings.longPageNavigationPosition=="")
	{
		 $(this).before('<div class="longPageNavigationDiv"><ul></ul></div>');
	}
	else
	{
		 $('.'+settings.longPageNavigationPosition).append('<div class="longPageNavigationDiv"><ul></ul></div>');
		
	}	
    
	var count = 0;
	
     $(this).children('h2, h3').each(function(index){
		count++;
		var getMenuName = $(this).text();
		$(this).attr('id','LongNavigation-'+index);

		if( $(this).is("h3") )
			
			var li     = '<li class="toc-heading3"><a href="#LongNavigation-'+index+'">'+ getMenuName +'</a></li>'; 			
			
		else
			
			var li     = '<li class="toc-heading2"><a href="#LongNavigation-'+index+'">'+ getMenuName +'</a></li>'; 

		/*
		if( $(this).is("h3") ){                                     
			prevH2List = $("<ul></ul>");                
			prevH2Item = $(li);                                     
			prevH2Item.append(prevH2List);                          

			$('.longPageNavigationDiv ul').append(prevH2Item);				
		} else {                                                    
			
			$('.longPageNavigationDiv ul').append(li);
		}       		   
		*/

		$('.longPageNavigationDiv ul').append(li);
		 
	 });
	 
	 if(count == 0) $('.longPageNavigationDiv').hide();
       
// Smooth Navigation	   
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 165
		}, 500);
	});
// Smooth Navigation END	        
    };
 
}( jQuery ));



        