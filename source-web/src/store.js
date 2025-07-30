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
	isSearching: false,
	searchQuery: '',
	currentCategory: null,
	globalAssets: [],
});

function initGlobalAssets() {
	const combined = [];
	categories.forEach(category => {
		const categoryAssets = category.assets || [];
		combined.push(...categoryAssets.map(asset => ({
			...asset,
			category: category.nameID,
			categoryName: category.name,
			categoryColor: category.color
		})));
	});
	return combined;
}

function changeCategory (category) {
	const categoryData = categories.find((c) => c.nameID === category);
	if (!categoryData) throw new Error('Category not found');

	set({
		...categoryData,
		assets: categoryData.assets.slice(0, assetsPerPage),
		filteredAssets: categoryData.assets,
		allAssets: categoryData.assets,
		globalAssets: initGlobalAssets(),
		totalAssets: categoryData.assets.length,
		totalPages: Math.ceil(categoryData.assets.length / assetsPerPage),
		currentPage: 1,
		currentCategory: category,
		isSearching: false,
		searchQuery: '',
	});
}

function search (query, isGlobalSearch = false) {
	update((state) => {
		const searchTerms = query
			?.toLowerCase()
			.split(' ')
			.map((term) => term.trim())
			.filter((term) => term);

		const searchAssets = isGlobalSearch ? state.globalAssets : state.allAssets;
		const start = assetsPerPage * (state.currentPage - 1);
		const end = assetsPerPage * state.currentPage;

		if (!searchTerms.length) {
			const assetsToShow = isGlobalSearch ? state.globalAssets : state.allAssets;
			return {
				...state,
				assets: assetsToShow.slice(start, end),
				filteredAssets: assetsToShow,
				totalAssets: assetsToShow.length,
				totalPages: Math.ceil(assetsToShow.length / assetsPerPage),
				isSearching: false,
				searchQuery: '',
			};
		}

		const filteredAssets = searchAssets.filter((resource) =>
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
			isSearching: true,
			searchQuery: query,
			currentPage: 1,
		};
	});
}

function globalSearch(query) {
	update((state) => {
		if (!state.globalAssets.length) {
			state.globalAssets = initGlobalAssets();
		}

		const searchTerms = query
			?.toLowerCase()
			.split(' ')
			.map((term) => term.trim())
			.filter((term) => term);

		if (!searchTerms.length) return {
			...state,
			assets: [],
			filteredAssets: [],
			totalAssets: 0,
			totalPages: 0,
			currentPage: 1,
			currentCategory: null,
			isSearching: false,
			searchQuery: '',
		};

		const filteredAssets = state.globalAssets.filter((resource) =>
			searchTerms.every(
				(searchTerm) =>
					resource.name.toLowerCase().includes(searchTerm) ||
					resource.license?.toLowerCase().includes(searchTerm) ||
					resource.tags?.some((tag) => tag.toLowerCase().includes(searchTerm))
			)
		);

		const start = 0; // İlk sayfa
		const end = assetsPerPage;

		return {
			...state,
			assets: filteredAssets.slice(start, end),
			filteredAssets: filteredAssets,
			allAssets: state.globalAssets, // Global asset'leri allAssets'e ata
			totalAssets: filteredAssets.length,
			totalPages: Math.ceil(filteredAssets.length / assetsPerPage),
			currentPage: 1,
			currentCategory: null,
			isSearching: true,
			searchQuery: query,
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

function getByCategory(categoryName) {
	const categoryData = categories.find((c) => c.nameID === categoryName);
	return categoryData ? categoryData.assets : [];
}

export default {
	subscribe,
	changeCategory,
	search,
	globalSearch,
	changePage,
	getByCategory,
}