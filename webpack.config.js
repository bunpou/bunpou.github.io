const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const PATHS = {
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
}

const getAllFiles = function(dirPath, arrayOfFiles) {
  arrayOfFiles = arrayOfFiles || []

  contents = fs.readdirSync(dirPath)
  contents.forEach(function(content) {
    contentPath = path.join(dirPath, '/', content)
    isContentDir = fs.statSync(contentPath).isDirectory()

    if (isContentDir) {
      arrayOfFiles = getAllFiles(contentPath, arrayOfFiles)
    } else {
      arrayOfFiles.push(contentPath)
    }
  })

  return arrayOfFiles
}

const PAGES = getAllFiles(PATHS.src).filter(fileName => fileName.endsWith('.pug'))

module.exports = {
  entry: path.resolve(PATHS.src, 'index.ts'),
  output: {
    filename: '[name].js',
    path: PATHS.dist,
    clean: true,
  },
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
      },
      {
        test: /\.pug/,
        use: [
          {loader: 'html-loader'},
          {
            loader: 'pug-html-loader',
            options: {
              basedir: PATHS.src
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]',
          },
        }],
      },
    ]
  },
  resolve: {
    alias: {
      Components: path.join(PATHS.src, 'components/'),
      Atoms: path.join(PATHS.src, 'components/atoms/'),
      Molecules: path.join(PATHS.src, 'components/molecules/'),
      Organisms: path.join(PATHS.src, 'components/organisms/'),
      Templates: path.join(PATHS.src, 'templates/'),
      Pages: path.join(PATHS.src, 'pages/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    port: 8000,
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin ({
      template: page,
      filename: page.replace(PATHS.src + '\\', '').replace('.pug', '.html'),
    }))
  ]
};