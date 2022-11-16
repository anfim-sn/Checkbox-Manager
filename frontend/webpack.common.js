const path = require( "path" );
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const ModuleFederationPlugin = require( "webpack/lib/container/ModuleFederationPlugin" );
const deps = require( "./package.json" ).dependencies;

const getModuleFederationPlugin = ( {
  appFolder = false,
  filename = "remoteEntry.js",
  name = "",
  remotes = {},
  exposes = {},
  sharedEager = true,
} ) => {
  return new ModuleFederationPlugin( {
    name,
    filename: `${ appFolder && `${ appFolder }/` }${ filename && filename }`,
    remotes,
    exposes,
    shared: [
      {
        react: {
          eager: sharedEager,
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          eager: sharedEager,
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "react-i18next": {
          eager: sharedEager,
          singleton: true,
          requiredVersion: deps["react-i18next"],
        },
        "@arenadata/app-settings-context": {
          import: "@arenadata/app-settings-context",
          requiredVersion: require( "../../app-settings-context/package.json" )
            .version,
        },
      },
    ],
  } );
};

const getScssRule = ( { isProdEnv = false } ) => {
  const lastLoader = isProdEnv ? MiniCssExtractPlugin.loader : "style-loader";

  return {
    test: /\.s[ac]ss$/i,
    use: [
      lastLoader,
      {
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            auto: true,
            exportGlobals: true,
            localIdentName: "[local]--[hash:base64:3]",
            localIdentContext: path.join( __dirname, "./src" ),
          },
        },
      },
      "sass-loader",
    ],
  };
};

const getCssRule = ( { isProdEnv = false } ) => {
  const lastLoader = isProdEnv ? MiniCssExtractPlugin.loader : "style-loader";

  return {
    test: /\.css$/,
    use: [
      lastLoader,
      {
        loader: "css-loader",
        options: {
          modules: {
            mode: "local",
            auto: true,
            exportGlobals: true,
            localIdentName: "[local]--[hash:base64:3]",
            localIdentContext: path.join( __dirname, "./src" ),
          },
        },
      },
    ],
  };
};

module.exports = {
  getModuleFederationPlugin,
  getScssRule,
  getCssRule,
};
