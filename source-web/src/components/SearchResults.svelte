<script>
	let { assets } = $props();
</script>

{#if assets && assets.length > 0}
	<div
		class="mx-auto grid gap-5"
		style="grid-template-columns: repeat(auto-fill,minmax(320px,1fr))"
	>
		{#each assets as asset}
			<div class="bg-white dark:bg-zinc-800 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
				<a href={asset.link} target="_blank" rel="noopener noreferrer" class="block">
					<div class="aspect-video bg-gray-100 dark:bg-zinc-700 rounded-lg mb-3 overflow-hidden">
						<img 
							src={asset.img} 
							alt={asset.name}
							class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
							loading="lazy"
						/>
					</div>
					<h3 class="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-2 truncate">
						{asset.name}
					</h3>
					{#if asset.description}
						<p class="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
							{asset.description}
						</p>
					{/if}
					<div class="flex items-center justify-between">
						<span class="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
							{asset.license || 'Free'}
						</span>
						{#if asset.category}
							<span class="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded capitalize">
								{asset.categoryName || asset.category}
							</span>
						{/if}
					</div>
				</a>
			</div>
		{/each}
	</div>
{:else}
	<div class="text-center py-16">
		<img 
			src="/src/assets/icons/noresults.svg" 
			alt="No results" 
			class="w-24 h-24 mx-auto mb-6 opacity-50 dark:invert"
		/>
		<h3 class="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-2">
			No results found
		</h3>
		<p class="text-zinc-600 dark:text-zinc-400">
			Try searching with different keywords or browse our categories.
		</p>
	</div>
{/if}
