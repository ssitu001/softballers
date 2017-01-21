module.exports = {

  context: __dirname + '/client/src',
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + "/client/dist",
  },
  resolve: {
    extension: ['', '.js', '.jsx'],
  },
  externals: {
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true,
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      }],
  }
};