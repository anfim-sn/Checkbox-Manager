const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const path = require('path')
const { createLoadableComponentsTransformer } = require('typescript-loadable-components-plugin')
const { getModuleFederationPlugin, getScssRule, getCssRule } = require('./webpack.common')

const buildProductionConfig = ({
  moduleFederationPlugin,
  appFolder = '',
  entry = [],
  alias = {},
  outputPath = '',
  splitChunks = false,
  copyToAssets = [],
  plugins = [],
}) => {
  return {
    mode: 'production',
    entry: ['@arenadata/core/themes/grid.scss', '@arenadata/core/themes/base.scss', ...entry],
    module: {
      rules: [
        getCssRule({
          isProdEnv: false,
        }),
        getScssRule({
          isProdEnv: true,
        }),
        {
          test: /\.tsx?$/,
          exclude: /(node_modules | __test__)/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: program => ({
                  before: [createLoadableComponentsTransformer(program, {})],
                }),
              },
            },
          ],
        },
        {
          test: /\.(?:ico|webp|gif|png|jpg|jpeg|svg|)$/,
          type: 'asset/resource',
          generator: {
            filename: `${appFolder && `${appFolder}/`}assets/images/[name][ext]`,
          },
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          type: 'asset/resource',
          generator: {
            filename: `${appFolder && `${appFolder}/`}assets/fonts/[hash][ext][query]`,
          },
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
      alias: {
        '@core-fonts': path.join(__dirname, './../../core/assets/fonts'),
        '@core-images': path.join(__dirname, './../../core/assets/images'),
        ...alias,
      },
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.join(__dirname, './../tsconfig.json'),
        }),
      ],
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          parallel: true,
          extractComments: true,
          terserOptions: {
            mangle: true, // provide code obfuscation
            compress: {
              drop_console: true,
            },
          },
        }),
      ],
      mergeDuplicateChunks: true,
      removeEmptyChunks: true,
      splitChunks: splitChunks
        ? {
            chunks: 'all',
          }
        : false,
    },
    output: {
      filename: `${appFolder && `${appFolder}/`}assets/js/[name].[fullhash].bundle.js`,
      path: outputPath,
      publicPath: '/',
      clean: true,
      assetModuleFilename: `${appFolder && `${appFolder}/`}assets/[name][ext]`,
    },
    plugins: [
      new Dotenv({
        path: './env/.env',
        // path: `./.env.${options.mode}`,
        systemvars: true,
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, './../../core/assets/images'),
            to: `${appFolder && `${appFolder}/`}assets/images`,
          },
          {
            from: path.join(__dirname, './../../core/assets/favicon'),
            to: `${appFolder && `${appFolder}/`}assets/favicon`,
          },
          {
            from: path.join(__dirname, './../../core/assets/fonts'),
            to: `${appFolder && `${appFolder}/`}assets/fonts`,
          },
          ...copyToAssets.map((path = '') => {
            if (!path) return {}
            const folderName = path.split('/').pop()

            return {
              from: path,
              to: `${appFolder && `${appFolder}/`}assets/${folderName}`,
            }
          }),
        ],
      }),
      new MiniCssExtractPlugin({
        filename: `${appFolder && `${appFolder}/`}assets/css/app.[fullhash].min.css`,
      }),
      new CssMinimizerPlugin(),
      moduleFederationPlugin
        ? getModuleFederationPlugin({
            appFolder,
            ...moduleFederationPlugin,
          })
        : null,
      new HtmlWebpackPlugin({
        template: path.join(__dirname, './../public/index.html'),
        inject: true,
        minify: true,
        publicPath: '/',
        // env: {
        //   dev: true,
        //   rc: false,
        //   prod: false,
        // },
      }),
      ...plugins,
    ],
  }
}

module.exports = buildProductionConfig
