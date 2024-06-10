const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-dotenv'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'jsx', 'js', 'ts', 'tsx'],
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      extraNodeModules: {
        'react-native-svg': require.resolve('react-native-svg'),
      },
    },
  };
})();
