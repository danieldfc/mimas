export default {
  clearMocks: true,
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.ts'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '\\.js$': 'babel-jest'
  }
}
