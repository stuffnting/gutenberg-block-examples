import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";
import { PluginDocumentSettingPanel } from "@wordpress/editPost";
import { Button, ResponsiveWrapper } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { useEntityProp } from "@wordpress/core-data";
import { registerPlugin } from "@wordpress/plugins";
import { __ } from "@wordpress/i18n";

import metadata from "./meta-with-media.block.json";

const metaField = metadata.metaField;

const imageSize = "thumbnail";
const allowedMediaTypes = ["image"];

function MetaImagePanel() {
  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  const [meta, setMeta] = useEntityProp("postType", postType, "meta");

  function updateMetaValue(newValue, updateType) {
    // Meta value must be a integer, so can't use `undefined` or `false`. Therefore if removing the image, use 0.
    let id = 0;

    // If changing the image, use the id from the attachment object passed by media uploader, or 0 is id is not set
    if (updateType === "change") {
      id = newValue.id || 0;
    }

    setMeta({ ...meta, [metaField]: id });
  }

  // Using attachment/image ID of 0 with useSelect causes REST error. But `undefined` is OK.
  // See Source in https://developer.wordpress.org/reference/classes/wp_rest_posts_controller/get_post/
  const imageID = meta[metaField] || undefined;
  const metaImage = useSelect((select) =>
    select("core").getEntityRecord("postType", "attachment", imageID)
  );

  const thumbFile =
    metaImage === undefined
      ? { id: undefined }
      : {
          url: metaImage.media_details.sizes[imageSize].source_url,
          width: metaImage.media_details.sizes[imageSize].width,
          height: metaImage.media_details.sizes[imageSize].height,
          id: metaImage.id,
        };

  return (
    <PluginDocumentSettingPanel
      name="myprefix-metabox-media-panel"
      title="Metabox media"
      icon="lightbulb"
    >
      <div className="editor-post-featured-image">
        <MediaUploadCheck>
          <MediaUpload
            onSelect={(newValue) => updateMetaValue(newValue, "change")}
            value={thumbFile.id}
            allowedTypes={allowedMediaTypes}
            render={({ open }) => (
              <Button
                className={
                  thumbFile.id === undefined
                    ? "editor-post-featured-image__toggle"
                    : "editor-post-featured-image__preview"
                }
                onClick={open}
                icon={thumbFile.id === undefined && "format-image"}
              >
                {thumbFile.id === undefined &&
                  __("Choose an image", "textDomain")}
                {thumbFile.id !== undefined && (
                  <ResponsiveWrapper
                    naturalWidth={thumbFile.width}
                    naturalHeight={thumbFile.height}
                  >
                    <img src={thumbFile.url} />
                  </ResponsiveWrapper>
                )}
              </Button>
            )}
          />
        </MediaUploadCheck>
        {thumbFile.id !== undefined && (
          <MediaUploadCheck>
            <MediaUpload
              title={__("Replace image", "textDomain")}
              value={thumbFile.id}
              onSelect={(newValue) => updateMetaValue(newValue, "change")}
              allowedTypes={allowedMediaTypes}
              render={({ open }) => (
                <Button onClick={open} isSecondary>
                  {__("Replace image", "textDomain")}
                </Button>
              )}
            />
          </MediaUploadCheck>
        )}
        {thumbFile.id !== undefined && (
          <MediaUploadCheck>
            <Button
              onClick={(newValue) => updateMetaValue(newValue, "remove")}
              isLink
              isDestructive
            >
              {__("Remove image", "textDomain")}
            </Button>
          </MediaUploadCheck>
        )}
      </div>
    </PluginDocumentSettingPanel>
  );
}

registerPlugin("myprefix-image-panel", {
  icon: "lightbulb",
  render: MetaImagePanel,
});
