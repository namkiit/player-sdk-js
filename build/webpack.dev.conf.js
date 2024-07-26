const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');

const basePath = path.resolve(__dirname, '../');
const publicPath = path.relative(basePath, '../dist');

module.exports = merge(baseConfig, {
	mode: 'development',
	output: {
		publicPath: publicPath
	},
	plugins: [
		new webpack.DefinePlugin({
			__ENV_MODE__: JSON.stringify('development')
		})
	]
})
