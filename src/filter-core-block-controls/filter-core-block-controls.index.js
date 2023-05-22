/**
 * External dependencies
 */
import classnames from "classnames";
import { assign, merge } from "lodash";

/**
 * WordPRess dependencies
 */
import { __ } from "@wordpress/i18n";
import { addFilter } from "@wordpress/hooks";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";

/******************************************************************************
 *
 * Add Size attribute to Button block
 *
 * @see {@link https://css-tricks.com/a-crash-course-in-wordpress-block-filters/}
 *
 * @param  {Object} settings Original block settings
 * @param  {string} name     Block name
 * @return {Object}          Filtered block settings
 *
 ******************************************************************************/

function myprefixAddAttributes(settings, name) {
  if (name === "core/list") {
    const newSet = assign({}, settings, {
      attributes: merge(settings.attributes, {
        listType: {
          type: "string",
          default: "disc",
        },
      }),
    });
    console.log(newSet);
    return newSet;
  }
  return settings;
}

addFilter("blocks.registerBlockType", "myprefix/list-block/add-attributes", myprefixAddAttributes);

/******************************************************************************
 * Add list-style-type control to Button block.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blockedit}
 *
 *****************************************************************************/

const myprefixAddInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const {
      attributes: { listType, ordered, className },
      setAttributes,
      name,
    } = props;

    // Check block is a list and unordered
    if (name !== "core/list" || ordered === true) {
      return <BlockEdit {...props} />;
    }

    // set listType and className
    const onChange = (newListType) => {
      // Take out any previous has-list-style-type- className, but keep other classNames
      const classNamesKeep = className
        .split(" ")
        .filter((el) => !el.includes("has-list-style-type"))
        .join(" ");

      // Add new className
      const NewClassName = classnames(
        classNamesKeep,
        listType ? `has-list-style-type-${newListType}` : ""
      );

      setAttributes({
        listType: newListType,
        className: NewClassName,
      });
    };

    return (
      <>
        <BlockEdit {...props} />
        <InspectorControls>
          <PanelBody title={__("List Settings", "textDomain")} initialOpen={false}>
            <SelectControl
              label={__("List Style Type", "textDomain")}
              value={listType}
              options={[
                {
                  label: __("Disc", "textDomain"),
                  value: "disc",
                },
                {
                  label: __("Circle", "textDomain"),
                  value: "circle",
                },
                {
                  label: __("Square", "textDomain"),
                  value: "square",
                },
              ]}
              onChange={onChange}
            />
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, "withInspectorControl");

addFilter(
  "editor.BlockEdit",
  "myprefix/list-block/add-inspector-controls",
  myprefixAddInspectorControl
);

/******************************************************************************
 *
 * Add an extra class to the block in the editor.
 *
 * @see {@link https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#editor-blocklistblock}
 *
 *****************************************************************************/

const withAddListTypeClass = createHigherOrderComponent((BlockListBlock) => {
  return (props) => {
    const {
      attributes: { listType, ordered },
      className,
      name,
    } = props;

    if (name !== "core/list" || ordered) {
      return <BlockListBlock {...props} />;
    }
    return (
      <BlockListBlock
        {...props}
        className={classnames(className, listType ? `extra-class-for-editor-${listType}` : "")}
      />
    );
  };
}, "withAddListTypeClass");

addFilter("editor.BlockListBlock", "myprefix/list-block/add-editor-class", withAddListTypeClass);
