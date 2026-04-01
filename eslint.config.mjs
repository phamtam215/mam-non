// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      // class-validator dùng decorator pattern, typescript-eslint không resolve được kiểu
      // của chúng nên báo "unsafe call" — tắt rule này để tránh false positive
      '@typescript-eslint/no-unsafe-call': 'off',
      // Prisma generated types không resolve đúng với moduleResolution: nodenext
      '@typescript-eslint/no-unsafe-member-access': 'off',
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
);
