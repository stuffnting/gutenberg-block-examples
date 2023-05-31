/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Local dependencies
 */
import { TheInspectorControls } from './inspector-controls';
import { PostListTitle } from './post-list-title';
import { GetPosts } from './get-posts';
import metadata from './inspector-control-tabs.block.json';

registerBlockType(metadata.name, {
  edit: (props) => {
    const blockProps = useBlockProps();

    return (
      <>
        <TheInspectorControls parentProps={props} />
        <div {...blockProps}>
          <PostListTitle parentProps={props} />
          <GetPosts />
        </div>
      </>
    );
  },
  save: () => {
    // For dynamic blocks return null
    return null;
  },
});
