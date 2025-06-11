// const { merge } = require("webpack-merge");
const defaultConfig = require('@wordpress/scripts/config/webpack.config');

const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Get the build list from the JSON file. `require` converts JSON to an object.
const BUILD_LIST_DATA = require('./src/build-list.json');

// Log all block names for README.md
Object.values(BUILD_LIST_DATA).forEach((el) =>
	console.log(`[\`${el.name}\`](./src/${el.name})`)
);

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
 * Make a normal entry point object for Webpack.
 *
 * Each property is name: source
 * ./src/${el}/${el}.index.js is in form ./src/block-name/block-name.index.js
 *
 * Some block examples don't have a JS file.
 * fs.existsSync(`./src/${el}/${el}.js`) checks the existence of the file before
 * placing in buildListObj.
 */
const defaultListObj = buildListArray.length
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
 * Make an custom entry point object for Webpack.
 *
 * The custom entry point are defined in the `custom-entry-point-directories` field of build-list.json
 */
const customBuildListObj = buildListArray.length
	? buildListArray.reduce((acc, el) => {
			/**
			 * Does this item in buildListArray have a `custom-entry-point` field?
			 * Find out by checking against the complete build list object,
			 * if the field is there, it should contain an array.
			 */
			const customArray =
				BUILD_LIST_DATA[el].hasOwnProperty(
					'custom-entry-point-directories'
				) &&
				Array.isArray(
					BUILD_LIST_DATA[el]['custom-entry-point-directories']
				)
					? BUILD_LIST_DATA[el]['custom-entry-point-directories']
					: null;
			if (customArray) {
				customArray.forEach((customEl, index) => {
					if (fs.existsSync(`./src/${el}/${customEl}`)) {
						acc = {
							...acc,
							[`${el}/${customEl}`]: `./src/${el}/${customEl}/${customEl}.index.js`,
						};
					}
				});
			}
			return acc;
		}, {})
	: {};

const buildListObj = { ...defaultListObj, ...customBuildListObj };

console.log(buildListObj);

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
	const pathArray = absoluteSourcePath.split('src/');
	const fileDirectory = pathArray[1].split('/')[0];

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
	//const directory = absoluteFilename.split("/").slice(-2, -1).join();
	const exampleDirectory = absoluteFilename.split('src/')[1].split('/')[0];
	const relativePath = absoluteFilename
		.split('src/')[1]
		.split('/')
		.slice(0, -1)
		.join('/');
	const blockDirectory = relativePath.split('/').slice(-1).join();
	const filenameArray = absoluteFilename
		.split('/')
		.slice(-1)
		.join()
		.split('.');

	return { exampleDirectory, blockDirectory, relativePath, filenameArray };
};

/**
 * Define the more complex copy-webpack-plugin patterns here.
 */
const phpPattern = {
	//context: "src",
	from: 'src/**/**/*.php',
	to({ absoluteFilename }) {
		const {
			exampleDirectory,
			blockDirectory,
			relativePath,
			filenameArray,
		} = processFilename(absoluteFilename);

		/**
		 * ./src/example-name/example-name.php becomes index.php
		 * ./src/example-name/example-name.partname.php becomes partname.php
		 * ./src/example-name/filename.php becomes filename.php
		 */
		return filenameArray.length === 2 && filenameArray[0] === blockDirectory
			? `./${relativePath}/index.php`
			: filenameArray.length === 3
				? `./${relativePath}/${filenameArray[1]}.php`
				: `./${relativePath}/[name].php`;
	},
	filter: filterCB,
	noErrorOnMissing: true,
};

// Used to copy .css files, scss are processed by miniCSS
const cssPattern = {
	context: 'src',
	from: '*/*.css',
	to: './[path]/style.css',
	filter: filterCB,
	noErrorOnMissing: true,
};

// Front end script not needed to build block.
const jsViewPattern = {
	context: 'src',
	from: '*/*.view.js',
	to: './[path]/view.js',
	filter: filterCB,
	noErrorOnMissing: true,
};

const jsonPattern = {
	//context: "src",
	from: 'src/**/**/*.json',
	to({ absoluteFilename }) {
		const {
			exampleDirectory,
			blockDirectory,
			relativePath,
			filenameArray,
		} = processFilename(absoluteFilename);
		// ./src/example-name/example-name.block.js becomes block.json
		// All other JSON files get copied without a name change
		return filenameArray.length === 3 &&
			[blockDirectory, 'block', 'json'].every(
				(el, i) => el === filenameArray[i]
			)
			? `./${relativePath}/block.json`
			: `./${relativePath}/[name].json`;
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
			//{ from: "README.md", to: "./" },
			{ context: 'src', from: 'plugin.php', to: './' },
			{ context: 'src', from: 'build-list.json', to: './' },
			// Patterns
			phpPattern,
			cssPattern,
			jsViewPattern,
			jsonPattern,
		],
	}),
];

/**
 * If you need to change the output folder, use the next few lines.
 */
const editMiniCss = defaultConfig.plugins.filter(
	(el) => el instanceof MiniCssExtractPlugin
)[0]; // Filter will return an array with one element

// Set output directory
editMiniCss.options.filename = '[name]/style.css';

const plugins = [
	...new Set([...defaultConfig.plugins, ...extraPlugins, ...extraPlugins]),
];

const buildPath = path.join(
	__dirname,
	'../WP Test 1/app/public/wp-content/plugins/gutenberg-example-blocks'
);
console.log(`Build path: ${buildPath}`);

/**
 * *** WINDOWS ***
 *
 * Export
 *
 * Build to Local Sites on Windows
 * '/mnt/c/Users/richa/Local Sites/{site-folder}}/app/public/wp-content/plugins/start'
 */
/*module.exports = {
  ...defaultConfig,
  plugins,
  entry: buildListObj,

  output: {
    path: path.join(__dirname, '/start'),
    filename: '[name]/index.js',
    clean: true,
  },
};*/

module.exports = {
	...defaultConfig,
	plugins,
	entry: buildListObj,

	output: {
		path: path.join(
			__dirname,
			'../WP Test 1/app/public/wp-content/plugins/gutenberg-example-blocks'
		),
		filename: '[name]/index.js',
		clean: true,
	},
};
