<script>
	import Assets from '@/components/Assets.svelte';
	import { page } from '$app/stores';
	import assets from '@/store.js';
	import { onMount } from 'svelte';
	import { queryParam } from 'sveltekit-search-params';

	const searchQuery = $derived($page.url.searchParams.get('q') || '');
	const pageParam = queryParam('page');

	let previousQuery = '';
	let previousPage = '';

	$effect(() => {
		const currentPageNum = $pageParam || '1';
		
		if (searchQuery !== previousQuery) {
			previousQuery = searchQuery;
			if (searchQuery) {
				assets.globalSearch(searchQuery);
			}
		}
		
		if (currentPageNum !== previousPage && $assets.isSearching && searchQuery) {
			previousPage = currentPageNum;
			assets.changePage(parseInt(currentPageNum));
		}
	});

	onMount(() => {
		if (searchQuery) {
			assets.globalSearch(searchQuery);
			previousQuery = searchQuery;
		}
		previousPage = $pageParam || '1';
	});
</script>

<svelte:head>
	<title>Search Results for "{searchQuery}" - Freesets</title>
	<meta name="description" content="Search results for {searchQuery} across all categories" />
</svelte:head>

<main class="flex-1 mt-4">
	{#if searchQuery}
		<div class="mb-4">
			<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
				Search Results
			</h1>
			<p class="text-zinc-600 dark:text-zinc-400">
				Found {$assets.totalAssets} results for 
				<span class="font-semibold">"{searchQuery}"</span>
				{#if $assets.totalPages > 1}
					<span class="text-sm">
						(Page {$assets.currentPage} of {$assets.totalPages})
					</span>
				{/if}
			</p>
		</div>
		<Assets />
	{:else}
		<div class="text-center py-16">
			<h1 class="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
				Search Freesets
			</h1>
			<p class="text-zinc-600 dark:text-zinc-400">
				Use the search bar above to find resources across all categories.
			</p>
		</div>
	{/if}
</main>
