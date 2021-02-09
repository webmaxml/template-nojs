const webpack = require( 'webpack' )
const path = require( 'path' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )

module.exports = env => {
  const sassLoaders = env.dev ?
                  ['style-loader', 'css-loader', 'sass-loader'] :
                  [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
	
	return {
		entry: './src/js/index.js',
		output: {
			filename: 'js/app.js',
			path: path.resolve( __dirname, 'dist' ),
		},

		devServer: {
			contentBase: path.resolve( __dirname, 'dist' ),
			watchContentBase: true,
			compress: true,
			port: 3000
		},

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: sassLoaders
				},
			],
		},

		plugins: [
			new MiniCssExtractPlugin({
				filename: 'css/style.css'
			}),
		],
	}
}