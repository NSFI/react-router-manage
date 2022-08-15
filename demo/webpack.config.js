const path = require('path');
const webpack = require('webpack');
const MiniCssPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const args = require('yargs').argv;

const config = {
  entry: {
    demo: path.resolve(__dirname, 'app.js')
  },
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: '[name].js'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, '../demo'),
    },
    allowedHosts: 'all',
    compress: true,
    port: 8927,
    hot: true,
    open: true,
    proxy: [
      {
        context: ['/webapi', '/api', '/robot/api', '/chat/api', '/worksheet/api', '/crm/api/'],
        target: 'http://59.111.241.137',
        cookieDomainRewrite: '',
        changeOrigin: true,
        secure: false
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.less']
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'ts-loader'
        }]
      },
      {
        test: /\.(css|less)?$/,
        use: [
          MiniCssPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|cur)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2560,
            name: '[path][name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'demo/index.html'
    }),
    new MiniCssPlugin({
      filename: '[name].css'
    }),
    new ESLintPlugin({
      fix: true,
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ],
  mode: 'development',
  devtool: 'inline-source-map'
};
module.exports = config;
