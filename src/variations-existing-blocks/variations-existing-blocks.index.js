/**
 * This code adds variations to exiting block;
 * in this case, existing core blocks.
 *
 * Variations are not the same as styles,
 * also sometimes called style variations.
 *
 * */

import { registerBlockVariation } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import scss from "./variations-existing-blocks.style.scss";

/********************************************************************
 *
 * Register variations for existing core block types. (They don't
 * have to be core, but they do need to be registered before this
 * code runs).
 *
 ********************************************************************/

registerBlockVariation("core/paragraph", {
  name: "myprefix-pink-paragraph",
  title: __("A pink paragraph", "textDomain"),
  description: __(
    "A paragraph that has a class added to make the text pink.",
    "textDomain"
  ),
  icon: "lightbulb",
  attributes: {
    // Don't forget to add class CSS rule to editor stylesheet
    className: "is-variation-pink",
  },
  scope: ["inserter", "transform"],
  isActive: (blockAttributes, variationAttributes) =>
    blockAttributes.className
      ? blockAttributes.className.includes(variationAttributes.className)
      : false,
});

/********************************************************************
 *
 * Add multiple variations for a core block in one go.
 * These appear in the Variation Transformer only (top of inspector).
 *
 *******************************************************************/

registerBlockVariation("core/heading", [
  {
    name: "myprefix-default-heading",
    title: __("Heading", "textDomain"),
    description: __("Default heading settings."),
    icon: "lightbulb",
    attributes: {
      placeholder: __("Add some text...", "textDomain"),
      level: 2,
      textAlign: "left",
      align: undefined,
      fontSize: "",
      lineHeight: 1.5,
      style: {},
      className: "is-reset-variation",
    },
    scope: ["transform"],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.className
        ? blockAttributes.className.includes(variationAttributes.className)
        : false,
  },
  {
    name: "myprefix-pink-heading",
    title: __("A pink heading", "textDomain"),
    description: __("An H2 heading, with pink centered text.", "textDomain"),
    icon: "lightbulb",
    attributes: {
      level: 2,
      textAlign: "center",
      placeholder: __("Add some pink text...", "textDomain"),
      // Don't forget to add class CSS rule to editor stylesheet
      className: "is-variation-pink",
    },
    scope: ["transform"],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.level === variationAttributes.level &&
      blockAttributes.placeholder === variationAttributes.placeholder,
  },
  {
    name: "myprefix-green-heading",
    title: __("A green heading", "textDomain"),
    description: "An H3 heading, with green centered text.",
    icon: "lightbulb",
    attributes: {
      level: 3,
      textAlign: "center",
      placeholder: __("Add some green text...", "textDomain"),
      // Don't forget to add class CSS rule to editor stylesheet
      className: "is-variation-green",
    },
    scope: ["transform"],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.level === variationAttributes.level &&
      blockAttributes.placeholder === variationAttributes.placeholder,
  },
]);

/********************************************************************
 *
 * Register variations for a block type that has InnerBlocks,
 * in this case core/columns.
 *
 ********************************************************************/

registerBlockVariation("core/columns", {
  name: "myprefix-three-columns",
  title: __("My Three Columns of stuff", "textDomain"),
  description: __("Three columns of stuff.", "textDomain"),
  icon: "lightbulb",
  /* Make the variation appear in the Placeholder, where you chose the
     starting column format when inserting the columns. */
  scope: ["block"],
  attributes: {
    align: "full",
    className: "is-my-three-columns",
  },
  isActive: (blockAttributes, variationAttributes) =>
    blockAttributes.className
      ? blockAttributes.className.includes(variationAttributes.className)
      : false && blockAttributes.align === variationAttributes.align,
  innerBlocks: [
    [
      "core/column",
      {},
      [
        [
          "core/heading",
          {
            level: 2,
            placeholder: __("Three columns", "textDomain"),
            className: "is-variation-pink",
          },
        ],
      ],
    ],
    [
      "core/column",
      {},
      [
        ["core/heading", { level: 3, content: __("Stuff", "textDomain") }],
        [
          "core/paragraph",
          { placeholder: __("Enter stuff here...", "textDomain") },
        ],
      ],
    ],
    [
      "core/column",
      {},
      [
        ["core/heading", { level: 3, content: __("More stuff", "textDomain") }],
        [
          "core/paragraph",
          { placeholder: __("Add a bit more stuff here...", "textDomain") },
        ],
      ],
    ],
  ],
});
