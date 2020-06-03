const jestPreset = require('@testing-library/react-native/jest-preset');

module.exports = {
  ...jestPreset,
  transform: {
    '^.+\\.(js|ts|tsx)$': require.resolve('react-native/jest/preprocessor.js'),
  },
};
