import globals from 'globals';
import pluginJs from "@eslint/js";
import tsEslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import airbnb from 'eslint-config-airbnb';

export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  pluginReactConfig,
  airbnb.rules,
  {rules: {
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  }},
];
