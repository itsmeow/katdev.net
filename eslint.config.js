import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import react from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier'
import next from '@next/eslint-plugin-next'

export default tseslint.config(
    {
        ignores: [
            'dist',
            '.yarn',
            '.pnp.cjs',
            '.pnp.loader.mjs',
            '.next',
            'next.config.ts',
        ],
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            eslintConfigPrettier,
        ],
        settings: { react: { version: '19.1' } },
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            react,
            '@next/next': next,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': 'off',
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...next.configs.recommended.rules,
            ...next.configs['core-web-vitals'].rules,

            /**
             * `@vercel/og` (which is bundled into Next.js) uses `tw` prop
             * {@see https://github.com/vercel/next.js/blob/canary/packages/next/src/compiled/%40vercel/og/types.d.ts#L115}
             * {@see https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md}
             */
            'react/no-unknown-property': ['error', { ignore: ['tw'] }],
        },
    }
)
