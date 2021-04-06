const path = require('path');

module.exports = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(js|tsx|ts)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, 'src/components/'),
      Atoms: path.resolve(__dirname, 'src/components/atoms/'),
      Molecules: path.resolve(__dirname, 'src/components/molecules/'),
      Organisms: path.resolve(__dirname, 'src/components/organisms/'),
      Templates: path.resolve(__dirname, 'src/components/templates/'),
      Pages: path.resolve(__dirname, 'src/components/pages/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  }
};