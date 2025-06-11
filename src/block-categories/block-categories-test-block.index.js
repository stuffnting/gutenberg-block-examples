/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import metadata from './block-categories-test-block.block.json';

registerBlockType(metadata.name, {
  edit: () => {
    const blockProps = useBlockProps();
    return (
      <div {...blockProps}>
        <p>I am a block</p>
      </div>
    );
  },
  save: () => {
    const blockProps = useBlockProps.save();

    return (
      <div {...blockProps}>
        <p>I am a block</p>
      </div>
    );
  },
});
