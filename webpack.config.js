const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV == 'development';
const IS_PROD = NODE_ENV == 'development';

function setupDevtool() {
  if(IS_DEV) return 'eval';
  if(IS_PROD) return false;
}


module.exports = {

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss','.css']
  },

  mode: NODE_ENV ? NODE_ENV : 'development',

  entry: path.resolve(__dirname, 'src/index.jsx'),

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ['ts-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader', 
          { 
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../', },
          },
          'css-loader', 
          'sass-loader'
        ]
        //use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: { outputPath: 'img' }
      },

    ]
  },

  plugins: [
    new HTMLWebpackPlugin({
      title: 'Movies',
      template: path.resolve(__dirname, 'index.html')
    }),
    new webpack.ProvidePlugin({
      $: "swipebox/lib/jquery-2.1.0.min.js",
      jQuery: "swipebox/lib/jquery-2.1.0.min.js"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css',
    }),
  ],

  devtool: setupDevtool()

};

