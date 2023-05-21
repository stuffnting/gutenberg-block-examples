# filter-block-settings

This example adds two filters using the `blockEditor.useSetting.before` filter, which:

-   limit the width units available to the `core/column` block to `px`;

-   remove the text colour control from `core/heading` blocks, but only when they are within the `core/media-text` block.

This example is taken form [here](https://make.wordpress.org/core/2023/02/28/custom-settings-wordpress-6-2/).

## In this code

**`filter-block-settings.php`**

-   Registers the script file.

**`filter-block-settings.index.js`**

-   Adds the `myprefix/filter-column-space-units` filter.
-   Adds the `myprefix/filter-heading-text-colour` filter.

## Notes

###

## Uses

**JS WP dependencies**

-   [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

    -   `addFilter`

-   [`@wordpress/data`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/)

-   `select`

-   Store [`core/block-edit`](https://developer.wordpress.org/block-editor/reference-guides/data/data-core-block-editor/)

    -   `getBlockParents`

    -   `getBlockName`

**JS WP filters**

-   [`blockEditor.useSetting.before`](https://make.wordpress.org/core/2023/02/28/custom-settings-wordpress-6-2/)

**PHP WP functions**

-   [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

-   [`init`](https://developer.wordpress.org/reference/hooks/init/)
