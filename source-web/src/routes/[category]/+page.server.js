import categories from '@/assets/categories.js';
let assets = 42;

import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */

export async function load ({ params, url }) {
	const { category } = params;
	const resources = categories.find(c => c.nameID === category)
	const page = Number(url.searchParams.get('page') || 1)
	const start = assets * page - assets
	const end = assets * page

	if (!resources || !page || page < 1) return error(404, 'Not found')
	if (start >= resources.items.length) return error(404, 'Not found')

	return {
		...resources,
		totalItems: resources.items.length,
		page,
		totalPages: Math.ceil(resources.items.length / assets),
		items: resources.items.slice(start, end),
	}
}
