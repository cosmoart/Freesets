/** @type {import('./$types').PageLoad} */
import categories from '@/assets/categories';

export function load ({ params }) {
	const { category } = params;
	const page = categories.find(({ name }) => name.toLowerCase().replaceAll(" ", "-") === category.toLowerCase());
	return { page };
}