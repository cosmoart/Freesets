import { writable } from 'svelte/store';
import categories from '@/assets/categories.js';
const assetsPerPage = 42;

const { subscribe, set, update } = writable({
	assets: [],
	allAssets: [],
	filteredAssets: [],
	totalAssets: 0,
	totalPages: 0,
	currentPage: 1,
});

function changeCategory (category) {
	const categoryData = categories.find((c) => c.nameID === category);
	if (!categoryData) throw new Error('Category not found');

	set({
		...categoryData,
		assets: categoryData.assets.slice(0, assetsPerPage),
		filteredAssets: categoryData.assets,
		allAssets: categoryData.assets,
		totalAssets: categoryData.assets.length,
		totalPages: Math.ceil(categoryData.assets.length / assetsPerPage),
		currentPage: 1,
	});
}

function search (query) {
	update((state) => {
		const searchTerms = query
			?.toLowerCase()
			.split(' ')
			.map((term) => term.trim())
			.filter((term) => term);

		const start = assetsPerPage * (state.currentPage - 1);
		const end = assetsPerPage * state.currentPage;

		if (!searchTerms.length) return {
			...state,
			assets: state.allAssets.slice(start, end),
			totalAssets: state.allAssets.length,
			totalPages: Math.ceil(state.allAssets.length / assetsPerPage)
		};

		const filteredAssets = state.allAssets.filter((resource) =>
			searchTerms.every(
				(searchTerm) =>
					resource.name.toLowerCase().includes(searchTerm) ||
					resource.license?.toLowerCase().includes(searchTerm) ||
					resource.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
			)
		);

		return {
			...state,
			assets: filteredAssets.slice(start, end),
			filteredAssets: filteredAssets,
			totalAssets: filteredAssets.length,
			totalPages: Math.ceil(filteredAssets.length / assetsPerPage),
		};
	});
}

function changePage (page) {
	update((state) => {
		const start = assetsPerPage * +page - assetsPerPage;
		const end = assetsPerPage * +page;

		if (start >= state.filteredAssets.length || !page) return {
			...state,
			currentPage: 1,
			assets: state.filteredAssets.slice(0, assetsPerPage),
		};

		return {
			...state,
			currentPage: +page,
			assets: state.filteredAssets.slice(start, end),
		};
	});
}

export default {
	subscribe,
	changeCategory,
	search,
	changePage,
}