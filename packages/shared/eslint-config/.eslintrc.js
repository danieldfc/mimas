module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    "plugin:jsx-a11y/recommended",
    'standard',
    'plugin:import/errors',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'jsx-a11y', 'import','prettier', 'unused-imports'],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off', // Allows us to hoist variables and functions which I am a fan of, functions not variables that is.
    '@typescript-eslint/no-explicit-any': 'off', // Too strict for my case, sometimes I need an any type
    '@typescript-eslint/member-delimiter-style': ['error', { // Prevents us from using any delimiter for interface properties.
      'multiline': {
        'delimiter': 'none',
        'requireLast': false
      },
      'singleline': {
        'delimiter': 'comma',
        'requireLast': false
      }
    }],
    '@typescript-eslint/indent': 'off', // This is the job of StandardJS, they are competing rules so we turn off the Typescript one.
    'no-unused-vars': 'off', // On the fence about using this one, sometimes we import a package that is never used directly.
    'node/no-unsupported-features/es-syntax': 'off', // Allows us to use Import and Export keywords.
    'prettier/prettier': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': [ 1, {'extensions': ['.tsx']} ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {
      "argsIgnorePattern": '_'
    }],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'no-useless-constructor': 'off',
    "no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        "vars": "all",
        "varsIgnorePattern": "^_",
        "args": "after-used",
        "argsIgnorePattern": "^_",
      },
    ],
    "sort-imports": [
      "error",
      {
        "ignoreDeclarationSort": true
      }
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {}
    },
    react: {
      version: 'detect',
    },
  }
}
