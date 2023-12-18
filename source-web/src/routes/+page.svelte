<script>
	import categories from '@/assets/categories.json';
	console.log(categories);
</script>

<svelte:head>
	<title>Freesets</title>
	<link rel="icon" href="/favicon.svg" />
	<meta name="robots" content="index, nofollow" />
	<meta name="author" content="Cosmo" />
	<meta
		name="description"
		content="Explore a wide collection of the best free assets for your next project."
	/>

	<!-- Open Graph -->
	<meta property="og:title" content="Freesets" />
	<meta property="og:type" content="website" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/cosmocloudinary/image/upload/f_auto,q_auto/v1/freesets/og/home"
	/>
	<meta property="og:url" content="https://freesets.vercel.app" />
	<meta
		property="og:description"
		content="Explore a wide collection of the best free assets for your next project."
	/>

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@CosmoArt0" />
	<meta name="twitter:title" content="Freesets" />
	<meta
		name="twitter:description"
		content="Explore a wide collection of the best free assets for your next project."
	/>
	<meta
		name="twitter:image"
		content="https://res.cloudinary.com/cosmocloudinary/image/upload/f_auto,q_auto/v1/freesets/og/home"
	/>
</svelte:head>

<section class="flex-grow items-center flex justify-center flex-col relative overflow-hidden">
	<h1 class="title-responsive text-center px-6 z-10 text-slate-950 dark:text-white">Freesets</h1>
	<div class="flex flex-wrap justify-center w-full items-center">
		{#each categories as category, i}
			<a
				href={`/${category.nameID}`}
				class="w-7 h-7 md:w-8 md:h-8 m-2 md:m-4 hover:scale-105 transition-transform"
			>
				<img
					src={`/categories-icons/${category.nameID}.svg`}
					alt={category.name}
					class="w-full h-full object-contain dark:invert"
				/>
			</a>
		{/each}
	</div>
</section>
