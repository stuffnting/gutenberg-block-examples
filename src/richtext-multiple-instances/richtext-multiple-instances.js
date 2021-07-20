const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

registerBlockType("myprefix/richtext-multiple-instances", {
  apiVersion: 2,
  title: "RichText Multiple Instances",
  icon: "lightbulb",
  category: "text",
  attributes: {
    heading: {
      type: "string",
      source: "html", // Not 'text'
      selector: "header h1",
      default: "",
    },
    content: {
      type: "string",
      source: "html", // Not 'text'
      selector: "p",
      default: "",
    },
    footer: {
      type: "string",
      source: "html", // Not 'text'
      selector: "footer p",
      default: "",
    },
  },
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { heading, content, footer } = attributes;
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        <RichText
          identifier="heading"
          tagName="h1"
          className="my-heading"
          value={heading}
          onChange={(value) => setAttributes({ heading: value })}
          placeholder={__("Write heading…", "textDomain")}
        />
        <RichText
          identifier="content"
          tagName="p"
          className="my-content"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder={__("Write some content…", "textDomain")}
        />
        <RichText
          identifier="footer"
          tagName="p"
          className="my-footer"
          value={footer}
          onChange={(value) => setAttributes({ footer: value })}
          placeholder={__("Write a footer…", "textDomain")}
        />
      </div>
    );
  },
  save: ({ attributes }) => {
    const { heading, content, footer } = attributes;
    const blockProps = useBlockProps.save();

    return (
      <section {...blockProps}>
        <header>
          <RichText.Content
            tagName="h1"
            className="my-heading"
            value={heading}
          />
        </header>
        <RichText.Content tagName="p" className="my-content" value={content} />
        <footer>
          <RichText.Content tagName="p" className="my-footer" value={footer} />
        </footer>
      </section>
    );
  },
});
