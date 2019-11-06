module.exports = {
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts', 'd.ts'],
  coverageDirectory: '<rootDir>/temp/coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/**/*.d.ts',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest',
};
