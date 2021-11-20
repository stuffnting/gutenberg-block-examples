/**
 * This code adds a variation to a block type when it is registered.
 *
 * Variations are not the same as styles,
 * also sometimes called style variations.
 *
 * */

/**
 * If installing @wordpress packages and using `import`
 * put the `import` statements here at the top before the
 * `export default` statement below
 */

// classnames is an external dependency installed by @wordpress/block-editor
import classnames from "classnames";

const { useSelect } = wp.data;
const { PanelBody } = wp.components;
const { registerBlockType } = wp.blocks;
const {
  RichText,
  useBlockProps,
  useBlockDisplayInformation,
  BlockControls,
  InspectorControls,
  AlignmentToolbar,
} = wp.blockEditor;
const { __ } = wp.i18n;

import metadata from "./variations-register-block.json";

registerBlockType(metadata, {
  variations: [
    {
      name: "myprefix-default-red-heading",
      title: __("Restore default", "textDomain"),
      description: __(
        "Restores Variations Register Block default settings.",
        "textDomain"
      ),
      icon: "lightbulb",
      attributes: {
        placeholder: __("Add some text...", "textDomain"),
        textAlign: "left",
        className: "",
      },
      scope: ["inserter", "transform"],
      isActive: (blockAttributes, variationAttributes) =>
        blockAttributes.textAlign === variationAttributes.textAlign,
    },
    {
      name: "myprefix-centered-orange-heading",
      title: __("Centered block", "textDomain"),
      description: __(
        "Variations Register Block with centered text.",
        "textDomain"
      ),
      icon: "lightbulb",
      attributes: {
        placeholder: __("Add some centered orange text...", "textDomain"),
        textAlign: "center",
        className: "is-variation-orange",
      },
      scope: ["inserter", "transform"],
      isActive: (blockAttributes, variationAttributes) =>
        blockAttributes.textAlign === variationAttributes.textAlign,
    },
  ],
  edit: (props) => {
    const { attributes, setAttributes } = props;
    const { content, textAlign } = attributes;

    const blockProps = useBlockProps({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
    });

    const selectedBlock =
      useSelect(
        (select) => select("core/block-editor").getSelectedBlock(),
        []
      ) || {};

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
  },
  save: ({ attributes }) => {
    const { content, textAlign } = attributes;

    const blockProps = useBlockProps.save({
      className: classnames({
        [`has-text-align-${textAlign}`]: textAlign,
      }),
    });

    return (
      <h2 {...blockProps}>
        <RichText.Content value={content} />
      </h2>
    );
  },
});
