const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

//console.log(path);

module.exports = {
  ...defaultConfig,
  externals: {
    lodash: "lodash",
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { context: "src", from: "plugin.php", to: "./" },
        {
          context: "src",
          from: "*/*.php",
          to: "./[name]/index.php",
        },
        {
          context: "src",
          from: "*/*.css",
          to: "./[name]/styles.css",
        },
        { from: "README.md", to: "./" },
      ],
    }),
    new CleanWebpackPlugin({
      dry: true,
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
  ],
  entry: {
    /*     "block-collection": "./src/block-collection/block-collection.js",
    "block-styles": "./src/block-styles/block-styles.js",
    "richtext-flexible-paragraph":
      "./src/richtext-flexible-paragraph/richtext-flexible-paragraph.js",
    "richtext-basic-block":
      "./src/richtext-basic-block/richtext-basic-block.js",
    "richtext-multiline": "./src/richtext-multiline/richtext-multiline.js",
    "richtext-multiple-instances":
      "./src/richtext-multiple-instances/richtext-multiple-instances.js",
    "richtext-formatting-options":
      "./src/richtext-formatting-options/richtext-formatting-options.js", */

    "richtext-text-align": "./src/richtext-text-align/richtext-text-align.js",

    /* "richtext-custom-toolbar-buttons":
      "./src/richtext-custom-toolbar-buttons/richtext-custom-toolbar-buttons.js", */

    "richtext-supports": "./src/richtext-supports/richtext-supports.js",

    /*     "richtext-split-merge":
      "./src/richtext-split-merge/richtext-split-merge.js",
    "richtext-transforms-simple":
      "./src/richtext-transforms-simple/richtext-transforms-simple.js",
    "richtext-transforms-multiblock":
      "./src/richtext-transforms-multiblock/richtext-transforms-multiblock.js",
    "variations-existing-blocks":
      "./src/variations-existing-blocks/variations-existing-blocks.js",
    "variations-register-blocks":
      "./src/variations-register-blocks/variations-register-blocks.js",
    "inner-blocks": "./src/inner-blocks/inner-blocks.js",
    "inner-blocks-template":
      "./src/inner-blocks-template/inner-blocks-template.js",
    "metabox-simple-block":
      "./src/metabox-simple-block/metabox-simple-block.js",
    "metabox-document-settings":
      "./src/metabox-document-settings/metabox-document-settings.js",
    "metabox-plugin-sidebar":
      "./src/metabox-plugin-sidebar/metabox-plugin-sidebar.js",
    "metabox-with-media": "./src/metabox-with-media/metabox-with-media.js",
    "metabox-inner-blocks-inspector":
      "/src/metabox-inner-blocks-inspector/metabox-inner-blocks-inspector.js",
    "metabox-notices-save-lock":
      "/src/metabox-notices-save-lock/metabox-notices-save-lock.js",
    "metabox-attribute": "/src/metabox-attribute/metabox-attribute.js",
    "metabox-with-select-doc-settings":
      "/src/metabox-with-select-doc-settings/metabox-with-select-doc-settings.js",
    "dynamic-block-simple":
      "./src/dynamic-block-simple/dynamic-block-simple.js",
    "dynamic-block-serverside-render":
      "./src/dynamic-block-serverside-render/dynamic-block-serverside-render.js",
    "dynamic-block-inspector-controls":
      "./src/dynamic-block-inspector-controls/dynamic-block-inspector-controls.js",
    "dynamic-meta-block": "./src/dynamic-meta-block/dynamic-meta-block.js",
    "dynamic-block-inner-blocks":
      "./src/dynamic-block-inner-blocks/dynamic-block-inner-blocks.js",
    "dynamic-block-inspector-query-terms":
      "./src/dynamic-block-inspector-query-terms/dynamic-block-inspector-query-terms.js",
    "filter-core-block-supports":
      "./src/filter-core-block-supports/filter-core-block-supports.js",
    "filter-core-block-class-names":
      "./src/filter-core-block-class-names/filter-core-block-class-names.js",
    "filter-core-block-controls":
      "./src/filter-core-block-controls/filter-core-block-controls.js", */
    // "custom-class": "./src/custom-class/custom-class.js",
  },
  output: {
    path: path.join(__dirname, "/start"),
    filename: "[name]/index.js",
  },
};
