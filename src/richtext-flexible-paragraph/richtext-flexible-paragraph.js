// classnames is an external dependency installed by @wordpress/block-editor
import classnames from "classnames";

// Experimental feature in Gutenberg, copied from GitHub to file
import FontFamilyControl from "./font-family-control";

// The block name is set in a constant because it appears thrice, once in the first argument of registerBlockType(),once in the `transforms` object and once in the `onSplit` function.
const BLOCK_NAME = "myprefix/richtext-flexible-paragraph";

const { registerBlockType, createBlock } = wp.blocks;
const {
  RichText,
  BlockControls,
  AlignmentToolbar,
  useBlockProps,
  InspectorControls,
} = wp.blockEditor;
const { PanelBody } = wp.components;
const { __ } = wp.i18n;

registerBlockType(BLOCK_NAME, {
  apiVersion: 2,
  title: "RichText Flexible Paragraph",
  icon: "lightbulb",
  category: "text",
  supports: {
    align: ["left", "right", "wide", "full"], // This is for block alignment
    fontSize: true,
    lineHeight: true,
    anchor: true,
    color: true,
  },
  attributes: {
    content: {
      type: "string",
      source: "html",
      selector: "p",
      default: "",
    },
    textAlign: {
      type: "string", // Text alignment
      default: "none",
    },
    fontFamily: {
      type: "string",
      default: "",
    },
  },
  example: {
    attributes: {
      content: `Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack! " my brave ghost pled.`,
      textAlign: "center",
      fontSize: "large",
      align: "full",
      fontFamily: "serif",
    },
  },
  transforms: {
    from: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: (props) => {
          const { content, className, align } = props;
          return createBlock(BLOCK_NAME, {
            content,
            className: `${className} transformed-from-paragraph`,
            textAlign: align,
          });
        },
      },
    ],
    to: [
      {
        type: "block",
        blocks: ["core/paragraph"],
        transform: (props) => {
          const { content, className, textAlign } = props;
          return createBlock("core/paragraph", {
            content,
            className,
            align: textAlign,
          });
        },
      },
    ],
  },
  merge: (attributes, attributesToMerge) => {
    return {
      content: (attributes.content || "") + (attributesToMerge.content || ""),
    };
  },
  edit: (props) => {
    const { attributes, setAttributes, onReplace, mergeBlocks } = props;
    const { content, textAlign, fontFamily } = attributes;

    // https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
    // https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/
    // classnames is an external dependency
    const blockProps = useBlockProps({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
        [`has-${fontFamily}-font-family`]: fontFamily,
      }),
    });

    return (
      <>
        <BlockControls>
          <AlignmentToolbar
            value={textAlign}
            onChange={(newalign) => setAttributes({ textAlign: newalign })}
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody title="Font Family" initialOpen={false}>
            <FontFamilyControl
              fontFamilies={[
                { fontFamily: "sans-serif", name: "Sans-serif" },
                { fontFamily: "serif", name: "Serif" },
                { fontFamily: "monospace", name: "Monospace" },
              ]}
              value={fontFamily}
              onChange={(value) => setAttributes({ fontFamily: value })}
            />
          </PanelBody>
        </InspectorControls>
        <RichText
          tagName="p"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          onSplit={(value) => {
            if (!value) {
              return createBlock("core/paragraph");
            }
            return createBlock(BLOCK_NAME, {
              ...attributes,
              content: value,
            });
          }}
          onReplace={onReplace}
          onMerge={mergeBlocks}
          onRemove={onReplace}
          placeholder={__("Enter text...", "textDomain")}
          keepPlaceholderOnFocus={true}
          {...blockProps}
        />
      </>
    );
  },
  save: ({ attributes }) => {
    const { content, textAlign, fontFamily } = attributes;

    const blockProps = useBlockProps.save({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
        [`has-${fontFamily}-font-family`]: fontFamily,
      }),
    });

    return <RichText.Content tagName="p" value={content} {...blockProps} />;
  },
});
