// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
// set root Object
;(function ( $, window, document, undefined ) {
  'use strict';

  // adding alpha support for Automattic Color.js toString function.
  if( typeof Color.fn.toString !== undefined ) {

    Color.fn.toString = function () {

      // check for alpha
      if ( this._alpha < 1 ) {
        return this.toCSS('rgba', this._alpha).replace(/\s+/g, '');
      }

      var hex = parseInt( this._color, 10 ).toString( 16 );

      if ( this.error ) { return ''; }

      // maybe left pad it
      if ( hex.length < 6 ) {
        for (var i = 6 - hex.length - 1; i >= 0; i--) {
          hex = '0' + hex;
        }
      }

      return '#' + hex;

    };

  }

  $.fn.cs_wpColorPicker = function() {

    return this.each(function() {

      var $this = $(this);

      // check for rgba enabled/disable
      if( $this.data('rgba') !== false ) {

        // set color and alpha value
        var color_value = $this.val().replace(/\s+/g, ''),
            alpha_value = ( color_value.indexOf('rgba') !== -1 ) ? parseFloat( color_value.replace(/^.*,(.+)\)/, '$1') * 100 ) : 100;

        // wpColorPicker core
        $this.wpColorPicker({

          // wpColorPicker: change
          change: function( event, ui ) {

            // update checkerboard background color
            $this.closest('.wp-picker-container').find('.cs-alpha-slider-offset').css('background-color', ui.color.toString());
            $this.trigger('keyup');

          },

          // wpColorPicker: create
          create: function( event, ui ) {

            // set variables for alpha slider
            var a8cIris       = $this.data('a8cIris'),
                $container    = $this.closest('.wp-picker-container'),

                // appending alpha wrapper
                $alpha_wrap   = $('<div class="cs-alpha-wrap">' +
                                  '<div class="cs-alpha-slider"></div>' +
                                  '<div class="cs-alpha-slider-offset"></div>' +
                                  '<div class="cs-alpha-text"></div>' +
                                  '</div>').appendTo( $container.find('.wp-picker-holder') ),

                $alpha_slider = $alpha_wrap.find('.cs-alpha-slider'),
                $alpha_text   = $alpha_wrap.find('.cs-alpha-text'),
                $alpha_offset = $alpha_wrap.find('.cs-alpha-slider-offset');

            // alpha slider
            $alpha_slider.slider({

              // slider: slide
              slide: function( event, ui ) {

                var slide_value = parseFloat( ui.value / 100 );

                // update iris data alpha && wpColorPicker color option && alpha text
                a8cIris._color._alpha = slide_value;
                $this.wpColorPicker( 'color', a8cIris._color.toString() );
                $alpha_text.text( ( slide_value < 1 ? slide_value : '' ) );

              },

              // slider: create
              create: function() {

                var slide_value = parseFloat( alpha_value / 100 ),
                    alpha_text_value = slide_value < 1 ? slide_value : '';

                // update alpha text && checkerboard background color
                $alpha_text.text(alpha_text_value);
                $alpha_offset.css('background-color', color_value);

                // wpColorPicker clear and default button for update iris data alpha && alpha text && slider color option
                $container.on('click', '.wp-picker-default, .wp-picker-clear', function() {

                  a8cIris._color._alpha = slide_value;
                  $alpha_text.text(alpha_text_value);
                  $alpha_slider.slider('option', 'value', alpha_value).trigger('slide');

                });

                // show alpha wrapper on click color picker button
                $container.on('click', '.wp-color-result', function() {
                  $alpha_wrap.toggle();
                });

                // hide alpha wrapper on click body
                $('body').on( 'click.wpcolorpicker', function() {
                  $alpha_wrap.hide();
                });

              },

              // slider: options
              value: alpha_value,
              step: 1,
              min: 1,
              max: 100

            });
          },

          // wpColorPicker: default color value
          defaultColor: color_value
        });

      } else {

        // wpColorPicker default picker
        $this.wpColorPicker({
          change: function() {
            $this.trigger('keyup');
          },
          defaultColor: $this.val()
        });

      }

    });

  };

  $(document).ready( function(){
    $('.cs-wp-color-picker').cs_wpColorPicker();
  });

})( jQuery, window, document );