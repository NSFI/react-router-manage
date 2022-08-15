module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  collectCoverage: true,
  moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
  ],
  testEnvironment: 'node',
  testEnvironmentOptions: {
    url: 'http://localhost'
  },
  testMatch: [
    '<rootDir>/test/**/*.{js,ts}'
  ],
  transform: {
    '^.+\\.(js|ts|jsx|tsx)$': '<rootDir>/node_modules/ts-jest'
  }
};
