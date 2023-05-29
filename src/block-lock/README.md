# block-lock

## Description

This code demonstrates the ability to lock a block's position, and prevent its removal from the editor. The lock is accessed via the 3-dot options menu in the block's toolbar.

The block that is registered is initial locked for `move` and `remove` in Posts, however, support for block locking is completely removed for Pages, using a filter in the PHP file.

## In this code

**`block-lock.php`**

- Registers the `myprefix/block-lock` block type.

- Uses the `block_editor_settings_all` filter to conditionally remove the ability to lock blocks by: user role, user and post-type.

**`block-lock.js`**

- Registers the `myprefix/block-lock` block type.

**`block-lock.block.json`**

- Adds support for `lock`. For demonstration purposes it is set to `true`, even though that is the default, and does not need to be stated.

- Sets-up an attribute that contains the lock condition. The values set in this file are the initial condition for `lock.move` and `lock.remove`.

## Notes

### The JSON file

Support for block locking is `true` by default, and so `supports.lock` does not have to be included in the `block.json` file if locking is to be allowed; for demonstration purposes it has been included in this example.

    "supports": {
      "lock": true
    },

Locking can be turned off by setting `supports.lock` to false in `block-lock.block.json`.

The `lock` attribute is used to set an initial value for the `lock.move` and `lock.remove`.

    "attributes": {
      "lock": {
        "type": "object",
        "default": {,
          "move": true,
          "remove": true
        }
      }
    },

Because blocks have locking enabled by default, the attribute will automatically be created if the lock is used. The attribute needs only be included in `block.json` if the block is to be initially locked for move, remove, or both.

## Also see

The [`templates`](../templates/) example.

The [`supports`](https://developer.wordpress.org/block-editor/reference-guides/block-api/block-supports/) section in the Gutenberg Handbook.

## Uses

**PHP WP functions**

- [`register_block_type`](https://developer.wordpress.org/reference/functions/register_block_type/)

**PHP WP actions**

- [`init`](https://developer.wordpress.org/reference/hooks/init/)

**PHP WP Filters**

- [`block_type_metadata_settings`](https://developer.wordpress.org/reference/hooks/block_type_metadata_settings/)

**JS WP dependencies**

- [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/)

  - `useBlockProps`

  - `RichText`

- [`@wordpress/blocks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-blocks/)

  - `registerBlockType`

- [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

  - `__`
