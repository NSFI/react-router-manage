/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

module.exports = {
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!packages/**/*.d.ts',
  ],
  moduleFileExtensions: [
    'js', 'jsx', 'json', 'ts', 'tsx', 'md'
  ],
  // 测试之前的准备
  setupFiles: [
    // 'react-app-ployfill/jsdom',
  ],
  testMatch: [
    '<rootDir>/test/**/*.test.{js,jsx,ts,tsx}'
  ],
  // 测试运行的环境
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react17',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
    // '^.+\\.css$': '<rootDir>/config/jest/cssTransform.js',
    // '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '<rootDir>/config/jest/fileTransform.js'
  },

  transformIgnorePatterns: [
    '/node_modules/(?!(ppfish)|(gsap))',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths: [],

  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'identity-obj-proxy',
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  globals: {
    "__DEV__": true
  }
};
