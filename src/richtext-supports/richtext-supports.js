const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-supports", {
  apiVersion: 2,
  title: "RichText Supports",
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
  supports: {
    anchor: true, // Adds the anchor field to the Advanced panel in the block inspector
    align: true, // This is for block alignment
    //color: true, // This will add text and background but not gradient
    /*Adds colour pickers to the block inspector (WP 5.6), 
        Supports background, text and gradient. Adding support for gradient, as done here,
        also adds support for background and text colours because `color` is `true` if it contains a non-empty object.
        see https://developer.wordpress.org/block-editor/developers/block-api/block-supports/#color*/
    color: {
      gradient: true,
    },
    fontSize: true, // Adds a drop down to the Block Inspector WP 5.6
    html: false, // Prevents Edit HTML is ... menu
    //multiple: false, // Only allows on of this block in each post
    lineHeight: true, // Adds a control to Block Inspector WP 5.6, this needs theme support, see the PHP file
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
