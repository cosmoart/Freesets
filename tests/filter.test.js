import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import ts from 'typescript'

const source = readFileSync(new URL('../src/scripts/filter.ts', import.meta.url), 'utf8')
const { outputText } = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.ESNext }
})
const { matches, terms } = await import(
	`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`
)

test('Search matches pasted names with nonbreaking spaces', () => {
	assert.equal(matches('font awesome icons', 'Font\u00a0Awesome'), true)
})

test('Search treats whitespace between words consistently', () => {
	for (const separator of [' ', '  ', '\t', '\n', '\r\n', '\u00a0', '\u202f']) {
		assert.deepEqual(terms(` React${separator}Tailwind `), ['react', 'tailwind'])
		assert.equal(matches('tailwind components for react', `React${separator}Tailwind`), true)
		assert.equal(matches('react components', `React${separator}Tailwind`), false)
	}
})

test('Whitespace-only searches have no terms and do not exclude resources', () => {
	for (const query of ['', ' ', '\t\n', '\u00a0\u202f']) {
		assert.deepEqual(terms(query), [])
		assert.equal(matches('font awesome icons', query), true)
	}
})
