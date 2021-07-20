<?php
/**
 * This code contains the PHP needed to register and
 * unregister block styles. 
 * 
 * Also see src/block-styles.js for more styles related code.
 * 
 */

/**
 * Because there is a different dependency - wp-dom-ready - the
 * JS file is enqueued separately from the the other block JS file.
 */
add_action( 'enqueue_block_editor_assets', 'myprefix_add_block_styles' );

function myprefix_add_block_styles(){
    wp_enqueue_script(
        'myprefix-block-styles-script',
        MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) . '/index.js',
        array(),
        filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/index.js' ), // *** Dev only
        true
    );

    /**
     * This style sheet only has to be registered. 
     * It will be enqueued automatically because it is set as 
     * the `firebrick` style (added below) `style_handle`. 
     */ 
    wp_register_style( 
        'myprefix-block-styles-style', 
        MYPREFIX_GUT_BLOCKS_PLUGIN_URL . basename( __DIR__ ) .  '/styles.css',
        array( 'wp-edit-blocks' ),
        filemtime( MYPREFIX_GUT_BLOCKS_PLUGIN_PATH . basename( __DIR__ ) . '/styles.css' )   
    );
}
 

/**
 * register_block_style() can be top-level code, 
 * and does not need to be called by an action hook.
 */

// Use style sheet registered above
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

// This will be removed below
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
add_action('after_setup_theme', 'myprefix_unregister_block_styles', 99);

function myprefix_unregister_block_styles() {
    // This one registered above
    unregister_block_style( 'core/paragraph', 'remove-pink' );
    // This will not remove the core/button outline style because core block styles are registered using JS
    // Commented out to stop PHP warning
    //unregister_block_style( 'core/button', 'outline' );
}

