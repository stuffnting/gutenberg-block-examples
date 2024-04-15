<?php
/**
 * Render `myprefix/block-hooks-basic` to add a like button at the bottom of the 
 * contents on the front-end.
 */
?>

<div
	<?php echo get_block_wrapper_attributes(); ?>
>
	<div class="like-button" >
	<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M19 5.25C19 2.765 16.901 0.75 14.312 0.75C12.377 0.75 10.715 1.876 10 3.483C9.285 1.876 7.623 0.75 5.687 0.75C3.1 0.75 1 2.765 1 5.25C1 12.47 10 17.25 10 17.25C10 17.25 19 12.47 19 5.25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
	</svg>
		<span>
			<?php _e( 'Like', 'like-button' ); ?>
		</span>
	</div>
</div>