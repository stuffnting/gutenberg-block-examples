const defaultConfig = require('@wordpress/scripts/config/webpack.config');

/**
 * If the `start` script in package.json is "wp-scripts start  --experimental-modules",
 * defaultConfig will be an array containing 2 different configs,
 * without --experimental-modules it will be an object.
 * The normal, non-module config is called classic.
 */
const [defaultConfigClassic, defaultConfigModule] = Array.isArray(defaultConfig)
  ? defaultConfig
  : [defaultConfig, undefined];

const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { log } = require('console');

/**
 * Source path
 */
const sourcePath = path.resolve(__dirname, 'src');
console.log(`*** Sources path ***  ${sourcePath}`);

/**
 * Build path *** Set Here ***
 */
const buildPath = path.resolve(
  __dirname,
  '..',
  'WP-TESTER',
  'app',
  'public',
  'wp-content',
  'plugins',
  'gutenberg-example-blocks'
);
console.log(`*** Build path ***  ${buildPath}`);

// Get the build list from the JSON file. `require` converts JSON to an object.
const EXAMPLE_LIST = require(path.resolve(sourcePath, 'build-list.json'));

/**
 * Make a built list array array from the JSON data.
 * Object.entries() returns array of an object's enumerable properties' key-values pairs in form
 * [[exampleName, details], [exampleName, details]].
 */
const exampleListArray = Object.entries(EXAMPLE_LIST);

// Log all example names
//console.log('*** Complete example list ***');
//exampleListArray.forEach((el) => console.log(`[\`${el[0]}\`](./src/${el[0]})`));

// Filter the full examples list for those to be built. Make a Map with exampleName => {}
const buildListArray = exampleListArray
  .filter((example) => (example[1].include ? true : false))
  .map((example) => example[0]);

//console.log('*** Build List ***');
//console.log(buildListArray);

/**
 * For each example in the build list, make a Map containing all the files
 * in the example's folder and any subfolders,
 * e.g. example-name => ['file-names']
 */
const buildListMap = new Map();

buildListArray.forEach((example) => {
  const absPath = path.resolve(sourcePath, example);
  const allFilesInExample = fs.readdirSync(absPath, { recursive: true });

  buildListMap.set(
    example,
    allFilesInExample.filter((file) => path.dirname(file) !== '.';
    )
  );

  console.log(allFilesInExample);

  // fs.readdirSync(absPath, { recursive: true }));
});

//console.log('*** Build List All Files ***');
//console.log(buildListMap);

/**
 * Process the files for each example in the build Map.
 */
const extensionsToCopy = ['.md', '.php', '.css', '.json']; // Copy these file types with CopyPlugin
const extensionsForEntry = ['.js', '.scss', '.sass']; // Possible entry points.
const allowedJSEntryClassic = ['index.js']; // Limit JS entry points.
const allowedJSEntryModule = ['view.js']; // Limit JS entry points.
const allowedJSEntryBoth = [...allowedJSEntryClassic, ...allowedJSEntryModule];

// Root files to always copy across.
const rootFilesToCopy = [
  {
    from: path.resolve(sourcePath, 'plugin.php'),
    to: path.resolve(buildPath, 'plugin.php'),
  },
  {
    from: path.resolve(sourcePath, 'build-list.json'),
    to: path.resolve(buildPath, 'build-list.json'),
  },
];

// Declare variables in root.
const filesToCopy = [...rootFilesToCopy];
const entryPointsClassic = {};
const entryPointsModule = {};

