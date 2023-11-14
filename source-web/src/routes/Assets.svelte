<script>
	import arrowIcon from '@/assets/icons/arrow.svg';
	import autoAnimate from '@formkit/auto-animate';
	import AssetCard from './AssetCard.svelte';
	import { afterUpdate } from 'svelte';
	import { page } from '$app/stores';
	export let categories;

	$: currentPage = $page.params.category;

	afterUpdate(() => {
		let observer = new IntersectionObserver(
			(cards) => {
				cards.forEach((card) => {
					if (card.isIntersecting) card.target.classList.add('appear');
				});
			},
			{ threshold: 0.2 }
		);

		document.querySelectorAll('.asset-card').forEach((card) => observer.observe(card));

		return () => observer.disconnect();
	});
</script>

<main use:autoAnimate class="mb-10">
	{#each categories as category}
		<article class="relative mb-20" style={`--resource-color: ${category.color}`}>
			<div
				class="flex justify-center border-t-2 mt-6 border-zinc-600 mx-auto sticky top-0 z-40 right-0 left-0"
			>
				<div class="recourse-title relative flex gap-2 px-10 py-1.5">
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
				class={`mx-auto grid -mt-3 gap-5 ${currentPage === undefined && 'homePageGrid'}`}
				style={`grid-template-columns: repeat(auto-fill,minmax(${320}px,1fr))`}
				use:autoAnimate
			>
				<AssetCard
					assets={category.items.slice(0, currentPage === undefined ? 8 : undefined)}
					{category}
				/>
			</div>

			{#if currentPage === undefined}
				<a
					href={`/${category.name.toLowerCase().replaceAll(' ', '-')}`}
					class="py-2 bg-[var(--resource-color)] w-full mt-5 rounded-md hover:brightness-110 flex gap-1 justify-center items-center text-white dar transition-all group relative"
				>
					View all
					<img
						src={arrowIcon}
						alt=""
						class="invert rotate-180 w-0 opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100 group-hover:w-5"
					/>
				</a>{/if}
		</article>
	{/each}
</main>
