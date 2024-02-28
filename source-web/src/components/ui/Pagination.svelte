<script>
	import arrowIcon from '@/assets/icons/arrow.svg';
	import { page } from '$app/stores';
	export let className = '';
	export let currentPage = 1;
	export let totalPages = 1;

	$: url = $page.url.pathname;
	$: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
	$: q = new URLSearchParams($page.url.searchParams).get('q');
</script>

<nav>
	<ul class="flex gap-2 justify-center {className}">
		{#if currentPage > 1}
			<li>
				<a
					href="{url}?page={currentPage - 1}{q ? '&q=' + q : ''}"
					class="hover:bg-zinc-700 mr-3 bg-zinc-800 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {currentPage ===
					1
						? 'pointer-events-none opacity-80'
						: ''}"
					aria-label="Go to the previous page"
				>
					<img src={arrowIcon} alt="" class="w-5" />
				</a>
			</li>
		{:else}
			<li
				class="mr-3 bg-zinc-800 dark:bg-white transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex opacity-85 justify-center items-center"
			>
				<img src={arrowIcon} alt="" class="w-5" />
			</li>
		{/if}

		{#each pages as page}
			<li>
				<a
					href="{url}?page={page}{q ? '&q=' + q : ''}"
					class="hover:bg-zinc-700 bg-zinc-800 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {page ===
					currentPage
						? 'pointer-events-none'
						: ''} {page === currentPage ? '!bg-blue-600 text-white' : 'dark:text-slate-900'}"
					disabled={page === currentPage}
					aria-label="Go to {page} page"
				>
					{page}
				</a>
			</li>
		{/each}

		{#if currentPage < totalPages}
			<li>
				<a
					href="{url}?page={currentPage + 1}{q ? '&q=' + q : ''}"
					class="hover:bg-zinc-700 ml-3 bg-zinc-800 dark:bg-white dark:hover:bg-slate-300 transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex justify-center items-center {currentPage ===
					totalPages
						? 'pointer-events-none opacity-80'
						: ''}"
					aria-label="Go to the next page"
				>
					<img src={arrowIcon} alt="" class="w-5 rotate-180" />
				</a>
			</li>
		{:else}
			<li
				class="ml-3 bg-zinc-800 dark:bg-white transition-colors p-1 size-9 md:size-10 text-xl text-center rounded-md flex opacity-85 justify-center items-center"
			>
				<img src={arrowIcon} alt="" class="w-5 rotate-180" />
			</li>
		{/if}
	</ul>
</nav>
