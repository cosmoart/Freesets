import assert from 'node:assert/strict'
import { test } from 'node:test'
import { matches, searchText, terms, tidy } from '../src/scripts/filter.ts'

const find = (text, query) => matches(searchText(text), terms(query))

test('Search matches pasted names with nonbreaking spaces', () => {
	assert.equal(find('font awesome icons', 'Font\u00a0Awesome'), true)
})

test('Search matches resources whose names contain odd whitespace', () => {
	assert.equal(find('Font\u00a0Awesome', 'font awesome'), true)
	assert.equal(find('Font\tAwesome\nIcons', 'awesome icons'), true)
	assert.equal(find('Font\u200bAwesome', 'font awesome'), true)
})

test('Search treats whitespace between words consistently', () => {
	for (const separator of [' ', '  ', '\t', '\n', '\r\n', '\u00a0', '\u202f', '\u200b']) {
		assert.deepEqual(terms(` React${separator}Tailwind `), ['react', 'tailwind'])
		assert.equal(find('tailwind components for react', `React${separator}Tailwind`), true)
		assert.equal(find('react components', `React${separator}Tailwind`), false)
	}
})

test('Search ignores zero-width joiners inside words', () => {
	for (const joiner of ['\u200c', '\u200d', '\u2060', '\ufeff']) {
		assert.deepEqual(terms(`Tail${joiner}wind`), ['tailwind'])
	}
})

test('Whitespace-only searches have no terms and do not exclude resources', () => {
	for (const query of ['', ' ', '\t\n', '\u00a0\u202f', '\u200b']) {
		assert.deepEqual(terms(query), [])
		assert.equal(find('font awesome icons', query), true)
	}
})

test('Queries shown back to people keep their case but lose odd whitespace', () => {
	assert.equal(tidy(' Font\u00a0Awesome\u200b '), 'Font Awesome')
})
