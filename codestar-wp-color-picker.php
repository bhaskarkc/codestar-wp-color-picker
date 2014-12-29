<?php if ( ! defined( 'ABSPATH' ) ) { die; } // Cannot access pages directly.
/**
 *
 * ----------------------------------------------------------------------------------------------------
 *
 * Codestar WP Color Picker
 * This is plugin for WordPress Color Picker Alpha Channel
 *
 * Plugin Name: Codestar WP Color Picker
 * Plugin URI: http://codestarframework.com/
 * Author: Codestar
 * Author URI: http://codestarlive.com/
 * Version: 1.0.0
 * Description: This is plugin for WordPress Color Picker Alpha Channel
 * License: GPLv2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: cs-framework
 *
 * ----------------------------------------------------------------------------------------------------
 *
 * Copyright 2015 Codestar <info@codestarlive.com>
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 *
 * ----------------------------------------------------------------------------------------------------
 *
 */
if( ! function_exists( 'codestar_wp_color_picker' ) ) {
  function codestar_wp_color_picker() {

    // enqueue style
    wp_enqueue_style( 'wp-color-picker' );
    wp_enqueue_style( 'cs-wp-color-picker', plugins_url( 'css/cs-wp-color-picker.min.css', __FILE__ ), array( 'wp-color-picker' ), '1.0.0', 'all' );

    // enqueue scripts
    wp_enqueue_script( 'wp-color-picker' );
    wp_enqueue_script( 'cs-wp-color-picker', plugins_url( 'js/cs-wp-color-picker.min.js', __FILE__ ), array( 'wp-color-picker' ), '1.0.0', true );

  }
  add_action( 'admin_enqueue_scripts', 'codestar_wp_color_picker' );
}