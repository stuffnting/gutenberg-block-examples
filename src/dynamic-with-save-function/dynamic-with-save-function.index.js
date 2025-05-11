import { registerBlockType } from '@wordpress/blocks';

import Edit from './dynamic-with-save-function.edit';
import metadata from './dynamic-with-save-function.block.json';

registerBlockType(metadata.name, {
  edit: Edit,
});
