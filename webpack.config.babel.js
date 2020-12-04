import webpack from 'webpack';
import path from 'path';

const name = 'AtlassianASAPTokenDynamicValue';

const production = process.env.NODE_ENV === 'production';

const config = {
  target: 'node-webkit',
  entry: [
    'jsrsasign',
    './src/AtlassianASAPTokenDynamicValue.js'
  ],
  output:{
    path: path.join(__dirname, './build/com.atlassian.PawExtensions.AtlassianASAPTokenDynamicValue'),
    pathinfo: true,
    publicPath: '/build/',
    filename: name + '.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, 'src')
        ],
        test: /\.js$/
      }
    ]
  }
};

module.exports = config;
