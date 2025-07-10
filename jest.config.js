module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/tests/**/*.spec.ts'],
  setupFiles: ['dotenv/config']
};