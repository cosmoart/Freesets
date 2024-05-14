<script>
	import categories from '@/assets/categories.js';
	const description =
		'Freesets is a vast collection of the best free resources and tools for developers and artists, such as icons, illustrations, photos, videos, blogs, fonts, colors, etc.';
	const image =
		'https://res.cloudinary.com/cosmocloudinary/image/upload/f_auto,q_auto/v1/freesets/og/home';
</script>

<svelte:head>
	<title>Freesets</title>
	<link rel="icon" href="/favicon.svg" />
	<meta name="robots" content="index, follow" />
	<meta name="author" content="Cosmo" />
	<meta name="description" content={description} />
	<meta name="view-transition" content="same-origin" />
	<link rel="canonical" href="https://freesets.vercel.app" />

	<!-- Open Graph -->
	<meta property="og:title" content="Freesets" />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Freesets" />
	<meta property="og:image" content={image} />
	<meta property="og:url" content="https://freesets.vercel.app" />
	<meta property="og:description" content={description} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@CosmoArt0" />
	<meta name="twitter:title" content="Freesets" />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
</svelte:head>

<section class="flex-grow items-center flex justify-center flex-col relative overflow-hidden">
	<h1 class="title-responsive text-center px-6 z-10 text-slate-950 dark:text-white">Freesets</h1>

	<ul
		class="w-full py-2 max-w-[55rem] flex motion-reduce:justify-between overflow-hidden justify-center items-center"
		style="--count: {categories.length}"
	>
		{#each categories as category, i}
			<li style="--index: {i}">
				<a
					href={`/${category.nameID}`}
					class="p-2 hover:scale-110 align-middle transition-all group inline-block rounded-md hover:bg-[var(--item-color)]"
					style={`--item-color: ${category.color}`}
					title={category.name}
				>
					<img
						src={`/categories-icons/${category.nameID}.svg`}
						alt={category.name}
						class="size-[30px] object-contain dark:invert group-hover:invert"
					/>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	ul {
		--speed: 20;
		--inset: 3;
		--outset: 3;
	}

	ul:hover li {
		animation-play-state: paused;
	}

	@media (prefers-reduced-motion: no-preference) {
		li {
			--origin-x: calc(((var(--count) - var(--index)) + var(--inset, 0)) * 100%);
			--origin-y: 0;
			--destination-x: calc(calc((var(--index) + 1 + var(--outset, 0)) * -100%));
			--destination-y: 0;
			--duration: calc(var(--speed) * 1s);
			--delay: calc((var(--duration) / var(--count)) * (var(--index, 0) - (var(--count) * 0.9)));

			animation: slide var(--duration) calc(var(--delay) - (var(--count) * 0.5s)) infinite reverse
				linear;
			translate: var(--origin-x) var(--origin-y);
			min-width: 2.5rem;
		}

		@keyframes slide {
			100% {
				translate: var(--destination-x) var(--destination-y);
			}
		}
	}
</style>
