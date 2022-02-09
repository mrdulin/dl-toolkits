module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'esbuild-jest',
  },
};
