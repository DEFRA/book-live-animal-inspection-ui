module.exports = {
  rootDir: '.',
  testEnvironment: 'jsdom',
  verbose: true,
  resetModules: true,
  clearMocks: true,
  silent: true,
  testMatch: ['**/src/**/*.test.js'],
  reporters: ['default', ['github-actions', { silent: false }], 'summary'],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.server',
    '<rootDir>/.public',
    '<rootDir>/src/__fixtures__',
    '<rootDir>/.*index\\.js$',
    '<rootDir>/test-helpers',
    '<rootDir>/src/server/common/',
    '<rootDir>/src/client/',
    '<rootDir>/mock-api'
  ],
  coverageDirectory: '<rootDir>/coverage'
}
