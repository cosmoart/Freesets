<script>
	import Assest from '../Assets.svelte';

	/** @type {import('./$types').PageData} */
	export let data;
</script>

<svelte:head>
	<title>{data.page.name} - Freesets</title>
	<meta name="theme-color" content={data.page.color} />
	<meta name="robots" content="index, nofollow" />
	<meta name="author" content="Cosmo" />
	<meta
		name="description"
		content={data.page.description || 'Collection of free assets for your projects'}
	/>

	<!-- Open Graph -->
	<meta property="og:title" content={data.page.name + '- Freesets'} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://freesets.vercel.app/og.webp" />
	<meta property="og:url" content="https://freesets.vercel.app" />
	<meta
		property="og:description"
		content={data.page.description || 'Collection of free assets for your projects'}
	/>

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:creator" content="@CosmoArt0" />
	<meta name="twitter:title" content={data.page.name + '- Freesets'} />
	<meta
		name="twitter:description"
		content={data.page.description || 'Collection of free assets for your projects'}
	/>
	<meta name="twitter:image" content="https://freesets.vercel.app/og.webp" />
</svelte:head>

<Assest categories={[data.page]} />
