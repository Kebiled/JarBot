module.exports = {
  entry: './Main.js',
  output: {
    filename: "output/bundle.js"
  },
  resolve: {
    extensions: ['', '.js', '.jsx', 'index.js', 'index.jsx', '.json', 'index.json']
  },
  module: {
    preLoaders: [
       { test: /\.json$/, loader: 'json'},
   ],
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  node: {
    fs: "empty"
  }
};
