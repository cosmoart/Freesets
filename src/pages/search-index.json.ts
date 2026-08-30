import type { APIRoute } from 'astro'
import categories from '@/assets/categories'

const index = categories.flatMap((category) =>
	category.assets.map((asset) => ({
		name: asset.name,
		link: asset.link,
		category: category.name,
		color: category.color
	}))
)

export const GET: APIRoute = () =>
	new Response(JSON.stringify(index), {
		headers: { 'Content-Type': 'application/json' }
	})
