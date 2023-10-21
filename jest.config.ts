import {defaults as tsjPreset} from 'ts-jest/presets';
import type {JestConfigWithTsJest} from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  ...tsjPreset,
  roots: ['<rootDir>/src/'],
  preset: '@testing-library/react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '@assets/(.*)': '<rootDir>/src/assets/$1',
    '@components/(.*)': '<rootDir>/src/components/$1',
    '@configs/(.*)': '<rootDir>/src/configs/$1',
    '@models/(.*)': '<rootDir>/src/models/$1',
    '@modules/(.*)': '<rootDir>/src/modules/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@screens/(.*)': '<rootDir>/src/screens/$1',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation|@cassianosch/react-native-keyboard-sticky-footer-avoiding-scroll-view)',
  ],
  fakeTimers: {
    enableGlobally: true,
  },
  setupFilesAfterEnv: ['./jest-setup.ts'],
};

export default jestConfig;
