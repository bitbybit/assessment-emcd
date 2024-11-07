import pluginJs from '@eslint/js'
import pluginTs from 'typescript-eslint'
import pluginPrettier from 'eslint-config-prettier'

export default [
  pluginJs.configs.recommended,
  ...pluginTs.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],

    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },

  {
    ignores: ['node_modules/*']
  },

  pluginPrettier
]
