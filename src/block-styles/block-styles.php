<?php
/**
 * This code contains the PHP needed to register and
 * unregister block styles. 
 * 
 * Also see block-styles.js for more styles related code.
 * 
 */


 /**
 * Only enqueue the index.js in the editor.
 */
add_action( 'enqueue_block_editor_assets', 'myprefix_add_block_styles_editor' );

function myprefix_add_block_styles_editor() {
    if ( ! function_exists( 'register_block_type' ) ) {
        // Gutenberg is not active.
        return;
    }

    wp_enqueue_script(
        'myprefix-block-styles-script',
        MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
        array('wp-dom-ready', 'wp-block-editor', 'wp-blocks', 'wp-element', 'wp-i18n'),
        filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
    );
}

/**
 * Enqueue the stylesheet here.
 */
add_action( 'enqueue_block_assets', 'myprefix_add_block_styles' );

function myprefix_add_block_styles() {

    wp_enqueue_style( 
        'myprefix-block-styles-style', 
        MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) .  '/style.css',
        array(),
        filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/style.css' )   
    );
}
 
/**
 * register_block_style() can be top-level code, and does not need to be called 
 * by an action hook. It is called here using `init` for neatness.
 * 
 * More styles are registered in the JS file.
 */
add_action( 'init', 'myprefix_add_block_register_styles' );

function myprefix_add_block_register_styles() {
    // Use stylesheet registered above
    register_block_style(
        'core/paragraph',
        array(
            'name'  => 'firebrick', // Adds class name .is-style-firebrick
            'label' => __( 'Fire Brick Red', 'textDomain' ),
            'style_handle'=> 'myprefix-block-styles-style'
        )
    );

    // Use inline style
    register_block_style(
        'core/paragraph',
        array(
            'name'         => 'dodgerblue', // Adds class name .is-style-dodgerblue
            'label'        => __( 'Dodger Blue', 'textDomain' ),
            'inline_style' => '.is-style-dodgerblue{ color: dodgerblue; }'
        )
    );

    // This will be removed with PHP below
    register_block_style(
        'core/paragraph',
        array(
            'name'         => 'remove-pink',  // Adds class name is-style-remove-pink
            'label'        => __( 'Removed with php', 'textDomain' ),
            'inline_style' => '.is-style-remove-pink{ color: pink; }'
        )
    );

    // This will be removed with JS
    register_block_style(
        'core/paragraph',
        array(
            'name'         => 'remove-gold', // Adds class name is-style-remove-gold
            'label'        => __( 'Removed with JS', 'textDomain' ),
            'inline_style' => '.is-style-remove-gold{ color: gold; }'
        )
    );

}

/**
 * This code unregisters block styles, and is called from an
 * action hook to make sure any styles it needs to unregister, 
 * have been registered.
 * 
 * *** NOTE ***
 * unregister_block_style() can only unregister styles registered with PHP.
 * For all styles registered with JS, including all of the built-in styles,
 * use the JS code in src/block-styles.js.
 */
add_action('init', 'myprefix_unregister_block_styles', 99);

function myprefix_unregister_block_styles() {
    // This one registered above
    unregister_block_style( 'core/paragraph', 'remove-pink' );
    // This will not remove the core/button outline style because core block styles are registered using JS
    // Commented out to stop PHP warning
    //unregister_block_style( 'core/button', 'outline' );
}