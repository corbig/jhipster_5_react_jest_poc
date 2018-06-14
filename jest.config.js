module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/src/test/javascript/spec/entry.ts',
  setupFiles: [
    '<rootDir>/jest/polyfills.js'
  ],
  testMatch: [
    '<rootDir>/src/test/javascript/spec/**/*.spec.ts?(x)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/main/webapp/app/**/*.{ts,tsx}',
    '!src/main/webapp/app/**/*.d.ts'
  ],
  coverageReporters: ['text'],
  testEnvironment: 'node',
  testURL: 'http://localhost',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^(?!.*\\.(js|jsx|css|json)$)': '<rootDir>/jest/fileTransform.js'
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$'
  ],
  moduleNameMapper: {
    '^app(.*)$': '<rootDir>/src/main/webapp/app/$1'
  },
  moduleFileExtensions: [
    'ts',
    'tsx',
    'json',
    'js',
    'jsx',
    'node'
  ],
  globals: {
    'ts-jest': {
      'tsConfigFile': 'tsconfig.json'
    }
  }
};
