const { registerBlockType } = wp.blocks;
const { MediaUpload, MediaUploadCheck } = wp.blockEditor;
const { PluginDocumentSettingPanel } = wp.editPost;
const { PanelBody, Button, ResponsiveWrapper } = wp.components;
const { withSelect, withDispatch, useSelect } = wp.data;
const { useEntityProp } = wp.coreData;
const { registerPlugin } = wp.plugins;
const { __ } = wp.i18n;

const IMAGE_SIZE = "thumbnail";
const ALLOWED_MEDIA_TYPES = ["image"];
const META_FIELD_NAME = "_myprefix_metabox_with_media_meta";

function MetaImagePanel() {
  const postType = useSelect(
    (select) => select("core/editor").getCurrentPostType(),
    []
  );

  const [meta, setMeta] = useEntityProp("postType", postType, "meta");

  function updateMetaValue(newValue, updateType) {
    // Meta value must be a integer, so can't use `undefined` or `false`. Therefore if removing the image, use 0.
    let id = 0;

    // If changing the image use the id from the attachment object passed by media uploader or 0 is id is not set
    if (updateType === "change") {
      id = newValue.id || 0;
    }

    setMeta({ ...meta, [META_FIELD_NAME]: id });
  }

  // Using attachment/image ID of 0 with useSelect causes REST error. But `undefined` is OK.
  // See Source in https://developer.wordpress.org/reference/classes/wp_rest_posts_controller/get_post/
  const imageID = meta[META_FIELD_NAME] || undefined;
  const metaImage = useSelect((select) =>
    select("core").getEntityRecord("postType", "attachment", imageID)
  );

  const thumbFile =
    metaImage === undefined
      ? { id: undefined }
      : {
          url: metaImage.media_details.sizes[IMAGE_SIZE].source_url,
          width: metaImage.media_details.sizes[IMAGE_SIZE].width,
          height: metaImage.media_details.sizes[IMAGE_SIZE].height,
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
            allowedTypes={ALLOWED_MEDIA_TYPES}
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
              allowedTypes={ALLOWED_MEDIA_TYPES}
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
