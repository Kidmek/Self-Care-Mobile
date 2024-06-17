module.exports = function (api) {
  api.cache(true);
  const plugins = [
    '@babel/plugin-proposal-export-namespace-from',
    require.resolve('expo-router/babel'),
  ];

  plugins.push('react-native-reanimated/plugin');

  return {
    presets: ['babel-preset-expo'],

    plugins,
  };
};
