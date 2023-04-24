import { registerBlockType } from "@wordpress/blocks";
import { useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

import { TheInspectorControls } from "./inspector-controls";
import { GetPosts } from "./get-posts";
import metadata from "./dynamic-inspector-query-terms.block.json";

registerBlockType(metadata, {
  edit: (props) => {
    const blockProps = useBlockProps();
    return (
      <>
        <TheInspectorControls parentProps={props} />
        <div {...blockProps}>
          <h2 key="1">Query term posts</h2>
          <GetPosts perPage={props.attributes.perPage} />
        </div>
      </>
    );
  },
  save: () => null,
});
