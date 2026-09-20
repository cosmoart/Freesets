// Rasterizes public/favicon.svg into the PNG sizes that iOS, Android and Google
// Search need. Run with `node scripts/generate-icons.js` after changing the logo.
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const source = await readFile(join(publicDir, 'favicon.svg'))

/** iOS ignores transparency and paints it black, so those icons get a white plate. */
const icons = [
	{ file: 'favicon-16x16.png', size: 16 },
	{ file: 'favicon-32x32.png', size: 32 },
	{ file: 'favicon-96x96.png', size: 96 },
	{ file: 'apple-touch-icon.png', size: 180, padding: 0.12, background: '#ffffff' },
	{ file: 'icon-192.png', size: 192 },
	{ file: 'icon-512.png', size: 512 },
	{ file: 'icon-maskable-512.png', size: 512, padding: 0.2, background: '#ffffff' }
]

for (const { file, size, padding = 0, background } of icons) {
	const inner = Math.round(size * (1 - padding * 2))
	const margin = Math.round((size - inner) / 2)

	const png = await sharp(source, { density: 512 })
		.resize(inner, inner)
		.extend({
			top: margin,
			bottom: size - inner - margin,
			left: margin,
			right: size - inner - margin,
			background: background ?? { r: 0, g: 0, b: 0, alpha: 0 }
		})
		.flatten(background ? { background } : false)
		.png()
		.toBuffer()

	await writeFile(join(publicDir, file), png)
	console.log(`${file} (${size}x${size})`)
}

// favicon.ico, for Google Search and older browsers. Since Vista an .ico may hold
// plain PNG frames, so each size is embedded as-is behind a hand-written ICO header.
const icoSizes = [16, 32, 48]
const frames = await Promise.all(
	icoSizes.map((size) =>
		sharp(source, { density: 512 }).resize(size, size).png({ compressionLevel: 9 }).toBuffer()
	)
)

const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0) // reserved
header.writeUInt16LE(1, 2) // 1 = icon, 2 = cursor
header.writeUInt16LE(frames.length, 4)

// Each frame's payload starts after the header and the whole directory.
let offset = header.length + frames.length * 16
const entries = frames.map((frame, index) => {
	const entry = Buffer.alloc(16)
	// A 256px frame is stored as 0; none of these sizes reach it, but keep the rule explicit.
	entry.writeUInt8(icoSizes[index] % 256, 0) // width
	entry.writeUInt8(icoSizes[index] % 256, 1) // height
	entry.writeUInt8(0, 2) // palette colours
	entry.writeUInt8(0, 3) // reserved
	entry.writeUInt16LE(1, 4) // colour planes
	entry.writeUInt16LE(32, 6) // bits per pixel
	entry.writeUInt32LE(frame.length, 8)
	entry.writeUInt32LE(offset, 12)
	offset += frame.length
	return entry
})

await writeFile(join(publicDir, 'favicon.ico'), Buffer.concat([header, ...entries, ...frames]))
console.log(`favicon.ico (${icoSizes.join(', ')})`)
