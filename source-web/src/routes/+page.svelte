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

	<div class="container">
		<ul class="carousel flex flex-wrap gap-1 sm:gap-4 justify-center w-full items-center">
			{#each categories as category, i}
				<li style="--delay: {i * 0.4}s">
					<a
						href={`/${category.nameID}`}
						class="p-2 hover:scale-110 transition-transform group inline-block rounded-md hover:bg-[var(--item-color)]"
						style={`--item-color: ${category.color}`}
						title={category.name}
					>
						<img
							src={`/categories-icons/${category.nameID}.svg`}
							alt={category.name}
							class="w-8 aspect-square object-contain dark:invert group-hover:invert"
						/>
					</a>
				</li>
			{/each}
		</ul>
		<ul
			aria-hidden="true"
			class="carousel2 flex flex-wrap gap-1 sm:gap-4 justify-center w-full items-center"
		>
			{#each categories as category, i}
				<li style="--delay: {i * 0.4}s">
					<a
						href={`/${category.nameID}`}
						class="p-2 hover:scale-110 transition-transform inline-block group rounded-md hover:bg-[var(--item-color)]"
						style={`--item-color: ${category.color}`}
						title={category.name}
					>
						<img
							src={`/categories-icons/${category.nameID}.svg`}
							alt={category.name}
							class="w-8 aspect-square object-contain dark:invert group-hover:invert"
						/>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	@media (width <= 640px) {
		.container {
			max-width: 600px;
		}
	}
	.container {
		position: relative;
		overflow: hidden;
		height: 4rem;
		width: 900px;

		--time: 38s;
	}
	.container > ul {
		position: absolute;
		justify-content: space-evenly;
		top: 0;
		width: 100%;
		height: 100%;
		display: flex;
		flex-wrap: nowrap;
	}
	.carousel {
		left: 0;
		animation: slide var(--time) linear infinite;
	}
	.carousel2 {
		margin-right: 12px;
		left: -100%;
		animation: slide2 var(--time) linear infinite;
	}
	.container:hover > ul {
		animation-play-state: paused;
	}

	@keyframes slide {
		100% {
			left: 100%;
		}
	}
	@keyframes slide2 {
		100% {
			left: 0;
		}
	}
</style>
