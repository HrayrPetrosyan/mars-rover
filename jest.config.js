/* eslint-disable no-undef */
module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(spec).+(ts)'],
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.ts', '!**/*.d.ts', '!**/node_modules/**'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};
