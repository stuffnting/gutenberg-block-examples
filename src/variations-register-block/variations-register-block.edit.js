import { useSelect } from "@wordpress/data";
import { PanelBody } from "@wordpress/components";
import {
  RichText,
  useBlockProps,
  useBlockDisplayInformation,
  BlockControls,
  InspectorControls,
  AlignmentToolbar,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";

// classnames is an external dependency installed by @wordpress/block-editor
import classnames from "classnames";

export const edit = (props) => {
  const { attributes, setAttributes } = props;
  const { content, textAlign } = attributes;

  const blockProps = useBlockProps({
    className: classnames({
      [`has-text-align-${textAlign}`]: textAlign,
    }),
  });

  const selectedBlock =
    useSelect((select) => select("core/block-editor").getSelectedBlock(), []) ||
    {};

  const selectedBlockInfo =
    useBlockDisplayInformation(selectedBlock.clientId) || {};

  return (
    <>
      <InspectorControls>
        <PanelBody
          title={__("Block Details", "sntEvents")}
          initialOpen={false}
          icon="info-outline"
        >
          <p>
            <strong>
              {__("These details are obtained using the", "textDomain")}{" "}
              <code>useBlockDisplayInformation()</code>{" "}
              {__("hook", "textDomain")}.
            </strong>
          </p>
          <p>
            Title:{" "}
            {selectedBlockInfo.title || __("No block selected", "textDomain")}
          </p>
          <p>Description: {selectedBlockInfo.description || ""}</p>
        </PanelBody>
      </InspectorControls>
      <BlockControls>
        <AlignmentToolbar
          value={textAlign}
          onChange={(nextAlign) => {
            setAttributes({ textAlign: nextAlign });
          }}
        />
      </BlockControls>
      <RichText
        identifier="content"
        tagName="h2"
        value={content}
        onChange={(value) => setAttributes({ content: value })}
        placeholder={__("Enter text...", "custom-block")}
        keepPlaceholderOnFocus={true}
        {...blockProps}
      />
    </>
  );
};
