const { registerBlockType } = wp.blocks;
const { RichText, useBlockProps } = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./richtext-multi-instance.json";

registerBlockType(metadata, {
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { heading, content, footer } = attributes;
    const blockProps = useBlockProps();

    return (
      <div {...blockProps}>
        {/* Wrapper block in editor is <div>, in save <section> */}
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
        {/* Wrapper block in save <section>, in editor is <div> */}
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
