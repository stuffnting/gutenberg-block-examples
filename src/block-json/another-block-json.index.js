/**
 * WordPress dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

/**
 * Local dependencies
 */
import metadata from './another-block-json.block.json';

/**
 * Register the extra block: myprefix/another-block-json.
 */
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
