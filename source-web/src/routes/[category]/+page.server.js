import categories from '@/assets/categories.js';
let assets = 42;

import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */

export async function load ({ params, url }) {
	const { category } = params;
	let resources = categories.find(c => c.nameID === category)
	const currentPage = Number(url.searchParams.get('page') ?? 1)
	const q = url.searchParams.get('q')?.toLowerCase() ?? ''

	const start = assets * currentPage - assets
	const end = assets * currentPage

	if (!resources || !currentPage || currentPage < 1) return error(404, 'Not found')
	if (start >= resources.assets.length) return error(404, 'Not found')

	if (q) {
		const searchTerms = q.split(' ').map(term => term.toLowerCase()).filter((t) => t)
		resources = {
			...resources, assets: resources.assets.filter(resource =>
				searchTerms.every(searchTerm =>
					resource.name.toLowerCase().includes(searchTerm)
					|| resource.link.toLowerCase().includes(searchTerm)
					|| resource.license?.toLowerCase().includes(searchTerm)
					|| resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm)))
			)
		}
	}

	return {
		...resources,
		totalAssets: resources.assets.length,
		currentPage,
		totalPages: Math.ceil(resources.assets.length / assets),
		assets: resources.assets?.slice(start, end),
	}
}
