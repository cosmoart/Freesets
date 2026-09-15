import type { APIRoute } from 'astro'
import categories from '@/assets/categories'
import type { SearchEntry } from '@/scripts/search-index'

// Feeds both the header search and the search page, which draws its cards from it.
const index: SearchEntry[] = categories.flatMap((category) =>
	category.assets.map((asset) => ({
		name: asset.name,
		link: asset.link,
		img: asset.img,
		category: category.name,
		nameID: category.nameID,
		color: category.color,
		license: (asset.license ?? asset.licence)?.trim() ?? '',
		licenseLink: asset.licenseLink ?? asset.licenceLink,
		licenseDescription: asset.licenseDescription,
		tags: asset.tags ?? []
	}))
)

export const GET: APIRoute = () =>
	new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' }
	})
