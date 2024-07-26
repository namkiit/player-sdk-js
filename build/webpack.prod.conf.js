const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.conf');
const TerserPlugin = require('terser-webpack-plugin');
process.env.mode = 'ONLINE';

module.exports = merge(baseConfig, {
	mode: 'production',
	performance: {
		hints: 'warning',
		maxAssetSize: 200000,
		maxEntrypointSize: 400000,
		assetFilter: function (assetFilename) {
			return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
		}
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					ecma: 6,
					compress: {
						drop_console: true,
						drop_debugger: true,
						pure_funcs: ['console.log'],
					},
					mangle: {
						// mangle options can be specified here
					},
					output: {
						comments: false,
					},
				},
				extractComments: false,
			}),
		],
	},
	devtool: false,
	plugins: [
		new webpack.DefinePlugin({
			__ENV_MODE__: JSON.stringify('production')
		})
	]
});
