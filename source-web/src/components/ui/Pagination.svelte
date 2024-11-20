<script>
	import { queryParam } from 'sveltekit-search-params';
	import arrowIcon from '@/assets/icons/arrow.svg';
	import assets from '@/store.js';
	const pageUrl = queryParam('page');

	let pages = $derived(Array.from({ length: $assets.totalPages }, (_, i) => i + 1));

	function changePage(page) {
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 100);
		assets.changePage(page);
		$pageUrl = page;
	}
</script>

<nav>
	<ul class="flex gap-2 justify-center mt-12">
		{#if $assets.currentPage > 1}
			<li>
				<button
					onclick={() => changePage($assets.currentPage - 1)}
					class="hover:bg-zinc-700 mr-3 bg-zinc-900 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {$assets.currentPage ===
					1
						? 'pointer-events-none '
						: ''}"
					disabled={$assets.currentPage === 1}
					aria-label="Go to the previous page"
				>
					<img src={arrowIcon} alt="" class="w-5 invert dark:invert-0" />
				</button>
			</li>
		{:else}
			<li
				class="mr-3 bg-zinc-900 dark:bg-white transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex opacity-85 justify-center items-center"
			>
				<img src={arrowIcon} alt="" class="w-5 invert dark:invert-0" />
			</li>
		{/if}

		{#each pages as page}
			<li>
				<button
					onclick={() => changePage(page)}
					class="hover:bg-zinc-700 bg-zinc-900 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {page ===
					$assets.currentPage
						? 'pointer-events-none'
						: ''} {page === $assets.currentPage
						? '!bg-blue-600 text-white'
						: 'dark:text-slate-900'}"
					disabled={page === $assets.currentPage}
					aria-label="Go to {page} page"
				>
					{page}
				</button>
			</li>
		{/each}

		{#if $assets.currentPage < $assets.totalPages}
			<li>
				<button
					onclick={() => changePage($assets.currentPage + 1)}
					class="hover:bg-zinc-700 ml-3 bg-zinc-900 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {$assets.currentPage ===
					$assets.totalPages
						? 'pointer-events-none opacity-80'
						: ''}"
					disabled={$assets.currentPage === $assets.totalPages}
					aria-label="Go to the next page"
				>
					<img src={arrowIcon} alt="" class="w-5 rotate-180 invert dark:invert-0" />
				</button>
			</li>
		{:else}
			<li
				class="ml-3 bg-zinc-900 dark:bg-white transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex opacity-85 justify-center items-center"
			>
				<img src={arrowIcon} alt="" class="w-5 rotate-180 invert dark:invert-0" />
			</li>
		{/if}
	</ul>
</nav>
