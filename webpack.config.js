const path = require('path')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

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

const COMPONENTS = getAllFiles(path.join(PATHS.src, 'components')).filter(file => file.includes('component.ts') && file != path.join(PATHS.src, 'components/component.ts'))

module.exports = {
  entry: [
    path.resolve(PATHS.src, 'index.ts'),
    ...COMPONENTS,
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  output: {
    filename: 'index.[contenthash].js',
    path: PATHS.dist,
    publicPath: '/',
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
        exclude: /(node_modules|bower_components|components|scripts)/,
        use: [
          {loader: 'html-loader'},
          {
            loader: 'pug-html-loader',
            options: {
              basedir: PATHS.src,
            }
          }
        ]
      },
      {
        test: /\.pug/,
        include: /(components|scripts)/,
        use: [
          'pug-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {importLoaders: 1,},
          },
          {
            loader: 'postcss-loader',
            options: {postcssOptions: {plugins: [autoprefixer(), cssnano()]}},
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /(node_modules|bower_components|components)/,
        use: [
          // Extract and save the final CSS.
          MiniCssExtractPlugin.loader,
          // Load the CSS
          {
            loader: "css-loader",
            options: {importLoaders: 1,},
          },
          // Add browser prefixes and minify CSS.
          {
            loader: 'postcss-loader',
            options: {postcssOptions: {plugins: [autoprefixer(), cssnano()]}},
          },
          // Load the SCSS/SASS
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ["src/styles"],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        include: /(components)/,
        use: [
          'to-string-loader',
          {
            loader: "css-loader",
            options: {importLoaders: 1, esModule: false,},
          },
          {
            loader: 'postcss-loader',
            options: {postcssOptions: {plugins: [autoprefixer(), cssnano()]}},
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ["src/styles"],
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        exclude: /(node_modules|bower_components)/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(svg)$/,
        exclude: /(node_modules|bower_components)/,
        type: 'asset',
        generator: {
          dataUrl: content => {
            content = content.toString();
            return svgToMiniDataURI(content);
          }
        },
      },
    ]
  },
  resolve: {
    alias: {
      Components: path.join(PATHS.src, 'components/'),
      Atoms: path.join(PATHS.src, 'components/atoms/'),
      Molecules: path.join(PATHS.src, 'components/molecules/'),
      Organisms: path.join(PATHS.src, 'components/organisms/'),
      Templates: path.join(PATHS.src, 'components/templates/'),
      Pages: path.join(PATHS.src, 'pages/'),
      Scripts: path.join(PATHS.src, 'scripts/'),
      Styles: path.join(PATHS.src, 'styles/'),
      Assets: path.join(PATHS.src, 'assets/'),
      Node: path.resolve(__dirname, 'node_modules/'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: PATHS.dist,
    compress: true,
    port: 8000,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      template: path.resolve(PATHS.src, 'index.pug'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin ({
      inject: false,
      template: path.resolve(PATHS.src, '404.pug'),
      filename: '404.html',
    }),
    new MiniCssExtractPlugin ({
      filename: 'styles.[contenthash].css'
    }),
  ]
};