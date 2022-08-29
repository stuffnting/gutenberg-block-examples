import classnames from "classnames";

import { assign, merge } from "lodash";

import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/blockEditor";
import { PanelBody, SelectControl } from "@wordpress/components";

/**
 * Add Size attribute to Button block
 *
 * @see {@link https://css-tricks.com/a-crash-course-in-wordpress-block-filters/}
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 */
function myprefixAddAttributes(settings, name) {
  if (name === "core/button") {
    return assign({}, settings, {
      attributes: merge(settings.attributes, {
        size: {
          type: "string",
          default: "",
        },
      }),
    });
  }
  return settings;
}

addFilter(
  "blocks.registerBlockType",
  "textDomain/button-block/add-attributes",
  myprefixAddAttributes
);

/**
 * Add Size control to Button block.
 *
 * Edit is used to modify the block’s `edit` component.
 * It receives the original block BlockEdit component
 * and returns a new wrapped component.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit}
 */
const myprefixAddInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const {
      attributes: { size },
      setAttributes,
      name,
    } = props;
    if (name !== "core/button") {
      return <BlockEdit {...props} />;
    }
    return (
      <Fragment>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody
            title={__("Size settings", "textDomain")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Size", "textDomain")}
              value={size}
              options={[
                {
                  label: __("Regular", "textDomain"),
                  value: "regular",
                },
                {
                  label: __("Small", "textDomain"),
                  value: "small",
                },
                {
                  label: __("Large", "textDomain"),
                  value: "large",
                },
              ]}
              onChange={(value) => {
                setAttributes({ size: value });
              }}
            />
          </PanelBody>
        </InspectorControls>
      </Fragment>
    );
  };
}, "withInspectorControl");

addFilter(
  "editor.BlockEdit",
  "textDomain/button-block/add-inspector-controls",
  myprefixAddInspectorControl
);

/**
 * Add size class to the block in the editor.
 *
 * BlockListBlock is used to modify the block’s wrapper component
 * containing the block’s `edit` component and all toolbars.
 * It receives the original BlockListBlock component and returns a new wrapped component.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blocklistblock}
 */
const myprefixAddSizeClass = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const {
      attributes: { size },
      className,
      name,
    } = props;

    if (name !== "core/button") {
      return <BlockListBlock {...props} />;
    }
    return (
      <BlockListBlock
        {...props}
        className={classnames(className, size ? `has-size-${size}` : "")}
      />
    );
  };
}, "withClientIdClassName");

addFilter(
  "editor.BlockListBlock",
  "intro-to-filters/button-block/add-editor-class",
  myprefixAddSizeClass
);
