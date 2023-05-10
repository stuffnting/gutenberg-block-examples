/**
 * WordPress dependencies
 */
import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

/**
 * Local dependencies
 */
import { GetPosts } from "./get-posts";
import { PostListTitle } from "./post-list-title";
import { TheInspectorControls } from "./the-inspector-controls";
import metadata from "./dynamic-inspector-controls.block.json";

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
    // For dynamic blocks without inner blocks return null
    return null;
  },
});
