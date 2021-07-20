// Copied from gutenberg/packages/block-editor/src/components/font-family/index.js

/**
 * External dependencies.
 * lodash is loaded by WordPress on edit pages
 */
const { isEmpty } = lodash;

/**
 * WordPress dependencies
 */
const { SelectControl } = wp.components;
const { __ } = wp.i18n;

/**
 * Internal dependencies
 */
const useEditorFeature = wp.blockEditor.__experimentalUseEditorFeature;

export default function FontFamilyControl({
  value = "",
  onChange,
  fontFamilies,
  ...props
}) {
  const blockLevelFontFamilies = useEditorFeature("typography.fontFamilies");
  if (!fontFamilies) {
    fontFamilies = blockLevelFontFamilies;
  }

  if (isEmpty(fontFamilies)) {
    return null;
  }

  const options = [
    { value: "", label: __("Default") },
    ...fontFamilies.map(({ fontFamily, name }) => {
      return {
        value: fontFamily,
        label: name || fontFamily,
      };
    }),
  ];
  return (
    <SelectControl
      label={__("Font family")}
      options={options}
      value={value}
      onChange={onChange}
      labelPosition="top"
      {...props}
    />
  );
}
