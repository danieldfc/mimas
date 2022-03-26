import { name } from './package.json'
import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

export default {
  displayName: name,
  name,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  })
}
