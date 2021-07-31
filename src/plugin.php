<?php
/**
 * Plugin Name: SNT Gutenberg Block Examples
 * Plugin URI: https://github.com/stuffnting/gutenberg-block-examples
 * Description: Code examples for Gutenberg blocks.
 * Description: Simple plugin that handles events with Gutenberg blocks.
 * Author: Grover Stones
 * Author URI: https://stuffnting.com
 * version: 1.0.0
 * Requires at least: 5.7
 * Requires PHP: 7.2
 * License: GPL v3 or later
 * License URI: https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain: sntEvents
 */

if( !defined( 'ABSPATH') ) {
  exit;
}

/*
 * Define path and URL of this plugin directory
 */
define( 'MYPREFIX_GUT_BLOCKS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
define( 'MYPREFIX_GUT_BLOCKS_PLUGIN_URL', plugins_url( '/', __FILE__ ) );


require_once('richtext-text-align/index.php');

/* require_once('richtext-basic-block/index.php');
require_once('richtext-formatting-options/index.php');
require_once('richtext-custom-toolbar-buttons/index.php'); */
require_once('richtext-supports/index.php');

/* require_once('richtext-multiline/index.php');
require_once('richtext-multiple-instances/index.php');

require_once('richtext-split-merge/index.php');
require_once('richtext-transforms-simple/index.php');
require_once('richtext-transforms-multiblock/index.php');*/

//require_once('richtext-flexible-paragraph/index.php'); 

/* require_once('variations-existing-blocks/index.php');
require_once('variations-register-blocks/index.php');

require_once('block-collection/index.php');
require_once('block-styles/index.php');

require_once('inner-blocks/index.php');
require_once('inner-blocks-template/index.php');*/

//require_once('block-patterns/index.php');  

//require_once('templates/index.php');


/* require_once('metabox-simple-block/index.php');
require_once('metabox-document-settings/index.php');
require_once('metabox-plugin-sidebar/index.php');
require_once('metabox-attribute/index.php');
require_once('metabox-inner-blocks-inspector/index.php');
require_once('metabox-with-media/index.php');
require_once('metabox-notices-save-lock/index.php');

require_once('metabox-with-select-doc-settings/index.php');

require_once('dynamic-block-simple/index.php');
require_once('dynamic-block-serverside-render/index.php');
require_once('dynamic-block-inspector-controls/index.php');
require_once('dynamic-block-inner-blocks/index.php');
require_once('dynamic-block-inspector-query-terms/index.php');
require_once('dynamic-meta-block/index.php');

require_once('filter-core-block-supports/index.php');
require_once('filter-core-block-class-names/index.php');
require_once('filter-core-block-controls/index.php'); */

//require_once('php/custom-class/index.php');