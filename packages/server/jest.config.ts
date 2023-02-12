import { name } from './package.json'
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

export default {
  displayName: name,
  name,
  collectCoverage: true,
  coverageReporters: ['text-summary', 'lcov'],
  collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.spec.ts'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.js$': 'babel-jest'
  },
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  })
}
