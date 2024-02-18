module.exports = {
	root: true,
	extends: ['eslint:recommended', 'plugin:svelte/recommended', 'prettier'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020,
		extraFileExtensions: ['.svelte']
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	},
	rules: {
		'indent': [1, 'tab'],
		'no-tabs': 0,
		'jsx-quotes': [1, 'prefer-single'],
		'react/react-in-jsx-scope': 'off',
		'react/prop-types': 'off',
		'no-unused-vars': 1,
		'useUnknownInCatchVariables': 0,
		'quotes': [1, 'single'],
		'no-trailing-spaces': 1,
		'comma-dangle': [1, 'only-multiline'],
	}
};
