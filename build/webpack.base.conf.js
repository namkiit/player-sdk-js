const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const pkgJson = require('../package.json')

const basePath = path.resolve(__dirname, '../')
const distPath = path.resolve(basePath, './dist')

module.exports = {
	entry: {
		'player-sdk': [path.resolve(basePath, './src/index.js')]
	},
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: distPath,
		library: 'playerSDK',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						compact: false,
						plugins: ['dynamic-import-webpack', '@babel/plugin-transform-optional-chaining'],
					}
				}
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		]
	},
	devtool: 'source-map',
	context: __dirname,
	target: 'web',
	stats: 'normal',
	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [distPath + '/*.js']
		}),
		new webpack.DefinePlugin({
			__VERSION__: JSON.stringify(pkgJson.version)
		})
	]
}
