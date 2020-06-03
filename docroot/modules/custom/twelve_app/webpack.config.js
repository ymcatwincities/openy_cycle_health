"use strict";
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const EnvironmentPlugin = require("webpack").EnvironmentPlugin;

module.exports = (env, argv) => {
  return {
    entry: {
      bursts: './js/bursts/bursts.js',
      puzzle: './js/puzzle/puzzle.js',
      bingo: './js/bingo/bingo.js',
      summits: './js/seven_summits/seven_summits.js'
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
      axios: 'axios',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      'vuex-persist': 'VuexPersistence',
    },
    plugins: [
      new VueLoaderPlugin(),
      new EnvironmentPlugin({
        DEBUG: argv.mode === 'production' ? false : true
      })
    ],
    devtool: argv.mode === 'production' ? false : 'source-map',
    performance: {
      hints: argv.mode === 'production' ? false : 'warning'
    },
    stats: {
      modules: false
    },
  }
};
