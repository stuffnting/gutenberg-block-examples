/**
 * This code contains some filter hook examples.
 * It could be simplified a bit, but has been left verbose for clarity.
 *
 * Adapted from here:
 * https://awhitepixel.com/blog/add-custom-settings-to-existing-wordpress-gutenberg-blocks/
 *
 */

/********************************************************************
 *
 * Add a new attribute to the block type being modified.
 *
 ********************************************************************/

/**
 * `settings` is an object that contains all the details about
 * the block type. A better name might be blockType, but the
 * Gutenberg documentation calls it settings.
 *
 * `name` is the name of the block, e.g. `core/cover`, which
 * is the same as `settings.name`.
 *
 * *** NOTE ***
 * `lodash.assign` can be used instead of `Object.assign`
 */

function filterCoverBlockAttributes(settings, name) {
  if (name === "core/cover") {
    /**
     * Use `Object.assign` to add a property to `settings.attributes`.
     *
     * This could be done with a single `Object.assign`:
     * `Object.assign(settings, {hideOnMobile:{type:boolean}})`
     * But, this would mutate the original `settings`.
     *
     * Using `Object.assign()` with a new empty object as the first
     * argument prevent mutation of the original `settings`,
     * and returns a new object.
     *
     * There are two nested `Object.assign`: the outer one adds all
     * of the `settings` into a new object; the inner one creates
     * a new object for `settings.attributes`, adding in all
     * the existing attributes and the new one.
     */

    return Object.assign({}, settings, {
      attributes: Object.assign({}, settings.attributes, {
        hideOnMobile: {
          type: "boolean",
          default: false,
        },
      }),
    });
  }

  return settings;
}

wp.hooks.addFilter(
  "blocks.registerBlockType",
  "myprefix/filter-cover-block-attributes",
  filterCoverBlockAttributes
);

/********************************************************************
 *
 * Add a new control to the Advanced panel of the Block Inspector.
 *
 ********************************************************************/

/**
 * `BlockEdit` is the component that sets out the controls in the
 * sidebar Block
 */

const filterCoverBlockAdvancedControls = wp.compose.createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const { ToggleControl } = wp.components;
      const { InspectorAdvancedControls } = wp.blockEditor;
      const { attributes, setAttributes, isSelected } = props;

      return isSelected && props.name === "core/cover" ? (
        <>
          {/* Add in the original controls */}
          <BlockEdit {...props} />
        </>
      ) : (
        <>
          {/* Add in the original controls */}
          <BlockEdit {...props} />
          <InspectorAdvancedControls>
            <ToggleControl
              label={wp.i18n.__("Hide on mobile", "textDomain")}
              checked={!!attributes.hideOnMobile}
              onChange={() =>
                setAttributes({ hideOnMobile: !attributes.hideOnMobile })
              }
            />
          </InspectorAdvancedControls>
        </>
      );
    };
  },
  "filterCoverBlockAdvancedControls"
);

wp.hooks.addFilter(
  "editor.BlockEdit",
  "myprefix/filter-cover-block-advanced-controls",
  filterCoverBlockAdvancedControls
);

/********************************************************************
 *
 * Modify the `props` passed to the `edit` component of the block type.
 *
 * *** NOTE ***
 * Both adding and changing this code will cause blocks of the
 * type being modified, which are already in the editor, to become
 * invalid, just as if the code of the actual `save` component had
 * been changed.
 *
 ********************************************************************/

/**
 * `props` are the `props` as they would be passed to the block
 * type's `save` component if they were not modified.
 *
 * `blockType` is an object that holds all the details of the
 * block type. Oddly this is called `blockType` here, whereas, with
 * the `blocks.registerBlockType` filter, the same thing is
 * called settings.
 *
 * `attributes` are the attributes of the block type, the same as
 * `blockType.attributes`.
 *
 * *** NOTE ***
 * `lodash.assign` can be used instead of `Object.assign`
 */

function filterCoverApplyExtraClass(props, blockType, attributes) {
  const { hideOnMobile } = attributes;
  if (blockType.name === "core/cover" && hideOnMobile) {
    /**
     * Add the new class name to the existing ones.
     *
     * See `coverAttribute()` above for use of Object.assign
     */

    return Object.assign(
      {},
      props,
      Object.assign(
        {},
        {
          className: `${props.className} hide-on-mobile`,
        }
      )
    );
  }
  return props;
}

wp.hooks.addFilter(
  "blocks.getSaveContent.extraProps",
  "myprefix/filter-cover-apply-class",
  filterCoverApplyExtraClass
);
