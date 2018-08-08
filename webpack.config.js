const path = require('path')
const resolve = path.resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const url = require('url')
const publicPath = ''

module.exports = (options = {}) => ({
  context: resolve('./src'),
  entry: {
    index: './main.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }, {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              name: "[path][name].[ext]"
            }
          }, {
            loader: 'css-loader',
            options: {
              name: "[path][name].[ext]"
            }
          }, {
            loader: 'postcss-loader',
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }, {
        test: /\.(eot|ttf|woff|woff2)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/fonts/[name].[ext]'
            }
          }
        ]
      }, {
        test: /\.(png|jpg|jpeg|gif|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 10000,
              name: '[path][name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['manifest']}),
    new HtmlWebpackPlugin({template: './popup.html', filename: 'popup.html'}),
    new CopyWebpackPlugin([
      {
        from: './manifest.json',
        to: './'
      }
    ])
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.vue', '.json', '.css']
  },
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      '/api/': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    historyApiFallback: {
      index: url.parse(
        options.dev
        ? '/assets/'
        : publicPath).pathname
    }
  },
  devtool: options.dev
    ? '#eval-source-map'
    : '#source-map'
})
