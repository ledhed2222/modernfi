module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },

  env: {
    es6: true,
    browser: true,
  },

  extends: ['@xrplf', 'react-app', 'react-app/jest'],

  rules: {
    'import/no-default-export': 'error',
    'import/prefer-default-export': 'off',
    'jsdoc/require-jsdoc': 'off',
    '@typescript-eslint/naming-convention': 'off',
    // it's annoying in a scratch env
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
}

