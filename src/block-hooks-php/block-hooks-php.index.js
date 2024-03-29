/**
 * Wordpress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './block-hooks-php.block.json';

registerBlockType(metadata, {
  edit: () => {
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <h2>Added by the hook!</h2>
      </div>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
