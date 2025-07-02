import { select, dispatch } from "@wordpress/data";
import domReady from "@wordpress/dom-ready";
import { addFilter } from "@wordpress/hooks";
/**
 * This dependency is not used, but is included to force wp-scripts to
 * add wp-edit-post to the dependencies in index.assets.php. Without
 * this extra dependency, @wordpress/wp-dom does not work.
 */
//import "@wordpress/edit-post";

/**
 * *** NOTE *** This does not work. Use the PHP block_editor_settings_all filter.
 */
domReady(() => {
  const settings = select("core/block-editor").getSettings();
  const obj = dispatch("core/block-editor").updateSettings({
    ...settings,
    imageEditing: false,
  });
  console.log("PANTS");
  console.log(obj);
});

/**
 * Change the image size used for the featured image in the editor.
 * You will only notice the difference by looking at the src of the img tag.
 */
const withImageSize = function (size, mediaId, postId) {
  return "small";
};

addFilter(
  "editor.PostFeaturedImage.imageSize",
  "myprefix/with-image-size",
  withImageSize
);

/**
 * Adds a custom message after "Preview in new tab" is clicked.
 */
const customPreviewMessage = function () {
  return "<b>Post preview is being generated!</b>";
};

addFilter(
  "editor.PostPreview.interstitialMarkup",
  "myprefix/custom-preview-message",
  customPreviewMessage
);
