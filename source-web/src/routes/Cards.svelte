<script>
	import autoAnimate from '@formkit/auto-animate';
	import infoIcon from '@/assets/icons/info.svg';
	export let categoriesFiltered;
</script>

<main use:autoAnimate class="mb-10">
	{#each categoriesFiltered as category}
		<article class="relative">
			<div
				class="flex justify-center border-t-2 mt-6 border-zinc-600 mx-auto sticky top-0 z-40 right-0 left-0"
			>
				<div
					class="flex gap-2 px-10 py-1.5"
					style={`background-color: ${category.color}; clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);`}
				>
					<img
						src={'/categories-icons/' +
							category.name.toLowerCase().replaceAll(/\/|\s/g, '-') +
							'.svg'}
						alt=""
						class="invert w-6"
					/>
					<h2 class="text-lg">
						{category.name}
						<span class="text-base">({category.items.length})</span>
					</h2>
				</div>
			</div>
			<div
				class="mx-auto grid -mt-3 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5"
				use:autoAnimate
			>
				{#each category.items as asset}
					<article
						class="rounded-lg ring-2 ring-zinc-700 hover:ring-blue-600 bg-zinc-700 bg-opacity-30 backdrop-blur-md text-white overflow-hidden hover:scale-[1.02] transition-transform"
					>
						<a href={asset.link} target="_blank" rel="noopener noreferrer">
							<img src={asset.img} alt="" class="aspect-video object-cover" />
						</a>
						<div class="p-5 flex flex-wrap justify-between items-center">
							<h3 class="text-xl">{asset.title}</h3>
							{#if asset.licence}
								<div class="group relative">
									<a
										class="bg-blue-600 px-4 py-1 rounded-md text-sm tracking-wide"
										target="_blank"
										rel="noopener noreferrer"
										href={asset.licenceLink}
									>
										{#if asset.licenceDescription}
											<img src={infoIcon} alt="" class="w-4 inline-block mr-1 mb-0.5 invert" />
										{/if}
										{asset.licence}
									</a>
									{#if asset.licenceDescription}
										<p
											class="text-sm p-2 w-72 rounded-md absolute -bottom-8 right-0 opacity-0 bg-zinc-900 transition-all text-white group-hover:bottom-6 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none"
										>
											{asset.licenceDescription}
										</p>
									{/if}
								</div>
							{/if}
							{#if asset.tags}
								<ul class="flex gap-2">
									{#each asset.tags as tag}
										<li class="bg-blue-600 px-4 py-1 rounded-md text-sm tracking-wide">
											{tag}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</article>
	{/each}
</main>
