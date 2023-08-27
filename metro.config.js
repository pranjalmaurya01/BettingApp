// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const defaultConfig = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
})



defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer")
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg")
defaultConfig.resolver.sourceExts = [...defaultConfig.resolver.sourceExts, "svg"]

module.exports = defaultConfig;
