# inspector-control-tabs

## Description

This example adds a dynamic block that is used to demonstrate the Block Inspector tabs, which were added in WP 6.2.

A controls to set the block's title text is added to the `advanced` group of the `settings` tab. Three other controls are added to the `styles` group of the `advanced` tab.

Two filters are added in the PHP file, that can change the default behaviour.

## In this code

**`inspector-control-tabs.php`**

- Registers the block.

- Adds a `block_editor_settings_all` filter, which can disable the tabs for all blocks.

- `block_editor_settings_all` filter, which can disable the tabs for specific blocks.

**`inspector-control-tabs.index.js`**

- Registers the block.

- Imports the `InspectorControls`, `GetPosts`, and `PostListTitle` components.

**`inspector-control.js`**

- Adds the controls to the Block Inspector tabs groups.

  - A text control to set the title text is added to the `advanced` group under the `settings` tab.

  - A toggle switch to show/hide the title gets added to the `styles` group of the `appearance` tab.

  - A select control to choose the font style of the title gets added to the `styles` group of the `appearance` tab.

  - A checkbox to underline the title gets added to the `styles` group of the `appearance` tab.

**`get-posts.js`**

- Fetches the 5 most recent posts.

**`post-list-title.js`**

- Contains some logic to display the heading as the controls dictate.

## Notes

### Tabs and groups

For more about tabs and groups see [`here`]{https://make.wordpress.org/core/2023/03/07/introduction-of-block-inspector-tabs/}.

### `React.memo`

The `GetPosts` component uses [`React.memo`](https://legacy.reactjs.org/docs/react-api.html#reactmemo) to prevent the list of recent posts re-rendering when `perPage` has not changed.

In this example `perPage` does not actually. For an example where `perPage` can be changed from the Block Inspector, see the [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/) example.

## Also see

There are more examples of Block Inspector controls in:

- [`dynamic-inspector-controls`](../dynamic-inspector-controls/),

- [`dynamic-inspector-query-terms`](../dynamic-inspector-query-terms/),

- [`meta-block-inspector`](../meta-block-inspector/),

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

- [`wp_get_recent_posts`](https://developer.wordpress.org/reference/functions/wp_get_recent_posts/)

- [`get_block_wrapper_attributes`](https://developer.wordpress.org/reference/functions/get_block_wrapper_attributes/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP filters**

- [`block_editor_settings_all`](https://developer.wordpress.org/reference/hooks/block_editor_settings_all/)

**JS WP dependencies**

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`

- [`@wordpress/element`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/)

  - `memo`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/components`](https://developer.wordpress.org/block-editor/reference-guides/components/)

  - [`PanelBody`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`PanelRow`](https://developer.wordpress.org/block-editor/reference-guides/components/panel/)

  - [`TextControl`](https://developer.wordpress.org/block-editor/reference-guides/components/text-control/)

  - [`ToggleControl`](https://developer.wordpress.org/block-editor/reference-guides/components/toggle-control/)

  - [`SelectControl`](https://developer.wordpress.org/block-editor/reference-guides/components/select-control/)

  - [`CheckboxControl`](https://developer.wordpress.org/block-editor/reference-guides/components/checkbox-control/)

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `InspectorControls`

- [`@wordpress/core-data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/)

  - `useEntityRecords`
