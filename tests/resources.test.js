import { test } from 'node:test'
import { readdirSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const DB_DIR = fileURLToPath(new URL('../src/assets/db/', import.meta.url))
const CATEGORIES = fileURLToPath(new URL('../src/assets/categories.ts', import.meta.url))

/** Keys of the `Asset` interface in src/types.ts. Anything else is a typo. */
const REQUIRED_KEYS = ['id', 'name', 'link', 'img', 'order']
const OPTIONAL_KEYS = ['added', 'tags', 'license', 'licenseLink', 'licenseDescription']
const KNOWN_KEYS = new Set([...REQUIRED_KEYS, ...OPTIONAL_KEYS])

const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+Z?)?$/

const files = readdirSync(DB_DIR).filter((file) => file.endsWith('.json'))
const read = (file) => JSON.parse(readFileSync(join(DB_DIR, file), 'utf8'))

/** How a resource is named in a report: enough to find it in the file at a glance. */
const label = (asset) => `#${asset?.id ?? '?'} ${JSON.stringify(asset?.name ?? asset)}`

const isUrl = (value, protocols) => {
	try {
		return protocols.includes(new URL(value).protocol)
	} catch {
		return false
	}
}

const isText = (value) => typeof value === 'string' && value.trim() === value && value !== ''

/**
 * Every rule, as a title plus the offending resources it finds. A rule reports all of them, so one
 * run lists every resource to fix instead of only the first.
 */
const rules = [
	{
		title: 'Resources must be objects',
		run: (assets) =>
			assets.filter((a) => a === null || typeof a !== 'object' || Array.isArray(a)).map(label)
	},
	{
		title: 'Missing required fields',
		run: (assets) =>
			assets.flatMap((asset) => {
				const missing = REQUIRED_KEYS.filter((key) => asset[key] === undefined)
				return missing.length ? [`${label(asset)} → missing ${missing.join(', ')}`] : []
			})
	},
	{
		title: 'Unknown fields (check for typos)',
		run: (assets) =>
			assets.flatMap((asset) => {
				const unknown = Object.keys(asset).filter((key) => !KNOWN_KEYS.has(key))
				return unknown.length ? [`${label(asset)} → ${unknown.join(', ')}`] : []
			})
	},
	{
		title: '"id" must be sequential from 1',
		run: (assets) =>
			assets.flatMap((asset, index) =>
				asset.id === index + 1 ? [] : [`${label(asset)} → expected id ${index + 1}`]
			)
	},
	{
		title: '"order" must be an integer between 0 and 100',
		run: (assets) =>
			assets
				.filter((a) => !Number.isInteger(a.order) || a.order < 0 || a.order > 100)
				.map((asset) => `${label(asset)} → order ${JSON.stringify(asset.order)}`)
	},
	{
		title: '"name" must be a non-empty, trimmed string',
		run: (assets) => assets.filter((asset) => !isText(asset.name)).map(label)
	},
	{
		title: '"link" must be an http(s) URL',
		run: (assets) =>
			assets
				.filter((asset) => !isUrl(asset.link, ['http:', 'https:']))
				.map((asset) => `${label(asset)} → ${JSON.stringify(asset.link)}`)
	},
	{
		// Every image is served over the CDN, so https is not negotiable here.
		title: '"img" must be an https URL',
		run: (assets) =>
			assets
				.filter((asset) => !isUrl(asset.img, ['https:']))
				.map((asset) => `${label(asset)} → ${JSON.stringify(asset.img)}`)
	},
	{
		title: 'License fields must be consistent',
		run: (assets) =>
			assets.flatMap((asset) => {
				const malformed = ['license', 'licenseLink', 'licenseDescription'].filter(
					(key) => key in asset && !isText(asset[key])
				)
				if (malformed.length)
					return [`${label(asset)} → empty or untrimmed ${malformed.join(', ')}`]
				if ((asset.licenseLink || asset.licenseDescription) && !asset.license) {
					return [`${label(asset)} → license details without "license"`]
				}
				if (asset.licenseLink && !isUrl(asset.licenseLink, ['http:', 'https:'])) {
					return [`${label(asset)} → licenseLink ${JSON.stringify(asset.licenseLink)}`]
				}
				return []
			})
	},
	{
		title: '"tags" must be unique, non-empty strings',
		run: (assets) =>
			assets.flatMap((asset) => {
				if (!('tags' in asset)) return []
				if (!Array.isArray(asset.tags) || asset.tags.length === 0) {
					return [`${label(asset)} → tags must be a non-empty array`]
				}
				if (!asset.tags.every(isText)) return [`${label(asset)} → empty or untrimmed tag`]
				if (new Set(asset.tags).size !== asset.tags.length) {
					return [`${label(asset)} → repeated tag in ${JSON.stringify(asset.tags)}`]
				}
				return []
			})
	},
	{
		title: '"added" must be a past ISO date',
		run: (assets) => {
			// Compared against the end of today so a date added today never fails on a timezone.
			const tomorrow = Date.now() + 24 * 60 * 60 * 1000
			return assets.flatMap((asset) => {
				if (!('added' in asset)) return []
				const time = typeof asset.added === 'string' ? Date.parse(asset.added) : Number.NaN
				if (!ISO_DATE.test(asset.added) || Number.isNaN(time)) {
					return [`${label(asset)} → ${JSON.stringify(asset.added)} is not an ISO date`]
				}
				return time > tomorrow ? [`${label(asset)} → ${asset.added} is in the future`] : []
			})
		}
	},
	// Repeats across categories are fine — the same resource can belong to several.
	...[
		['name', (value) => String(value).toLowerCase()],
		['link', (value) => String(value).replace(/\/+$/, '')],
		['img', String]
	].map(([key, normalize]) => ({
		title: `Duplicated "${key}" inside the category`,
		run: (assets) => {
			const seen = new Map()
			for (const asset of assets) {
				const value = normalize(asset[key])
				seen.set(value, [...(seen.get(value) ?? []), asset])
			}
			return [...seen]
				.filter(([, group]) => group.length > 1)
				.map(([value, group]) => `${group.map(label).join(' · ')} → ${value}`)
		}
	}))
]

/** Fails with just the report: no diff, no stack, nothing the reader has to skip past. */
function report(problems) {
	const message = problems
		.map(({ title, offenders }) => `${title}\n${offenders.map((line) => `  ${line}`).join('\n')}`)
		.join('\n')

	const error = new Error(message)
	error.stack = message
	throw error
}

for (const file of files) {
	test(file.replace('.json', ''), () => {
		const assets = read(file)
		if (!Array.isArray(assets) || assets.length === 0)
			report([{ title: 'Empty or not an array', offenders: [file] }])

		const problems = rules
			.map(({ title, run }) => ({ title, offenders: run(assets) }))
			.filter(({ offenders }) => offenders.length > 0)

		if (problems.length > 0) report(problems)
	})
}

test('categories.ts', () => {
	const source = readFileSync(CATEGORIES, 'utf8')
	const missing = files.filter((file) => !source.includes(`db/${file}`))

	if (missing.length > 0)
		report([{ title: 'Files never imported by categories.ts', offenders: missing }])
})
