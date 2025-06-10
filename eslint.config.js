import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    ignores: ['/dist/', '/node_modules/'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      semi: ['error', 'always'],
    },
  },
]
