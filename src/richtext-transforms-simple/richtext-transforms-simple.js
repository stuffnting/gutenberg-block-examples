const { registerBlockType, createBlock } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

const BLOCK_NAME = "myprefix/richtext-transforms-simple";

registerBlockType(BLOCK_NAME, {
  apiVersion: 2,
  title: "RichText Transforms Simple",
  icon: "lightbulb",
  category: "text",
  attributes: {
    content: {
      type: "string",
      source: "html", // Not 'text'
      selector: "h2",
      default: "",
    },
  },
  transforms: {
    /**
     * `from` transformations appear in the transform menu
     * (first button in the block toolbar) of the block type that
     * transforms to this block type.
     */
    from: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: ({ content, className }) => {
          return createBlock(BLOCK_NAME, {
            content,
            className: `${className} transformed-from-paragraph`,
          });
        },
      },
      {
        type: "block",
        blocks: ["core/heading"],
        transform: ({ content, className }) => {
          return createBlock(BLOCK_NAME, {
            content,
            className: `${className} transformed-from-paragraph`,
          });
        },
      },
    ],
    /**
     * `to` transformations appear in the transform menu
     * (first button in the block toolbar) of this block type.
     */
    to: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: ({ content, className }) => {
          return createBlock("core/paragraph", {
            content,
            className,
          });
        },
      },
      {
        type: "block",
        blocks: ["core/heading"],
        transform: ({ content, className }) => {
          return createBlock("core/heading", {
            content,
            className,
            level: 2,
          });
        },
      },
    ],
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content } = attributes;
    const blockProps = useBlockProps();

    return (
      <RichText
        identifier="content"
        tagName="h2"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__("Write heading…", "textDomain")}
        {...blockProps}
      />
    );
  },
  save: ({ attributes }) => {
    const { content } = attributes;
    const blockProps = useBlockProps.save();

    return (
      <h2 {...blockProps}>
        <RichText.Content value={content} />
      </h2>
    );
  },
});
