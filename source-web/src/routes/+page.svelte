<script>
	import Slider from '@/components/ui/Slider.svelte';
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

	<Slider />
</section>
