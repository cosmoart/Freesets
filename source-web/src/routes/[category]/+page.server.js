import { supabase } from "$lib/supabaseClient";
import categories from '@/assets/categories.json';
import { error } from '@sveltejs/kit';
/** @type {import('./$types').PageServerLoad} */

export async function load ({ params }) {
	const { category } = params;

	let { data } = await supabase
		.from(category)
		.select('*')
		.order('order', { ascending: false });

	if (data) { return { ...categories.find(c => c.nameID === category), items: data ?? [] } }
	error(404, 'Not found');
}