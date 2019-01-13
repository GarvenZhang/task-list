const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')
const webpack = require('webpack')
const path = require('path')

const distPath = path.resolve('./dist')
const mainPath = path.resolve('./src/main.js')
const htmlPath = path.resolve('./src/index.html')
const cssName = 'main.css'

module.exports = {
  mode: 'development',
  entry: {
    'main': mainPath
  },
  output: {
    path: distPath,
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    port: '8080',
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              'transform-function-bind'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|bmp)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'url-loader',
          options: {
            fallback: 'file-loader',
            limit: 2048,
            name: '[name].[ext]'
          }
        }]
      },
      {
        test: /\.(svg|eot|woff|ttf|woff2|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.vue',
      '.css',
      '.json'
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: cssName,
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      template: htmlPath,
      filename: 'index.html',
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
