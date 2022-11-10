const path = require( "path" );
const Dotenv = require( "dotenv-webpack" );
const webpack = require( "webpack" );
const CopyPlugin = require( "copy-webpack-plugin" );
const TsconfigPathsPlugin = require( "tsconfig-paths-webpack-plugin" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );


const {
  createLoadableComponentsTransformer,
} = require( "typescript-loadable-components-plugin" );
const {
  getScssRule,
  getCssRule,
} = require( "./webpack.common" );

module.exports = {
  mode: "development",
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  watchOptions: {
    poll: 1000,
  },
  devServer: {
    magicHtml: true,
    port: 9000,
    static: "./dist",
    liveReload: true,
    historyApiFallback: true,
    open: false,
    hot: true,
    compress: false,
    host: "0.0.0.0",
    allowedHosts: "all",
  },
  module: {
    rules: [
      getCssRule( {
        isProdEnv: false,
      } ),
      getScssRule( {
        isProdEnv: false,
      } ),
      {
        test: /\.(?:tsx|ts|)$/,
        exclude: /(node_modules | __test__)/,
        use: [
          {
            loader: "ts-loader",
            // options: {
            //   getCustomTransformers: (program) => ({
            //     before: [createLoadableComponentsTransformer(program, {})],
            //   }),
            // },
          },
        ],
      },
      {
        test: /\.(?:ico|webp|gif|png|jpg|jpeg|svg|)$/,
        type: "asset/resource",
        generator: {
          filename: `./assets/images/[name][ext]`,
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource",
        generator: {
          filename: `./assets/fonts/[hash][ext][query]`,
        },
      },
    ],
  },
  resolve: {
    extensions: [ ".tsx", ".ts", ".js", ".css", ".scss" ],
    alias: {
      "@core-fonts": path.join( __dirname, "./src/assets/fonts" ),
      "@core-images": path.join( __dirname, "./src/assets/images" ),
      // ...alias,
    },
    plugins: [
      // new TsconfigPathsPlugin({
      //   configFile: path.join(__dirname, "./tsconfig.json"),
      // }),
    ],
  },
  plugins: [
    new Dotenv( {
      path: "./env/.env",
      // path: `./.env.${options.mode}`,
      systemvars: true,
    } ),
    new webpack.ProvidePlugin( {
      process: "process/browser.js",
      Buffer: [ "buffer", "Buffer" ],
    } ),
    // new CopyPlugin({
    //   patterns: [
    //     // {
    //     //   from: path.join(__dirname, "./src/assets/images"),
    //     //   to: path.join(__dirname, "./assets/images"),
    //     // },
    //     // {
    //     //   from: path.join(__dirname, "./src/assets/favicon"),
    //     //   to: `${appFolder && `${appFolder}/`}assets/favicon`,
    //     // },
    //     // {
    //     //   from: path.join(__dirname, "./src/assets/fonts"),
    //     //   to: `${appFolder && `${appFolder}/`}assets/fonts`,
    //     // },
    //     // ...copyToAssets.map((path = "") => {
    //     //   if (!path) return {};
    //     //   const folderName = path.split("/").pop();
    //     //   return {
    //     //     from: path,
    //     //     to: `${appFolder && `${appFolder}/`}assets/${folderName}`,
    //     //   };
    //     // }),
    //   ],
    // }),
    // moduleFederationPlugin
    //   ? getModuleFederationPlugin({
    //       appFolder,
    //       ...moduleFederationPlugin,
    //     })
    //   : null,
    new HtmlWebpackPlugin( {
      template: path.join( __dirname, "./src/public/index.html" ),
      inject: true,
      minify: true,
      publicPath: "/",
      // env: {
      //   dev: true,
      //   rc: false,
      //   prod: false,
      // },
    } ),
  ],
};
