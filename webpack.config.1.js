const webpack = require('webpack')
const path = require('path')
const CreateFileWebpack = require('create-file-webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const _ = require('lodash')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackShellPlugin = require('./tools/webpack/plugins/shell-plugin');

const htmlTemplate = require('./src/client/html-template.js')

let BUILD_DIR
let APP_PATH_STRING
let CSS_PATH_STRING
let APP_VERSION_STRING

const APP_DIR = path.resolve(__dirname, 'src/client')
const EXAMPLE_DIR = path.resolve(__dirname, 'examples/')

const htmlTemplateCompiler = _.template(htmlTemplate)
const plugins = []


// const APP_VERSION_STRING
// const APP_PATH_STRING
// const CSS_PATH_STRING

// const config
module.exports = (env) => {
    BUILD_DIR = path.resolve(__dirname, 'dist/client')
    APP_VERSION_STRING = 'dev'
    APP_PATH_STRING = ''
    CSS_PATH_STRING = ''
  

  return {
    entry: `${APP_DIR}/index.jsx`,
    output: {
      path: BUILD_DIR,
      filename: 'iodide.js',
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        // {
        //   enforce: 'pre',
        //   test: /\.jsx?$/,
        //   exclude: /node_modules/,
        //   loader: 'eslint-loader',
        //   options: {
        //     // eslint options (if necessary)
        //     emitWarning: true,
        //     emitError: true,
        //     extensions: ['.jsx', '.js'],
        //   },
        // },
        {
          test: /\.jsx?/,
          include: APP_DIR,
          use: [
            {loader: 'babel-loader'}
          ]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          }),
        },
        //         {
        //   test: /\.css$/,
        //   use: [
        //     MiniCssExtractPlugin.loader,
        //     'css-loader'
        //   ],
        // },

        {
          test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
          loader: `file-loader?name=fonts/[name].[ext]`,
        },
        {
          test: /\.jsmd$/,
          include: EXAMPLE_DIR,
          loader: 'raw-loader',
        },
      ],
    },
    watchOptions: { poll: true },
    plugins: [
      ...plugins,
      new CreateFileWebpack({
        path: BUILD_DIR,
        fileName: 'index.html',
        content: htmlTemplateCompiler({
          APP_VERSION_STRING,
          APP_PATH_STRING,
          CSS_PATH_STRING,
          NOTEBOOK_TITLE: 'new notebook',
          JSMD: '',
        }),
      }),
      new webpack.DefinePlugin({
        IODIDE_VERSION: JSON.stringify(APP_VERSION_STRING),
        IODIDE_JS_PATH: JSON.stringify(APP_PATH_STRING),
        IODIDE_CSS_PATH: JSON.stringify(CSS_PATH_STRING),
        IODIDE_BUILD_MODE: JSON.stringify(env),
      }),
      new ExtractTextPlugin('styles.css'),
      //new MiniCssExtractPlugin('styles.css'),
      new WebpackShellPlugin({onBuildEnd: {scripts: ['electron .']}})
    ],
  }
}

// module.exports = config
