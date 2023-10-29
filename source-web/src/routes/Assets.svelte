<script>
	import autoAnimate from '@formkit/auto-animate';
	import infoIcon from '@/assets/icons/info.svg';
	import tagIcon from '@/assets/icons/tag.svg';
	import externalIcon from '@/assets/icons/external.svg';
	import { afterUpdate } from 'svelte';

	export let categories;
	let cardSize = 330;

	afterUpdate(() => {
		let observer = new IntersectionObserver(
			(cards) => {
				cards.forEach((card) => {
					console.log(card.isIntersecting);
					if (card.isIntersecting) card.target.classList.add('appear');
				});
			},
			{ threshold: 0.2 }
		);

		document.querySelectorAll('.asset-card').forEach((card) => observer.observe(card));

		return () => observer.disconnect();
	});
</script>

<!-- <div class="flex gap-2">
	<input type="range" min="150" max="450" step="10" bind:value={cardSize} class="w-56" />
	<span>{cardSize}</span>
</div> -->
<main use:autoAnimate class="mb-10">
	{#each categories as category}
		<article class="relative">
			<div
				class="flex justify-center border-t-2 mt-6 border-zinc-600 mx-auto sticky top-0 z-40 right-0 left-0"
			>
				<div
					class="recourse-title relative flex gap-2 px-10 py-1.5"
					style={`--resource-color: ${category.color}`}
				>
					<img
						src={'/categories-icons/' + category.name.toLowerCase().replaceAll(' ', '-') + '.svg'}
						alt=""
						class="invert w-6"
					/>
					<h2 class="text-[17px]">
						{category.name}
						<span class="text-[15px]">({category.items.length})</span>
					</h2>
				</div>
			</div>
			<div
				class="mx-auto grid -mt-3 gap-5"
				style={`grid-template-columns: repeat(auto-fill,minmax(${cardSize}px,1fr))`}
				use:autoAnimate
			>
				{#each category.items as asset}
					<article
						class="asset-card group transition-all opacity-40 translate-y-6 scale-75 rounded-lg ring-2 ring-zinc-700 hover:ring-[--card-color] bg-zinc-700 bg-opacity-30 backdrop-blur-md text-white overflow-hidden hover:scale-[1.02]"
						style="--card-color: {category.color}"
					>
						<div class="relative">
							<a
								href={asset.link}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={'Open ' + asset.title}
							>
								<img
									src={asset.img}
									alt={asset.title + ' web preview'}
									class="aspect-video object-cover"
									loading="lazy"
								/>
							</a>
							{#if asset.tags}
								<ul
									class="flex gap-2.5 items-center absolute bottom-0 right-0 bg-[#28292d] before:rotate-[265deg] before:absolute before:w-3 before:h-3 before:-left-3 before:bottom-0 before:z-10 before:rounded-full before:shadow-[-0.5rem_0.5rem_#28292d] before:rounded-br w-fit rounded-tl-md px-2 py-0.5"
									title="Tags"
								>
									<img src={tagIcon} alt="tags" class="w-4" />
									{#each asset.tags as tag}
										<li
											class="text-[14px] tracking-wide before:h-2.5 before:w-[1px] before:bg-white before:bg-opacity-50 before:absolute before:-left-1.5 before:top-0 before:bottom-0 before:m-auto relative"
										>
											{tag}
										</li>
									{/each}
								</ul>
							{/if}
						</div>
						<div class="p-5 flex flex-wrap justify-between items-center relative">
							<div class="relative">
								<a href={asset.link} target="_blank" rel="noopener noreferrer">
									<h3 class="text-xl hover:underline">
										{asset.title}
									</h3>
								</a>

								<img
									src={externalIcon}
									alt=""
									class="absolute w-5 -right-3 top-0 bottom-0 m-auto opacity-0 group-hover:opacity-100 transition-all group-hover:-right-6"
								/>
							</div>
							{#if asset.licence}
								<div class="group/licence relative">
									<a
										class="bg-blue-600 hover:scale-105 inline-block px-2 py-1 rounded-md text-[13px] tracking-wide"
										target="_blank"
										rel="noopener noreferrer"
										href={asset.licenceLink}
									>
										{#if asset.licenceDescription}
											<img src={infoIcon} alt="" class="w-4 inline-block mr-.5 mb-0.5" />
										{/if}
										{asset.licence}
									</a>
									{#if asset.licenceDescription}
										<p
											class="text-sm py-1 px-3 w-max max-w-xs rounded-md absolute -bottom-8 right-0 opacity-0 bg-zinc-900 transition-all text-white group-hover/licence:bottom-6 group-hover/licence:opacity-100 group-hover/licence:pointer-events-auto pointer-events-none"
										>
											{asset.licenceDescription}
										</p>
									{/if}
								</div>
							{/if}
						</div>
					</article>
				{/each}
			</div>
		</article>
	{/each}
</main>
