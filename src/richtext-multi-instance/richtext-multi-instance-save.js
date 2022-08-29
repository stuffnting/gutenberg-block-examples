import { RichText, useBlockProps } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

export const save = ({ attributes }) => {
  const { heading, content, footer } = attributes;
  const blockProps = useBlockProps.save();

  return (
    <section {...blockProps}>
      {/* Wrapper block in save <section>, in editor is <div> */}
      <header>
        <RichText.Content tagName="h1" className="my-heading" value={heading} />
      </header>
      <RichText.Content tagName="p" className="my-content" value={content} />
      <footer>
        <RichText.Content tagName="p" className="my-footer" value={footer} />
      </footer>
    </section>
  );
};
