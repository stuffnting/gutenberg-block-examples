import { __ } from "@wordpress/i18n";

export const variations = [
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
    scope: ["transform"],
    isActive: (blockAttributes, variationAttributes) =>
      blockAttributes.textAlign === variationAttributes.textAlign,
  },
  {
    name: "myprefix-centered-orange-heading",
    title: __("Centered orange block", "textDomain"),
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
];
