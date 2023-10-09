<script>
	export let categoriesFiltered;
	import autoAnimate from '@formkit/auto-animate';
</script>

<main use:autoAnimate class="mb-10">
	{#each categoriesFiltered as category}
		<div class="flex gap-2 border-t-2 mt-8 border-zinc-600">
			<img
				src={'/categories-icons/' + category.name.toLowerCase() + '.svg'}
				alt=""
				class="invert w-8"
			/>
			<h2 class="text-2xl my-5">
				{category.name}
				<span class="text-base">({category.items.length})</span>
			</h2>
		</div>
		<div class="mx-auto grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5" use:autoAnimate>
			{#each category.items as asset}
				<article
					class="rounded-lg ring-2 ring-zinc-700 hover:ring-blue-600 bg-zinc-700 bg-opacity-30 backdrop:blur-md text-white overflow-hidden hover:scale-[1.02] transition-transform"
				>
					<a href={asset.link} target="_blank" rel="noopener noreferrer">
						<img src={asset.img} alt="" class="aspect-video object-cover" />
					</a>
					<div class="p-5 flex justify-between items-center">
						<h3 class="text-xl">{asset.title}</h3>
						<a
							class="bg-blue-600 px-4 py-1 rounded-md text-sm"
							target="_blank"
							rel="noopener noreferrer"
							href={asset.licencelink}>{asset.licence}</a
						>
					</div>
				</article>
			{/each}
		</div>
	{/each}
</main>
