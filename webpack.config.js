const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const fs = require("fs");
const path = require("path");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const { BlockList } = require("net");

// A list of example blocks to build
const BUILD_LIST = [
  "block-json",
  /*** richtext ***/
  //"richtext-flexible-paragraph",
  //"richtext-basic-block",
  //"richtext-multiline",
  //"richtext-multiple-instances",
  //"richtext-formatting-options",
  //"richtext-text-align",
  //"richtext-custom-toolbar-buttons",
  //"richtext-supports",
  //"richtext-split-merge",
  //"richtext-transforms-simple",
  //"richtext-transforms-multiblock",
  /*** variations, styles ***/
  //"variations-existing-blocks",
  //"variations-register-blocks",
  "block-styles",
  /*** templates, patterns ***/
  "templates",
  //"block-patterns"
  //"block-collection",
  /*** inner-blocks, context  ***/
  //"inner-blocks",
  //"inner-blocks-template-child",
  "context",
  "context-block-json",
  /*** metabox ***/
  //"metabox-simple-block",
  //"metabox-document-settings",
  //"metabox-plugin-sidebar",
  //"metabox-with-media",
  //"metabox-inner-blocks-inspector",
  //"metabox-notices-save-lock",
  //"metabox-attribute",
  //"metabox-with-select-doc-settings",
  /*** dynamic ***/
  //"dynamic-block-simple",
  //"dynamic-block-serverside-render",
  //"dynamic-block-inspector-controls",
  //"dynamic-meta-block",
  //"dynamic-block-inner-blocks",
  //"dynamic-block-inspector-query-terms",
  /*** filters ***/
  //"filter-core-block-supports",
  //"filter-core-block-class-names",
  //"filter-core-block-controls",
  /*** misc ***/
  //"custom-class",
];

/**
 * Make a build list object for Webpack.
 *
 * ./src/${el}/${el}.js is in form ./src/block-name/block-name.js
 *
 * Some block examples don't have a JS file.
 * fs.existsSync(`./src/${el}/${el}.js`) checks the existence of the file before
 * placing in buildListObj.
 */
const buildListObj = BUILD_LIST.length
  ? BUILD_LIST.reduce(
      (acc, el) =>
        fs.existsSync(`./src/${el}/${el}.js`)
          ? { ...acc, [el]: `./src/${el}/${el}.js` }
          : { ...acc },
      {}
    )
  : {};

/**
 * A callback function for the copy-webpack-plugin `filter`.
 *
 * When a file matches the `from` glob, decide wether to copy it  * or not
 * based on the contents of BUILD_LIST.
 *
 * @param {string} absoluteSourcePath - Absolute path to the file that matched the glob.
 * @returns {boolean} - Whether to copy the file to the build folder.
 */
const filterCB = (absoluteSourcePath) => {
  var pathArray = absoluteSourcePath.split("/");
  var fileDirectory = pathArray.slice(-2, -1).join();

  if (BUILD_LIST.includes(fileDirectory)) {
    return true;
  }

  return false;
};

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
          to: "./[path]/index.php",
          filter: filterCB,
        },
        {
          context: "src",
          from: "*/*.css",
          to: "./[path]/styles.css",
          filter: filterCB,
        },
        {
          context: "src",
          from: "*/*.json",
          to({ absoluteFilename }) {
            var pathArray = absoluteFilename.split("/");
            var fileName = pathArray.slice(-1).join();
            var name = fileName.split(".").slice(0, 1).join();
            var fileDirectory = pathArray.slice(-2, -1).join();

            /**
             * ./src/block-name/block-name.json becomes ./start/block-name/block.json
             * ./src/block-name/any-other-name.json becomes ./start/block-name/any-other-name.json
             */
            return name === fileDirectory
              ? "./[path]/block.json"
              : "./[path]/[name].json";
          },
          filter: filterCB,
        },
        { from: "README.md", to: "./" },
      ],
    }),
    new CleanWebpackPlugin({
      dry: false,
      cleanOnceBeforeBuildPatterns: ["**/*"],
    }),
  ],
  entry: buildListObj,
  output: {
    path: path.join(__dirname, "/start"),
    filename: "[name]/index.js",
  },
};
