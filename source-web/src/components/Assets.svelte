<script>
	import arrowIcon from '@/assets/icons/arrow.svg';
	import AssetCard from './AssetCard.svelte';
	export let categories;

	let multiple = 40;
	let assets = 40;
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
						<span class="text-[15px]">({category.items.length})</span>
					</h2>
				</button>
			</div>
			<div
				class="mx-auto grid -mt-3 gap-5"
				style={`grid-template-columns: repeat(auto-fill,minmax(${320}px,1fr))`}
			>
				<AssetCard assets={category.items.slice(0, assets)} {category} />
			</div>

			{#if category.items.length > assets}
				<button
					on:click={() => (assets += multiple)}
					class="py-2 bg-[var(--resource-color)] w-full mt-5 rounded-md hover:brightness-105 flex gap-1 justify-center items-center text-white dar transition-all group relative"
				>
					Load more
					<img
						src={arrowIcon}
						alt=""
						class="invert -rotate-90 w-0 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 group-hover:w-5"
					/>
				</button>
			{/if}
		</article>
	{/each}
</main>
