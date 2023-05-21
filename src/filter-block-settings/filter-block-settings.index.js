/**
 * @see{@link https://make.wordpress.org/core/2023/02/28/custom-settings-wordpress-6-2/}
 */

import { addFilter } from "@wordpress/hooks";
import { select } from "@wordpress/data";

/******************************************************************************
 *
 * Restrict the spacing units that can be selected in the Column block to pixels.
 *
 *****************************************************************************/

function myprefixFilterColumnSpacingUnits(settingValue, settingName, clientId, blockName) {
  if (blockName === "core/column" && settingName === "spacing.units") {
    return ["px"];
  }
  return settingValue;
}

addFilter(
  "blockEditor.useSetting.before",
  "myprefix/filter-column-space-units",
  myprefixFilterColumnSpacingUnits
);

/******************************************************************************
 *
 * Disable text color controls on Heading blocks when placed inside
 * core/media-text blocks. (Background and link colour controls remain.)
 *
 *****************************************************************************/
function myprefixNoColourHeading(settingValue, settingName, clientId, blockName) {
  if (blockName === "core/heading") {
    const { getBlockParents, getBlockName } = select("core/block-editor");
    const blockParents = getBlockParents(clientId, true);
    const inMediaText = blockParents.some(
      (ancestorId) => getBlockName(ancestorId) === "core/media-text"
    );

    if (inMediaText && settingName === "color.text") {
      return false;
    }
  }

  return settingValue;
}

addFilter(
  "blockEditor.useSetting.before",
  "myprefix/filter-heading-text-colour",
  myprefixNoColourHeading
);
