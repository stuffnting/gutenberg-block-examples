/**
 * This code contains two filters which can be used to add/remove/change
 * block class names.
 *
 * blocks.getSaveContent.extraProps can be used to change the class
 * names passed to the block's `save` function's props.
 *
 * blocks.getBlockDefaultClassName can be used to change, or add to
 * a block type's default class name. The default class name added
 * by WordPress is in the form wp-block-{block-name}.
 *
 * Also see the render_block PHP filter that can be used to change
 * class names when blocks are rendered to HTML from the Gutenberg
 * code. This method has no effect on the blocks in the editor.
 * https://developer.wordpress.org/reference/hooks/render_block/
 *
 **** Note ***
 * Both these filters will cause a validation error for blocks
 * already in the editor, however, the block is easily recovered.
 *
 */

// classnames is an external dependency installed by @wordpress/scripts
import classnames from "classnames";

/**
 * Add a class name to the props passed to the
 * `save` function of the core/image block.
 *
 * *** NOTE ***
 * You have to be in the code editor to see the added class.
 * Ctrl + Shft + M
 *
 *  * *** NOTE ***
 * This will cause a validation error for blocks
 * already in the editor, however, the block is easily recovered.
 */
function myprefixFilterCoreBlockAddClassName(props, { name }) {
  const { className: classNamesIn } = props;
  if (name === "core/image") {
    const CLASS_NAME_TO_ADD = "my-pants-class";
    // classnames() is an external dependency
    // object key is the class name, the value is a conditional to assess whether to add the new class name.
    const classNamesOut = classnames(classNamesIn, {
      [CLASS_NAME_TO_ADD]: !classNamesIn.includes(CLASS_NAME_TO_ADD), // Check that class as not already been added
    });
    // Object.assign() can be used instead of lodash.assign()
    return lodash.assign({}, props, { className: classNamesOut });
  }

  return props;
}

wp.hooks.addFilter(
  "blocks.getSaveContent.extraProps",
  "myprefix/filter-core-block-add-class-name",
  myprefixFilterCoreBlockAddClassName
);

/**
 * Change the default class name for the core/quote block to
 * include an extra class name.
 *
 * *** Note ***
 * This will cause a validation error for blocks
 * already in the editor, however, the block is easily recovered.
 */
function myprefixFilterCoreBlockChangeDefaultClassName(className, blockName) {
  return blockName === "core/quote" ? `core-quote-pants-class` : className;
}

wp.hooks.addFilter(
  "blocks.getBlockDefaultClassName",
  "myprefix/filter-core-block-change-default-class-name",
  myprefixFilterCoreBlockChangeDefaultClassName
);
