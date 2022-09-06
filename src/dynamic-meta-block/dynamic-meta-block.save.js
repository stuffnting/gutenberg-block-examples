import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

import { style } from "./dynamic-meta-block.style";

export const save = (props) => {
  const blockProps = useBlockProps.save({ style });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
};
