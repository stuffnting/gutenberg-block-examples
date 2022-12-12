// const { merge } = require("webpack-merge");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const fs = require("fs");
const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// Get the build list from the JSON file. `require` converts JSON to an object.
const BUILD_LIST_DATA = require("./src/build-list.json");

/**
 * Make an array of the block names that need building.
 *
 * Make an array of blocks from BUILD_LIST_DATA
 * Filter out the "include" : false.
 * Map each `name` to a new array.
 */
const buildListArray = Object.values(BUILD_LIST_DATA)
  .filter((el) => (el.include ? true : false))
  .map((el) => el.name);

/**
 * Make an entry point object for Webpack.
 *
 * Each property is name: source
 * ./src/${el}/${el}.index.js is in form ./src/block-name/block-name.index.js
 *
 * Some block examples don't have a JS file.
 * fs.existsSync(`./src/${el}/${el}.js`) checks the existence of the file before
 * placing in buildListObj.
 */
const buildListObj = buildListArray.length
  ? buildListArray.reduce(
      (acc, el) =>
        fs.existsSync(`./src/${el}/${el}.index.js`)
          ? {
              ...acc,
              [el]: `./src/${el}/${el}.index.js`,
            }
          : {
              ...acc,
            },
      {}
    )
  : {};

/**
 * A callback function for the copy-webpack-plugin `filter`.
 * It checks the build list, to see if the current example is being built.
 *
 * When a file matches the `from` glob, decide wether to copy it, or not,
 * based on the contents of buildListObj.
 *
 * @param {string} absoluteSourcePath - Absolute path to the file that matched the glob.
 * @returns {boolean} - Whether to copy the file to the build folder.
 */
const filterCB = (absoluteSourcePath) => {
  const pathArray = absoluteSourcePath.split("/");
  const fileDirectory = pathArray.slice(-2, -1).join();

  if (buildListArray.includes(fileDirectory)) {
    return true;
  }
  return false;
};

/**
 * Splits the absolute path and filename into its component parts.
 *
 * @param {string} absoluteFilename - The absolute path and filename with extension.
 * @returns {object} -  The directory name and an array containing the filename and extension.
 *                      Either two elements for example-name.ext, or three elements for example-name.index.ext
 */
const processFilename = (absoluteFilename) => {
  const directory = absoluteFilename.split("/").slice(-2, -1).join();
  const filenameArray = absoluteFilename.split("/").slice(-1).join().split(".");

  return { directory, filenameArray };
};

/**
 * Define the more complex copy-webpack-plugin patterns here.
 */
const phpPattern = {
  context: "src",
  from: "*/*.php",
  to({ absoluteFilename }) {
    const { directory, filenameArray } = processFilename(absoluteFilename);
    // ./src/example-name/example-name.php becomes index.php
    // All other PHP files get copied without a name change
    return filenameArray[0] === directory
      ? `./${directory}/index.php`
      : `./${directory}/[name].php`;
  },
  filter: filterCB,
  noErrorOnMissing: true,
};

const cssPattern = {
  context: "src",
  from: "*/*.css",
  to: "./[path]/style.css",
  filter: filterCB,
  noErrorOnMissing: true,
};

const jsonPattern = {
  context: "src",
  from: "*/*.json",
  to({ absoluteFilename }) {
    const { directory, filenameArray } = processFilename(absoluteFilename);
    // ./src/example-name/example-name.block.js becomes block.json
    // All other JSON files get copied without a name change
    return filenameArray.length === 3 &&
      [directory, "block", "json"].every((el, i) => el === filenameArray[i])
      ? `./${directory}/block.json`
      : `./${directory}/[name].json`;
  },
  filter: filterCB,
  noErrorOnMissing: true,
};

/**
 * defaultConfig contains a number of plugins, including one that generates 'externals'.
 * Adding plugins to modules.exports will replace those in defaultConfig generated by @wordpress/scripts;
 * therefore, the new plugins are merged with those from defaultConfig.
 * Overwriting the default plugins breaks several things, including the externals.
 */
const extraPlugins = [
  new CopyPlugin({
    patterns: [
      // Single files
      { from: "README.md", to: "./" },
      { context: "src", from: "plugin.php", to: "./" },
      { context: "src", from: "build-list.json", to: "./" },
      // Patterns
      phpPattern,
      cssPattern,
      jsonPattern,
    ],
  }),
];

/**
 * Change the output folder for the MiniCssExtractPlugin in @WP/scripts config.
 * If new MiniCssExtractPlugin is used, two instances exist and 2 copies of css files are made.
 */
const editMiniCss = defaultConfig.plugins.filter(
  (el) => el instanceof MiniCssExtractPlugin
)[0]; // Filter will return an array with one element

editMiniCss.options.filename = "[name]/style.css";

// Merge plugins
const plugins = defaultConfig.plugins.concat(extraPlugins, editMiniCss);

/**
 * Export
 */
module.exports = {
  ...defaultConfig,
  plugins,
  entry: buildListObj,
  output: {
    path: path.join(__dirname, "/start"),
    filename: "[name]/index.js",
    clean: true,
  },
};
