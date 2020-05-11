"use strict";
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: {
    bursts: './js/bursts/bursts.js',
    puzzle: './js/puzzle/puzzle.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  externals: {
    'vue': 'Vue',
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  performance: {
    hints: false
  },
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all'
    }
  }
};
