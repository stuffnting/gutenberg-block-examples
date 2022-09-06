import { RichText, useBlockProps } from "@wordpress/block-editor";
import { createBlock } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import metadata from "./richtext-split-merge.block.json";

/*
 * `attributes` is the attributes from the first block.
 * `attributesToMerge` is the attributes of the second block to be merged with it.
 * Not documented.
 *
 * This function is called by mergeBlocks, see below.
 */
export const merge = (attributes, attributesToMerge) => {
  return {
    content: (attributes.content || "") + (attributesToMerge.content || ""),
  };
};

export const edit = (props) => {
  const { attributes, setAttributes, onReplace, mergeBlocks } = props;
  const { content } = attributes;
  const blockProps = useBlockProps();

  // onSplit is called twice, once for the string on each side of the split
  const onSplit = (value) => {
    /*
     * If `value` is empty make a new paragraph block.
     * This happens if the split is at the beginning or end of the block's content.
     */
    if (!value) {
      return createBlock("core/paragraph");
    }

    // If the `value` is not empty create a new myprefix/richtext-split-merge block containing the string.
    return createBlock(metadata.name, {
      ...attributes,
      content: value,
    });
  };

  return (
    <RichText
      identifier="content"
      tagName="h2"
      value={content}
      onChange={(value) => setAttributes({ content: value })}
      onMerge={mergeBlocks}
      onSplit={onSplit}
      onReplace={onReplace}
      onRemove={() => onReplace([])}
      placeholder={__("Write heading…", "textDomain")}
      {...blockProps}
    />
  );
};
