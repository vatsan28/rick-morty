var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ]
    }
  },
  {
    "test": /\.css$/, 
    "loader": "style-loader!css-loader" 
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('build'),
    filename: 'build.js',
    publicPath: '/'
  },
  module: {
    loaders: loaders
  }
};