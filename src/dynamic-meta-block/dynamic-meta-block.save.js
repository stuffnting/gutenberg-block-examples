import { useBlockProps, useInnerBlocksProps } from "@wordpress/block-editor";

import { style } from "./dynamic-meta-block.style";

export const save = (props) => {
  const blockProps = useBlockProps.save({ style });
  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps} />;
};
