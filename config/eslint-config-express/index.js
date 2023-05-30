module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:require-extensions/recommended',
  ],
  parser: '@typescript-eslint/parser',

  plugins: ['@typescript-eslint', 'require-extensions', 'prettier'],
  rules: {
    // turn on errors for missing imports
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['**/node_modules/**', '**/out/**'],
}
