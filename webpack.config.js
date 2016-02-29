// webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: 'dist/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
