import js from '@eslint/js'
import { defineConfig, globalIgnores } from 'eslint/config'
import ts from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default defineConfig([
	globalIgnores(['dist/', '.astro/', 'node_modules/']),
	js.configs.recommended,
	ts.configs.recommended,
	astro.configs.recommended,
	prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		}
	}
])
