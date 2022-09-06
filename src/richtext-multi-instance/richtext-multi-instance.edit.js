import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const edit = (props) => {
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
};
