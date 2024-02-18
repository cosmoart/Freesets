<script>
	import Pagination from './ui/Pagination.svelte';
	import AssetCard from './AssetCard.svelte';
	export let categories;

	const testa = 'awf';
</script>

<main class="mb-10">
	{#each categories as category}
		<article class="relative mb-20" style={`--resource-color: ${category.color}`}>
			<div
				class="flex justify-center border-t-2 mt-6 border-zinc-600 mx-auto sticky top-0 z-40 right-0 left-0"
			>
				<button
					class="recourse-title relative flex gap-2 px-10 py-1.5"
					on:click={() => scroll(0, 0)}
				>
					<img src={'/categories-icons/' + category.nameID + '.svg'} alt="" class="invert w-6" />
					<h2 class="text-[17px]">
						{category.name}
						<span class="text-[15px]">({category.totalItems})</span>
					</h2>
				</button>
			</div>
			<div
				class="mx-auto grid -mt-3 gap-5"
				style={`grid-template-columns: repeat(auto-fill,minmax(${320}px,1fr))`}
			>
				<AssetCard assets={category.items} {category} />
			</div>

			{#if category.totalPages > 1}
				<Pagination
					currentPage={category.page}
					totalPages={category.totalPages}
					className="mt-12"
				/>
			{/if}
		</article>
	{/each}
</main>
