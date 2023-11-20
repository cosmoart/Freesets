<script>
	import categories from '@/assets/categories.js';
	import Assets from './Assets.svelte';
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
	<meta property="og:image" content="https://freesets.vercel.app/og-images/home.webp" />
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
	<meta name="twitter:image" content="https://freesets.vercel.app/og-images/home.webp" />
</svelte:head>

<section>
	<h1 class="hidden">Freesets</h1>
	<Assets {categories} />
</section>
