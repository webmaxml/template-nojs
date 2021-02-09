const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

const allPlugins = {
  indexHtml: new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/components/pages/home/home.hbs',
    hash: true,
    minify: false
  }),
  cssExtract: new MiniCssExtractPlugin({
    filename: 'css/style.css'
  }),
  copyFiles: new CopyPlugin({
    patterns: [
      { from: 'src/fonts', to: 'fonts' }
    ]
  }),
  imgMin: new ImageminPlugin({
    externalImages: {
      context: 'src',
      sources: glob.sync('src/img/**/*.*'),
      destination: 'dist',
      fileName: '[path][name].[ext]'
    },
    jpegtran: {
      progressive: true
    }
  })
}

module.exports = env => {
  let sassLoaders = ['style-loader', 'css-loader', 'sass-loader']
  const plugins = [allPlugins.indexHtml, allPlugins.cssExtract]

  if (env.prod) {
    sassLoaders = [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    plugins.push(allPlugins.copyFiles, allPlugins.imgMin)
  }

  return {
    entry: './src/js/index.js',
    output: {
      filename: 'js/app.js',
      path: path.resolve(__dirname, 'dist')
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'src'),
      compress: true,
      port: 3000
    },

    module: {
      rules: [
        {
          test: /\.scss$/,
          use: sassLoaders
        },
        {
          test: /\.hbs$/,
          loader: 'handlebars-loader',
          options: {
            partialDirs: [
              path.resolve(__dirname, 'src/hbs'),
              path.resolve(__dirname, 'src/components')
            ]
          }
        }
      ]
    },
    plugins
  }
}