buildListMap.forEach((files, exampleName) => {
  /**
   *  Add to copy list
   */
  files
    .filter((file) => extensionsToCopy.includes(path.extname(file))) // Filter copy file types
    .forEach((file) => {
      /**
       * Take the example name out of filenames.
       *
       *  filenameObj.base is the last section of the filename, without a preceding folder
       *  when the file is in a sub-folder of the root example folder.
       *
       * e.g. filenameObj.base = example-name.block.json converts to block.json.
       */
      const filenameObj = path.parse(file);
      const basenameArr = filenameObj.base.split('.'); // e.g.

      /**
       * If there are 3 parts to the filename, e.g. example-name.block.json, remove 1st part.
       * Otherwise use whole thing, e.g. README.md
       */
      const newBasename =
        basenameArr.length === 3 ? `${basenameArr[1]}.${basenameArr[2]}` : path.basename(file);

      // Construct the to and from absolute paths for copy-webpack-plugin
      const from = path.resolve(sourcePath, exampleName, file);
      const to = path.resolve(buildPath, exampleName, filenameObj.dir, newBasename);
      filesToCopy.push({ from, to });
    });

  /**
   * Add to entry point list
   */
  files
    .filter((file) => {
      // Filter for entry point file types, then only allow index.js and view.js, or any scss or sass files.
      return (
        extensionsForEntry.includes(path.extname(file)) &&
        (allowedJSEntryBoth.some((allowed) => path.basename(file).includes(allowed)) ||
          path.extname(file) !== '.js')
      );
    })
    .forEach((file) => {
      const filenameObj = path.parse(file);
      const basenameArr = filenameObj.base.split('.'); // e.g. splits example-name.index.js into array

      // Path for entry point
      const entry = path.resolve(
        sourcePath,
        exampleName,
        filenameObj.dir, // Empty if only 1 block. 'block-one' if example-name/block-one/block-one.index.js
        filenameObj.base //
      );

      // Name for entry point
      const outputName = basenameArr[basenameArr.length - 2]; // e.g. from example-name.index.js to index or from example-name.style.scss to style
      // Label js files so that they can be easily filtered. Can't label css files because of postCss plugin fuck-up.
      const prefix = filenameObj.ext === '.js' ? '_JS_' : '';
      const name = path.join(prefix + exampleName, filenameObj.dir, outputName); // e.g. js files: '_JS_i11y-api-g-l-d/index', or, scss files: 'i11y-api-g-l-d/style'

      if (path.basename(file).includes(allowedJSEntryClassic) || path.extname(file) !== '.js') {
        entryPointsClassic[name] = entry;
      } else if (path.basename(file).includes(allowedJSEntryModule)) {
        entryPointsModule[name] = entry;
      }
    });
});

/* console.log("*** Files To Copy ***");
console.log(filesToCopy); */
console.log('*** Entry Points ***');
console.log(entryPointsClassic);
console.log(entryPointsModule);

/**
 * Reconfigure classic config plugins
 */

/**
 * There only a CopyPlugin in the classic config, and not one in the modules config.
 * Remove WP config MiniCssExtractPlugin and CopyPlugin from classic
 */
defaultConfigClassic.plugins = defaultConfigClassic.plugins.filter(
  (plugin) => !(plugin instanceof MiniCssExtractPlugin) && !(plugin instanceof CopyPlugin)
);

// New plugins array
const plugins = [
  ...defaultConfigClassic.plugins,
  new CopyPlugin({
    patterns: filesToCopy,
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css', // [name] contains any sub-folders
  }),
];

/**
 * Replace module config output filename
 */

/**
 * Function to sort out output
 */

const outputFilename = (pathData) => {
  // With CSS files as entry points, empty JS files are created for each one. Junk them by filtering marked JS files.
  const junkFolder = pathData.chunk.name.includes('_JS_') ? '' : 'junk-empty-files';
  // Remove prefix, it has done its job.
  const name = pathData.chunk.name.replace('_JS_', '');
  return `${junkFolder}${path.sep}${name}.js`; // path.sep is platform specific separator. ${name} contains any sub-folders
};

const classicConfig = {
  ...defaultConfigClassic,
  plugins,
  entry: entryPointsClassic,
  output: {
    path: buildPath,
    filename: outputFilename,
  },
};

console / log(defaultConfig);

if (Array.isArray(defaultConfig)) {
  defaultConfigModule.output.filename = outputFilename;
  //defaultConfigModule.output.filename = 'i11y-api-g-l-d/view.js';
  defaultConfigModule.output.path = buildPath;

  const moduleConfig = {
    ...defaultConfigModule,
    entry: entryPointsModule,
    //devServer: { devMiddleware: { writeToDisk: true } },
  };

  module.exports = [classicConfig, moduleConfig];
} else {
  module.exports = classicConfig;
}
