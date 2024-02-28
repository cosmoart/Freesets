<script>
	import noResultsIcon from '@/assets/icons/noresults.svg';
	import Pagination from './ui/Pagination.svelte';
	import AssetCard from './AssetCard.svelte';
	export let data;
</script>

<main class="{data.totalAssets > 0 ? 'mb-32' : ''} relative flex-grow">
	<article style={`--resource-color: ${data.color}`}>
		<div
			class="flex justify-center border-t-2 mt-6 border-zinc-600 mx-auto sticky top-0 z-20 right-0 left-0"
		>
			<button class="recourse-title relative flex gap-2 px-10 py-1.5" on:click={() => scroll(0, 0)}>
				<img src={'/categories-icons/' + data.nameID + '.svg'} alt="" class="invert w-6" />
				<h2 class="text-[17px]">
					{data.name}
					<span class="text-[15px]">({data.totalAssets})</span>
				</h2>
			</button>
		</div>
		{#if data.totalAssets > 0}
			<div
				class="mx-auto grid -mt-3 gap-5"
				style={`grid-template-columns: repeat(auto-fill,minmax(${320}px,1fr))`}
			>
				<AssetCard assets={data.assets} {data} />
			</div>
		{:else}
			<div
				class="flex items-center justify-center gap-2 h-full flex-col absolute right-0 left-0 bottom-0"
			>
				<img src={noResultsIcon} alt="" class="w-11 dark:invert mt-10" />
				<p class="text-xl">No results found</p>
			</div>
		{/if}

		{#if data.totalPages > 1}
			<Pagination currentPage={data.currentPage} totalPages={data.totalPages} className="mt-12" />
		{/if}
	</article>
</main>
