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
  edit: (props) => {
    const blockProps = useBlockProps();
    const { attributes } = props;
    const { content } = attributes;

    return (
      <div {...blockProps}>
        <h2>{content} (from the edit() method)</h2>
      </div>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
