import type { APIRoute } from 'astro'
import categories from '@/assets/categories'
import { recentKeys } from '@/scripts/recent'
import type { SearchEntry } from '@/scripts/search-index'

// Feeds both the header search and the search page, which draws its cards from it.
export const GET: APIRoute = () => {
	const recent = recentKeys()

	const index: SearchEntry[] = categories.flatMap((category) =>
		category.assets.map((asset) => ({
			name: asset.name,
			link: asset.link,
			img: asset.img,
			category: category.name,
			nameID: category.nameID,
			color: category.color,
			license: asset.license?.trim() ?? '',
			isNew: recent.has(`${category.nameID}:${asset.id}`) || undefined,
			licenseLink: asset.licenseLink,
			licenseDescription: asset.licenseDescription,
			tags: asset.tags ?? []
		}))
	)

	return new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' }
	})
}
