import categories from '@/assets/categories.js';

import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */

export async function load ({ params }) {
	const { category } = params;

	if (categories.some(c => c.nameID === category)) {
		return categories.find(c => c.nameID === category)
	} else error(404, 'Not found')
}