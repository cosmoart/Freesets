/**
 * Fixes the resource files where the fix is unambiguous: sequential ids, surrounding spaces and
 * repeated tags. Everything else — duplicated links, missing fields, broken URLs — is left alone,
 * because deciding what to keep needs a human. Run `npm test` after this to see what is left.
 *
 * Usage: npm run fix [-- --dry]
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { format, resolveConfig } from 'prettier'
import { fileURLToPath } from 'node:url'
import { join } from 'node:path'

const DB_DIR = fileURLToPath(new URL('../src/assets/db/', import.meta.url))

const dry = process.argv.includes('--dry')

const color = process.stdout.isTTY
const paint = (code, text) => (color ? `\u001B[${code}m${text}\u001B[0m` : text)
const green = (text) => paint(32, text)
const yellow = (text) => paint(33, text)
const dim = (text) => paint(90, text)

/** String fields that only ever hold text people typed, so a stray space is always a mistake. */
const TEXT_KEYS = ['name', 'link', 'img', 'license', 'licenseLink', 'licenseDescription', 'added']
/** Fields worth dropping when they end up empty, rather than shipping `"license": ""`. */
const OPTIONAL_KEYS = ['license', 'licenseLink', 'licenseDescription', 'added', 'tags']

const label = (asset) => `#${asset?.id ?? '?'} ${JSON.stringify(asset?.name ?? asset)}`

/** Rewrites one resource in place and reports what it changed. */
function fixAsset(asset, index) {
	const fixes = []

	for (const key of TEXT_KEYS) {
		if (typeof asset[key] !== 'string' || asset[key] === asset[key].trim()) continue
		asset[key] = asset[key].trim()
		fixes.push(`trimmed "${key}"`)
	}

	if (Array.isArray(asset.tags)) {
		const trimmed = asset.tags.map((tag) => (typeof tag === 'string' ? tag.trim() : tag))
		if (trimmed.some((tag, position) => tag !== asset.tags[position])) fixes.push('trimmed tags')

		const seen = new Map()
		for (const tag of trimmed) {
			const key = typeof tag === 'string' ? tag.toLowerCase() : tag
			if (!seen.has(key) && tag !== '') seen.set(key, tag)
		}

		if (seen.size !== trimmed.length) fixes.push('dropped repeated tags')
		asset.tags = [...seen.values()]
	}

	for (const key of OPTIONAL_KEYS) {
		const value = asset[key]
		const empty = value === '' || (Array.isArray(value) && value.length === 0)
		if (key in asset && empty) {
			delete asset[key]
			fixes.push(`dropped empty "${key}"`)
		}
	}

	// Last, so the report still names the resource by the id it had in the file.
	const expected = index + 1
	if (asset.id !== expected) {
		fixes.push(`id ${asset.id} → ${expected}`)
		asset.id = expected
	}

	return fixes
}

const prettierConfig = await resolveConfig(DB_DIR)

let touched = 0
const files = readdirSync(DB_DIR).filter((file) => file.endsWith('.json'))

for (const file of files) {
	const path = join(DB_DIR, file)
	const before = readFileSync(path, 'utf8')
	const assets = JSON.parse(before)
	const name = file.replace('.json', '')

	if (!Array.isArray(assets)) {
		console.log(`${yellow('!')} ${name} ${dim('is not an array, skipped')}`)
		continue
	}

	const report = assets.flatMap((asset, index) => {
		if (asset === null || typeof asset !== 'object' || Array.isArray(asset)) return []
		const original = label(asset)
		const fixes = fixAsset(asset, index)
		return fixes.length > 0 ? [`${original} → ${fixes.join(', ')}`] : []
	})

	if (report.length === 0) {
		console.log(`${green('✔')} ${name}`)
		continue
	}

	touched++
	if (!dry) {
		// Through Prettier so the rewritten file keeps the formatting the rest of the repo uses,
		// and with the line endings it already had so the diff only shows the fixes.
		const after = await format(JSON.stringify(assets), {
			...prettierConfig,
			filepath: path,
			endOfLine: before.includes('\r\n') ? 'crlf' : 'lf'
		})
		writeFileSync(path, after)
	}

	console.log(`${yellow('✎')} ${name}\n${report.map((line) => `  ${line}`).join('\n')}\n`)
}

console.log(dim('─'.repeat(40)))
console.log(
	touched === 0
		? green('Nothing to fix')
		: yellow(`${touched} of ${files.length} categories ${dry ? 'would be fixed' : 'fixed'}`)
)
if (touched > 0 && !dry) console.log(dim('Run `npm test` to see what still needs a human.'))
