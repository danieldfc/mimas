export default {
  clearMocks: true,
  coverageProvider: 'v8',
  preset: 'ts-jest',
  projects: ['<rootDir>/packages/**/jest.config.ts'],
  testEnvironment: 'node',
  testMatch: ['*.spec.ts', '*.spec.tsx']
}
